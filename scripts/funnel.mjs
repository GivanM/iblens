/**
 * Print the paywall funnel. Four steps, daily totals, no visitor rows:
 *
 *   preview   a locked preview was delivered
 *   lock_cta  the unlock button under it was pressed
 *   checkout  a checkout was created
 *   paid      the order was paid
 *
 * The client's own analytics cannot answer this: the consent banner is shown to everyone and
 * ad and analytics storage stay denied until someone answers it, so the steps are counted on
 * the server. Run it with no argument for the last 14 days, or pass a number of days.
 *
 *   node scripts/funnel.mjs 30
 */
import mysql from "mysql2/promise";

const days = Number(process.argv[2] || 14);
const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const STEPS = ["preview", "lock_cta", "checkout", "paid"];
const conn = await mysql.createConnection(url);
const [rows] = await conn.execute(
  `SELECT day, variant, event, n FROM ab_counts
   WHERE test = 'funnel' AND day >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
   ORDER BY day`,
  [days],
);
await conn.end();

if (!rows.length) {
  console.log(`No funnel rows in the last ${days} days.`);
  process.exit(0);
}

const byDay = new Map();
const total = { desktop: {}, mobile: {}, all: {} };
for (const r of rows) {
  const device = Number(r.variant) === 1 ? "mobile" : "desktop";
  const day = String(r.day).slice(0, 10);
  if (!byDay.has(day)) byDay.set(day, {});
  const d = byDay.get(day);
  d[r.event] = (d[r.event] || 0) + Number(r.n);
  total[device][r.event] = (total[device][r.event] || 0) + Number(r.n);
  total.all[r.event] = (total.all[r.event] || 0) + Number(r.n);
}

const pad = (s, n) => String(s).padStart(n);
console.log(`\nLast ${days} days, by day\n`);
console.log(`day          ${STEPS.map((s) => pad(s, 9)).join("")}`);
for (const [day, d] of byDay) {
  console.log(`${day}   ${STEPS.map((s) => pad(d[s] || 0, 9)).join("")}`);
}

const ratio = (a, b) => (b ? `${((100 * a) / b).toFixed(1)}%` : "n/a");
for (const device of ["all", "desktop", "mobile"]) {
  const t = total[device];
  const p = t.preview || 0;
  console.log(`\n${device}: ${p} previews`);
  console.log(`  preview -> button   ${pad(t.lock_cta || 0, 5)}  ${ratio(t.lock_cta || 0, p)}`);
  console.log(`  button -> checkout  ${pad(t.checkout || 0, 5)}  ${ratio(t.checkout || 0, t.lock_cta || 0)}`);
  console.log(`  checkout -> paid    ${pad(t.paid || 0, 5)}  ${ratio(t.paid || 0, t.checkout || 0)}`);
  console.log(`  preview -> paid     ${pad(t.paid || 0, 5)}  ${ratio(t.paid || 0, p)}`);
}
console.log("");
