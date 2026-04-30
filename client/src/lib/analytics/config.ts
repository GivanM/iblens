/**
 * Analytics configuration — all tracking IDs in one place.
 *
 * GTM Container ID: GTM-WSLBPQMP
 * GA4 Measurement ID: G-391DXZEC51 (configured inside GTM, not injected directly)
 * Meta Pixel ID: PLACEHOLDER (skip for now)
 * Google Ads Conversion ID: AW-PLACEHOLDER (to be provided later)
 */

export const GTM_CONTAINER_ID = "GTM-WSLBPQMP";
export const GA4_MEASUREMENT_ID = "G-391DXZEC51";

// ─── Placeholders — swap via one-line edit when ready ───────────────────────
export const META_PIXEL_ID = "PLACEHOLDER";
export const GOOGLE_ADS_CONVERSION_ID = "AW-PLACEHOLDER";
export const GOOGLE_ADS_PURCHASE_LABEL = "PLACEHOLDER";

// ─── Product slugs (reusable across tracking calls) ─────────────────────────
export type ProductSlug =
  | "essay_single"
  | "essay_pack_5"
  | "essay_pack_10"
  | "university_strategy";

export type PaymentMethod = "lemonsqueezy" | "nowpayments" | "tribute";
export type AuthMethod = "email" | "google" | "manus_oauth";

// ─── Consent state keys ─────────────────────────────────────────────────────
export const CONSENT_STORAGE_KEY = "iblens_consent";
export type ConsentState = "granted" | "denied" | "pending";
