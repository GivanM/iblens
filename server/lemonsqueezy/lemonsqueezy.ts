import type { Express, Request, Response } from "express";
import express from "express";
import crypto from "crypto";
import { ENV } from "../_core/env";
import { LEMONSQUEEZY_BUY_URLS } from "../../shared/pricing";
import {
  getOrderById,
  updateOrderStatus,
  insertWebhookEvent,
  updateWebhookEvent,
  grantCreditsViaLedger,
  getUserById,
  getUserCredits,
  getLatestAnonymousEssay,
  getLatestAnonymousUcas,
  setAnonymousUnlocked,
  relockAnonymousForOrder,
  relockAnalysesForOrder,
  setOrderDeviceCredits,
  addDeviceCredits,
  findOrCreateGuestUserByEmail,
  ledgerHasEntry,
  ledgerAmountForOrder,
  findCreditHolderByEmail,
  removeDeviceCredits,
  debitAccountCredits,
  isGuestAccount,
  consumePaidEssayCredit,
  getAnalysisById,
  markAnalysisUnlocked,
} from "../db";
import { sendPaymentConfirmationEmail, getSkuHumanName } from "../email";
import { sendGA4PurchaseEvent } from "../ga4mp";

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
      // Only a verified delivery may own an event key. Anyone can POST here, and
      // an unsigned request writing the key first made the genuine webhook look
      // like a duplicate, so the payment was swallowed. Unverified requests get a
      // throwaway key and are logged for inspection only.
      const signatureHeader = (req.headers["x-signature"] as string) || "";
      const secretForKey = ENV.lemonsqueezyWebhookSecret || "";
      const preVerified = !!secretForKey && !!signatureHeader
        && verifyLsSignature(rawBodyStr, signatureHeader, secretForKey);
      const eventKey = preVerified
        ? `${dataId}_${eventName}`
        : `unverified_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

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
            // A purchase made straight from the LemonSqueezy storefront carries no
            // order of ours. It used to be logged and dropped, so the money was
            // taken and nothing was given. Credit it to the buyer's e-mail so it
            // can be claimed by signing in with that address.
            const attrs: any = (body as any)?.data?.attributes || {};
            const buyerEmail = String(attrs.user_email || attrs.customer_email || "").trim();
            const rawVariant = String(attrs.first_order_item?.variant_name || "");
            const productName = String(attrs.first_order_item?.product_name || attrs.product_name || "");
            // "Default" is what LemonSqueezy sends for a product with no variants.
            const variantName = (/^default$/i.test(rawVariant.trim()) ? productName : rawVariant || productName).toLowerCase();
            // Match the pack wording, not any digit in the name: "University
            // Strategy Report" and a price string both contain digits.
            // Our own products are named "Essay Analysis, 10 Pack" and
            // "10 Essay Analyses", so match both shapes rather than any digit.
            // A withdrawn product must not quietly become an essay credit.
            if (/university|strategy/.test(variantName)) {
              console.error(`[LemonSqueezy] Storefront purchase of a withdrawn product (${variantName}) by ${buyerEmail}. Refund it manually.`);
              if (webhookEventId) {
                await updateWebhookEvent(webhookEventId, { paymentStatus: "withdrawn_product", errorMessage: variantName }).catch(() => {});
              }
              return res.status(200).json({ ok: true, message: "Withdrawn product, needs manual refund" });
            }
            // Our products are named "Essay Analysis, 10 Pack" and "10 Essay
            // Analyses". LemonSqueezy sends "Default" as the variant name for a
            // product without variants, so fall back to the product name.
            const guessed = /\b10\b[\s-]*(pack|essay|analys)|pack of 10/.test(variantName) ? 10
              : /\b(5|five)\b[\s-]*(pack|essay|analys)|pack of (5|five)/.test(variantName) ? 5
              : 1;
            if (buyerEmail) {
              try {
                // The same delivery can arrive twice; the ledger remembers this one.
                const already = await ledgerHasEntry(`lemonsqueezy:storefront:${variantName || "unknown"}`, dataId);
                if (already) {
                  console.log(`[LemonSqueezy] Storefront purchase ${dataId} already credited`);
                  return res.status(200).json({ ok: true, message: "Already credited" });
                }
                // A customer who already has a real account gets the credits there.
                // Parking them on a guest record meant a signed-in buyer paid and saw
                // nothing until they happened to sign out and in again.
                const holderId = await findCreditHolderByEmail(buyerEmail)
                  ?? (await findOrCreateGuestUserByEmail(buyerEmail)).id;
                await grantCreditsViaLedger(holderId, guessed, 0, `lemonsqueezy:storefront:${variantName || "unknown"}`, dataId);
                console.warn(`[LemonSqueezy] Storefront purchase with no order_id: ${guessed} credit(s) granted to ${buyerEmail}`);
                if (webhookEventId) {
                  await updateWebhookEvent(webhookEventId, { paymentStatus: "storefront_credited" }).catch(() => {});
                }
                return res.status(200).json({ ok: true, message: "Credited to buyer email" });
              } catch (e) {
                console.error("[LemonSqueezy] Could not credit storefront purchase:", e);
              }
            }
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

          // LemonSqueezy retries deliveries, and the dedup key used to include the
          // processing status, so a retry looked new and granted the credits again.
          // The order is the thing that can only be paid once.
          if (order.status === "paid") {
            console.log(`[LemonSqueezy] Order ${order.id} already paid, skipping credit grant`);
            if (webhookEventId) {
              await updateWebhookEvent(webhookEventId, { paymentStatus: "duplicate" }).catch(() => {});
            }
            return res.status(200).json({ ok: true, message: "Already processed" });
          }

          // Grant first, mark paid second. The other way round, a failure between
          // them left the order looking settled with nothing handed over, and the
          // duplicate guard then refused every retry.
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
          await updateOrderStatus(order.id, "paid", dataId);

          // A guest bought the report sitting on their device. Open it here, because
          // they cannot sign in to spend the credit themselves: sign-in is Google
          // only and the credit lives on a guest:<email> account.
          // Only a guest needs credits on a device. A signed-in buyer has an
          // account that holds them, and moving them to a browser id took the
          // whole purchase away from every authenticated path.
          // Two separate things. Opening the report the buyer is looking at applies
          // to everyone. Parking the rest of a pack on the device applies only to
          // someone who has no account to park it on.
          const unlockFp = String(customData.unlock_fp || "");
          const buyerIsGuest = await isGuestAccount(order.userId).catch(() => false);
          const unlockKindRaw = String(customData.unlock_kind || "essay");
          // A signed-in buyer's essay report is an account row. Reaching for the newest
          // device row instead spent their credit on an old guest preview. UCAS reviews
          // are device rows for everyone, so those still go through the device.
          const unlockAnalysisId = Number(customData.unlock_analysis || 0);
          if (unlockAnalysisId > 0 && !buyerIsGuest && credits.essay > 0) {
            try {
              const target: any = await getAnalysisById(unlockAnalysisId, order.userId);
              if (target && target.userId === order.userId && target.resultJson && !target.unlocked) {
                await markAnalysisUnlocked(target.id, order.id);
                await consumePaidEssayCredit(order.userId).catch((creditErr) => {
                  console.warn(`[LemonSqueezy] Report ${target.id} opened but credit not consumed:`, creditErr);
                });
                console.log(`[LemonSqueezy] Account report ${target.id} unlocked for order ${order.id}`);
              }
            } catch (accountUnlockErr) {
              console.warn("[LemonSqueezy] Account unlock failed (non-fatal):", accountUnlockErr);
            }
          }
          if (unlockFp && credits.essay > 0 && (buyerIsGuest || unlockKindRaw === "ucas")) {
            try {
              const unlockKind = unlockKindRaw;
              const rec = unlockKind === "ucas"
                ? await getLatestAnonymousUcas(unlockFp)
                : await getLatestAnonymousEssay(unlockFp);
              // A pack is several reports. One of them opens what the buyer is
              // looking at; the rest stay with this device so they can be spent
              // without an account, which is what "no account needed" has to mean.
              // Everything this purchase bought belongs to the device: one report
              // opens now, the rest wait there. The same credits were also granted
              // to the guest account a moment ago, and leaving both in place handed
              // out a pack twice over, so the account side is taken back.
              const spentNow = rec && rec.resultJson && !(rec as any).unlocked ? 1 : 0;
              const toDevice = buyerIsGuest ? credits.essay - spentNow : 0;
              if (toDevice > 0) {
                await addDeviceCredits(unlockFp, toDevice);
                await setOrderDeviceCredits(order.id, toDevice);
              }
              // Only the part that moved to the device. The one credit the unlock
              // below consumes stays on the account until it is spent there.
              if (toDevice > 0) await debitAccountCredits(order.userId, toDevice);
              if (rec && rec.resultJson && !(rec as any).unlocked) {
                // Open the report first. If the charge against the credit then fails,
                // the buyer still has what they paid for and we are out one credit,
                // which is the right way round for the person who just paid.
                await setAnonymousUnlocked(rec.id, order.id);
                await consumePaidEssayCredit(order.userId).catch((creditErr) => {
                  console.warn(`[LemonSqueezy] Report ${rec.id} opened but credit not consumed:`, creditErr);
                });
                console.log(`[LemonSqueezy] Anonymous report ${rec.id} unlocked for order ${order.id}`);
              } else if (!rec) {
                console.warn(`[LemonSqueezy] No anonymous report for fingerprint on order ${order.id}; credits left on the account`);
              }
            } catch (unlockErr) {
              // The credits stay on the account, so the purchase is not lost either way.
              console.warn("[LemonSqueezy] Guest unlock failed (non-fatal):", unlockErr);
            }
          }

          // Update webhook event status
          if (webhookEventId) {
            await updateWebhookEvent(webhookEventId, { paymentStatus: "processed" }).catch(() => {});
          }

          // Best-effort GA4 Measurement Protocol purchase event
          try {
            await sendGA4PurchaseEvent({
              orderId: order.id,
              productSlug: order.sku,
              valueUsd: order.amountUsd / 100, // cents → dollars
              paymentMethod: "lemonsqueezy",
              userId: String(order.userId),
            });
          } catch (ga4Err) {
            console.warn("[LemonSqueezy] GA4 MP event failed (non-fatal):", ga4Err);
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
            // A storefront purchase has no order of ours, but it was credited by
            // e-mail, so the refund has to take that back the same way.
            const attrs: any = (body as any)?.data?.attributes || {};
            const buyerEmail = String(attrs.user_email || attrs.customer_email || "").trim();
            if (buyerEmail) {
              try {
                // Take back what this purchase granted and nothing more: the ledger
                // recorded the amount against the LemonSqueezy order id. Taking the
                // whole balance could remove credits from a different purchase.
                const granted = await ledgerAmountForOrder(dataId);
                const holderId = await findCreditHolderByEmail(buyerEmail);
                // Deliveries repeat. The zero-amount ledger call used here before wrote
                // nothing, so a second copy of the refund took the credits again. The
                // refund is now a negative ledger entry, which both debits the balance
                // and marks the order as refunded for any later copy.
                const alreadyRefunded = await ledgerHasEntry("lemonsqueezy:storefront-refund", dataId);
                if (granted > 0 && holderId && !alreadyRefunded) {
                  await grantCreditsViaLedger(holderId, -granted, 0, "lemonsqueezy:storefront-refund", dataId);
                  console.log(`[LemonSqueezy] Storefront refund: ${granted} credit(s) taken back from ${buyerEmail}`);
                } else if (alreadyRefunded) {
                  console.log(`[LemonSqueezy] Storefront refund for ${dataId} already applied, skipping`);
                }
                if (webhookEventId) {
                  await updateWebhookEvent(webhookEventId, { paymentStatus: "storefront_refunded" }).catch(() => {});
                }
                return res.status(200).json({ ok: true, message: "Storefront refund processed" });
              } catch (e) {
                console.error("[LemonSqueezy] Storefront refund failed:", e);
              }
            }
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

          // Deliveries repeat. Without this, a second copy of the same refund
          // clawed back another credit and closed a report belonging to a
          // different purchase.
          if (order.status === "refunded") {
            console.log(`[LemonSqueezy] Order ${order.id} already refunded, skipping`);
            if (webhookEventId) {
              await updateWebhookEvent(webhookEventId, { paymentStatus: "duplicate" }).catch(() => {});
            }
            return res.status(200).json({ ok: true, message: "Already refunded" });
          }

          // Mark order as refunded
          await updateOrderStatus(order.id, "refunded", dataId);

          // Close what the payment opened. Refunding the money and leaving the
          // report readable is a free report for anyone who asks for one.
          // Close anything this order opened for a signed-in buyer as well.
          await relockAnalysesForOrder(order.userId, order.id).catch((e) =>
            console.warn("[LemonSqueezy] Re-lock of account reports failed:", e));

          // Take back exactly what this order put on the device, not the price
          // list value, and close exactly the report it opened.
          const refundFp = String(customData.unlock_fp || "");
          if (refundFp && (order as any).deviceCreditsGranted > 0) {
            await removeDeviceCredits(refundFp, (order as any).deviceCreditsGranted).catch(() => {});
          }
          await relockAnonymousForOrder(order.id).catch((e) =>
            console.warn("[LemonSqueezy] Anonymous re-lock failed:", e));

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
 * Build a LemonSqueezy direct checkout URL without any API call.
 * Uses pre-configured buy_now_url UUIDs from LEMONSQUEEZY_BUY_URLS.
 * Passes order_id and email as query parameters so the webhook can track the order.
 */
export async function createLemonsqueezyCheckout(
  orderId: string,
  variantId: number,
  userEmail: string | null,
  productSlug?: string,
  valueUsd?: number,
  /** Anonymous device id. Present when a guest is buying the report they just ran. */
  unlockFingerprint?: string,
  /** Page the guest was on, so they land back where their report is. */
  returnTo?: string,
  /** A signed-in buyer's locked account report, opened when the payment lands. */
  unlockAnalysisId?: number,
): Promise<{ checkoutUrl: string }> {
  const slug = productSlug || "essay_single";
  const baseUrl = LEMONSQUEEZY_BUY_URLS[slug];

  if (!baseUrl) {
    throw new Error(`No checkout URL configured for product: ${slug}`);
  }

  const url = new URL(baseUrl);
  url.searchParams.set("checkout[custom][order_id]", orderId);
  if (unlockFingerprint) {
    url.searchParams.set("checkout[custom][unlock_fp]", unlockFingerprint);
    // Essay reports and UCAS reviews live in the same table. Without this the
    // webhook opens whichever row is newer, which is not what was bought.
    url.searchParams.set("checkout[custom][unlock_kind]", returnTo === "ucas-personal-statement" ? "ucas" : "essay");
  }
  if (unlockAnalysisId) {
    url.searchParams.set("checkout[custom][unlock_analysis]", String(unlockAnalysisId));
  }
  if (userEmail) {
    url.searchParams.set("checkout[email]", userEmail);
  }
  // A guest has no dashboard to come back to. Send them to the report they paid for.
  // A signed-in buyer of a named report goes to that report.
  const landing = unlockAnalysisId
    ? `dashboard/analysis/${unlockAnalysisId}`
    : unlockFingerprint ? (returnTo === "ucas-personal-statement" ? "ucas-personal-statement" : "essay") : "dashboard";
  url.searchParams.set(
    "checkout[redirect_url]",
    `https://iblens.com/${landing}?payment=success&order=${orderId}&product=${slug}&value=${((valueUsd ?? 0) / 100).toFixed(2)}&method=lemonsqueezy`,
  );

  console.log(`[LemonSqueezy] Direct checkout URL built for order ${orderId}, product ${slug}`);
  return { checkoutUrl: url.toString() };
}

// Export for testing
export { verifyLsSignature as _verifyLsSignature, lsSkuToCredits as _lsSkuToCredits };
