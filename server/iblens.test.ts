import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import { PRICES } from "../shared/pricing";
import type { TrpcContext } from "./_core/context";

// Mock the db module with credit-based model
vi.mock("./db", () => ({
  // Daily funnel totals. A counter that throws must not take the run down with it, and the
  // mock has to exist for the same reason the real one swallows its own errors.
  bumpFunnel: vi.fn().mockResolvedValue(undefined),
  canUserAnalyzeEssay: vi.fn().mockResolvedValue({ allowed: true, isFree: true, reason: null }),
  canUserAnalyzeUniversity: vi.fn().mockResolvedValue({ allowed: true, reason: null }),
  // It reports what it actually took, because the free slot can be gone by the time it runs.
  consumeEssayCredit: vi.fn().mockResolvedValue("free"),
  // The purchase a paid run is charged to. Added when reports were tied to their order.
  takeFromOldestLot: vi.fn().mockResolvedValue(null),
  returnToLot: vi.fn().mockResolvedValue(true),
  // A refund that lands while a report is being produced closes it instead of selling it twice.
  isPurchaseRefunded: vi.fn().mockResolvedValue(false),
  refundEssayConsumption: vi.fn().mockResolvedValue(undefined),
  consumeUniversityCredit: vi.fn().mockResolvedValue(undefined),
  createAnalysis: vi.fn().mockResolvedValue({ id: 1 }),
  getUserAnalyses: vi.fn().mockResolvedValue([
    {
      id: 1,
      userId: 1,
      type: "essay",
      essayType: "IA",
      subject: "Business Management",
      researchQuestion: "Test RQ",
      resultJson: { predicted_score: 5, max_score: 7 },
      predictedGrade: "5/7",
      createdAt: new Date(),
    },
  ]),
  getAnalysisById: vi.fn().mockImplementation(async (id: number, userId: number) => {
    if (id === 1 && userId === 1) {
      return {
        id: 1,
        userId: 1,
        type: "essay",
        essayType: "IA",
        subject: "Business Management",
        resultJson: { predicted_score: 5, max_score: 7 },
        predictedGrade: "5/7",
        createdAt: new Date(),
      };
    }
    return undefined;
  }),
  getUserCredits: vi.fn().mockResolvedValue({
    freeEssayUsed: false,
    essayCredits: 5,
    universityCredits: 2,
  }),
  getUserPayments: vi.fn().mockResolvedValue([
    {
      id: 1,
      userId: 1,
      provider: "lemonsqueezy",
      productType: "essay_single",
      amount: 499,
      status: "completed",
      createdAt: new Date(),
    },
  ]),
  addCredits: vi.fn().mockResolvedValue(undefined),
  createPayment: vi.fn().mockResolvedValue({ id: 1 }),
  completePayment: vi.fn().mockResolvedValue(undefined),
}));

// Mock LLM
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [
      {
        message: {
          content: JSON.stringify({
            band_range: "4-5",
            predicted_score: 5,
            max_score: 7,
            overall_comment: "Good work overall",
            criteria: [
              { name: "Criterion A", score: 3, max: 4, comment: "Good understanding" },
            ],
            risks: [{ title: "Weak conclusion", description: "Needs more depth" }],
            leverage_zones: [{ title: "Add data", description: "Include quantitative analysis" }],
            next_steps: ["Revise conclusion", "Add data tables"],
          }),
        },
      },
    ],
  }),
  MODEL_DECLINED: "declined",
  MODEL_LIMIT_REACHED: "limit reached",
}));



type AuthenticatedUser = NonNullable<TrpcContext["user"]>;
type CookieCall = { name: string; options: Record<string, unknown> };

function createAuthContext(): { ctx: TrpcContext; clearedCookies: CookieCall[] } {
  const clearedCookies: CookieCall[] = [];
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-123",
    email: "test@example.com",
    name: "Test Student",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: { origin: "https://test.example.com" },
    } as TrpcContext["req"],
    res: {
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };
  return { ctx, clearedCookies };
}

function createUnauthContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as TrpcContext["res"],
  };
}

// ---- Auth Tests ----
describe("auth.me", () => {
  it("returns user when authenticated", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).toBeDefined();
    expect(result?.openId).toBe("test-user-123");
    expect(result?.name).toBe("Test Student");
  });

  it("returns null when not authenticated", async () => {
    const ctx = createUnauthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });
});

describe("auth.logout", () => {
  it("clears the session cookie and reports success", async () => {
    const { ctx, clearedCookies } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
  });
});

// ---- Essay Analysis Tests ----
describe("essay.analyze", () => {
  it("returns analysis result with wasFree flag for free analysis", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.essay.analyze({
      essayType: "IA",
      subject: "Business Management",
      researchQuestion: "How did Apple's marketing strategy affect growth?",
      essayText: "This is a test essay text that is long enough to pass the minimum character requirement. ".repeat(5),
    });

    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.wasFree).toBe(true);
    expect(result.result).toBeDefined();
    // A free run returns the preview, never the report: the mark, the comments on every
    // criterion and the fix list stay on the server until a report is bought.
    const preview: any = result.result;
    expect(preview.locked).toBe(true);
    expect(preview.max_score).toBe(7);
    expect(preview.band_range).toBeTruthy();
    expect(preview.predicted_score).toBeUndefined();
    expect(preview.overall_comment).toBeUndefined();
    expect(preview.next_steps).toBeUndefined();
    expect(preview.criteria).toBeUndefined();
    expect(preview.criteria_names).toHaveLength(1);
    expect(preview.weakest_criterion?.score ?? null).toBeNull();
  });

  it("rejects when user is not authenticated", async () => {
    const ctx = createUnauthContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.essay.analyze({
        essayType: "IA",
        subject: "Business Management",
        essayText: "Test text ".repeat(30),
      })
    ).rejects.toThrow();
  });
});

// ---- Dashboard Tests ----
describe("dashboard.credits", () => {
  it("returns credit info for authenticated user", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.dashboard.credits();
    expect(result).toBeDefined();
    expect(result.freeEssayAvailable).toBe(true);
    expect(result.essayCredits).toBe(5);
    expect(result.universityCredits).toBe(2);
    expect(result.canAnalyzeEssay).toBe(true);
    expect(result.canAnalyzeUniversity).toBe(true);
  });
});

describe("dashboard.history", () => {
  it("returns analysis history for authenticated user", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.dashboard.history();
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("essay");
    expect(result[0].subject).toBe("Business Management");
  });
});

describe("dashboard.analysis", () => {
  it("returns specific analysis by id", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.dashboard.analysis({ id: 1 });
    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.type).toBe("essay");
  });

  it("throws when analysis not found", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.dashboard.analysis({ id: 999 })).rejects.toThrow("Analysis not found");
  });
});

describe("dashboard.payments", () => {
  it("returns payment history for authenticated user", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.dashboard.payments();
    expect(result).toHaveLength(1);
    expect(result[0].provider).toBe("lemonsqueezy");
    expect(result[0].amount).toBe(499);
    expect(result[0].status).toBe("completed");
  });
});



// ---- Pricing Tests ----
describe("pricing.products", () => {
  it("returns product info publicly", async () => {
    const ctx = createUnauthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.pricing.products();
    expect(result).toBeDefined();
    // Read from the same constants the site sells at, so a price change does not fail here.
    expect(result.ESSAY_SINGLE.price).toBe(PRICES.ESSAY_SINGLE / 100);
    expect(result.ESSAY_PACK_5.price).toBe(PRICES.ESSAY_PACK_5 / 100);
    expect(result.ESSAY_PACK_10.price).toBe(PRICES.ESSAY_PACK_10 / 100);
    expect(result.UNIVERSITY_SINGLE.price).toBe(PRICES.UNIVERSITY_SINGLE / 100);
  });
});
