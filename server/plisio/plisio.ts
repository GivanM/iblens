import { Express, Request, Response } from "express";
import crypto from "crypto";
import { createPayment, completePayment, failPayment } from "../db";
import { PRODUCTS, ProductKey } from "../products";

const PLISIO_API_BASE = "https://api.plisio.net/api/v1";

function getConfig() {
  return {
    secretKey: process.env.PLISIO_SECRET_KEY || "",
  };
}

/**
 * Verify Plisio callback data using HMAC-SHA1.
 * Per Plisio docs: remove verify_hash from data, JSON.stringify the rest,
 * compute HMAC-SHA1 with SECRET_KEY, compare to verify_hash.
 */
function verifyCallbackData(data: Record<string, unknown>, secretKey: string): boolean {
  if (!data.verify_hash || !secretKey) return false;

  const ordered = { ...data };
  delete ordered.verify_hash;
  const jsonString = JSON.stringify(ordered);
  const hmac = crypto.createHmac("sha1", secretKey);
  hmac.update(jsonString);
  const hash = hmac.digest("hex");
  return hash === data.verify_hash;
}

/**
 * Create a Plisio invoice.
 * Plisio supports 20+ cryptocurrencies with 0.5% fee.
 * No KYC/business verification required.
 * Uses GET request with query parameters.
 */
export async function createPlisioInvoice(params: {
  userId: number;
  userEmail: string | null;
  origin: string;
  productKey: ProductKey;
}) {
  const config = getConfig();
  if (!config.secretKey) {
    throw new Error("Plisio is not configured. Please add PLISIO_SECRET_KEY in Settings → Secrets.");
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
    provider: "plisio",
    status: "pending",
  });

  // Build query parameters for Plisio GET request
  // IMPORTANT: callback_url must include ?json=true for JSON callbacks in non-PHP
  const callbackUrl = `${params.origin}/api/plisio/webhook?json=true`;

  const queryParams = new URLSearchParams({
    source_currency: "USD",
    source_amount: priceUsd,
    order_number: `iblens_${paymentRecord.id}`,
    order_name: product.name,
    description: product.description,
    callback_url: callbackUrl,
    success_invoice_url: `${params.origin}/dashboard?payment=success&provider=plisio`,
    fail_invoice_url: `${params.origin}/dashboard?payment=cancelled`,
    email: params.userEmail || "customer@iblens.com",
    api_key: config.secretKey,
  });

  const response = await fetch(`${PLISIO_API_BASE}/invoices/new?${queryParams.toString()}`, {
    method: "GET",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[Plisio] Invoice creation failed:", response.status, errorText);
    throw new Error("Failed to create payment invoice. Please try again.");
  }

  const result = await response.json();

  if (result.status !== "success" || !result.data) {
    console.error("[Plisio] Invoice creation error:", result);
    throw new Error(result.data?.message || "Failed to create payment invoice.");
  }

  // Store the Plisio transaction ID on our payment record
  if (result.data.txn_id) {
    const { getDb } = await import("../db");
    const db = await getDb();
    if (db) {
      const { payments } = await import("../../drizzle/schema");
      const { eq } = await import("drizzle-orm");
      await db.update(payments)
        .set({ providerPaymentId: `plisio_${result.data.txn_id}` })
        .where(eq(payments.id, paymentRecord.id));
    }
  }

  return {
    paymentUrl: result.data.invoice_url,
    txnId: result.data.txn_id,
    paymentId: paymentRecord.id,
  };
}

/**
 * Register Plisio webhook endpoint.
 * Plisio sends POST callbacks with JSON data when invoice status changes.
 * Verification: HMAC-SHA1 of JSON.stringify(data without verify_hash) using SECRET_KEY.
 */
export function registerPlisioWebhook(app: Express) {
  app.post(
    "/api/plisio/webhook",
    async (req: Request, res: Response) => {
      try {
        const config = getConfig();
        const payload = req.body;

        const { txn_id, order_number, status, amount, currency, source_amount } = payload;

        console.log(`[Plisio Webhook] Order: ${order_number}, Status: ${status}, Txn: ${txn_id}`);

        // Verify HMAC signature
        if (config.secretKey && !verifyCallbackData(payload, config.secretKey)) {
          console.error("[Plisio Webhook] HMAC verification failed");
          return res.status(422).send("Invalid signature");
        }

        // Extract our payment ID from order_number (format: iblens_{paymentId})
        const match = order_number?.match(/^iblens_(\d+)$/);
        if (!match) {
          console.warn("[Plisio Webhook] Unknown order_number format:", order_number);
          return res.status(200).send("ok");
        }

        const paymentId = parseInt(match[1]);

        // Handle status changes
        if (status === "completed") {
          const plisioTxnId = `plisio_${txn_id}`;
          await completePayment(paymentId, plisioTxnId);
          console.log(`[Plisio] Payment ${paymentId} completed (crypto: ${currency}, amount: ${amount}, USD: ${source_amount})`);
        } else if (status === "pending" || status === "pending internal") {
          console.log(`[Plisio] Payment ${paymentId} pending (confirmations in progress)`);
        } else if (status === "expired" || status === "cancelled" || status === "error") {
          console.log(`[Plisio] Payment ${paymentId} ${status}`);
          await failPayment(paymentId);
        } else if (status === "new") {
          console.log(`[Plisio] Payment ${paymentId} invoice created`);
        }

        // Plisio expects HTTP 200
        res.status(200).send("ok");
      } catch (error) {
        console.error("[Plisio Webhook] Error processing event:", error);
        res.status(200).send("ok");
      }
    }
  );
}
