import Stripe from "stripe";
import { Express, Request, Response } from "express";
import { createPayment, completePayment, getPaymentById } from "../db";
import { PRODUCTS, ProductKey } from "./products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function createStripeCheckout(params: {
  userId: number;
  userEmail: string | null;
  userName: string | null;
  origin: string;
  productKey: ProductKey;
}) {
  const product = PRODUCTS[params.productKey];

  // Create a pending payment record in our DB
  const paymentRecord = await createPayment({
    userId: params.userId,
    productType: product.productType,
    creditsGranted: product.credits.essay + product.credits.university,
    amount: product.priceAmount,
    currency: product.currency,
    provider: "stripe",
    status: "pending",
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: product.currency,
        product_data: {
          name: product.name,
          description: product.description,
        },
        unit_amount: product.priceAmount,
      },
      quantity: 1,
    }],
    client_reference_id: params.userId.toString(),
    customer_email: params.userEmail || undefined,
    allow_promotion_codes: true,
    metadata: {
      user_id: params.userId.toString(),
      payment_id: paymentRecord.id.toString(),
      product_key: params.productKey,
    },
    success_url: `${params.origin}/dashboard?payment=success`,
    cancel_url: `${params.origin}/dashboard?payment=cancelled`,
  });

  // Store the Stripe session ID on our payment record
  if (session.id) {
    const { getDb } = await import("../db");
    const db = await getDb();
    if (db) {
      const { payments } = await import("../../drizzle/schema");
      const { eq } = await import("drizzle-orm");
      await db.update(payments)
        .set({ providerPaymentId: session.id })
        .where(eq(payments.id, paymentRecord.id));
    }
  }

  return session;
}

export function registerStripeWebhook(app: Express) {
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
            const paymentId = parseInt(session.metadata?.payment_id || "0");

            if (paymentId) {
              await completePayment(paymentId, session.id);
              console.log(`[Stripe] Payment ${paymentId} completed, credits granted`);
            }
            break;
          }

          case "payment_intent.payment_failed": {
            console.log(`[Stripe] Payment failed for intent ${(event.data.object as any).id}`);
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
