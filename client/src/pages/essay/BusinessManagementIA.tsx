import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Business Management IA",
  slug: "business-management-ia",
  keyword: "IB Business Management IA",
  metaTitle: "IB Business Management IA Grader: AI Feedback on Your Research Project | IBLens",
  metaDescription:
    "AI feedback in about a minute on your IB Business Management research project, marked against the seven criteria out of 25, with the word count checked against 1,800. Free preview first.",
  canonicalPath: "/essay/business-management-ia",
  heroHeadline: "Is your Business Management IA scoring where you think it is?",
  heroSubline:
    "Paste your research project and get feedback against the Business Management criteria in about a minute, with the words counted against the 1,800-word limit.",
  analyzerHref: "/essay?type=IA&subject=Business%20Management",
  wordLimit: "1,800-word",
  criteria: [
    { name: "Criterion A: Integration of a key concept", max: 5, sampleScore: 3 },
    { name: "Criterion B: Supporting documents", max: 4, sampleScore: 3 },
    { name: "Criterion C: Selection and application of tools and theories", max: 4, sampleScore: 3 },
    { name: "Criterion D: Analysis and evaluation", max: 5, sampleScore: 2 },
    { name: "Criterion E: Conclusions", max: 3, sampleScore: 2 },
    { name: "Criterion F: Structure", max: 2, sampleScore: 2 },
    { name: "Criterion G: Presentation", max: 2, sampleScore: 1 },
  ],
  guide: {
    rubricHeading: "What the Business Management IA criteria reward (25 marks)",
    rubricIntro: [
      "The IA is the business research project: a report of up to 1,800 words on a real issue or problem facing a single organisation, based on three to five supporting documents and analysed through one key concept: change, creativity, ethics or sustainability. It is worth 30% of the final grade at SL and 20% at HL, with the same criteria at both levels. Moderators do not read beyond 1,800 words.",
      "The supporting documents must be published no more than three years before the project is submitted to the IB, and at most one of them can be a transcript of video or audio material.",
    ],
    rubricItems: [
      { title: "Criterion A: Integration of a key concept, 5 marks", text: "How well the analysis of the connection between your key concept and the organisation runs through the whole project. The key concept has to be indicated on the title page, and describing the connection without analysing it stays in the lower marks." },
      { title: "Criterion B: Supporting documents, 4 marks", text: "Three to five relevant supporting documents that address the research question in enough depth. The top mark also needs a range of ideas and views, so documents that all come from the company itself fall short." },
      { title: "Criterion C: Selection and application of tools and theories, 4 marks", text: "Business management tools and theories selected for their relevance to the research question and applied to it effectively." },
      { title: "Criterion D: Analysis and evaluation, 5 marks", text: "Data from the supporting documents selected and used for a thorough analysis and evaluation of the research question, with ideas integrated throughout and the assumptions and implications of the arguments considered." },
      { title: "Criterion E: Conclusions, 3 marks", text: "Conclusions consistent with the evidence presented that explicitly answer the research question." },
      { title: "Criterion F: Structure, 2 marks", text: "An appropriate structure for the project." },
      { title: "Criterion G: Presentation, 2 marks", text: "All the required elements: a title page, an accurate table of contents, appropriate headings and sub-headings, and numbered pages." },
    ],
    mistakesHeading: "Mistakes the Business Management IA criteria penalise",
    mistakes: [
      { title: "Documents from one point of view", text: "Three to five documents all published by the company, or several surveys of similar people. The guide says a selection like that would not provide balance, and the top mark on Criterion B needs a range of ideas and views." },
      { title: "The wrong number of documents", text: "One or two supporting documents, or more than five, limits Criterion B to 1 mark." },
      { title: "Tools used as templates", text: "A SWOT analysis or a set of ratios that is filled in but never used to answer the research question. Criterion C rewards tools applied with clear relevance to the question." },
      { title: "A key concept on the title page only", text: "Naming the concept without analysing its connection to the organisation. Criterion A rewards that analysis integrated throughout the project." },
      { title: "A conclusion that adds new points", text: "The conclusion should answer the research question explicitly, and the guide advises against introducing facts or arguments that were not discussed earlier." },
      { title: "Words past 1,800", text: "Moderators do not read beyond 1,800 words, and your teacher's mark is based on the first 1,800. Definitions and quotations count. Tables of data, diagrams, calculations, the supporting documents, citations and the bibliography do not." },
    ],
    faq: [
      { q: "Should I paste my supporting documents too?", a: "Paste the project itself. If there is room, add a short list of your supporting documents with their publishers and dates, so the feedback on Criterion B can take their range and age into account." },
      { q: "Can the project be about any business?", a: "It has to refer directly to one real organisation, though it can consider industry-wide issues that affect that organisation." },
      { q: "How accurate is the predicted mark?", a: "It is an estimate, not a mark. A language model applies the published criteria to what you paste, and it can be wrong. Your teacher marks the work and the IB moderates that marking, so their mark is the one that counts. Use the report to find what to fix before you submit." },
      { q: "Is it free?", a: "The first preview is free and needs no account: your band range, your weakest criterion with its full feedback, and the top risks in the draft. The full report, with every criterion marked and a ranked list of fixes, is $9.99, or $24.99 for a pack of five." },
      { q: "Is my work stored?", a: "IBLens never saves the text you paste. It passes through our relay server to Anthropic, the AI provider, to produce the report, and Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. Reports made without an account are deleted after 90 days unless you buy the full report, and reports in a signed-in account stay until you delete them." },
    ],
  },
  relatedResources: [
    { label: "Check your IA against the criteria", href: "/resources/ib-ia-feedback" },
    { label: "IB Internal Assessment Guide", href: "/resources/ib-internal-assessment-guide" },
  ],
  relatedSubjects: [
    { label: "Economics IA", href: "/essay/economics-ia" },
    { label: "History IA", href: "/essay/history-ia" },
    { label: "Psychology IA", href: "/essay/psychology-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function BusinessManagementIA() {
  return <SubjectEssayPage config={config} />;
}
