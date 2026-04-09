import { eq, desc, sql, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, analyses, InsertAnalysis, payments, InsertPayment } from "../drizzle/schema";
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

export async function completePaymentByProviderId(providerPaymentId: string, provider: "nowpayments") {
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

export async function getPendingPaymentByProviderIdAndProvider(providerPaymentId: string, provider: "nowpayments") {
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
