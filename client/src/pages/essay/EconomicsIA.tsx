import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Economics IA",
  slug: "economics-ia",
  keyword: "IB Economics IA",
  metaTitle: "IB Economics IA Grader — Free AI Feedback on Commentary | IBLens",
  metaDescription:
    "AI feedback on your IB Economics Internal Assessment commentary. Checks diagram quality, economic analysis, and evaluation against IB criteria. Free first check.",
  canonicalPath: "/essay/economics-ia",
  heroHeadline: "Get your IB Economics IA graded before your teacher does",
  heroSubline:
    "Paste your Economics IA commentary and find out exactly which criteria are costing you marks — in under 60 seconds.",
  criteria: [
    { name: "Criterion A: Diagrams", max: 3, sampleScore: 2 },
    { name: "Criterion B: Terminology", max: 2, sampleScore: 2 },
    { name: "Criterion C: Application", max: 3, sampleScore: 2 },
    { name: "Criterion D: Analysis", max: 3, sampleScore: 1 },
    { name: "Criterion E: Evaluation", max: 4, sampleScore: 2 },
  ],
  relatedSubjects: [
    { label: "Business Management IA", href: "/essay/business-management-ia" },
    { label: "History IA", href: "/essay/history-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
    { label: "Psychology IA", href: "/essay/psychology-ia" },
  ],
};

export default function EconomicsIA() {
  return <SubjectEssayPage config={config} />;
}
