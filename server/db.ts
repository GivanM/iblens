import { eq, desc, sql, and, lt } from "drizzle-orm";
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

export async function getUserById(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
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

export async function completePaymentByProviderId(providerPaymentId: string, provider: "nowpayments" | "lemonsqueezy") {
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

export async function getPendingPaymentByProviderIdAndProvider(providerPaymentId: string, provider: "nowpayments" | "lemonsqueezy") {
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

export async function getUserOrders(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
}

// ---- Webhook event helpers (idempotency) ----

/**
 * Insert a webhook event. Returns true if inserted (new event), false if duplicate.
 */
export async function insertWebhookEvent(data: InsertWebhookEvent): Promise<{ isNew: boolean; id?: number }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db.insert(webhookEvents).values(data);
    const insertId = (result as any)[0]?.insertId;
    return { isNew: true, id: insertId }; // new event
  } catch (error: any) {
    // Duplicate key error (MySQL error code 1062)
    if (error?.code === "ER_DUP_ENTRY" || error?.errno === 1062 || String(error?.message || "").includes("Duplicate")) {
      return { isNew: false }; // already processed
    }
    throw error;
  }
}

/**
 * Update a webhook event record with additional diagnostic info.
 */
export async function updateWebhookEvent(
  id: number,
  data: Partial<Pick<InsertWebhookEvent, "signatureValid" | "paymentStatus" | "errorMessage" | "computedSignature">>,
) {
  const db = await getDb();
  if (!db) return;
  await db.update(webhookEvents).set(data).where(eq(webhookEvents.id, id));
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

export async function findOrCreateGuestUserByEmail(email: string): Promise<{ id: number }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const guestOpenId = `guest:${email}`;

  // Check for existing guest user
  const existing = await db.select({ id: users.id })
    .from(users)
    .where(eq(users.openId, guestOpenId))
    .limit(1);

  if (existing.length > 0) return { id: existing[0].id };

  // Create new guest user (onDuplicateKeyUpdate handles race conditions)
  await db.insert(users).values({
    openId: guestOpenId,
    email,
    loginMethod: "guest",
  }).onDuplicateKeyUpdate({
    set: { email, loginMethod: "guest" },
  });

  // Fetch the newly created user
  const created = await db.select({ id: users.id })
    .from(users)
    .where(eq(users.openId, guestOpenId))
    .limit(1);

  if (!created.length) throw new Error("Failed to create guest user");
  return { id: created[0].id };
}


/**
 * Move anything bought as a guest onto the account the same person signs in with.
 * A guest purchase creates a `guest:<email>` row that nobody can ever log into,
 * because sign-in is Google only. Packs bought that way would otherwise be lost.
 * Returns the number of essay credits moved.
 */
export async function absorbGuestAccount(email: string, targetUserId: number): Promise<number> {
  const db = await getDb();
  if (!db) return 0;

  const guestOpenId = `guest:${email}`;
  const rows = await db.select().from(users).where(eq(users.openId, guestOpenId)).limit(1);
  const guest: any = rows[0];
  if (!guest || guest.id === targetUserId) return 0;

  const essay = guest.essayCredits ?? 0;
  const university = guest.universityCredits ?? 0;
  if (essay <= 0 && university <= 0) return 0;

  await db.update(users)
    .set({ essayCredits: 0, universityCredits: 0 })
    .where(eq(users.id, guest.id));
  await grantCreditsViaLedger(targetUserId, essay, university, `guest-merge:${guest.id}`);
  await db.update(orders).set({ userId: targetUserId }).where(eq(orders.userId, guest.id));

  console.log(`[Merge] Guest ${guest.id} absorbed into user ${targetUserId}: essay=${essay}, university=${university}`);
  return essay;
}

/**
 * Anonymous reports are kept only as long as they are useful. A report nobody paid
 * for is deleted after 90 days; the row holds the analysis and the research
 * question, and the research question alone can identify a student at their school.
 * A purchased report is kept, because it was bought. Essay text is never stored.
 */
export async function purgeOldAnonymousAnalyses(maxAgeDays = 90): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const cutoff = new Date(Date.now() - maxAgeDays * 86400000);
  const result: any = await db.delete(anonymousAnalyses)
    .where(and(lt(anonymousAnalyses.createdAt, cutoff), eq(anonymousAnalyses.unlocked, false)));
  const removed = Number(result?.[0]?.affectedRows ?? result?.affectedRows ?? 0);
  if (removed > 0) console.log(`[Retention] Deleted ${removed} anonymous analyses older than ${maxAgeDays} days`);
  return removed;
}

