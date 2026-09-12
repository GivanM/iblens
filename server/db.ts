import { eq, desc, sql, and, lt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users, analyses, InsertAnalysis, payments, InsertPayment,
  anonymousAnalyses, InsertAnonymousAnalysis,
  orders, InsertOrder, webhookEvents, InsertWebhookEvent, deviceCredits,
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

export async function consumeEssayCredit(userId: number): Promise<"free" | "credit"> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const credits = await getUserCredits(userId);
  if (!credits) throw new Error("User not found");

  if (!credits.freeEssayUsed) {
    // Use the free essay
    await db.update(users)
      .set({ freeEssayUsed: true })
      .where(eq(users.id, userId));
    return "free";
  }

  if (credits.essayCredits <= 0) {
    throw new Error("No essay credits remaining");
  }

  await db.update(users)
    .set({ essayCredits: sql`GREATEST(${users.essayCredits} - 1, 0)` })
    .where(eq(users.id, userId));
  return "credit";
}

export async function consumeUniversityCredit(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const credits = await getUserCredits(userId);
  if (!credits || credits.universityCredits <= 0) {
    throw new Error("No university credits remaining");
  }

  await db.update(users)
    .set({ universityCredits: sql`GREATEST(${users.universityCredits} - 1, 0)` })
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

/**
 * Free runs already used on this device, counted per product. The essay grader and
 * the UCAS checker each advertise their own free run, and they share a device id,
 * so counting every row here would silently take one of the two away.
 */
export async function getAnonymousAnalysisCount(fingerprint: string, kind: "essay" | "ucas" = "essay"): Promise<number> {
  const db = await getDb();
  if (!db) return 0;

  const isUcas = eq(anonymousAnalyses.essayType, "UCAS");
  const result = await db.select({ count: sql<number>`count(*)` })
    .from(anonymousAnalyses)
    .where(and(
      eq(anonymousAnalyses.fingerprint, fingerprint),
      kind === "ucas" ? isUcas : sql`(${anonymousAnalyses.essayType} IS NULL OR ${anonymousAnalyses.essayType} <> 'UCAS')`,
    ));

  return result[0]?.count ?? 0;
}

export async function canAnonymousAnalyze(fingerprint: string, kind: "essay" | "ucas" = "essay"): Promise<{ allowed: boolean; reason?: string }> {
  const count = await getAnonymousAnalysisCount(fingerprint, kind);
  if (count >= 1) {
    return {
      allowed: false,
      reason: kind === "ucas"
        ? "You have used your free review from this device."
        : "You have used your free analysis from this device.",
    };
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
 * This is the record of grants. Balances are read from the users table; this ledger is the audit trail of purchases, and spends are not written to it for NOWPayments credits.
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

/**
 * Guest accounts are keyed by "guest:" plus a digest of the address, because
 * openId is varchar(64) and a school address like
 * firstname.lastname@long-school-domain.edu simply did not fit: the insert threw
 * and the purchase failed at the payment button.
 */
export function guestOpenIdFor(email: string): string {
  const normalised = email.trim().toLowerCase();
  const direct = `guest:${normalised}`;
  if (direct.length <= 64) return direct;
  return `guest#${crypto.createHash("sha256").update(normalised).digest("hex").slice(0, 48)}`;
}

export async function findOrCreateGuestUserByEmail(email: string): Promise<{ id: number }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const guestOpenId = guestOpenIdFor(email);

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

  const guestOpenId = guestOpenIdFor(email);
  const rows = await db.select().from(users).where(eq(users.openId, guestOpenId)).limit(1);
  const guest: any = rows[0];
  if (!guest || guest.id === targetUserId) return 0;

  const essay = guest.essayCredits ?? 0;
  const university = guest.universityCredits ?? 0;

  // Orders move regardless: a guest who spent the credit on the report they
  // bought has nothing left to transfer, and their purchase history was
  // disappearing because of it.
  await db.update(orders).set({ userId: targetUserId }).where(eq(orders.userId, guest.id));
  if (essay <= 0 && university <= 0) return 0;

  await db.update(users)
    .set({ essayCredits: 0, universityCredits: 0 })
    .where(eq(users.id, guest.id));
  await grantCreditsViaLedger(targetUserId, essay, university, `guest-merge:${guest.id}`);

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
    .set({ essayCredits: sql`GREATEST(${users.essayCredits} - 1, 0)` })
    .where(eq(users.id, userId));
}

/** Latest anonymous essay analysis for a fingerprint (with stored full result). */
export async function getLatestAnonymousEssay(fingerprint: string) {
  const db = await getDb();
  if (!db) return null;
  // UCAS reviews are stored in this table too, with essayType "UCAS". They render
  // in a different component, so handing one to the essay reader crashes it.
  const rows = await db.select().from(anonymousAnalyses)
    .where(and(
      eq(anonymousAnalyses.fingerprint, fingerprint),
      eq(anonymousAnalyses.type, "essay"),
      sql`(${anonymousAnalyses.essayType} IS NULL OR ${anonymousAnalyses.essayType} <> 'UCAS')`,
    ))
    .orderBy(desc(anonymousAnalyses.id))
    .limit(1);
  return rows[0] ?? null;
}

/** The latest UCAS review for a device, kept apart from the essay reports. */
export async function getLatestAnonymousUcas(fingerprint: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(anonymousAnalyses)
    .where(and(eq(anonymousAnalyses.fingerprint, fingerprint), eq(anonymousAnalyses.essayType, "UCAS")))
    .orderBy(desc(anonymousAnalyses.id))
    .limit(1);
  return rows[0] ?? null;
}

export async function setAnonymousUnlocked(id: number, orderId?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(anonymousAnalyses)
    .set({ unlocked: true, unlockedAt: new Date(), ...(orderId ? { unlockOrderId: orderId } : {}) })
    .where(eq(anonymousAnalyses.id, id));
}

/**
 * A purchase includes two re-checks of the same work within 14 days. Guests buy
 * without an account, so the window and the counter live on the anonymous row.
 * Returns the record to re-run, or the reason it cannot be re-run.
 */
export async function consumeAnonymousRerun(fingerprint: string, kind: "essay" | "ucas" = "essay") {
  const db = await getDb();
  if (!db) return { ok: false as const, reason: "Database not available" };
  // Pick the row of the product being re-checked. A device can hold both an essay
  // report and a UCAS review, and taking "the latest row" burned a re-check on
  // whichever happened to be newer.
  const rec: any = kind === "ucas"
    ? await getLatestAnonymousUcas(fingerprint)
    : await getLatestAnonymousEssay(fingerprint);
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

/** Give a signed-in re-check back when the model failed. */
export async function refundAnalysisRerun(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(analyses)
    .set({ rerunsUsed: sql`GREATEST(${analyses.rerunsUsed} - 1, 0)` })
    .where(eq(analyses.id, id));
}

/** Write the result into a row that was created as a placeholder. */
export async function updateAnonymousResult(id: number, resultJson: any, predictedGrade?: string | null) {
  const db = await getDb();
  if (!db) return;
  await db.update(anonymousAnalyses)
    .set({ resultJson, ...(predictedGrade !== undefined ? { predictedGrade } : {}) })
    .where(eq(anonymousAnalyses.id, id));
}

/** Delete one analysis belonging to this user, with everything it holds. */
export async function deleteUserAnalysis(id: number, userId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  const res: any = await db.delete(analyses).where(and(eq(analyses.id, id), eq(analyses.userId, userId)));
  return Number(res?.[0]?.affectedRows ?? res?.affectedRows ?? 0) > 0;
}

/** Remove a claimed-but-failed free slot so a broken run does not cost the student theirs. */
export async function deleteAnonymousAnalysis(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(anonymousAnalyses).where(eq(anonymousAnalyses.id, id));
}

/** Credits a guest bought, held against the device that bought them. */
export async function addDeviceCredits(fingerprint: string, amount: number) {
  const db = await getDb();
  if (!db || amount <= 0) return;
  // New money on a device belongs to whoever is using it now, so the claim marker
  // is cleared: a wallet that had been taken by one account used to stay locked
  // to it for ever, and a later purchase on the same browser was unreachable.
  await db.insert(deviceCredits).values({ fingerprint, credits: amount, claimedAmount: amount })
    .onDuplicateKeyUpdate({ set: {
      credits: sql`${deviceCredits.credits} + ${amount}`,
      claimedAmount: sql`${deviceCredits.claimedAmount} + ${amount}`,
      claimedByUserId: sql`NULL`,
    } });
  console.log(`[DeviceCredits] +${amount} for ${fingerprint.slice(0, 8)}...`);
}

export async function getDeviceCredits(fingerprint: string): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const rows = await db.select().from(deviceCredits).where(eq(deviceCredits.fingerprint, fingerprint)).limit(1);
  return (rows[0] as any)?.credits ?? 0;
}

/** Returns true when a credit was actually taken. */
export async function consumeDeviceCredit(fingerprint: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  const res: any = await db.update(deviceCredits)
    .set({ credits: sql`${deviceCredits.credits} - 1` })
    .where(and(eq(deviceCredits.fingerprint, fingerprint), sql`${deviceCredits.credits} > 0`));
  const changed = Number(res?.[0]?.affectedRows ?? res?.affectedRows ?? 0);
  return changed > 0;
}

/** True when this account exists only because a guest paid: nobody can sign into it. */
export async function isGuestAccount(userId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  const rows = await db.select({ openId: users.openId }).from(users).where(eq(users.id, userId)).limit(1);
  const openId = String(rows[0]?.openId || "");
  return openId.startsWith("guest:") || openId.startsWith("guest#");
}

/** Move credits off an account and onto the device that bought them, exactly once. */
export async function debitAccountCredits(userId: number, amount: number) {
  const db = await getDb();
  if (!db || amount <= 0) return;
  await db.update(users)
    .set({ essayCredits: sql`GREATEST(${users.essayCredits} - ${amount}, 0)` })
    .where(eq(users.id, userId));
}

/**
 * Copy reports bought on a device into the account that just signed in. Without
 * this, everything a guest paid for lived only in that browser's localStorage.
 */
export async function adoptDeviceReports(fingerprint: string, userId: number): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const rows = await db.select().from(anonymousAnalyses)
    .where(and(eq(anonymousAnalyses.fingerprint, fingerprint), eq(anonymousAnalyses.unlocked, true)));
  let copied = 0;
  for (const rec of rows as any[]) {
    // By the source row id. Comparing a JSON column to a bound string is always
    // false in MySQL, so this check never matched and every page load copied the
    // same paid reports again, each copy carrying two fresh re-checks with it.
    const existing = await db.select({ id: analyses.id }).from(analyses)
      .where(and(eq(analyses.userId, userId), eq(analyses.adoptedFromId, rec.id))).limit(1);
    if (existing.length > 0) continue;
    await db.insert(analyses).values({
      userId,
      type: "essay",
      essayType: rec.essayType,
      subject: rec.subject,
      researchQuestion: rec.researchQuestion,
      resultJson: rec.resultJson,
      predictedGrade: rec.predictedGrade,
      unlocked: true,
      unlockedAt: rec.unlockedAt ?? new Date(),
      rerunsUsed: rec.rerunsUsed ?? 0,
      examSession: rec.examSession ?? null,
      unlockOrderId: rec.unlockOrderId ?? null,
      adoptedFromId: rec.id,
    });
    copied++;
  }
  if (copied > 0) console.log(`[Adopt] ${copied} paid report(s) moved to account ${userId}`);
  return copied;
}

/** Give back what a failed analysis consumed: the free slot, or one credit. */
export async function refundEssayConsumption(userId: number, wasFree: boolean) {
  const db = await getDb();
  if (!db) return;
  if (wasFree) {
    await db.update(users).set({ freeEssayUsed: false }).where(eq(users.id, userId));
  } else {
    await db.update(users)
      .set({ essayCredits: sql`${users.essayCredits} + 1` })
      .where(eq(users.id, userId));
  }
}

/** Has this exact grant already been recorded? Used to make retries harmless. */
export async function ledgerHasEntry(reason: string, orderId: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  const rows = await db.select({ id: creditLedger.id }).from(creditLedger)
    .where(and(eq(creditLedger.reason, reason), eq(creditLedger.orderId, orderId))).limit(1);
  return rows.length > 0;
}

/**
 * Empty the device wallet and say how much was in it, atomically: the read and
 * the zeroing used to be two statements, so two tabs could claim the same
 * credits twice. The claimer is remembered, so a later refund knows where the
 * credits went.
 */
export async function takeAllDeviceCredits(fingerprint: string, claimedBy: number): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  // Compare and swap: read the balance, then zero it only if it is still that
  // balance. Returning claimedAmount, which counts everything ever put here,
  // handed people more credits than they had left.
  for (let attempt = 0; attempt < 3; attempt++) {
    const rows = await db.select().from(deviceCredits).where(eq(deviceCredits.fingerprint, fingerprint)).limit(1);
    const rec: any = rows[0];
    const balance = rec?.credits ?? 0;
    if (!rec || balance <= 0) return 0;
    // A wallet already taken by someone else is not up for grabs.
    if (rec.claimedByUserId && rec.claimedByUserId !== claimedBy) return 0;
    const res: any = await db.update(deviceCredits)
      .set({ credits: 0, claimedByUserId: claimedBy })
      .where(and(eq(deviceCredits.fingerprint, fingerprint), eq(deviceCredits.credits, balance)));
    const changed = Number(res?.[0]?.affectedRows ?? res?.affectedRows ?? 0);
    if (changed > 0) return balance;
  }
  return 0;
}

