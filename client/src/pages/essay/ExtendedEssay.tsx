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
  heroSubline:
    "Paste your Extended Essay and choose your exam session: you get a criterion-level report against the criteria you will be marked on. Free preview first, full report $9.99.",
  analyzerHref: "/essay?type=EE",
  wordLimit: "4,000-word",
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
      "The criteria depend on your exam session. From May 2027 the essay is marked out of 30 on new criteria. Through November 2026 it is marked out of 34 on the older ones. Choose your session in the analyzer and the report uses the matching set.",
      "In both cases the limit is 4,000 words, and examiners do not assess anything beyond it. The EE is marked by IB examiners, not by your supervisor. The criteria below apply from May 2027.",
    ],
    rubricItems: [
      { title: "Criterion A: Framework for the essay, 6 marks", text: "Your research question, the methods you chose to answer it and the structure of the essay. It takes in what the older Presentation criterion covered." },
      { title: "Criterion B: Knowledge and understanding, 6 marks", text: "Knowledge of the topic, with the terminology and concepts of your subject used accurately and effectively." },
      { title: "Criterion C: Analysis and line of argument, 6 marks", text: "Analysis of your research and a clear, coherent argument that runs through the essay." },
      { title: "Criterion D: Discussion and evaluation, 8 marks", text: "A balanced discussion of the significance of your findings, supported by appropriate evidence, and an evaluation of how effective the essay is, with its strengths and limitations explained. It carries the most marks." },
      { title: "Criterion E: Reflection, 4 marks", text: "Marked on the reflective statement in your Reflection and Progress Form (RPF), up to 500 words, not on the essay. It rewards evaluative reflection, with specific examples, on how the EE affected you as a learner, showing growth and transfer of learning. A description of the process is the lowest level." },
    ],
    rubricNote: [
      "Through November 2026 the criteria are Focus and method (6 marks), Knowledge and understanding (6), Critical thinking (12), Presentation (4) and Engagement (6). Engagement is marked on the three reflections in the Reflections on planning and progress form (RPPF), 500 words in total.",
    ],
    mistakesHeading: "Mistakes the Extended Essay criteria penalize",
    mistakes: [
      { title: "A question too broad for 4,000 words", text: "A topic such as the impact of social media cannot be argued in depth at this length. A narrow question gives Criterion A something to reward and leaves room for the discussion and evaluation that carry the most marks." },
      { title: "Summary in place of analysis", text: "Paragraphs that report what sources say without using them to build your answer. From May 2027 analysis and a line of argument are a criterion of their own, and before that they sit inside Critical thinking." },
      { title: "An essay that never evaluates itself", text: "Findings reported without discussing their significance, and no account of the strengths and limitations of the essay's own method and sources. From May 2027 those are the two strands of Criterion D, the highest-weighted criterion." },
      { title: "Words past the limit", text: "Examiners do not read beyond 4,000 words, so an over-length essay loses on every criterion, not just one. Footnotes that are not references count toward the limit. Citations, the bibliography, tables, charts, equations and the contents page do not." },
      { title: "No reflections pasted", text: "Criterion E is marked on the RPF or the RPPF, not on the essay. Paste your reflections into their own box in the analyzer. Without them the report leaves that criterion unmarked and totals the others." },
    ],
    faq: [
      { q: "Which subjects does it cover?", a: "The criteria are the same in every subject. Pick your EE subject from the 14 in the analyzer, so the feedback on knowledge and terminology is read in that subject." },
      { q: "Can I paste my whole essay?", a: "Yes. Up to 30,000 characters, about 5,000 words, are marked, which is enough for a 4,000-word essay. Leave the bibliography out if space is tight." },
      { q: "Which session am I in?", a: "It depends on when you sit your exams, not on when you started the course. May 2027 or later means the 30-mark criteria and the RPF. November 2026 means the 34-mark criteria and the RPPF. Your IB coordinator can confirm." },
      { q: "How accurate is the predicted mark?", a: "It is an estimate, not a mark. A language model applies the published criteria to what you paste, and it can be wrong. IB examiners mark this component, so their mark is the one that counts. Use the report to find what to fix before you submit." },
      { q: "Is it free?", a: "The first preview is free and needs no account: your band range, your weakest criterion with its full feedback, and the top risks in the draft. The full report, with every criterion marked and a ranked list of fixes, is $9.99, or $24.99 for a pack of five." },
      { q: "Is my work stored?", a: "The text you paste is never stored. It is sent to Anthropic, the AI provider, to produce the report. Reports made without an account are deleted after 90 days unless you buy the full report, and reports in a signed-in account stay until you delete them." },
    ],
  },
  relatedResources: [
    { label: "IB Extended Essay Guide", href: "/resources/ib-extended-essay-guide" },
    { label: "New criteria for May 2027", href: "/resources/ib-extended-essay-new-criteria-2027" },
    { label: "How to get feedback before you submit", href: "/resources/ib-extended-essay-feedback" },
    { label: "The 4,000-word limit", href: "/resources/ib-extended-essay-word-count" },
    { label: "EE examples by subject", href: "/resources/ib-ee-examples-by-subject" },
  ],
  relatedSubjects: [
    { label: "Business Management IA", href: "/essay/business-management-ia" },
    { label: "Economics IA", href: "/essay/economics-ia" },
    { label: "History IA", href: "/essay/history-ia" },
    { label: "English Individual Oral", href: "/essay/english-essay" },
  ],
};

export default function ExtendedEssay() {
  return <SubjectEssayPage config={config} />;
}
