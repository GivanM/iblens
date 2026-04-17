/**
 * Product definitions for IBLens pay-per-use model.
 * Prices in cents (USD).
 */
export const PRODUCTS = {
  ESSAY_SINGLE: {
    name: "1 Essay Analysis",
    description: "Single IB essay analysis with AI feedback",
    priceAmount: 500,
    credits: { essay: 1, university: 0 },
  },
  ESSAY_PACK_5: {
    name: "5 Essay Analyses",
    description: "Pack of 5 IB essay analyses — save 20%",
    priceAmount: 2000,
    credits: { essay: 5, university: 0 },
  },
  ESSAY_PACK_10: {
    name: "10 Essay Analyses",
    description: "Pack of 10 IB essay analyses — save 30%",
    priceAmount: 3500,
    credits: { essay: 10, university: 0 },
  },
  UNIVERSITY_SINGLE: {
    name: "University Strategy",
    description: "Personalized university admission strategy",
    priceAmount: 1500,
    credits: { essay: 0, university: 1 },
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;
