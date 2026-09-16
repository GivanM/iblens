import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Economics IA",
  slug: "economics-ia",
  keyword: "IB Economics IA",
  metaTitle: "IB Economics IA Grader: AI Feedback on Your Commentary | IBLens",
  metaDescription:
    "AI feedback on your IB Economics IA commentary against the five criteria: diagrams, terminology, application and analysis, key concept and evaluation, with the words counted against 800. Free preview first.",
  canonicalPath: "/essay/economics-ia",
  heroHeadline: "See where your IB Economics IA commentary loses marks before you submit",
  heroSubline:
    "Paste your Economics IA commentary and see which criteria are costing you marks in about a minute, with the words counted against the 800-word limit.",
  analyzerHref: "/essay?type=IA&subject=Economics",
  wordLimit: "800-word",
  criteria: [
    { name: "Criterion A: Diagrams", max: 3, sampleScore: 2 },
    { name: "Criterion B: Terminology", max: 2, sampleScore: 2 },
    { name: "Criterion C: Application and analysis", max: 3, sampleScore: 2 },
    { name: "Criterion D: Key concept", max: 3, sampleScore: 2 },
    { name: "Criterion E: Evaluation", max: 3, sampleScore: 2 },
  ],
  sampleCaption: "One commentary, criteria A to E. Criterion F, worth 3 marks, is applied once to the whole portfolio.",
  guide: {
    rubricHeading: "What the Economics IA criteria reward (14 marks a commentary, 45 for the portfolio)",
    rubricIntro: [
      "The Economics IA is a portfolio of three commentaries, each on an article from the news media about a different unit of the syllabus: microeconomics, macroeconomics and the global economy. Each commentary is limited to 800 words, and moderators do not read beyond that point. The portfolio is worth 30% of the final grade at SL and 20% at HL.",
      "Each commentary is marked out of 14 on criteria A to E. Criterion F is applied once to the whole portfolio, for a maximum of 45 marks.",
    ],
    rubricItems: [
      { title: "Criterion A: Diagrams, 3 marks", text: "Relevant, accurate and correctly labelled diagrams, with a full explanation of what each one shows about the article." },
      { title: "Criterion B: Terminology, 2 marks", text: "Economic terminology relevant to the article, used appropriately throughout the commentary." },
      { title: "Criterion C: Application and analysis, 3 marks", text: "Relevant economic theory applied to the article throughout the commentary, with effective analysis." },
      { title: "Criterion D: Key concept, 3 marks", text: "One of the nine key concepts identified and its link to the article fully explained. Each commentary needs a different key concept." },
      { title: "Criterion E: Evaluation, 3 marks", text: "Judgements supported by effective and balanced reasoning." },
      { title: "Criterion F: Rubric requirements, 3 marks", text: "One mark for each rule the portfolio meets: articles on three different units, taken from three different and appropriate sources, and each published no earlier than one year before you wrote the commentary." },
    ],
    mistakesHeading: "Mistakes the Economics IA criteria penalise",
    mistakes: [
      { title: "A diagram the commentary never explains", text: "A relevant diagram with no explanation, or with an incorrect one, is the 1-mark level of Criterion A. Explain the shift and what it means for the situation in the article." },
      { title: "Retelling the article", text: "Describing what happened without theory to explain why. Criterion C asks for theory applied to the article throughout the commentary, not only in the opening paragraph." },
      { title: "A one-sided judgement", text: "Concluding that a policy will work without weighing who gains and who loses, the short run against the long run, or the assumptions behind the prediction. The top Evaluation mark needs balanced reasoning." },
      { title: "The same key concept twice", text: "A key concept already used in another commentary scores 0 on Criterion D, so reusing one can cost 3 marks, and up to 6 if all three commentaries share it." },
      { title: "Going past 800 words", text: "Anything after the 800th word is not read. Definitions and quotations count towards the limit. Diagrams, labels of five words or fewer, headings on diagrams of 10 words or fewer, tables of statistical data, calculations, citations and references do not." },
      { title: "An article more than a year old", text: "Each article must be published no earlier than one year before you write the commentary, or Criterion F loses a mark." },
    ],
    faq: [
      { q: "Can I check all three commentaries?", a: "Run one commentary at a time, so each is marked out of 14 on its own. The report covers criteria A to E. Criterion F is about the portfolio as a whole, so check the unit, source and date rules yourself. A pack of five reports is $24.99." },
      { q: "Does it count my words?", a: "Yes. It counts the words in what you paste and tells you when a commentary is close to 800 or over it, with what the official count leaves out, such as diagrams, labels of five words or fewer, tables of statistical data and references." },
      { q: "How accurate is the estimated mark?", a: "It is an estimate, not a mark. A language model applies the published criteria to what you paste, and it can be wrong. Your teacher marks the work and the IB moderates that marking, so their mark is the one that counts. Use the report to find what to fix before you submit." },
      { q: "Is it free?", a: "The first preview is free and needs no account: a range of totals that contains the estimate and, for most drafts, your weakest criterion with its feedback and the top risks in the draft. The full report, with every criterion marked and a ranked list of fixes, is $9.99, or $24.99 for five and $44.99 for ten." },
      { q: "Is my work stored?", a: "IBLens never saves the text you paste. Our server sends it to Anthropic, the AI provider, to produce the report, and Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. Reports made without an account are deleted after 90 days unless you buy the full report, and reports in a signed-in account stay until you delete them." },
    ],
  },
  relatedResources: [
    { label: "Economics IA guide", href: "/resources/ib-economics-ia" },
    { label: "Economics Extended Essay", href: "/resources/ib-economics-extended-essay" },
    { label: "Check your IA against the criteria", href: "/resources/ib-ia-feedback" },
  ],
  relatedSubjects: [
    { label: "Business Management IA", href: "/essay/business-management-ia" },
    { label: "History IA", href: "/essay/history-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
    { label: "Psychology IA", href: "/essay/psychology-ia" },
  ],
};

export default function EconomicsIA() {
  return <SubjectEssayPage config={config} />;
}
