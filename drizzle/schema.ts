import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, boolean, decimal } from "drizzle-orm/mysql-core";

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
  provider: mysqlEnum("provider", ["coingate"]).notNull(),
  providerPaymentId: varchar("providerPaymentId", { length: 255 }),
  callbackToken: varchar("callbackToken", { length: 255 }),
  status: mysqlEnum("status", ["pending", "completed", "failed", "expired"]).default("pending").notNull(),
  // Metadata
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Analysis = typeof analyses.$inferSelect;
export type InsertAnalysis = typeof analyses.$inferInsert;
export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;
