/**
 * How a report's marks are made consistent before anyone sees them. Kept apart from the
 * routers so the same rules apply to new reports and to reports already stored.
 */

/**
 * Criteria scored on something the student's form never asks for (the EE reflective
 * form, RPF/RPPF). Showing one as the free weakest-criterion sample spends the single
 * demonstration on something the student could not have supplied.
 */
export function isNotAssessableFromText(c: any): boolean {
  const name = String(c?.name || "").toLowerCase();
  const comment = String(c?.comment || "").toLowerCase();
  const isReflection = name.includes("reflection") || name.includes("engagement");
  if (!isReflection) return false;
  // Only a comment saying the reflections were absent. Naming the RPF or RPPF is not enough:
  // a comment on reflections that were pasted names them too, and the criterion that really
  // lost the most was then passed over for the preview.
  // The Maths "Reflection" and History "Reflection" criteria are marked on the text, so the
  // comment must be about the separate reflection form, and say it was absent.
  const aboutForm = /\brpf\b|\brppf\b|reflective statement|reflection (and|&) progress form|reflections on planning (and|&) progress/.test(comment);
  const absent = /not (been )?(submitted|provided|included|attached|pasted)|not assessed|absence of|was not part of|were not part of/.test(comment);
  return aboutForm && absent;
}

/**
 * The cell of [lo, hi] that holds the total: cells of `width` counted down from hi, with a
 * leftover at the bottom narrower than 3 joined to the cell above it, so no cell ever names
 * fewer than three possible totals.
 */
function cellIn(total: number, lo: number, hi: number, width: number): [number, number] {
  const t = Math.max(lo, Math.min(hi, total));
  let top = hi - width * Math.floor((hi - t) / width);
  let bottom = top - width + 1;
  if (bottom > lo && bottom - lo < 3) bottom = lo;
  if (bottom <= lo) {
    bottom = lo;
    if (top - lo + 1 < 3) top = Math.min(hi, top + width);
  }
  return [bottom, top];
}

/**
 * The band shown with a mark: a fixed cell of the scale, counted down from the top, that
 * contains the total. A band centred on the total, which is what the model tends to write,
 * gave the paid mark away in the free preview as the middle of the band.
 */
export function bandCell(total: number, max: number): string {
  const [a, b] = cellIn(total, 0, max, Math.max(3, Math.round(max / 6)));
  return `${a}-${b}`;
}

/** The criterion the free preview shows in full: the one losing the largest share of its marks. */
export function pickWeakest(criteria: any[]) {
  const scored = criteria.filter((c) => typeof c?.score === "number" && c?.max > 0);
  const assessable = scored.filter((c) => !isNotAssessableFromText(c));
  const pool = assessable.length ? assessable : scored;
  const weakest = pool.length ? [...pool].sort((a, b) => a.score / a.max - b.score / b.max)[0] : null;
  return { weakest, pool, scored };
}

/**
 * The range a report marked on criteria shows, and whether its weakest criterion's mark can
 * be shown with it. The preview gives that mark and every other maximum, and every other
 * criterion scores at least the same share, so the total cannot be below a floor the reader
 * can work out. Cells over the whole scale then sometimes held a single possible total, the
 * mark the full report sells. Cells are cut from the totals still possible; when fewer than
 * three remain, the weakest criterion's mark is left out instead.
 */
export function previewBand(result: any): { band: string; hideWeakest: boolean } | null {
  const criteria: any[] = Array.isArray(result?.criteria) ? result.criteria : [];
  const total = result?.predicted_score;
  const max = result?.max_score;
  if (criteria.length <= 1 || typeof total !== "number" || typeof max !== "number" || max <= 0) return null;
  const shown = shownCell(criteria, total, max);
  if (shown) return { band: shown, hideWeakest: false };
  // No criterion is shown at all: a hidden mark next to a named criterion was itself a clue.
  // The range is every total at which that happens for this rubric shape, so seeing no
  // criterion says nothing more than that.
  const [a, b] = hiddenRange(criteria, max, total);
  return { band: `${a}-${b}`, hideWeakest: true };
}

