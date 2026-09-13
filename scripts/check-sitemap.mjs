/**
 * Keep the sitemap honest about dates and indexing.
 *
 * A page that sets dateModified is the source of truth for its <lastmod>: the two were
 * edited by hand and drifted apart. A route marked noindex must not be listed at all.
 * Run with --write to bring every lastmod in line; without it the build stops on a mismatch.
 */
import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const write = process.argv.includes("--write");
const sitemapPath = path.resolve(__dirname, "../client/public/sitemap.xml");

const routeMeta = await (async () => {
  const result = await esbuild.build({
    entryPoints: [path.resolve(__dirname, "../server/seo-prerender.ts")],
    bundle: true, format: "esm", platform: "node", write: false, logLevel: "silent",
    external: ["express", "fs", "path", "url"],
  });
  const mod = await import("data:text/javascript;base64," + Buffer.from(result.outputFiles[0].text).toString("base64"));
  return mod.routeMeta;
})();

function walkTsx(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkTsx(full, out);
    else if (entry.name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

const modified = new Map();
for (const file of walkTsx(path.resolve(__dirname, "../client/src/pages"))) {
  const src = fs.readFileSync(file, "utf8");
  const canonical = src.match(/canonical(?:Path)?[=:]\s*"([^"]+)"/)?.[1];
  const date = src.match(/dateModified[=:]\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
  if (canonical && date) modified.set(canonical, date);
}

let sitemap = fs.readFileSync(sitemapPath, "utf8");
const problems = [];
let fixed = 0;
sitemap = sitemap.replace(/<loc>https:\/\/iblens\.com([^<]*)<\/loc><lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/g, (whole, route, lastmod) => {
  const key = route || "/";
  if (routeMeta[key]?.noindex) problems.push(`${key} is noindex but listed in the sitemap`);
  const date = modified.get(key);
  if (!date || date === lastmod) return whole;
  if (write) { fixed++; return whole.replace(`<lastmod>${lastmod}</lastmod>`, `<lastmod>${date}</lastmod>`); }
  problems.push(`${key}: sitemap lastmod ${lastmod}, page dateModified ${date}`);
  return whole;
});

if (write && fixed) fs.writeFileSync(sitemapPath, sitemap);
if (problems.length) {
  console.error("✗ Sitemap disagrees with the pages:\n  " + problems.join("\n  ") + "\n  Run: node scripts/check-sitemap.mjs --write");
  process.exit(1);
}
console.log(write ? `✓ Sitemap dates written from the pages (${fixed} changed)` : "✓ Sitemap dates match every page that sets dateModified");
