import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Psychology IA",
  slug: "psychology-ia",
  keyword: "IB Psychology IA",
  metaTitle: "IB Psychology IA Grader — Free AI Feedback on Research Report | IBLens",
  metaDescription:
    "AI feedback on your IB Psychology Internal Assessment. Introduction, method, results, discussion, and conclusion — all scored against official IB Psychology criteria.",
  canonicalPath: "/essay/psychology-ia",
  heroHeadline: "Get your IB Psychology IA scored against the real IB rubric",
  heroSubline:
    "Paste your Psychology IA research report and find out exactly where you're losing marks — criterion by criterion, in 60 seconds.",
  criteria: [
    { name: "Introduction", max: 6, sampleScore: 4 },
    { name: "Exploration", max: 4, sampleScore: 3 },
    { name: "Analysis", max: 6, sampleScore: 3 },
    { name: "Evaluation", max: 6, sampleScore: 3 },
  ],
  relatedSubjects: [
    { label: "Biology IA", href: "/essay/biology-ia" },
    { label: "History IA", href: "/essay/history-ia" },
    { label: "English Essay", href: "/essay/english-essay" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function PsychologyIA() {
  return <SubjectEssayPage config={config} />;
}
