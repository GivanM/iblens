import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "English Essay",
  slug: "english-essay",
  keyword: "IB English essay",
  metaTitle: "IB English IA & Essay Grader — Free AI Feedback | IBLens",
  metaDescription:
    "AI feedback on IB English Language & Literature essays and HL essays. Criterion-by-criterion scoring on knowledge, analysis, and language. First analysis free.",
  canonicalPath: "/essay/english-essay",
  heroHeadline: "Get your IB English essay graded in 60 seconds",
  heroSubline:
    "Paste your IB English Language & Literature essay or HL essay and receive instant criterion-level feedback — free, no account required.",
  criteria: [
    { name: "Criterion A: Knowledge & Understanding", max: 5, sampleScore: 3 },
    { name: "Criterion B: Analysis & Evaluation", max: 5, sampleScore: 3 },
    { name: "Criterion C: Focus & Organization", max: 5, sampleScore: 4 },
    { name: "Criterion D: Language", max: 5, sampleScore: 4 },
  ],
  relatedSubjects: [
    { label: "History IA", href: "/essay/history-ia" },
    { label: "Psychology IA", href: "/essay/psychology-ia" },
    { label: "Economics IA", href: "/essay/economics-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function EnglishEssay() {
  return <SubjectEssayPage config={config} />;
}
