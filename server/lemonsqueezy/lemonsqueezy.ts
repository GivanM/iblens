import { Express, Request, Response } from "express";
import crypto from "crypto";
import { upgradeUserToProLS, downgradeUserToFreeLS } from "../db";

const LS_API_BASE = "https://api.lemonsqueezy.com/v1";

function getConfig() {
  return {
    apiKey: process.env.LEMONSQUEEZY_API_KEY || "",
    storeId: process.env.LEMONSQUEEZY_STORE_ID || "",
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID || "",
    webhookSecret: process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "",
  };
}

/**
 * Create a LemonSqueezy checkout session via their API.
 * Returns the checkout URL to redirect the user to.
 */
export async function createLSCheckoutSession(params: {
  userId: number;
  userEmail: string | null;
  userName: string | null;
  origin: string;
}) {
  const config = getConfig();

  if (!config.apiKey || !config.storeId || !config.variantId) {
    throw new Error("LemonSqueezy is not configured. Please add API keys in Settings → Secrets.");
  }

  const body = {
    data: {
      type: "checkouts",
      attributes: {
        checkout_data: {
          email: params.userEmail || undefined,
          name: params.userName || undefined,
          custom: {
            user_id: params.userId.toString(),
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
        store: {
          data: {
            type: "stores",
            id: config.storeId,
          },
        },
        variant: {
          data: {
            type: "variants",
            id: config.variantId,
          },
        },
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

/**
 * Verify LemonSqueezy webhook signature using HMAC-SHA256.
 */
function verifyWebhookSignature(rawBody: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(rawBody).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

/**
 * Register the LemonSqueezy webhook endpoint on Express.
 * Must be called BEFORE express.json() middleware.
 */
export function registerLemonSqueezyWebhook(app: Express) {
  app.post(
    "/api/lemonsqueezy/webhook",
    lsRawMiddleware,
    async (req: Request, res: Response) => {
      const config = getConfig();
      const signature = req.headers["x-signature"] as string;

      if (!signature || !config.webhookSecret) {
        console.warn("[LemonSqueezy Webhook] Missing signature or webhook secret");
        return res.status(400).json({ error: "Missing signature or webhook secret" });
      }

      const rawBody = (req as any).rawBody;
      if (!rawBody) {
        return res.status(400).json({ error: "Missing request body" });
      }

      // Verify signature
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
      const subscriptionData = payload?.data?.attributes;

      console.log(`[LemonSqueezy Webhook] Event: ${eventName}`);

      try {
        switch (eventName) {
          case "subscription_created":
          case "subscription_updated": {
            const userId = parseInt(customData?.user_id || "0");
            const status = subscriptionData?.status;
            const lsSubscriptionId = String(payload?.data?.id || "");
            const lsCustomerId = String(subscriptionData?.customer_id || "");

            if (userId && (status === "active" || status === "trialing")) {
              await upgradeUserToProLS(userId, lsCustomerId, lsSubscriptionId);
              console.log(`[LemonSqueezy] User ${userId} upgraded to Pro (sub: ${lsSubscriptionId})`);
            } else if (userId && (status === "cancelled" || status === "expired" || status === "past_due")) {
              await downgradeUserToFreeLS(lsSubscriptionId);
              console.log(`[LemonSqueezy] User downgraded (sub: ${lsSubscriptionId}, status: ${status})`);
            }
            break;
          }

          case "subscription_cancelled":
          case "subscription_expired": {
            const lsSubscriptionId = String(payload?.data?.id || "");
            if (lsSubscriptionId) {
              await downgradeUserToFreeLS(lsSubscriptionId);
              console.log(`[LemonSqueezy] Subscription ${lsSubscriptionId} ended, user downgraded`);
            }
            break;
          }

          case "subscription_payment_success": {
            console.log(`[LemonSqueezy] Payment success for subscription ${payload?.data?.id}`);
            break;
          }

          case "subscription_payment_failed": {
            console.log(`[LemonSqueezy] Payment failed for subscription ${payload?.data?.id}`);
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

/**
 * Raw body middleware for LemonSqueezy webhook signature verification.
 */
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
