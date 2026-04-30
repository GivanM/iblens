import { Express, Request, Response } from "express";
import crypto from "crypto";
import { ENV } from "../_core/env";
import {
  getOrderById,
  updateOrderStatus,
  insertWebhookEvent,
  grantCreditsViaLedger,
  getUserById,
  getUserCredits,
} from "../db";
import { sendPaymentConfirmationEmail, getSkuHumanName } from "../email";
import { PRODUCTS, ProductKey } from "../products";

/**
 * NOWPayments IPN (Instant Payment Notification) webhook handler.
 *
 * Flow:
 * 1. User creates an invoice via tRPC procedure → NOWPayments API → invoice URL
 * 2. User pays via crypto on NOWPayments checkout page
 * 3. NOWPayments sends IPN callbacks to POST /api/nowpayments/webhook
 * 4. We verify HMAC-SHA512 signature, check idempotency, and grant credits on "finished"
 *
 * Webhook security: HMAC-SHA512 of sorted JSON body signed with IPN Secret,
 * sent in `x-nowpayments-sig` header.
 */

/**
 * Recursively sort all keys in an object alphabetically.
 * Required for NOWPayments HMAC signature verification.
 */
function sortObject(obj: any): any {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(sortObject);
  const sorted: Record<string, any> = {};
  for (const key of Object.keys(obj).sort()) {
    sorted[key] = sortObject(obj[key]);
  }
  return sorted;
}

/**
 * Verify NOWPayments IPN signature.
 * NOWPayments sends HMAC-SHA512 of the sorted JSON body in the `x-nowpayments-sig` header.
 */
function verifySignature(body: Record<string, any>, signature: string, ipnSecret: string): boolean {
  if (!signature || !ipnSecret) return false;
  const sorted = sortObject(body);
  const jsonString = JSON.stringify(sorted);
  const hmac = crypto.createHmac("sha512", ipnSecret);
  hmac.update(jsonString);
  const expected = hmac.digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(signature, "hex"));
  } catch {
    // If lengths don't match, timingSafeEqual throws
    return false;
  }
}

/**
 * Map NOWPayments payment_status to our order status.
 */
type OrderStatus = "pending" | "processing" | "partial" | "paid" | "failed" | "expired" | "refunded";

function mapPaymentStatus(npStatus: string): OrderStatus {
  switch (npStatus) {
    case "waiting":
    case "confirming":
    case "confirmed":
    case "sending":
      return "processing";
    case "finished":
      return "paid";
    case "partially_paid":
      return "partial";
    case "failed":
      return "failed";
    case "expired":
      return "expired";
    case "refunded":
      return "refunded";
    default:
      return "processing";
  }
}

/**
 * Map SKU to credit amounts.
 */
function skuToCredits(sku: string): { essay: number; university: number } {
  switch (sku) {
    case "essay_single":
      return { essay: 1, university: 0 };
    case "essay_pack_5":
      return { essay: 5, university: 0 };
    case "essay_pack_10":
      return { essay: 10, university: 0 };
    case "university_single":
      return { essay: 0, university: 1 };
    default:
      return { essay: 0, university: 0 };
  }
}

/**
 * Register NOWPayments webhook endpoint.
 * Must be registered BEFORE express.json() body parser since we need raw body for HMAC.
 */
