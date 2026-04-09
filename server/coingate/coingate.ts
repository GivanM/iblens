import { Express, Request, Response } from "express";
import crypto from "crypto";
import { createPayment, completePayment } from "../db";
import { PRODUCTS, ProductKey } from "../products";

// CoinGate supports both sandbox and live environments
const CG_API_BASE = process.env.COINGATE_SANDBOX === "true"
  ? "https://api-sandbox.coingate.com/v2"
  : "https://api.coingate.com/v2";

function getConfig() {
  return {
    apiToken: process.env.COINGATE_API_TOKEN || "",
    callbackSecret: process.env.COINGATE_CALLBACK_SECRET || crypto.randomBytes(32).toString("hex"),
  };
}

/**
 * Create a CoinGate order (hosted payment page).
 * CoinGate checkout supports card (Visa/MC), Apple Pay, Google Pay, and 70+ cryptocurrencies.
 * User pays in any method, merchant receives crypto on their wallet.
 * Minimum payment: $0.50 USD.
 */
export async function createCoinGateOrder(params: {
  userId: number;
  userEmail: string | null;
  origin: string;
  productKey: ProductKey;
}) {
  const config = getConfig();
  if (!config.apiToken) {
    throw new Error("CoinGate is not configured. Please add COINGATE_API_TOKEN in Settings → Secrets.");
  }

  const product = PRODUCTS[params.productKey];
  const priceUsd = (product.priceAmount / 100).toFixed(2);

  // Map product key to internal type
  const productTypeMap: Record<string, string> = {
    ESSAY_SINGLE: "essay_single",
    ESSAY_PACK_5: "essay_pack_5",
    ESSAY_PACK_10: "essay_pack_10",
    UNIVERSITY_SINGLE: "university_single",
  };

  // Create a pending payment record in our DB
  const paymentRecord = await createPayment({
    userId: params.userId,
    productType: (productTypeMap[params.productKey] || params.productKey.toLowerCase()) as "essay_single" | "essay_pack_5" | "essay_pack_10" | "university_single",
    creditsGranted: product.credits.essay + product.credits.university,
    amount: product.priceAmount,
    currency: "usd",
    provider: "coingate",
    status: "pending",
  });

  // Generate a unique token for callback verification
  const callbackToken = crypto.createHmac("sha256", config.callbackSecret)
    .update(`${paymentRecord.id}_${params.userId}_${Date.now()}`)
    .digest("hex");

  const body = {
    order_id: `iblens_${paymentRecord.id}`,
    price_amount: parseFloat(priceUsd),
    price_currency: "USD",
    receive_currency: "DO_NOT_CONVERT", // Keep original crypto
    title: product.name,
    description: product.description,
    callback_url: `${params.origin}/api/coingate/webhook`,
    success_url: `${params.origin}/dashboard?payment=success&provider=coingate`,
    cancel_url: `${params.origin}/dashboard?payment=cancelled`,
    token: callbackToken,
    purchaser_email: params.userEmail || undefined,
  };

  const response = await fetch(`${CG_API_BASE}/orders`, {
    method: "POST",
    headers: {
      "Authorization": `Token ${config.apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[CoinGate] Order creation failed:", response.status, errorText);
    throw new Error("Failed to create payment order. Please try again.");
  }

  const data = await response.json();

  // Store the CoinGate order ID and callback token on our payment record
  if (data.id) {
    const { getDb } = await import("../db");
    const db = await getDb();
    if (db) {
      const { payments } = await import("../../drizzle/schema");
      const { eq } = await import("drizzle-orm");
      await db.update(payments)
        .set({
          providerPaymentId: `cg_${data.id}`,
          callbackToken: callbackToken,
        })
        .where(eq(payments.id, paymentRecord.id));
    }
  }

  return {
    paymentUrl: data.payment_url,
    orderId: data.id,
    paymentId: paymentRecord.id,
  };
}

/**
 * Register CoinGate webhook endpoint.
 * CoinGate sends POST callbacks when order status changes.
 * Verification: compare the token sent in callback with the one we stored.
 */
export function registerCoinGateWebhook(app: Express) {
  app.post(
    "/api/coingate/webhook",
    async (req: Request, res: Response) => {
      try {
        const payload = req.body;
        const { id, order_id, status, price_amount, pay_currency, token } = payload;

        console.log(`[CoinGate Webhook] Order: ${order_id}, Status: ${status}, CG ID: ${id}`);

        // Extract our payment ID from order_id (format: iblens_{paymentId})
        const match = order_id?.match(/^iblens_(\d+)$/);
        if (!match) {
          console.warn("[CoinGate Webhook] Unknown order_id format:", order_id);
          return res.status(200).json({ received: true });
        }

        const paymentId = parseInt(match[1]);

        // Verify callback token
        if (token) {
          const { getDb } = await import("../db");
          const db = await getDb();
          if (db) {
            const { payments } = await import("../../drizzle/schema");
            const { eq } = await import("drizzle-orm");
            const [payment] = await db.select()
              .from(payments)
              .where(eq(payments.id, paymentId))
              .limit(1);

            if (payment && payment.callbackToken && payment.callbackToken !== token) {
              console.error("[CoinGate Webhook] Token mismatch for payment", paymentId);
              return res.status(400).json({ error: "Invalid token" });
            }
          }
        }

        // Handle status changes
        if (status === "paid" || status === "confirming") {
          if (status === "paid") {
            const cgOrderId = `cg_${id}`;
            await completePayment(paymentId, cgOrderId);
            console.log(`[CoinGate] Payment ${paymentId} completed (crypto: ${pay_currency}, amount: ${price_amount})`);
          } else {
            console.log(`[CoinGate] Payment ${paymentId} confirming...`);
          }
        } else if (status === "expired" || status === "canceled" || status === "invalid") {
          console.log(`[CoinGate] Payment ${paymentId} ${status}`);
          // Optionally mark payment as failed in DB
          const { getDb } = await import("../db");
          const db = await getDb();
          if (db) {
            const { payments } = await import("../../drizzle/schema");
            const { eq } = await import("drizzle-orm");
            await db.update(payments)
              .set({ status: "failed" })
              .where(eq(payments.id, paymentId));
          }
        }

        // CoinGate expects 200 or 204
        res.status(200).json({ received: true });
      } catch (error) {
        console.error("[CoinGate Webhook] Error processing event:", error);
        res.status(200).json({ received: true });
      }
    }
  );
}
