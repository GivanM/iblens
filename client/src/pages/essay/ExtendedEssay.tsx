import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Extended Essay",
  slug: "extended-essay",
  keyword: "IB Extended Essay",
  metaTitle: "IB Extended Essay Grader: AI Feedback on Your EE | IBLens",
  metaDescription:
    "AI feedback on your IB Extended Essay against either rubric: the 34-mark criteria through November 2026 or the new 30-mark criteria from May 2027. Criterion-by-criterion report, free preview first.",
  canonicalPath: "/essay/extended-essay",
  heroHeadline: "See where your Extended Essay stands before you submit",
  heroNote: "Ask your supervisor first: the Extended Essay guide says students are not allowed to receive assistance with any aspect of the research, writing or proofreading of the essay beyond that which is permitted through their supervisor.",
  heroSubline:
    "Paste your Extended Essay and choose your exam session: you get a criterion-level report against the criteria you will be marked on. Free preview first, full report $9.99.",
  analyzerHref: "/essay?type=EE",
  wordLimit: "4,000-word",
  criteriaCaveat: "A mark for every criterion, with the reason for each one. Criterion E is marked on your reflections, so paste them into their own box",
  sessionAware: true,
  criteria: [
    { name: "Criterion A: Framework for the essay", max: 6, sampleScore: 4 },
    { name: "Criterion B: Knowledge and understanding", max: 6, sampleScore: 4 },
    { name: "Criterion C: Analysis and line of argument", max: 6, sampleScore: 4 },
    { name: "Criterion D: Discussion and evaluation", max: 8, sampleScore: 5 },
    { name: "Criterion E: Reflection", max: 4, sampleScore: 2 },
  ],
  sampleCaption: "Criteria from May 2027. Through November 2026 the essay is marked out of 34 on the older criteria.",
  guide: {
    rubricHeading: "What the Extended Essay criteria reward",
    rubricIntro: [
      "Before you paste your draft, ask your supervisor: the rule above covers any outside feedback on your EE, IBLens included.",
      "The criteria depend on your exam session. From May 2027 the essay is marked out of 30 on new criteria. Through November 2026 it is marked out of 34 on the older ones. Choose your session in the grader and the report uses the matching set.",
      "In both cases the limit is 4,000 words, and examiners do not assess anything beyond it. The EE is marked by IB examiners, not by your supervisor. The criteria below apply from May 2027.",
    ],
    rubricItems: [
      { title: "Criterion A: Framework for the essay, 6 marks", text: "Your research question, the research methods you chose, and whether the structural conventions you follow support communication of the research." },
      { title: "Criterion B: Knowledge and understanding, 6 marks", text: "Comprehensive, relevant research materials used to establish knowledge of the subject matter, relevant terminology used accurately and consistently, and relevant concepts explained and used effectively." },
      { title: "Criterion C: Analysis and line of argument, 6 marks", text: "Analysis of your research and a clear, coherent argument that runs through the essay." },
      { title: "Criterion D: Discussion and evaluation, 8 marks", text: "A balanced discussion of the significance of your findings, supported by appropriate evidence, and an evaluation of how effective the essay is, with its strengths and limitations explained. It carries the most marks." },
      { title: "Criterion E: Reflection, 4 marks", text: "Marked on the reflective statement in your reflection and progress form (RPF), up to 500 words, not on the essay. It rewards evaluative reflection, with specific examples, on how the EE affected you as a learner, showing growth and transfer of learning. A description of the process is the lowest level." },
    ],
    rubricNote: [
      "Through November 2026 the criteria are Focus and method (6 marks), Knowledge and understanding (6), Critical thinking (12), Presentation (4) and Engagement (6). Engagement is marked on the three reflections in the Reflections on planning and progress form (RPPF), 500 words in total.",
    ],
    mistakesHeading: "Mistakes the Extended Essay criteria penalise",
    mistakes: [
      { title: "A question too broad for 4,000 words", text: "A topic such as the impact of social media cannot be argued in depth at this length. A narrow question gives Criterion A something to reward and leaves room for the discussion and evaluation that carry the most marks." },
      { title: "Summary in place of analysis", text: "Paragraphs that report what sources say without using them to build your answer. From May 2027 analysis and a line of argument are a criterion of their own, and before that they sit inside Critical thinking." },
      { title: "An essay that never evaluates itself", text: "Findings reported without discussing their significance, and no account of the strengths and limitations of the essay's own method and sources. From May 2027 those are the two strands of Criterion D, the highest-weighted criterion." },
      { title: "Words past the limit", text: "Examiners do not read beyond 4,000 words, so an over-length essay loses on every criterion, not just one. Footnotes that are not references count towards the limit. Citations, the bibliography, tables, charts, equations and the contents page do not." },
      { title: "A reflection form that is missing, blank or in the wrong language", text: "Criterion E is marked only on your reflections, not on the essay. A reflection form that is blank, not submitted or written in a language other than that of the essay is awarded zero for Criterion E: the RPPF through November 2026, and the RPF from May 2027. Paste your reflections into their own box in the grader; without them the report leaves that criterion unmarked and totals the others." },
    ],
    faq: [
      { q: "Which subjects does it cover?", a: "The criteria are the same in every subject. Pick your EE subject in the grader, so the feedback on knowledge and terminology is read in that subject. The list covers the common EE subjects, including Geography, Global Politics, Philosophy and interdisciplinary essays, and \"Another subject\" for the rest." },
      { q: "Can I paste my whole essay?", a: "Yes. Up to 30,000 characters, about 5,000 words, are marked, which is enough for a 4,000-word essay. Leave the bibliography out if space is tight." },
      { q: "Which session am I in?", a: "It depends on when you sit your exams, not on when you started the course. May 2027 or later means the 30-mark criteria and the RPF. November 2026 means the 34-mark criteria and the RPPF. Your IB coordinator can confirm." },
      { q: "How accurate is the estimated mark?", a: "It is an estimate, not a mark. A language model applies the published criteria to what you paste, and it can be wrong. IB examiners mark this component, so their mark is the one that counts. Use the report to find what to fix before you submit." },
      { q: "Is it free?", a: "The first preview is free and needs no account: a range of totals that contains the estimate and, for most drafts, your weakest criterion with its feedback and the top risks in the draft. The full report, with a mark for every criterion (Criterion E only when you paste your reflections) and a ranked list of fixes, is $9.99, or $24.99 for five and $44.99 for ten." },
      { q: "Is my work stored?", a: "IBLens never saves the text you paste. It passes through our relay server to Anthropic, the AI provider, to produce the report, and Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. Reports made without an account are deleted after 90 days unless you buy the full report, and reports in a signed-in account stay until you delete them." },
    ],
  },
  relatedResources: [
    { label: "IB Extended Essay guide", href: "/resources/ib-extended-essay-guide" },
    { label: "New criteria for May 2027", href: "/resources/ib-extended-essay-new-criteria-2027" },
    { label: "How to get feedback before you submit", href: "/resources/ib-extended-essay-feedback" },
    { label: "The 4,000-word limit", href: "/resources/ib-extended-essay-word-count" },
    { label: "EE examples by subject", href: "/resources/ib-ee-examples-by-subject" },
  ],
  relatedSubjects: [
    { label: "Business Management IA", href: "/essay/business-management-ia" },
    { label: "Economics IA", href: "/essay/economics-ia" },
    { label: "History IA", href: "/essay/history-ia" },
    { label: "English A individual oral", href: "/essay/english-essay" },
  ],
};

export default function ExtendedEssay() {
  return <SubjectEssayPage config={config} />;
}
