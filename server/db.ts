import { eq, desc, sql, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users, analyses, InsertAnalysis, payments, InsertPayment,
  anonymousAnalyses, InsertAnonymousAnalysis,
  orders, InsertOrder, webhookEvents, InsertWebhookEvent,
  creditLedger, InsertCreditLedgerEntry,
} from "../drizzle/schema";
import crypto from "crypto";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ---- Analysis helpers ----

export async function createAnalysis(data: InsertAnalysis) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(analyses).values(data).$returningId();
  return result;
}

export async function getUserAnalyses(userId: number, limit = 20) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(analyses).where(eq(analyses.userId, userId)).orderBy(desc(analyses.createdAt)).limit(limit);
}

export async function getAnalysisById(id: number, userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(analyses)
    .where(eq(analyses.id, id))
    .limit(1);

  if (result.length === 0 || result[0].userId !== userId) return undefined;
  return result[0];
}

// ---- Credits / Usage helpers ----

export interface UserCredits {
  freeEssayUsed: boolean;
  essayCredits: number;
  universityCredits: number;
}

export async function getUserCredits(userId: number): Promise<UserCredits | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select({
    freeEssayUsed: users.freeEssayUsed,
    essayCredits: users.essayCredits,
    universityCredits: users.universityCredits,
  }).from(users).where(eq(users.id, userId)).limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function canUserAnalyzeEssay(userId: number): Promise<{ allowed: boolean; reason?: string; isFree?: boolean }> {
  const credits = await getUserCredits(userId);
  if (!credits) return { allowed: false, reason: "User not found" };

  // First free essay
  if (!credits.freeEssayUsed) {
    return { allowed: true, isFree: true };
  }

  // Paid credits
  if (credits.essayCredits > 0) {
    return { allowed: true, isFree: false };
  }

  return { allowed: false, reason: "No essay credits remaining. Purchase more to continue." };
}

export async function canUserAnalyzeUniversity(userId: number): Promise<{ allowed: boolean; reason?: string }> {
  const credits = await getUserCredits(userId);
  if (!credits) return { allowed: false, reason: "User not found" };

  if (credits.universityCredits > 0) {
    return { allowed: true };
  }

  return { allowed: false, reason: "No university strategy credits. Purchase to use this feature." };
}

export async function consumeEssayCredit(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const credits = await getUserCredits(userId);
  if (!credits) throw new Error("User not found");

  if (!credits.freeEssayUsed) {
    // Use the free essay
    await db.update(users)
      .set({ freeEssayUsed: true })
      .where(eq(users.id, userId));
    return;
  }

  if (credits.essayCredits <= 0) {
    throw new Error("No essay credits remaining");
  }

  await db.update(users)
    .set({ essayCredits: sql`${users.essayCredits} - 1` })
    .where(eq(users.id, userId));
}

export async function consumeUniversityCredit(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const credits = await getUserCredits(userId);
  if (!credits || credits.universityCredits <= 0) {
    throw new Error("No university credits remaining");
  }

  await db.update(users)
    .set({ universityCredits: sql`${users.universityCredits} - 1` })
    .where(eq(users.id, userId));
}

export async function addCredits(userId: number, essayCredits: number, universityCredits: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateSet: Record<string, any> = {};
  if (essayCredits > 0) {
    updateSet.essayCredits = sql`${users.essayCredits} + ${essayCredits}`;
  }
  if (universityCredits > 0) {
    updateSet.universityCredits = sql`${users.universityCredits} + ${universityCredits}`;
  }

  if (Object.keys(updateSet).length > 0) {
    await db.update(users).set(updateSet).where(eq(users.id, userId));
  }
}

// ---- Payment helpers ----

export async function createPayment(data: InsertPayment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(payments).values(data).$returningId();
  return result;
}

export async function completePayment(paymentId: number, providerPaymentId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Get payment details
  const [payment] = await db.select().from(payments).where(eq(payments.id, paymentId)).limit(1);
  if (!payment) throw new Error("Payment not found");

  // Mark as completed
  await db.update(payments)
    .set({ status: "completed", providerPaymentId, completedAt: new Date() })
    .where(eq(payments.id, paymentId));

  // Grant credits
  const essayCredits = payment.productType === "essay_single" ? 1
    : payment.productType === "essay_pack_5" ? 5
    : payment.productType === "essay_pack_10" ? 10
    : 0;

  const universityCredits = payment.productType === "university_single" ? 1 : 0;

  await addCredits(payment.userId, essayCredits, universityCredits);

  return payment;
}

export async function setTelegramUsername(userId: number, telegramUsername: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const normalized = telegramUsername.toLowerCase().replace("@", "").trim();
  await db.update(users)
    .set({ telegramUsername: normalized })
    .where(eq(users.id, userId));
  return normalized;
}

export async function getTelegramUsername(userId: number): Promise<string | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select({ telegramUsername: users.telegramUsername })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return result.length > 0 ? result[0].telegramUsername : null;
}

export async function completePaymentByProviderId(providerPaymentId: string, provider: "tribute" | "nowpayments") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [payment] = await db.select().from(payments)
    .where(and(eq(payments.providerPaymentId, providerPaymentId), eq(payments.provider, provider)))
    .limit(1);

  if (!payment) return null;
  if (payment.status === "completed") return payment; // already processed

  await db.update(payments)
    .set({ status: "completed", completedAt: new Date() })
    .where(eq(payments.id, payment.id));

  // Grant credits
  const essayCredits = payment.productType === "essay_single" ? 1
    : payment.productType === "essay_pack_5" ? 5
    : payment.productType === "essay_pack_10" ? 10
    : 0;

  const universityCredits = payment.productType === "university_single" ? 1 : 0;

  await addCredits(payment.userId, essayCredits, universityCredits);

  return payment;
}

