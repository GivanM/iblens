import type { Express, Request, Response } from "express";
import express from "express";
import crypto from "crypto";
import { ENV } from "../_core/env";
import {
  getOrderById,
  updateOrderStatus,
  insertWebhookEvent,
  updateWebhookEvent,
  grantCreditsViaLedger,
  getUserById,
  getUserCredits,
} from "../db";
import { sendPaymentConfirmationEmail, getSkuHumanName } from "../email";

/**
 * LemonSqueezy webhook handler.
 *
 * Flow:
 * 1. User creates a checkout via tRPC → LS API → checkout URL
 * 2. User pays via card on LemonSqueezy checkout page
 * 3. LemonSqueezy sends webhook to POST /api/lemonsqueezy/webhook
 * 4. We LOG first (write to webhook_events), THEN verify HMAC-SHA256, THEN process
 *
 * Webhook security: HMAC-SHA256 of raw body signed with LEMONSQUEEZY_WEBHOOK_SECRET,
 * sent in `X-Signature` header (lowercase: `x-signature`).
 */

/**
 * Verify LemonSqueezy webhook signature.
 * LS sends HMAC-SHA256 hex digest of raw body in the X-Signature header.
 */
export function verifyLsSignature(rawBody: string | Buffer, signature: string, secret: string): boolean {
  if (!signature || !secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(signature, "hex"));
  } catch {
    return false;
  }
}

/**
 * Compute HMAC-SHA256 hex digest (for diagnostic logging).
 */
function computeHmac(rawBody: string | Buffer, secret: string): string {
  return crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
}

/**
 * Map LemonSqueezy SKU (from variant) to credit amounts.
 */
export function lsSkuToCredits(sku: string): { essay: number; university: number } {
  switch (sku) {
    case "essay_single":
      return { essay: 1, university: 0 };
    case "essay_pack_5":
      return { essay: 5, university: 0 };
    case "essay_pack_10":
      return { essay: 10, university: 0 };
    case "university_single":
    case "university_strategy":
      return { essay: 0, university: 1 };
    default:
      return { essay: 0, university: 0 };
  }
}

/**
 * Register LemonSqueezy webhook endpoint.
 * Must be registered BEFORE express.json() body parser since we need raw body for HMAC.
 */
