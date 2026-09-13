import { eq, desc, sql, and, lt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, analyses, InsertAnalysis, payments, InsertPayment, anonymousAnalyses, InsertAnonymousAnalysis, orders, InsertOrder, webhookEvents, InsertWebhookEvent, deviceCredits, creditLedger, InsertCreditLedgerEntry, revokedSessions } from "../drizzle/schema";
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

  // Each step is a single conditional UPDATE, so a second request racing the first
  // finds nothing to take instead of taking the same thing twice.
  const free: any = await db.update(users)
    .set({ freeEssayUsed: true })
    .where(and(eq(users.id, userId), eq(users.freeEssayUsed, false)));
  if (Number(free?.[0]?.affectedRows ?? free?.affectedRows ?? 0) > 0) return "free";

  const paid: any = await db.update(users)
    .set({ essayCredits: sql`${users.essayCredits} - 1` })
    .where(and(eq(users.id, userId), sql`${users.essayCredits} > 0`));
  if (Number(paid?.[0]?.affectedRows ?? paid?.affectedRows ?? 0) > 0) return "credit";

  throw new Error("No essay credits remaining");
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
 * Free runs already used on this device, counted per product. Only the row that
 * claimed the free run counts: a report opened with a paid credit, or a re-check,
 * is not the free preview, and counting every row took the preview away from a
 * guest who happened to spend a paid report first. Rows from before the claim
 * column existed were given their claim when it was added.
 */
export async function getAnonymousAnalysisCount(fingerprint: string, kind: "essay" | "ucas" = "essay"): Promise<number> {
  const db = await getDb();
  if (!db) return 0;

  const result = await db.select({ count: sql<number>`count(*)` })
    .from(anonymousAnalyses)
    .where(and(
      eq(anonymousAnalyses.fingerprint, fingerprint),
      eq(anonymousAnalyses.freeClaim, kind),
    ));

  return result[0]?.count ?? 0;
}

