import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "TOK Exhibition",
  slug: "tok-exhibition",
  keyword: "IB TOK Exhibition",
  metaTitle: "IB TOK Exhibition Grader — Free AI Feedback on All 3 Objects | IBLens",
  metaDescription:
    "AI feedback on your IB Theory of Knowledge Exhibition. Check if your objects make convincing links to the IA prompt and to TOK concepts — scored against the official IB rubric. Free first check.",
  canonicalPath: "/essay/tok-exhibition",
  heroHeadline: "Do your TOK Exhibition objects actually link to the IA prompt?",
  heroSubline:
    "Paste your TOK Exhibition commentary and get criterion-by-criterion feedback against the official IB rubric — in 60 seconds. Find out if your object justifications are strong enough to score 9–10/10.",
  criteria: [
    { name: "Holistic assessment: how well the exhibition shows TOK in the world", max: 10, sampleScore: 6 },
  ],
  relatedSubjects: [
    { label: "TOK Essay", href: "/essay/tok-essay" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
    { label: "History IA", href: "/essay/history-ia" },
    { label: "Psychology IA", href: "/essay/psychology-ia" },
  ],
};

export default function TokExhibition() {
  return <SubjectEssayPage config={config} />;
}
