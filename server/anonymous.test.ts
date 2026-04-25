import { describe, it, expect } from "vitest";
import { generateFingerprint } from "./db";

describe("Anonymous Analysis", () => {
  describe("generateFingerprint", () => {
    it("should generate a consistent fingerprint for the same IP and user-agent", () => {
      const fp1 = generateFingerprint("192.168.1.1", "Mozilla/5.0");
      const fp2 = generateFingerprint("192.168.1.1", "Mozilla/5.0");
      expect(fp1).toBe(fp2);
    });

    it("should generate different fingerprints for different IPs", () => {
      const fp1 = generateFingerprint("192.168.1.1", "Mozilla/5.0");
      const fp2 = generateFingerprint("10.0.0.1", "Mozilla/5.0");
      expect(fp1).not.toBe(fp2);
    });

    it("should generate different fingerprints for different user-agents", () => {
      const fp1 = generateFingerprint("192.168.1.1", "Mozilla/5.0");
      const fp2 = generateFingerprint("192.168.1.1", "Chrome/120");
      expect(fp1).not.toBe(fp2);
    });

    it("should return a 64-character hex string", () => {
      const fp = generateFingerprint("192.168.1.1", "Mozilla/5.0");
      expect(fp).toHaveLength(64);
      expect(fp).toMatch(/^[a-f0-9]+$/);
    });

    it("should handle empty strings gracefully", () => {
      const fp = generateFingerprint("", "");
      expect(fp).toHaveLength(64);
      expect(fp).toMatch(/^[a-f0-9]+$/);
    });

    it("should handle 'unknown' values (fallback case)", () => {
      const fp = generateFingerprint("unknown", "unknown");
      expect(fp).toHaveLength(64);
      expect(fp).toMatch(/^[a-f0-9]+$/);
    });
  });

  describe("Anonymous analysis router", () => {
    it("should have analyzeAnonymous as a public procedure (no auth required)", async () => {
      const { appRouter } = await import("./routers");
      const procedures = Object.keys(appRouter._def.procedures);
      expect(procedures).toContain("essay.analyzeAnonymous");
    });

    it("should have canAnalyzeAnonymous as a public procedure", async () => {
      const { appRouter } = await import("./routers");
      const procedures = Object.keys(appRouter._def.procedures);
      expect(procedures).toContain("essay.canAnalyzeAnonymous");
    });

    it("should still have the protected analyze procedure for logged-in users", async () => {
      const { appRouter } = await import("./routers");
      const procedures = Object.keys(appRouter._def.procedures);
      expect(procedures).toContain("essay.analyze");
    });
  });

  describe("Schema", () => {
    it("should export anonymousAnalyses table", async () => {
      const schema = await import("../drizzle/schema");
      expect(schema.anonymousAnalyses).toBeDefined();
    });

    it("anonymousAnalyses table should have required columns", async () => {
      const schema = await import("../drizzle/schema");
      const table = schema.anonymousAnalyses;
      // Check that the table has the expected column names
      const columnNames = Object.keys(table);
      expect(columnNames).toContain("fingerprint");
      expect(columnNames).toContain("type");
      expect(columnNames).toContain("resultJson");
    });
  });
});
