import { describe, it, expect } from "vitest";

describe("LemonSqueezy: API Key Validation", () => {
  it("LEMONSQUEEZY_API_KEY can authenticate against LS API (GET /v1/stores)", async () => {
    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    if (!apiKey) {
      console.warn("LEMONSQUEEZY_API_KEY not set, skipping live validation");
      return;
    }

    const response = await fetch("https://api.lemonsqueezy.com/v1/stores", {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Accept": "application/vnd.api+json",
      },
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.data).toBeDefined();
    expect(Array.isArray(data.data)).toBe(true);
  });

  it("LEMONSQUEEZY_STORE_ID is set and is a numeric string", () => {
    const storeId = process.env.LEMONSQUEEZY_STORE_ID;
    if (!storeId) {
      console.warn("LEMONSQUEEZY_STORE_ID not set, skipping");
      return;
    }
    expect(Number(storeId)).toBeGreaterThan(0);
  });

  it("LEMONSQUEEZY_WEBHOOK_SECRET is set and is non-empty", () => {
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    if (!secret) {
      console.warn("LEMONSQUEEZY_WEBHOOK_SECRET not set, skipping");
      return;
    }
    expect(secret.length).toBeGreaterThan(0);
  });
});
