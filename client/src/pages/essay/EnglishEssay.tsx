import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "English Essay",
  slug: "english-essay",
  keyword: "IB English essay",
  metaTitle: "IB English Individual Oral Grader, Free AI Feedback | IBLens",
  metaDescription:
    "AI feedback on the IB English A Individual Oral, marked out of 40 against the four published criteria. The HL essay is a separate component and is not covered. First analysis free.",
  canonicalPath: "/essay/english-essay",
  heroHeadline: "Get your IB English Individual Oral graded in about 90 seconds",
  heroSubline:
    "Paste your IB English A Individual Oral commentary and receive criterion-level feedback in about 90 seconds, free, no account required.",
  // The engine holds the Individual Oral instrument for English A: four criteria
  // of ten, forty in total. The table here used to show the HL essay shape,
  // four of five, which is a different component the product cannot mark.
  criteria: [
    { name: "Criterion A: Knowledge, understanding and interpretation", max: 10, sampleScore: 6 },
    { name: "Criterion B: Analysis and evaluation", max: 10, sampleScore: 6 },
    { name: "Criterion C: Focus and organization", max: 10, sampleScore: 7 },
    { name: "Criterion D: Language", max: 10, sampleScore: 7 },
  ],
  relatedResources: [
    { label: "English Extended Essay", href: "/resources/ib-english-extended-essay" },
    { label: "Check your IA against the criteria", href: "/resources/ib-ia-feedback" },
  ],
  relatedSubjects: [
    { label: "History IA", href: "/essay/history-ia" },
    { label: "Psychology IA", href: "/essay/psychology-ia" },
    { label: "Economics IA", href: "/essay/economics-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function EnglishEssay() {
  return <SubjectEssayPage config={config} />;
}
