export const ENV = {
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  // Google OAuth
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  // Anthropic
  anthropicApiKey: process.env.ANTHROPIC_API_KEY ?? "",
  anthropicModel: process.env.ANTHROPIC_MODEL ?? "claude-opus-4-5-20251001",
  // Local file storage
  uploadsDir: process.env.UPLOADS_DIR ?? "./uploads",
  uploadsBaseUrl: process.env.UPLOADS_BASE_URL ?? "",
  // NOWPayments
  nowpaymentsApiKey: process.env.NOWPAYMENTS_API_KEY ?? "",
  nowpaymentsIpnSecret: process.env.NOWPAYMENTS_IPN_SECRET ?? "",
  // LemonSqueezy
  lemonsqueezyApiKey: process.env.LEMONSQUEEZY_API_KEY ?? "",
  lemonsqueezyWebhookSecret: process.env.LEMONSQUEEZY_WEBHOOK_SECRET ?? "",
  lemonsqueezyStoreId: process.env.LEMONSQUEEZY_STORE_ID ?? "",
  // Resend (transactional email)
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  ownerEmail: process.env.OWNER_EMAIL ?? "",
  // GA4 Measurement Protocol (server-side conversion tracking)
  ga4MeasurementId: process.env.GA4_MEASUREMENT_ID ?? "G-391DXZEC51",
  ga4ApiSecret: process.env.GA4_API_SECRET ?? "",
};