/** Take back device credits that a refunded purchase had granted. */
export async function removeDeviceCredits(fingerprint: string, amount: number) {
  const db = await getDb();
  if (!db || amount <= 0) return;
  const rows = await db.select().from(deviceCredits).where(eq(deviceCredits.fingerprint, fingerprint)).limit(1);
  const rec: any = rows[0];
  const onDevice = rec?.credits ?? 0;
  const fromDevice = Math.min(onDevice, amount);
  if (fromDevice > 0) {
    await db.update(deviceCredits)
      .set({ credits: sql`GREATEST(${deviceCredits.credits} - ${fromDevice}, 0)` })
      .where(eq(deviceCredits.fingerprint, fingerprint));
  }
  // If the owner signed in and took them, the refund follows them to the account.
  const remainder = amount - fromDevice;
  if (remainder > 0 && rec?.claimedByUserId) {
    await db.update(users)
      .set({ essayCredits: sql`GREATEST(${users.essayCredits} - ${remainder}, 0)` })
      .where(eq(users.id, rec.claimedByUserId));
    console.log(`[DeviceCredits] -${remainder} taken back from account ${rec.claimedByUserId} after refund`);
  }
  console.log(`[DeviceCredits] -${fromDevice} for ${fingerprint.slice(0, 8)} after refund`);
}

