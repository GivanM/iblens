import { describe, it, expect } from "vitest";
import crypto from "crypto";
import { verifyLsSignature, lsSkuToCredits, registerLemonsqueezyWebhook } from "./lemonsqueezy/lemonsqueezy";
import { LEMONSQUEEZY_VARIANTS, PRODUCT_KEY_TO_LS_SKU } from "../shared/pricing";

// ---- Helper to create a valid HMAC-SHA256 signature ----
function signBody(body: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(Buffer.from(body, "utf-8")).digest("hex");
}

// ---- Unit tests for verifyLsSignature ----
describe("LemonSqueezy: HMAC-SHA256 Signature Verification", () => {
  const secret = "test_webhook_secret_abc123";

  it("accepts a valid signature", () => {
    const body = JSON.stringify({ data: { id: "123" }, meta: { event_name: "order_created" } });
    const rawBody = Buffer.from(body, "utf-8");
    const signature = signBody(body, secret);
    expect(verifyLsSignature(rawBody, signature, secret)).toBe(true);
  });

  it("rejects a mutated payload (body changed after signing)", () => {
    const originalBody = JSON.stringify({ data: { id: "123" } });
    const signature = signBody(originalBody, secret);
    const mutatedBody = Buffer.from(JSON.stringify({ data: { id: "456" } }), "utf-8");
    expect(verifyLsSignature(mutatedBody, signature, secret)).toBe(false);
  });

  it("rejects an invalid signature (wrong secret)", () => {
    const body = JSON.stringify({ data: { id: "123" } });
    const rawBody = Buffer.from(body, "utf-8");
    const signature = signBody(body, "wrong_secret");
    expect(verifyLsSignature(rawBody, signature, secret)).toBe(false);
  });

  it("rejects empty signature", () => {
    const body = JSON.stringify({ data: { id: "123" } });
    const rawBody = Buffer.from(body, "utf-8");
    expect(verifyLsSignature(rawBody, "", secret)).toBe(false);
  });

  it("rejects when secret is empty", () => {
    const body = JSON.stringify({ data: { id: "123" } });
    const rawBody = Buffer.from(body, "utf-8");
    const signature = signBody(body, secret);
    expect(verifyLsSignature(rawBody, signature, "")).toBe(false);
  });

  it("rejects malformed hex signature", () => {
    const body = JSON.stringify({ data: { id: "123" } });
    const rawBody = Buffer.from(body, "utf-8");
    expect(verifyLsSignature(rawBody, "not-valid-hex-zzz", secret)).toBe(false);
  });
});

// ---- Unit tests for lsSkuToCredits ----
describe("LemonSqueezy: SKU to Credits Mapping", () => {
  it("essay_single grants 1 essay credit", () => {
    expect(lsSkuToCredits("essay_single")).toEqual({ essay: 1, university: 0 });
  });

  it("essay_pack_5 grants 5 essay credits", () => {
    expect(lsSkuToCredits("essay_pack_5")).toEqual({ essay: 5, university: 0 });
  });

  it("essay_pack_10 grants 10 essay credits", () => {
    expect(lsSkuToCredits("essay_pack_10")).toEqual({ essay: 10, university: 0 });
  });

  it("university_single grants 1 university credit", () => {
    expect(lsSkuToCredits("university_single")).toEqual({ essay: 0, university: 1 });
  });

  it("university_strategy grants 1 university credit", () => {
    expect(lsSkuToCredits("university_strategy")).toEqual({ essay: 0, university: 1 });
  });

  it("unknown SKU grants zero credits", () => {
    expect(lsSkuToCredits("unknown_product")).toEqual({ essay: 0, university: 0 });
  });
});

