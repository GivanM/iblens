/**
 * Home page headline test: totals per version and whether the gap to the first version is
 * more than chance. Run on the server: `node --env-file=.env scripts/ab-report.mjs [days]`.
 */
import mysql from "mysql2/promise";

const days = Number(process.argv[2] || 3650);
const conn = await mysql.createConnection(process.env.DATABASE_URL);
const [rows] = await conn.query(
  "SELECT variant, event, SUM(n) AS n FROM ab_counts WHERE test = 'home_h1' AND day >= UTC_DATE() - INTERVAL ? DAY GROUP BY variant, event",
  [days],
);
await conn.end();

const HEADLINES = ["Paste your IA. See which criterion is costing you marks.", "Your IB draft, marked against the published criteria. Free preview in about a minute.", "Find the lost marks before your deadline does."];
const table = HEADLINES.map(() => ({ view: 0, cta: 0, submit: 0, checkout: 0 }));
for (const r of rows) if (table[r.variant]) table[r.variant][r.event] = Number(r.n);

// Two-sided test of two proportions; |z| above 1.96 is a gap chance explains less than 1 time in 20.
const z = (a, na, b, nb) => {
  if (!na || !nb) return null;
  const p = (a + b) / (na + nb);
  const se = Math.sqrt(p * (1 - p) * (1 / na + 1 / nb));
  return se ? (b / nb - a / na) / se : null;
};
const pct = (x, n) => (n ? `${((100 * x) / n).toFixed(1)}%` : "-");
console.log(`Last ${days} days`);
table.forEach((t, v) => {
  const base = table[0];
  const zc = v ? z(base.cta, base.view, t.cta, t.view) : null;
  const zs = v ? z(base.submit, base.view, t.submit, t.view) : null;
  console.log(`\n${v}: ${HEADLINES[v]}`);
  console.log(`   shown ${t.view}  button ${t.cta} (${pct(t.cta, t.view)})  submitted ${t.submit} (${pct(t.submit, t.view)})  checkout ${t.checkout} (${pct(t.checkout, t.view)})`);
  if (v) console.log(`   against 0: button z=${zc?.toFixed(2) ?? "-"}  submitted z=${zs?.toFixed(2) ?? "-"}${zc != null && Math.abs(zc) < 1.96 && (zs == null || Math.abs(zs) < 1.96) ? "  (no clear difference yet)" : ""}`);
});
