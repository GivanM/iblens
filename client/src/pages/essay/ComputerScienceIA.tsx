import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Computer Science IA",
  slug: "computer-science-ia",
  keyword: "IB Computer Science IA",
  metaTitle: "IB Computer Science IA Grader — Free AI Feedback | IBLens",
  metaDescription:
    "AI feedback on your IB Computer Science Internal Assessment. Criterion-by-criterion scoring against the official IB CS IA rubric. First analysis free — no account needed.",
  canonicalPath: "/essay/computer-science-ia",
  heroHeadline: "Is your Computer Science IA losing marks you can't see?",
  heroSubline:
    "Paste your IB CS IA and get criterion-by-criterion feedback against the official IB Computer Science rubric — free in 60 seconds.",
  criteria: [
    { name: "Criterion A: Planning", max: 6, sampleScore: 4 },
    { name: "Criterion B: Solution Overview", max: 6, sampleScore: 4 },
    { name: "Criterion C: Development", max: 12, sampleScore: 8 },
    { name: "Criterion D: Functionality & Extensibility", max: 4, sampleScore: 3 },
    { name: "Criterion E: Evaluation", max: 6, sampleScore: 4 },
  ],
  relatedSubjects: [
    { label: "Mathematics IA", href: "/essay/math-ia" },
    { label: "Physics IA", href: "/essay/physics-ia" },
    { label: "Biology IA", href: "/essay/biology-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function ComputerScienceIA() {
  return <SubjectEssayPage config={config} />;
}
