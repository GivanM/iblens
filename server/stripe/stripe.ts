import Stripe from "stripe";
import { Express, Request, Response } from "express";
import { upgradeUserToPro, downgradeUserToFree } from "../db";
import { PRODUCTS } from "./products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function createCheckoutSession(params: {
  userId: number;
  userEmail: string | null;
  userName: string | null;
  origin: string;
}) {
  // Create or reuse a Stripe price
  const product = await stripe.products.create({
    name: PRODUCTS.PRO_MONTHLY.name,
    description: PRODUCTS.PRO_MONTHLY.description,
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: PRODUCTS.PRO_MONTHLY.priceAmount,
    currency: PRODUCTS.PRO_MONTHLY.currency,
    recurring: { interval: PRODUCTS.PRO_MONTHLY.interval },
  });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: price.id, quantity: 1 }],
    client_reference_id: params.userId.toString(),
    customer_email: params.userEmail || undefined,
    allow_promotion_codes: true,
    metadata: {
      user_id: params.userId.toString(),
      customer_email: params.userEmail || "",
      customer_name: params.userName || "",
    },
    success_url: `${params.origin}/dashboard?payment=success`,
    cancel_url: `${params.origin}/dashboard?payment=cancelled`,
  });

  return session;
}

export function registerStripeWebhook(app: Express) {
  // Must be registered BEFORE express.json() middleware
  app.post(
    "/api/stripe/webhook",
    express_raw_middleware,
    async (req: Request, res: Response) => {
      const sig = req.headers["stripe-signature"];
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!sig || !webhookSecret) {
        return res.status(400).json({ error: "Missing signature or webhook secret" });
      }

      let event: Stripe.Event;
      try {
        event = stripe.webhooks.constructEvent(
          (req as any).rawBody || req.body,
          sig,
          webhookSecret
        );
      } catch (err: any) {
        console.error("[Stripe Webhook] Signature verification failed:", err.message);
        return res.status(400).json({ error: "Webhook signature verification failed" });
      }

      // Handle test events
      if (event.id.startsWith("evt_test_")) {
        console.log("[Webhook] Test event detected, returning verification response");
        return res.json({ verified: true });
      }

      console.log(`[Stripe Webhook] Event: ${event.type} (${event.id})`);

      try {
        switch (event.type) {
          case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            const userId = parseInt(session.client_reference_id || session.metadata?.user_id || "0");
            const customerId = session.customer as string;
            const subscriptionId = session.subscription as string;

            if (userId && customerId && subscriptionId) {
              await upgradeUserToPro(userId, customerId, subscriptionId);
              console.log(`[Stripe] User ${userId} upgraded to Pro`);
            }
            break;
          }

          case "customer.subscription.deleted": {
            const subscription = event.data.object as Stripe.Subscription;
            await downgradeUserToFree(subscription.id);
            console.log(`[Stripe] Subscription ${subscription.id} cancelled, user downgraded`);
            break;
          }

          case "invoice.payment_failed": {
            const invoice = event.data.object as Stripe.Invoice;
            console.log(`[Stripe] Payment failed for invoice ${invoice.id}`);
            break;
          }

          default:
            console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
        }
      } catch (error) {
        console.error("[Stripe Webhook] Error processing event:", error);
      }

      res.json({ received: true });
    }
  );
}

// Raw body middleware for Stripe webhook signature verification
function express_raw_middleware(req: Request, _res: Response, next: Function) {
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
