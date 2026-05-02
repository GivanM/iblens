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
    schemaType: "WebSite",
  },
  "/essay": {
    title: "IB Essay Analyzer \u2014 Get AI Feedback on Your IA, EE, or TOK Essay | IBLens",
    description: "Upload your IB essay and receive instant criterion-based feedback with a predicted score. Supports all IB subjects: Business Management, Economics, History, Sciences, and more.",
    ogType: "website",
    schemaType: "WebPage",
  },
  "/university": {
    title: "IB University Strategy \u2014 AI Application Plan | IBLens",
    description: "Get personalized university recommendations based on your IB predicted grades, subject combination, and preferences. Covers UK, US, Canada, Europe, and Asia-Pacific.",
    ogType: "website",
    schemaType: "WebPage",
  },
  "/pricing": {
    title: "Pricing \u2014 IB Essay Analysis from $4.99 | IBLens",
    description: "Affordable IB essay feedback: first analysis free, single essays from $4.99, packs of 5 for $19.99, packs of 10 for $34.99. 7-day money-back guarantee.",
    ogType: "website",
    schemaType: "WebPage",
  },
  "/refund-policy": {
    title: "Refund Policy \u2014 7-Day Money-Back Guarantee | IBLens",
    description: "IBLens offers a 7-day no-questions-asked money-back guarantee on all purchases. Email us within 7 days for a full refund.",
    ogType: "website",
    schemaType: "WebPage",
  },
  "/resources": {
    title: "IB Resources \u2014 Guides for Extended Essay, IA, TOK & University Admissions | IBLens",
    description: "Free in-depth guides for IB Diploma students: Extended Essay structure, Internal Assessment criteria, TOK essay writing, grade boundaries, and university admissions strategies.",
    ogType: "website",
    schemaType: "CollectionPage",
  },
  "/resources/ib-extended-essay-guide": {
    title: "IB Extended Essay Guide \u2014 Structure, Criteria & Tips for an A | IBLens",
    description: "Complete guide to the IB Extended Essay: structure, assessment criteria A\u2013E, research question formulation, common mistakes, and strategies for scoring an A on your 4,000-word EE.",
    ogType: "article",
    schemaType: "Article",
  },
  "/resources/ib-internal-assessment-guide": {
    title: "IB Internal Assessment Guide \u2014 Criteria, Tips & Subject-Specific Advice | IBLens",
    description: "Comprehensive guide to IB Internal Assessments: how IAs differ by subject, assessment criteria explained, examiner marking process, and strategies for top marks.",
    ogType: "article",
    schemaType: "Article",
  },
  "/resources/tok-essay-guide": {
    title: "TOK Essay Guide \u2014 Prescribed Titles, Knowledge Claims & Assessment Criteria | IBLens",
    description: "Master the Theory of Knowledge essay: prescribed titles analysis, knowledge claims and counter-claims, areas of knowledge, assessment criteria, and common errors to avoid.",
    ogType: "article",
    schemaType: "Article",
  },
  "/resources/ib-grade-boundaries": {
    title: "IB Grade Boundaries Explained \u2014 How Scores Work & What They Mean | IBLens",
    description: "Understand IB grade boundaries: how the 7-point scale works, how subject scores combine, bonus points from EE/TOK, and what different total scores mean for university admissions.",
    ogType: "article",
    schemaType: "Article",
  },
  "/resources/ib-essay-criteria-explained": {
    title: "IB Essay Criteria Explained \u2014 How Examiners Mark Your Work | IBLens",
    description: "Deep dive into IB criterion-based marking: what distinguishes band 5 from band 7, how examiners apply criteria, and how to self-assess your work before submission.",
    ogType: "article",
    schemaType: "Article",
  },
  "/resources/how-iblens-works": {
    title: "How IBLens Works \u2014 AI-Powered IB Essay Analysis",
    description: "How the IBLens AI analyzes IB essays against official criteria, predicts scores, and generates personalized feedback in under 60 seconds.",
    ogType: "article",
    schemaType: "Article",
  },
  "/resources/ib-university-admissions": {
    title: "IB University Admissions \u2014 UK, US, EU Guide | IBLens",
    description: "How IB Diploma scores translate to university offers in the UK, US, EU and beyond. Typical IB requirements at top universities.",
    ogType: "article",
    schemaType: "Article",
  },
  "/auth/signin": {
    title: "Sign In \u2014 IBLens",
    description: "Sign in to IBLens to access your IB essay analyses, purchase history, and personalized university strategies.",
    ogType: "website",
    schemaType: "WebPage",
  },
};

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
    schema.datePublished = "2026-04-15";
    schema.dateModified = "2026-05-02";
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

function processHtml(template, routePath, meta) {
  let html = template;

  // Inject per-route JSON-LD right before </head>
  // The CDN will NOT touch these script tags
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