/** Close a report again after its payment was refunded. */
export async function relockAnonymousAnalysis(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(anonymousAnalyses)
    .set({ unlocked: false, unlockedAt: null })
    .where(eq(anonymousAnalyses.id, id));
}

/**
 * Close the most recently opened report on an account after a refund. We do not
 * record which report a given order unlocked, so this takes the newest unlocked
 * one, which is the report the refunded purchase opened in every flow we have.
 */
export async function relockAnalysesForOrder(userId: number, orderId: string) {
  const db = await getDb();
  if (!db) return;
  // Only what this order opened. Taking "the newest unlocked report" closed
  // reports paid for by other purchases.
  // By order, not by owner: a report bought as a guest and later adopted onto an
  // account belongs to a different user than the order does.
  const res: any = await db.update(analyses)
    .set({ unlocked: false, unlockedAt: null })
    .where(eq(analyses.unlockOrderId, orderId));
  const n = Number(res?.[0]?.affectedRows ?? res?.affectedRows ?? 0);
  console.log(`[Refund] ${n} account report(s) re-locked for order ${orderId}`);
}

/** Close the anonymous report a given order opened. */
export async function relockAnonymousForOrder(orderId: string) {
  const db = await getDb();
  if (!db) return;
  const res: any = await db.update(anonymousAnalyses)
    .set({ unlocked: false, unlockedAt: null })
    .where(eq(anonymousAnalyses.unlockOrderId, orderId));
  const n = Number(res?.[0]?.affectedRows ?? res?.affectedRows ?? 0);
  console.log(`[Refund] ${n} anonymous report(s) re-locked for order ${orderId}`);
}

