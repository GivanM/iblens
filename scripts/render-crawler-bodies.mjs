/**
 * Crawler bodies for the resource articles, rendered from the React pages themselves.
 *
 * Crawlers used to get a hand-kept HTML copy of each article, injected into
 * <div id="root"> by the server. The copies drifted from the pages people read:
 * in every review round a fix made in one copy was missing from the other. The
 * same components are now rendered at build time, so there is one text.
 */
import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesDir = path.join(root, "client/src/pages");
const outFile = path.join(root, "dist/crawler-bodies.json");
const bundleFile = path.join(root, "dist/.crawler-render.mjs");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

const pages = [];
for (const file of walk(pagesDir)) {
  const src = fs.readFileSync(file, "utf8");
  if (!src.includes("<ResourceArticle")) continue;
  const canonical = src.match(/canonical="([^"]+)"/)?.[1];
  if (!canonical) throw new Error(`${path.relative(root, file)} renders ResourceArticle without a canonical`);
  pages.push({ file, canonical });
}
const routes = new Set();
for (const p of pages) {
  if (routes.has(p.canonical)) throw new Error(`Two resource pages claim ${p.canonical}`);
  routes.add(p.canonical);
}

const entry = `
import { renderToStaticMarkup } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "wouter";
${pages.map((p, i) => `import P${i} from ${JSON.stringify(p.file)};`).join("\n")}
const pages = [${pages.map((p, i) => `[${JSON.stringify(p.canonical)}, P${i}]`).join(", ")}];
export function renderAll() {
  const out = {};
  for (const [route, Page] of pages) {
    out[route] = renderToStaticMarkup(
      <HelmetProvider context={{}}>
        <Router ssrPath={route}>
          <Page />
        </Router>
      </HelmetProvider>
    );
  }
  return out;
}
`;

await esbuild.build({
  stdin: { contents: entry, loader: "tsx", resolveDir: root, sourcefile: "crawler-entry.tsx" },
  bundle: true,
  platform: "node",
  format: "esm",
  jsx: "automatic",
  packages: "external",
  tsconfig: path.join(root, "tsconfig.json"),
  loader: { ".css": "empty", ".png": "empty", ".svg": "empty", ".jpg": "empty", ".webp": "empty" },
  outfile: bundleFile,
  logLevel: "warning",
});

try {
  const { renderAll } = await import(pathToFileURL(bundleFile).href + `?t=${Date.now()}`);
  const bodies = renderAll();
  for (const [route, html] of Object.entries(bodies)) {
    if (html.length < 1500) throw new Error(`${route} rendered only ${html.length} characters`);
  }
  fs.writeFileSync(outFile, JSON.stringify(bodies));
  console.log(`✅ Rendered ${Object.keys(bodies).length} resource article bodies for crawlers → dist/crawler-bodies.json`);
} finally {
  fs.rmSync(bundleFile, { force: true });
}