export async function failPayment(paymentId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(payments)
    .set({ status: "failed" })
    .where(eq(payments.id, paymentId));
}

export async function getUserPayments(userId: number, limit = 20) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(payments)
    .where(eq(payments.userId, userId))
    .orderBy(desc(payments.createdAt))
    .limit(limit);
}

export async function getPaymentById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(payments).where(eq(payments.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getPendingPaymentByProviderIdAndProvider(providerPaymentId: string, provider: "tribute" | "nowpayments") {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(payments)
    .where(and(
      eq(payments.providerPaymentId, providerPaymentId),
      eq(payments.provider, provider),
      eq(payments.status, "pending"),
    ))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ---- Anonymous analysis helpers ----

export function generateFingerprint(ip: string, userAgent: string): string {
  return crypto.createHash("sha256").update(`${ip}::${userAgent}`).digest("hex").substring(0, 64);
}

export async function getAnonymousAnalysisCount(fingerprint: string): Promise<number> {
  const db = await getDb();
  if (!db) return 0;

  const result = await db.select({ count: sql<number>`count(*)` })
    .from(anonymousAnalyses)
    .where(eq(anonymousAnalyses.fingerprint, fingerprint));

  return result[0]?.count ?? 0;
}

export async function canAnonymousAnalyze(fingerprint: string): Promise<{ allowed: boolean; reason?: string }> {
  const count = await getAnonymousAnalysisCount(fingerprint);
  if (count >= 1) {
    return { allowed: false, reason: "You've used your free analysis. Sign in to purchase more credits." };
  }
  return { allowed: true };
}

export async function createAnonymousAnalysis(data: InsertAnonymousAnalysis) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(anonymousAnalyses).values(data).$returningId();
  return result;
}

// ---- Order helpers (NOWPayments) ----

export async function createOrder(data: InsertOrder) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(orders).values(data);
  return data;
}

export async function getOrderById(id: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateOrderStatus(id: string, status: string, npPaymentId?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateSet: Record<string, any> = { status };
  if (npPaymentId) {
    updateSet.npPaymentId = npPaymentId;
  }

  await db.update(orders).set(updateSet).where(eq(orders.id, id));
}

// ---- Webhook event helpers (idempotency) ----

/**
 * Insert a webhook event. Returns true if inserted (new event), false if duplicate.
 */
export async function insertWebhookEvent(data: InsertWebhookEvent): Promise<boolean> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.insert(webhookEvents).values(data);
    return true; // new event
  } catch (error: any) {
    // Duplicate key error (MySQL error code 1062)
    if (error?.code === "ER_DUP_ENTRY" || error?.errno === 1062 || String(error?.message || "").includes("Duplicate")) {
      return false; // already processed
    }
    throw error;
  }
}

// ---- Credit ledger helpers ----

export async function addCreditLedgerEntry(data: InsertCreditLedgerEntry) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(creditLedger).values(data);
}

/**
 * Get user credit balance from credit_ledger (sum of deltas by creditType).
 * This is the source of truth for NOWPayments credits.
 * For now, we still use denormalized counters on users table for backward compatibility.
 */
export async function getUserCreditBalanceFromLedger(userId: number): Promise<{ essay: number; university: number }> {
  const db = await getDb();
  if (!db) return { essay: 0, university: 0 };

  const result = await db.select({
    creditType: creditLedger.creditType,
    total: sql<number>`COALESCE(SUM(${creditLedger.delta}), 0)`,
  })
    .from(creditLedger)
    .where(eq(creditLedger.userId, userId))
    .groupBy(creditLedger.creditType);

  let essay = 0;
  let university = 0;
  for (const row of result) {
    if (row.creditType === "essay") essay = Number(row.total);
    if (row.creditType === "university") university = Number(row.total);
  }

  return { essay, university };
}

/**
 * Grant credits via credit_ledger AND update denormalized counters on users table.
 * This keeps both systems in sync during the transition.
 */
export async function grantCreditsViaLedger(
  userId: number,
  essayCredits: number,
  universityCredits: number,
  reason: string,
  orderId?: string,
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Insert ledger entries
  if (essayCredits !== 0) {
    await db.insert(creditLedger).values({
      userId,
      delta: essayCredits,
      reason,
      orderId: orderId || null,
      creditType: "essay",
    });
  }
  if (universityCredits !== 0) {
    await db.insert(creditLedger).values({
      userId,
      delta: universityCredits,
      reason,
      orderId: orderId || null,
      creditType: "university",
    });
  }

  // Also update denormalized counters for backward compatibility
  await addCredits(userId, Math.max(0, essayCredits), Math.max(0, universityCredits));

  // For negative deltas (refunds), deduct from denormalized counters too
  if (essayCredits < 0 || universityCredits < 0) {
    const updateSet: Record<string, any> = {};
    if (essayCredits < 0) {
      updateSet.essayCredits = sql`GREATEST(${users.essayCredits} + ${essayCredits}, 0)`;
    }
    if (universityCredits < 0) {
      updateSet.universityCredits = sql`GREATEST(${users.universityCredits} + ${universityCredits}, 0)`;
    }
    if (Object.keys(updateSet).length > 0) {
      await db.update(users).set(updateSet).where(eq(users.id, userId));
    }
  }
}
