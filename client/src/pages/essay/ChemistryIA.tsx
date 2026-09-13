import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Chemistry IA",
  slug: "chemistry-ia",
  keyword: "IB Chemistry IA",
  metaTitle: "IB Chemistry IA Grader: AI Feedback on Your Scientific Investigation | IBLens",
  metaDescription:
    "AI feedback on your IB Chemistry Internal Assessment against the four criteria: research design, data analysis, conclusion and evaluation. Free preview first, full report $9.99.",
  canonicalPath: "/essay/chemistry-ia",
  heroHeadline: "Check your IB Chemistry IA against the criteria, in about a minute",
  heroSubline:
    "Paste your Chemistry IA and see how it reads on every criterion, and what to improve before submission.",
  analyzerHref: "/essay?type=IA&subject=Chemistry",
  wordLimit: "3,000-word",
  criteria: [
    { name: "Research design", max: 6, sampleScore: 4 },
    { name: "Data analysis", max: 6, sampleScore: 4 },
    { name: "Conclusion", max: 6, sampleScore: 3 },
    { name: "Evaluation", max: 6, sampleScore: 3 },
  ],
  guide: {
    rubricHeading: "What the Chemistry IA criteria reward (24 marks)",
    rubricIntro: [
      "The Chemistry IA uses the same scientific investigation criteria as Biology and Physics: four criteria of 6 marks each, applied to one report of up to 3,000 words. It is worth 20% of the final grade at SL and HL. Your teacher marks it and the IB moderates the marking.",
      "The data can come from your own experiment or be selected from a database or a model.",
    ],
    rubricItems: [
      { title: "Research design, 6 marks", text: "A research question in a specific chemical context, with the choices behind the method explained: how the variables are measured, the range and repetition of trials, how other variables are controlled, and the safety, ethical and environmental issues of the chemicals used. Someone else should be able to reproduce the method from your description." },
      { title: "Data analysis, 6 marks", text: "Clear and precise recording and processing: units, appropriate significant figures or decimal places, labelled graphs, uncertainties carried through the calculations, and processing that is accurate and relevant to the question." },
      { title: "Conclusion, 6 marks", text: "A conclusion consistent with the processed data and its uncertainties, justified by comparison with accepted chemistry such as literature values or theory." },
      { title: "Evaluation, 6 marks", text: "The relative impact of specific weaknesses or limitations explained, with realistic improvements that address them." },
    ],
    mistakesHeading: "Mistakes the Chemistry IA criteria penalise",
    mistakes: [
      { title: "Uncertainties that stop at the raw data", text: "Readings recorded with uncertainties that then disappear from the calculated result. When values are added or subtracted, their absolute uncertainties add. When they are multiplied or divided, their fractional or percentage uncertainties add." },
      { title: "Precision that changes from table to table", text: "Results quoted to more significant figures than the measurements support, or with a different number of decimal places in each table. Precise communication in Data analysis means following these conventions." },
      { title: "A literature value quoted but not used", text: "Giving the accepted value without using it to judge your result. Say how far your result is from it and whether your uncertainty accounts for the difference." },
      { title: "A generic evaluation", text: "Human error and more repeats, with no step of the method named and no sense of how much it moved the result." },
      { title: "A method nobody could repeat", text: "Concentrations, volumes, masses or the precision of the equipment left out of the method. Every band of Research design judges whether the investigation could be reproduced from your description." },
    ],
    faq: [
      { q: "Can I submit a database or model investigation?", a: "Yes. The criteria cover investigations that select data from a database or a model, and Research design then looks at how the data were selected and sampled." },
      { q: "Can it read my graphs and tables?", a: "Tables pasted as text come through. Graphs and images do not, so the feedback on how you present data is based on the tables and text you paste. Describe any graph your conclusion depends on." },
      { q: "Does the word count include my data tables?", a: "No. The official 3,000-word count leaves out charts, diagrams, data tables, equations and calculations, citations, the bibliography and headers. IBLens counts every word you paste, so when you are close to the limit or over it, the report reminds you what the official count leaves out." },
      { q: "Can I use it for a Chemistry Extended Essay?", a: "Choose Extended Essay in the grader and pick Chemistry as the subject. The EE is marked on its own criteria, so the IA criteria would put it on the wrong scale." },
      { q: "How accurate is the estimated mark?", a: "It is an estimate, not a mark. A language model applies the published criteria to what you paste, and it can be wrong. Your teacher marks the work and the IB moderates that marking, so their mark is the one that counts. Use the report to find what to fix before you submit." },
      { q: "Is it free?", a: "The first preview is free and needs no account: your band range, your weakest criterion with its full feedback, and the top risks in the draft. The full report, with every criterion marked and a ranked list of fixes, is $9.99, or $24.99 for five and $44.99 for ten." },
      { q: "Is my work stored?", a: "IBLens never saves the text you paste. It passes through our relay server to Anthropic, the AI provider, to produce the report, and Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. Reports made without an account are deleted after 90 days unless you buy the full report, and reports in a signed-in account stay until you delete them." },
    ],
  },
  relatedResources: [
    { label: "Chemistry IA examples", href: "/resources/ib-chemistry-ia-examples" },
    { label: "Chemistry Extended Essay", href: "/resources/ib-chemistry-extended-essay" },
    { label: "Check your IA against the criteria", href: "/resources/ib-ia-feedback" },
  ],
  relatedSubjects: [
    { label: "Biology IA", href: "/essay/biology-ia" },
    { label: "Physics IA", href: "/essay/physics-ia" },
    { label: "Mathematics IA", href: "/essay/math-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function ChemistryIA() {
  return <SubjectEssayPage config={config} />;
}
