/**
 * Word counts the grader can stand behind. The pasted text is counted as it is.
 * Each official count leaves some material out (references, the bibliography,
 * tables and so on, depending on the task), so the check reports the raw count,
 * names what the official count excludes, and does not pretend to know more.
 */
import type { Rubric } from "./rubrics";

export type WordCheckStatus = "over" | "near" | "under_min" | "short" | "within";

export interface WordCheck {
  words: number;
  max: number;
  min?: number;
  unit?: string;
  excludes: string;
  status: WordCheckStatus;
  /** The guide says marking stops at the limit, rather than only setting a maximum. */
  stopsAt: boolean;
  /** A few words either side of the limit, in the student's own text. */
  cutoff?: string;
}

// A token is a word when it holds at least one letter or digit, in any script the
// site's users write in. A lone dash, bullet or asterisk is not a word.
const COUNTED = /[A-Za-z0-9\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u1FFF\u2C00-\u2FFF\u3040-\uD7FF\uF900-\uFDFF\uFE70-\uFEFF\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFDC]/;

export function countWords(text: string): number {
  if (!text) return 0;
  let n = 0;
  for (const token of text.split(/\s+/)) if (COUNTED.test(token)) n++;
  return n;
}

/** A few words either side of the given word, from the student's own text. */
export function passageAt(text: string, wordNumber: number): string {
  const tokens = text.split(/\s+/).filter(Boolean);
  let counted = 0;
  for (let i = 0; i < tokens.length; i++) {
    if (!COUNTED.test(tokens[i])) continue;
    counted++;
    if (counted === wordNumber) {
      const from = Math.max(0, i - 6);
      const to = Math.min(tokens.length, i + 6);
      return `${from > 0 ? "…" : ""}${tokens.slice(from, to).join(" ")}${to < tokens.length ? "…" : ""}`;
    }
  }
  return "";
}

/**
 * The version kept with a report. The privacy policy says essay text is never
 * written to the database, so the passage at the limit is left out; the page
 * recomputes it from the text still in the form.
 */
export function storableWordCheck(check: WordCheck | null): WordCheck | null {
  if (!check) return null;
  const { cutoff: _omit, ...rest } = check;
  return rest;
}

export function checkWordLimit(rubric: Rubric | undefined, text: string): WordCheck | null {
  const limit = rubric?.wordLimit;
  if (!limit) return null;
  const words = countWords(text);
  let status: WordCheckStatus = "within";
  if (words > limit.max) status = "over";
  else if (limit.min && words < limit.min) status = "under_min";
  else if (words >= Math.round(limit.max * 0.95)) status = "near";
  else if (!limit.min && words < Math.round(limit.max * 0.5)) status = "short";
  return {
    words,
    max: limit.max,
    min: limit.min,
    unit: limit.unit,
    excludes: limit.excludes,
    status,
    stopsAt: limit.stopsAt === true,
    cutoff: status === "over" ? passageAt(text, limit.max) : undefined,
  };
}
