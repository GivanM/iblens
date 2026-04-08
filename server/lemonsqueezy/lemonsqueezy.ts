import { Express, Request, Response } from "express";
import crypto from "crypto";
import { createPayment, completePayment, getPaymentById } from "../db";
import { PRODUCTS, ProductKey } from "../stripe/products";

const LS_API_BASE = "https://api.lemonsqueezy.com/v1";

function getConfig() {
  return {
    apiKey: process.env.LEMONSQUEEZY_API_KEY || "",
    storeId: process.env.LEMONSQUEEZY_STORE_ID || "",
    webhookSecret: process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "",
    // Variant IDs for each product — set in env
    essaySingleVariantId: process.env.LEMONSQUEEZY_ESSAY_SINGLE_VARIANT_ID || "",
    essayPack5VariantId: process.env.LEMONSQUEEZY_ESSAY_PACK5_VARIANT_ID || "",
    essayPack10VariantId: process.env.LEMONSQUEEZY_ESSAY_PACK10_VARIANT_ID || "",
    universitySingleVariantId: process.env.LEMONSQUEEZY_UNIVERSITY_SINGLE_VARIANT_ID || "",
  };
}

function getVariantId(productKey: ProductKey): string {
  const config = getConfig();
  switch (productKey) {
    case "ESSAY_SINGLE": return config.essaySingleVariantId;
    case "ESSAY_PACK_5": return config.essayPack5VariantId;
    case "ESSAY_PACK_10": return config.essayPack10VariantId;
    case "UNIVERSITY_SINGLE": return config.universitySingleVariantId;
    default: return "";
  }
}

export async function createLSCheckoutSession(params: {
  userId: number;
  userEmail: string | null;
  userName: string | null;
  origin: string;
  productKey: ProductKey;
}) {
  const config = getConfig();
  const variantId = getVariantId(params.productKey);

  if (!config.apiKey || !config.storeId || !variantId) {
    throw new Error("LemonSqueezy is not configured for this product. Please add API keys in Settings → Secrets.");
  }

  const product = PRODUCTS[params.productKey];

  // Create a pending payment record
  const paymentRecord = await createPayment({
    userId: params.userId,
    productType: product.productType,
    creditsGranted: product.credits.essay + product.credits.university,
    amount: product.priceAmount,
    currency: product.currency,
    provider: "lemonsqueezy",
    status: "pending",
  });

  const body = {
    data: {
      type: "checkouts",
      attributes: {
        checkout_data: {
          email: params.userEmail || undefined,
          name: params.userName || undefined,
          custom: {
            user_id: params.userId.toString(),
            payment_id: paymentRecord.id.toString(),
            product_key: params.productKey,
          },
        },
        checkout_options: {
          button_color: "#3B82F6",
        },
        product_options: {
          redirect_url: `${params.origin}/dashboard?payment=success&provider=lemonsqueezy`,
        },
      },
      relationships: {
        store: { data: { type: "stores", id: config.storeId } },
        variant: { data: { type: "variants", id: variantId } },
      },
    },
  };

  const response = await fetch(`${LS_API_BASE}/checkouts`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[LemonSqueezy] Checkout creation failed:", response.status, errorText);
    throw new Error("Failed to create LemonSqueezy checkout session");
  }

  const data = await response.json();
  const checkoutUrl = data?.data?.attributes?.url;

  if (!checkoutUrl) {
    throw new Error("LemonSqueezy returned no checkout URL");
  }

  return { url: checkoutUrl };
}

function verifyWebhookSignature(rawBody: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(rawBody).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export function registerLemonSqueezyWebhook(app: Express) {
  app.post(
    "/api/lemonsqueezy/webhook",
    lsRawMiddleware,
    async (req: Request, res: Response) => {
      const config = getConfig();
      const signature = req.headers["x-signature"] as string;

      if (!signature || !config.webhookSecret) {
        return res.status(400).json({ error: "Missing signature or webhook secret" });
      }

      const rawBody = (req as any).rawBody;
      if (!rawBody) {
        return res.status(400).json({ error: "Missing request body" });
      }

      try {
        const isValid = verifyWebhookSignature(rawBody, signature, config.webhookSecret);
        if (!isValid) {
          console.error("[LemonSqueezy Webhook] Signature verification failed");
          return res.status(400).json({ error: "Invalid signature" });
        }
      } catch (err: any) {
        console.error("[LemonSqueezy Webhook] Signature error:", err.message);
        return res.status(400).json({ error: "Signature verification error" });
      }

      const payload = req.body;
      const eventName = payload?.meta?.event_name;
      const customData = payload?.meta?.custom_data;

      console.log(`[LemonSqueezy Webhook] Event: ${eventName}`);

      try {
        switch (eventName) {
          case "order_created": {
            const paymentId = parseInt(customData?.payment_id || "0");
            const orderId = String(payload?.data?.id || "");
            const status = payload?.data?.attributes?.status;

            if (paymentId && (status === "paid" || status === "completed")) {
              await completePayment(paymentId, `ls_order_${orderId}`);
              console.log(`[LemonSqueezy] Payment ${paymentId} completed via order ${orderId}`);
            }
            break;
          }

          default:
            console.log(`[LemonSqueezy Webhook] Unhandled event: ${eventName}`);
        }
      } catch (error) {
        console.error("[LemonSqueezy Webhook] Error processing event:", error);
      }

      res.json({ received: true });
    }
  );
}

function lsRawMiddleware(req: Request, _res: Response, next: Function) {
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
