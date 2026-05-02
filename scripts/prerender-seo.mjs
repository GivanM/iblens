/**
 * Post-build SEO Pre-rendering Script (Dual-Tag Strategy)
 * 
 * The Manus platform CDN intercepts HTML responses and replaces the FIRST
 * occurrence of <title>, <meta name="description">, <link rel="canonical">,
 * og:*, and twitter:* tags with homepage/VITE_APP_TITLE values.
 * 
 * However, it does NOT touch ADDITIONAL occurrences of these tags.
 * 
 * Strategy:
 * 1. Keep placeholder tags at normal positions (CDN will replace these — that's fine)
 * 2. Inject our REAL per-route tags right before </head> (CDN ignores these)
 * 3. Browsers and crawlers use the LAST occurrence of duplicate meta tags,
 *    so our real tags win.
 * 
 * Evidence: On the live site, a canonical tag appended before </head> survived
 * CDN processing while the first canonical was replaced with the homepage URL.
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
    title: "IBLens \u2014 AI-Powered IB Essay Feedback & Score Prediction",
    description: "Upload your IB Extended Essay, Internal Assessment, or TOK essay and get criterion-by-criterion feedback with a predicted score in 60 seconds. First analysis free.",
    ogType: "website",
  },
  "/essay": {
    title: "IB Essay Analyzer \u2014 Get AI Feedback on Your IA, EE, or TOK Essay | IBLens",
    description: "Upload your IB essay and receive instant criterion-based feedback with a predicted score. Supports all IB subjects: Business Management, Economics, History, Sciences, and more.",
    ogType: "website",
  },
  "/university": {
    title: "IB University Strategy \u2014 AI Application Plan | IBLens",
    description: "Get personalized university recommendations based on your IB predicted grades, subject combination, and preferences. Covers UK, US, Canada, Europe, and Asia-Pacific.",
    ogType: "website",
  },
  "/pricing": {
    title: "Pricing \u2014 IB Essay Analysis from $4.99 | IBLens",
    description: "Affordable IB essay feedback: first analysis free, single essays from $4.99, packs of 5 for $19.99, packs of 10 for $34.99. 7-day money-back guarantee.",
    ogType: "website",
  },
  "/refund-policy": {
    title: "Refund Policy \u2014 7-Day Money-Back Guarantee | IBLens",
    description: "IBLens offers a 7-day no-questions-asked money-back guarantee on all purchases. Email us within 7 days for a full refund.",
    ogType: "website",
  },
  "/resources": {
    title: "IB Resources \u2014 Guides for Extended Essay, IA, TOK & University Admissions | IBLens",
    description: "Free in-depth guides for IB Diploma students: Extended Essay structure, Internal Assessment criteria, TOK essay writing, grade boundaries, and university admissions strategies.",
    ogType: "website",
  },
  "/resources/ib-extended-essay-guide": {
    title: "IB Extended Essay Guide \u2014 Structure, Criteria & Tips for an A | IBLens",
    description: "Complete guide to the IB Extended Essay: structure, assessment criteria A\u2013E, research question formulation, common mistakes, and strategies for scoring an A on your 4,000-word EE.",
    ogType: "article",
  },
  "/resources/ib-internal-assessment-guide": {
    title: "IB Internal Assessment Guide \u2014 Criteria, Tips & Subject-Specific Advice | IBLens",
    description: "Comprehensive guide to IB Internal Assessments: how IAs differ by subject, assessment criteria explained, examiner marking process, and strategies for top marks.",
    ogType: "article",
  },
  "/resources/tok-essay-guide": {
    title: "TOK Essay Guide \u2014 Prescribed Titles, Knowledge Claims & Assessment Criteria | IBLens",
    description: "Master the Theory of Knowledge essay: prescribed titles analysis, knowledge claims and counter-claims, areas of knowledge, assessment criteria, and common errors to avoid.",
    ogType: "article",
  },
  "/resources/ib-grade-boundaries": {
    title: "IB Grade Boundaries Explained \u2014 How Scores Work & What They Mean | IBLens",
    description: "Understand IB grade boundaries: how the 7-point scale works, how subject scores combine, bonus points from EE/TOK, and what different total scores mean for university admissions.",
    ogType: "article",
  },
  "/resources/ib-essay-criteria-explained": {
    title: "IB Essay Criteria Explained \u2014 How Examiners Mark Your Work | IBLens",
    description: "Deep dive into IB criterion-based marking: what distinguishes band 5 from band 7, how examiners apply criteria, and how to self-assess your work before submission.",
    ogType: "article",
  },
  "/resources/how-iblens-works": {
    title: "How IBLens Works \u2014 AI-Powered IB Essay Analysis",
    description: "How the IBLens AI analyzes IB essays against official criteria, predicts scores, and generates personalized feedback in under 60 seconds.",
    ogType: "article",
  },
  "/resources/ib-university-admissions": {
    title: "IB University Admissions \u2014 UK, US, EU Guide | IBLens",
    description: "How IB Diploma scores translate to university offers in the UK, US, EU and beyond. Typical IB requirements at top universities.",
    ogType: "article",
  },
  "/auth/signin": {
    title: "Sign In \u2014 IBLens",
    description: "Sign in to IBLens to access your IB essay analyses, purchase history, and personalized university strategies.",
    ogType: "website",
  },
};

/**
 * Generate the real per-route meta tags block that goes right before </head>.
 * These are the tags that will survive CDN processing because the CDN only
 * replaces the FIRST occurrence of each tag type.
 */
