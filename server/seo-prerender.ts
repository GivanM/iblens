import fs from "fs";
import path from "path";
/**
 * Crawler bodies are rendered from the React pages at build time
 * (scripts/render-crawler-bodies.mjs), so a crawler reads the same text as a
 * visitor. The hand-kept HTML copies they replaced are gone: every review round
 * found a fix that had reached one copy and not the other.
 */
function loadRenderedBodies(): Record<string, string> {
  const here = typeof import.meta !== "undefined" && (import.meta as any).dirname ? (import.meta as any).dirname : process.cwd();
  for (const candidate of [path.resolve(here, "crawler-bodies.json"), path.resolve(process.cwd(), "dist/crawler-bodies.json")]) {
    try {
      return JSON.parse(fs.readFileSync(candidate, "utf8"));
    } catch {
      // try the next location
    }
  }
  console.warn("[SEO] dist/crawler-bodies.json not found: pages have no crawler body until the next build");
  return {};
}

const allStaticContent: Record<string, string> = loadRenderedBodies();

/** Publication dates read from each article's own props at build time. */
function loadArticleDates(): Record<string, { datePublished?: string; dateModified?: string }> {
  const here = typeof import.meta !== "undefined" && (import.meta as any).dirname ? (import.meta as any).dirname : process.cwd();
  for (const candidate of [path.resolve(here, "crawler-meta.json"), path.resolve(process.cwd(), "dist/crawler-meta.json")]) {
    try {
      return JSON.parse(fs.readFileSync(candidate, "utf8"));
    } catch {
      // try the next location
    }
  }
  return {};
}

const articleDates = loadArticleDates();

const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

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

interface FaqItem {
  question: string;
  answer: string;
}

interface PageMeta {
  title: string;
  description: string;
  /** Kept reachable for old links, but not for search results. */
  noindex?: boolean;
  ogType?: string;
  canonical: string;
  schemaType: string;
  faq?: FaqItem[];
}

const SITE_URL = "https://iblens.com";
const SITE_NAME = "IBLens";
// Served from client/public. The CloudFront image every page pointed at returned 403.
const DEFAULT_OG_IMAGE = "https://iblens.com/og-image.png";

