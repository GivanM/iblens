/**
 * Post-build SEO Pre-rendering Script
 * 
 * Generates per-route index.html files in the dist/public directory
 * with route-specific <title>, <meta name="description">, og:*, twitter:*, 
 * and canonical tags baked in at build time.
 * 
 * This is necessary because the Manus platform CDN:
 * 1. Replaces <title> with VITE_APP_TITLE
 * 2. Strips <meta name="description">
 * 3. Strips og:* and twitter:* tags from server responses
 * 4. Appends its own og/twitter tags from project metadata
 * 
 * By generating separate HTML files per route (e.g., dist/public/university/index.html),
 * the CDN serves these directly. Even if the CDN still modifies tags, having the
 * correct tags in the static file gives us the best chance of them surviving.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "../dist/public");

const SITE_URL = "https://iblens.com";
const SITE_NAME = "IBLens";
const DEFAULT_OG_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456034410/fPpXrWUtmpLttw7Fz9wKLE/og-image-CS5C2Vq6Jk92bXNFNMwCXg.png";

const routeMeta = {
  "/": {
    title: "IBLens — AI-Powered IB Essay Feedback & Score Prediction",
    description: "Upload your IB Extended Essay, Internal Assessment, or TOK essay and get criterion-by-criterion feedback with a predicted score in 60 seconds. First analysis free.",
    ogType: "website",
  },
  "/essay": {
    title: "IB Essay Analyzer — Get AI Feedback on Your IA, EE, or TOK Essay | IBLens",
    description: "Upload your IB essay and receive instant criterion-based feedback with a predicted score. Supports all IB subjects: Business Management, Economics, History, Sciences, and more.",
    ogType: "website",
  },
  "/university": {
    title: "IB University Strategy — AI Application Plan | IBLens",
    description: "Get personalized university recommendations based on your IB predicted grades, subject combination, and preferences. Covers UK, US, Canada, Europe, and Asia-Pacific.",
    ogType: "website",
  },
  "/pricing": {
    title: "Pricing — IB Essay Analysis from $4.99 | IBLens",
    description: "Affordable IB essay feedback: first analysis free, single essays from $4.99, packs of 5 for $19.99, packs of 10 for $34.99. 7-day money-back guarantee.",
    ogType: "website",
  },
  "/refund-policy": {
    title: "Refund Policy — 7-Day Money-Back Guarantee | IBLens",
    description: "IBLens offers a 7-day no-questions-asked money-back guarantee on all purchases. Email us within 7 days for a full refund.",
    ogType: "website",
  },
  "/resources": {
    title: "IB Resources — Guides for Extended Essay, IA, TOK & University Admissions | IBLens",
    description: "Free in-depth guides for IB Diploma students: Extended Essay structure, Internal Assessment criteria, TOK essay writing, grade boundaries, and university admissions strategies.",
    ogType: "website",
  },
  "/resources/ib-extended-essay-guide": {
    title: "IB Extended Essay Guide — Structure, Criteria & Tips for an A | IBLens",
    description: "Complete guide to the IB Extended Essay: structure, assessment criteria A–E, research question formulation, common mistakes, and strategies for scoring an A on your 4,000-word EE.",
    ogType: "article",
  },
  "/resources/ib-internal-assessment-guide": {
    title: "IB Internal Assessment Guide — Criteria, Tips & Subject-Specific Advice | IBLens",
    description: "Comprehensive guide to IB Internal Assessments: how IAs differ by subject, assessment criteria explained, examiner marking process, and strategies for top marks.",
    ogType: "article",
  },
  "/resources/tok-essay-guide": {
    title: "TOK Essay Guide — Prescribed Titles, Knowledge Claims & Assessment Criteria | IBLens",
    description: "Master the Theory of Knowledge essay: prescribed titles analysis, knowledge claims and counter-claims, areas of knowledge, assessment criteria, and common errors to avoid.",
    ogType: "article",
  },
  "/resources/ib-grade-boundaries": {
    title: "IB Grade Boundaries Explained — How Scores Work & What They Mean | IBLens",
    description: "Understand IB grade boundaries: how the 7-point scale works, how subject scores combine, bonus points from EE/TOK, and what different total scores mean for university admissions.",
    ogType: "article",
  },
  "/resources/ib-essay-criteria-explained": {
    title: "IB Essay Criteria Explained — How Examiners Mark Your Work | IBLens",
    description: "Deep dive into IB criterion-based marking: what distinguishes band 5 from band 7, how examiners apply criteria, and how to self-assess your work before submission.",
    ogType: "article",
  },
  "/resources/how-iblens-works": {
    title: "How IBLens Works — AI-Powered IB Essay Analysis",
    description: "How the IBLens AI analyzes IB essays against official criteria, predicts scores, and generates personalized feedback in under 60 seconds.",
    ogType: "article",
  },
  "/resources/ib-university-admissions": {
    title: "IB University Admissions — UK, US, EU Guide | IBLens",
    description: "How IB Diploma scores translate to university offers in the UK, US, EU and beyond. Typical IB requirements at top universities.",
    ogType: "article",
  },
  "/auth/signin": {
    title: "Sign In — IBLens",
    description: "Sign in to IBLens to access your IB essay analyses, purchase history, and personalized university strategies.",
    ogType: "website",
  },
};

function generateMetaTags(routePath, meta) {
  const fullUrl = `${SITE_URL}${routePath}`;
  const ogType = meta.ogType || "website";

  return `    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    <link rel="canonical" href="${fullUrl}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:image" content="${DEFAULT_OG_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`;
}

function processHtml(template, routePath, meta) {
  let html = template;

  // Strip existing SEO tags
  html = html.replace(/<title>[^<]*<\/title>/gi, "");
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/gi, "");
  html = html.replace(/<meta\s+name=["']description["'][^>]*>/gi, "");
  html = html.replace(/<meta\s+name=["']title["'][^>]*>/gi, "");
  html = html.replace(/<meta\s+property=["']og:[^"']*["'][^>]*>/gi, "");
  html = html.replace(/<meta\s+name=["']twitter:[^"']*["'][^>]*>/gi, "");

  // Inject per-route tags right after <head> opening and first meta tags
  // We place them early so they're the FIRST occurrence (some parsers use first, not last)
  const metaTags = generateMetaTags(routePath, meta);
  
  // Insert after the viewport meta tag (early in head)
  html = html.replace(
    /(<meta\s+name="viewport"[^>]*>)/i,
    `$1\n${metaTags}`
  );

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
      // Overwrite the root index.html
      fs.writeFileSync(templatePath, html, "utf-8");
      console.log(`  ✓ / → dist/public/index.html`);
    } else {
      // Create subdirectory with index.html
      const dirPath = path.join(DIST_DIR, routePath);
      fs.mkdirSync(dirPath, { recursive: true });
      const filePath = path.join(dirPath, "index.html");
      fs.writeFileSync(filePath, html, "utf-8");
      console.log(`  ✓ ${routePath} → dist/public${routePath}/index.html`);
    }
    count++;
  }

  console.log(`\n✅ Pre-rendered ${count} route HTML files with per-route SEO meta tags.`);
}

main().catch((err) => {
  console.error("Pre-render failed:", err);
  process.exit(1);
});
