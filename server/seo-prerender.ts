// SEO Pre-rendering Middleware (Dual-Tag Strategy)
//
// The Manus platform CDN replaces the FIRST occurrence of title, description,
// canonical, og:, and twitter: tags with homepage/VITE_APP_TITLE values.
// But it does NOT touch ADDITIONAL occurrences.
//
// Strategy: keep placeholder tags at normal positions (CDN replaces these),
// inject our REAL per-route tags right before </head> (CDN ignores these).
// Browsers and crawlers use the LAST occurrence, so our tags win.

interface PageMeta {
  title: string;
  description: string;
  ogType?: string;
  canonical: string;
}

const SITE_URL = "https://iblens.com";
const SITE_NAME = "IBLens";
const DEFAULT_OG_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456034410/fPpXrWUtmpLttw7Fz9wKLE/og-image-CS5C2Vq6Jk92bXNFNMwCXg.png";

const routeMeta: Record<string, PageMeta> = {
  "/": {
    title: "IBLens \u2014 AI-Powered IB Essay Feedback & Score Prediction",
    description: "Upload your IB Extended Essay, Internal Assessment, or TOK essay and get criterion-by-criterion feedback with a predicted score in 60 seconds. First analysis free.",
    ogType: "website",
    canonical: "/",
  },
  "/essay": {
    title: "IB Essay Analyzer \u2014 Get AI Feedback on Your IA, EE, or TOK Essay | IBLens",
    description: "Upload your IB essay and receive instant criterion-based feedback with a predicted score. Supports all IB subjects: Business Management, Economics, History, Sciences, and more.",
    ogType: "website",
    canonical: "/essay",
  },
  "/university": {
    title: "IB University Strategy \u2014 AI Application Plan | IBLens",
    description: "Get personalized university recommendations based on your IB predicted grades, subject combination, and preferences. Covers UK, US, Canada, Europe, and Asia-Pacific.",
    ogType: "website",
    canonical: "/university",
  },
  "/pricing": {
    title: "Pricing \u2014 IB Essay Analysis from $4.99 | IBLens",
    description: "Affordable IB essay feedback: first analysis free, single essays from $4.99, packs of 5 for $19.99, packs of 10 for $34.99. 7-day money-back guarantee.",
    ogType: "website",
    canonical: "/pricing",
  },
  "/refund-policy": {
    title: "Refund Policy \u2014 7-Day Money-Back Guarantee | IBLens",
    description: "IBLens offers a 7-day no-questions-asked money-back guarantee on all purchases. Email us within 7 days for a full refund.",
    ogType: "website",
    canonical: "/refund-policy",
  },
  "/resources": {
    title: "IB Resources \u2014 Guides for Extended Essay, IA, TOK & University Admissions | IBLens",
    description: "Free in-depth guides for IB Diploma students: Extended Essay structure, Internal Assessment criteria, TOK essay writing, grade boundaries, and university admissions strategies.",
    ogType: "website",
    canonical: "/resources",
  },
  "/resources/ib-extended-essay-guide": {
    title: "IB Extended Essay Guide \u2014 Structure, Criteria & Tips for an A | IBLens",
    description: "Complete guide to the IB Extended Essay: structure, assessment criteria A-E, research question formulation, common mistakes, and strategies for scoring an A on your 4,000-word EE.",
    ogType: "article",
    canonical: "/resources/ib-extended-essay-guide",
  },
  "/resources/ib-internal-assessment-guide": {
    title: "IB Internal Assessment Guide \u2014 Criteria, Tips & Subject-Specific Advice | IBLens",
    description: "Comprehensive guide to IB Internal Assessments: how IAs differ by subject, assessment criteria explained, examiner marking process, and strategies for top marks.",
    ogType: "article",
    canonical: "/resources/ib-internal-assessment-guide",
  },
  "/resources/tok-essay-guide": {
    title: "TOK Essay Guide \u2014 Prescribed Titles, Knowledge Claims & Assessment Criteria | IBLens",
    description: "Master the Theory of Knowledge essay: prescribed titles analysis, knowledge claims and counter-claims, areas of knowledge, assessment criteria, and common errors to avoid.",
    ogType: "article",
    canonical: "/resources/tok-essay-guide",
  },
  "/resources/ib-grade-boundaries": {
    title: "IB Grade Boundaries Explained \u2014 How Scores Work & What They Mean | IBLens",
    description: "Understand IB grade boundaries: how the 7-point scale works, how subject scores combine, bonus points from EE/TOK, and what different total scores mean for university admissions.",
    ogType: "article",
    canonical: "/resources/ib-grade-boundaries",
  },
  "/resources/ib-essay-criteria-explained": {
    title: "IB Essay Criteria Explained \u2014 How Examiners Mark Your Work | IBLens",
    description: "Deep dive into IB criterion-based marking: what distinguishes band 5 from band 7, how examiners apply criteria, and how to self-assess your work before submission.",
    ogType: "article",
    canonical: "/resources/ib-essay-criteria-explained",
  },
  "/resources/how-iblens-works": {
    title: "How IBLens Works \u2014 AI-Powered IB Essay Analysis",
    description: "How the IBLens AI analyzes IB essays against official criteria, predicts scores, and generates personalized feedback in under 60 seconds.",
    ogType: "article",
    canonical: "/resources/how-iblens-works",
  },
  "/resources/ib-university-admissions": {
    title: "IB University Admissions \u2014 UK, US, EU Guide | IBLens",
    description: "How IB Diploma scores translate to university offers in the UK, US, EU and beyond. Typical IB requirements at top universities.",
    ogType: "article",
    canonical: "/resources/ib-university-admissions",
  },
  "/auth/signin": {
    title: "Sign In \u2014 IBLens",
    description: "Sign in to IBLens to access your IB essay analyses, purchase history, and personalized university strategies.",
    ogType: "website",
    canonical: "/auth/signin",
  },
};

function generateMetaTags(meta: PageMeta): string {
  const fullUrl = `${SITE_URL}${meta.canonical}`;
  const ogType = meta.ogType || "website";

  return `
  <!-- Per-route SEO tags (placed last to override CDN-injected tags above) -->
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
  <meta data-seo="route" name="twitter:image" content="${DEFAULT_OG_IMAGE}" />
  `;
}

// Injects SEO meta tags into the HTML template using the dual-tag strategy.
// Does NOT strip existing tags - they serve as CDN targets.
// Appends real per-route tags right before </head>.
export function injectSeoMeta(html: string, url: string, userAgent: string): string {
  const cleanPath = url.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
  const meta = routeMeta[cleanPath];

  if (!meta) return html;

  const metaTags = generateMetaTags(meta);

  // Inject our per-route tags right before </head>
  // These will be the LAST occurrence and override CDN-replaced ones
  html = html.replace("</head>", `${metaTags}\n</head>`);

  return html;
}

export { routeMeta, SITE_URL };
