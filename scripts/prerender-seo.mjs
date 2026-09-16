/**
 * Post-build SEO Pre-rendering Script (JSON-LD Strategy)
 * 
 * The Manus platform CDN intercepts ALL HTML responses and replaces the content
 * of every <title>, <meta name="description">, <link rel="canonical">,
 * og:title/description/url, and twitter:title/description tag with homepage values.
 * This replacement is comprehensive — it targets ALL occurrences regardless of
 * position, attributes (data-seo, etc.), or count.
 * 
 * However, the CDN does NOT touch:
 * - <script type="application/ld+json"> (JSON-LD structured data)
 * - The CDN also appends a correct per-route canonical before </head>
 * 
 * Strategy:
 * 1. Add per-route JSON-LD WebPage/Article structured data with correct
 *    name, description, and url for each route
 * 2. Google reads JSON-LD and can use it to display correct title/description
 *    in search results, even when HTML meta tags show generic values
 * 3. Keep the existing meta tags as CDN targets (they won't work but don't hurt)
 */

import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "../dist/public");

/**
 * The React subject pages keep their own metaTitle/metaDescription, and
 * react-helmet-async writes them over whatever the server put in the HTML. When
 * the two disagree, the crawler and the reader are told different things, which
 * is how an abolished rubric survived on four pages for five rounds of review.
 * Fail the build instead.
 */
function walkTsx(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkTsx(full, out);
    else if (entry.name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

async function assertClientMetaMatches(routeMeta) {
  const pagesDir = path.resolve(__dirname, "../client/src/pages");
  if (!fs.existsSync(pagesDir)) return;
  const problems = [];

  // Subject pages carry their metadata in a config object.
  for (const file of walkTsx(path.resolve(pagesDir, "essay"))) {
    const src = fs.readFileSync(file, "utf8");
    const pathMatch = src.match(/canonicalPath:\s*"([^"]+)"/);
    const descMatch = src.match(/metaDescription:\s*\n?\s*"((?:[^"\\]|\\.)*)"/);
    const titleMatch = src.match(/metaTitle:\s*"((?:[^"\\]|\\.)*)"/);
    if (!pathMatch || !descMatch) continue;
    const route = pathMatch[1];
    const clientDesc = descMatch[1].replace(/\\"/g, '"');
    const serverDesc = routeMeta[route]?.description;
    if (serverDesc && serverDesc !== clientDesc) {
      problems.push(`${route} (description)\n    server: ${serverDesc.slice(0, 90)}\n    client: ${clientDesc.slice(0, 90)}`);
    }
    if (titleMatch && routeMeta[route]?.title) {
      const clientTitle = titleMatch[1].replace(/\\"/g, '"');
      if (clientTitle !== routeMeta[route].title) {
        problems.push(`${route} (title)\n    server: ${routeMeta[route].title}\n    client: ${clientTitle}`);
      }
    }
  }

  // Every other page passes them straight to SEOHead.
  for (const file of walkTsx(pagesDir)) {
    if (file.includes(`${path.sep}essay${path.sep}`)) continue;
    const src = fs.readFileSync(file, "utf8");
    const block = src.match(/<SEOHead[\s\S]{0,900}?\/>/);
    if (!block) continue;
    const canon = block[0].match(/canonical=\{?"([^"]+)"/);
    if (!canon) continue;
    const route = canon[1];
    const meta = routeMeta[route];
    if (!meta) continue;
    const title = block[0].match(/title=\{?"((?:[^"\\]|\\.)*)"/);
    const desc = block[0].match(/description=\{?"((?:[^"\\]|\\.)*)"/);
    if (title && meta.title && title[1].replace(/\\"/g, '"') !== meta.title) {
      problems.push(`${route} (title)\n    server: ${meta.title}\n    client: ${title[1]}`);
    }
    if (desc && meta.description && desc[1].replace(/\\"/g, '"') !== meta.description) {
      problems.push(`${route} (description)\n    server: ${meta.description.slice(0, 90)}\n    client: ${desc[1].slice(0, 90)}`);
    }
  }
  if (problems.length > 0) {
    console.error("\n❌ Page metadata disagrees between the server table and the React page:\n");
    problems.forEach((p) => console.error("  " + p + "\n"));
    console.error("Make them identical: the reader and the crawler must be told the same thing.\n");
    process.exit(1);
  }
  console.log("✓ Page metadata agrees between server and client on every page that sets it");
}

const SITE_URL = "https://iblens.com";
const SITE_NAME = "IBLens";
const DEFAULT_OG_IMAGE = "https://iblens.com/og-image.png";
// Article dates as each page sets them, written by render-crawler-bodies.mjs.
let ARTICLE_DATES = {};
try {
  ARTICLE_DATES = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../dist/crawler-meta.json"), "utf8"));
} catch {
  ARTICLE_DATES = {};
}