/** Record how much of a purchase was placed on a device. */
export async function setOrderDeviceCredits(orderId: string, amount: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(orders).set({ deviceCreditsGranted: amount }).where(eq(orders.id, orderId));
}

/** Give a re-check back when the model failed and the student got nothing. */
export async function refundAnonymousRerun(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(anonymousAnalyses)
    .set({ rerunsUsed: sql`GREATEST(${anonymousAnalyses.rerunsUsed} - 1, 0)` })
    .where(eq(anonymousAnalyses.id, id));
}

/**
 * A re-check is a new report, not a replacement. The old one is what the student
 * paid for, and the before/after comparison we sell needs both to exist.
 */
export async function createRerunAnalysis(prev: any, resultJson: any, predictedGrade?: string | null) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [row] = await db.insert(anonymousAnalyses).values({
    fingerprint: prev.fingerprint,
    type: prev.type,
    essayType: prev.essayType,
    subject: prev.subject,
    researchQuestion: prev.researchQuestion,
    resultJson,
    predictedGrade: predictedGrade ?? null,
    unlocked: true,
    unlockedAt: prev.unlockedAt ?? new Date(),
    // The allowance belongs to the purchase, not to the row. This carries the
    // count forward including the re-check that just happened; copying the old
    // number made every re-check hand out two more.
    rerunsUsed: (prev.rerunsUsed ?? 0) + 1,
    examSession: prev.examSession ?? null,
    // The re-check belongs to the purchase that opened the original, so a refund
    // closes the child as well as the parent.
    unlockOrderId: prev.unlockOrderId ?? null,
  }).$returningId();
  return row;
}

