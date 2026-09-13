import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Psychology IA",
  slug: "psychology-ia",
  keyword: "IB Psychology IA",
  metaTitle: "IB Psychology IA Grader: AI Feedback on Your Report or Proposal | IBLens",
  metaDescription:
    "AI feedback on your IB Psychology Internal Assessment: the experimental report out of 22 through November 2026, or the research proposal out of 24 from May 2027. Free preview first.",
  canonicalPath: "/essay/psychology-ia",
  heroHeadline: "Get your IB Psychology IA read against the criteria for your session",
  heroSubline:
    "Paste your Psychology IA and choose your exam session, then find out where you are losing marks, criterion by criterion, in about a minute.",
  analyzerHref: "/essay?type=IA&subject=Psychology",
  wordLimit: "2,200-word",
  sessionAware: true,
  criteria: [
    { name: "Criterion A: Introduction", max: 6, sampleScore: 4 },
    { name: "Criterion B: Research methodology", max: 6, sampleScore: 4 },
    { name: "Criterion C: Data collection", max: 6, sampleScore: 3 },
    { name: "Criterion D: Discussion", max: 6, sampleScore: 3 },
  ],
  sampleCaption: "The research proposal criteria, from May 2027. Through November 2026 the IA is an experimental report marked out of 22.",
  guide: {
    rubricHeading: "What the Psychology IA criteria reward",
    rubricIntro: [
      "The task depends on your exam session. From May 2027 the IA is a research proposal marked out of 24: you design a study but do not carry it out. Through November 2026 it is an experimental report marked out of 22. Choose your session in the grader and the report uses the matching criteria.",
      "The research proposal is limited to 2,200 words, and anything past the limit is not marked. It is worth 30% of the final grade at SL and 20% at HL, and it uses one of four methods: an experiment, interviews, observations or a survey. Your teacher marks it and the IB moderates the marking.",
    ],
    rubricItems: [
      { title: "Criterion A: Introduction, 6 marks", text: "A clearly stated and focused aim or research question, a real-life problem with its impact on your population of interest explained, and the findings and conclusions of two pieces of relevant research explained and linked to your proposal." },
      { title: "Criterion B: Research methodology, 6 marks", text: "Your choice of research method and your procedure explained, including the sampling, the sample, the design where relevant and the setting, with the relevant ethical considerations explicitly linked to your study." },
      { title: "Criterion C: Data collection, 6 marks", text: "One data collection tool you created, such as a questionnaire or an observation checklist, with at least five items and a copy in the appendix. The decisions behind the tool and the potential challenges of collecting the data are both explained." },
      { title: "Criterion D: Discussion, 6 marks", text: "The potential findings with their implications for policy or practice, how researcher bias may affect the investigation, and one additional research method discussed in terms of how it would increase understanding of the topic." },
    ],
    rubricNote: [
      "Through November 2026, the experimental report of 1,800 to 2,200 words is marked on Introduction (6 marks), Exploration (4), Analysis (6) and Evaluation (6), and is worth 25% of the final grade at SL and 20% at HL. Its top bands ask for an explained aim, the theory or model linked to your study and operationalised variables in the hypotheses; an explained design, sampling technique, choice of participants, controls and materials; descriptive and inferential statistics applied accurately, with a graph that addresses the hypothesis; and findings discussed against the theory, with limitations explained and modifications linked to them.",
    ],
    mistakesHeading: "Mistakes the Psychology IA criteria penalise",
    mistakes: [
      { title: "A problem without a population (May 2027)", text: "A proposal about stress in general. Criterion A asks for the impact of the problem on a specific population of interest." },
      { title: "Ethics copied from a template (May 2027)", text: "A standard paragraph on consent and the right to withdraw. The top band of Criterion B needs ethical considerations explicitly linked to your study, and the guide asks for particular care with vulnerable populations and sensitive topics." },
      { title: "A tool with no reasoning behind it (May 2027)", text: "A questionnaire in the appendix with no explanation of why its items measure what they should. Criterion C marks the decisions behind the tool as well as the tool." },
      { title: "Researcher bias left out (May 2027)", text: "Criterion D asks how your own position, such as your background or your relation to the participants, could affect the investigation." },
      { title: "Variables not operationalised (through November 2026)", text: "A hypothesis such as 'stress affects memory'. The top Introduction band needs the independent and dependent variables operationalised in the hypotheses." },
      { title: "Only one kind of statistics (through November 2026)", text: "Means without an inferential test, or a test without descriptive statistics. Applying only one of the two is the lowest band of Analysis." },
      { title: "Avoidable mistakes offered as limitations (through November 2026)", text: "The guide does not accept human error, or accidents and omissions that planning could have prevented, as limitations. Evaluate the design, the sample and the procedure instead." },
    ],
    faq: [
      { q: "Which session am I in?", a: "It depends on when you sit your exams, not on when you started the course. May 2027 or later means the research proposal. November 2026 means the experimental report. Your IB coordinator can confirm." },
      { q: "Do I need results for the research proposal?", a: "No. From May 2027 you design the study without carrying it out, so there is no data to analyse. Criterion D discusses the potential findings instead." },
      { q: "Can I use it for a Psychology Extended Essay?", a: "Choose Extended Essay in the grader and pick Psychology as the subject. The EE is marked on its own criteria." },
      { q: "How accurate is the estimated mark?", a: "It is an estimate, not a mark. A language model applies the published criteria to what you paste, and it can be wrong. Your teacher marks the work and the IB moderates that marking, so their mark is the one that counts. Use the report to find what to fix before you submit." },
      { q: "Is it free?", a: "The first preview is free and needs no account: a range of totals that contains the estimate and, for most drafts, your weakest criterion with its feedback and the top risks in the draft. The full report, with every criterion marked and a ranked list of fixes, is $9.99, or $24.99 for five and $44.99 for ten." },
      { q: "Is my work stored?", a: "IBLens never saves the text you paste. It passes through our relay server to Anthropic, the AI provider, to produce the report, and Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. Reports made without an account are deleted after 90 days unless you buy the full report, and reports in a signed-in account stay until you delete them." },
    ],
  },
  relatedResources: [
    { label: "Psychology IA guide", href: "/resources/ib-psychology-ia" },
    { label: "What changes in 2027", href: "/resources/ib-psychology-ia-2027" },
    { label: "Psychology Extended Essay", href: "/resources/ib-psychology-extended-essay" },
  ],
  relatedSubjects: [
    { label: "Biology IA", href: "/essay/biology-ia" },
    { label: "History IA", href: "/essay/history-ia" },
    { label: "English A individual oral", href: "/essay/english-essay" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function PsychologyIA() {
  return <SubjectEssayPage config={config} />;
}
