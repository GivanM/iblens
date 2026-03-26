import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", () => ({
  canUserAnalyze: vi.fn().mockResolvedValue({ allowed: true, remaining: 1 }),
  createAnalysis: vi.fn().mockResolvedValue({ id: 1 }),
  incrementAnalysisCount: vi.fn().mockResolvedValue(undefined),
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
  getUserUsageStats: vi.fn().mockResolvedValue({
    tier: "free",
    analysisCount: 0,
    freeAnalysisLimit: 1,
    stripeSubscriptionId: null,
  }),
  upgradeUserToPro: vi.fn().mockResolvedValue(undefined),
  downgradeUserToFree: vi.fn().mockResolvedValue(undefined),
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
            risks: [{ title: "Weak conclusion", description: "The conclusion needs more depth" }],
            leverage_zones: [{ title: "Add more data", description: "Include quantitative analysis" }],
            next_steps: ["Revise conclusion", "Add data tables"],
          }),
        },
      },
    ],
  }),
}));

// Mock Stripe
vi.mock("./stripe/stripe", () => ({
  createCheckoutSession: vi.fn().mockResolvedValue({
    url: "https://checkout.stripe.com/test",
  }),
  registerStripeWebhook: vi.fn(),
}));

// Mock LemonSqueezy
vi.mock("./lemonsqueezy/lemonsqueezy", () => ({
  createLSCheckoutSession: vi.fn().mockResolvedValue({
    url: "https://my-store.lemonsqueezy.com/checkout/test",
  }),
  registerLemonSqueezyWebhook: vi.fn(),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

type CookieCall = {
  name: string;
  options: Record<string, unknown>;
};

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
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as TrpcContext["res"],
  };
}

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

describe("essay.analyze", () => {
  it("returns analysis result for valid input", async () => {
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

describe("dashboard.usage", () => {
  it("returns usage stats for authenticated user", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.dashboard.usage();
    expect(result).toBeDefined();
    expect(result.tier).toBe("free");
    expect(result.analysisCount).toBe(0);
    expect(result.freeAnalysisLimit).toBe(1);
    expect(result.canAnalyze).toBe(true);
    expect(result.remaining).toBe(1);
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

describe("stripe.createCheckout", () => {
  it("returns checkout URL for authenticated user", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.stripe.createCheckout({
      origin: "https://test.example.com",
    });

    expect(result).toBeDefined();
    expect(result.url).toBe("https://checkout.stripe.com/test");
  });

  it("rejects when user is not authenticated", async () => {
    const ctx = createUnauthContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.stripe.createCheckout({ origin: "https://test.example.com" })
    ).rejects.toThrow();
  });
});

describe("lemonsqueezy.createCheckout", () => {
  it("returns checkout URL for authenticated user", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.lemonsqueezy.createCheckout({
      origin: "https://test.example.com",
    });

    expect(result).toBeDefined();
    expect(result.url).toBe("https://my-store.lemonsqueezy.com/checkout/test");
  });

  it("rejects when user is not authenticated", async () => {
    const ctx = createUnauthContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.lemonsqueezy.createCheckout({ origin: "https://test.example.com" })
    ).rejects.toThrow();
  });
});
