import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Chemistry IA",
  slug: "chemistry-ia",
  keyword: "IB Chemistry IA",
  metaTitle: "IB Chemistry IA Grader — Free AI Feedback on Lab Report | IBLens",
  metaDescription:
    "Get AI feedback on your IB Chemistry Internal Assessment. Exploration, analysis, and evaluation scored against official IB Chemistry criteria. First analysis free.",
  canonicalPath: "/essay/chemistry-ia",
  heroHeadline: "Check your IB Chemistry IA against the official rubric — instantly",
  heroSubline:
    "Paste your Chemistry IA and find out how you'd score on every criterion, plus exactly what to improve before submission.",
  criteria: [
    { name: "Personal Engagement", max: 2, sampleScore: 1 },
    { name: "Exploration", max: 6, sampleScore: 4 },
    { name: "Analysis", max: 6, sampleScore: 3 },
    { name: "Evaluation", max: 6, sampleScore: 3 },
    { name: "Communication", max: 4, sampleScore: 3 },
  ],
  relatedSubjects: [
    { label: "Biology IA", href: "/essay/biology-ia" },
    { label: "Physics IA", href: "/essay/physics-ia" },
    { label: "Mathematics IA", href: "/essay/math-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function ChemistryIA() {
  return <SubjectEssayPage config={config} />;
}
