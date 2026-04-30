import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, boolean, decimal, uniqueIndex } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  // Credits system: each user gets 1 free essay credit on signup
  freeEssayUsed: boolean("freeEssayUsed").default(false).notNull(),
  essayCredits: int("essayCredits").default(0).notNull(),
  universityCredits: int("universityCredits").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  telegramUsername: varchar("telegramUsername", { length: 100 }),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const analyses = mysqlTable("analyses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["essay", "university"]).notNull(),
  // Essay fields
  essayType: varchar("essayType", { length: 10 }),
  subject: varchar("subject", { length: 100 }),
  researchQuestion: text("researchQuestion"),
  // University fields
  predictedScore: int("predictedScore"),
  averageGrade: varchar("averageGrade", { length: 10 }),
  fieldOfStudy: varchar("fieldOfStudy", { length: 100 }),
  // Results
  resultJson: json("resultJson"),
  predictedGrade: varchar("predictedGrade", { length: 20 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  // What was purchased
  productType: mysqlEnum("productType", ["essay_single", "essay_pack_5", "essay_pack_10", "university_single"]).notNull(),
  creditsGranted: int("creditsGranted").notNull(),
  // Payment details
  amount: int("amount").notNull(), // in cents (e.g. 499 = $4.99)
  currency: varchar("currency", { length: 10 }).default("usd").notNull(),
  provider: mysqlEnum("provider", ["tribute", "nowpayments", "lemonsqueezy"]).notNull(),
  providerPaymentId: varchar("providerPaymentId", { length: 255 }),
  status: mysqlEnum("status", ["pending", "completed", "failed", "expired"]).default("pending").notNull(),
  // Metadata
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

// ---- Orders table (NOWPayments) ----
export const orders = mysqlTable("orders", {
  id: varchar("id", { length: 36 }).primaryKey(), // UUID
  userId: int("userId").notNull(),
  sku: mysqlEnum("sku", ["essay_single", "essay_pack_5", "essay_pack_10", "university_single"]).notNull(),
  amountUsd: int("amountUsd").notNull(), // in cents
  currency: varchar("currency", { length: 10 }).default("usd").notNull(),
  status: mysqlEnum("status", ["pending", "processing", "partial", "paid", "failed", "expired", "refunded"]).default("pending").notNull(),
  provider: mysqlEnum("provider", ["nowpayments", "tribute", "lemonsqueezy"]).default("nowpayments").notNull(),
  npInvoiceId: varchar("npInvoiceId", { length: 255 }),
  npPaymentId: varchar("npPaymentId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ---- Webhook events (idempotency log) ----
export const webhookEvents = mysqlTable("webhook_events", {
  id: int("id").autoincrement().primaryKey(),
  provider: varchar("provider", { length: 50 }).notNull(),
  npPaymentId: varchar("npPaymentId", { length: 255 }).notNull(),
  paymentStatus: varchar("paymentStatus", { length: 50 }).notNull(),
  rawBody: text("rawBody"),
  signatureValid: boolean("signatureValid").default(false).notNull(),
  requestHeaders: text("requestHeaders"),
  errorMessage: text("errorMessage"),
  computedSignature: varchar("computedSignature", { length: 255 }),
  receivedAt: timestamp("receivedAt").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("uniq_provider_payment_status").on(table.provider, table.npPaymentId, table.paymentStatus),
]);

// ---- Credit ledger (source of truth for credits) ----
export const creditLedger = mysqlTable("credit_ledger", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  delta: int("delta").notNull(), // positive = add credits, negative = deduct
  reason: text("reason").notNull(), // e.g. "nowpayments:essay_pack_10", "refund:order_xxx", "consume:essay"
  orderId: varchar("orderId", { length: 36 }), // FK to orders.id, nullable
  creditType: mysqlEnum("creditType", ["essay", "university"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Analysis = typeof analyses.$inferSelect;
export type InsertAnalysis = typeof analyses.$inferInsert;
// Anonymous analysis tracking (for users who haven't logged in)
export const anonymousAnalyses = mysqlTable("anonymous_analyses", {
  id: int("id").autoincrement().primaryKey(),
  fingerprint: varchar("fingerprint", { length: 64 }).notNull(), // hash of IP + user-agent
  type: mysqlEnum("type", ["essay", "university"]).notNull(),
  essayType: varchar("essayType", { length: 10 }),
  subject: varchar("subject", { length: 100 }),
  researchQuestion: text("researchQuestion"),
  resultJson: json("resultJson"),
  predictedGrade: varchar("predictedGrade", { length: 20 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;
export type AnonymousAnalysis = typeof anonymousAnalyses.$inferSelect;
export type InsertAnonymousAnalysis = typeof anonymousAnalyses.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
export type WebhookEvent = typeof webhookEvents.$inferSelect;
export type InsertWebhookEvent = typeof webhookEvents.$inferInsert;
export type CreditLedgerEntry = typeof creditLedger.$inferSelect;
export type InsertCreditLedgerEntry = typeof creditLedger.$inferInsert;
