// SEO Pre-rendering Middleware (JSON-LD Strategy)
//
// The Manus platform CDN replaces ALL title, description, canonical, og:*, and
// twitter:* tag content with homepage values. It targets every occurrence.
//
// However, the CDN does NOT touch <script type="application/ld+json"> content.
// Google reads JSON-LD and uses it for search result title/description display.
//
// Strategy: inject per-route JSON-LD WebPage/Article structured data with
// correct name, headline, description, and url right before </head>.

interface PageMeta {
  title: string;
  description: string;
  ogType?: string;
  canonical: string;
  schemaType: string;
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
    schemaType: "WebSite",
  },
  "/essay": {
    title: "IB Essay Analyzer \u2014 AI Feedback & Score Prediction for IA, EE, TOK | IBLens",
    description: "Get instant AI feedback on your IB essay with criterion-by-criterion scoring. First analysis free. Supports Extended Essay, Internal Assessment, TOK \u2014 all subjects.",
    ogType: "website",
    canonical: "/essay",
    schemaType: "WebPage",
  },
  "/grade": {
    title: "Free IB Essay Grader \u2014 Grade My IB Essay in 60 Seconds | IBLens",
    description: "Grade your IB Extended Essay, IA, or TOK essay instantly. AI-powered IB essay grader gives criterion-by-criterion feedback and predicted band in 60 seconds. Free.",
    ogType: "website",
    canonical: "/grade",
    schemaType: "WebPage",
  },
  "/university": {
    title: "IB University Strategy \u2014 Know Your Real Chances at 9 Universities | IBLens",
    description: "AI-powered IB university strategy: 9 personalised picks (Safe/Match/Reach) with admission probabilities, your essay angle, and application timeline. IB consultants charge $300+ \u2014 we do it in 2 minutes.",
    ogType: "website",
    canonical: "/university",
    schemaType: "WebPage",
  },
  "/pricing": {
    title: "Pricing \u2014 IB Essay Analysis from $4.99 | IBLens",
    description: "Affordable IB essay feedback: first analysis free, single essays from $4.99, packs of 5 for $19.99, packs of 10 for $34.99. 7-day money-back guarantee.",
    ogType: "website",
    canonical: "/pricing",
    schemaType: "WebPage",
  },
  "/refund-policy": {
    title: "Refund Policy \u2014 7-Day Money-Back Guarantee | IBLens",
    description: "IBLens offers a 7-day no-questions-asked money-back guarantee on all purchases. Email us within 7 days for a full refund.",
    ogType: "website",
    canonical: "/refund-policy",
    schemaType: "WebPage",
  },
  "/resources": {
    title: "IB Resources \u2014 Guides for Extended Essay, IA, TOK & University Admissions | IBLens",
    description: "Free in-depth guides for IB Diploma students: Extended Essay structure, Internal Assessment criteria, TOK essay writing, grade boundaries, and university admissions strategies.",
    ogType: "website",
    canonical: "/resources",
    schemaType: "CollectionPage",
  },
  "/resources/ib-extended-essay-guide": {
    title: "IB Extended Essay Guide \u2014 Structure, Criteria & Tips for an A | IBLens",
    description: "Complete guide to the IB Extended Essay: structure, assessment criteria A-E, research question formulation, common mistakes, and strategies for scoring an A on your 4,000-word EE.",
    ogType: "article",
    canonical: "/resources/ib-extended-essay-guide",
    schemaType: "Article",
  },
  "/resources/ib-internal-assessment-guide": {
    title: "IB Internal Assessment Guide \u2014 Criteria, Tips & Subject-Specific Advice | IBLens",
    description: "Comprehensive guide to IB Internal Assessments: how IAs differ by subject, assessment criteria explained, examiner marking process, and strategies for top marks.",
    ogType: "article",
    canonical: "/resources/ib-internal-assessment-guide",
    schemaType: "Article",
  },
  "/resources/tok-essay-guide": {
    title: "TOK Essay Guide \u2014 Prescribed Titles, Knowledge Claims & Assessment Criteria | IBLens",
    description: "Master the Theory of Knowledge essay: prescribed titles analysis, knowledge claims and counter-claims, areas of knowledge, assessment criteria, and common errors to avoid.",
    ogType: "article",
    canonical: "/resources/tok-essay-guide",
    schemaType: "Article",
  },
  "/resources/ib-grade-boundaries": {
    title: "IB Grade Boundaries Explained \u2014 How Scores Work & What They Mean | IBLens",
    description: "Understand IB grade boundaries: how the 7-point scale works, how subject scores combine, bonus points from EE/TOK, and what different total scores mean for university admissions.",
    ogType: "article",
    canonical: "/resources/ib-grade-boundaries",
    schemaType: "Article",
  },
  "/resources/ib-essay-criteria-explained": {
    title: "IB Essay Criteria Explained \u2014 How Examiners Mark Your Work | IBLens",
    description: "Deep dive into IB criterion-based marking: what distinguishes band 5 from band 7, how examiners apply criteria, and how to self-assess your work before submission.",
    ogType: "article",
    canonical: "/resources/ib-essay-criteria-explained",
    schemaType: "Article",
  },
  "/resources/how-iblens-works": {
    title: "How IBLens Works \u2014 AI-Powered IB Essay Analysis",
    description: "How the IBLens AI analyzes IB essays against official criteria, predicts scores, and generates personalized feedback in under 60 seconds.",
    ogType: "article",
    canonical: "/resources/how-iblens-works",
    schemaType: "Article",
  },
  "/resources/ib-university-admissions": {
    title: "IB University Admissions \u2014 UK, US, EU Guide | IBLens",
    description: "How IB Diploma scores translate to university offers in the UK, US, EU and beyond. Typical IB requirements at top universities.",
    ogType: "article",
    canonical: "/resources/ib-university-admissions",
    schemaType: "Article",
  },
  "/auth/signin": {
    title: "Sign In \u2014 IBLens",
    description: "Sign in to IBLens to access your IB essay analyses, purchase history, and personalized university strategies.",
    ogType: "website",
    canonical: "/auth/signin",
    schemaType: "WebPage",
  },
};

