import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "TOK Essay",
  slug: "tok-essay",
  keyword: "IB TOK Essay",
  metaTitle: "IB TOK Essay Grader — Free AI Feedback on Theory of Knowledge | IBLens",
  metaDescription:
    "AI feedback on your IB Theory of Knowledge essay. Knowledge claims, counter-claims, Areas of Knowledge — all scored against the official IB TOK criteria. Free first check.",
  canonicalPath: "/essay/tok-essay",
  heroHeadline: "Is your TOK essay actually answering the prescribed title?",
  heroSubline:
    "Paste your TOK essay and get criterion-by-criterion feedback against the official IB TOK rubric — free in 60 seconds. See if your knowledge claims are developed enough to score top marks.",
  criteria: [
    { name: "Holistic assessment: clear, coherent, critical exploration of the title", max: 10, sampleScore: 6 },
  ],
  relatedSubjects: [
    { label: "Extended Essay", href: "/essay/extended-essay" },
    { label: "English Essay", href: "/essay/english-essay" },
    { label: "History IA", href: "/essay/history-ia" },
    { label: "Psychology IA", href: "/essay/psychology-ia" },
  ],
};

export default function TokEssay() {
  return <SubjectEssayPage config={config} />;
}
