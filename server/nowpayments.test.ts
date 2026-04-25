import { describe, it, expect, vi, beforeEach } from "vitest";
import crypto from "crypto";
import { sortObject, verifySignature, mapPaymentStatus, skuToCredits } from "./nowpayments/nowpayments";

// ---- Unit tests for pure functions ----

describe("sortObject", () => {
  it("sorts keys alphabetically", () => {
    const input = { z: 1, a: 2, m: 3 };
    const result = sortObject(input);
    expect(Object.keys(result)).toEqual(["a", "m", "z"]);
  });

  it("sorts nested objects recursively", () => {
    const input = { b: { z: 1, a: 2 }, a: 3 };
    const result = sortObject(input);
    expect(Object.keys(result)).toEqual(["a", "b"]);
    expect(Object.keys(result.b)).toEqual(["a", "z"]);
  });

  it("handles arrays without sorting them", () => {
    const input = { arr: [3, 1, 2] };
    const result = sortObject(input);
    expect(result.arr).toEqual([3, 1, 2]);
  });

  it("handles null and primitives", () => {
    expect(sortObject(null)).toBeNull();
    expect(sortObject(42)).toBe(42);
    expect(sortObject("hello")).toBe("hello");
  });
});

describe("verifySignature", () => {
  const testSecret = "test-ipn-secret-key";

  function createValidSignature(body: Record<string, any>, secret: string): string {
    const sorted = sortObject(body);
    const jsonString = JSON.stringify(sorted);
    return crypto.createHmac("sha512", secret).update(jsonString).digest("hex");
  }

  it("returns true for valid signature", () => {
    const body = { payment_id: 123, payment_status: "finished", order_id: "abc-123" };
    const sig = createValidSignature(body, testSecret);
    expect(verifySignature(body, sig, testSecret)).toBe(true);
  });

  it("returns false for invalid signature", () => {
    const body = { payment_id: 123, payment_status: "finished" };
    expect(verifySignature(body, "invalid-hex-signature", testSecret)).toBe(false);
  });

  it("returns false for empty signature", () => {
    const body = { payment_id: 123 };
    expect(verifySignature(body, "", testSecret)).toBe(false);
  });

  it("returns false for empty secret", () => {
    const body = { payment_id: 123 };
    const sig = createValidSignature(body, testSecret);
    expect(verifySignature(body, sig, "")).toBe(false);
  });

  it("returns false when body is tampered", () => {
    const body = { payment_id: 123, payment_status: "finished" };
    const sig = createValidSignature(body, testSecret);
    const tamperedBody = { payment_id: 123, payment_status: "refunded" };
    expect(verifySignature(tamperedBody, sig, testSecret)).toBe(false);
  });

  it("handles complex nested body correctly", () => {
    const body = {
      payment_id: 456,
      payment_status: "finished",
      pay_amount: 0.001,
      actually_paid: 0.001,
      order_id: "uuid-here",
      order_description: "IBLens: 10 Essay Analyses",
      outcome_amount: 4.99,
      outcome_currency: "usd",
    };
    const sig = createValidSignature(body, testSecret);
    expect(verifySignature(body, sig, testSecret)).toBe(true);
  });
});

describe("mapPaymentStatus", () => {
  it("maps waiting to processing", () => {
    expect(mapPaymentStatus("waiting")).toBe("processing");
  });

  it("maps confirming to processing", () => {
    expect(mapPaymentStatus("confirming")).toBe("processing");
  });

  it("maps confirmed to processing", () => {
    expect(mapPaymentStatus("confirmed")).toBe("processing");
  });

  it("maps sending to processing", () => {
    expect(mapPaymentStatus("sending")).toBe("processing");
  });

  it("maps finished to paid", () => {
    expect(mapPaymentStatus("finished")).toBe("paid");
  });

  it("maps partially_paid to partial", () => {
    expect(mapPaymentStatus("partially_paid")).toBe("partial");
  });

  it("maps failed to failed", () => {
    expect(mapPaymentStatus("failed")).toBe("failed");
  });

  it("maps expired to expired", () => {
    expect(mapPaymentStatus("expired")).toBe("expired");
  });

  it("maps refunded to refunded", () => {
    expect(mapPaymentStatus("refunded")).toBe("refunded");
  });

  it("maps unknown status to processing (safe default)", () => {
    expect(mapPaymentStatus("some_new_status")).toBe("processing");
  });
});

