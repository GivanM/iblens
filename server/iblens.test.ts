import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

// Mock the db module with credit-based model
vi.mock("./db", () => ({
  canUserAnalyzeEssay: vi.fn().mockResolvedValue({ allowed: true, isFree: true, reason: null }),
  canUserAnalyzeUniversity: vi.fn().mockResolvedValue({ allowed: true, reason: null }),
  consumeEssayCredit: vi.fn().mockResolvedValue(undefined),
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
      provider: "nowpayments",
      productType: "essay_single",
      amount: 499,
      status: "completed",
      createdAt: new Date(),
    },
  ]),
  addCreditsToUser: vi.fn().mockResolvedValue(undefined),
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
}));

// Mock NOWPayments (the only payment provider)
vi.mock("./nowpayments/nowpayments", () => ({
  createNPInvoice: vi.fn().mockResolvedValue({
    invoiceUrl: "https://nowpayments.io/payment/test-invoice",
  }),
  registerNowPaymentsWebhook: vi.fn(),
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
    expect(result.result.predicted_score).toBe(5);
    expect(result.result.max_score).toBe(7);
    expect(result.result.criteria).toHaveLength(1);
    expect(result.result.risks).toHaveLength(1);
    expect(result.result.next_steps).toHaveLength(2);
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
    expect(result[0].provider).toBe("nowpayments");
    expect(result[0].amount).toBe(499);
    expect(result[0].status).toBe("completed");
  });
});

// ---- Payment Tests (NOWPayments only) ----
describe("payment.checkout", () => {
  it("returns payment URL for essay single", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.payment.checkout({
      origin: "https://test.example.com",
      productKey: "ESSAY_SINGLE",
    });
    expect(result).toBeDefined();
    expect(result.url).toBe("https://nowpayments.io/payment/test-invoice");
  });

  it("returns payment URL for essay pack", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.payment.checkout({
      origin: "https://test.example.com",
      productKey: "ESSAY_PACK_10",
    });
    expect(result).toBeDefined();
    expect(result.url).toBe("https://nowpayments.io/payment/test-invoice");
  });

  it("returns payment URL for university strategy", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.payment.checkout({
      origin: "https://test.example.com",
      productKey: "UNIVERSITY_SINGLE",
    });
    expect(result).toBeDefined();
    expect(result.url).toBe("https://nowpayments.io/payment/test-invoice");
  });

  it("rejects when user is not authenticated", async () => {
    const ctx = createUnauthContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.payment.checkout({ origin: "https://test.example.com", productKey: "ESSAY_SINGLE" })
    ).rejects.toThrow();
  });
});

// ---- Pricing Tests ----
describe("pricing.products", () => {
  it("returns product info publicly", async () => {
    const ctx = createUnauthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.pricing.products();
    expect(result).toBeDefined();
    expect(result.ESSAY_SINGLE.price).toBe(4.99);
    expect(result.ESSAY_PACK_5.price).toBe(19.99);
    expect(result.ESSAY_PACK_10.price).toBe(34.99);
    expect(result.UNIVERSITY_SINGLE.price).toBe(9.99);
  });
});
