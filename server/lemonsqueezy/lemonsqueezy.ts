import type { Express, Request, Response } from "express";
import crypto from "crypto";
import { ENV } from "../_core/env";
import {
  getOrderById,
  updateOrderStatus,
  insertWebhookEvent,
  grantCreditsViaLedger,
} from "../db";

/**
 * LemonSqueezy webhook handler.
 *
 * Flow:
 * 1. User creates a checkout via tRPC → LS API → checkout URL
 * 2. User pays via card on LemonSqueezy checkout page
 * 3. LemonSqueezy sends webhook to POST /api/lemonsqueezy/webhook
 * 4. We verify HMAC-SHA256 signature, check idempotency, and grant credits on order_created
 *
 * Webhook security: HMAC-SHA256 of raw body signed with LEMONSQUEEZY_WEBHOOK_SECRET,
 * sent in `X-Signature` header.
 */

/**
 * Verify LemonSqueezy webhook signature.
 * LS sends HMAC-SHA256 hex digest of raw body in the X-Signature header.
 */
export function verifyLsSignature(rawBody: Buffer, signature: string, secret: string): boolean {
  if (!signature || !secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(signature, "hex"));
  } catch {
    return false;
  }
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
    // Raw body parser for signature verification
    (req: Request, res: Response, next) => {
      let rawBody = Buffer.alloc(0);
      req.on("data", (chunk: Buffer) => {
        rawBody = Buffer.concat([rawBody, chunk]);
      });
      req.on("end", () => {
        (req as any).rawBody = rawBody;
        try {
          req.body = JSON.parse(rawBody.toString("utf-8"));
        } catch {
          req.body = {};
        }
        next();
      });
    },
    async (req: Request, res: Response) => {
      try {
        const signature = req.headers["x-signature"] as string;
        const rawBody: Buffer = (req as any).rawBody;
        const body = req.body;

        console.log(`[LemonSqueezy Webhook] Received event:`, body?.meta?.event_name || "unknown");

        // Verify HMAC-SHA256 signature
        if (!verifyLsSignature(rawBody, signature, ENV.lemonsqueezyWebhookSecret)) {
          console.error("[LemonSqueezy Webhook] HMAC-SHA256 verification failed");
          return res.status(400).json({ error: "Invalid signature" });
        }

        const meta = body?.meta || {};
        const eventName = meta.event_name || "";
        const eventId = String(body?.data?.id || meta?.webhook_id || "");

        if (!eventId || !eventName) {
          console.warn("[LemonSqueezy Webhook] Missing event_id or event_name");
          return res.status(200).json({ ok: true, message: "Missing required fields" });
        }

        // Idempotency check: try to insert webhook event
        const isNew = await insertWebhookEvent({
          provider: "lemonsqueezy",
          npPaymentId: eventId, // reuse field for external event ID
          paymentStatus: eventName,
          rawBody: JSON.stringify(body),
          signatureValid: true,
        });

        if (!isNew) {
          console.log(`[LemonSqueezy Webhook] Duplicate event: id=${eventId}, type=${eventName}`);
          return res.status(200).json({ ok: true, message: "Already processed" });
        }

        // Extract order_id from custom_data
        const customData = meta.custom_data || {};
        const orderId = customData.order_id || "";

        if (eventName === "order_created") {
          if (!orderId) {
            console.warn("[LemonSqueezy Webhook] order_created without order_id in custom_data");
            return res.status(200).json({ ok: true, message: "No order_id in custom_data" });
          }

          const order = await getOrderById(orderId);
          if (!order) {
            console.warn(`[LemonSqueezy Webhook] Order not found: ${orderId}`);
            return res.status(200).json({ ok: true, message: "Order not found" });
          }

          // Mark order as paid
          await updateOrderStatus(order.id, "paid", eventId);

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
        } else if (eventName === "order_refunded") {
          if (!orderId) {
            console.warn("[LemonSqueezy Webhook] order_refunded without order_id in custom_data");
            return res.status(200).json({ ok: true, message: "No order_id in custom_data" });
          }

          const order = await getOrderById(orderId);
          if (!order) {
            console.warn(`[LemonSqueezy Webhook] Order not found for refund: ${orderId}`);
            return res.status(200).json({ ok: true, message: "Order not found" });
          }

          // Mark order as refunded
          await updateOrderStatus(order.id, "refunded", eventId);

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
        } else {
          console.log(`[LemonSqueezy Webhook] Unhandled event: ${eventName}, ignoring`);
        }

        return res.status(200).json({ ok: true });
      } catch (error) {
        console.error("[LemonSqueezy Webhook] Error:", error);
        // Return 200 to prevent LS from retrying on our errors
        return res.status(200).json({ ok: true });
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