export function registerLemonsqueezyWebhook(app: Express) {
  // Method guard: reject non-POST requests with 405
  app.all("/api/lemonsqueezy/webhook", (req: Request, res: Response, next) => {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method Not Allowed" });
    }
    next();
  });

  app.post(
    "/api/lemonsqueezy/webhook",
    express.raw({ type: "application/json" }),
    async (req: Request, res: Response) => {
      // req.body is a Buffer thanks to express.raw()
      const rawBodyStr: string = Buffer.isBuffer(req.body) ? req.body.toString("utf-8") : String(req.body || "");
      const signature = (req.headers["x-signature"] as string) || "";
      const eventNameHeader = (req.headers["x-event-name"] as string) || "";
      let body: any = {};
      try {
        body = JSON.parse(rawBodyStr);
      } catch {
        body = {};
      }

      // Extract identifiers for logging (best-effort, even if body is malformed)
      const meta = body?.meta || {};
      const eventName = meta.event_name || eventNameHeader || "unknown";
      const dataId = String(body?.data?.id || "unknown");
      // Use composite key for idempotency: provider + dataId + eventName
      const eventKey = `${dataId}_${eventName}`;

      console.log(`[LemonSqueezy Webhook] Incoming: event=${eventName}, dataId=${dataId}, bodyLen=${rawBodyStr.length}`);

      // ===== STEP 1: LOG FIRST — write to DB before any validation =====
      let webhookEventId: number | undefined;
      try {
        const { isNew, id } = await insertWebhookEvent({
          provider: "lemonsqueezy",
          npPaymentId: eventKey,
          paymentStatus: "received", // initial status
          rawBody: rawBodyStr.substring(0, 65535), // text column limit safety
          signatureValid: false, // will update after verification
          requestHeaders: JSON.stringify({
            "x-signature": signature ? `${signature.substring(0, 16)}...` : "(missing)",
            "x-event-name": eventNameHeader,
            "content-type": req.headers["content-type"] || "",
            "content-length": req.headers["content-length"] || "",
            "user-agent": req.headers["user-agent"] || "",
          }),
        });
        webhookEventId = id;

        if (!isNew) {
          console.log(`[LemonSqueezy Webhook] Duplicate event: key=${eventKey}`);
          return res.status(200).json({ ok: true, message: "Already processed" });
        }
      } catch (dbError: any) {
        // If we can't even write to DB, log and return 200 to prevent infinite retries
        console.error("[LemonSqueezy Webhook] CRITICAL: Cannot write to webhook_events:", dbError?.message);
        return res.status(200).json({ ok: true, message: "Internal error (logged)" });
      }

      // ===== STEP 2: HMAC VERIFICATION using raw body string =====
      const secret = ENV.lemonsqueezyWebhookSecret;
      if (!secret) {
        console.error("[LemonSqueezy Webhook] LEMONSQUEEZY_WEBHOOK_SECRET not configured!");
        if (webhookEventId) {
          await updateWebhookEvent(webhookEventId, {
            signatureValid: false,
            errorMessage: "LEMONSQUEEZY_WEBHOOK_SECRET not configured",
          }).catch(() => {});
        }
        // Still return 200 — we logged the event, we can investigate
        return res.status(200).json({ ok: true, message: "Secret not configured" });
      }

      const computed = computeHmac(rawBodyStr, secret);
      const isValid = verifyLsSignature(rawBodyStr, signature, secret);

      if (!isValid) {
        console.error(`[LemonSqueezy Webhook] HMAC verification FAILED. received_sig=${signature?.substring(0, 16)}..., computed=${computed.substring(0, 16)}...`);
        if (webhookEventId) {
          await updateWebhookEvent(webhookEventId, {
            signatureValid: false,
            paymentStatus: "invalid_signature",
            errorMessage: `HMAC mismatch. Received: ${signature || "(empty)"}. Computed: ${computed}`,
            computedSignature: computed,
          }).catch(() => {});
        }
        // Return 401 for invalid signature — LS won't retry 4xx
        return res.status(401).json({ error: "Invalid signature" });
      }

      // Signature valid — update record
      if (webhookEventId) {
        await updateWebhookEvent(webhookEventId, {
          signatureValid: true,
          paymentStatus: "verified",
          computedSignature: computed,
        }).catch(() => {});
      }

      console.log(`[LemonSqueezy Webhook] Signature VALID for event=${eventName}, dataId=${dataId}`);

      // ===== STEP 3: PROCESS EVENT =====
      try {
        // Extract order_id from custom_data
        const customData = meta.custom_data || {};
        const orderId = customData.order_id || "";

        if (eventName === "order_created") {
          if (!orderId) {
            const errMsg = "order_created without order_id in custom_data. meta=" + JSON.stringify(meta);
            console.warn(`[LemonSqueezy Webhook] ${errMsg}`);
            if (webhookEventId) {
              await updateWebhookEvent(webhookEventId, { paymentStatus: "no_order_id", errorMessage: errMsg }).catch(() => {});
            }
            return res.status(200).json({ ok: true, message: "No order_id in custom_data" });
          }

          const order = await getOrderById(orderId);
          if (!order) {
            const errMsg = `Order not found: ${orderId}`;
            console.warn(`[LemonSqueezy Webhook] ${errMsg}`);
            if (webhookEventId) {
              await updateWebhookEvent(webhookEventId, { paymentStatus: "order_not_found", errorMessage: errMsg }).catch(() => {});
            }
            return res.status(200).json({ ok: true, message: "Order not found" });
          }

          // Mark order as paid
          await updateOrderStatus(order.id, "paid", dataId);

          // Grant credits
          const credits = lsSkuToCredits(order.sku);
          if (credits.essay > 0 || credits.university > 0) {
            await grantCreditsViaLedger(
              order.userId,
              credits.essay,
              credits.university,
              `lemonsqueezy:${order.sku}`,
              order.id,
            );
            console.log(`[LemonSqueezy] Credits granted to user ${order.userId}: essay=${credits.essay}, university=${credits.university}`);
          }

          // Update webhook event status
          if (webhookEventId) {
            await updateWebhookEvent(webhookEventId, { paymentStatus: "processed" }).catch(() => {});
          }

          // Best-effort email notification
          try {
            const user = await getUserById(order.userId);
            if (user?.email) {
              const userCredits = await getUserCredits(order.userId);
              await sendPaymentConfirmationEmail({
                email: user.email,
                userName: user.name,
                amountUsd: order.amountUsd,
                skuHumanName: getSkuHumanName(order.sku),
                essayCredits: userCredits?.essayCredits || 0,
                universityCredits: userCredits?.universityCredits || 0,
              });
            }
          } catch (emailErr) {
            console.warn("[LemonSqueezy] Email notification failed (non-fatal):", emailErr);
          }
        } else if (eventName === "order_refunded") {
          if (!orderId) {
            console.warn("[LemonSqueezy Webhook] order_refunded without order_id in custom_data");
            if (webhookEventId) {
              await updateWebhookEvent(webhookEventId, { paymentStatus: "no_order_id", errorMessage: "order_refunded without order_id" }).catch(() => {});
            }
            return res.status(200).json({ ok: true, message: "No order_id in custom_data" });
          }

          const order = await getOrderById(orderId);
          if (!order) {
            console.warn(`[LemonSqueezy Webhook] Order not found for refund: ${orderId}`);
            if (webhookEventId) {
              await updateWebhookEvent(webhookEventId, { paymentStatus: "order_not_found", errorMessage: `Refund order not found: ${orderId}` }).catch(() => {});
            }
            return res.status(200).json({ ok: true, message: "Order not found" });
          }

          // Mark order as refunded
          await updateOrderStatus(order.id, "refunded", dataId);

          // Deduct credits
          const credits = lsSkuToCredits(order.sku);
          if (credits.essay > 0 || credits.university > 0) {
            await grantCreditsViaLedger(
              order.userId,
              -credits.essay,
              -credits.university,
              `refund:${order.id}`,
              order.id,
            );
            console.log(`[LemonSqueezy] Credits deducted from user ${order.userId} (refund): essay=-${credits.essay}, university=-${credits.university}`);
          }

          if (webhookEventId) {
            await updateWebhookEvent(webhookEventId, { paymentStatus: "processed" }).catch(() => {});
          }
        } else {
          console.log(`[LemonSqueezy Webhook] Unhandled event: ${eventName}, ignoring`);
          if (webhookEventId) {
            await updateWebhookEvent(webhookEventId, { paymentStatus: `ignored:${eventName}` }).catch(() => {});
          }
        }

        return res.status(200).json({ ok: true });
      } catch (processingError: any) {
        const errMsg = processingError?.message || String(processingError);
        console.error(`[LemonSqueezy Webhook] Processing error:`, errMsg);
        if (webhookEventId) {
          await updateWebhookEvent(webhookEventId, {
            paymentStatus: "processing_error",
            errorMessage: errMsg.substring(0, 1000),
          }).catch(() => {});
        }
        // Return 200 to prevent LS from retrying on our errors — we logged everything
        return res.status(200).json({ ok: true, message: "Processing error (logged)" });
      }
    }
  );
}

