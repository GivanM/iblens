import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "History IA",
  slug: "history-ia",
  keyword: "IB History IA",
  metaTitle: "IB History IA Grader — Free AI Feedback & Score Prediction | IBLens",
  metaDescription:
    "AI-powered feedback on your IB History Internal Assessment. Source evaluation, investigation quality, and reflection — all scored against official IB History criteria.",
  canonicalPath: "/essay/history-ia",
  heroHeadline: "Find out if your History IA will pass before it's too late",
  heroSubline:
    "Get your History IA scored across all three sections — sources, investigation, and reflection — against the official IB rubric in 60 seconds.",
  criteria: [
    { name: "Section 1: Identification & Evaluation of Sources", max: 6, sampleScore: 4 },
    { name: "Section 2: Investigation", max: 15, sampleScore: 9 },
    { name: "Section 3: Reflection", max: 4, sampleScore: 2 },
  ],
  relatedSubjects: [
    { label: "English Essay", href: "/essay/english-essay" },
    { label: "Economics IA", href: "/essay/economics-ia" },
    { label: "Psychology IA", href: "/essay/psychology-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function HistoryIA() {
  return <SubjectEssayPage config={config} />;
}
