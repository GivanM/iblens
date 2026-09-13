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
  const absent = /not (been )?(submitted|provided|included|attached|pasted)|not assessed|absence of|was not part of|were not part of|\bno (separate )?(rpf|rppf|reflective statement|reflection (and|&) progress form)|not appear to have been (submitted|provided|included|attached|pasted)|without (the |a |your )?(rpf|rppf|reflective statement)|(has|have) not been (submitted|provided|included)/.test(comment);
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
const RANGE_MARK = /\d+\s*[-–—]\s*\d+\s*(?:\/|out of|of)\s*\d+|\b\d+\s*[-–—]\s*\d+\s+(?:in|for|on)\s+criterion\b|\bthe\s+\d+\s*[-–—]\s*\d+\s+(?:band|level|range)\b/i;
const CRITERION_NUMBER = /\bcriterion\s+[a-g][12]?\s+\d+\b(?!\s*(?:words?|%))|^\s*[A-Z][A-Za-z ]{2,40}:\s*\d{1,2}\s*\.?\s*$|\bworth\s+\d+\s+of\s+the\s+\d+\b|\b(?:high|low|mid)\s+(?:teens|twenties|thirties)\b|\bmid-band\b/i;
const N_OF_N = new RegExp(String.raw`\b\d+(?:\.\d+)?\s+of\s+\d+\b` + COUNTED_NOUN, "i");
const TOTAL_IS = /\b(?:total|overall)\s+(?:mark\s+|score\s+)?(?:is\s+|of\s+|would be\s+|at\s+|comes to\s+)?(?:about\s+|around\s+|roughly\s+)?\d+(?![\d,]*\s*(?:words?|characters?|%|pages?))/i;
const CRITERION_COLON = /\bcriterion\s+[a-g][12]?\s*[:=]\s*\d+\b/i;
const CAPPED = /\b(?:scor(?:e|es|ing)|mark(?:s|ed)?)\s+(?:above|below|at|of|higher than|more than|lower than)\s+\d+\b|\bcapped at\s+\d+\b|\bcannot (?:score|get|go|be awarded) (?:above|higher than|more than|beyond)\s+\d+\b|\b(?:puts?|places?)\s+criterion\s+[a-g][12]?\s+at\s+\d+\b|\bis an?\s+\d+\b(?![\d,.]*\s*(?:-|words?|%|pages?|minutes?|°|degrees?))/i;
const GOT = /\b(?:got|gets|get|getting|achiev(?:e|es|ed|ing)|reach(?:es|ed)?)\s+(?:a\s+|an\s+)?\d+\b(?!\s*(?:words?|%|sources?|pages?))/i;
const WORD_MARK = new RegExp(String.raw`\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+(?:out of|of)\s+(?:\d+|four|five|six|eight|ten|twelve)\b` + COUNTED_NOUN + String.raw`|\bout of (?:four|five|six|eight|ten|twelve)\b` + COUNTED_NOUN, "i");
const AT_TOP = /\b(?:full marks|top band|top of the (?:band|scale|range)|highest band|maximum mark|the maximum (?:mark|marks|score|band|level)|at the maximum(?!\s+(?:of|point|value|height|speed))|top mark|bottom of the (?:band|scale|range)|lowest band)\b/i;
// Where in a level a mark sits: "at the top of the Satisfactory band", "the upper end of that level".
const POSITION = /\b(?:top|bottom|upper|lower|higher|highest|lowest|high|low)\s+(?:end|mark|boundary|edge|half|part|limit|reaches)\b|\b(?:top|bottom|upper|lower)\s+of\s+(?:the\s+|this\s+|that\s+|its\s+)?(?:[a-z]+\s+)?(?:band|level|range|scale)\b/i;
// A level named next to a nearness word says which half of the band the mark is in:
// "approaching Good", "between Good and Excellent", "satisfactory to approaching-good".
const LEVEL_NAME = String.raw`(?:excellent|good|satisfactory|basic|rudimentary)`;
const NEAR_LEVEL = new RegExp(String.raw`\b(?:approach\w*|toward\w*|between|closer|nearer|cusp|border\w*|edg\w*|short of|not quite|just|reach\w*|beyond|above|below|strong|solid|secure|high|low|upper|lower)\b[^.;:]{0,30}\b${LEVEL_NAME}\b|\b${LEVEL_NAME}\b[^.;:]{0,12}\bto\b[^.;:]{0,20}\b${LEVEL_NAME}\b|\b(?:great|greater|lesser|large|full|limited)\s+extent\b`, "i");
// A task marked as a whole shows its band already; any sentence about band, level or mark says more.
const HOLISTIC_MARK_WORDS = /\b(?:band|bands|level|levels|boundary|mark|marks|marked|marking|score|scored|scores|grade|graded)\b/i;
const SMALL_WORD = /\b(?:a|an)\s+(?:one|two|three|four|five|six|seven|eight|nine|ten)\b(?!-)/i;
const SMALL_NUMBER = /\b(?:10|[0-9])\b(?!\s*(?:,\d{3}|words?|%|per ?cent|pages?|sources?|objects?|prompts?|titles?|areas?|examples?|claims?|paragraphs?|sections?|minutes?|hours?|years?|knowers?|perspectives?))/i;