// The page metadata lives in one place: server/seo-prerender.ts, which the running
// server uses. This script used to keep a second copy, and the two drifted apart
// on seventeen routes, so the pages Google saw advertised things the site had
// stopped saying. Compile the real table and use it.
const routeMeta = await (async () => {
  const result = await esbuild.build({
    entryPoints: [path.resolve(__dirname, "../server/seo-prerender.ts")],
    bundle: true,
    format: "esm",
    platform: "node",
    write: false,
    logLevel: "silent",
    external: ["express", "fs", "path", "url"],
  });
  const code = result.outputFiles[0].text;
  const mod = await import("data:text/javascript;base64," + Buffer.from(code).toString("base64"));
  return mod.routeMeta;
})();

await assertClientMetaMatches(routeMeta);

/**
 * Generate per-route JSON-LD structured data.
 * The CDN does NOT touch <script type="application/ld+json"> content.
 * Google reads JSON-LD and uses it for search result display.
 */
function generateJsonLd(routePath, meta) {
  const fullUrl = `${SITE_URL}${routePath}`;
  const isArticle = meta.schemaType === "Article";
  
  const schema = {
    "@context": "https://schema.org",
    "@type": meta.schemaType,
    "name": meta.title,
    "headline": meta.title,
    "description": meta.description,
    "url": fullUrl,
    "isPartOf": {
      "@type": "WebSite",
      "name": SITE_NAME,
      "url": SITE_URL
    },
  };

  if (isArticle) {
    schema.author = {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL
    };
    schema.publisher = {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": DEFAULT_OG_IMAGE
      }
    };
    schema.image = DEFAULT_OG_IMAGE;
    const dates = ARTICLE_DATES[routePath] || {};
    if (dates.datePublished) schema.datePublished = dates.datePublished;
    if (dates.dateModified) schema.dateModified = dates.dateModified;
  }

  // BreadcrumbList for navigation context
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      }
    ]
  };

  if (routePath !== "/") {
    const segments = routePath.split("/").filter(Boolean);
    let currentPath = "";
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      breadcrumbs.itemListElement.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": index === segments.length - 1 ? meta.title.split(" \u2014 ")[0].split(" | ")[0] : segment.charAt(0).toUpperCase() + segment.slice(1),
        "item": `${SITE_URL}${currentPath}`
      });
    });
  }

  return `    <!-- Per-route SEO: JSON-LD (CDN does not modify script tags) -->
    <script type="application/ld+json">
${JSON.stringify(schema, null, 6)}
    </script>
    <script type="application/ld+json">
${JSON.stringify(breadcrumbs, null, 6)}
    </script>`;
}

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function processHtml(template, routePath, meta) {
  let html = template;

  // Replace <title> with per-route title (since we are NOT behind Manus CDN,
  // real <title> tags are served directly to Google and matter for ranking)
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}<\/title>`);

  // Build canonical URL
  const canonicalUrl = routePath === '/' ? SITE_URL + '/' : `${SITE_URL}${routePath}`;

  // Inject description, canonical, OG and Twitter tags right after </title>
  const seoInjection = [
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<link rel="canonical" href="${canonicalUrl}" />`,
    `<meta property="og:type" content="${meta.ogType}" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:url" content="${canonicalUrl}" />`,
    `<meta property="og:site_name" content="IBLens" />`,
    `<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`,
  ].join('\n    ');

  html = html.replace('<\/title>', `<\/title>\n    ${seoInjection}`);

  // Inject per-route JSON-LD right before </head>
  const jsonLd = generateJsonLd(routePath, meta);
  html = html.replace("</head>", `${jsonLd}\n  </head>`);

  return html;
}

async function main() {
  const templatePath = path.join(DIST_DIR, "index.html");
  
  if (!fs.existsSync(templatePath)) {
    console.error("ERROR: dist/public/index.html not found. Run 'vite build' first.");
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, "utf-8");
  let count = 0;

  for (const [routePath, meta] of Object.entries(routeMeta)) {
    const html = processHtml(template, routePath, meta);

    if (routePath === "/") {
      fs.writeFileSync(templatePath, html, "utf-8");
      console.log(`  \u2713 / \u2192 dist/public/index.html`);
    } else {
      const dirPath = path.join(DIST_DIR, routePath);
      fs.mkdirSync(dirPath, { recursive: true });
      const filePath = path.join(dirPath, "index.html");
      fs.writeFileSync(filePath, html, "utf-8");
      console.log(`  \u2713 ${routePath} \u2192 dist/public${routePath}/index.html`);
    }
    count++;
  }

  console.log(`\n\u2705 Pre-rendered ${count} route HTML files with per-route JSON-LD structured data.`);
}

main().catch((err) => {
  console.error("Pre-render failed:", err);
  process.exit(1);
});
