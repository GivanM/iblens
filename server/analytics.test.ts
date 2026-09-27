import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ─── Test: GA4 Measurement Protocol helper ─────────────────────────────────────

describe("GA4 Measurement Protocol (server/ga4mp.ts)", () => {
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    // Reset env for each test
    process.env.GA4_MEASUREMENT_ID = "G-TEST123";
    process.env.GA4_API_SECRET = "test-secret";
  });

  afterEach(() => {
    global.fetch = originalFetch;
    delete process.env.GA4_MEASUREMENT_ID;
    delete process.env.GA4_API_SECRET;
  });

  it("sends purchase event to GA4 MP endpoint with correct payload", async () => {
    let capturedUrl = "";
    let capturedBody = "";

    global.fetch = vi.fn(async (url: any, opts: any) => {
      capturedUrl = String(url);
      capturedBody = opts?.body || "";
      return new Response(null, { status: 204 });
    }) as any;

    // Re-import to pick up env changes
    const { sendGA4PurchaseEvent } = await import("./ga4mp");

    const result = await sendGA4PurchaseEvent({
      orderId: "order-123",
      productSlug: "essay_single",
      valueUsd: 4.99,
      paymentMethod: "lemonsqueezy",
      userId: "user-456",
    });

    expect(result).toBe(true);
    expect(capturedUrl).toContain("google-analytics.com/mp/collect");
    expect(capturedUrl).toContain("measurement_id=");
    expect(capturedUrl).toContain("api_secret=");

    const body = JSON.parse(capturedBody);
    // The event carries the order and nothing that identifies the buyer, because it is sent
    // without the visitor's consent choice.
    expect(body.client_id).toBe("order.order-123");
    expect(body.user_id).toBeUndefined();
    expect(body.events).toHaveLength(1);
    expect(body.events[0].name).toBe("purchase");
    expect(body.events[0].params.transaction_id).toBe("order-123");
    expect(body.events[0].params.value).toBe(4.99);
    expect(body.events[0].params.currency).toBe("USD");
    expect(body.events[0].params.payment_type).toBe("lemonsqueezy");
    expect(body.events[0].params.items[0].item_id).toBe("essay_single");
    expect(body.events[0].params.items[0].item_name).toBeTruthy();
  });

  it("returns false and does not throw when GA4_API_SECRET is missing", async () => {
    process.env.GA4_API_SECRET = "";

    // Need fresh import
    vi.resetModules();
    const { sendGA4PurchaseEvent } = await import("./ga4mp");

    const result = await sendGA4PurchaseEvent({
      orderId: "order-123",
      productSlug: "essay_single",
      valueUsd: 4.99,
      paymentMethod: "lemonsqueezy",
      userId: "user-456",
    });

    expect(result).toBe(false);
  });

  it("returns false on network error without throwing", async () => {
    global.fetch = vi.fn(async () => {
      throw new Error("Network timeout");
    }) as any;

    const { sendGA4PurchaseEvent } = await import("./ga4mp");

    const result = await sendGA4PurchaseEvent({
      orderId: "order-123",
      productSlug: "essay_pack_5",
      valueUsd: 19.99,
      paymentMethod: "nowpayments",
      userId: "user-789",
    });

    expect(result).toBe(false);
  });

  it("maps product slugs to human-readable names", async () => {
    // Ensure env is set before re-importing
    process.env.GA4_API_SECRET = "test-secret";
    process.env.GA4_MEASUREMENT_ID = "G-TEST123";

    let capturedBody = "";
    global.fetch = vi.fn(async (_url: any, opts: any) => {
      capturedBody = opts?.body || "";
      return new Response(null, { status: 204 });
    }) as any;

    vi.resetModules();
    const { sendGA4PurchaseEvent } = await import("./ga4mp");

    await sendGA4PurchaseEvent({
      orderId: "order-x",
      productSlug: "university_strategy",
      valueUsd: 25.0,
      paymentMethod: "lemonsqueezy",
      userId: "user-1",
    });

    const body = JSON.parse(capturedBody);
    expect(body.events[0].params.items[0].item_name).toBe("University Strategy Report");
  });
});

// ─── Test: LemonSqueezy redirect URL includes tracking params ───────────────────

describe("LemonSqueezy checkout redirect URL", () => {
  it("createLemonsqueezyCheckout builds a direct buy URL carrying the order and the return trip", async () => {
    // The checkout is a direct buy URL built from the product's own link, so there is no API
    // call to mock: everything the webhook needs travels in the query string.
    const { createLemonsqueezyCheckout } = await import("./lemonsqueezy/lemonsqueezy");
    const { PRICES } = await import("../shared/pricing");

    const result = await createLemonsqueezyCheckout(
      "order-abc",
      1593708,
      "test@example.com",
      "essay_single",
      PRICES.ESSAY_SINGLE,
      "device-1",
      "essay",
      undefined,
      true,
      true,
    );

    const url = new URL(result.checkoutUrl);
    expect(url.hostname).toBe("iblens.lemonsqueezy.com");
    expect(url.searchParams.get("checkout[custom][order_id]")).toBe("order-abc");
    expect(url.searchParams.get("checkout[custom][unlock_fp]")).toBe("device-1");
    expect(url.searchParams.get("checkout[custom][unlock_preview]")).toBe("1");
    expect(url.searchParams.get("checkout[email]")).toBe("test@example.com");

    const redirectUrl = String(url.searchParams.get("checkout[redirect_url]"));
    expect(redirectUrl).toContain("payment=success");
    expect(redirectUrl).toContain("order=order-abc");
    expect(redirectUrl).toContain("product=essay_single");
    expect(redirectUrl).toContain(`value=${(PRICES.ESSAY_SINGLE / 100).toFixed(2)}`);
    expect(redirectUrl).toContain("method=lemonsqueezy");
  });
});

// ─── Test: LemonSqueezy SKU to credits mapping ──────────────────────────────────

describe("lsSkuToCredits", () => {
  it("maps essay_single to 1 essay credit", async () => {
    const { lsSkuToCredits } = await import("./lemonsqueezy/lemonsqueezy");
    expect(lsSkuToCredits("essay_single")).toEqual({ essay: 1, university: 0 });
  });

  it("maps essay_pack_5 to 5 essay credits", async () => {
    const { lsSkuToCredits } = await import("./lemonsqueezy/lemonsqueezy");
    expect(lsSkuToCredits("essay_pack_5")).toEqual({ essay: 5, university: 0 });
  });

  it("maps essay_pack_10 to 10 essay credits", async () => {
    const { lsSkuToCredits } = await import("./lemonsqueezy/lemonsqueezy");
    expect(lsSkuToCredits("essay_pack_10")).toEqual({ essay: 10, university: 0 });
  });

  it("maps university_strategy to 1 university credit", async () => {
    const { lsSkuToCredits } = await import("./lemonsqueezy/lemonsqueezy");
    expect(lsSkuToCredits("university_strategy")).toEqual({ essay: 0, university: 1 });
  });

  it("maps unknown SKU to 0 credits", async () => {
    const { lsSkuToCredits } = await import("./lemonsqueezy/lemonsqueezy");
    expect(lsSkuToCredits("unknown_sku")).toEqual({ essay: 0, university: 0 });
  });
});
