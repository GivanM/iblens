/**
 * Typed dataLayer event helpers for GTM / GA4 conversion tracking.
 *
 * Every helper pushes a structured event to window.dataLayer.
 * GTM picks these up and routes them to GA4, Google Ads, Meta Pixel, etc.
 *
 * IMPORTANT: Do NOT call gtag() directly — all events flow through dataLayer → GTM.
 */

import type { ProductSlug, PaymentMethod, AuthMethod } from "./config";

// Uses the existing Window.dataLayer declaration from analytics.ts
// dataLayer is initialized in index.html before GTM loads

function push(event: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || ([] as unknown[]);
  (window.dataLayer as unknown[]).push(event);
}

// ─── SHA-256 hashing for Enhanced Conversions ───────────────────────────────
export async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ─── Page View ──────────────────────────────────────────────────────────────
export function trackPageView(path: string, title?: string) {
  push({
    event: "page_view",
    page_path: path,
    page_title: title || document.title,
  });
}

// ─── Auth Events ────────────────────────────────────────────────────────────
export function trackSignUp(method: AuthMethod, userId: string) {
  push({
    event: "sign_up",
    method,
    user_id: userId,
  });
}

export function trackLogin(method: AuthMethod, userId: string) {
  push({
    event: "login",
    method,
    user_id: userId,
  });
}

// ─── Essay Funnel ───────────────────────────────────────────────────────────
export function trackEssayUploadStarted(subject: string, essayType: string) {
  push({
    event: "essay_upload_started",
    subject,
    essay_type: essayType,
  });
}

/**
 * PRIMARY LEAD EVENT — fires when user submits essay for analysis.
 */
export function trackEssaySubmitted(
  subject: string,
  essayType: string,
  wordCount: number,
  isFreeFirst: boolean,
) {
  push({
    event: "essay_submitted",
    subject,
    essay_type: essayType,
    word_count: wordCount,
    is_free_first: isFreeFirst,
  });
}

// ─── E-commerce Funnel ──────────────────────────────────────────────────────
export function trackViewItem(productSlug: ProductSlug, priceUsd: number) {
  push({
    event: "view_item",
    ecommerce: {
      currency: "USD",
      value: priceUsd,
      items: [
        {
          item_id: productSlug,
          item_name: slugToName(productSlug),
          price: priceUsd,
          quantity: 1,
        },
      ],
    },
  });
}

export function trackBeginCheckout(
  productSlug: ProductSlug,
  priceUsd: number,
  paymentMethod: PaymentMethod,
) {
  push({
    event: "begin_checkout",
    ecommerce: {
      currency: "USD",
      value: priceUsd,
      payment_type: paymentMethod,
      items: [
        {
          item_id: productSlug,
          item_name: slugToName(productSlug),
          price: priceUsd,
          quantity: 1,
        },
      ],
    },
  });
}

/**
 * CRITICAL PURCHASE EVENT — fires on /dashboard?payment=success.
 * Includes SHA-256 hashed email for Google Ads Enhanced Conversions.
 */
export function trackPurchase(
  orderId: string,
  productSlug: ProductSlug,
  priceUsd: number,
  paymentMethod: PaymentMethod,
  userIdHashed: string,
  emailHashed: string,
) {
  push({
    event: "purchase",
    ecommerce: {
      transaction_id: orderId,
      currency: "USD",
      value: priceUsd,
      payment_type: paymentMethod,
      items: [
        {
          item_id: productSlug,
          item_name: slugToName(productSlug),
          price: priceUsd,
          quantity: 1,
        },
      ],
    },
    // Enhanced Conversions user data (hashed)
    user_data: {
      sha256_email_address: emailHashed,
      user_id: userIdHashed,
    },
  });
}

// ─── Consent Mode ───────────────────────────────────────────────────────────
export function updateConsent(granted: boolean) {
  push({
    event: "consent_update",
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  });

  // Also push via gtag consent API for GTM to pick up
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied",
    });
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function slugToName(slug: ProductSlug): string {
  const map: Record<ProductSlug, string> = {
    essay_single: "Single Essay Analysis",
    essay_pack_5: "5-Pack Essay Analyses",
    essay_pack_10: "10-Pack Essay Analyses",
    university_strategy: "University Strategy Report",
  };
  return map[slug] || slug;
}

// Re-export config for convenience
export { GTM_CONTAINER_ID, GA4_MEASUREMENT_ID } from "./config";
