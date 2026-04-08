import { Express, Request, Response } from "express";
import crypto from "crypto";
import { createPayment, completePayment } from "../db";
import { PRODUCTS, ProductKey } from "../stripe/products";

const NP_API_BASE = "https://api.nowpayments.io/v1";

function getConfig() {
  return {
    apiKey: process.env.NOWPAYMENTS_API_KEY || "",
    ipnSecret: process.env.NOWPAYMENTS_IPN_SECRET || "",
  };
}

/**
 * Create a NOWPayments invoice (hosted payment page).
 * User selects crypto on the hosted page and pays.
 */
export async function createNPInvoice(params: {
  userId: number;
  userEmail: string | null;
  origin: string;
  productKey: ProductKey;
}) {
  const config = getConfig();
  if (!config.apiKey) {
    throw new Error("NOWPayments is not configured. Please add API key in Settings → Secrets.");
  }

  const product = PRODUCTS[params.productKey];
  const priceUsd = product.priceAmount / 100;

  // Create a pending payment record
  const paymentRecord = await createPayment({
    userId: params.userId,
    productType: product.productType,
    creditsGranted: product.credits.essay + product.credits.university,
    amount: product.priceAmount,
    currency: product.currency,
    provider: "nowpayments",
    status: "pending",
  });

  const body = {
    price_amount: priceUsd,
    price_currency: "usd",
    order_id: `iblens_${paymentRecord.id}`,
    order_description: product.name,
    ipn_callback_url: `${params.origin}/api/nowpayments/webhook`,
    success_url: `${params.origin}/dashboard?payment=success&provider=crypto`,
    cancel_url: `${params.origin}/dashboard?payment=cancelled`,
  };

  const response = await fetch(`${NP_API_BASE}/invoice`, {
    method: "POST",
    headers: {
      "x-api-key": config.apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[NOWPayments] Invoice creation failed:", response.status, errorText);
    throw new Error("Failed to create crypto payment invoice");
  }

  const data = await response.json();

  // Store the NP invoice ID on our payment record
  if (data.id) {
    const { getDb } = await import("../db");
    const db = await getDb();
    if (db) {
      const { payments } = await import("../../drizzle/schema");
      const { eq } = await import("drizzle-orm");
      await db.update(payments)
        .set({ providerPaymentId: `np_${data.id}` })
        .where(eq(payments.id, paymentRecord.id));
    }
  }

  return {
    invoiceUrl: data.invoice_url,
    invoiceId: data.id,
    paymentId: paymentRecord.id,
  };
}

/**
 * Verify NOWPayments IPN webhook signature.
 * Sort body keys, stringify, HMAC-SHA512 with IPN secret.
 */
function verifyIPNSignature(body: any, signature: string, secret: string): boolean {
  const sortedBody = sortObject(body);
  const hmac = crypto.createHmac("sha512", secret);
  const digest = hmac.update(JSON.stringify(sortedBody)).digest("hex");
  return digest === signature;
}

function sortObject(obj: any): any {
  if (typeof obj !== "object" || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(sortObject);
  return Object.keys(obj).sort().reduce((sorted: any, key: string) => {
    sorted[key] = sortObject(obj[key]);
    return sorted;
  }, {});
}

export function registerNowPaymentsWebhook(app: Express) {
  app.post(
    "/api/nowpayments/webhook",
    npRawMiddleware,
    async (req: Request, res: Response) => {
      const config = getConfig();
      const signature = req.headers["x-nowpayments-sig"] as string;

      if (!signature || !config.ipnSecret) {
        console.warn("[NOWPayments Webhook] Missing signature or IPN secret");
        return res.status(400).json({ error: "Missing signature or IPN secret" });
      }

      // Verify signature
      try {
        const isValid = verifyIPNSignature(req.body, signature, config.ipnSecret);
        if (!isValid) {
          console.error("[NOWPayments Webhook] Signature verification failed");
          return res.status(400).json({ error: "Invalid signature" });
        }
      } catch (err: any) {
        console.error("[NOWPayments Webhook] Signature error:", err.message);
        return res.status(400).json({ error: "Signature verification error" });
      }

      const payload = req.body;
      const paymentStatus = payload.payment_status;
      const orderId = payload.order_id; // format: iblens_{paymentId}

      console.log(`[NOWPayments Webhook] Status: ${paymentStatus}, Order: ${orderId}`);

      try {
        if (paymentStatus === "finished" || paymentStatus === "confirmed") {
          // Extract our payment ID from order_id
          const match = orderId?.match(/^iblens_(\d+)$/);
          if (match) {
            const paymentId = parseInt(match[1]);
            const npPaymentId = `np_${payload.payment_id || payload.invoice_id || "unknown"}`;
            await completePayment(paymentId, npPaymentId);
            console.log(`[NOWPayments] Payment ${paymentId} completed (crypto: ${payload.pay_currency})`);
          }
        } else if (paymentStatus === "partially_paid") {
          console.log(`[NOWPayments] Partial payment received for order ${orderId}`);
        } else if (paymentStatus === "expired" || paymentStatus === "failed") {
          console.log(`[NOWPayments] Payment ${paymentStatus} for order ${orderId}`);
        }
      } catch (error) {
        console.error("[NOWPayments Webhook] Error processing event:", error);
      }

      res.json({ received: true });
    }
  );
}

function npRawMiddleware(req: Request, _res: Response, next: Function) {
  if (req.headers["content-type"] === "application/json") {
    let data = "";
    req.setEncoding("utf8");
    req.on("data", (chunk: string) => {
      data += chunk;
    });
    req.on("end", () => {
      (req as any).rawBody = data;
      try {
        req.body = JSON.parse(data);
      } catch {
        req.body = {};
      }
      next();
    });
  } else {
    next();
  }
}
