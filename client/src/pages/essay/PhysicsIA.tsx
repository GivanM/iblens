import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Physics IA",
  slug: "physics-ia",
  keyword: "IB Physics IA",
  metaTitle: "IB Physics IA Grader — Free AI Feedback on Investigation | IBLens",
  metaDescription:
    "AI-powered feedback on your IB Physics Internal Assessment. Checks all 5 criteria: personal engagement, exploration, analysis, evaluation, and communication.",
  canonicalPath: "/essay/physics-ia",
  heroHeadline: "Your IB Physics IA scored by the same criteria your examiner uses",
  heroSubline:
    "Paste your Physics IA investigation and get a full criterion-level breakdown with a prioritised improvement plan — free in 60 seconds.",
  criteria: [
    { name: "Personal Engagement", max: 2, sampleScore: 1 },
    { name: "Exploration", max: 6, sampleScore: 4 },
    { name: "Analysis", max: 6, sampleScore: 3 },
    { name: "Evaluation", max: 6, sampleScore: 3 },
    { name: "Communication", max: 4, sampleScore: 3 },
  ],
  relatedSubjects: [
    { label: "Chemistry IA", href: "/essay/chemistry-ia" },
    { label: "Biology IA", href: "/essay/biology-ia" },
    { label: "Mathematics IA", href: "/essay/math-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function PhysicsIA() {
  return <SubjectEssayPage config={config} />;
}
