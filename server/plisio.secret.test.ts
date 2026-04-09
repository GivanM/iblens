import { describe, expect, it } from "vitest";

describe("Plisio SECRET_KEY validation", () => {
  it("should authenticate with Plisio API using the provided SECRET_KEY", async () => {
    const secretKey = process.env.PLISIO_SECRET_KEY;
    expect(secretKey).toBeTruthy();

    // Call Plisio cryptocurrencies endpoint to verify the key is valid
    // This endpoint lists supported coins and requires a valid api_key
    const response = await fetch(
      `https://api.plisio.net/api/v1/currencies?api_key=${secretKey}`
    );

    const data = await response.json();

    // If key is invalid, Plisio returns 401 with "Unauthorized"
    if (data?.data?.name === "Unauthorized") {
      throw new Error("Plisio SECRET_KEY is invalid or expired. Please provide a valid key from plisio.net dashboard.");
    }

    expect(response.status).toBe(200);
    expect(data.status).toBe("success");
  });
});