export async function canAnonymousAnalyze(fingerprint: string, kind: "essay" | "ucas" = "essay"): Promise<{ allowed: boolean; reason?: string }> {
  const count = await getAnonymousAnalysisCount(fingerprint, kind);
  if (count >= 1) {
    return {
      allowed: false,
      reason: kind === "ucas"
        ? "You have used the free UCAS preview on this device."
        : "You have used the free preview on this device.",
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

function isDuplicateKey(err: any): boolean {
  const code = err?.code ?? err?.cause?.code;
  return code === "ER_DUP_ENTRY" || /Duplicate entry/i.test(String(err?.cause?.message ?? err?.message ?? ""));
}

/**
 * Takes this device's free run. Returns null when another request already took
 * it: the unique index on (fingerprint, freeClaim) decides, not an earlier count.
 */
export async function claimAnonymousFreeRun(data: InsertAnonymousAnalysis, kind: "essay" | "ucas") {
  try {
    return await createAnonymousAnalysis({ ...data, freeClaim: kind });
  } catch (err) {
    if (isDuplicateKey(err)) return null;
    throw err;
  }
}

export async function revokeSessionToken(tokenHash: string, expiresAt: Date) {
  const db = await getDb();
  if (!db) return;
  await db.insert(revokedSessions).values({ tokenHash, expiresAt })
    .onDuplicateKeyUpdate({ set: { tokenHash } });
}

export async function isSessionTokenRevoked(tokenHash: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  const rows = await db.select({ tokenHash: revokedSessions.tokenHash })
    .from(revokedSessions).where(eq(revokedSessions.tokenHash, tokenHash)).limit(1);
  return rows.length > 0;
}

export async function purgeExpiredRevokedSessions(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const result: any = await db.delete(revokedSessions).where(lt(revokedSessions.expiresAt, new Date()));
  return Number(result?.[0]?.affectedRows ?? result?.affectedRows ?? 0);
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
/**
 * Checkouts that were opened and never paid. Pressing "Continue to checkout" stores
 * the order and, for a guest, the email typed into the dialog; the privacy page says
 * those are kept only for 30 days when nothing is bought.
 */
export async function purgeAbandonedCheckouts(maxAgeDays = 30): Promise<{ orders: number; guests: number }> {
  const db = await getDb();
  if (!db) return { orders: 0, guests: 0 };
  const cutoff = new Date(Date.now() - maxAgeDays * 86400000);
  const o: any = await db.delete(orders)
    .where(and(lt(orders.createdAt, cutoff), sql`${orders.status} IN ('pending', 'expired', 'failed')`));
  // A guest record goes only when nothing at all refers to it any more.
  const g: any = await db.delete(users).where(and(
    lt(users.createdAt, cutoff),
    sql`(${users.openId} LIKE 'guest:%' OR ${users.openId} LIKE 'guest#%')`,
    sql`${users.essayCredits} = 0`,
    sql`NOT EXISTS (SELECT 1 FROM orders o WHERE o.userId = ${users.id})`,
    sql`NOT EXISTS (SELECT 1 FROM credit_ledger l WHERE l.userId = ${users.id})`,
    sql`NOT EXISTS (SELECT 1 FROM payments p WHERE p.userId = ${users.id})`,
    sql`NOT EXISTS (SELECT 1 FROM analyses a WHERE a.userId = ${users.id})`,
  ));
  const result = {
    orders: Number(o?.[0]?.affectedRows ?? o?.affectedRows ?? 0),
    guests: Number(g?.[0]?.affectedRows ?? g?.affectedRows ?? 0),
  };
  if (result.orders || result.guests) console.log(`[Retention] Removed ${result.orders} unpaid checkouts and ${result.guests} unused guest records older than ${maxAgeDays} days`);
  return result;
}

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
  // One conditional UPDATE: reading the balance and writing it in two statements
  // let two simultaneous requests both see one credit and both spend it.
  const res: any = await db.update(users)
    .set({ essayCredits: sql`${users.essayCredits} - 1` })
    .where(and(eq(users.id, userId), sql`${users.essayCredits} > 0`));
  if (Number(res?.[0]?.affectedRows ?? res?.affectedRows ?? 0) === 0) {
    throw new Error("You have no paid reports left. A full report is $9.99.");
  }
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
/** One device row, only if it belongs to that device. */
export async function getAnonymousRowForDevice(fingerprint: string, id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(anonymousAnalyses)
    .where(and(eq(anonymousAnalyses.id, id), eq(anonymousAnalyses.fingerprint, fingerprint))).limit(1);
  return rows[0] ?? null;
}

/** The purchased report a device row belongs to: itself, or the report it re-checks. */
export async function getAnonymousChainHead(rec: any) {
  if (!rec?.rerunOf) return rec;
  return (await getAnonymousRowForDevice(rec.fingerprint, rec.rerunOf)) ?? rec;
}

export async function consumeAnonymousRerun(fingerprint: string, kind: "essay" | "ucas" = "essay", recordId?: number) {
  const db = await getDb();
  if (!db) return { ok: false as const, reason: "Database not available" };
  // The report being re-checked: the one the student picked, or the newest of its
  // kind. A device can hold several paid reports and a UCAS review side by side.
  const rec: any = recordId
    ? await getAnonymousRowForDevice(fingerprint, recordId)
    : kind === "ucas"
      ? await getLatestAnonymousUcas(fingerprint)
      : await getLatestAnonymousEssay(fingerprint);
  if (!rec || !rec.resultJson) return { ok: false as const, reason: "No report found for this device." };
  if ((kind === "ucas") !== (rec.essayType === "UCAS")) return { ok: false as const, reason: "That report is not this kind of work." };
  if (!rec.unlocked) return { ok: false as const, reason: "This report is not unlocked." };
  // The allowance and the 14 days belong to the purchase, which is the head of the chain.
  const head: any = await getAnonymousChainHead(rec);
  const started = head.unlockedAt ? new Date(head.unlockedAt).getTime() : new Date(head.createdAt).getTime();
  if ((Date.now() - started) / 86400000 > 14) {
    return { ok: false as const, reason: "Your 14-day re-check window for this report has ended." };
  }
  if ((head.rerunsUsed ?? 0) >= 2) {
    return { ok: false as const, reason: "You have used both re-checks for this report." };
  }
  // Counted in the database, not from the number read above: two re-checks sent
  // together both read the same count, both wrote count + 1, and a third got in.
  const taken: any = await db.update(anonymousAnalyses)
    .set({ rerunsUsed: sql`COALESCE(${anonymousAnalyses.rerunsUsed}, 0) + 1` })
    .where(and(eq(anonymousAnalyses.id, head.id), sql`COALESCE(${anonymousAnalyses.rerunsUsed}, 0) < 2`));
  if (Number(taken?.[0]?.affectedRows ?? taken?.affectedRows ?? 0) === 0) {
    return { ok: false as const, reason: "You have used both re-checks for this report." };
  }
  const used = await getAnonymousRerunsUsed(head.id);
  return { ok: true as const, record: rec, head, rerunsLeft: Math.max(0, 2 - used) };
}

/**
 * Every paid report on a device, one entry per purchase with its newest version.
 * Without this a guest saw only the newest report, and opening a second one hid the
 * first together with the re-checks it still had.
 */
export async function getDeviceReports(fingerprint: string, kind: "essay" | "ucas") {
  const db = await getDb();
  if (!db) return [];
  const rows: any[] = await db.select({
    id: anonymousAnalyses.id,
    essayType: anonymousAnalyses.essayType,
    subject: anonymousAnalyses.subject,
    createdAt: anonymousAnalyses.createdAt,
    unlockedAt: anonymousAnalyses.unlockedAt,
    rerunsUsed: anonymousAnalyses.rerunsUsed,
    rerunOf: anonymousAnalyses.rerunOf,
  }).from(anonymousAnalyses)
    .where(and(
      eq(anonymousAnalyses.fingerprint, fingerprint),
      eq(anonymousAnalyses.unlocked, true),
      sql`${anonymousAnalyses.resultJson} IS NOT NULL`,
      kind === "ucas"
        ? eq(anonymousAnalyses.essayType, "UCAS")
        : sql`(${anonymousAnalyses.essayType} IS NULL OR ${anonymousAnalyses.essayType} <> 'UCAS')`,
    ))
    .orderBy(desc(anonymousAnalyses.id))
    .limit(200);
  const heads = new Map<number, any>();
  for (const r of rows) if (!r.rerunOf) heads.set(r.id, { ...r, latestId: r.id, versions: 1 });
  for (const r of rows) {
    if (!r.rerunOf) continue;
    const h = heads.get(r.rerunOf);
    if (!h) { heads.set(r.id, { ...r, rerunOf: null, latestId: r.id, versions: 1 }); continue; }
    h.versions += 1;
    if (r.id > h.latestId) h.latestId = r.id;
  }
  return Array.from(heads.values()).sort((a, b) => b.latestId - a.latestId).map((h) => {
    const started = h.unlockedAt ? new Date(h.unlockedAt).getTime() : new Date(h.createdAt).getTime();
    const windowOpen = (Date.now() - started) / 86400000 <= 14;
    return {
      id: h.id,
      latestId: h.latestId,
      essayType: h.essayType,
      subject: h.subject,
      createdAt: h.createdAt,
      versions: h.versions,
      rerunsLeft: windowOpen ? Math.max(0, 2 - (h.rerunsUsed ?? 0)) : 0,
      windowOpen,
    };
  });
}

/** The re-check count on a device row as it stands now. */
export async function getAnonymousRerunsUsed(id: number): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const rows = await db.select({ used: anonymousAnalyses.rerunsUsed }).from(anonymousAnalyses)
    .where(eq(anonymousAnalyses.id, id)).limit(1);
  return Number(rows[0]?.used ?? 0);
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
  const rows = await db.select({ adoptedFromId: analyses.adoptedFromId }).from(analyses)
    .where(and(eq(analyses.id, id), eq(analyses.userId, userId))).limit(1);
  if (!rows[0]) return false;
  const res: any = await db.delete(analyses).where(and(eq(analyses.id, id), eq(analyses.userId, userId)));
  const removed = Number(res?.[0]?.affectedRows ?? res?.affectedRows ?? 0) > 0;
  // A report bought on a device and copied into the account kept its device row:
  // unlocked, so retention never removed it, and adoption copied it back on the next
  // signed-in page load. The dashboard promises the report goes for good.
  const sourceId = (rows[0] as any).adoptedFromId;
  if (removed && sourceId) {
    await db.delete(anonymousAnalyses).where(eq(anonymousAnalyses.id, sourceId));
  }
  return removed;
}

/** Remove a claimed-but-failed free slot so a broken run does not cost the student theirs. */
export async function deleteAnonymousAnalysis(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(anonymousAnalyses).where(eq(anonymousAnalyses.id, id));
}

/** Credits a guest bought, held against the device that bought them. */
export async function addDeviceCredits(fingerprint: string, amount: number, orderId?: string) {
  const db = await getDb();
  if (!db || amount <= 0) return;
  // New money on a device belongs to whoever is using it now, so the claim marker
  // is cleared: a wallet that had been taken by one account used to stay locked
  // to it for ever, and a later purchase on the same browser was unreachable.
  await db.insert(deviceCredits).values({ fingerprint, credits: amount, claimedAmount: amount, ...(orderId ? { lastOrderId: orderId } : {}) })
    .onDuplicateKeyUpdate({ set: {
      credits: sql`${deviceCredits.credits} + ${amount}`,
      claimedAmount: sql`${deviceCredits.claimedAmount} + ${amount}`,
      // A credit handed back after a failed run keeps the purchase it came from.
      ...(orderId ? { lastOrderId: orderId } : {}),
    } });
  console.log(`[DeviceCredits] +${amount} for ${fingerprint.slice(0, 8)}...`);
}

/**
 * The purchase a report opened with a paid credit is charged to: the oldest paid
 * purchase that still has reports left, first in, first out. For a device that means
 * the purchases whose reports went to that browser; for an account, the account's
 * purchases. A refund closes the reports its purchase paid for, so every spend has
 * to name one. Charging device reports to the newest purchase, and account reports
 * to none, closed the wrong reports or none at all.
 */
export async function orderForCreditSpend(owner: { fingerprint?: string; userId?: number }): Promise<string | null> {
  const db = await getDb();
  if (!db) return null;
  const scope = owner.fingerprint
    ? eq(orders.deviceFingerprint, owner.fingerprint)
    : owner.userId ? eq(orders.userId, owner.userId) : null;
  if (scope) {
    const lots = await db.select({ id: orders.id, createdAt: orders.createdAt }).from(orders)
      .where(and(scope, eq(orders.status, "paid")));
    // In the order the purchases were credited. Timestamps have one-second resolution and
    // order ids are random, so two purchases in the same second sorted at random; the
    // ledger's own sequence says which was paid first.
    const firstGrant = new Map<string, number>();
    for (const lot of lots as any[]) {
      const rows = await db.select({ first: sql<number>`MIN(${creditLedger.id})` }).from(creditLedger)
        .where(and(eq(creditLedger.orderId, lot.id), sql`${creditLedger.delta} > 0`));
      firstGrant.set(lot.id, Number((rows[0] as any)?.first ?? Number.MAX_SAFE_INTEGER));
    }
    const ordered = (lots as any[]).sort((a, b) =>
      (firstGrant.get(a.id)! - firstGrant.get(b.id)!) || (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
    for (const lot of ordered) {
      if ((await countReportsOpenedByOrder(lot.id)) < (await ledgerAmountForOrder(lot.id))) return lot.id;
    }
  }
  if (!owner.fingerprint) return null;
  const rows = await db.select({ lastOrderId: deviceCredits.lastOrderId }).from(deviceCredits)
    .where(eq(deviceCredits.fingerprint, owner.fingerprint)).limit(1);
  return (rows[0] as any)?.lastOrderId ?? null;
}

export async function getDeviceCreditOrderId(fingerprint: string): Promise<string | null> {
  return orderForCreditSpend({ fingerprint });
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
  // Only reports this person paid for. A report is theirs when the order that
  // unlocked it belongs to their account or to a guest record with their e-mail.
  // Copying every unlocked report on the device handed a shared computer's paid
  // work, research questions included, to the next person who signed in.
  const me = await db.select({ email: users.email }).from(users).where(eq(users.id, userId)).limit(1);
  const email = String(me[0]?.email || "").trim().toLowerCase();
  const ownerIds = new Set<number>([userId]);
  if (email) {
    const guest = await db.select({ id: users.id }).from(users).where(eq(users.openId, guestOpenIdFor(email))).limit(1);
    if (guest[0]?.id) ownerIds.add(guest[0].id);
  }
  const paidOrders = await db.select({ id: orders.id }).from(orders)
    .where(sql`${orders.userId} IN (${sql.join(Array.from(ownerIds).map((i) => sql`${i}`), sql`, `)})`);
  const orderIds = new Set((paidOrders as any[]).map((o) => o.id));
  const candidates = await db.select().from(anonymousAnalyses)
    .where(and(eq(anonymousAnalyses.fingerprint, fingerprint), eq(anonymousAnalyses.unlocked, true)));
  // Purchases before their re-checks, so each re-check can point at its report's copy
  // and does not arrive in the account as a report with two re-checks of its own.
  const rows = (candidates as any[])
    .filter((r) => r.unlockOrderId && orderIds.has(r.unlockOrderId))
    .sort((a, b) => (a.rerunOf ? 1 : 0) - (b.rerunOf ? 1 : 0) || a.id - b.id);
  const accountIdFor = new Map<number, number>();
  let copied = 0;
  for (const rec of rows as any[]) {
    // By the source row id. Comparing a JSON column to a bound string is always
    // false in MySQL, so this check never matched and every page load copied the
    // same paid reports again, each copy carrying two fresh re-checks with it.
    const existing = await db.select({ id: analyses.id }).from(analyses)
      .where(and(eq(analyses.userId, userId), eq(analyses.adoptedFromId, rec.id))).limit(1);
    if (existing.length > 0) { accountIdFor.set(rec.id, existing[0].id); continue; }
    const [inserted] = await db.insert(analyses).values({
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
      rerunOf: rec.rerunOf ? (accountIdFor.get(rec.rerunOf) ?? null) : null,
    }).$returningId();
    if (inserted?.id) accountIdFor.set(rec.id, inserted.id);
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

/** How many essay credits a given order granted, as recorded when it was paid. */
export async function ledgerAmountForOrder(orderId: string): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const rows = await db.select().from(creditLedger).where(eq(creditLedger.orderId, orderId));
  return (rows as any[]).reduce((sum, r) => sum + (r.creditType === "essay" && r.delta > 0 ? r.delta : 0), 0);
}

/**
 * The account that should hold credits bought with this e-mail: a real account
 * if one exists, otherwise the guest record. Never creates anything.
 */
export async function findCreditHolderByEmail(email: string): Promise<number | null> {
  const db = await getDb();
  if (!db) return null;
  const normalised = email.trim().toLowerCase();
  const real = await db.select({ id: users.id, openId: users.openId }).from(users)
    .where(sql`LOWER(${users.email}) = ${normalised}`);
  const account = (real as any[]).find((u) => !String(u.openId).startsWith("guest"));
  if (account) return account.id;
  const guest = await db.select({ id: users.id }).from(users)
    .where(eq(users.openId, guestOpenIdFor(email))).limit(1);
  return guest[0]?.id ?? null;
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
export async function takeAllDeviceCredits(fingerprint: string, claimedBy: number, amount?: number): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  // Compare and swap: read the balance, then lower it only if it is still that
  // balance. Returning claimedAmount, which counts everything ever put here,
  // handed people more credits than they had left.
  for (let attempt = 0; attempt < 3; attempt++) {
    const rows = await db.select().from(deviceCredits).where(eq(deviceCredits.fingerprint, fingerprint)).limit(1);
    const rec: any = rows[0];
    const balance = rec?.credits ?? 0;
    if (!rec || balance <= 0) return 0;
    const take = Math.min(balance, amount ?? balance);
    if (take <= 0) return 0;
    const res: any = await db.update(deviceCredits)
      .set({ credits: balance - take, claimedByUserId: claimedBy })
      .where(and(eq(deviceCredits.fingerprint, fingerprint), eq(deviceCredits.credits, balance)));
    const changed = Number(res?.[0]?.affectedRows ?? res?.affectedRows ?? 0);
    if (changed > 0) return take;
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

/**
 * How many reports an order opened: device rows and account rows it unlocked, a
 * device row and its account copy counting once, re-checks not counting at all.
 * Read before the re-lock, which is what makes a refund take back each report once.
 */
export async function countReportsOpenedByOrder(orderId: string): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const dev = await db.select({ id: anonymousAnalyses.id }).from(anonymousAnalyses)
    .where(and(eq(anonymousAnalyses.unlockOrderId, orderId), eq(anonymousAnalyses.unlocked, true), sql`${anonymousAnalyses.rerunOf} IS NULL`));
  const devIds = new Set((dev as any[]).map((r) => r.id));
  const acct = await db.select({ id: analyses.id, adoptedFromId: analyses.adoptedFromId }).from(analyses)
    .where(and(eq(analyses.unlockOrderId, orderId), eq(analyses.unlocked, true), sql`${analyses.rerunOf} IS NULL`));
  return devIds.size + (acct as any[]).filter((r) => !r.adoptedFromId || !devIds.has(r.adoptedFromId)).length;
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
export async function setOrderDeviceCredits(orderId: string, amount: number, fingerprint?: string) {
  const db = await getDb();
  if (!db) return;
  await db.update(orders)
    .set({ deviceCreditsGranted: amount, ...(fingerprint ? { deviceFingerprint: fingerprint } : {}) })
    .where(eq(orders.id, orderId));
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
export async function createRerunAnalysis(prev: any, resultJson: any, predictedGrade?: string | null, headId?: number) {
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
    // Read again now: a re-check that ran alongside this one has counted itself on
    // the parent since prev was read, and the newest row is what the next gate sees.
    rerunsUsed: Math.max((prev.rerunsUsed ?? 0) + 1, await getAnonymousRerunsUsed(headId ?? prev.id)),
    // The purchase this re-check belongs to, so its count and window stay on that report.
    rerunOf: headId ?? prev.rerunOf ?? prev.id,
    examSession: prev.examSession ?? null,
    // The re-check belongs to the purchase that opened the original, so a refund
    // closes the child as well as the parent.
    unlockOrderId: prev.unlockOrderId ?? null,
  }).$returningId();
  return row;
}

/** Paid unlock starts the free re-run window (14 days, 2 re-runs of the same draft). */
/**
 * Open a report only if it is still locked, and say whether this call opened it.
 * Two unlock clicks that arrive together both see a locked report; only the one
 * that actually flips it may keep the credit it spent.
 */
export async function claimAnalysisUnlock(id: number, orderId?: string | null): Promise<boolean> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const res: any = await db.update(analyses)
    .set({ unlocked: true, unlockedAt: new Date(), ...(orderId ? { unlockOrderId: orderId } : {}) })
    .where(and(eq(analyses.id, id), eq(analyses.unlocked, false)));
  return Number(res?.[0]?.affectedRows ?? res?.affectedRows ?? 0) > 0;
}

/** The device-row counterpart of claimAnalysisUnlock. */
export async function claimAnonymousUnlock(id: number, orderId?: string | null): Promise<boolean> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const res: any = await db.update(anonymousAnalyses)
    .set({ unlocked: true, unlockedAt: new Date(), ...(orderId ? { unlockOrderId: orderId } : {}) })
    .where(and(eq(anonymousAnalyses.id, id), eq(anonymousAnalyses.unlocked, false)));
  return Number(res?.[0]?.affectedRows ?? res?.affectedRows ?? 0) > 0;
}

/**
 * An earlier verified delivery of the same event. LemonSqueezy resends, and the log's
 * unique key includes the processing status, so a resend inserts a fresh row; the
 * order status alone did not stop a resend that arrived after a refund. Only earlier
 * rows count, so of two copies arriving together the first is processed, and a
 * delivery that failed while processing does not count, so a manual resend can
 * still repair it.
 */
export async function hasEarlierVerifiedWebhookEvent(eventKey: string, thisId?: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  const rows = await db.select({ id: webhookEvents.id, status: webhookEvents.paymentStatus }).from(webhookEvents)
    .where(and(
      eq(webhookEvents.provider, "lemonsqueezy"),
      eq(webhookEvents.npPaymentId, eventKey),
      eq(webhookEvents.signatureValid, true),
    ));
  if (!thisId) return false;
  return (rows as any[]).some((r) => r.id < thisId && r.status !== "processing_error");
}

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
  // A UCAS review is re-checked on the UCAS page against the device row; the account
  // copy is a record, and re-running it here handed out two more free reviews.
  if (rec.essayType === "UCAS") return { ok: false as const, reason: "UCAS reviews are re-checked on the UCAS page." };
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
  // One conditional UPDATE, for the same reason as the device re-checks above.
  const taken: any = await db.update(analyses)
    .set({ rerunsUsed: sql`COALESCE(${analyses.rerunsUsed}, 0) + 1` })
    .where(and(eq(analyses.id, id), eq(analyses.userId, userId), sql`COALESCE(${analyses.rerunsUsed}, 0) < 2`));
  if (Number(taken?.[0]?.affectedRows ?? taken?.affectedRows ?? 0) === 0) {
    return { ok: false as const, reason: "You have used both re-checks for this draft." };
  }
  const fresh = await db.select({ used: analyses.rerunsUsed }).from(analyses).where(eq(analyses.id, id)).limit(1);
  return { ok: true as const, record: rec, rerunsLeft: Math.max(0, 2 - Number(fresh[0]?.used ?? 2)) };
}
