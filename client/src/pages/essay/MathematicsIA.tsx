import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Mathematics IA",
  slug: "math-ia",
  keyword: "IB Math IA",
  metaTitle: "IB Math IA Grader — Free AI Feedback on Exploration | IBLens",
  metaDescription:
    "Get instant AI feedback on your IB Mathematics Internal Assessment exploration. Communication, mathematical presentation, personal engagement — all scored against IB criteria.",
  canonicalPath: "/essay/math-ia",
  heroHeadline: "Is your IB Math exploration heading for a 6 or a 4?",
  heroSubline:
    "Paste your Math IA exploration and get a criterion-by-criterion score — including Use of Mathematics, Communication, and Personal Engagement — in 60 seconds.",
  criteria: [
    { name: "Communication", max: 4, sampleScore: 3 },
    { name: "Mathematical Presentation", max: 3, sampleScore: 2 },
    { name: "Personal Engagement", max: 3, sampleScore: 2 },
    { name: "Reflection", max: 3, sampleScore: 1 },
    { name: "Use of Mathematics", max: 6, sampleScore: 4 },
  ],
  relatedSubjects: [
    { label: "Physics IA", href: "/essay/physics-ia" },
    { label: "Chemistry IA", href: "/essay/chemistry-ia" },
    { label: "Biology IA", href: "/essay/biology-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function MathematicsIA() {
  return <SubjectEssayPage config={config} />;
}
