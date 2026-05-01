/**
 * SEO Pre-rendering Middleware
 * 
 * Injects route-specific meta tags, Open Graph data, and JSON-LD structured data
 * into the HTML template before serving to crawlers. This ensures search engines
 * see full SEO content even though the app is a client-side SPA.
 * 
 * For regular users, react-helmet-async handles meta tags after hydration.
 * For crawlers (Googlebot, Bingbot, etc.), this middleware pre-populates the HTML.
 */

import { type Express, type Request, type Response, type NextFunction } from "express";

interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
  jsonLd?: object | object[];
}

const SITE_URL = "https://iblens.com";
const SITE_NAME = "IBLens";
const DEFAULT_OG_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456034410/fPpXrWUtmpLttw7Fz9wKLE/og-image-CS5C2Vq6Jk92bXNFNMwCXg.png";

// Route-specific SEO metadata
const routeMeta: Record<string, PageMeta> = {
  "/": {
    title: "IBLens — AI-Powered IB Essay Feedback & Score Prediction",
    description: "Upload your IB Extended Essay, Internal Assessment, or TOK essay and get criterion-by-criterion feedback with a predicted score in 60 seconds. First analysis free.",
    canonical: "/",
    ogType: "website",
  },
  "/essay": {
    title: "IB Essay Analyzer — Get AI Feedback on Your IA, EE, or TOK Essay | IBLens",
    description: "Upload your IB essay and receive instant criterion-based feedback with a predicted score. Supports all IB subjects: Business Management, Economics, History, Sciences, and more.",
    canonical: "/essay",
  },
  "/university": {
    title: "IB University Strategy — Find Universities That Match Your Predicted Grades | IBLens",
    description: "Get personalized university recommendations based on your IB predicted grades, subject combination, and preferences. Covers UK, US, Canada, Europe, and Asia-Pacific.",
    canonical: "/university",
  },
  "/pricing": {
    title: "Pricing — IB Essay Analysis from $4.99 | IBLens",
    description: "Affordable IB essay feedback: first analysis free, single essays from $4.99, packs of 5 for $19.99, packs of 10 for $34.99. 7-day money-back guarantee.",
    canonical: "/pricing",
  },
  "/refund-policy": {
    title: "Refund Policy — 7-Day Money-Back Guarantee | IBLens",
    description: "IBLens offers a 7-day no-questions-asked money-back guarantee on all purchases. Email us within 7 days for a full refund.",
    canonical: "/refund-policy",
  },
  "/resources": {
    title: "IB Resources — Guides for Extended Essay, IA, TOK & University Admissions | IBLens",
    description: "Free in-depth guides for IB Diploma students: Extended Essay structure, Internal Assessment criteria, TOK essay writing, grade boundaries, and university admissions strategies.",
    canonical: "/resources",
  },
  "/resources/ib-extended-essay-guide": {
    title: "IB Extended Essay Guide — Structure, Criteria & Tips for an A | IBLens",
    description: "Complete guide to the IB Extended Essay: structure, assessment criteria A–E, research question formulation, common mistakes, and strategies for scoring an A on your 4,000-word EE.",
    canonical: "/resources/ib-extended-essay-guide",
    ogType: "article",
  },
  "/resources/ib-internal-assessment-guide": {
    title: "IB Internal Assessment Guide — Criteria, Tips & Subject-Specific Advice | IBLens",
    description: "Comprehensive guide to IB Internal Assessments: how IAs differ by subject, assessment criteria explained, examiner marking process, and strategies for top marks.",
    canonical: "/resources/ib-internal-assessment-guide",
    ogType: "article",
  },
  "/resources/tok-essay-guide": {
    title: "TOK Essay Guide — Prescribed Titles, Knowledge Claims & Assessment Criteria | IBLens",
    description: "Master the Theory of Knowledge essay: prescribed titles analysis, knowledge claims and counter-claims, areas of knowledge, assessment criteria, and common errors to avoid.",
    canonical: "/resources/tok-essay-guide",
    ogType: "article",
  },
  "/resources/ib-grade-boundaries": {
    title: "IB Grade Boundaries Explained — How Scores Work & What They Mean | IBLens",
    description: "Understand IB grade boundaries: how the 7-point scale works, how subject scores combine, bonus points from EE/TOK, and what different total scores mean for university admissions.",
    canonical: "/resources/ib-grade-boundaries",
    ogType: "article",
  },
  "/resources/ib-essay-criteria-explained": {
    title: "IB Essay Criteria Explained — How Examiners Mark Your Work | IBLens",
    description: "Deep dive into IB criterion-based marking: what distinguishes band 5 from band 7, how examiners apply criteria, and how to self-assess your work before submission.",
    canonical: "/resources/ib-essay-criteria-explained",
    ogType: "article",
  },
  "/resources/how-iblens-works": {
    title: "How IBLens Works — AI Essay Analysis Explained | IBLens",
    description: "Learn how IBLens uses AI to analyze IB essays against official rubrics, what the output looks like, accuracy limitations, privacy protections, and comparison to tutors.",
    canonical: "/resources/how-iblens-works",
    ogType: "article",
  },
  "/resources/ib-university-admissions": {
    title: "IB to University — How Scores Translate to Admissions Worldwide | IBLens",
    description: "How UK, US, Canadian, European, and Asia-Pacific universities evaluate IB Diploma scores. Typical offers, UCAS points, credit policies, and strategic application decisions.",
    canonical: "/resources/ib-university-admissions",
    ogType: "article",
  },
};

function generateMetaTags(meta: PageMeta): string {
  const fullUrl = `${SITE_URL}${meta.canonical}`;
  const ogType = meta.ogType || "website";

  return `
    <title>${meta.title}</title>
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
    <meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />
  `;
}

function isCrawler(userAgent: string): boolean {
  const crawlerPatterns = [
    /googlebot/i,
    /bingbot/i,
    /slurp/i,
    /duckduckbot/i,
    /baiduspider/i,
    /yandexbot/i,
    /facebookexternalhit/i,
    /twitterbot/i,
    /linkedinbot/i,
    /whatsapp/i,
    /telegrambot/i,
    /discordbot/i,
  ];
  return crawlerPatterns.some((pattern) => pattern.test(userAgent));
}

/**
 * Injects SEO meta tags into the HTML template.
 * Called from the Vite middleware (dev) or static serving (prod).
 */
export function injectSeoMeta(html: string, url: string, userAgent: string): string {
  // Clean URL of query params and hash for route matching
  const cleanPath = url.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
  const meta = routeMeta[cleanPath];

  if (!meta) return html;

  const metaTags = generateMetaTags(meta);

  // Replace the placeholder title and inject meta tags after <head>
  // Remove the default title first
  html = html.replace(/<title>[^<]*<\/title>/, "");
  // Inject after <head>
  html = html.replace("<head>", `<head>${metaTags}`);

  return html;
}

export { routeMeta, SITE_URL };
