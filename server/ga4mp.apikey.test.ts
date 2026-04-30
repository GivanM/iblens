import { describe, it, expect } from "vitest";

describe("GA4 Measurement Protocol: API Secret Validation", () => {
  it("GA4_API_SECRET can authenticate against GA4 MP debug endpoint", async () => {
    const apiSecret = process.env.GA4_API_SECRET;
    const measurementId = process.env.GA4_MEASUREMENT_ID || "G-391DXZEC51";

    if (!apiSecret) {
      console.warn("GA4_API_SECRET not set, skipping live validation");
      return;
    }

    // Use the GA4 MP debug endpoint to validate the secret
    // Debug endpoint returns validation messages instead of silently accepting
    const url = `https://www.google-analytics.com/debug/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: "test-validation-client",
        events: [
          {
            name: "test_event",
            params: { test_param: "validation" },
          },
        ],
      }),
    });

    // Debug endpoint returns 200 with a JSON body containing validationMessages
    expect(response.status).toBe(200);

    const data = await response.json();
    // If the secret is invalid, GA4 returns a non-200 or an error in validationMessages
    // A valid secret + valid payload returns validationMessages as an empty array
    expect(data).toBeDefined();
    expect(data.validationMessages).toBeDefined();
    // No validation errors means the secret is accepted
    expect(data.validationMessages.length).toBe(0);
  }, 10000);
});
