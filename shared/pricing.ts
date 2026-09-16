/**
 * Centralized pricing constants for IBLens.
 * Change prices here, every page, component, and server module imports from this file.
 *
 * Prices are in USD cents (integer).
 */

export const PRICES = {
  ESSAY_SINGLE: 999,
  ESSAY_PACK_5: 2499,
  ESSAY_PACK_10: 4499,
  UNIVERSITY_SINGLE: 2500,
} as const;

/** Human-readable formatted price strings (e.g. "$9.99") */
export const PRICE_LABELS: Record<keyof typeof PRICES, string> = {
  ESSAY_SINGLE: `$${(PRICES.ESSAY_SINGLE / 100).toFixed(2)}`,
  ESSAY_PACK_5: `$${(PRICES.ESSAY_PACK_5 / 100).toFixed(2)}`,
  ESSAY_PACK_10: `$${(PRICES.ESSAY_PACK_10 / 100).toFixed(2)}`,
  UNIVERSITY_SINGLE: `$${(PRICES.UNIVERSITY_SINGLE / 100).toFixed(0)}`,
};

export type ProductKey = keyof typeof PRICES;

/**
 * LemonSqueezy variant IDs per SKU (integer, used for API calls).
 * These are NOT secrets, they are public product identifiers.
 */
export const LEMONSQUEEZY_VARIANTS: Record<string, number> = {
  essay_single: 1593708,
  essay_pack_5: 1593731,
  essay_pack_10: 1593732,
  university_strategy: 1593734,
} as const;

/**
 * LemonSqueezy direct buy URLs per SKU.
 * Built from the product's buy_now_url, no server-side API call needed.
 */
export const LEMONSQUEEZY_BUY_URLS: Record<string, string> = {
  essay_single: "https://iblens.lemonsqueezy.com/checkout/buy/6f96fb90-786a-43cc-9378-e24da5eeffa5",
  essay_pack_5: "https://iblens.lemonsqueezy.com/checkout/buy/a617a75e-0ac9-4108-b8f0-7b386f35e640",
  essay_pack_10: "https://iblens.lemonsqueezy.com/checkout/buy/15e5f9b9-dc3b-4d8d-a377-a1db1746da03",
  // University Strategy was withdrawn in July and unpublished in the LemonSqueezy
  // dashboard in September. The links stay out of the code so nothing can build a
  // checkout for it by accident.
  university_strategy: "",
  university_single: "",
} as const;

/**
 * Pay what you want for a free preview, $5 suggested. It grants no credits and unlocks
 * nothing. LemonSqueezy forbids donations "where no product exists", so this is the price
 * of the preview the reader already received. buyUrl stays empty, and the button hidden,
 * until the product exists in the store; the webhook also recognises it by name.
 */
export const PAY_WHAT_YOU_WANT = {
  buyUrl: "",
  variantId: 0,
  suggestedUsd: 5,
};

/** Map from our ProductKey to LemonSqueezy SKU key */
export const PRODUCT_KEY_TO_LS_SKU: Record<keyof typeof PRICES, string> = {
  ESSAY_SINGLE: "essay_single",
  ESSAY_PACK_5: "essay_pack_5",
  ESSAY_PACK_10: "essay_pack_10",
  UNIVERSITY_SINGLE: "university_strategy",
};