/** Consume strictly a PAID essay credit (never the free slot). Used by report unlock. */
export async function consumePaidEssayCredit(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const credits = await getUserCredits(userId);
  if (!credits) throw new Error("User not found");
  if (credits.essayCredits <= 0) {
    throw new Error("Unlocking the full report requires a paid credit. Buy one for $9.99.");
  }
  await db.update(users)
    .set({ essayCredits: sql`${users.essayCredits} - 1` })
    .where(eq(users.id, userId));
}

/** Latest anonymous essay analysis for a fingerprint (with stored full result). */
export async function getLatestAnonymousEssay(fingerprint: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(anonymousAnalyses)
    .where(and(eq(anonymousAnalyses.fingerprint, fingerprint), eq(anonymousAnalyses.type, "essay")))
    .orderBy(desc(anonymousAnalyses.id))
    .limit(1);
  return rows[0] ?? null;
}

export async function setAnonymousUnlocked(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(anonymousAnalyses)
    .set({ unlocked: true, unlockedAt: new Date() })
    .where(eq(anonymousAnalyses.id, id));
}

/**
 * A purchase includes two re-checks of the same work within 14 days. Guests buy
 * without an account, so the window and the counter live on the anonymous row.
 * Returns the record to re-run, or the reason it cannot be re-run.
 */
export async function consumeAnonymousRerun(fingerprint: string) {
  const db = await getDb();
  if (!db) return { ok: false as const, reason: "Database not available" };
  const rows = await db.select().from(anonymousAnalyses)
    .where(eq(anonymousAnalyses.fingerprint, fingerprint))
    .orderBy(desc(anonymousAnalyses.createdAt)).limit(1);
  const rec: any = rows[0];
  if (!rec || !rec.resultJson) return { ok: false as const, reason: "No report found for this device." };
  if (!rec.unlocked) return { ok: false as const, reason: "This report is not unlocked." };
  const started = rec.unlockedAt ? new Date(rec.unlockedAt).getTime() : new Date(rec.createdAt).getTime();
  if ((Date.now() - started) / 86400000 > 14) {
    return { ok: false as const, reason: "Your 14-day re-check window for this draft has ended." };
  }
  if ((rec.rerunsUsed ?? 0) >= 2) {
    return { ok: false as const, reason: "You have used both re-checks for this draft." };
  }
  await db.update(anonymousAnalyses)
    .set({ rerunsUsed: (rec.rerunsUsed ?? 0) + 1 })
    .where(eq(anonymousAnalyses.id, rec.id));
  return { ok: true as const, record: rec, rerunsLeft: 1 - (rec.rerunsUsed ?? 0) };
}

/** Replace the stored report after a re-check. */
export async function updateAnonymousResult(id: number, resultJson: any, predictedGrade?: string | null) {
  const db = await getDb();
  if (!db) return;
  await db.update(anonymousAnalyses)
    .set({ resultJson, ...(predictedGrade !== undefined ? { predictedGrade } : {}) })
    .where(eq(anonymousAnalyses.id, id));
}

/** Paid unlock starts the free re-run window (14 days, 2 re-runs of the same draft). */
export async function markAnalysisUnlocked(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(analyses).set({ unlocked: true, unlockedAt: new Date() }).where(eq(analyses.id, id));
}

export async function consumeAnalysisRerun(id: number, userId: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(analyses).where(and(eq(analyses.id, id), eq(analyses.userId, userId))).limit(1);
  const rec: any = rows[0];
  if (!rec || !rec.unlocked) return { ok: false as const, reason: "This report is not unlocked." };
  const started = rec.unlockedAt ? new Date(rec.unlockedAt).getTime() : new Date(rec.createdAt).getTime();
  const days = (Date.now() - started) / 86400000;
  if (days > 14) return { ok: false as const, reason: "Your 14-day re-check window for this draft has ended." };
  if ((rec.rerunsUsed ?? 0) >= 2) return { ok: false as const, reason: "You have used both re-checks for this draft." };
  await db.update(analyses).set({ rerunsUsed: (rec.rerunsUsed ?? 0) + 1 }).where(eq(analyses.id, id));
  return { ok: true as const, record: rec, rerunsLeft: 1 - (rec.rerunsUsed ?? 0) };
}
