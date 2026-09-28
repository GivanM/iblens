/**
 * How close the estimate has been, measured.
 *
 * The site says "we have not measured it against examiner marks", which is honest and is the
 * single most expensive sentence on it: a coordinator, a tutor and a parent all stop there.
 * This runs a corpus of work whose real mark is known through the prompts the product actually
 * sends, and prints the error. It also runs a control: the same model with the rubric pasted in
 * and nothing else, which is what a reader can do for free in any chat window. If our error is
 * not better than the control's, the product is not the marking, and the page should say so.
 *
 * The corpus is a JSON array, one object per piece of work:
 *
 *   {
 *     "id": "econ-ia-01",
 *     "essayType": "IA",            // IA | EE | TOK | TOK Exhibition
 *     "subject": "Economics",
 *     "examSession": "nov2026",     // optional
 *     "researchQuestion": "...",    // optional
 *     "officialMark": 11,           // the mark the work actually received
 *     "maxMark": 14,
 *     "moderated": true,            // false for a teacher's mark that was never moderated
 *     "source": "where it came from, and on what terms",
 *     "textFile": "corpus/econ-ia-01.txt"
 *   }
 *
 * Nothing in the corpus is published. Only the aggregate error is.
 *
 *   node scripts/measure-accuracy.mjs corpus/index.json            # price it, run nothing
 *   node scripts/measure-accuracy.mjs corpus/index.json --yes      # spend the money
 *   node scripts/measure-accuracy.mjs corpus/index.json --yes --limit 5 --control
 *   node scripts/measure-accuracy.mjs --from corpus/results-2026-10-04.json   # reprint, no spend
 */
import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const indexPath = args.find((a) => !a.startsWith("--"));
const go = args.includes("--yes");
const withControl = args.includes("--control");
const limit = Number((args.find((a) => a.startsWith("--limit")) || "").split("=")[1] || args[args.indexOf("--limit") + 1] || 0);

if (!indexPath && !args.includes("--from")) {
  console.error("Usage: node scripts/measure-accuracy.mjs <corpus/index.json> [--yes] [--limit N] [--control]");
  console.error("       node scripts/measure-accuracy.mjs --from <corpus/results-YYYY-MM-DD.json>");
  process.exit(1);
}

const fromPath = args.includes("--from") ? args[args.indexOf("--from") + 1] : null;
const corpusDir = path.dirname(path.resolve(fromPath || indexPath));
let works = fromPath ? [] : JSON.parse(fs.readFileSync(indexPath, "utf8"));
if (limit > 0) works = works.slice(0, limit);

for (const w of works) {
  const file = path.resolve(corpusDir, path.basename(w.textFile));
  if (!fs.existsSync(file)) {
    console.error(`Missing text for ${w.id}: ${file}`);
    process.exit(1);
  }
  w.text = fs.readFileSync(file, "utf8");
  if (typeof w.officialMark !== "number" || typeof w.maxMark !== "number") {
    console.error(`${w.id} has no known mark to measure against.`);
    process.exit(1);
  }
}

