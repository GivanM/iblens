import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "English A individual oral",
  slug: "english-essay",
  keyword: "IB English Individual Oral",
  metaTitle: "IB English Individual Oral Grader: AI Feedback on Your IO | IBLens",
  metaDescription:
    "AI feedback on the IB English A Individual Oral against the four published criteria: a practice transcript is marked out of 40, an outline on the first three. The HL essay is a separate component and is not covered.",
  canonicalPath: "/essay/english-essay",
  heroHeadline: "Get feedback on your English A individual oral outline or a practice oral in about a minute",
  heroSubline:
    "Paste your outline for the English A individual oral, or a transcript of a practice oral that uses works and a global issue different from those of your assessed oral: the Language A guides let your teacher give feedback on practice orals like that, but not rehearse the actual oral with you. A transcript is marked on all four criteria, an outline on the first three. Free preview, no account required.",
  analyzerHref: "/essay?type=IA",
  criteriaCaveat: "A mark for every criterion from a transcript, with the reason for each one. From an outline, Criterion D (language) is not marked",
  criteria: [
    { name: "Criterion A: Knowledge, understanding and interpretation", max: 10, sampleScore: 6 },
    { name: "Criterion B: Analysis and evaluation", max: 10, sampleScore: 6 },
    { name: "Criterion C: Focus and organization", max: 10, sampleScore: 7 },
    { name: "Criterion D: Language", max: 10, sampleScore: 7 },
  ],
  guide: {
    rubricHeading: "What the individual oral criteria reward (40 marks)",
    rubricIntro: [
      "The individual oral is spoken, not written: you explore how a global issue is presented in an extract from each of two texts. In Literature they are two works, one of them studied in translation. In Language and Literature they are one literary work and one non-literary text. Both courses mark the oral on the same four criteria of 10 marks each, and your teacher marks it before the IB moderates the marking.",
      "Because the oral is spoken, IBLens reads your outline or a transcript of a practice oral that uses works and a global issue different from those of your assessed oral. A transcript gives the fullest report. An outline gives much less to go on, especially for Language.",
    ],
    rubricItems: [
      { title: "Criterion A: Knowledge, understanding and interpretation, 10 marks", text: "Knowledge and understanding of the extracts and of the works they come from, and your interpretation of what they imply about the global issue." },
      { title: "Criterion B: Analysis and evaluation, 10 marks", text: "Analysis and evaluation of how the choices an author makes, or the choices in a text, present the global issue." },
      { title: "Criterion C: Focus and organization, 10 marks", text: "A structured, balanced and focused oral in which the ideas are connected." },
      { title: "Criterion D: Language, 10 marks", text: "Clear, accurate and effective language that suits the task." },
    ],
    mistakesHeading: "Mistakes the individual oral criteria penalise",
    mistakes: [
      { title: "Naming devices without analysing them", text: "Pointing out a metaphor without explaining how it presents the global issue. Criterion B is about how choices in the text shape that presentation." },
      { title: "A global issue that drops out", text: "Introducing the issue at the start and returning to it only at the end. Criterion A measures your interpretation in relation to the global issue, so each part of the oral should come back to it." },
      { title: "Plot summary", text: "Retelling what happens in a work. Knowledge of the work shows in what you choose to discuss and why, not in how much of it you retell." },
      { title: "One work doing all the work", text: "Spending most of the oral on one work and little on the other. Criterion C rewards a balanced oral." },
    ],
    faq: [
      { q: "Can I paste a transcript of my oral?", a: "Only of a practice oral that uses works and a global issue different from those of your assessed oral: the Language A guides let your teacher give feedback on practice orals like that and on your outline, but not rehearse the actual oral with you. Check that your teacher and your school allow feedback from anyone else. A transcript is marked on all four criteria." },
      { q: "Does it cover the HL essay or Paper 1?", a: "No. It covers the individual oral only. The HL essay and the exam papers are marked on different criteria." },
      { q: "Literature or Language and Literature?", a: "Choose your course in the grader. The four criteria, their wording and their marks are the same in both courses. What differs is the task: in Literature the oral uses two works, one studied in translation, and in Language and Literature one literary work and one non-literary text." },
      { q: "How accurate is the estimated mark?", a: "It is an estimate, not a mark. A language model applies the published criteria to what you paste, and it can be wrong. Your teacher marks the work and the IB moderates that marking, so their mark is the one that counts. Use the report to find what to fix before you submit." },
      { q: "Is it free?", a: "The first preview is free and needs no account: a range of totals that contains the estimate and, for most drafts, your weakest criterion with its feedback and the top risks in the draft. The full report, with a mark for every criterion from a transcript (from an outline, Criterion D is not marked) and a ranked list of fixes, is $9.99, or $24.99 for five and $44.99 for ten." },
      { q: "Is my work stored?", a: "IBLens never saves the text you paste. It passes through our relay server to Anthropic, the AI provider, to produce the report, and Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. Reports made without an account are deleted after 90 days unless you buy the full report, and reports in a signed-in account stay until you delete them." },
    ],
  },
  relatedResources: [
    { label: "Check your IA against the criteria", href: "/resources/ib-ia-feedback" },
    { label: "Using AI feedback within IB rules", href: "/resources/academic-integrity" },
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
