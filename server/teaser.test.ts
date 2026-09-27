import { describe, it, expect } from "vitest";
import { computeTeaser, buildTeaser, firstSentence } from "./scores";

/**
 * What the free preview may show. In the month to 27 September 2026 it showed the weakest
 * criterion's mark, its whole comment and three risks in full: 126 previews produced no
 * sales. It now names the criterion, opens its comment and shows one risk in full.
 */
const result = {
  predicted_score: 9,
  max_score: 14,
  criteria: [
    { name: "Criterion A: Diagrams", max: 3, score: 2, comment: "The diagram is drawn but never used. You refer to one diagram, and the explanation of the shift is thin, which leaves the analysis to stand on the text alone." },
    { name: "Criterion B: Terminology", max: 2, score: 2, comment: "Terms are used correctly throughout." },
    { name: "Criterion C: Application", max: 3, score: 2, comment: "The theory fits the article, but the article is barely quoted." },
  ],
  risks: [
    { title: "The article is barely used", description: "With no rate, price change or stakeholders, the application to the article looks general and the same commentary could have been written about any country." },
    { title: "The research question is never answered", description: "Your title asks to what extent, but no measure of the extent appears anywhere in the commentary." },
    { title: "Externality theory without a diagram", description: "You claim over-consumption and a welfare loss to society, but refer to no diagram that shows these." },
  ],
};

describe("Free preview: what it may show", () => {
  const teaser: any = computeTeaser(result);

  it("names the weakest criterion but not its mark", () => {
    expect(teaser.weakest_criterion.name).toBe("Criterion A: Diagrams");
    expect(teaser.weakest_criterion.score).toBeNull();
  });

  it("shows the opening of that criterion's comment, not the whole of it", () => {
    expect(teaser.weakest_criterion.comment).toBe("The diagram is drawn but never used.");
    expect(teaser.weakest_comment_trimmed).toBe(true);
  });

  it("shows the first risk in full and names the rest", () => {
    expect(teaser.risks).toHaveLength(3);
    expect(teaser.risks[0].description.length).toBeGreaterThan(0);
    expect(teaser.risks[1].description).toBe("");
    expect(teaser.risks[2].description).toBe("");
    expect(teaser.risks[1].title).toBe("The research question is never answered");
  });

  it("keeps the range and the criteria names, which the report is sold against", () => {
    expect(teaser.max_score).toBe(14);
    expect(teaser.criteria_names.map((c: any) => c.name)).toContain("Criterion B: Terminology");
    expect(teaser.locked).toBe(true);
  });

  it("reads a preview stored under the older, more generous rule the same way", () => {
    const stored: any = {
      ...result,
      _preview: {
        locked: true,
        band_range: "8-11",
        max_score: 14,
        weakest_criterion: { name: "Criterion A: Diagrams", max: 3, score: 2, comment: result.criteria[0].comment },
        risks: result.risks.map((r) => ({ ...r })),
        criteria_names: result.criteria.map((c) => ({ name: c.name, max: c.max, assessed: true })),
        criteria_count: 3,
      },
    };
    const served: any = buildTeaser(stored);
    expect(served.band_range).toBe("8-11");
    expect(served.weakest_criterion.score).toBeNull();
    expect(served.weakest_criterion.comment).toBe("The diagram is drawn but never used.");
    expect(served.risks[1].description).toBe("");
  });
});

describe("firstSentence", () => {
  it("returns the first sentence", () => {
    expect(firstSentence("One. Two. Three.", 200)).toBe("One.");
  });

  it("leaves a single short sentence alone", () => {
    expect(firstSentence("No full stop here", 200)).toBe("No full stop here");
  });

  it("cuts a sentence that runs past the limit", () => {
    const long = "A sentence that keeps going and going and going without stopping anywhere near the limit set for it.";
    const cut = firstSentence(long, 40);
    expect(cut.length).toBeLessThanOrEqual(41);
    expect(long.startsWith(cut.replace(/…$/, "").trim())).toBe(true);
  });
});
