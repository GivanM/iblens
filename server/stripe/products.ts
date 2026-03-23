export const PRODUCTS = {
  PRO_MONTHLY: {
    name: "IBLens Pro",
    description: "Unlimited IB essay analyses and university strategies",
    priceAmount: 1499, // $14.99 in cents
    currency: "usd",
    interval: "month" as const,
  },
} as const;