/** The range for a preview that names its weakest criterion with its mark, or null when fewer than three totals would remain. */
function shownCell(criteria: any[], total: number, max: number): string | null {
  const width = Math.max(3, Math.round(max / 6));
  const { weakest, pool, scored } = pickWeakest(criteria);
  if (weakest) {
    const share = weakest.score / weakest.max;
    // The weakest is the first criterion with the lowest share, so one listed before it
    // has a strictly higher share and one listed after it at least the same.
    const at = criteria.indexOf(weakest);
    let floor = 0;
    for (const c of scored) {
      if (c === weakest) floor += c.score;
      else if (pool.includes(c)) {
        const least = criteria.indexOf(c) < at ? Math.floor(share * c.max + 1e-9) + 1 : Math.ceil(share * c.max - 1e-9);
        floor += Math.min(c.max, least);
      }
    }
    // Its own mark is shown, so the most the total can be is that mark plus every other maximum.
    const ceiling = max - (weakest.max - weakest.score);
    if (ceiling - floor + 1 >= 3 && total >= floor && total <= ceiling) {
      const [a, b] = cellIn(total, floor, ceiling, width);
      return `${a}-${b}`;
    }
  }
  return null;
}

const hiddenRanges = new Map<string, [number, number]>();

/** Every total, for criteria of these maxima, at which the preview can name no criterion. */
function hiddenRange(criteria: any[], max: number, total: number): [number, number] {
  const marked = criteria.map((c) => typeof c?.score === "number" && c?.max > 0);
  const key = criteria.map((c, i) => (marked[i] ? `${c.max}${isNotAssessableFromText(c) ? "x" : ""}` : "-")).join(",") + `/${max}`;
  let range = hiddenRanges.get(key);
  if (!range) {
    const slots = criteria.map((c, i) => (marked[i] ? i : -1)).filter((i) => i >= 0);
    const space = slots.reduce((n, i) => n * (criteria[i].max + 1), 1);
    if (space > 300_000) {
      range = [0, max];
    } else {
      const clone = criteria.map((c) => ({ name: c?.name, comment: c?.comment, max: c?.max, score: c?.score }));
      let lo = Infinity, hi = -Infinity;
      const walk = (k: number, sum: number) => {
        if (k === slots.length) {
          if (!shownCell(clone, sum, max)) { lo = Math.min(lo, sum); hi = Math.max(hi, sum); }
          return;
        }
        for (let s = 0; s <= clone[slots[k]].max; s++) { clone[slots[k]].score = s; walk(k + 1, sum + s); }
      };
      walk(0, 0);
      range = lo <= hi ? [lo, hi] : [0, max];
      if (range[1] - range[0] < 2) range = [Math.max(0, range[1] - 2), range[1]];
    }
    hiddenRanges.set(key, range);
  }
  return total >= range[0] && total <= range[1] ? range : [0, max];
}