export type MarkTextOptions = { allow?: string; holistic?: boolean; ownMax?: number; ownLetter?: string };

/**
 * The free preview's text without any sentence that states a mark. The model sometimes
 * wrote the mark into the explanation or a risk ("awarded 7", "would receive 0/25", "at
 * the top of the Satisfactory band"), and the preview quoted it next to the range that was
 * built not to give it away. `allow` is a mark the preview shows anyway (the weakest
 * criterion's own "3/6"). Paragraph breaks are kept.
 */
export function stripMarksDetailed(text: string, opts: MarkTextOptions = {}): { text: string; dropped: number } {
  if (typeof text !== "string" || !text) return { text, dropped: 0 };
  // Sentences end at a full stop or a line break: a list with no full stops was one "sentence"
  // and went whole when a single line stated a mark.
  const parts = text.split(/((?<=[.!?])\s+|\n+)/);
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

// A rule the student must know, not their mark: "an essay not on a prescribed title receives
// no marks", "marking stops at the word limit". Kept only when it carries no number at all.
const RULE = /\b(?:no marks|receives? zero|awarded zero|marking stops|stops? reading|examiners? (?:do not|will not) read)\b/i;
// Numbers that measure the work rather than mark it: "4,000 words", "20%", "25 °C", "3 sources".
const COUNTED_NOUNS = String.raw`(?:words?|characters?|pages?|sources?|documents?|articles?|objects?|prompts?|titles?|areas?|examples?|quotations?|participants?|samples?|trials?|repeats?|measurements?|readings?|data points?|variables?|questions?|paragraphs?|sections?|commentaries|units?|concepts?|poems?|texts?|works?|studies|references?|footnotes?|figures?|tables?|graphs?|charts?|diagrams?|interviews?|responses?|people|students?|knowers?|perspectives?|ways?|parts?|objects?|criteria)`;
// "two areas of knowledge", "one of four key concepts", "one of the prescribed titles", "3 of 5 sources".
const COUNTED_WORDS = new RegExp(String.raw`\b(?:\d[\d,.]*|one|two|three|four|five|six|seven|eight|nine|ten)\s+(?:of\s+(?:the\s+|your\s+|its\s+)?(?:\d+\s+|one\s+|two\s+|three\s+|four\s+|five\s+|six\s+|seven\s+|eight\s+|nine\s+|ten\s+)?)?(?:(?!(?:because|and|but|or|so|as|since|while|for|to|the|a|an|is|are|was|were|be|been|marks?|points?|out|band|level|score[ds]?|awarded)\b)[a-z-]+\s+)?${COUNTED_NOUNS}\b`, "gi");
// Mathematics in a comment: "x = 1.2", "2x", "3^2".
const MATHS = /\b[a-z]\s*[=<>≤≥]\s*[-−]?\d[\d.,]*[a-z]?(?:\s*[+\-−×*^]\s*\d[\d.,]*[a-z]?)*|\b[a-z]\s*[+\-−×*^]\s*\d[\d.,]*|\b\d[\d.,]*[a-z]\b|\d\s*[\^×*+]\s*\d|\^\d/gi;
const SAFE_NUMBER = /\b\d[\d,.]*\s*(?:words?|characters?|%|per ?cent|pages?|minutes?|mins?|hours?|seconds?|days?|weeks?|months?|years?|°\s*[CF]?|degrees?|cm|mm|km|kg|mg|ml|mol|hz|kpa|sources?|documents?|articles?|objects?|prompts?|titles?|areas?|examples?|quotations?|participants?|samples?|trials?|repeats?|measurements?|readings?|data points?|variables?|questions?|paragraphs?|sections?|commentaries|units?|concepts?|poems?|texts?|works?|studies|references?|footnotes?|figures?|tables?|graphs?|charts?|diagrams?|interviews?|responses?|people|students?|decimal places?|significant figures?|s\.f\.|d\.p\.)(?![A-Za-z])/gi;
// Number words, including compounds up to forty-five, turned into numbers so they are judged like digits.
const UNITS: Record<string, number> = { zero: 0, nil: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19 };
const TENS: Record<string, number> = { twenty: 20, thirty: 30, forty: 40 };
const NUMBER_WORDS_ANY = /\b(?:(twenty|thirty|forty)(?:[-\s](one|two|three|four|five|six|seven|eight|nine))?|(zero|nil|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen))\b/gi;
// "One" that is not a number: "no one", "one of the", "one another", "this one".
const NOT_A_NUMBER = /\b(?:no|each|this|that|the|any|every|which|someone|anyone)\s+one\b|\bone\s+(?:another|of\b)|\bone-(?=[a-z])/gi;
function numberWordsToDigits(text: string): string {
  return text.replace(NOT_A_NUMBER, " ").replace(NUMBER_WORDS_ANY, (_m, tens, unit, single) => {
    if (tens) return String(TENS[tens.toLowerCase()] + (unit ? UNITS[unit.toLowerCase()] : 0));
    return String(UNITS[String(single).toLowerCase()]);
  });
}
// Symbols with numbers in them, prices and rates are not marks: "AD1 to AD2", "BC547", "€90,000", "15 per group", "173 lux".
const ALNUM = /\b[A-Za-zκαβγδλμ]+[-+]?\d+[A-Za-z0-9]*\b/g;
const CURRENCY = /[€$£¥₹]\s?\d[\d,.]*\s*(?:[kKmMbB]n?|million|billion)?/g;
const PER_UNIT = /\b\d[\d,.]*\s*(?:per\s+\w+|lux|lm|nm|µm|rpm|ppm|ppb|mA|mV|kV|kW|kJ|MJ|Pa|kPa|atm|bar|mmHg|dB|Hz|K|V|A|W|J|N|g|s|ms|min|h|L|mL|dm3|cm3|M|mM|customers?|respondents?|pupils?|children|adults?|subjects?|patients?|plants?|seeds?|pots?|leaves|households?|firms?|countries|cases?)\b/g;
// List numbering, labels and measured values are not marks: "(2)", "Figure 1", "Section 5", "1.18".
const ENUMERATION = /(?:^|\s)\(?\d{1,2}[.)](?=\s)|\(\d{1,2}\)/g;
const LABEL_NUMBER = /\b(?:figure|fig\.|table|section|appendix|source|document|step|stage|part|question|paragraph|page|line|equation|chapter|graph|diagram|object|trial|sample|group|experiment|version|model|method|level\s+of\s+significance)\s*\d+[a-z]?\b/gi;
const DECIMAL = /[-−~≈]?\b\d+\.\d+\b/g;
// A number word as a mark: "one mark", "two marks", "a score of two", "full marks".
const NUMBER_WORD_MARK = /\b(?:zero|nil|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|full|maximum|minimum)\s+(?:\w+\s+)?(?:marks?|points?|out of|band|level)\b|\b(?:score|mark|awarded|band|level)\s+(?:of\s+)?(?:a\s+|an\s+)?(?:zero|nil|one|two|three|four|five|six|seven|eight|nine|ten)\b|\bfull marks\b|\b(?:high|low|mid)\s+(?:teens|twenties|thirties)\b/i;
const YEAR = /\b(?:1[89]|20)\d{2}\b/g;
const NUMBER_WORD = /\b(?:zero|nil|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|full marks|maximum|minimum|teens|twenties|thirties)\b/i;
const NO_MARKS = /\b(?:no|zero|unearned|full|all)\s+(?:\w+\s+)?marks?\b|\bmarks?\s+(?:on|in|for)\s+any\b/i;

/**
 * Whether a sentence of the free preview could state or narrow a mark. Pattern lists kept
 * missing new wordings, so the preview is now held to a blunter rule: no number is left once
 * measurements of the work and years are set aside; in text about a task marked as a whole,
 * no level, band or mark vocabulary and no nearness to a level; in the weakest criterion's
 * comment, only its own shown mark.
 */
export function statesMark(s: string, opts: MarkTextOptions = {}): boolean {
  let t = String(s || "");
  if (opts.allow) {
    // The whole token only: removing "1/2" as a substring cut "21/25" down to "2 5".
    const [sc, mx] = opts.allow.split("/").map((x) => x.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    t = t.replace(new RegExp(`(?<![\\d.])${sc}\\s*\\/\\s*${mx}(?!\\.?\\d)`, "g"), " ");
  }
  // Counted things first ("two sources"), then any number word left is judged as a number.
  let measured = numberWordsToDigits(t.replace(COUNTED_WORDS, " "))
    .replace(CURRENCY, " ")
    .replace(ALNUM, " ")
    .replace(ENUMERATION, " ")
    .replace(LABEL_NUMBER, " ")
    .replace(DECIMAL, " ")
    .replace(COUNTED_WORDS, " ")
    .replace(SAFE_NUMBER, " ")
    .replace(YEAR, " ")
    .replace(MATHS, " ")
    .replace(PER_UNIT, " ")
    // No IB mark or total goes above 45: larger numbers measure something else.
    .replace(/\b\d{1,3}(?:,\d{3})+\b|\b\d+\b/g, (m) => (Number(m.replace(/,/g, "")) > 45 ? " " : m));
  const aboutOthers = /\b(?:total|overall)\b/i.test(t) || (opts.ownLetter ? new RegExp(String.raw`\bcriteri(?:on|a)\s+(?![${opts.ownLetter}]\b)[a-g][12]?\b`, "i").test(t) : /\bcriteri(?:on|a)\s+[a-g]\b/i.test(t));
  // Beside its own shown mark, the weakest criterion's comment may speak of that criterion's
  // scale ("a score of 1", "for 5-6 marks", "to reach 3/3"): it says nothing about the total.
  if (opts.allow && opts.ownMax && !aboutOthers) {
    measured = measured.replace(/\b\d+\s*(?:[-–—\/]\s*\d+)?\b/g, (m) => (m.match(/\d+/g) || []).every((n) => Number(n) <= opts.ownMax!) ? " " : m);
  }
  if (/\d/.test(measured)) return true;
  if (RULE.test(t) && !POSITION.test(t) && !NEAR_LEVEL.test(t) && !NUMBER_WORD_MARK.test(t)) return false;
  // "full marks" in the weakest criterion's own comment is about that criterion's scale.
  if (!(opts.allow && !aboutOthers) && (NO_MARKS.test(t) || NUMBER_WORD_MARK.test(measured))) return true;
  if (POSITION.test(t)) return true;
  if (opts.holistic) return HOLISTIC_MARK_WORDS.test(t) || NEAR_LEVEL.test(t);
  if (opts.allow) return AT_TOP.test(t) && aboutOthers;
  return AT_TOP.test(t);
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

export function isRiskAboutMissingReflection(r: any): boolean {
  const text = `${r?.title || ""} ${r?.description || ""}`.toLowerCase();
  if (!/\brpf\b|\brppf\b|reflect/.test(text)) return false;
  return /missing|not submitted|absence|no reflection|without a reflect|automatic 0|automatic zero/.test(text);
}

export function softTruncate(text: string, limit: number): string {
  if (typeof text !== "string" || text.length <= limit) return text;
  const window = text.slice(0, limit);
  const lastStop = Math.max(window.lastIndexOf(". "), window.lastIndexOf("! "), window.lastIndexOf("? "));
  if (lastStop > limit * 0.5) return window.slice(0, lastStop + 1);
  return window.replace(/\s+\S*$/, "") + "\u2026";
}

export function computeTeaser(result: any) {
  const criteria: any[] = Array.isArray(result?.criteria) ? result.criteria : [];
  let weakest: any = pickWeakest(criteria).weakest;
  const cell = previewBand(result);
  const holistic = criteria.length === 1;
  let commentTrimmed = false;
  // Nothing in the preview's text may state a mark: only the weakest criterion's own mark,
  // when it is shown, stays.
  if (weakest && typeof weakest.comment === "string") {
    const allow = !holistic && typeof weakest.score === "number" ? `${weakest.score}/${weakest.max}` : undefined;
    const ownLetter = String(weakest.name || "").match(/criterion\s+([a-g])/i)?.[1];
    const cleaned = stripMarksDetailed(weakest.comment, { allow, holistic, ownMax: allow ? Number(weakest.max) : undefined, ownLetter });
    commentTrimmed = cleaned.dropped > 0;
    weakest = { ...weakest, comment: cleaned.text || "The full explanation is in the report." };
  }
  // Holistic instruments have a single criterion whose comment IS the whole verdict:
  // truncate it in the teaser so the full reasoning stays behind the unlock.
  if (weakest && holistic && typeof weakest.comment === "string" && weakest.comment.length > 320) {
    weakest = { ...weakest, comment: softTruncate(weakest.comment, 320) };
  }
  // With a single holistic criterion its score is the exact mark, which the free
  // preview does not include. The band stays visible.
  if (weakest && criteria.length === 1) {
    weakest = { ...weakest, score: null };
  }
  if (cell?.hideWeakest) weakest = null;
  // A report marked on criteria shows the cell of the scale its total falls in, never a
  // range the model centred on the total, which gave the paid mark away. A task marked as
  // a whole keeps its IB band. Whether the total sits near a band edge is not shown: it
  // would say where in the band the mark is.
  const bandRange = cell
    ? cell.band
    : typeof result?.band_range === "string"
      ? (result.band_range.match(/\d+\s*[-\u2013\u2014]\s*\d+|\d+/)?.[0] ?? result.band_range).trim()
      : result?.band_range ?? null;
  const risks = (Array.isArray(result?.risks) ? result.risks : [])
    .filter((r: any) => !isRiskAboutMissingReflection(r))
    .filter((r: any) => !statesMark(typeof r === "string" ? r : String(r?.title || ""), { holistic }))
    // A preview that names no criterion lists no risks either: with so few totals possible,
    // naming the weak parts of the draft would narrow it to the mark.
    .filter(() => !cell?.hideWeakest)
    .map((r: any) => ({
    title: typeof r === "string" ? r : r?.title || "",
    description: typeof r === "string" ? "" : softTruncate(stripMarks(String(r?.description || ""), { holistic }), 280),
    hadDescription: typeof r !== "string" && !!String(r?.description || "").trim(),
  }))
    // A risk whose whole explanation stated marks is left out rather than shown as a bare title.
    .filter((r: any) => !r.hadDescription || r.description)
    .slice(0, 3)
    .map(({ hadDescription, ...r }: any) => r);
  return {
    locked: true as const,
    band_range: bandRange,
    max_score: result?.max_score ?? null,
    weakest_criterion: weakest,
    weakest_comment_trimmed: !!weakest && commentTrimmed,
    risks,
    // Unassessed criteria (null score) are not sold as locked marks in the full report.
    criteria_names: criteria.map((c) => ({ name: c?.name, max: c?.max, assessed: typeof c?.score === "number" })),
    criteria_count: criteria.length,
    _rubricAvailable: result?._rubricAvailable,
    _rubricLabel: result?._rubricLabel,
    _rubricTotalMarks: result?._rubricTotalMarks,
    _wordCheck: result?._wordCheck ?? null,
  };
}

/**
 * The free preview of a report marked on criteria or as a whole. Once shown, a preview is kept
 * with the report and served as it was: a later change to how previews are built used to show
 * the same student a second range, and the two together narrowed the mark.
 */
export function buildTeaser(result: any) {
  const frozen = result?._preview;
  if (frozen && typeof frozen === "object" && frozen.locked === true) {
    return { ...frozen, _wordCheck: result?._wordCheck ?? frozen._wordCheck ?? null };
  }
  return computeTeaser(result);
}
