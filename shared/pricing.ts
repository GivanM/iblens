/**
 * Centralized pricing constants for IBLens.
 * Change prices here — every page, component, and server module imports from this file.
 *
 * Prices are in USD cents (integer).
 */

export const PRICES = {
  ESSAY_SINGLE: 499,
  ESSAY_PACK_5: 1999,
  ESSAY_PACK_10: 3499,
  UNIVERSITY_SINGLE: 2500,
} as const;

/** Human-readable formatted price strings (e.g. "$4.99") */
export const PRICE_LABELS: Record<keyof typeof PRICES, string> = {
  ESSAY_SINGLE: `$${(PRICES.ESSAY_SINGLE / 100).toFixed(2)}`,
  ESSAY_PACK_5: `$${(PRICES.ESSAY_PACK_5 / 100).toFixed(2)}`,
  ESSAY_PACK_10: `$${(PRICES.ESSAY_PACK_10 / 100).toFixed(2)}`,
  UNIVERSITY_SINGLE: `$${(PRICES.UNIVERSITY_SINGLE / 100).toFixed(0)}`,
};

export type ProductKey = keyof typeof PRICES;