const RANGE = /\b\d[\d,]*\s*[-–—]\s*\d[\d,]*\b/g;
// Things counted in coursework that are not marks: "3 of 5 sources", "one of four key concepts".
const COUNTED_NOUN = String.raw`(?!\s+(?:of\s+)?(?:your\s+|the\s+)?(?:key\s+)?(?:concepts?|sources?|objects?|commentaries|commentary|areas?|prompts?|units?|documents?|articles?|words?|pages?|paragraphs?|sections?|examples?|questions?|variables?|trials?|repeats?))`;
const FRACTION = /\d+(?:\.\d+)?\s*(?:\/|out of)\s*\d+/i;
const COUNTED = /\b(?:\d+(?:\.\d+)?|one|two|three|four|five|six)\s*(?:marks?|points?)\b/i;
const GIVEN = /\b(?:award(?:s|ed)?|scor(?:e|es|ed|ing)|mark(?:s|ed)?|receiv(?:e|es|ed|ing)|earn(?:s|ed|ing)?|gain(?:s|ed|ing)?|lean(?:s|ing)?\s+towards?|sits?\s+at|placed\s+at|level)\s+(?:of\s+|at\s+|a\s+|an\s+|around\s+|about\s+|roughly\s+)?\d+(?:\.\d+)?\b/i;
const RANGE_MARK = /\d+\s*[-–—]\s*\d+\s*(?:\/|out of|of)\s*\d+|\b\d+\s*[-–—]\s*\d+\s+(?:in|for|on)\s+criterion\b/i;
const N_OF_N = new RegExp(String.raw`\b\d+(?:\.\d+)?\s+of\s+\d+\b` + COUNTED_NOUN, "i");
const TOTAL_IS = /\b(?:total|overall)\s+(?:mark\s+|score\s+)?(?:is\s+|of\s+|would be\s+|at\s+|comes to\s+)?(?:about\s+|around\s+|roughly\s+)?\d+(?![\d,]*\s*(?:words?|characters?|%|pages?))/i;
const CRITERION_COLON = /\bcriterion\s+[a-g][12]?\s*[:=]\s*\d+\b/i;
const CAPPED = /\b(?:scor(?:e|es|ing)|mark(?:s|ed)?)\s+(?:above|below|at|of|higher than|more than|lower than)\s+\d+\b|\bcapped at\s+\d+\b|\bcannot (?:score|get|go|be awarded) (?:above|higher than|more than|beyond)\s+\d+\b|\b(?:puts?|places?)\s+criterion\s+[a-g][12]?\s+at\s+\d+\b|\bis an?\s+\d+\b(?![\d,.]*\s*(?:-|words?|%|pages?|minutes?|°|degrees?))/i;
const GOT = /\b(?:got|gets|get|getting|achiev(?:e|es|ed|ing)|reach(?:es|ed)?)\s+(?:a\s+|an\s+)?\d+\b(?!\s*(?:words?|%|sources?|pages?))/i;
const WORD_MARK = new RegExp(String.raw`\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+(?:out of|of)\s+(?:\d+|four|five|six|eight|ten|twelve)\b` + COUNTED_NOUN + String.raw`|\bout of (?:four|five|six|eight|ten|twelve)\b` + COUNTED_NOUN, "i");
const AT_TOP = /\b(?:full marks|top band|top of the (?:band|scale|range)|highest band|maximum mark|the maximum|top mark|bottom of the (?:band|scale|range)|lowest band)\b/i;
// Where in a level a mark sits: "at the top of the Satisfactory band", "the upper end of that level".
const POSITION = /\b(?:top|bottom|upper|lower|higher|highest|lowest|high|low)\s+(?:end|mark|boundary|edge|half|part|limit|reaches)\b|\b(?:top|bottom|upper|lower)\s+of\s+(?:the\s+|this\s+|that\s+|its\s+)?(?:[a-z]+\s+)?(?:band|level|range|scale)\b/i;
// A task marked as a whole shows its band already; any sentence about band, level or mark says more.
const HOLISTIC_MARK_WORDS = /\b(?:band|bands|level|levels|boundary|mark|marks|marked|marking|score|scored|scores|grade|graded)\b/i;
const SMALL_WORD = /\b(?:a|an)\s+(?:one|two|three|four|five|six|seven|eight|nine|ten)\b(?!-)/i;
const SMALL_NUMBER = /\b(?:10|[0-9])\b(?!\s*(?:,\d{3}|words?|%|per ?cent|pages?|sources?|objects?|prompts?|titles?|areas?|examples?|claims?|paragraphs?|sections?|minutes?|hours?|years?|knowers?|perspectives?))/i;

export type MarkTextOptions = { allow?: string; holistic?: boolean };

/**
 * The free preview's text without any sentence that states a mark. The model sometimes
 * wrote the mark into the explanation or a risk ("awarded 7", "would receive 0/25", "at
 * the top of the Satisfactory band"), and the preview quoted it next to the range that was
 * built not to give it away. `allow` is a mark the preview shows anyway (the weakest
 * criterion's own "3/6"). Paragraph breaks are kept.
 */
export function stripMarksDetailed(text: string, opts: MarkTextOptions = {}): { text: string; dropped: number } {
  if (typeof text !== "string" || !text) return { text, dropped: 0 };
  const parts = text.split(/((?<=[.!?])\s+)/);
  let out = "";
  let pendingBreak = "";
  let dropped = 0;
  for (let i = 0; i < parts.length; i += 2) {
    const sentence = parts[i];
    const sep = parts[i + 1] ?? "";
    if (!sentence) continue;
    if (statesMark(sentence, opts)) {
      dropped++;
      if (/\n\s*\n/.test(sep)) pendingBreak = "\n\n";
      continue;
    }
    if (out && pendingBreak && !/\n\s*$/.test(out)) out = out.replace(/\s+$/, "") + pendingBreak;
    pendingBreak = "";
    out += sentence + sep;
  }
  return { text: out.trim(), dropped };
}