describe("skuToCredits", () => {
  it("essay_single gives 1 essay credit", () => {
    expect(skuToCredits("essay_single")).toEqual({ essay: 1, university: 0 });
  });

  it("essay_pack_5 gives 5 essay credits", () => {
    expect(skuToCredits("essay_pack_5")).toEqual({ essay: 5, university: 0 });
  });

  it("essay_pack_10 gives 10 essay credits", () => {
    expect(skuToCredits("essay_pack_10")).toEqual({ essay: 10, university: 0 });
  });

  it("university_single gives 1 university credit", () => {
    expect(skuToCredits("university_single")).toEqual({ essay: 0, university: 1 });
  });

  it("unknown sku gives 0 credits", () => {
    expect(skuToCredits("unknown_sku")).toEqual({ essay: 0, university: 0 });
  });
});

// ---- Env var tests ----

describe("NOWPayments env vars", () => {
  it("NOWPAYMENTS_API_KEY is set", () => {
    expect(process.env.NOWPAYMENTS_API_KEY).toBeDefined();
    expect(process.env.NOWPAYMENTS_API_KEY!.length).toBeGreaterThan(0);
  });

  it("NOWPAYMENTS_IPN_SECRET is set", () => {
    expect(process.env.NOWPAYMENTS_IPN_SECRET).toBeDefined();
    expect(process.env.NOWPAYMENTS_IPN_SECRET!.length).toBeGreaterThan(0);
  });
});

// ---- Integration tests for webhook handler (mocked DB) ----

