import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Mathematics: Applications and Interpretation IA",
  slug: "maths-ai-ia",
  keyword: "IB Math AI IA",
  metaTitle: "IB Math AI IA Grader — Free AI Feedback on Applications & Interpretation | IBLens",
  metaDescription:
    "AI feedback on your IB Mathematics: Applications and Interpretation IA exploration. Communication, mathematical presentation, personal engagement, reflection, and use of mathematics — all scored against official IB criteria.",
  canonicalPath: "/essay/maths-ai-ia",
  heroHeadline: "Is your IB Math AI exploration on track for a top score?",
  heroSubline:
    "Paste your Mathematics: Applications and Interpretation IA and get criterion-by-criterion feedback in 60 seconds — including Use of Mathematics and Reflection. Free first check.",
  criteria: [
    { name: "Communication", max: 4, sampleScore: 3 },
    { name: "Mathematical Presentation", max: 3, sampleScore: 2 },
    { name: "Personal Engagement", max: 3, sampleScore: 2 },
    { name: "Reflection", max: 3, sampleScore: 2 },
    { name: "Use of Mathematics", max: 6, sampleScore: 4 },
  ],
  relatedSubjects: [
    { label: "Math AA IA", href: "/essay/maths-aa-ia" },
    { label: "Physics IA", href: "/essay/physics-ia" },
    { label: "Economics IA", href: "/essay/economics-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function MathsAIIA() {
  return <SubjectEssayPage config={config} />;
}
