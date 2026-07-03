import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Biology IA",
  slug: "biology-ia",
  keyword: "IB Biology IA",
  metaTitle: "IB Biology IA Grader — Free AI Feedback on Lab Report | IBLens",
  metaDescription:
    "Instant AI feedback on your IB Biology Internal Assessment. Checks exploration, analysis, evaluation, and communication against official IB criteria. Free.",
  canonicalPath: "/essay/biology-ia",
  heroHeadline: "Is your Biology IA experiment losing marks you don't know about?",
  heroSubline:
    "Paste your Biology IA report and get criterion-by-criterion feedback against the official IB Science rubric — free in 60 seconds.",
  criteria: [
    { name: "Personal Engagement", max: 2, sampleScore: 1 },
    { name: "Exploration", max: 6, sampleScore: 4 },
    { name: "Analysis", max: 6, sampleScore: 3 },
    { name: "Evaluation", max: 6, sampleScore: 3 },
    { name: "Communication", max: 4, sampleScore: 3 },
  ],
  relatedSubjects: [
    { label: "Chemistry IA", href: "/essay/chemistry-ia" },
    { label: "Physics IA", href: "/essay/physics-ia" },
    { label: "Mathematics IA", href: "/essay/math-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function BiologyIA() {
  return <SubjectEssayPage config={config} />;
}
