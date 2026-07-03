import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Extended Essay",
  slug: "extended-essay",
  keyword: "IB Extended Essay",
  metaTitle: "IB Extended Essay Grader — Free AI Feedback on Your EE | IBLens",
  metaDescription:
    "AI-powered feedback on your IB Extended Essay. All 5 criteria: focus & method, knowledge & understanding, critical thinking, presentation, and engagement. Free first check.",
  canonicalPath: "/essay/extended-essay",
  heroHeadline: "Know your Extended Essay grade before you submit",
  heroSubline:
    "Paste your Extended Essay and get a full criterion-level report — focus, knowledge, critical thinking, presentation, and engagement — in 60 seconds.",
  criteria: [
    { name: "Criterion A: Focus & Method", max: 6, sampleScore: 4 },
    { name: "Criterion B: Knowledge & Understanding", max: 6, sampleScore: 4 },
    { name: "Criterion C: Critical Thinking", max: 12, sampleScore: 7 },
    { name: "Criterion D: Presentation", max: 4, sampleScore: 3 },
    { name: "Criterion E: Engagement", max: 6, sampleScore: 4 },
  ],
  relatedSubjects: [
    { label: "Business Management IA", href: "/essay/business-management-ia" },
    { label: "Economics IA", href: "/essay/economics-ia" },
    { label: "History IA", href: "/essay/history-ia" },
    { label: "English Essay", href: "/essay/english-essay" },
  ],
};

export default function ExtendedEssay() {
  return <SubjectEssayPage config={config} />;
}