const routeMeta: Record<string, PageMeta> = {
  "/privacy": {
    title: "Privacy Policy | IBLens",
    description: "How IBLens handles your data: what we collect, how your essay is processed by our AI provider (Anthropic), retention, your rights, and children's privacy.",
    ogType: "website",
    canonical: "/privacy",
    schemaType: "WebPage",
  },
  "/terms": {
    title: "Terms of Use | IBLens",
    description: "Terms for using IBLens: scores are AI estimates not official IB grades, acceptable use, and IBLens independence from the International Baccalaureate Organization.",
    ogType: "website",
    canonical: "/terms",
    schemaType: "WebPage",
  },

  "/remark": {
    title: "IB Remark: Is an Enquiry Upon Results Worth It? Check Before You Pay | IBLens",
    description: "An IB re-mark can lower your grade as well as raise it. Requests close on 15 September for the May session and 15 March for November. See how the EE or TOK essay you submitted reads against the criteria before you decide.",
    ogType: "website",
    canonical: "/remark",
    schemaType: "WebPage",
    faq: [
      { question: "How much does an IB remark cost?", answer: "The IB publishes its enquiry upon results fees to schools rather than on its public website, so ask your coordinator for the current fee. There is no charge for a category 1 re-mark that results in a change of grade." },
      { question: "Can my grade go down after an IB remark?", answer: "Yes. A category 1 re-mark can raise or lower the grade, and your school must have your written consent before requesting one. A re-mark makes most sense when your component mark is close to a grade boundary." },
      { question: "What is the IB remark deadline?", answer: "Enquiry upon results requests can be made up to 15 September for the May session and up to 15 March for the November session. Your school submits them and may set an earlier deadline, so ask your coordinator as soon as results are out." },
      { question: "Should I remark or retake?", answer: "Consider a re-mark if your component mark for an externally assessed essay (EE or TOK) is one or two marks from a grade boundary. Consider a retake if you are several marks off; retake registration has its own deadlines and fees, so ask your coordinator early." },
    ],
  },
  "/resources/sample-reports": {
    title: "Sample IBLens Reports: Three TOK Essays, Marked and Unedited | IBLens",
    description: "Real, unedited IBLens output: three demonstration TOK essays on one title, written at three levels of quality and marked 2/10, 4/10 and 9/10 on the holistic instrument, each with its full report.",
    ogType: "article",
    canonical: "/resources/sample-reports",
    schemaType: "Article",
  },
  "/resources/academic-integrity": {
    title: "AI Feedback and IB Academic Integrity: Is It Allowed? | IBLens",
    description: "What the IB academic integrity policy means for AI feedback on your EE, TOK essay or IA, and how IBLens handles your data: no training on your essays, no sharing, deletion on request.",
    ogType: "article",
    canonical: "/resources/academic-integrity",
    schemaType: "Article",
  },

  "/": {
    title: "IB Essay Grader 2026: Free Preview, AI Feedback on IA, EE & TOK | IBLens",
    description: "AI feedback on your IB essay in about a minute: marks against the published criteria, an estimated band, the risks costing you marks, and what to fix first. Free preview, no account needed.",
    ogType: "website",
    canonical: "/",
    schemaType: "WebSite",
  },
  "/essay": {
    title: "IB Essay Grader: AI Feedback on IA, Extended Essay and TOK | IBLens",
    description: "AI feedback on your IB Internal Assessment, Extended Essay or TOK work in 14 subjects: a free preview with your band range and weakest criterion, then a full report against the published criteria.",
    ogType: "website",
    canonical: "/essay",
    schemaType: "WebPage",
  },
  "/grade": {
    title: "IB Essay Grader: Free Preview of Your IA, EE or TOK Marks in About a Minute | IBLens",
    description: "Paste your IB essay and get a free preview in about a minute: your band range, weakest criterion and top risks. The full report gives the estimated mark and the reasons for it. Extended Essay, IA or TOK, no account needed.",
    ogType: "website",
    canonical: "/grade",
    schemaType: "WebPage",
  },
  "/university": {
    title: "IB University Strategy: No Longer Offered | IBLens",
    description: "This part of IBLens is no longer offered. We withdrew it rather than sell university guidance we cannot keep current. IBLens still marks IB coursework, with a free preview first.",
    noindex: true,
    ogType: "website",
    canonical: "/university",
    schemaType: "WebPage",
  },
  "/pricing": {
    title: "IB Essay Feedback from $9.99: No Subscription, No Account Needed | IBLens",
    description: "A free preview on your first IB essay, then a full report for $9.99, five for $24.99 or ten for $44.99. No subscription, paid reports do not expire, two re-checks per report, and a 7-day money-back guarantee.",
    ogType: "website",
    canonical: "/pricing",
    schemaType: "WebPage",
  },
  "/refund-policy": {
    title: "Refund Policy: 7-Day Money-Back Guarantee | IBLens",
    description: "IBLens offers a 7-day no-questions-asked money-back guarantee on all purchases. Email us within 7 days for a full refund to your original payment method.",
    ogType: "website",
    canonical: "/refund-policy",
    schemaType: "WebPage",
  },
  "/resources": {
    title: "Free IB Study Guides: Extended Essay, IA, TOK and University Applications | IBLens",
    description: "Free guides for IB Diploma students: writing the Extended Essay, Internal Assessment criteria by subject, TOK essay structure, how IB grades and bonus points work, and planning university applications.",
    ogType: "website",
    canonical: "/resources",
    schemaType: "CollectionPage",
  },
  "/resources/ib-extended-essay-guide": {
    title: "IB Extended Essay Guide: Structure, Criteria and How to Score an A | IBLens",
    description: "A complete guide to the IB Extended Essay: the 4,000-word limit, structure, the research question, the assessment criteria for both rubrics, and the mistakes that cost marks.",
    ogType: "article",
    canonical: "/resources/ib-extended-essay-guide",
    schemaType: "Article",
  },
  "/resources/ib-internal-assessment-guide": {
    title: "IB Internal Assessment Guide 2026: Criteria, Marking & Subject Tips | IBLens",
    description: "How IB Internal Assessments are marked: criteria by subject group, what teachers and moderators look for, the moderation process, and strategies for top marks across sciences, humanities and languages.",
    ogType: "article",
    canonical: "/resources/ib-internal-assessment-guide",
    schemaType: "Article",
  },
  "/resources/tok-essay-guide": {
    title: "IB TOK Essay Guide: Prescribed Titles, Structure and Assessment | IBLens",
    description: "A guide to the IB Theory of Knowledge essay: unpacking the prescribed titles, claims and counter-claims, areas of knowledge, the holistic assessment instrument, and common errors.",
    ogType: "article",
    canonical: "/resources/tok-essay-guide",
    schemaType: "Article",
  },
  "/resources/ib-grade-boundaries": {
    title: "IB Grade Boundaries Explained: How IB Scoring Works | IBLens",
    description: "How IB grade boundaries work: the 1 to 7 scale, how subject grades and the EE and TOK bonus points make up the 45-point Diploma score, and why boundaries move every session.",
    ogType: "article",
    canonical: "/resources/ib-grade-boundaries",
    schemaType: "Article",
  },
  "/resources/ib-essay-criteria-explained": {
    title: "IB Essay Criteria Explained: How Criterion-Based Marking Works | IBLens",
    description: "How IB criterion-based marking works: the criteria common across subjects, how examiners apply the level descriptors, and how to self-assess your work before you submit.",
    ogType: "article",
    canonical: "/resources/ib-essay-criteria-explained",
    schemaType: "Article",
  },
  "/resources/how-iblens-works": {
    title: "How IBLens Works: AI Feedback on IB Essays Explained | IBLens",
    description: "How IBLens marks IB coursework: which criteria it uses, how the estimated mark is produced, what the report includes, and what it cannot do.",
    ogType: "article",
    canonical: "/resources/how-iblens-works",
    schemaType: "Article",
  },
  "/resources/ib-university-admissions": {
    title: "IB University Admissions: UK, US and Europe Requirements | IBLens",
    description: "How UK, US and other systems read the IB Diploma, and where each university publishes its requirements.",
    ogType: "article",
    canonical: "/resources/ib-university-admissions",
    schemaType: "Article",
  },
  "/resources/ib-extended-essay-examples": {
    title: "IB Extended Essay Examples: What High-Scoring EEs Do Differently | IBLens",
    description: "Why full marked Extended Essays are hard to find, and what top-band essays do on each criterion across Economics, History, Biology, English and more.",
    ogType: "article",
    canonical: "/resources/ib-extended-essay-examples",
    schemaType: "Article",
  },
  "/resources/ib-ia-score-predictor": {
    title: "IB IA Score Predictor: Estimate Your Internal Assessment Grade | IBLens",
    description: "How IB Internal Assessment marks are awarded and moderated, how to self-assess your IA criterion by criterion, and how to estimate your grade before results day.",
    ogType: "article",
    canonical: "/resources/ib-ia-score-predictor",
    schemaType: "Article",
  },
  "/resources/ib-score-calculator": {
    title: "IB Score Calculator: Points, Grade Boundaries and Diploma Requirements | IBLens",
    description: "How the 45-point IB Diploma score is calculated: subject grades, the EE and TOK bonus matrix, grade boundaries, and the totals universities ask for.",
    ogType: "article",
    canonical: "/resources/ib-score-calculator",
    schemaType: "Article",
  },
  "/resources/ib-university-admissions-strategy": {
    title: "IB University Admissions Strategy: How to Choose Universities | IBLens",
    description: "A practical guide to IB university applications: build a balanced list, match your HL subjects to the courses you want, plan around application deadlines, and avoid common mistakes.",
    ogType: "article",
    canonical: "/resources/ib-university-admissions-strategy",
    schemaType: "Article",
  },
  "/resources/ib-math-ia-examples": {
    title: "IB Math IA Examples: Topics, Structure and Common Mistakes | IBLens",
    description: "IB Math IA topic ideas for Analysis and Approaches and for Applications and Interpretation, what each of the five criteria rewards, and the mistakes that cost marks.",
    ogType: "article",
    canonical: "/resources/ib-math-ia-examples",
    schemaType: "Article",
  },
  "/resources/ib-biology-ia-examples": {
    title: "IB Biology IA Examples: Topics, Data and What Scores Well | IBLens",
    description: "IB Biology IA investigation ideas and what separates top-band work on each of the four criteria, with the mistakes that cost marks most often.",
    ogType: "article",
    canonical: "/resources/ib-biology-ia-examples",
    schemaType: "Article",
  },
  "/resources/ib-economics-ia": {
    title: "IB Economics IA: How to Write the Three Commentaries | IBLens",
    description: "A guide to the IB Economics Internal Assessment: choosing articles, structuring each commentary, using diagrams well, and avoiding the mistakes that cost marks.",
    ogType: "article",
    canonical: "/resources/ib-economics-ia",
    schemaType: "Article",
  },
  "/resources/ib-extended-essay-word-count": {
    title: "IB Extended Essay Word Count: The 4,000-Word Limit Explained | IBLens",
    description: "What counts towards the 4,000-word limit of the IB Extended Essay, what does not, how close to the limit to aim, and what happens if you go over.",
    ogType: "article",
    canonical: "/resources/ib-extended-essay-word-count",
    schemaType: "Article",
  },
  "/resources/ib-extended-essay-help": {
    title: "IB Extended Essay Help: Fix Every Stage of Your EE and Score Higher | IBLens",
    description: "Stuck on your IB Extended Essay? What you can fix yourself at each stage, what your supervisor can help with, and where AI feedback on your draft fits.",
    ogType: "article",
    canonical: "/resources/ib-extended-essay-help",
    schemaType: "Article",
  },
  "/resources/ib-chemistry-ia-examples": {
    title: "IB Chemistry IA Examples: Topics, Methods and What Scores Well | IBLens",
    description: "IB Chemistry IA investigation types that work, how to handle uncertainties and data processing, and what the Evaluation criterion actually asks for.",
    ogType: "article",
    canonical: "/resources/ib-chemistry-ia-examples",
    schemaType: "Article",
  },
  "/resources/ib-physics-ia-examples": {
    title: "IB Physics IA Examples: Investigation Ideas and What Scores Well | IBLens",
    description: "IB Physics IA investigation ideas, how to handle uncertainties, and what the Evaluation criterion needs, with the mistakes that cost marks most often.",
    ogType: "article",
    canonical: "/resources/ib-physics-ia-examples",
    schemaType: "Article",
  },
  "/resources/ib-psychology-ia": {
    title: "IB Psychology IA: How to Design Your Replication Study | IBLens",
    description: "A guide to the IB Psychology Internal Assessment through November 2026: choosing a study to replicate, designing an ethical experiment, analysing the results, and what each criterion rewards.",
    ogType: "article",
    canonical: "/resources/ib-psychology-ia",
    schemaType: "Article",
  },
  "/resources/ib-history-ia": {
    title: "IB History IA: How to Write Your Historical Investigation | IBLens",
    description: "A guide to the IB History Internal Assessment: choosing a research question, the three sections, evaluating sources, and what each criterion rewards.",
    ogType: "article",
    canonical: "/resources/ib-history-ia",
    schemaType: "Article",
  },
  "/resources/ib-ee-examples-by-subject": {
    title: "IB EE Examples by Subject: What Top-Band Extended Essays Do | IBLens",
    description: "What separates top-band Extended Essays in Economics, History, Biology, English, Psychology, Mathematics and Physics, criterion by criterion.",
    ogType: "article",
    canonical: "/resources/ib-ee-examples-by-subject",
    schemaType: "Article",
  },
  "/resources/ib-ia-grader": {
    title: "IB IA Grader: AI Feedback on Your Coursework in 14 Subjects | IBLens",
    description: "An IB IA grader with a free preview: AI feedback on your Internal Assessment against the published criteria for Biology, Chemistry, Physics, Math, History, Economics, Psychology and more.",
    ogType: "article",
    canonical: "/resources/ib-ia-grader",
    schemaType: "Article",
  },
  "/resources/ib-extended-essay-new-criteria-2027": {
    title: "IB Extended Essay New Criteria 2027: Marked Out of 30, Explained | IBLens",
    description: "From the May 2027 session the IB Extended Essay is marked out of 30 under five new criteria, Framework, Knowledge and understanding, Analysis and line of argument, Discussion and evaluation, Reflection. What changed from the 34-mark rubric and how to check your draft.",
    ogType: "article",
    canonical: "/resources/ib-extended-essay-new-criteria-2027",
    schemaType: "Article",
  },
  "/resources/tok-essay-checklist": {
    title: "TOK Essay Checklist: Check Your Essay Against the IB Criteria | IBLens",
    description: "A practical TOK essay checklist built on the official holistic assessment instrument: the five bands out of 10, the exact question examiners ask, and the concrete checks to run on your draft before submission, no tutor needed.",
    ogType: "article",
    canonical: "/resources/tok-essay-checklist",
    schemaType: "Article",
  },
  "/resources/ib-psychology-ia-2027": {
    title: "IB Psychology IA Changes 2027: Research Proposal Marked /24 | IBLens",
    description: "From the May 2027 session the IB Psychology IA becomes a research proposal marked out of 24, and no experiment is conducted. The new criteria, what changed from the 22-mark report, and how to check your draft.",
    ogType: "article",
    canonical: "/resources/ib-psychology-ia-2027",
    schemaType: "Article",
  },
  "/resources/ib-computer-science-ia-2027": {
    title: "IB Computer Science IA Changes 2027: Marked Out of 30 | IBLens",
    description: "From the May 2027 session the IB Computer Science IA is a computational solution marked out of 30: Problem specification, Planning, System overview, Development (12 marks) and Evaluation. What changed from the 34-mark solution.",
    ogType: "article",
    canonical: "/resources/ib-computer-science-ia-2027",
    schemaType: "Article",
  },
  "/resources/ib-extended-essay-feedback": {
    title: "IB Extended Essay Feedback: How to Get It Before You Submit | IBLens",
    description: "Every legitimate way to get feedback on your IB Extended Essay before submission: supervisor rules, self-checking against the criteria, peers, and where AI feedback fits, with the limits of each channel.",
    ogType: "article",
    canonical: "/resources/ib-extended-essay-feedback",
    schemaType: "Article",
  },
  "/resources/ib-coursework-review-tools": {
    title: "AI Tools IB Students Use to Review Coursework: 2026 Comparison | IBLens",
    description: "An honest comparison of the AI tools IB students use to review IAs, EEs and TOK work: IBLens, RevisionDojo, MyRevisionAgent, Clastify and general chatbots. What each reviews, how it charges, and which support the May 2027 EE criteria.",
    ogType: "article",
    canonical: "/resources/ib-coursework-review-tools",
    schemaType: "Article",
  },
  "/resources/tok-exhibition-checklist": {
    title: "TOK Exhibition Checklist: Check Your Commentary Against the IB Criteria | IBLens",
    description: "Check your TOK exhibition commentary against the official holistic instrument: the question it asks, five bands out of 10, and concrete checks for your three objects, contexts and IA prompt links.",
    ogType: "article",
    canonical: "/resources/tok-exhibition-checklist",
    schemaType: "Article",
  },
  "/resources/ib-ia-feedback": {
    title: "IB IA Feedback: Check Your IA Against the Official Criteria | IBLens",
    description: "How to check your IB Internal Assessment against the official criteria without a tutor: what each subject is marked out of, where the heaviest criteria sit, and a self-check sequence for any subject.",
    ogType: "article",
    canonical: "/resources/ib-ia-feedback",
    schemaType: "Article",
  },
  "/about": {
    title: "About IBLens: Where It Came From and How the Grader Works | IBLens",
    description: "IBLens is an independent AI feedback tool for IB coursework. How the grader works, which official criteria it applies, what it will not do, and how to reach us.",
    ogType: "article",
    canonical: "/about",
    schemaType: "Article",
  },
  "/resources/ib-rpf-extended-essay-2027": {
    title: "IB EE RPF 2027: The 500-Word Reflective Statement, Explained | IBLens",
    description: "From the May 2027 session the EE RPPF is replaced by the RPF, a single reflective statement of up to 500 words, assessed under Criterion E: Reflection (4 of 30 marks). What it is and how to write one.",
    ogType: "article",
    canonical: "/resources/ib-rpf-extended-essay-2027",
    schemaType: "Article",
  },
  "/ucas-personal-statement": {
    title: "UCAS Personal Statement Checker: Three-Question Format for 2026 and 2027 Entry | IBLens",
    description: "Check your UCAS personal statement against the format used from 2026 entry: three questions, 4,000 characters, 350 minimum per answer. Evidence-based feedback on each answer from an admissions-tutor perspective. Free preview, no account.",
    ogType: "article",
    canonical: "/ucas-personal-statement",
    schemaType: "Article",
  },
  "/resources/tok-essay-format": {
    title: "IB TOK Essay Format: Word Count, Structure & Formatting Rules | IBLens",
    description: "TOK essay rules and conventions: the 1,600-word limit and what counts towards it, the prescribed title, anonymity, a workable structure and consistent citations.",
    ogType: "article",
    canonical: "/resources/tok-essay-format",
    schemaType: "Article",
  },
  "/resources/tok-essay-structure": {
    title: "IB TOK Essay Structure 2026: How to Structure Your Theory of Knowledge Essay | IBLens",
    description: "Step-by-step IB TOK essay structure: introduction, knowledge claims, counter-claims, conclusion. Paragraph-by-paragraph guide and examiner tips for 2026.",
    ogType: "website",
    canonical: "/resources/tok-essay-structure",
    schemaType: "Article",
  },
  "/resources/ib-university-consultant-cost": {
    title: "IB University Guidance: No Longer Offered | IBLens",
    description: "This part of IBLens is no longer offered. We withdrew it rather than sell university guidance we cannot keep current. IBLens still marks IB coursework, with a free preview first.",
    noindex: true,
    ogType: "website",
    canonical: "/resources/ib-university-consultant-cost",
    schemaType: "WebPage",
  },
  "/resources/ib-university-chances": {
    title: "IB University Chances: No Longer Offered | IBLens",
    description: "This part of IBLens is no longer offered. We withdrew it rather than sell university guidance we cannot keep current. IBLens still marks IB coursework, with a free preview first.",
    noindex: true,
    ogType: "website",
    canonical: "/resources/ib-university-chances",
    schemaType: "WebPage",
  },
  "/resources/ib-biology-extended-essay": {
    title: "IB Biology Extended Essay: Research Questions, Criteria and Tips | IBLens",
    description: "A guide to the IB Biology Extended Essay: choosing a research question, how the EE differs from the IA, the assessment criteria, structure, and the reflection.",
    ogType: "article",
    canonical: "/resources/ib-biology-extended-essay",
    schemaType: "Article",
  },
  "/resources/ib-chemistry-extended-essay": {
    title: "IB Chemistry Extended Essay: Research Questions, Topics and Tips | IBLens",
    description: "A guide to the IB Chemistry Extended Essay: research question examples, the assessment criteria, structure, workable topics such as kinetics, electrochemistry and colorimetry, and common pitfalls.",
    ogType: "article",
    canonical: "/resources/ib-chemistry-extended-essay",
    schemaType: "Article",
  },
  "/resources/ib-history-extended-essay": {
    title: "IB History Extended Essay: Research Questions & Tips | IBLens",
    description: "How to write an IB History Extended Essay: strong research questions, source evaluation and historiography, criteria A-E, common mistakes and grading tips.",
    ogType: "article",
    canonical: "/resources/ib-history-extended-essay",
    schemaType: "Article",
  },
  "/resources/ib-english-extended-essay": {
    title: "IB English Extended Essay: Research Questions & Tips | IBLens",
    description: "How to write an IB English Extended Essay: analytical research questions, close reading over plot summary, criteria A-E, common mistakes and grading tips.",
    ogType: "article",
    canonical: "/resources/ib-english-extended-essay",
    schemaType: "Article",
  },
  "/resources/ib-economics-extended-essay": {
    title: "IB Economics Extended Essay: Research Questions & Tips | IBLens",
    description: "How to write an IB Economics Extended Essay: focused research questions, applying theory and real data with diagrams, criteria A-E and common mistakes.",
    ogType: "article",
    canonical: "/resources/ib-economics-extended-essay",
    schemaType: "Article",
  },
  "/resources/ib-psychology-extended-essay": {
    title: "IB Psychology Extended Essay: RQs, Criteria & Tips | IBLens",
    description: "How to write an IB Psychology Extended Essay: research questions, engaging real studies critically, avoiding pop psychology, criteria A-E and common mistakes.",
    ogType: "article",
    canonical: "/resources/ib-psychology-extended-essay",
    schemaType: "Article",
  },
  "/auth/signin": {
    title: "Sign In: IBLens",
    description: "Sign in to IBLens with Google to keep new reports, your credits and your purchase history in one account. Reports bought without an account move in when you sign in on the same device with the email you paid with.",
    ogType: "website",
    canonical: "/auth/signin",
    schemaType: "WebPage",
  },
  // Programmatic subject pages
  "/essay/business-management-ia": {
    title: "IB Business Management IA Grader: AI Feedback on Your Research Project | IBLens",
    description: "AI feedback in about a minute on your IB Business Management research project, marked against the seven criteria out of 25, with the word count checked against 1,800. Free preview first.",
    ogType: "website",
    canonical: "/essay/business-management-ia",
    schemaType: "WebPage",
  },
  "/essay/economics-ia": {
    title: "IB Economics IA Grader: AI Feedback on Your Commentary | IBLens",
    description: "AI feedback on your IB Economics IA commentary against the five criteria: diagrams, terminology, application and analysis, key concept and evaluation, with the words counted against 800. Free preview first.",
    ogType: "website",
    canonical: "/essay/economics-ia",
    schemaType: "WebPage",
  },
  "/essay/history-ia": {
    title: "IB History IA Grader: AI Feedback on Your Historical Investigation | IBLens",
    description: "AI feedback on your IB History Internal Assessment: source evaluation, the investigation and the reflection, marked against the three criteria out of 25, with the words counted against 2,200.",
    ogType: "website",
    canonical: "/essay/history-ia",
    schemaType: "WebPage",
  },
  "/essay/biology-ia": {
    title: "IB Biology IA Grader: AI Feedback on Your Scientific Investigation | IBLens",
    description: "AI feedback on your IB Biology Internal Assessment in about a minute, against the four criteria: research design, data analysis, conclusion and evaluation. Free preview first.",
    ogType: "website",
    canonical: "/essay/biology-ia",
    schemaType: "WebPage",
  },
  "/essay/chemistry-ia": {
    title: "IB Chemistry IA Grader: AI Feedback on Your Scientific Investigation | IBLens",
    description: "AI feedback on your IB Chemistry Internal Assessment against the four criteria: research design, data analysis, conclusion and evaluation. Free preview first, full report $9.99.",
    ogType: "website",
    canonical: "/essay/chemistry-ia",
    schemaType: "WebPage",
  },
  "/essay/physics-ia": {
    title: "IB Physics IA Grader: AI Feedback on Your Scientific Investigation | IBLens",
    description: "AI feedback on your IB Physics Internal Assessment against the four criteria: research design, data analysis, conclusion and evaluation. Free preview first, full report $9.99.",
    ogType: "website",
    canonical: "/essay/physics-ia",
    schemaType: "WebPage",
  },
  "/essay/math-ia": {
    title: "IB Math IA Grader: AI Feedback on Your Exploration | IBLens",
    description: "AI feedback in about a minute on your IB Mathematics exploration: presentation, mathematical communication, personal engagement, reflection and use of mathematics, marked out of 20.",
    ogType: "website",
    canonical: "/essay/math-ia",
    schemaType: "WebPage",
  },
  "/essay/psychology-ia": {
    title: "IB Psychology IA Grader: AI Feedback on Your Report or Proposal | IBLens",
    description: "AI feedback on your IB Psychology Internal Assessment: the experimental report out of 22 through November 2026, or the research proposal out of 24 from May 2027. Free preview first.",
    ogType: "website",
    canonical: "/essay/psychology-ia",
    schemaType: "WebPage",
  },
  "/essay/english-essay": {
    title: "IB English Individual Oral Grader: AI Feedback on Your IO | IBLens",
    description: "AI feedback on the IB English A Individual Oral against the four published criteria: a transcript is marked out of 40, an outline on the first three. The HL essay is a separate component and is not covered.",
    ogType: "website",
    canonical: "/essay/english-essay",
    schemaType: "WebPage",
  },
  "/essay/extended-essay": {
    title: "IB Extended Essay Grader: AI Feedback on Your EE | IBLens",
    description: "AI feedback on your IB Extended Essay against either rubric: the 34-mark criteria through November 2026 or the new 30-mark criteria from May 2027. Criterion-by-criterion report, free preview first.",
    ogType: "website",
    canonical: "/essay/extended-essay",
    schemaType: "WebPage",
  },
  "/essay/tok-essay": {
    title: "IB TOK Essay Grader: AI Feedback on Your Theory of Knowledge Essay | IBLens",
    description: "AI feedback on your IB Theory of Knowledge essay, read against the holistic TOK assessment instrument out of 10, with the words counted against 1,600. Free preview first.",
    ogType: "website",
    canonical: "/essay/tok-essay",
    schemaType: "WebPage",
  },
  "/essay/computer-science-ia": {
    title: "IB Computer Science IA Grader: AI Feedback on Your Solution | IBLens",
    description: "AI feedback on your IB Computer Science Internal Assessment against the 34-mark criteria through November 2026 or the new 30-mark criteria from May 2027. Free preview first, no account needed.",
    ogType: "website",
    canonical: "/essay/computer-science-ia",
    schemaType: "WebPage",
  },
  "/essay/tok-exhibition": {
    title: "IB TOK Exhibition Grader: AI Feedback on Your Three Objects | IBLens",
    description: "AI feedback on your IB Theory of Knowledge exhibition: whether your three objects link convincingly to your IA prompt, read against the holistic instrument out of 10, with the words counted against 950.",
    ogType: "website",
    canonical: "/essay/tok-exhibition",
    schemaType: "WebPage",
  },
  "/essay/maths-aa-ia": {
    title: "IB Math AA IA Grader: AI Feedback on Your Analysis and Approaches Exploration | IBLens",
    description: "AI feedback on your IB Mathematics: Analysis and Approaches exploration: presentation, mathematical communication, personal engagement, reflection and use of mathematics, marked out of 20.",
    ogType: "website",
    canonical: "/essay/maths-aa-ia",
    schemaType: "WebPage",
  },
  "/essay/maths-ai-ia": {
    title: "IB Math AI IA Grader: AI Feedback on Your Applications and Interpretation Exploration | IBLens",
    description: "AI feedback on your IB Mathematics: Applications and Interpretation exploration: presentation, mathematical communication, personal engagement, reflection and use of mathematics, marked out of 20.",
    ogType: "website",
    canonical: "/essay/maths-ai-ia",
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
    // Every article used to claim 15 April and 2 May 2026. Use the page's own dates,
    // or none.
    const dates = articleDates[meta.canonical];
    if (dates?.datePublished) schema.datePublished = dates.datePublished;
    if (dates?.dateModified) schema.dateModified = dates.dateModified;
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
            ? meta.title.split(", ")[0].split(" | ")[0]
            : segment.charAt(0).toUpperCase() + segment.slice(1),
        item: `${SITE_URL}${currentPath}`,
      });
    });
  }

  let output = `
    <!-- Per-route SEO: JSON-LD (CDN does not modify script tags) -->
    <script type="application/ld+json">
${JSON.stringify(schema, null, 6)}
    </script>
    <script type="application/ld+json">
${JSON.stringify(breadcrumbs, null, 6)}
    </script>`;

  if (meta.faq && meta.faq.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: meta.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };
    output += `
    <script type="application/ld+json">
${JSON.stringify(faqSchema, null, 6)}
    </script>`;
  }

  return output + "\n  ";
}