/** Paid unlock starts the free re-run window (14 days, 2 re-runs of the same draft). */
export async function markAnalysisUnlocked(id: number, orderId?: string) {
  const db = await getDb();
  if (!db) return;
  await db.update(analyses)
    .set({ unlocked: true, unlockedAt: new Date(), ...(orderId ? { unlockOrderId: orderId } : {}) })
    .where(eq(analyses.id, id));
}

export async function consumeAnalysisRerun(id: number, userId: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(analyses).where(and(eq(analyses.id, id), eq(analyses.userId, userId))).limit(1);
  const rec: any = rows[0];
  if (!rec || !rec.unlocked) return { ok: false as const, reason: "This report is not unlocked." };
  // A re-check is part of the purchase that opened the original, so its own
  // re-checks come from that same allowance. Without this, every re-check was a
  // fresh report with two more free runs attached to it, for ever.
  if (rec.rerunOf) {
    return { ok: false as const, reason: "Re-checks belong to the report you bought. Open that one to use the second." };
  }
  const started = rec.unlockedAt ? new Date(rec.unlockedAt).getTime() : new Date(rec.createdAt).getTime();
  const days = (Date.now() - started) / 86400000;
  if (days > 14) return { ok: false as const, reason: "Your 14-day re-check window for this draft has ended." };
  if ((rec.rerunsUsed ?? 0) >= 2) return { ok: false as const, reason: "You have used both re-checks for this draft." };
  await db.update(analyses).set({ rerunsUsed: (rec.rerunsUsed ?? 0) + 1 }).where(eq(analyses.id, id));
  return { ok: true as const, record: rec, rerunsLeft: 1 - (rec.rerunsUsed ?? 0) };
}