function generateMetaTags(routePath, meta) {
  const fullUrl = `${SITE_URL}${routePath}`;
  const ogType = meta.ogType || "website";

  // Use data-seo="route" attribute to distinguish our tags from CDN-injected ones
  return `  <!-- Per-route SEO tags (placed last to override CDN-injected tags above) -->
  <title data-seo="route">${meta.title}</title>
  <meta data-seo="route" name="description" content="${meta.description}" />
  <link data-seo="route" rel="canonical" href="${fullUrl}" />
  <meta data-seo="route" property="og:title" content="${meta.title}" />
  <meta data-seo="route" property="og:description" content="${meta.description}" />
  <meta data-seo="route" property="og:url" content="${fullUrl}" />
  <meta data-seo="route" property="og:type" content="${ogType}" />
  <meta data-seo="route" property="og:site_name" content="${SITE_NAME}" />
  <meta data-seo="route" property="og:image" content="${DEFAULT_OG_IMAGE}" />
  <meta data-seo="route" property="og:image:width" content="1200" />
  <meta data-seo="route" property="og:image:height" content="630" />
  <meta data-seo="route" name="twitter:card" content="summary_large_image" />
  <meta data-seo="route" name="twitter:title" content="${meta.title}" />
  <meta data-seo="route" name="twitter:description" content="${meta.description}" />
  <meta data-seo="route" name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`;
}

function processHtml(template, routePath, meta) {
  let html = template;

  // DO NOT strip the existing tags from the template!
  // The CDN needs them as "sacrificial" targets to replace.
  // We only need to ensure the template has basic placeholder tags
  // that the CDN will find and replace with its homepage values.
  
  // Inject our REAL per-route tags right before </head>
  // These will be the LAST occurrence and will override the CDN-replaced ones
  const metaTags = generateMetaTags(routePath, meta);
  html = html.replace("</head>", `${metaTags}\n  </head>`);

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
      console.log(`  \u2713 / \u2192 dist/public/index.html`);
    } else {
      // Create subdirectory with index.html
      const dirPath = path.join(DIST_DIR, routePath);
      fs.mkdirSync(dirPath, { recursive: true });
      const filePath = path.join(dirPath, "index.html");
      fs.writeFileSync(filePath, html, "utf-8");
      console.log(`  \u2713 ${routePath} \u2192 dist/public${routePath}/index.html`);
    }
    count++;
  }

  console.log(`\n\u2705 Pre-rendered ${count} route HTML files with dual-tag SEO strategy.`);
}

main().catch((err) => {
  console.error("Pre-render failed:", err);
  process.exit(1);
});