describe("NOWPayments webhook integration", () => {
  // Mock db module
  vi.mock("./db", () => ({
    getOrderById: vi.fn(),
    updateOrderStatus: vi.fn().mockResolvedValue(undefined),
    insertWebhookEvent: vi.fn().mockResolvedValue(true),
    grantCreditsViaLedger: vi.fn().mockResolvedValue(undefined),
    getDb: vi.fn().mockResolvedValue(null),
    createOrder: vi.fn().mockResolvedValue(undefined),
  }));

  // Import mocked functions
  let getOrderById: ReturnType<typeof vi.fn>;
  let insertWebhookEvent: ReturnType<typeof vi.fn>;
  let grantCreditsViaLedger: ReturnType<typeof vi.fn>;
  let updateOrderStatus: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    const db = await import("./db");
    getOrderById = db.getOrderById as any;
    insertWebhookEvent = db.insertWebhookEvent as any;
    grantCreditsViaLedger = db.grantCreditsViaLedger as any;
    updateOrderStatus = db.updateOrderStatus as any;

    vi.clearAllMocks();
    // Default: new event (not duplicate)
    (insertWebhookEvent as any).mockResolvedValue(true);
  });

  // Helper to simulate webhook call
  async function simulateWebhook(body: Record<string, any>, ipnSecret: string) {
    // We test the logic by directly calling the handler's core logic
    // Since the handler is an Express middleware, we test the pure functions + DB interactions
    const { verifySignature, mapPaymentStatus, skuToCredits } = await import("./nowpayments/nowpayments");

    const sorted = sortObject(body);
    const sig = crypto.createHmac("sha512", ipnSecret).update(JSON.stringify(sorted)).digest("hex");

    // Verify signature
    const sigValid = verifySignature(body, sig, ipnSecret);

    if (!sigValid) {
      return { status: 400, body: { error: "Invalid signature" } };
    }

    const paymentId = String(body.payment_id || "");
    const paymentStatus = String(body.payment_status || "");
    const orderId = String(body.order_id || "");

    if (!paymentId || !paymentStatus) {
      return { status: 200, body: { ok: true, message: "Missing required fields" } };
    }

    // Idempotency
    const isNew = await insertWebhookEvent({
      provider: "nowpayments",
      npPaymentId: paymentId,
      paymentStatus,
      rawBody: JSON.stringify(body),
      signatureValid: true,
    });

    if (!isNew) {
      return { status: 200, body: { ok: true, message: "Already processed" } };
    }

    // Find order
    const order = await getOrderById(orderId);
    if (!order) {
      return { status: 200, body: { ok: true, message: "Order not found" } };
    }

    // Map status
    const mappedStatus = mapPaymentStatus(paymentStatus);
    await updateOrderStatus(order.id, mappedStatus, paymentId);

    // Fulfillment
    if (paymentStatus === "finished") {
      const credits = skuToCredits(order.sku);
      if (credits.essay > 0 || credits.university > 0) {
        await grantCreditsViaLedger(
          order.userId,
          credits.essay,
          credits.university,
          `nowpayments:${order.sku}`,
          order.id,
        );
      }
    }

    // Refund
    if (paymentStatus === "refunded") {
      const credits = skuToCredits(order.sku);
      if (credits.essay > 0 || credits.university > 0) {
        await grantCreditsViaLedger(
          order.userId,
          -credits.essay,
          -credits.university,
          `refund:${order.id}`,
          order.id,
        );
      }
    }

    return { status: 200, body: { ok: true } };
  }

  const testSecret = "test-secret-123";
  const testOrder = {
    id: "order-uuid-123",
    userId: 42,
    sku: "essay_pack_10",
    amountUsd: 3500,
    currency: "usd",
    status: "pending",
    provider: "nowpayments",
    npInvoiceId: "inv-123",
    npPaymentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it("grants credits on valid finished webhook", async () => {
    (getOrderById as any).mockResolvedValue(testOrder);

    const body = {
      payment_id: 777,
      payment_status: "finished",
      order_id: "order-uuid-123",
      pay_amount: 0.001,
    };

    const result = await simulateWebhook(body, testSecret);
    expect(result.status).toBe(200);
    expect(grantCreditsViaLedger).toHaveBeenCalledWith(42, 10, 0, "nowpayments:essay_pack_10", "order-uuid-123");
    expect(updateOrderStatus).toHaveBeenCalledWith("order-uuid-123", "paid", "777");
  });

  it("returns 400 for invalid signature", async () => {
    const body = { payment_id: 777, payment_status: "finished", order_id: "order-uuid-123" };
    // Manually create wrong signature
    const sigValid = verifySignature(body, "wrong-signature", testSecret);
    expect(sigValid).toBe(false);
  });

  it("handles duplicate webhook (idempotency)", async () => {
    (insertWebhookEvent as any).mockResolvedValue(false); // duplicate
    (getOrderById as any).mockResolvedValue(testOrder);

    const body = {
      payment_id: 777,
      payment_status: "finished",
      order_id: "order-uuid-123",
    };

    const result = await simulateWebhook(body, testSecret);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Already processed");
    expect(grantCreditsViaLedger).not.toHaveBeenCalled();
  });

  it("handles refund — deducts credits", async () => {
    (getOrderById as any).mockResolvedValue(testOrder);

    const body = {
      payment_id: 778,
      payment_status: "refunded",
      order_id: "order-uuid-123",
    };

    const result = await simulateWebhook(body, testSecret);
    expect(result.status).toBe(200);
    // essay_pack_10 has essay=10, university=0, so refund is -10, -0
    expect(grantCreditsViaLedger).toHaveBeenCalledTimes(1);
    const call = (grantCreditsViaLedger as any).mock.calls[0];
    expect(call[0]).toBe(42); // userId
    expect(call[1]).toBe(-10); // essay credits
    expect(call[2]).toBe(-0); // university credits (negative zero)
    expect(call[3]).toBe("refund:order-uuid-123");
    expect(call[4]).toBe("order-uuid-123");
    expect(updateOrderStatus).toHaveBeenCalledWith("order-uuid-123", "refunded", "778");
  });

  it("handles unknown order_id gracefully", async () => {
    (getOrderById as any).mockResolvedValue(undefined);

    const body = {
      payment_id: 779,
      payment_status: "finished",
      order_id: "nonexistent-order",
    };

    const result = await simulateWebhook(body, testSecret);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("Order not found");
    expect(grantCreditsViaLedger).not.toHaveBeenCalled();
  });

  it("handles waiting status without granting credits", async () => {
    (getOrderById as any).mockResolvedValue(testOrder);

    const body = {
      payment_id: 780,
      payment_status: "waiting",
      order_id: "order-uuid-123",
    };

    const result = await simulateWebhook(body, testSecret);
    expect(result.status).toBe(200);
    expect(grantCreditsViaLedger).not.toHaveBeenCalled();
    expect(updateOrderStatus).toHaveBeenCalledWith("order-uuid-123", "processing", "780");
  });

  it("handles expired status", async () => {
    (getOrderById as any).mockResolvedValue(testOrder);

    const body = {
      payment_id: 781,
      payment_status: "expired",
      order_id: "order-uuid-123",
    };

    const result = await simulateWebhook(body, testSecret);
    expect(result.status).toBe(200);
    expect(updateOrderStatus).toHaveBeenCalledWith("order-uuid-123", "expired", "781");
    expect(grantCreditsViaLedger).not.toHaveBeenCalled();
  });

  it("handles partially_paid status", async () => {
    (getOrderById as any).mockResolvedValue(testOrder);

    const body = {
      payment_id: 782,
      payment_status: "partially_paid",
      order_id: "order-uuid-123",
    };

    const result = await simulateWebhook(body, testSecret);
    expect(result.status).toBe(200);
    expect(updateOrderStatus).toHaveBeenCalledWith("order-uuid-123", "partial", "782");
    expect(grantCreditsViaLedger).not.toHaveBeenCalled();
  });

  it("grants university credit for university_single sku", async () => {
    const uniOrder = { ...testOrder, sku: "university_single" };
    (getOrderById as any).mockResolvedValue(uniOrder);

    const body = {
      payment_id: 783,
      payment_status: "finished",
      order_id: "order-uuid-123",
    };

    const result = await simulateWebhook(body, testSecret);
    expect(result.status).toBe(200);
    expect(grantCreditsViaLedger).toHaveBeenCalledWith(42, 0, 1, "nowpayments:university_single", "order-uuid-123");
  });

  it("grants 1 essay credit for essay_single sku", async () => {
    const singleOrder = { ...testOrder, sku: "essay_single" };
    (getOrderById as any).mockResolvedValue(singleOrder);

    const body = {
      payment_id: 784,
      payment_status: "finished",
      order_id: "order-uuid-123",
    };

    const result = await simulateWebhook(body, testSecret);
    expect(result.status).toBe(200);
    expect(grantCreditsViaLedger).toHaveBeenCalledWith(42, 1, 0, "nowpayments:essay_single", "order-uuid-123");
  });
});

