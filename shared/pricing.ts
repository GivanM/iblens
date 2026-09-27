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
  // Name your own price for the report in front of you. The webhook treats a payment
  // that carries one of our order ids like any other purchase of a single report.
  pay_what_you_want: "https://iblens.lemonsqueezy.com/checkout/buy/cb8c296d-5334-4ce0-9c79-b4c24a4e7e49",
} as const;

/**
 * Name your own price, from $1, for the report you are looking at. It buys exactly what
 * $9.99 buys: the full report opens and the two re-checks come with it. In the month after
 * the free preview launched, 126 previews produced no sales at all, and nobody used the
 * old version of this button, which took money and unlocked nothing.
 *
 * A payment made from the storefront, with no order of ours attached, is still recorded as a
 * tip and grants nothing, because there is no report to open.
 */
export const PAY_WHAT_YOU_WANT = {
  // Product "IBLens free preview: pay what you want" (id 1366245), $1 minimum, $5 suggested,
  // not shown on the storefront. Created 16 September 2026.
  buyUrl: "https://iblens.lemonsqueezy.com/checkout/buy/cb8c296d-5334-4ce0-9c79-b4c24a4e7e49",
  variantId: 2134383,
  suggestedUsd: 5,
  minUsd: 1,
  /**
   * On since 27 September 2026, when the product (id 1366245) was renamed "IBLens full report:
   * name your price" and its description rewritten, so the checkout page says the same thing
   * as the button that leads to it. Turning this off leaves the server side alone: a payment
   * carrying one of our order ids opens its report either way.
   */
  unlocksReport: true,
};

/** Map from our ProductKey to LemonSqueezy SKU key */
export const PRODUCT_KEY_TO_LS_SKU: Record<keyof typeof PRICES, string> = {
  ESSAY_SINGLE: "essay_single",
  ESSAY_PACK_5: "essay_pack_5",
  ESSAY_PACK_10: "essay_pack_10",
  UNIVERSITY_SINGLE: "university_strategy",
};