/** Opus 5 list price, the same tariff the product is billed at. */
let mod = null;
if (!fromPath) {
  const IN_PER_M = 5, OUT_PER_M = 25;
  const words = works.reduce((n, w) => n + w.text.split(/\s+/).length, 0);
  const runs = works.length * (withControl ? 2 : 1);
  const estIn = (words * 1.35 + works.length * 900) * (withControl ? 2 : 1);
  const estOut = runs * 4800;
  const estCost = (estIn * IN_PER_M + estOut * OUT_PER_M) / 1e6;

  console.log(`\n${works.length} pieces of work, ${words.toLocaleString()} words, ${runs} model runs.`);
  console.log(`Estimated cost: $${estCost.toFixed(2)} (${Math.round(estIn).toLocaleString()} in, ${estOut.toLocaleString()} out at $${IN_PER_M}/$${OUT_PER_M} per million).`);
  if (!go) {
    console.log(`\nNothing was run. Add --yes to spend it.`);
    console.log(`The production API key is shared: a long run here is what took the site down for three hours on 21 September. Use a key with its own limit.\n`);
    process.exit(0);
  }

  // The bundle is written next to the project's node_modules rather than imported as a data URL:
  // the externals it leaves behind are bare specifiers, and a data URL has nowhere to resolve them from.
  const bundlePath = path.resolve(__dirname, "../.measure-bundle.mjs");
  await esbuild.build({
    entryPoints: [path.resolve(__dirname, "./measure-entry.ts")],
    outfile: bundlePath,
    bundle: true, format: "esm", platform: "node", logLevel: "silent",
    external: ["express", "mysql2", "mysql2/promise", "drizzle-orm", "@trpc/server", "zod", "dotenv"],
  });
  mod = await import(bundlePath + "?t=" + Date.now());
  fs.rmSync(bundlePath, { force: true });

}
const { buildEssaySystemPrompt, buildEssayUserPrompt, invokeLLM, parseModelJson, buildRubricPromptFragment } = mod || {};
const rows = fromPath ? JSON.parse(fs.readFileSync(fromPath, "utf8")).rows : [];
for (const [i, w] of works.entries()) {
  process.stdout.write(`[${i + 1}/${works.length}] ${w.id} (${w.subject} ${w.essayType}) `);
  const run = async (system, user) => {
    const t = Date.now();
    const res = await invokeLLM({ messages: [{ role: "system", content: system }, { role: "user", content: user }] });
    const out = parseModelJson(res.choices?.[0]?.message?.content ?? "");
    return { score: Number(out?.predicted_score), max: Number(out?.max_score), seconds: (Date.now() - t) / 1000 };
  };

  let ours = null, control = null;
  try {
    ours = await run(
      buildEssaySystemPrompt(w.essayType, w.subject, w.examSession),
      buildEssayUserPrompt(w.essayType, w.subject, w.researchQuestion, w.text, w.examSession, w.reflections),
    );
    process.stdout.write(`ours ${ours.score}/${ours.max} vs real ${w.officialMark}/${w.maxMark} `);
  } catch (err) {
    process.stdout.write(`ours FAILED: ${String(err.message).slice(0, 80)} `);
  }

  if (withControl) {
    try {
      // What a reader can do for nothing: the published criteria pasted into a chat window.
      const fragment = buildRubricPromptFragment(w.essayType, w.subject, w.examSession) || "";
      control = await run(
        "You are an IB examiner. Mark the work against the criteria given and reply with JSON only: {\"predicted_score\": <number>, \"max_score\": <number>}.",
        `${fragment}\n\nMark this ${w.subject} ${w.essayType} out of ${w.maxMark} and reply with JSON only.\n\n${w.text}`,
      );
      process.stdout.write(`control ${control.score}/${control.max} `);
    } catch (err) {
      process.stdout.write(`control FAILED `);
    }
  }
  process.stdout.write("\n");
  rows.push({ ...w, text: undefined, ours, control });
}

const scale = (r, side) => {
  const s = r[side];
  if (!s || !Number.isFinite(s.score) || !s.max) return null;
  // A report that could not mark every criterion reports a smaller maximum, so compare shares.
  return (s.score / s.max) * r.maxMark;
};
const errors = (side) => rows.map((r) => { const v = scale(r, side); return v === null ? null : v - r.officialMark; }).filter((e) => e !== null);
const mae = (e) => (e.length ? e.reduce((a, b) => a + Math.abs(b), 0) / e.length : NaN);
const bias = (e) => (e.length ? e.reduce((a, b) => a + b, 0) / e.length : NaN);

const report = (side) => {
  const e = errors(side);
  if (!e.length) return `${side}: no usable runs`;
  const within = (n) => `${Math.round((100 * e.filter((x) => Math.abs(x) <= n).length) / e.length)}%`;
  return [
    `${side}: ${e.length} runs`,
    `  mean absolute error  ${mae(e).toFixed(2)} marks`,
    `  bias                 ${bias(e) >= 0 ? "+" : ""}${bias(e).toFixed(2)} marks (positive means we mark too generously)`,
    `  within 1 mark        ${within(1)}`,
    `  within 2 marks       ${within(2)}`,
    `  within 3 marks       ${within(3)}`,
  ].join("\n");
};

console.log(`\n${report("ours")}`);
if (withControl) console.log(`\n${report("control")}`);

const bySubject = new Map();
for (const r of rows) {
  const v = scale(r, "ours");
  if (v === null) continue;
  const key = `${r.subject} ${r.essayType}`;
  if (!bySubject.has(key)) bySubject.set(key, []);
  bySubject.get(key).push(Math.abs(v - r.officialMark));
}
if (bySubject.size) {
  console.log(`\nby subject`);
  for (const [k, v] of [...bySubject].sort()) {
    console.log(`  ${k.padEnd(34)} ${v.length} runs  MAE ${(v.reduce((a, b) => a + b, 0) / v.length).toFixed(2)}`);
  }
}

const unmoderated = rows.filter((r) => r.moderated === false).length;
if (unmoderated) console.log(`\n${unmoderated} of ${rows.length} marks were a teacher's and never moderated: say so on the page.`);

if (!fromPath) {
  const out = path.resolve(corpusDir, `results-${new Date().toISOString().slice(0, 10)}.json`);
  fs.writeFileSync(out, JSON.stringify({ measuredAt: new Date().toISOString(), rows }, null, 2));
  console.log(`\nWrote ${out}\n`);
}
