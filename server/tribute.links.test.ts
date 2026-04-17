import { describe, it, expect } from "vitest";

describe("Tribute product links", () => {
  it("TRIBUTE_LINK_ESSAY_SINGLE is set and valid", () => {
    const link = process.env.TRIBUTE_LINK_ESSAY_SINGLE;
    expect(link).toBeDefined();
    expect(link).toMatch(/^https:\/\/web\.tribute\.tg\/p\//);
  });

  it("TRIBUTE_LINK_ESSAY_PACK_5 is set and valid", () => {
    const link = process.env.TRIBUTE_LINK_ESSAY_PACK_5;
    expect(link).toBeDefined();
    expect(link).toMatch(/^https:\/\/web\.tribute\.tg\/p\//);
  });

  it("TRIBUTE_LINK_ESSAY_PACK_10 is set and valid", () => {
    const link = process.env.TRIBUTE_LINK_ESSAY_PACK_10;
    expect(link).toBeDefined();
    expect(link).toMatch(/^https:\/\/web\.tribute\.tg\/p\//);
  });

  it("TRIBUTE_LINK_UNIVERSITY_SINGLE is set and valid", () => {
    const link = process.env.TRIBUTE_LINK_UNIVERSITY_SINGLE;
    expect(link).toBeDefined();
    expect(link).toMatch(/^https:\/\/web\.tribute\.tg\/p\//);
  });

  it("all four links are unique", () => {
    const links = [
      process.env.TRIBUTE_LINK_ESSAY_SINGLE,
      process.env.TRIBUTE_LINK_ESSAY_PACK_5,
      process.env.TRIBUTE_LINK_ESSAY_PACK_10,
      process.env.TRIBUTE_LINK_UNIVERSITY_SINGLE,
    ];
    const uniqueLinks = new Set(links);
    expect(uniqueLinks.size).toBe(4);
  });
});
