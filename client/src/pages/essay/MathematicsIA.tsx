import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Mathematics IA",
  slug: "math-ia",
  keyword: "IB Math IA",
  metaTitle: "IB Math IA Grader, Free AI Feedback on Exploration | IBLens",
  metaDescription:
    "Get AI feedback in about 90 seconds on your IB Mathematics Internal Assessment exploration. Presentation, mathematical communication, personal engagement, reflection and use of mathematics, all scored against IB criteria.",
  canonicalPath: "/essay/math-ia",
  heroHeadline: "Is your IB Math exploration heading for a 6 or a 4?",
  heroSubline:
    "Paste your Math IA exploration and get a criterion-by-criterion score, including Use of mathematics, Mathematical communication and Personal engagement, free preview first, full report $9.99.",
  criteria: [
    { name: "Presentation", max: 4, sampleScore: 3 },
    { name: "Mathematical communication", max: 4, sampleScore: 3 },
    { name: "Personal engagement", max: 3, sampleScore: 2 },
    { name: "Reflection", max: 3, sampleScore: 1 },
    { name: "Use of mathematics", max: 6, sampleScore: 4 },
  ],
  relatedResources: [
    { label: "Math IA examples", href: "/resources/ib-math-ia-examples" },
    { label: "Maths AA IA grader", href: "/essay/maths-aa-ia" },
    { label: "Maths AI IA grader", href: "/essay/maths-ai-ia" },
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
