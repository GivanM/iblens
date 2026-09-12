import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Extended Essay",
  slug: "extended-essay",
  keyword: "IB Extended Essay",
  metaTitle: "IB Extended Essay Grader, Free AI Feedback on Your EE | IBLens",
  metaDescription:
    "AI feedback on your IB Extended Essay against both official rubrics: the current 34-mark criteria and the new 30-mark May 2027 criteria. Criterion-by-criterion report with a free preview.",
  canonicalPath: "/essay/extended-essay",
  heroHeadline: "Know your Extended Essay grade before you submit",
  heroSubline:
    "Paste your Extended Essay and get a criterion-level report, focus, knowledge, critical thinking, presentation, and engagement, free preview first, full report $9.99.",
  criteria: [
    { name: "Criterion A: Focus & Method", max: 6, sampleScore: 4 },
    { name: "Criterion B: Knowledge & Understanding", max: 6, sampleScore: 4 },
    { name: "Criterion C: Critical Thinking", max: 12, sampleScore: 7 },
    { name: "Criterion D: Presentation", max: 4, sampleScore: 3 },
    { name: "Criterion E: Engagement", max: 6, sampleScore: 4 },
  ],
  relatedResources: [
    { label: "IB Extended Essay Guide", href: "/resources/ib-extended-essay-guide" },
    { label: "New criteria for May 2027", href: "/resources/ib-extended-essay-new-criteria-2027" },
    { label: "How to get feedback before you submit", href: "/resources/ib-extended-essay-feedback" },
    { label: "The 4,000-word limit", href: "/resources/ib-extended-essay-word-count" },
    { label: "EE examples by subject", href: "/resources/ib-ee-examples-by-subject" },
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
