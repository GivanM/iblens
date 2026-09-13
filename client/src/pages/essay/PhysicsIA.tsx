import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Physics IA",
  slug: "physics-ia",
  keyword: "IB Physics IA",
  metaTitle: "IB Physics IA Grader: AI Feedback on Your Scientific Investigation | IBLens",
  metaDescription:
    "AI feedback on your IB Physics Internal Assessment against the four criteria: research design, data analysis, conclusion and evaluation. Free preview first, full report $9.99.",
  canonicalPath: "/essay/physics-ia",
  heroHeadline: "Your IB Physics IA, read against the criteria your teacher marks it on",
  heroSubline:
    "Paste your Physics IA and get a criterion-level breakdown with a ranked improvement plan. The free preview comes back in about a minute.",
  analyzerHref: "/essay?type=IA&subject=Physics",
  wordLimit: "3,000-word",
  criteria: [
    { name: "Research design", max: 6, sampleScore: 4 },
    { name: "Data analysis", max: 6, sampleScore: 4 },
    { name: "Conclusion", max: 6, sampleScore: 3 },
    { name: "Evaluation", max: 6, sampleScore: 3 },
  ],
  guide: {
    rubricHeading: "What the Physics IA criteria reward (24 marks)",
    rubricIntro: [
      "The Physics IA is the scientific investigation shared with Biology and Chemistry: four criteria of 6 marks each, one report of up to 3,000 words, worth 20% of the final grade at SL and HL. Your teacher marks it and the IB moderates the marking.",
    ],
    rubricItems: [
      { title: "Research design, 6 marks", text: "A focused research question described within a specific context, with the physics that predicts the relationship, and the methodological choices explained: how each variable is measured, the range and interval of the independent variable, repeats, control variables and safety. The method should be described well enough to reproduce." },
      { title: "Data analysis, 6 marks", text: "Data recorded and processed clearly and precisely, with units, appropriate significant figures, labelled graphs and an appropriate treatment of uncertainties, for example uncertainty bars and the uncertainty in a gradient when a graph is used to find a value." },
      { title: "Conclusion, 6 marks", text: "A conclusion consistent with the processed data and its uncertainties, justified by comparison with accepted physics, such as a theoretical prediction or a published value." },
      { title: "Evaluation, 6 marks", text: "The relative impact of specific weaknesses and limitations explained, such as how well variables were controlled, the precision of the measurements or the range of data collected, with realistic improvements that address them." },
    ],
    mistakesHeading: "Mistakes the Physics IA criteria penalise",
    mistakes: [
      { title: "A curve where a straight line would say more", text: "Plotting a non-linear relationship as measured and reading nothing from it. When theory predicts the form of the relationship, linearising the graph, for example plotting T² against L for a pendulum, lets you use the gradient and intercept. The guide lists linearising graphs, where appropriate, among the skills you are expected to use." },
      { title: "Percentage error and percentage uncertainty confused", text: "Percentage error compares your result with an accepted value. Percentage uncertainty describes the precision of your own measurement. Using one in place of the other undermines both the analysis and the conclusion." },
      { title: "No comparison with accepted physics", text: "Reporting a value for g or for a resistivity without setting it against the accepted value. That comparison belongs to the Conclusion criterion, and the Evaluation then explains what could account for the difference." },
      { title: "A question without a system or a range", text: "'How does temperature affect resistance?' leaves out the system and the range. Naming the component, the variables and the values you will test gives Research design a specific context to reward." },
      { title: "A generic evaluation", text: "Limitations such as human error that are not tied to a step of your method or to their effect on the result." },
    ],
    faq: [
      { q: "Can it read my graphs and tables?", a: "Tables pasted as text come through. Graphs and images do not, so the feedback on how you present data is based on the tables and text you paste. Describe the gradient, the intercept and the uncertainty bars your conclusion depends on." },
      { q: "Does the word count include my data tables?", a: "No. The official 3,000-word count leaves out charts, diagrams, data tables, equations and calculations, citations, the bibliography and headers. IBLens counts every word you paste, so when you are close to the limit or over it, the report reminds you what the official count leaves out." },
      { q: "Can I use it for a Physics Extended Essay?", a: "Choose Extended Essay in the grader and pick Physics as the subject. The EE is marked on its own criteria, so the IA criteria would put it on the wrong scale." },
      { q: "How accurate is the estimated mark?", a: "It is an estimate, not a mark. A language model applies the published criteria to what you paste, and it can be wrong. Your teacher marks the work and the IB moderates that marking, so their mark is the one that counts. Use the report to find what to fix before you submit." },
      { q: "Is it free?", a: "The first preview is free and needs no account: your estimated range, your weakest criterion with its full feedback, and the top risks in the draft. The full report, with every criterion marked and a ranked list of fixes, is $9.99, or $24.99 for five and $44.99 for ten." },
      { q: "Is my work stored?", a: "IBLens never saves the text you paste. It passes through our relay server to Anthropic, the AI provider, to produce the report, and Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. Reports made without an account are deleted after 90 days unless you buy the full report, and reports in a signed-in account stay until you delete them." },
    ],
  },
  relatedResources: [
    { label: "Physics IA examples", href: "/resources/ib-physics-ia-examples" },
    { label: "Check your IA against the criteria", href: "/resources/ib-ia-feedback" },
  ],
  relatedSubjects: [
    { label: "Chemistry IA", href: "/essay/chemistry-ia" },
    { label: "Biology IA", href: "/essay/biology-ia" },
    { label: "Mathematics IA", href: "/essay/math-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function PhysicsIA() {
  return <SubjectEssayPage config={config} />;
}
