import { staticContent } from "./seo-static-content";
import { staticContentResources } from "./seo-static-content-resources";

// Merge base + resources content so both files feed the crawler body injection.
const allStaticContent: Record<string, string> = { ...staticContent, ...staticContentResources };

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
  ogType?: string;
  canonical: string;
  schemaType: string;
  faq?: FaqItem[];
}

const SITE_URL = "https://iblens.com";
const SITE_NAME = "IBLens";
const DEFAULT_OG_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456034410/fPpXrWUtmpLttw7Fz9wKLE/og-image-CS5C2Vq6Jk92bXNFNMwCXg.png";

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
    title: "IB Remark 2026 — Is an EUR Worth It? Check Before You Pay | IBLens",
    description: "An IB remark costs around $100–120, your grade can go down, and the deadline is mid-September. Grade your EE or TOK essay with a strict AI first — know if you are near a boundary before you pay.",
    ogType: "website",
    canonical: "/remark",
    schemaType: "WebPage",
    faq: [
      { question: "How much does an IB remark cost in 2026?", answer: "An EUR Category 1 re-mark typically costs around $100–120 per subject, depending on your school and region. The fee is refunded only if your grade changes." },
      { question: "Can my grade go down after an IB remark?", answer: "Yes. On a remark your grade can move up or down, and the new grade is final. Only remark when you have evidence you are close to a grade boundary." },
      { question: "What is the IB remark deadline?", answer: "Around September 15 for the May session. Requests are submitted by your school, and coordinators often set earlier internal deadlines — ask yours as soon as results are out." },
      { question: "Should I remark or retake?", answer: "Remark if your externally-marked essay (EE or TOK) reads close to a boundary. Retake in November if you are several marks off — registration between July 6–29 has the lowest fees." },
    ],
  },
  "/resources/sample-reports": {
    title: "Sample IBLens Reports \u2014 Three Essays, Three Honest Grades | IBLens",
    description: "Real, unedited IBLens output: the same TOK title at three quality levels, graded 2/10, 4/10 and 5/10 with criterion-level feedback. This is what calibrated strictness looks like.",
    ogType: "article",
    canonical: "/resources/sample-reports",
    schemaType: "Article",
    faq: [
      { question: "Are the sample reports real IBLens output?", answer: "Yes. The three demo essays were written by our team at deliberately different quality levels, then run through the live grader. The scores and every word of feedback are unedited IBLens output." },
      { question: "Does IBLens give everyone a similar score?", answer: "No \u2014 that is the point of the demonstration. The weak essay scored 2/10, the developing one 4/10, the strong one 5/10. The grader is calibrated to spread scores the way a strict examiner does." },
    ],
  },
  "/resources/academic-integrity": {
    title: "AI Feedback and IB Academic Integrity — Is It Allowed? | IBLens",
    description: "What the IB academic integrity policy means for AI feedback on your EE, TOK essay or IA — and how IBLens handles your data: no training on your essays, no sharing, deletion on request.",
    ogType: "article",
    canonical: "/resources/academic-integrity",
    schemaType: "Article",
    faq: [
      { question: "Is it against IB rules to get AI feedback on my essay?", answer: "The IB integrity policy targets submitting work that is not your own. Feedback on writing you produced yourself — like a supervisor or tutor gives — is study support. Your school may have stricter rules, so check with your coordinator, and never paste AI-generated text into your submission." },
      { question: "Does IBLens store my essay or train AI on it?", answer: "No. Essays are graded and returned — they are not used to train models, not shared or published, and anonymous analyses are not stored permanently. You can request deletion at any time." },
      { question: "Will Turnitin flag me for using AI feedback?", answer: "No. Reading feedback about your essay adds nothing to any similarity database. What gets flagged is AI-generated prose inside your submission — which is why IBLens returns feedback, never rewritten text." },
    ],
  },

  "/": {
    title: "Free IB Essay Grader 2026 \u2014 Instant AI Feedback on IA, EE & TOK | IBLens",
    description: "Get AI-powered feedback on your IB essay in 60 seconds. Criterion-by-criterion scores, predicted band, risk areas, and actionable improvements. First analysis free \u2014 no account needed.",
    ogType: "website",
    canonical: "/",
    schemaType: "WebSite",
  },
  "/essay": {
    title: "IB Essay Grader \u2014 Free AI Feedback on IA, Extended Essay & TOK | IBLens",
    description: "Grade your IB Internal Assessment, Extended Essay, or TOK essay free. AI evaluates every criterion, predicts your band, and shows exactly which marks you\u2019re losing. All subjects.",
    ogType: "website",
    canonical: "/essay",
    schemaType: "WebPage",
    faq: [
      { question: "Which IB essay types can IBLens grade?", answer: "IBLens grades all IB essay types: Internal Assessments (IA) for all subjects, Extended Essays (EE), and Theory of Knowledge (TOK) essays. Each is scored against the official IB rubric for that specific essay type." },
      { question: "How accurate is the AI grade prediction?", answer: "IBLens is trained on official IB marking criteria and provides reliable score predictions. It evaluates each criterion individually and identifies specific areas where marks are being lost, giving you actionable feedback to improve before submission." },
      { question: "Is the first analysis really free?", answer: "Yes — every essay gets a free preview: your band range, your weakest criterion with full examiner-style feedback, and the top risks in your draft. The complete report — exact score, every criterion with comments, and a ranked fix list — unlocks for $4.99." },
      { question: "How long does it take to get feedback?", answer: "Results are ready in under 60 seconds. Paste your essay text, select your subject and essay type, and the AI delivers a complete grade report within a minute." },
    ],
  },
  "/grade": {
    title: "Free IB Essay Grader \u2014 Grade My IB Essay in 60 Seconds | IBLens",
    description: "Paste your IB essay and get a predicted grade in 60 seconds. AI feedback on every criterion \u2014 Extended Essay, IA, or TOK. No account, no credit card required.",
    ogType: "website",
    canonical: "/grade",
    schemaType: "WebPage",
  },
  "/university": {
    title: "IB University Strategy — Temporarily Unavailable | IBLens",
    description: "This part of IBLens is being rebuilt on verified, official university requirements and deadlines. In the meantime, grade your IB essays free with IBLens.",
    ogType: "website",
    canonical: "/university",
    schemaType: "WebPage",
  },
  "/pricing": {
    title: "IB Essay Analysis from $4.99 \u2014 Cheaper Than 3 Minutes With a Tutor | IBLens",
    description: "First IB essay analysis free. Single analysis $4.99, pack of 5 for $19.99, pack of 10 for $34.99. No subscription. 7-day money-back guarantee. IB tutors charge $50\u2013150/hr \u2014 IBLens is instant.",
    ogType: "website",
    canonical: "/pricing",
    schemaType: "WebPage",
    faq: [
      { question: "How much does IBLens cost?", answer: "Every essay gets a free preview. The full report costs $4.99, a pack of 5 is $19.99, and a pack of 10 is $34.99. There is no subscription \u2014 you pay only for what you use." },
      { question: "Is there a money-back guarantee?", answer: "Yes. IBLens offers a 7-day no-questions-asked money-back guarantee on all purchases. Email glushkovim@gmail.com within 7 days and you will receive a full refund to your original payment method." },
      { question: "Do credits expire?", answer: "No. Analysis credits do not expire. You can buy a pack now and use the analyses whenever you need them \u2014 for your IA, Extended Essay, or TOK essay." },
      { question: "How does IBLens compare to an IB tutor?", answer: "IB tutors charge $50\u2013150 per hour. A single IBLens analysis costs $4.99 and takes 60 seconds. IBLens gives you criterion-by-criterion feedback against the official IB rubric, a predicted score, and specific improvement suggestions \u2014 available 24/7." },
    ],
  },
  "/refund-policy": {
    title: "Refund Policy \u2014 7-Day Money-Back Guarantee | IBLens",
    description: "IBLens offers a 7-day no-questions-asked money-back guarantee on all purchases. Email us within 7 days for a full refund to your original payment method.",
    ogType: "website",
    canonical: "/refund-policy",
    schemaType: "WebPage",
  },
  "/resources": {
    title: "Free IB Study Guides \u2014 Extended Essay, IA, TOK & University Admissions | IBLens",
    description: "Free in-depth guides for IB Diploma students: how to write an Extended Essay, Internal Assessment criteria by subject, TOK essay structure, IB grade boundaries, and university admissions tips.",
    ogType: "website",
    canonical: "/resources",
    schemaType: "CollectionPage",
  },
  "/resources/ib-extended-essay-guide": {
    title: "IB Extended Essay (EE) Guide — Structure, Criteria & Score an A | IBLens",
    description: "Complete guide to the IB Extended Essay: structure, assessment criteria A\u2013E explained, research question formulation, common mistakes, and strategies to score an A on your 4,000-word EE.",
    ogType: "article",
    canonical: "/resources/ib-extended-essay-guide",
    schemaType: "Article",
  },
  "/resources/ib-internal-assessment-guide": {
    title: "IB Internal Assessment Guide 2026 \u2014 Criteria, Marking & Subject Tips | IBLens",
    description: "How IB Internal Assessments are marked: criteria by subject group, what examiners look for, moderation process, and strategies for top marks across sciences, humanities, and languages.",
    ogType: "article",
    canonical: "/resources/ib-internal-assessment-guide",
    schemaType: "Article",
  },
  "/resources/tok-essay-guide": {
    title: "IB TOK Essay Format & Help — Prescribed Titles, Structure & Score 7 | IBLens",
    description: "IB TOK essay help from format to final draft: how to unpack prescribed titles, write knowledge claims and counter-claims, use Areas of Knowledge, and hit the top assessment band.",
    ogType: "article",
    canonical: "/resources/tok-essay-guide",
    schemaType: "Article",
  },
  "/resources/ib-grade-boundaries": {
    title: "IB Grade Boundaries 2026 \u2014 Score Calculator & What Your Total Means | IBLens",
    description: "Understand IB grade boundaries: how the 7-point scale works, how subject grades combine into a Diploma score, EE/TOK bonus points, and what different totals mean for university admissions.",
    ogType: "article",
    canonical: "/resources/ib-grade-boundaries",
    schemaType: "Article",
  },
  "/resources/ib-essay-criteria-explained": {
    title: "IB Essay Criteria Explained \u2014 How Examiners Mark & What Gets a 7 | IBLens",
    description: "What separates a band 5 essay from a band 7: how IB criterion-based marking works, what examiners look for at each level, and how to self-assess your work before submission.",
    ogType: "article",
    canonical: "/resources/ib-essay-criteria-explained",
    schemaType: "Article",
  },
  "/resources/how-iblens-works": {
    title: "How IBLens Works \u2014 AI IB Essay Analysis Explained | IBLens",
    description: "How the IBLens AI analyzes IB essays: which rubrics it uses, how it predicts scores, what the output includes, and how it compares to tutors and teacher feedback.",
    ogType: "article",
    canonical: "/resources/how-iblens-works",
    schemaType: "Article",
  },
  "/resources/ib-university-admissions": {
    title: "IB University Admissions 2026 \u2014 UK, US & Europe Requirements | IBLens",
    description: "How IB Diploma scores translate to university offers in the UK, US, EU, Canada, and Australia. Typical IB score requirements at Oxford, LSE, Ivy League, and other top universities.",
    ogType: "article",
    canonical: "/resources/ib-university-admissions",
    schemaType: "Article",
  },
  "/resources/ib-extended-essay-examples": {
    title: "IB Extended Essay Examples — High-Scoring EE Samples by Subject | IBLens",
    description: "Real IB Extended Essay examples with examiner commentary. Understand what a 7-scoring EE looks like and how to structure yours.",
    ogType: "article",
    canonical: "/resources/ib-extended-essay-examples",
    schemaType: "Article",
  },
  "/resources/ib-ia-score-predictor": {
    title: "IB IA Score Predictor — Estimate Your Internal Assessment Grade | IBLens",
    description: "Understand how IB Internal Assessment grades work, how moderation affects your score, and how to predict your IA grade before submission.",
    ogType: "article",
    canonical: "/resources/ib-ia-score-predictor",
    schemaType: "Article",
  },
  "/resources/ib-score-calculator": {
    title: "IB Score Calculator — Points, Grade Boundaries and Diploma Requirements | IBLens",
    description: "Calculate your IB Diploma total, understand grade boundaries, bonus points matrix, and what different scores mean for university admissions.",
    ogType: "article",
    canonical: "/resources/ib-score-calculator",
    schemaType: "Article",
  },
  "/resources/ib-university-admissions-strategy": {
    title: "IB University Admissions Strategy — How to Choose Universities | IBLens",
    description: "A practical guide to IB university admissions: build your school list, decode score requirements by country, and avoid common application mistakes.",
    ogType: "article",
    canonical: "/resources/ib-university-admissions-strategy",
    schemaType: "Article",
  },
  "/resources/ib-math-ia-examples": {
    title: "IB Math IA Examples — High-Scoring Topics and Structures | IBLens",
    description: "Real IB Math IA examples with examiner commentary. Learn which topics score 7s and what common mistakes cost marks on every criterion.",
    ogType: "article",
    canonical: "/resources/ib-math-ia-examples",
    schemaType: "Article",
  },
  "/resources/ib-biology-ia-examples": {
    title: "IB Biology IA Examples — Topics, Data, and How to Score a 7 | IBLens",
    description: "High-scoring IB Biology IA examples with analysis of what makes them work. Avoid the mistakes that drop competent students from a 6 to a 4.",
    ogType: "article",
    canonical: "/resources/ib-biology-ia-examples",
    schemaType: "Article",
  },
  "/resources/ib-economics-ia": {
    title: "IB Economics IA — How to Write All Three Commentaries and Score a 7 | IBLens",
    description: "Complete guide to the IB Economics Internal Assessment: how to choose articles, structure each commentary, use diagrams correctly, and avoid mark-losing mistakes.",
    ogType: "article",
    canonical: "/resources/ib-economics-ia",
    schemaType: "Article",
  },
  "/resources/ib-extended-essay-word-count": {
    title: "IB Extended Essay Word Count — The 4000-Word Limit Explained | IBLens",
    description: "What counts toward the 4000-word limit, what does not, how close to the limit to aim, and what happens if you go over.",
    ogType: "article",
    canonical: "/resources/ib-extended-essay-word-count",
    schemaType: "Article",
  },
  "/resources/ib-extended-essay-help": {
    title: "IB Extended Essay Help — Fix Every Stage of Your EE and Score Higher | IBLens",
    description: "Stuck on your IB Extended Essay? Get help with topic choice, research question, structure, each criterion, and how to get examiner-level feedback that actually improves your grade.",
    ogType: "article",
    canonical: "/resources/ib-extended-essay-help",
    schemaType: "Article",
  },
  "/resources/ib-chemistry-ia-examples": {
    title: "IB Chemistry IA Examples — Topics, Methods, and How to Score a 7 | IBLens",
    description: "High-scoring IB Chemistry IA examples with examiner analysis. Learn which investigation types earn top marks and how to handle uncertainty and evaluation.",
    ogType: "article",
    canonical: "/resources/ib-chemistry-ia-examples",
    schemaType: "Article",
  },
  "/resources/ib-physics-ia-examples": {
    title: "IB Physics IA Examples — Investigation Ideas and How to Score a 7 | IBLens",
    description: "High-scoring IB Physics IA examples with examiner commentary. Discover which investigations earn top marks and how to handle uncertainty propagation.",
    ogType: "article",
    canonical: "/resources/ib-physics-ia-examples",
    schemaType: "Article",
  },
  "/resources/ib-psychology-ia": {
    title: "IB Psychology IA — How to Design Your Replication Study and Score a 7 | IBLens",
    description: "Complete guide to the IB Psychology Internal Assessment: choose a study to replicate, design an ethical experiment, analyse results statistically.",
    ogType: "article",
    canonical: "/resources/ib-psychology-ia",
    schemaType: "Article",
  },
  "/resources/ib-history-ia": {
    title: "IB History IA — How to Write Your Historical Investigation and Score a 7 | IBLens",
    description: "Complete guide to the IB History Internal Assessment: how to choose a research question, structure the three sections, evaluate sources with OPCVL.",
    ogType: "article",
    canonical: "/resources/ib-history-ia",
    schemaType: "Article",
  },
  "/resources/ib-ee-examples-by-subject": {
    title: "IB EE Examples by Subject — What a 7-Scoring Extended Essay Looks Like | IBLens",
    description: "Concrete IB Extended Essay examples across Economics, History, Biology, English, Psychology, Mathematics, and Physics. Understand what separates a grade 7 EE.",
    ogType: "article",
    canonical: "/resources/ib-ee-examples-by-subject",
    schemaType: "Article",
  },
  "/resources/ib-ia-grader": {
    title: "IB IA Grader — Free AI Internal Assessment Grader for All Subjects | IBLens",
    description: "Free IB IA grader powered by AI. Grade your Internal Assessment against official IB rubrics for Biology, Chemistry, Physics, Maths, History, Economics, Psychology and more.",
    ogType: "article",
    canonical: "/resources/ib-ia-grader",
    schemaType: "Article",
  },
  "/resources/ib-extended-essay-new-criteria-2027": {
    title: "IB Extended Essay New Criteria 2027 — Marked Out of 30, Explained | IBLens",
    description: "From the May 2027 session the IB Extended Essay is marked out of 30 under five new criteria — Framework, Knowledge and understanding, Analysis and line of argument, Discussion and evaluation, Reflection. What changed from the 34-mark rubric and how to check your draft.",
    ogType: "article",
    canonical: "/resources/ib-extended-essay-new-criteria-2027",
    schemaType: "Article",
  },
  "/resources/tok-essay-checklist": {
    title: "TOK Essay Checklist — Check Your Essay Against the IB Criteria | IBLens",
    description: "A practical TOK essay checklist built on the official holistic assessment instrument: the five bands out of 10, the exact question examiners ask, and the concrete checks to run on your draft before submission — no tutor needed.",
    ogType: "article",
    canonical: "/resources/tok-essay-checklist",
    schemaType: "Article",
  },
  "/resources/ib-psychology-ia-2027": {
    title: "IB Psychology IA Changes 2027 — Research Proposal Marked /24 | IBLens",
    description: "From the May 2027 session the IB Psychology IA becomes a research proposal marked out of 24 — no experiment is conducted. New criteria explained, what changed from the 22-mark report, and how to check your draft.",
    ogType: "article",
    canonical: "/resources/ib-psychology-ia-2027",
    schemaType: "Article",
  },
  "/resources/ib-computer-science-ia-2027": {
    title: "IB Computer Science IA Changes 2027 — Marked Out of 30 | IBLens",
    description: "From the May 2027 session the IB Computer Science IA is a computational solution marked out of 30: Problem specification, Planning, System overview, Development (12 marks), Evaluation. What changed from the 34-mark solution.",
    ogType: "article",
    canonical: "/resources/ib-computer-science-ia-2027",
    schemaType: "Article",
  },
  "/resources/ib-extended-essay-feedback": {
    title: "IB Extended Essay Feedback — How to Get It Before You Submit | IBLens",
    description: "Every legitimate way to get feedback on your IB Extended Essay before submission: supervisor rules, self-checking against the criteria, peers, and where AI feedback fits — with the limits of each channel.",
    ogType: "article",
    canonical: "/resources/ib-extended-essay-feedback",
    schemaType: "Article",
  },
  "/resources/ib-coursework-review-tools": {
    title: "AI Tools IB Students Use to Review Coursework — 2026 Comparison | IBLens",
    description: "An honest comparison of AI tools IB students use to review IAs, EEs and TOK work: IBLens, RevisionDojo, MyRevisionAgent, Clastify and generic chatbots — coverage, pricing models, free tiers, May 2027 EE rubric support.",
    ogType: "article",
    canonical: "/resources/ib-coursework-review-tools",
    schemaType: "Article",
  },
  "/resources/tok-exhibition-checklist": {
    title: "TOK Exhibition Checklist — Check Your Commentary Against the IB Criteria | IBLens",
    description: "Check your TOK exhibition commentary against the official holistic instrument: the examiner question, five bands out of 10, and concrete checks for your three objects, contexts and IA prompt links.",
    ogType: "article",
    canonical: "/resources/tok-exhibition-checklist",
    schemaType: "Article",
  },
  "/resources/ib-ia-feedback": {
    title: "IB IA Feedback — Check Your IA Against the Official Criteria | IBLens",
    description: "How to check your IB Internal Assessment against the official criteria without a tutor: what each subject is marked out of, where the heaviest criteria sit, and a self-check sequence for any subject.",
    ogType: "article",
    canonical: "/resources/ib-ia-feedback",
    schemaType: "Article",
  },
  "/resources/tok-essay-format": {
    title: "IB TOK Essay Format — Word Count, Structure & Formatting Rules | IBLens",
    description: "Official IB TOK essay format: 1,600-word limit, introduction and body structure, citation requirements, what counts towards the word count, and examiner formatting expectations.",
    ogType: "article",
    canonical: "/resources/tok-essay-format",
    schemaType: "Article",
  },
  "/resources/tok-essay-structure": {
    title: "IB TOK Essay Structure 2026 — How to Structure Your Theory of Knowledge Essay | IBLens",
    description: "Step-by-step IB TOK essay structure: introduction, knowledge claims, counter-claims, conclusion. Paragraph-by-paragraph guide and examiner tips for 2026.",
    ogType: "website",
    canonical: "/resources/tok-essay-structure",
    schemaType: "Article",
    faq: [
      { question: "What is the structure of a TOK essay?", answer: "A TOK essay has an introduction (150–200 words), two body sections each covering one Area of Knowledge using claim/counter-claim structure (500–600 words each), and a conclusion (200–250 words). Total: 1,600 words maximum." },
      { question: "How many Areas of Knowledge should a TOK essay cover?", answer: "Two Areas of Knowledge. Covering three or more AOKs means insufficient depth in each. Choose two that create a meaningful contrast — for example, Natural Sciences and Arts, or History and Mathematics." },
      { question: "What is a knowledge claim in TOK?", answer: "A knowledge claim is an assertion about how knowledge works in a specific Area of Knowledge. It must be arguable — not a fact or opinion — and must be supported by a specific real-world example and challenged by a counter-claim." },
    ],
  },
  "/resources/ib-university-consultant-cost": {
    title: "IB University Guidance — Temporarily Unavailable | IBLens",
    description: "This part of IBLens is being rebuilt on verified, official university requirements and deadlines. In the meantime, grade your IB essays free with IBLens.",
    ogType: "website",
    canonical: "/resources/ib-university-consultant-cost",
    schemaType: "WebPage",
  },
  "/resources/ib-university-chances": {
    title: "IB University Chances — Temporarily Unavailable | IBLens",
    description: "This part of IBLens is being rebuilt on verified, official university requirements and deadlines. In the meantime, grade your IB essays free with IBLens.",
    ogType: "website",
    canonical: "/resources/ib-university-chances",
    schemaType: "WebPage",
  },
  "/resources/ib-biology-extended-essay": {
    title: "IB Biology Extended Essay — Research Questions, Examples & Score an A | IBLens",
    description: "Complete guide to the IB Biology Extended Essay: choosing a research question, EE vs IA differences, assessment criteria A–E, structure, high-scoring topics, and RPPF guidance.",
    ogType: "article",
    canonical: "/resources/ib-biology-extended-essay",
    schemaType: "Article",
  },
  "/resources/ib-chemistry-extended-essay": {
    title: "IB Chemistry Extended Essay — Research Questions, Topics & Score an A | IBLens",
    description: "Full guide to the IB Chemistry Extended Essay: research question examples, assessment criteria, structure, high-scoring topics (kinetics, electrochemistry, colorimetry), and common pitfalls.",
    ogType: "article",
    canonical: "/resources/ib-chemistry-extended-essay",
    schemaType: "Article",
  },
  "/resources/ib-history-extended-essay": {
    title: "IB History Extended Essay — Research Questions & Tips | IBLens",
    description: "How to write an IB History Extended Essay: strong research questions, source evaluation and historiography, criteria A–E, common mistakes and grading tips.",
    ogType: "article",
    canonical: "/resources/ib-history-extended-essay",
    schemaType: "Article",
    faq: [
      { question: "Can I write my History EE on a recent event?", answer: "Very recent topics are risky. The History EE rewards engagement with historiography, and events from the last few years rarely have an established body of historical writing. Choose a topic old enough that historians have debated it, and confirm your choice with your supervisor." },
      { question: "How many sources does a History EE need?", answer: "There is no official number. Strong essays typically combine a small set of primary sources analysed in depth with a range of secondary works representing different interpretations. Depth of evaluation matters far more than the length of the bibliography." },
      { question: "Is History a hard subject for the Extended Essay?", answer: "History EEs are marked against the same five criteria as every other subject, but Criterion C rewards argument and evaluation of interpretations rather than narrative. Students who retell events tend to score in the middle bands; students who argue a focused case can score highly." },
    ],
  },
  "/resources/ib-english-extended-essay": {
    title: "IB English Extended Essay — Research Questions & Tips | IBLens",
    description: "How to write an IB English Extended Essay: analytical research questions, close reading over plot summary, criteria A–E, common mistakes and grading tips.",
    ogType: "article",
    canonical: "/resources/ib-english-extended-essay",
    schemaType: "Article",
    faq: [
      { question: "How many texts should an English EE analyse?", answer: "Most successful essays focus on one or two literary works. A single novel analysed deeply almost always beats four texts surveyed superficially, because Criterion C rewards sustained analysis rather than coverage." },
      { question: "Can I use secondary criticism in an English EE?", answer: "Yes, and strong essays usually do — but critics should support or sharpen your own argument, not replace it. Quote critics to position your reading, then return to the primary text for evidence." },
      { question: "How is the English EE different from a class literature essay?", answer: "Scale and independence. The EE is a 4,000-word argument built around your own research question, assessed against criteria A–E, with a reflection component (the RPPF). It demands a sharper question and more sustained analysis than classroom essays." },
    ],
  },
  "/resources/ib-economics-extended-essay": {
    title: "IB Economics Extended Essay — Research Questions & Tips | IBLens",
    description: "How to write an IB Economics Extended Essay: focused research questions, applying theory and real data with diagrams, criteria A–E and common mistakes.",
    ogType: "article",
    canonical: "/resources/ib-economics-extended-essay",
    schemaType: "Article",
    faq: [
      { question: "Does an Economics EE need primary data?", answer: "Not necessarily. Strong essays can be built on either primary data (prices you collect, surveys) or good secondary data, as long as the data genuinely tests the question. What matters is that theory is applied to real evidence rather than discussed in the abstract." },
      { question: "How many diagrams should an Economics EE include?", answer: "Use as many as your argument needs — typically several — but every diagram must be adapted to your specific market and referred to in the analysis. Generic textbook diagrams that are never used to explain your data earn little credit." },
      { question: "Can I write my Economics EE on a macroeconomic topic?", answer: "You can, but scope is the danger. Whole-economy questions are hard to answer convincingly in 4,000 words. Narrowing to one policy, one market or one country over a defined period usually produces a stronger essay." },
    ],
  },
  "/resources/ib-psychology-extended-essay": {
    title: "IB Psychology Extended Essay — RQs, Criteria & Tips | IBLens",
    description: "How to write an IB Psychology Extended Essay: research questions, engaging real studies critically, avoiding pop psychology, criteria A–E and common mistakes.",
    ogType: "article",
    canonical: "/resources/ib-psychology-extended-essay",
    schemaType: "Article",
    faq: [
      { question: "Can I run my own experiment for a Psychology EE?", answer: "The Psychology EE is expected to be based on published research rather than your own data collection. Your originality comes from the argument you build — how you select, compare and evaluate existing studies to answer a focused question." },
      { question: "How many studies should a Psychology EE discuss?", answer: "Enough to sustain an argument, evaluated properly — often a core of several studies examined in depth. Listing many studies descriptively scores worse than critically comparing a smaller set, because Criterion C rewards evaluation, not coverage." },
      { question: "How is the Psychology EE different from the Psychology IA?", answer: "The IA is a replication of a published experiment with your own data and statistics. The EE is a 4,000-word argumentative essay built on published research, marked against criteria A–E, with no data collection of your own." },
    ],
  },
  "/auth/signin": {
    title: "Sign In \u2014 IBLens",
    description: "Sign in to IBLens to access your IB essay analyses, purchase history, and personalized university strategies.",
    ogType: "website",
    canonical: "/auth/signin",
    schemaType: "WebPage",
  },
  // Programmatic subject pages
  "/essay/business-management-ia": {
    title: "IB Business Management IA Grader \u2014 Free AI Feedback | IBLens",
    description: "Get instant AI feedback on your IB Business Management Internal Assessment. Criterion-by-criterion scoring against the official IB rubric. First analysis free \u2014 no account needed.",
    ogType: "website",
    canonical: "/essay/business-management-ia",
    schemaType: "WebPage",
  },
  "/essay/economics-ia": {
    title: "IB Economics IA Grader \u2014 Free AI Feedback on Commentary | IBLens",
    description: "AI feedback on your IB Economics IA commentary. Checks diagrams, economic analysis, and evaluation against official IB Economics criteria. Free first check.",
    ogType: "website",
    canonical: "/essay/economics-ia",
    schemaType: "WebPage",
  },
  "/essay/history-ia": {
    title: "IB History IA Grader \u2014 Free AI Feedback & Score Prediction | IBLens",
    description: "AI-powered feedback on your IB History Internal Assessment. Source evaluation, investigation quality, and reflection \u2014 all scored against official IB History criteria.",
    ogType: "website",
    canonical: "/essay/history-ia",
    schemaType: "WebPage",
  },
  "/essay/biology-ia": {
    title: "IB Biology IA Grader \u2014 Free AI Feedback on Lab Report | IBLens",
    description: "Instant AI feedback on your IB Biology Internal Assessment. Exploration, analysis, evaluation, and communication scored against official IB criteria. Free.",
    ogType: "website",
    canonical: "/essay/biology-ia",
    schemaType: "WebPage",
  },
  "/essay/chemistry-ia": {
    title: "IB Chemistry IA Grader \u2014 Free AI Feedback on Lab Report | IBLens",
    description: "Get AI feedback on your IB Chemistry Internal Assessment. All 5 criteria scored against the official IB Chemistry rubric. First analysis free.",
    ogType: "website",
    canonical: "/essay/chemistry-ia",
    schemaType: "WebPage",
  },
  "/essay/physics-ia": {
    title: "IB Physics IA Grader \u2014 Free AI Feedback on Investigation | IBLens",
    description: "AI-powered feedback on your IB Physics Internal Assessment. All 5 criteria: personal engagement, exploration, analysis, evaluation, communication. Free.",
    ogType: "website",
    canonical: "/essay/physics-ia",
    schemaType: "WebPage",
  },
  "/essay/math-ia": {
    title: "IB Math IA Grader \u2014 Free AI Feedback on Exploration | IBLens",
    description: "Get instant AI feedback on your IB Mathematics IA exploration. Communication, mathematical presentation, personal engagement \u2014 all scored against official IB Math criteria.",
    ogType: "website",
    canonical: "/essay/math-ia",
    schemaType: "WebPage",
  },
  "/essay/psychology-ia": {
    title: "IB Psychology IA Grader \u2014 Free AI Feedback on Research Report | IBLens",
    description: "AI feedback on your IB Psychology Internal Assessment. Introduction, method, results, discussion, and conclusion scored against official IB Psychology criteria.",
    ogType: "website",
    canonical: "/essay/psychology-ia",
    schemaType: "WebPage",
  },
  "/essay/english-essay": {
    title: "IB English Essay Grader \u2014 Free AI Feedback on HL Essay & IA | IBLens",
    description: "AI feedback on IB English Language & Literature essays and HL essays. Knowledge, analysis, focus, and language scored against official IB English criteria. Free.",
    ogType: "website",
    canonical: "/essay/english-essay",
    schemaType: "WebPage",
  },
  "/essay/extended-essay": {
    title: "IB Extended Essay Grader \u2014 Free AI Feedback on Your EE | IBLens",
    description: "AI feedback on your IB Extended Essay against both official rubrics: the current 34-mark criteria and the new 30-mark May 2027 criteria. Criterion-by-criterion report with a free preview.",
    ogType: "website",
    canonical: "/essay/extended-essay",
    schemaType: "WebPage",
  },
  "/essay/tok-essay": {
    title: "IB TOK Essay Grader \u2014 Free AI Feedback on Theory of Knowledge | IBLens",
    description: "AI feedback on your IB Theory of Knowledge essay. Knowledge claims, counter-claims, Areas of Knowledge \u2014 all scored against the official IB TOK criteria. Free first check.",
    ogType: "website",
    canonical: "/essay/tok-essay",
    schemaType: "WebPage",
  },
  "/essay/computer-science-ia": {
    title: "IB Computer Science IA Grader — Free AI Feedback on Your Solution | IBLens",
    description: "AI feedback on your IB Computer Science IA. Planning, development, functionality, evaluation — all scored against the official IB CS criteria. Free first check.",
    ogType: "website",
    canonical: "/essay/computer-science-ia",
    schemaType: "WebPage",
  },
  "/essay/tok-exhibition": {
    title: "IB TOK Exhibition Grader — Free AI Feedback on All 3 Objects | IBLens",
    description: "AI feedback on your IB Theory of Knowledge Exhibition. Check if your objects make convincing links to the IA prompt and to TOK concepts — scored against the official IB rubric.",
    ogType: "website",
    canonical: "/essay/tok-exhibition",
    schemaType: "WebPage",
  },
  "/essay/maths-aa-ia": {
    title: "IB Math AA IA Grader — Free AI Feedback on Analysis & Approaches | IBLens",
    description: "AI feedback on your IB Mathematics: Analysis and Approaches IA. Communication, mathematical presentation, personal engagement — all scored against the official IB criteria.",
    ogType: "website",
    canonical: "/essay/maths-aa-ia",
    schemaType: "WebPage",
  },
  "/essay/maths-ai-ia": {
    title: "IB Math AI IA Grader — Free AI Feedback on Applications & Interpretation | IBLens",
    description: "AI feedback on your IB Mathematics: Applications and Interpretation IA. Communication, personal engagement, use of mathematics — all scored against official IB criteria.",
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

  // Inject/replace description, og:title, og:description, canonical before </head>
  const canonicalUrl = `${SITE_URL}${meta.canonical}`;
  const metaTags = `
    <meta name="description" content="${meta.description}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />`;

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
