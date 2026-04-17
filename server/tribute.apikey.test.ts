import { describe, it, expect } from "vitest";
import { createHmac } from "crypto";

describe("Tribute API key", () => {
  it("TRIBUTE_API_KEY is set", () => {
    const key = process.env.TRIBUTE_API_KEY;
    expect(key).toBeDefined();
    expect(key!.length).toBeGreaterThan(10);
  });

  it("TRIBUTE_API_KEY can be used for HMAC-SHA256 signing", () => {
    const key = process.env.TRIBUTE_API_KEY!;
    const testPayload = JSON.stringify({ event: "test", amount: 500 });
    const hmac = createHmac("sha256", key).update(testPayload).digest("hex");
    expect(hmac).toBeDefined();
    expect(hmac.length).toBe(64); // SHA256 hex digest is 64 chars
  });

  it("TRIBUTE_API_KEY matches UUID-like format", () => {
    const key = process.env.TRIBUTE_API_KEY!;
    // Tribute keys follow a UUID-like pattern with hyphens
    expect(key).toMatch(/^[a-f0-9-]+$/);
  });
});