export function stripMarks(text: string, opts: MarkTextOptions = {}): string {
  return stripMarksDetailed(text, opts).text;
}

export function statesMark(s: string, opts: MarkTextOptions = {}): boolean {
  let t = String(s || "");
  if (opts.allow) {
    // The whole token only: removing "1/2" as a substring cut "21/25" down to "2 5".
    const [sc, mx] = opts.allow.split("/").map((x) => x.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    t = t.replace(new RegExp(`(?<![\\d.])${sc}\\s*\\/\\s*${mx}(?!\\.?\\d)`, "g"), " ");
  }
  if (opts.holistic && (POSITION.test(t) || HOLISTIC_MARK_WORDS.test(t))) return true;
  if (POSITION.test(t)) return true;
  // With the criterion's own mark shown, "the top band descriptor asks for" gives nothing
  // away; it still does when it is about the total.
  const aboutTotal = /\b(?:total|overall)\b/i.test(t);
  if (RANGE_MARK.test(t) || WORD_MARK.test(t) || CRITERION_COLON.test(t) || TOTAL_IS.test(t) || CAPPED.test(t)) return true;
  if ((AT_TOP.test(t) || GOT.test(t)) && (!opts.allow || aboutTotal)) return true;
  t = t.replace(RANGE, " ");
  if (FRACTION.test(t) || COUNTED.test(t) || GIVEN.test(t) || N_OF_N.test(t)) return true;
  return !!opts.holistic && (SMALL_NUMBER.test(t) || SMALL_WORD.test(t));
}

export type ReconcileOptions = {
  essayType: string;
  subject: string;
  /** Whether the student pasted their reflections. Stored reports pass true, keeping any mark already given. */
  reflectionsPasted: boolean;
  session?: string | null;
};

/**
 * The totals, worked out from the criteria. The model writes the total separately from the
 * criterion marks, and the two did not always agree (16 out of 25 over marks adding up to
 * 11), while the report shows both. A task marked as a whole keeps its one mark and its
 * IB band. Criteria that cannot be judged from pasted text never carry a mark: an Extended
 * Essay's reflection without the reflections, the Music exercises, which are recordings
 * and scores, and an individual oral's language when the paste is an outline.
 */
export function reconcileScores(result: any, opts: ReconcileOptions) {
  const criteria: any[] = Array.isArray(result?.criteria) ? result.criteria : [];
  const oralOutline = opts.essayType === "IA" && opts.subject.startsWith("English A") && String(result?.paste_kind || "").toLowerCase() === "outline";
  for (const c of criteria) {
    const name = String(c?.name || "");
    const lower = name.toLowerCase();
    const reflectionMissing = opts.essayType === "EE" && !opts.reflectionsPasted && (lower.includes("reflection") || lower.includes("engagement"));
    const musicExercise = opts.essayType === "IA" && opts.subject === "Music" && /^criterion c[12]\b/i.test(name);
    const oralLanguage = oralOutline && /^criterion d\b/i.test(name);
    if (!(reflectionMissing || musicExercise || oralLanguage)) continue;
    if (c.score != null || !isNotAssessableFromText(c)) {
      c.score = null;
      c.comment = reflectionMissing
        ? opts.session === "may2027"
          ? "Not assessed: this criterion is marked on your reflective statement (RPF), which was not pasted. The IB awards zero for Criterion E if the RPF is blank, not submitted or written in a language other than that of the essay."
          : "Not assessed: this criterion is marked on your reflections (RPPF), which were not pasted. The IB awards zero for Criterion E if the RPPF is not submitted, is blank or is written in a language other than that of the essay."
        : musicExercise
          ? "Not assessed: this criterion is judged on the exercise itself, the score or recording, which text cannot carry."
          : "Not assessed: language is judged on the spoken oral, and an outline cannot show it.";
    }
  }
  if (criteria.length <= 1) return result;
  const marked = criteria.filter((c) => typeof c?.score === "number" && typeof c?.max === "number" && c.max > 0);
  if (!marked.length) return result;
  for (const c of marked) c.score = Math.max(0, Math.min(c.max, Math.round(c.score)));
  const total = marked.reduce((s, c) => s + c.score, 0);
  const max = marked.reduce((s, c) => s + c.max, 0);
  result.predicted_score = total;
  result.max_score = max;
  result.band_range = previewBand(result)?.band ?? bandCell(total, max);
  return result;
}
