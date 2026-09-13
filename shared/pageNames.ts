/**
 * Page names as they appear in breadcrumbs, shared by the page itself and the markup the
 * server sends to search engines, so both trails read the same.
 */

/** The page's own name: the title before any " | IBLens" suffix or ": subtitle". */
export function shortTitle(title: string): string {
  return title.split(" | ")[0].split(": ")[0];
}

// Names that keep their capitals when a Title Case page title becomes a sentence-case heading.
const KEEP_CAPS = new Set(["IB", "IA", "IAs", "EE", "EEs", "TOK", "IBLens", "AI", "HL", "SL", "UCAS", "RPF", "RPPF", "OPCVL", "DP", "Extended", "Internal", "Assessment", "Biology", "Chemistry", "Physics", "Economics", "History", "Psychology", "English", "Maths", "Math", "Mathematics", "Business", "Management", "Computer", "Science", "Visual", "Arts", "Music", "Film", "Diploma"]);

export function sentenceCase(name: string): string {
  const words = name.split(" ");
  return words.map((w, i) => {
    const bare = w.replace(/[^A-Za-z]/g, "");
    if (i === 0 || KEEP_CAPS.has(bare) || (bare === "Essay" && words[i - 1] === "Extended") || /[A-Z].*[A-Z]/.test(w) || /\d/.test(w)) return w;
    return w.charAt(0).toLowerCase() + w.slice(1);
  }).join(" ");
}

/** The subject grader pages' names, as their configs set them. */
export const ESSAY_PAGE_NAMES: Record<string, string> = {
  "/essay/biology-ia": "Biology IA",
  "/essay/business-management-ia": "Business Management IA",
  "/essay/chemistry-ia": "Chemistry IA",
  "/essay/computer-science-ia": "Computer Science IA",
  "/essay/economics-ia": "Economics IA",
  "/essay/english-essay": "English A individual oral",
  "/essay/extended-essay": "Extended Essay",
  "/essay/history-ia": "History IA",
  "/essay/math-ia": "Mathematics IA",
  "/essay/maths-aa-ia": "Mathematics: Analysis and Approaches IA",
  "/essay/maths-ai-ia": "Mathematics: Applications and Interpretation IA",
  "/essay/physics-ia": "Physics IA",
  "/essay/psychology-ia": "Psychology IA",
  "/essay/tok-essay": "TOK essay",
  "/essay/tok-exhibition": "TOK exhibition",
};
