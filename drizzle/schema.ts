import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, boolean } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  tier: mysqlEnum("tier", ["free", "pro"]).default("free").notNull(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  lsCustomerId: varchar("lsCustomerId", { length: 255 }),
  lsSubscriptionId: varchar("lsSubscriptionId", { length: 255 }),
  analysisCount: int("analysisCount").default(0).notNull(),
  freeAnalysisLimit: int("freeAnalysisLimit").default(1).notNull(),
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

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Analysis = typeof analyses.$inferSelect;
export type InsertAnalysis = typeof analyses.$inferInsert;
