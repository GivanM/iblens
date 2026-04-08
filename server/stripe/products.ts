export const PRODUCTS = {
  ESSAY_SINGLE: {
    name: "IBLens Essay Analysis",
    description: "Single IB essay analysis with AI-powered feedback",
    priceAmount: 499, // $4.99 in cents
    currency: "usd",
    credits: { essay: 1, university: 0 },
    productType: "essay_single" as const,
  },
  ESSAY_PACK_5: {
    name: "IBLens Essay Pack (5)",
    description: "5 IB essay analyses — save 20%",
    priceAmount: 1999, // $19.99 in cents ($3.99 each)
    currency: "usd",
    credits: { essay: 5, university: 0 },
    productType: "essay_pack_5" as const,
  },
  ESSAY_PACK_10: {
    name: "IBLens Essay Pack (10)",
    description: "10 IB essay analyses — save 30%",
    priceAmount: 3499, // $34.99 in cents ($3.49 each)
    currency: "usd",
    credits: { essay: 10, university: 0 },
    productType: "essay_pack_10" as const,
  },
  UNIVERSITY_SINGLE: {
    name: "IBLens University Strategy",
    description: "Personalized university application strategy with AI analysis",
    priceAmount: 999, // $9.99 in cents
    currency: "usd",
    credits: { essay: 0, university: 1 },
    productType: "university_single" as const,
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;
export type ProductType = typeof PRODUCTS[ProductKey]["productType"];