// Injects per-route <title>, meta description, og tags, canonical, and JSON-LD.
// Runs server-side so crawlers and social bots see the correct tags without JS.
export function injectSeoMeta(html: string, url: string, _userAgent: string): string {
  const cleanPath = url.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
  const meta = routeMeta[cleanPath];

  if (!meta) return html;

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);

  // Strip any existing description, canonical, og:*, twitter:* tags injected by prerender-seo.mjs
  // to prevent duplicates when injectSeoMeta runs on top of a pre-rendered dist file.
  html = html.replace(/<meta\s+name="description"[^>]*\/>/gi, '');
  html = html.replace(/<link\s+rel="canonical"[^>]*\/>/gi, '');
  html = html.replace(/<meta\s+property="og:[^"]*"[^>]*\/>/gi, '');
  html = html.replace(/<meta\s+name="twitter:[^"]*"[^>]*\/>/gi, '');
  // index.html ships "index, follow"; one robots tag per page, set from routeMeta.
  html = html.replace(/\s*<meta\s+name="robots"[^>]*\/>/gi, '');
  // The pre-rendered file carries its own JSON-LD; the blocks below replace it.
  html = html.replace(/\s*<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

  // Inject/replace description, og:title, og:description, canonical before </head>
  const canonicalUrl = `${SITE_URL}${meta.canonical}`;
  const metaTags = `
    <meta name="description" content="${escapeAttr(meta.description)}" />
    <meta name="robots" content="${meta.noindex ? "noindex" : "index, follow"}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="${meta.ogType || "website"}" />
    <meta property="og:site_name" content="IBLens" />
    <meta property="og:title" content="${escapeAttr(meta.title)}" />
    <meta property="og:description" content="${escapeAttr(meta.description)}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${DEFAULT_OG_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(meta.title)}" />
    <meta name="twitter:description" content="${escapeAttr(meta.description)}" />
    <meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`;

  const jsonLd = generateJsonLd(meta);
  html = html.replace("</head>", `${metaTags}\n${jsonLd}\n</head>`);


  // Inject static HTML so crawlers see real text; React replaces it on load
  const bodyHtml = allStaticContent[cleanPath];
  if (bodyHtml) {
    html = html.replace('<div id="root"></div>', '<div id="root">' + bodyHtml + '</div>');
  }
  return html;
}

export { routeMeta, SITE_URL };
