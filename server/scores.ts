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
  return /\brpf\b|\brppf\b|reflective (form|statement)|not (been )?(submitted|provided|included|attached)|no reflection|absence of (a )?reflect|not assessed/.test(comment);
}

/**
 * The band shown with a mark: a fixed cell of the scale, counted down from the top, that
 * contains the total. A band centred on the total, which is what the model tends to write,
 * gave the paid mark away in the free preview as the middle of the band.
 */
export function bandCell(total: number, max: number): string {
  const width = Math.max(3, Math.round(max / 6));
  const hi = Math.max(0, max - width * Math.floor((max - total) / width));
  const lo = Math.max(0, hi - width + 1);
  return `${lo}-${hi}`;
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
          : "Not assessed: this criterion is marked on your reflections (RPPF), which were not pasted."
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
  result.band_range = bandCell(total, max);
  return result;
}