export function registerNowPaymentsWebhook(app: Express) {
  // Method guard: reject non-POST requests with 405
  app.all("/api/nowpayments/webhook", (req: Request, res: Response, next) => {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method Not Allowed" });
    }
    next();
  });

  app.post(
    "/api/nowpayments/webhook",
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
        const signature = req.headers["x-nowpayments-sig"] as string;
        const body = req.body;

        console.log(`[NOWPayments Webhook] Received:`, JSON.stringify(body).substring(0, 500));

        // Verify HMAC-SHA512 signature
        if (ENV.nowpaymentsIpnSecret) {
          if (!verifySignature(body, signature, ENV.nowpaymentsIpnSecret)) {
            console.error("[NOWPayments Webhook] HMAC-SHA512 verification failed");
            return res.status(400).json({ error: "Invalid signature" });
          }
        }

        const paymentId = String(body.payment_id || "");
        const paymentStatus = String(body.payment_status || "");
        const orderId = String(body.order_id || ""); // We set this as our order UUID
        const orderDescription = String(body.order_description || "");

        if (!paymentId || !paymentStatus) {
          console.warn("[NOWPayments Webhook] Missing payment_id or payment_status");
          return res.status(200).json({ ok: true, message: "Missing required fields" });
        }

        // Idempotency check: try to insert webhook event
        const { isNew } = await insertWebhookEvent({
          provider: "nowpayments",
          npPaymentId: paymentId,
          paymentStatus,
          rawBody: JSON.stringify(body),
          signatureValid: true,
        });

        if (!isNew) {
          console.log(`[NOWPayments Webhook] Duplicate event: payment_id=${paymentId}, status=${paymentStatus}`);
          return res.status(200).json({ ok: true, message: "Already processed" });
        }

        // Find order by order_id (our UUID)
        const order = await getOrderById(orderId);
        if (!order) {
          // Try to extract orderId from order_description as fallback
          console.warn(`[NOWPayments Webhook] Order not found: ${orderId}`);
          return res.status(200).json({ ok: true, message: "Order not found" });
        }

        // Map status
        const mappedStatus = mapPaymentStatus(paymentStatus);

        // Update order status
        await updateOrderStatus(order.id, mappedStatus, paymentId);

        console.log(`[NOWPayments Webhook] Order ${order.id}: ${paymentStatus} → ${mappedStatus}`);

        // Fulfillment on "finished" (paid)
        if (paymentStatus === "finished" && mappedStatus === "paid") {
          const credits = skuToCredits(order.sku);
          if (credits.essay > 0 || credits.university > 0) {
            await grantCreditsViaLedger(
              order.userId,
              credits.essay,
              credits.university,
              `nowpayments:${order.sku}`,
              order.id,
            );
            console.log(`[NOWPayments] Credits granted to user ${order.userId}: essay=${credits.essay}, university=${credits.university}`);
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
            console.warn("[NOWPayments] Email notification failed (non-fatal):", emailErr);
          }
        }

        // Handle refund: deduct credits
        if (paymentStatus === "refunded") {
          const credits = skuToCredits(order.sku);
          if (credits.essay > 0 || credits.university > 0) {
            await grantCreditsViaLedger(
              order.userId,
              -credits.essay,
              -credits.university,
              `refund:${order.id}`,
              order.id,
            );
            console.log(`[NOWPayments] Credits deducted from user ${order.userId} (refund): essay=-${credits.essay}, university=-${credits.university}`);
          }
        }

        // Return 200 fast
        return res.status(200).json({ ok: true });
      } catch (error) {
        console.error("[NOWPayments Webhook] Error:", error);
        // Return 200 to prevent NOWPayments from retrying on our errors
        return res.status(200).json({ ok: true });
      }
    }
  );
}

/**
 * Create a NOWPayments invoice via their API.
 * Returns the invoice URL for the user to complete payment.
 */
export async function createNowPaymentsInvoice(
  orderId: string,
  priceAmountUsd: number,
  orderDescription: string,
): Promise<{ invoiceUrl: string; invoiceId: string }> {
  const apiKey = ENV.nowpaymentsApiKey;
  if (!apiKey) {
    throw new Error("NOWPAYMENTS_API_KEY not configured");
  }

  const response = await fetch("https://api.nowpayments.io/v1/invoice", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_amount: priceAmountUsd,
      price_currency: "usd",
      order_id: orderId,
      order_description: orderDescription,
      ipn_callback_url: "https://iblens.com/api/nowpayments/webhook",
      success_url: "https://iblens.com/dashboard?payment=success",
      cancel_url: "https://iblens.com/pricing?payment=cancelled",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[NOWPayments] Invoice creation failed: ${response.status} ${errorText}`);
    throw new Error(`NOWPayments API error: ${response.status}`);
  }

  const data = await response.json();

  return {
    invoiceUrl: data.invoice_url,
    invoiceId: String(data.id),
  };
}

// Export for testing
export { verifySignature, sortObject, mapPaymentStatus, skuToCredits };
