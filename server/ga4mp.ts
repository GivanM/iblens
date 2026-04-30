/**
 * GA4 Measurement Protocol — server-side event tracking.
 *
 * Sends purchase events directly to GA4 from the server after payment webhooks
 * confirm a successful transaction. This ensures conversion data reaches GA4
 * even if the client-side tracking fails (ad blockers, user closes tab, etc.).
 *
 * Endpoint: POST https://www.google-analytics.com/mp/collect
 * Docs: https://developers.google.com/analytics/devguides/collection/protocol/ga4
 *
 * Required env: GA4_MEASUREMENT_ID, GA4_API_SECRET
 */

import { ENV } from "./_core/env";

interface GA4PurchaseEvent {
  /** Internal order ID (transaction_id in GA4) */
  orderId: string;
  /** Product slug: essay_single, essay_pack_5, etc. */
  productSlug: string;
  /** Price in USD (dollars, not cents) */
  valueUsd: number;
  /** Payment method: lemonsqueezy | nowpayments */
  paymentMethod: string;
  /** User's unique ID (used as client_id fallback) */
  userId: string;
  /** User's email (plain text — will NOT be sent to GA4, only used for user_id) */
  userEmail?: string;
}

const SLUG_TO_NAME: Record<string, string> = {
  essay_single: "Single Essay Analysis",
  essay_pack_5: "5-Pack Essay Analyses",
  essay_pack_10: "10-Pack Essay Analyses",
  university_single: "University Strategy Report",
  university_strategy: "University Strategy Report",
};

/**
 * Send a purchase event to GA4 via the Measurement Protocol.
 * Silently fails if GA4_API_SECRET is not configured (non-blocking).
 */
export async function sendGA4PurchaseEvent(event: GA4PurchaseEvent): Promise<boolean> {
  const measurementId = ENV.ga4MeasurementId;
  const apiSecret = ENV.ga4ApiSecret;

  if (!apiSecret) {
    console.warn("[GA4 MP] GA4_API_SECRET not configured — skipping server-side purchase event");
    return false;
  }

  if (!measurementId) {
    console.warn("[GA4 MP] GA4_MEASUREMENT_ID not configured — skipping server-side purchase event");
    return false;
  }

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;

  // GA4 MP requires a client_id. We use the userId as a stable identifier.
  const clientId = event.userId || "server-webhook";

  const payload = {
    client_id: clientId,
    user_id: event.userId || undefined,
    events: [
      {
        name: "purchase",
        params: {
          transaction_id: event.orderId,
          value: event.valueUsd,
          currency: "USD",
          payment_type: event.paymentMethod,
          items: [
            {
              item_id: event.productSlug,
              item_name: SLUG_TO_NAME[event.productSlug] || event.productSlug,
              price: event.valueUsd,
              quantity: 1,
            },
          ],
        },
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 204) {
      console.log(`[GA4 MP] Purchase event sent: order=${event.orderId}, product=${event.productSlug}, value=$${event.valueUsd}`);
      return true;
    } else {
      const text = await response.text();
      console.error(`[GA4 MP] Failed to send purchase event: ${response.status} ${text}`);
      return false;
    }
  } catch (error) {
    console.error("[GA4 MP] Network error sending purchase event:", error);
    return false;
  }
}
