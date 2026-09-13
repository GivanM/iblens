import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "TOK Essay",
  slug: "tok-essay",
  keyword: "IB TOK Essay",
  metaTitle: "IB TOK Essay Grader: AI Feedback on Your Theory of Knowledge Essay | IBLens",
  metaDescription:
    "AI feedback on your IB Theory of Knowledge essay, read against the holistic TOK assessment instrument out of 10, with the words counted against 1,600. Free preview first.",
  canonicalPath: "/essay/tok-essay",
  heroHeadline: "Is your TOK essay actually answering the prescribed title?",
  heroSubline:
    "Paste your TOK essay and get it read against the holistic TOK instrument, which has no sub-criteria, in about a minute. See whether your arguments are developed enough for the upper bands.",
  analyzerHref: "/essay?type=TOK",
  wordLimit: "1,600-word",
  criteria: [
    { name: "Holistic assessment: clear, coherent, critical exploration of the title", max: 10, sampleScore: 6 },
  ],
  guide: {
    rubricHeading: "How the TOK essay is marked (10 marks)",
    rubricIntro: [
      "The TOK essay responds to one of the six prescribed titles for your session in up to 1,600 words, and examiners stop reading after that. IB examiners mark it as a whole against one assessment instrument with no separate criteria. Behind every mark is one question: does the student provide a clear, coherent and critical exploration of the essay title?",
      "The essay is placed in one of five bands.",
    ],
    rubricItems: [
      { title: "Excellent, 9-10", text: "A sustained focus on the title, linked effectively to areas of knowledge. Arguments are clear, coherent and supported by specific examples, their implications are considered, and different points of view are evaluated." },
      { title: "Good, 7-8", text: "Focused on the title and linked effectively to areas of knowledge. Arguments are clear, coherent and supported by examples, with awareness and some evaluation of different points of view." },
      { title: "Satisfactory, 5-6", text: "Focused on the title and developed with some links to areas of knowledge. Arguments are offered and supported by examples, with some awareness of different points of view." },
      { title: "Basic, 3-4", text: "Connected to the title, with superficial or limited links to areas of knowledge. Largely descriptive, with limited arguments that are unclear and not supported by effective examples." },
      { title: "Rudimentary, 1-2", text: "Weakly connected to the title. Any relevant points are descriptive or unsupported assertions." },
    ],
    rubricNote: [
      "An essay that does not reach these levels, or does not respond to a prescribed title for the correct session, scores 0.",
    ],
    mistakesHeading: "Mistakes the TOK essay bands penalise",
    mistakes: [
      { title: "Writing about the topic, not the title", text: "An essay about knowledge in general that never works with the exact wording of the prescribed title. Focus on the title is the first thing every band describes." },
      { title: "Examples that do no work", text: "Examples dropped in as illustrations without being used to build or test an argument. The descriptors from Satisfactory upward describe arguments supported by examples, and the Excellent descriptor describes specific examples." },
      { title: "Other views mentioned, not evaluated", text: "A paragraph of counterclaims followed by the original position, unchanged. Evaluation of different points of view appears in the Good and Excellent descriptors; Satisfactory describes some awareness of them." },
      { title: "Areas of knowledge in name only", text: "Mentioning the natural sciences or history without showing how knowledge works differently there. The Good and Excellent descriptors describe discussion linked effectively to areas of knowledge." },
      { title: "Running past 1,600 words", text: "Examiners stop reading at 1,600 words, so a conclusion after that point is never seen. References, the bibliography and any tables or diagrams are not counted." },
    ],
    faq: [
      { q: "Why is there no criterion breakdown?", a: "Because the TOK essay has no criteria. The report gives one mark out of 10, places it in a band, explains the placement in the terms the band descriptors use, and lists what is holding the essay back." },
      { q: "Is the exhibition marked the same way?", a: "It also has one holistic instrument out of 10, but the question behind it and the task are different, and your teacher marks it. Choose TOK exhibition in the grader for it." },
      { q: "How accurate is the estimated mark?", a: "It is an estimate, not a mark. A language model applies the published criteria to what you paste, and it can be wrong. IB examiners mark this component, so their mark is the one that counts. Use the report to find what to fix before you submit." },
      { q: "Is it free?", a: "The first preview is free and needs no account: the band your work falls in, the opening of the explanation for it, and the top risks in the draft. The full report, with the complete explanation and a ranked list of fixes, is $9.99, or $24.99 for five and $44.99 for ten." },
      { q: "Is my work stored?", a: "IBLens never saves the text you paste. It passes through our relay server to Anthropic, the AI provider, to produce the report, and Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. Reports made without an account are deleted after 90 days unless you buy the full report, and reports in a signed-in account stay until you delete them." },
    ],
  },
  relatedResources: [
    { label: "TOK Essay Guide", href: "/resources/tok-essay-guide" },
    { label: "TOK Essay Checklist", href: "/resources/tok-essay-checklist" },
    { label: "TOK Essay Structure", href: "/resources/tok-essay-structure" },
  ],
  relatedSubjects: [
    { label: "Extended Essay", href: "/essay/extended-essay" },
    { label: "English Individual Oral", href: "/essay/english-essay" },
    { label: "History IA", href: "/essay/history-ia" },
    { label: "Psychology IA", href: "/essay/psychology-ia" },
  ],
};

export default function TokEssay() {
  return <SubjectEssayPage config={config} />;
}
