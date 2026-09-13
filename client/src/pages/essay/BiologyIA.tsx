import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Biology IA",
  slug: "biology-ia",
  keyword: "IB Biology IA",
  metaTitle: "IB Biology IA Grader: AI Feedback on Your Scientific Investigation | IBLens",
  metaDescription:
    "AI feedback on your IB Biology Internal Assessment in about a minute, against the four criteria: research design, data analysis, conclusion and evaluation. Free preview first.",
  canonicalPath: "/essay/biology-ia",
  heroHeadline: "Is your Biology IA losing marks you don't know about?",
  heroSubline:
    "Paste your Biology IA report and get feedback against the IB sciences criteria, criterion by criterion. The free preview comes back in about a minute.",
  analyzerHref: "/essay?type=IA&subject=Biology",
  wordLimit: "3,000-word",
  criteria: [
    { name: "Research design", max: 6, sampleScore: 4 },
    { name: "Data analysis", max: 6, sampleScore: 4 },
    { name: "Conclusion", max: 6, sampleScore: 3 },
    { name: "Evaluation", max: 6, sampleScore: 3 },
  ],
  guide: {
    rubricHeading: "What the Biology IA criteria reward (24 marks)",
    rubricIntro: [
      "The Biology IA is the scientific investigation: one written report of up to 3,000 words, worth 20% of the final grade at SL and HL. Biology, Chemistry and Physics use the same four criteria, each worth 6 marks. Your teacher marks the report and the IB moderates the marking.",
    ],
    rubricItems: [
      { title: "Research design, 6 marks", text: "A research question described within a specific and appropriate context, with the methodological choices explained: how the variables are measured, the range and number of readings, how control variables are held, and the safety, ethical and environmental issues. The method has to be described well enough for someone else to repeat it." },
      { title: "Data analysis, 6 marks", text: "Data recorded, processed and presented clearly and precisely, with units, appropriate significant figures and labelled graphs, an appropriate treatment of uncertainties, and processing that is accurate and relevant to the research question." },
      { title: "Conclusion, 6 marks", text: "A conclusion that answers the research question, is consistent with the processed data and its uncertainties, and is justified by comparison with the accepted scientific context, such as published research or values." },
      { title: "Evaluation, 6 marks", text: "The relative impact of specific weaknesses or limitations in your method, with realistic improvements that address them. Weaknesses that would apply to almost any investigation are what the lowest band describes." },
    ],
    mistakesHeading: "Mistakes the Biology IA criteria penalise",
    mistakes: [
      { title: "Uncertainties left out", text: "Raw data with no uncertainties, or processed values with no sense of how precise they are. Data analysis asks for an appropriate consideration of uncertainties, and a fully consistent conclusion interprets the data with them." },
      { title: "A question with no context", text: "A research question that names two variables but not the biological system they belong to or the theory behind the prediction. The top Research design band describes a question set in a specific context." },
      { title: "Processing that does not answer the question", text: "A table of means when the question asks whether two conditions differ or whether two variables are related. Processing has to address the research question, and any statistical test you use should suit your data and your question." },
      { title: "A generic evaluation", text: "Limitations such as human error or old equipment, and improvements such as more repeats, that are not tied to a specific step. The top band explains how much each specific weakness affected the result." },
      { title: "A conclusion without the science", text: "Stating what the data show without comparing the result with published research or accepted values. That comparison is part of the Conclusion criterion itself." },
    ],
    faq: [
      { q: "Can it read my graphs and tables?", a: "Tables pasted as text come through. Graphs and images do not, so the feedback on how you present data is based on the tables and text you paste. Describe any graph your conclusion depends on." },
      { q: "Does the word count include my data tables?", a: "No. The official 3,000-word count leaves out charts, diagrams, data tables, equations and calculations, citations, the bibliography and headers. IBLens counts every word you paste, so when you are close to the limit or over it, the report reminds you what the official count leaves out." },
      { q: "Can I use it for a Biology Extended Essay?", a: "Choose Extended Essay in the grader and pick Biology as the subject. The EE is marked on its own criteria, so the IA criteria would put it on the wrong scale." },
      { q: "How accurate is the estimated mark?", a: "It is an estimate, not a mark. A language model applies the published criteria to what you paste, and it can be wrong. Your teacher marks the work and the IB moderates that marking, so their mark is the one that counts. Use the report to find what to fix before you submit." },
      { q: "Is it free?", a: "The first preview is free and needs no account: your band range, your weakest criterion with its full feedback, and the top risks in the draft. The full report, with every criterion marked and a ranked list of fixes, is $9.99, or $24.99 for five and $44.99 for ten." },
      { q: "Is my work stored?", a: "IBLens never saves the text you paste. It passes through our relay server to Anthropic, the AI provider, to produce the report, and Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. Reports made without an account are deleted after 90 days unless you buy the full report, and reports in a signed-in account stay until you delete them." },
    ],
  },
  relatedResources: [
    { label: "Biology IA examples", href: "/resources/ib-biology-ia-examples" },
    { label: "Biology Extended Essay", href: "/resources/ib-biology-extended-essay" },
    { label: "Check your IA against the criteria", href: "/resources/ib-ia-feedback" },
  ],
  relatedSubjects: [
    { label: "Chemistry IA", href: "/essay/chemistry-ia" },
    { label: "Physics IA", href: "/essay/physics-ia" },
    { label: "Mathematics IA", href: "/essay/math-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function BiologyIA() {
  return <SubjectEssayPage config={config} />;
}
