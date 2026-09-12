/**
 * Crawler bodies, rendered from the React pages themselves.
 *
 * Crawlers used to get a hand-kept HTML copy of each page, injected into
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

// Pages that are not resource articles and use no data hooks.
const STATIC_PAGES = [
  ["resources/ResourcesIndex.tsx", "/resources"],
  ["Privacy.tsx", "/privacy"],
  ["Terms.tsx", "/terms"],
  ["RefundPolicy.tsx", "/refund-policy"],
  ["UniversityStrategy.tsx", "/university"],
];

// Pages that call tRPC or read browser state while rendering. They are rendered
// with the same providers as the app and a stub browser: no request is made
// during a server render, so each page shows its signed-out, first-visit state,
// which is what a crawler is.
const DYNAMIC_PAGES = [
  ["Home.tsx", "/"],
  ["Pricing.tsx", "/pricing"],
  ["EssayAnalyzer.tsx", "/essay"],
  ["UcasPersonalStatement.tsx", "/ucas-personal-statement"],
  ["RemarkChecker.tsx", "/remark"],
  ["LandingPage.tsx", "/grade"],
];

const pages = [];
for (const [rel, canonical] of STATIC_PAGES) {
  const file = path.join(pagesDir, rel);
  if (!fs.existsSync(file)) throw new Error(`${rel} is listed as a static page but does not exist`);
  pages.push({ file, canonical, dynamic: false });
}
for (const [rel, canonical] of DYNAMIC_PAGES) {
  const file = path.join(pagesDir, rel);
  if (!fs.existsSync(file)) throw new Error(`${rel} is listed as a dynamic page but does not exist`);
  pages.push({ file, canonical, dynamic: true });
}
// Subject pages: every config under pages/essay renders SubjectEssayPage.
for (const file of walk(path.join(pagesDir, "essay"))) {
  if (path.basename(file) === "SubjectEssayPage.tsx") continue;
  const src = fs.readFileSync(file, "utf8");
  const canonical = src.match(/canonicalPath:\s*"([^"]+)"/)?.[1];
  if (!canonical) throw new Error(`${path.relative(root, file)} has no canonicalPath`);
  pages.push({ file, canonical, dynamic: false });
}
for (const file of walk(pagesDir)) {
  const src = fs.readFileSync(file, "utf8");
  if (!src.includes("<ResourceArticle")) continue;
  const canonical = src.match(/canonical="([^"]+)"/)?.[1];
  if (!canonical) throw new Error(`${path.relative(root, file)} renders ResourceArticle without a canonical`);
  pages.push({ file, canonical, dynamic: false });
}
const routes = new Set();
for (const p of pages) {
  if (routes.has(p.canonical)) throw new Error(`Two pages claim ${p.canonical}`);
  routes.add(p.canonical);
}

const entry = `
import { renderToStaticMarkup } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { trpc } from "@/lib/trpc";
${pages.map((p, i) => `import P${i} from ${JSON.stringify(p.file)};`).join("\n")}
const pages = [${pages.map((p, i) => `[${JSON.stringify(p.canonical)}, P${i}, ${p.dynamic}]`).join(", ")}];
export function renderAll(setRoute) {
  const out = {};
  for (const [route, Page, dynamic] of pages) {
    setRoute(route);
    let tree = (
      <Router ssrPath={route}>
        <Page />
      </Router>
    );
    let queryClient = null;
    if (dynamic) {
      queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false, gcTime: Infinity }, mutations: { gcTime: Infinity } },
      });
      const client = trpc.createClient({ links: [httpBatchLink({ url: "https://iblens.com/api/trpc", transformer: superjson })] });
      tree = (
        <trpc.Provider client={client} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>{tree}</QueryClientProvider>
        </trpc.Provider>
      );
    }
    out[route] = renderToStaticMarkup(<HelmetProvider context={{}}>{tree}</HelmetProvider>);
    if (queryClient) queryClient.clear();
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

// The stub browser a first-time, signed-out visitor would bring: no storage, no
// query string, no data layer. Pages that read it while rendering get those values.
const memory = new Map();
const storage = {
  getItem: (k) => (memory.has(k) ? memory.get(k) : null),
  setItem: (k, v) => void memory.set(k, String(v)),
  removeItem: (k) => void memory.delete(k),
  clear: () => memory.clear(),
  key: () => null,
  get length() { return memory.size; },
};
const location = { pathname: "/", search: "", hash: "", origin: "https://iblens.com", host: "iblens.com", hostname: "iblens.com", protocol: "https:", href: "https://iblens.com/" };
globalThis.window = globalThis;
globalThis.localStorage = storage;
globalThis.sessionStorage = storage;
globalThis.location = location;
globalThis.dataLayer = [];
const setRoute = (route) => {
  memory.clear();
  location.pathname = route;
  location.search = "";
  location.href = `https://iblens.com${route}`;
};

try {
  const { renderAll } = await import(pathToFileURL(bundleFile).href + `?t=${Date.now()}`);
  const bodies = renderAll(setRoute);
  for (const [route, html] of Object.entries(bodies)) {
    if (html.length < 800) throw new Error(`${route} rendered only ${html.length} characters`);
  }
  fs.writeFileSync(outFile, JSON.stringify(bodies));
  console.log(`✅ Rendered ${Object.keys(bodies).length} page bodies for crawlers → dist/crawler-bodies.json`);
} finally {
  fs.rmSync(bundleFile, { force: true });
}
// Libraries loaded for the dynamic pages can leave timers behind; the bodies are written.
process.exit(0);