function generateJsonLd(meta: PageMeta): string {
  const fullUrl = `${SITE_URL}${meta.canonical}`;
  const isArticle = meta.schemaType === "Article";

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": meta.schemaType,
    name: meta.title,
    headline: meta.title,
    description: meta.description,
    url: fullUrl,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  if (isArticle) {
    schema.author = { "@type": "Organization", name: SITE_NAME, url: SITE_URL };
    schema.publisher = {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: DEFAULT_OG_IMAGE },
    };
    schema.image = DEFAULT_OG_IMAGE;
    schema.datePublished = "2026-04-15";
    schema.dateModified = "2026-05-02";
  }

  // BreadcrumbList
  const breadcrumbs: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    ],
  };

  if (meta.canonical !== "/") {
    const segments = meta.canonical.split("/").filter(Boolean);
    let currentPath = "";
    const items = breadcrumbs.itemListElement as Array<Record<string, unknown>>;
    segments.forEach((segment: string, index: number) => {
      currentPath += `/${segment}`;
      items.push({
        "@type": "ListItem",
        position: index + 2,
        name:
          index === segments.length - 1
            ? meta.title.split(" \u2014 ")[0].split(" | ")[0]
            : segment.charAt(0).toUpperCase() + segment.slice(1),
        item: `${SITE_URL}${currentPath}`,
      });
    });
  }

  return `
    <!-- Per-route SEO: JSON-LD (CDN does not modify script tags) -->
    <script type="application/ld+json">
${JSON.stringify(schema, null, 6)}
    </script>
    <script type="application/ld+json">
${JSON.stringify(breadcrumbs, null, 6)}
    </script>
  `;
}

// Injects per-route JSON-LD structured data right before </head>.
// The CDN does NOT touch script tags, so Google can read the correct
// per-route title and description from JSON-LD.
export function injectSeoMeta(html: string, url: string, _userAgent: string): string {
  const cleanPath = url.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
  const meta = routeMeta[cleanPath];

  if (!meta) return html;

  const jsonLd = generateJsonLd(meta);
  html = html.replace("</head>", `${jsonLd}\n</head>`);

  return html;
}

export { routeMeta, SITE_URL };
