// The build no longer empties dist/public (that deleted pages under the running servers),
// so hashed assets from earlier builds accumulate. Remove the ones no current page or asset
// refers to, once they are old enough that no page still open in a browser needs them.
import fs from "fs";
import path from "path";

const pub = path.resolve(import.meta.dirname, "..", "dist", "public");
const assetsDir = path.join(pub, "assets");
if (!fs.existsSync(assetsDir)) process.exit(0);
const DAY = 24 * 60 * 60 * 1000;

const texts = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(html|js|css|json|xml|webmanifest)$/.test(e.name)) texts.push(fs.readFileSync(p, "utf8"));
  }
};
walk(pub);
const corpus = texts.join("\n");

let removed = 0;
for (const name of fs.readdirSync(assetsDir)) {
  const p = path.join(assetsDir, name);
  const age = Date.now() - fs.statSync(p).mtimeMs;
  if (age > 2 * DAY && !corpus.includes(name)) { fs.unlinkSync(p); removed++; }
}
console.log(`✓ Pruned ${removed} unreferenced asset(s) older than two days`);
