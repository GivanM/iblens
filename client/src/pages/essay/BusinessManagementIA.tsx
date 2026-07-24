import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Business Management IA",
  slug: "business-management-ia",
  keyword: "IB Business Management IA",
  metaTitle: "IB Business Management IA Grader — Free AI Feedback | IBLens",
  metaDescription:
    "Get instant AI feedback on your IB Business Management Internal Assessment. Criterion-by-criterion scoring against official IB rubric. First analysis free.",
  canonicalPath: "/essay/business-management-ia",
  heroHeadline: "Is your Business Management IA scoring where you think it is?",
  heroSubline:
    "Paste your IA text and get a full criterion-by-criterion grade report in 60 seconds — scored against the official IB Business Management rubric.",
  criteria: [
    { name: "Criterion A: Integration of a key concept", max: 5, sampleScore: 3 },
    { name: "Criterion B: Supporting documents", max: 4, sampleScore: 3 },
    { name: "Criterion C: Selection and application of tools and theories", max: 4, sampleScore: 2 },
    { name: "Criterion D: Analysis and evaluation", max: 5, sampleScore: 3 },
    { name: "Criterion E: Conclusions", max: 3, sampleScore: 2 },
    { name: "Criterion F: Structure", max: 2, sampleScore: 1 },
    { name: "Criterion G: Presentation", max: 2, sampleScore: 2 },
  ],
  relatedSubjects: [
    { label: "Economics IA", href: "/essay/economics-ia" },
    { label: "History IA", href: "/essay/history-ia" },
    { label: "Psychology IA", href: "/essay/psychology-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function BusinessManagementIA() {
  return <SubjectEssayPage config={config} />;
}
