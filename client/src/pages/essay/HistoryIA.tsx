import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "History IA",
  slug: "history-ia",
  keyword: "IB History IA",
  metaTitle: "IB History IA Grader: AI Feedback on Your Historical Investigation | IBLens",
  metaDescription:
    "AI feedback on your IB History Internal Assessment: source evaluation, the investigation and the reflection, marked against the three criteria out of 25, with the words counted against 2,200.",
  canonicalPath: "/essay/history-ia",
  heroHeadline: "Find out where your History IA loses marks before you submit",
  heroSubline:
    "Get your History IA marked across all three sections (sources, investigation and reflection) against the History criteria, in about a minute.",
  analyzerHref: "/essay?type=IA&subject=History",
  wordLimit: "2,200-word",
  criteria: [
    { name: "Criterion A: Identification and evaluation of sources", max: 6, sampleScore: 4 },
    { name: "Criterion B: Investigation", max: 15, sampleScore: 9 },
    { name: "Criterion C: Reflection", max: 4, sampleScore: 2 },
  ],
  guide: {
    rubricHeading: "What the History IA criteria reward (25 marks)",
    rubricIntro: [
      "The History IA is the historical investigation: up to 2,200 words plus a bibliography, worth 25% of the final grade at SL and 20% at HL. It has three sections, each marked by one criterion. Your teacher approves your question before you start and marks the finished work, and the IB moderates the marking.",
      "The guide suggests about 500 words for Section 1, 1,300 for Section 2 and 400 for Section 3. These are suggestions, not rules.",
    ],
    rubricItems: [
      { title: "Section 1: Identification and evaluation of sources (Criterion A, 6 marks)", text: "Your question, stated as a question, a brief explanation of the two sources you chose and their relevance to the investigation, and a detailed analysis of their value and limitations for your investigation, with reference to their origins, purpose and content. The two sources can be primary or secondary." },
      { title: "Section 2: Investigation (Criterion B, 15 marks)", text: "A clear, coherent and well-organised investigation with well-developed critical analysis focused on your question, evidence from a range of sources used effectively, evaluation of different perspectives, and a reasoned conclusion consistent with the evidence and arguments. Primary sources, secondary sources or a mix of both are acceptable." },
      { title: "Section 3: Reflection (Criterion C, 4 marks)", text: "What the investigation showed you about the methods historians use and the challenges they face, with a clear and explicit connection to the rest of your investigation." },
    ],
    mistakesHeading: "Mistakes the History IA criteria penalise",
    mistakes: [
      { title: "Narrative in place of analysis", text: "A Section 2 that tells the story of the events. Mainly narrative or descriptive work is the 4-6 band of Criterion B, and the top band needs well-developed critical analysis focused on the question." },
      { title: "Perspectives named but not weighed", text: "Mentioning that historians disagree without evaluating their views. Awareness of perspectives without evaluation is how the 7-9 band describes this strand; 10-12 describes some evaluation, and the top band evaluation of different perspectives." },
      { title: "Source evaluation that fits any source", text: "Calling a source biased because its author had a view, without saying what that means for its value and limitations in your investigation. Criterion A asks for value and limitations for this investigation, with reference to origin, purpose and content." },
      { title: "A reflection about history in general", text: "Section 3 has to connect explicitly to your own investigation. A reflection where that connection is only implied matches the 1-2 descriptor on that strand; 3-4 describes a clear and explicit connection." },
      { title: "A topic that is too recent", text: "The topic must be historical, so it cannot be about events in the last 10 years." },
      { title: "A question too broad for 1,300 words", text: "A question like 'What caused the First World War?' cannot be investigated at this length. Narrow it by place, period or factor." },
    ],
    faq: [
      { q: "Can I paste just one section?", a: "Yes, but each criterion is marked on what it can see, so the criteria for the sections you leave out will score low. Paste all three sections for a total you can use." },
      { q: "What counts towards the 2,200 words?", a: "The bibliography and references are not counted. IBLens counts everything you paste, so leave the bibliography out of the paste, or allow for it when you read the word count." },
      { q: "Can I use it for a History Extended Essay?", a: "Choose Extended Essay in the grader and pick History as the subject. The EE is marked on its own criteria, so the IA criteria would put it on the wrong scale." },
      { q: "How accurate is the estimated mark?", a: "It is an estimate, not a mark. A language model applies the published criteria to what you paste, and it can be wrong. Your teacher marks the work and the IB moderates that marking, so their mark is the one that counts. Use the report to find what to fix before you submit." },
      { q: "Is it free?", a: "The first preview is free and needs no account: a range of totals that contains the estimate and, for most drafts, your weakest criterion with its feedback and the top risks in the draft. The full report, with every criterion marked and a ranked list of fixes, is $9.99, or $24.99 for five and $44.99 for ten." },
      { q: "Is my work stored?", a: "IBLens never saves the text you paste. Our server sends it to Anthropic, the AI provider, to produce the report, and Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. Reports made without an account are deleted after 90 days unless you buy the full report, and reports in a signed-in account stay until you delete them." },
    ],
  },
  relatedResources: [
    { label: "History IA guide", href: "/resources/ib-history-ia" },
    { label: "History Extended Essay", href: "/resources/ib-history-extended-essay" },
  ],
  relatedSubjects: [
    { label: "English A individual oral", href: "/essay/english-essay" },
    { label: "Economics IA", href: "/essay/economics-ia" },
    { label: "Psychology IA", href: "/essay/psychology-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function HistoryIA() {
  return <SubjectEssayPage config={config} />;
}
