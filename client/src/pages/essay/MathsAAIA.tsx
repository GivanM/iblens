import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Mathematics: Analysis and Approaches IA",
  slug: "maths-aa-ia",
  keyword: "IB Math AA IA",
  metaTitle: "IB Math AA IA Grader — Free AI Feedback on Analysis & Approaches | IBLens",
  metaDescription:
    "AI feedback on your IB Mathematics: Analysis and Approaches IA exploration. Communication, mathematical presentation, personal engagement, reflection, and use of mathematics — scored against the official IB criteria.",
  canonicalPath: "/essay/maths-aa-ia",
  heroHeadline: "Is your IB Math AA exploration heading for a 6 or a 4?",
  heroSubline:
    "Paste your Mathematics: Analysis and Approaches IA and get criterion-by-criterion feedback — including Use of Mathematics and Personal Engagement — in 60 seconds. Free first check.",
  criteria: [
    { name: "Communication", max: 4, sampleScore: 3 },
    { name: "Mathematical Presentation", max: 3, sampleScore: 2 },
    { name: "Personal Engagement", max: 3, sampleScore: 2 },
    { name: "Reflection", max: 3, sampleScore: 2 },
    { name: "Use of Mathematics", max: 6, sampleScore: 4 },
  ],
  relatedSubjects: [
    { label: "Math AI IA", href: "/essay/maths-ai-ia" },
    { label: "Physics IA", href: "/essay/physics-ia" },
    { label: "Chemistry IA", href: "/essay/chemistry-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function MathsAAIA() {
  return <SubjectEssayPage config={config} />;
}