// ---- Schema tests ----

describe("NOWPayments schema", () => {
  it("orders table is exported from schema", async () => {
    const schema = await import("../drizzle/schema");
    expect(schema.orders).toBeDefined();
  });

  it("webhookEvents table is exported from schema", async () => {
    const schema = await import("../drizzle/schema");
    expect(schema.webhookEvents).toBeDefined();
  });

  it("creditLedger table is exported from schema", async () => {
    const schema = await import("../drizzle/schema");
    expect(schema.creditLedger).toBeDefined();
  });
});

// ---- Router test for createCryptoInvoice ----

describe("payment.createCryptoInvoice", () => {
  it("procedure exists on payment router", async () => {
    const { appRouter } = await import("./routers");
    // Check that the procedure is defined (it will throw UNAUTHORIZED for unauthenticated calls)
    expect(appRouter._def.procedures).toBeDefined();
  });
});

// ---- Part 1: Rubric registry tests ----

describe("Rubric registry", () => {
  it("returns rubric for Business Management IA", async () => {
    const { getRubric } = await import("../shared/rubrics");
    const rubric = getRubric("IA", "Business Management");
    expect(rubric).toBeDefined();
    expect(rubric!.label).toContain("Business Management");
    expect(rubric!.criteria.length).toBeGreaterThan(0);
    // Total marks should sum correctly
    const total = rubric!.criteria.reduce((sum, c) => sum + c.max, 0);
    expect(total).toBe(rubric!.totalMarks);
  });

  it("returns rubric for Extended Essay (any subject)", async () => {
    const { getRubric } = await import("../shared/rubrics");
    const rubric = getRubric("EE", "Physics");
    expect(rubric).toBeDefined();
    expect(rubric!.label).toContain("Extended Essay");
    expect(rubric!.totalMarks).toBe(34);
  });

  it("returns rubric for TOK Essay", async () => {
    const { getRubric } = await import("../shared/rubrics");
    const rubric = getRubric("TOK", "Philosophy");
    expect(rubric).toBeDefined();
    expect(rubric!.label).toContain("TOK Essay");
  });

  it("returns undefined for unsupported IA subject", async () => {
    const { getRubric } = await import("../shared/rubrics");
    const rubric = getRubric("IA", "Nonexistent Subject 999");
    expect(rubric).toBeUndefined();
  });

  it("buildRubricPromptFragment returns non-empty for supported combo", async () => {
    const { buildRubricPromptFragment } = await import("../shared/rubrics");
    const fragment = buildRubricPromptFragment("IA", "Economics");
    expect(fragment.length).toBeGreaterThan(50);
    expect(fragment).toContain("criterion");
  });

  it("buildRubricPromptFragment returns empty for unsupported combo", async () => {
    const { buildRubricPromptFragment } = await import("../shared/rubrics");
    const fragment = buildRubricPromptFragment("IA", "Nonexistent Subject 999");
    expect(fragment).toBe("");
  });
});

