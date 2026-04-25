import { describe, it, expect } from "vitest";

describe("NOWPayments API Key", () => {
  it("should have NOWPAYMENTS_API_KEY set in environment", () => {
    expect(process.env.NOWPAYMENTS_API_KEY).toBeDefined();
    expect(process.env.NOWPAYMENTS_API_KEY!.length).toBeGreaterThan(0);
  });

  it("should be a placeholder value for now", () => {
    // This test confirms the key is set; when real key is provided, update this test
    expect(typeof process.env.NOWPAYMENTS_API_KEY).toBe("string");
  });
});