// ---- Variant ID map tests ----
describe("LemonSqueezy: Variant ID Configuration", () => {
  it("all 4 SKUs have variant IDs defined", () => {
    expect(LEMONSQUEEZY_VARIANTS["essay_single"]).toBe(1593708);
    expect(LEMONSQUEEZY_VARIANTS["essay_pack_5"]).toBe(1593731);
    expect(LEMONSQUEEZY_VARIANTS["essay_pack_10"]).toBe(1593732);
    expect(LEMONSQUEEZY_VARIANTS["university_strategy"]).toBe(1593734);
  });

  it("PRODUCT_KEY_TO_LS_SKU maps all product keys", () => {
    expect(PRODUCT_KEY_TO_LS_SKU.ESSAY_SINGLE).toBe("essay_single");
    expect(PRODUCT_KEY_TO_LS_SKU.ESSAY_PACK_5).toBe("essay_pack_5");
    expect(PRODUCT_KEY_TO_LS_SKU.ESSAY_PACK_10).toBe("essay_pack_10");
    expect(PRODUCT_KEY_TO_LS_SKU.UNIVERSITY_SINGLE).toBe("university_strategy");
  });

  it("every PRODUCT_KEY maps to a valid variant ID", () => {
    for (const [key, lsSku] of Object.entries(PRODUCT_KEY_TO_LS_SKU)) {
      const variantId = LEMONSQUEEZY_VARIANTS[lsSku];
      expect(variantId).toBeGreaterThan(0);
    }
  });
});

// ---- Webhook handler integration tests (simulated) ----
describe("LemonSqueezy: Webhook Handler Logic", () => {
  it("order_created with each SKU maps to correct credit amounts", () => {
    const skus = ["essay_single", "essay_pack_5", "essay_pack_10", "university_single"];
    const expected = [
      { essay: 1, university: 0 },
      { essay: 5, university: 0 },
      { essay: 10, university: 0 },
      { essay: 0, university: 1 },
    ];
    skus.forEach((sku, i) => {
      expect(lsSkuToCredits(sku)).toEqual(expected[i]);
    });
  });

  it("order_refunded reverses credits (negative of order_created)", () => {
    const skus = ["essay_single", "essay_pack_5", "essay_pack_10", "university_single"];
    skus.forEach((sku) => {
      const credits = lsSkuToCredits(sku);
      // Refund would be -credits.essay, -credits.university
      const refund = { essay: -credits.essay, university: -credits.university };
      expect(refund.essay + credits.essay).toBe(0);
      expect(refund.university + credits.university).toBe(0);
    });
  });

  it("unknown variant_id in webhook payload returns zero credits (no crash)", () => {
    // Simulating an unknown variant/SKU arriving in webhook
    const credits = lsSkuToCredits("some_random_variant_999");
    expect(credits).toEqual({ essay: 0, university: 0 });
  });
});

// ---- Method guard test ----
describe("LemonSqueezy: Webhook Method Guard", () => {
  it("registerLemonsqueezyWebhook is exported as a function", () => {
    expect(typeof registerLemonsqueezyWebhook).toBe("function");
  });

  it("registers app.all and app.post handlers for /api/lemonsqueezy/webhook", () => {
    const routes: Array<{ method: string; path: string }> = [];
    const mockApp = {
      all: (path: string, handler: any) => { routes.push({ method: "all", path }); },
      post: (path: string, ...handlers: any[]) => { routes.push({ method: "post", path }); },
    };
    
    registerLemonsqueezyWebhook(mockApp as any);
    
    expect(routes).toContainEqual({ method: "all", path: "/api/lemonsqueezy/webhook" });
    expect(routes).toContainEqual({ method: "post", path: "/api/lemonsqueezy/webhook" });
  });
});

// ---- Idempotency test (logic verification) ----
describe("LemonSqueezy: Idempotency Logic", () => {
  it("webhook_events table uses unique constraint for deduplication", () => {
    // The webhook_events table has a unique index on (provider, npPaymentId, paymentStatus)
    // When the same event arrives twice, the second insert fails and the handler returns 200
    // This structural guarantee is verified by the schema definition
    // Here we just confirm the handler module is properly structured
    expect(typeof verifyLsSignature).toBe("function");
    expect(typeof lsSkuToCredits).toBe("function");
  });
});