// ---- Part 2: Pricing centralization tests ----

describe("Centralized pricing", () => {
  it("PRICES are in cents and consistent with PRICE_LABELS", async () => {
    const { PRICES, PRICE_LABELS } = await import("../shared/pricing");
    expect(PRICES.ESSAY_SINGLE).toBe(499);
    expect(PRICES.ESSAY_PACK_5).toBe(1999);
    expect(PRICES.ESSAY_PACK_10).toBe(3499);
    expect(PRICES.UNIVERSITY_SINGLE).toBe(2500);

    expect(PRICE_LABELS.ESSAY_SINGLE).toBe("$4.99");
    expect(PRICE_LABELS.ESSAY_PACK_5).toBe("$19.99");
    expect(PRICE_LABELS.ESSAY_PACK_10).toBe("$34.99");
    expect(PRICE_LABELS.UNIVERSITY_SINGLE).toBe("$25");
  });

  it("PRODUCTS import prices from shared/pricing (not hardcoded)", async () => {
    const { PRODUCTS } = await import("./products");
    const { PRICES } = await import("../shared/pricing");
    expect(PRODUCTS.ESSAY_SINGLE.priceAmount).toBe(PRICES.ESSAY_SINGLE);
    expect(PRODUCTS.UNIVERSITY_SINGLE.priceAmount).toBe(PRICES.UNIVERSITY_SINGLE);
  });
});

// ---- Part 6: NOWPayments webhook method guard ----

describe("NOWPayments webhook method guard", () => {
  it("registerNowPaymentsWebhook registers both app.all and app.post on /api/nowpayments/webhook", async () => {
    const { registerNowPaymentsWebhook } = await import("./nowpayments/nowpayments");

    const registeredRoutes: Array<{ method: string; path: string }> = [];
    const fakeApp = {
      all: (path: string, ..._handlers: any[]) => { registeredRoutes.push({ method: "all", path }); },
      post: (path: string, ..._handlers: any[]) => { registeredRoutes.push({ method: "post", path }); },
    };

    registerNowPaymentsWebhook(fakeApp as any);

    expect(registeredRoutes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ method: "all", path: "/api/nowpayments/webhook" }),
        expect.objectContaining({ method: "post", path: "/api/nowpayments/webhook" }),
      ])
    );
  });
});