/**
 * Create a LemonSqueezy checkout via their API.
 * Returns the checkout URL for the user to complete payment.
 */
export async function createLemonsqueezyCheckout(
  orderId: string,
  variantId: number,
  userEmail: string | null,
): Promise<{ checkoutUrl: string }> {
  const apiKey = ENV.lemonsqueezyApiKey;
  const storeId = ENV.lemonsqueezyStoreId;

  if (!apiKey) {
    throw new Error("LEMONSQUEEZY_API_KEY not configured");
  }
  if (!storeId) {
    throw new Error("LEMONSQUEEZY_STORE_ID not configured");
  }

  const payload: any = {
    data: {
      type: "checkouts",
      attributes: {
        checkout_data: {
          custom: {
            order_id: orderId,
          },
        },
        product_options: {
          redirect_url: "https://iblens.com/dashboard?payment=success",
          receipt_thank_you_note: "Thank you for your purchase! Your credits have been added to your IBLens account.",
        },
      },
      relationships: {
        store: {
          data: {
            type: "stores",
            id: storeId,
          },
        },
        variant: {
          data: {
            type: "variants",
            id: String(variantId),
          },
        },
      },
    },
  };

  // Add email if available
  if (userEmail) {
    payload.data.attributes.checkout_data.email = userEmail;
  }

  const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Accept": "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[LemonSqueezy] Checkout creation failed: ${response.status} ${errorText}`);
    throw new Error(`LemonSqueezy checkout creation failed: ${response.status}`);
  }

  const result = await response.json();
  const checkoutUrl = result?.data?.attributes?.url;

  if (!checkoutUrl) {
    throw new Error("LemonSqueezy did not return a checkout URL");
  }

  return { checkoutUrl };
}

// Export for testing
export { verifyLsSignature as _verifyLsSignature, lsSkuToCredits as _lsSkuToCredits };
