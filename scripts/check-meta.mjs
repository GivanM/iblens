/**
 * Refuse to build when a page's own metadata disagrees with the server table.
 *
 * This runs before anything is written to dist, because a check that runs last
 * leaves a half-built tree behind when it fails, and the next restart serves it.
 */
import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

const pagesDir = path.resolve(__dirname, "../client/src/pages");
const problems = [];

for (const file of walkTsx(path.resolve(pagesDir, "essay"))) {
  const src = fs.readFileSync(file, "utf8");
  const route = src.match(/canonicalPath:\s*"([^"]+)"/)?.[1];
  const desc = src.match(/metaDescription:\s*\n?\s*"((?:[^"\\]|\\.)*)"/)?.[1];
  const title = src.match(/metaTitle:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
  if (!route || !routeMeta[route]) continue;
  if (desc && routeMeta[route].description && desc.replace(/\\"/g, '"') !== routeMeta[route].description) {
    problems.push(`${route} (description)\n    server: ${routeMeta[route].description.slice(0, 90)}\n    client: ${desc.slice(0, 90)}`);
  }
  if (title && routeMeta[route].title && title.replace(/\\"/g, '"') !== routeMeta[route].title) {
    problems.push(`${route} (title)\n    server: ${routeMeta[route].title}\n    client: ${title}`);
  }
}

for (const file of walkTsx(pagesDir)) {
  if (file.includes(`${path.sep}essay${path.sep}`) || file.endsWith("HomeV2.tsx")) continue;
  const block = fs.readFileSync(file, "utf8").match(/<SEOHead[\s\S]{0,900}?\/>/)?.[0];
  if (!block) continue;
  const route = block.match(/canonical=\{?"([^"]+)"/)?.[1];
  if (!route || !routeMeta[route]) continue;
  const title = block.match(/title=\{?"((?:[^"\\]|\\.)*)"/)?.[1];
  const desc = block.match(/description=\{?"((?:[^"\\]|\\.)*)"/)?.[1];
  if (title && routeMeta[route].title && title.replace(/\\"/g, '"') !== routeMeta[route].title) {
    problems.push(`${route} (title)\n    server: ${routeMeta[route].title}\n    client: ${title}`);
  }
  if (desc && routeMeta[route].description && desc.replace(/\\"/g, '"') !== routeMeta[route].description) {
    problems.push(`${route} (description)\n    server: ${routeMeta[route].description.slice(0, 90)}\n    client: ${desc.slice(0, 90)}`);
  }
}

// Resource articles pass their metadata to ResourceArticle, which hands it to
// SEOHead. The block above never saw them, and 44 pages drifted from the table.
for (const file of walkTsx(pagesDir)) {
  const block = fs.readFileSync(file, "utf8").match(/<ResourceArticle\b[\s\S]{0,1500}?>/)?.[0];
  if (!block) continue;
  const route = block.match(/canonical=\{?"([^"]+)"/)?.[1];
  const rel = path.relative(pagesDir, file);
  if (!route) { problems.push(`${rel}: ResourceArticle without a canonical`); continue; }
  if (!routeMeta[route]) { problems.push(`${route}: rendered by ${rel} but missing from the server table`); continue; }
  const title = block.match(/\btitle=\{?"((?:[^"\\]|\\.)*)"/)?.[1];
  const desc = block.match(/\bdescription=\{?"((?:[^"\\]|\\.)*)"/)?.[1];
  if (title !== undefined && title.replace(/\\"/g, '"') !== routeMeta[route].title) {
    problems.push(`${route} (title)\n    server: ${routeMeta[route].title}\n    client: ${title}`);
  }
  if (desc !== undefined && desc.replace(/\\"/g, '"') !== routeMeta[route].description) {
    problems.push(`${route} (description)\n    server: ${routeMeta[route].description}\n    client: ${desc}`);
  }
}

if (problems.length > 0) {
  console.error("\n❌ Page metadata disagrees between the server table and the React page:\n");
  problems.forEach((p) => console.error("  " + p + "\n"));
  console.error("The reader and the crawler must be told the same thing. Nothing was built.\n");
  process.exit(1);
}
console.log(`✓ Page metadata agrees on every page that sets it (${Object.keys(routeMeta).length} routes)`);
