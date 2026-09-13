import { useState } from "react";

type Level = "HL" | "SL";
type Core = "A" | "B" | "C" | "D" | "E";

// Bonus points by EE grade (row) and TOK grade (column), A to D; an E in either fails.
const BONUS: Record<Exclude<Core, "E">, Record<Exclude<Core, "E">, number>> = {
  A: { A: 3, B: 3, C: 2, D: 2 },
  B: { A: 3, B: 2, C: 2, D: 1 },
  C: { A: 2, B: 2, C: 1, D: 0 },
  D: { A: 2, B: 1, C: 0, D: 0 },
};

const selectClass = "h-11 rounded-md border border-border bg-background px-2 text-base text-foreground";

/**
 * The page is called a score calculator, so it calculates: six subject grades and the
 * two core grades in, the total and the failing conditions that apply out. CAS and
 * academic integrity cannot be judged from grades and are named, not checked.
 */
export function DiplomaCalculator() {
  const [grades, setGrades] = useState<number[]>([6, 6, 6, 6, 6, 6]);
  const [levels, setLevels] = useState<Level[]>(["HL", "HL", "HL", "SL", "SL", "SL"]);
  const [ee, setEe] = useState<Core>("B");
  const [tok, setTok] = useState<Core>("B");

  const subjectPoints = grades.reduce((a, b) => a + b, 0);
  const coreFail = ee === "E" || tok === "E";
  const bonus = coreFail ? 0 : BONUS[ee as Exclude<Core, "E">][tok as Exclude<Core, "E">];
  const total = subjectPoints + bonus;

  const hl = grades.filter((_, i) => levels[i] === "HL").sort((a, b) => b - a);
  const sl = grades.filter((_, i) => levels[i] === "SL");
  const hlPoints = hl.slice(0, 3).reduce((a, b) => a + b, 0);
  const slPoints = sl.reduce((a, b) => a + b, 0);

  const levelNote = hl.length < 3 || hl.length > 4 ? "A Diploma is taken with three or four subjects at HL. Check the levels above." : null;
  const problems: string[] = [];
  if (total < 24) problems.push("Fewer than 24 points in total.");
  if (coreFail) problems.push("A grade E in the Extended Essay or TOK.");
  if (grades.includes(1)) problems.push("A grade 1 in a subject.");
  if (grades.filter((g) => g === 2).length >= 3) problems.push("Grade 2 three or more times.");
  if (grades.filter((g) => g <= 3).length >= 4) problems.push("Grade 3 or below four or more times.");
  if (hl.length >= 3 && hlPoints < 12) problems.push(`Fewer than 12 points at HL${hl.length === 4 ? " (your three highest HL grades count)" : ""}.`);
  if (sl.length === 3 && slPoints < 9) problems.push("Fewer than 9 points at SL.");
  if (sl.length === 2 && slPoints < 5) problems.push("Fewer than 5 points at SL, with two SL subjects.");

  return (
    <div className="not-prose my-8 rounded-xl border border-border bg-card p-5 sm:p-6">
      <p className="text-sm font-semibold text-foreground mb-4">Calculate your Diploma total</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {grades.map((g, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-20 text-sm text-muted-foreground">Subject {i + 1}</span>
            <select
              aria-label={`Subject ${i + 1} grade`}
              className={`${selectClass} w-20`}
              value={g}
              onChange={(e) => setGrades(grades.map((x, j) => (j === i ? Number(e.target.value) : x)))}
            >
              {[7, 6, 5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            <select
              aria-label={`Subject ${i + 1} level`}
              className={`${selectClass} w-20`}
              value={levels[i]}
              onChange={(e) => setLevels(levels.map((x, j) => (j === i ? (e.target.value as Level) : x)))}
            >
              <option value="HL">HL</option>
              <option value="SL">SL</option>
            </select>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Extended Essay
          <select className={`${selectClass} w-20`} value={ee} onChange={(e) => setEe(e.target.value as Core)}>
            {["A", "B", "C", "D", "E"].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          TOK
          <select className={`${selectClass} w-20`} value={tok} onChange={(e) => setTok(e.target.value as Core)}>
            {["A", "B", "C", "D", "E"].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
      </div>
      <div className="mt-5 rounded-lg bg-muted/50 p-4" aria-live="polite">
        <p className="text-foreground">
          <span className={`text-3xl font-bold ${problems.length ? "text-muted-foreground line-through decoration-2" : ""}`}>{total}</span>
          <span className="text-muted-foreground"> / 45</span>
          <span className="ml-3 text-sm text-muted-foreground">{subjectPoints} subject points + {bonus} bonus {bonus === 1 ? "point" : "points"}</span>
        </p>
        {levelNote && <p className="mt-2 text-sm text-amber-700">{levelNote}</p>}
        {problems.length === 0 ? (
          <p className="mt-2 text-sm text-emerald-700">No failing condition applies to these grades. CAS and academic integrity also have to be met, and cannot be checked from grades.</p>
        ) : (
          <ul className="mt-2 space-y-1 text-sm text-rose-700">
            <li className="font-medium">{total} points, but the Diploma is not awarded:</li>
            {problems.map((p) => <li key={p}>{p}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}
