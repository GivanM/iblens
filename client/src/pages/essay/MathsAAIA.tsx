import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Mathematics: Analysis and Approaches IA",
  slug: "maths-aa-ia",
  keyword: "IB Math AA IA",
  metaTitle: "IB Math AA IA Grader: AI Feedback on Your Analysis and Approaches Exploration | IBLens",
  metaDescription:
    "AI feedback on your IB Mathematics: Analysis and Approaches exploration: presentation, mathematical communication, personal engagement, reflection and use of mathematics, marked out of 20.",
  canonicalPath: "/essay/maths-aa-ia",
  heroHeadline: "Where is your IB Math AA exploration losing marks?",
  heroSubline:
    "Paste your Mathematics: Analysis and Approaches exploration and get feedback on all five criteria, including Use of mathematics and Personal engagement. Free preview first, full report $9.99.",
  analyzerHref: "/essay?type=IA&subject=Mathematics",
  criteria: [
    { name: "Criterion A: Presentation", max: 4, sampleScore: 3 },
    { name: "Criterion B: Mathematical communication", max: 4, sampleScore: 3 },
    { name: "Criterion C: Personal engagement", max: 3, sampleScore: 2 },
    { name: "Criterion D: Reflection", max: 3, sampleScore: 2 },
    { name: "Criterion E: Use of mathematics", max: 6, sampleScore: 4 },
  ],
  guide: {
    rubricHeading: "What the Math AA IA criteria reward (20 marks)",
    rubricIntro: [
      "Mathematics: analysis and approaches is marked on the same five exploration criteria as Applications and interpretation, out of 20 and worth 20% of the final grade. What changes with the course is the mathematics: Use of mathematics judges whether yours is commensurate with the AA syllabus at your level, with separate SL and HL descriptors. Your teacher marks it and the IB moderates the marking.",
      "There is no word limit. The guide suggests about 12 to 20 pages with double line spacing.",
    ],
    rubricItems: [
      { title: "Criterion A: Presentation, 4 marks", text: "A coherent, well-organised and concise exploration with an introduction, a stated aim and a conclusion." },
      { title: "Criterion B: Mathematical communication, 4 marks", text: "Appropriate notation, symbols and terminology used consistently, key terms and variables defined, and a deductive method with proofs set out logically where the exploration uses them." },
      { title: "Criterion C: Personal engagement, 3 marks", text: "Evidence that you made the mathematics your own, for example by thinking independently or creatively, looking at the topic from different perspectives, or making and testing predictions." },
      { title: "Criterion D: Reflection, 3 marks", text: "Critical review of the exploration: the implications of your results, the strengths and weaknesses of your approach, and what could come next." },
      { title: "Criterion E: Use of mathematics, 6 marks", text: "At SL, the top level needs relevant mathematics commensurate with the course that is correct and shows thorough knowledge and understanding. At HL, level 5 adds sophistication or rigour, and level 6 needs precise mathematics with sophistication and rigour." },
    ],
    rubricNote: [
      "Sophistication means mathematics commensurate with the HL syllabus, or SL mathematics used in a complex way beyond what could reasonably be expected of an SL student. Rigour means clear logic and language, with the mathematical claims your exploration relies on justified or proven.",
    ],
    mistakesHeading: "Mistakes the Math AA IA criteria penalise",
    mistakes: [
      { title: "Claims assumed, not justified", text: "Using a result the exploration depends on without justifying or proving it. At HL, rigour requires those claims to be justified or proven." },
      { title: "Beyond the syllabus for its own sake", text: "Mathematics slightly beyond the syllabus is allowed at HL but is not needed for the highest levels, and overly complicated mathematics where simpler methods would do is not relevant." },
      { title: "Answers without understanding", text: "Substituting values into a formula, or quoting a software result, does not by itself demonstrate understanding, and understanding is what the upper levels of Use of mathematics reward." },
      { title: "A textbook exploration", text: "Reproducing a known result or derivation without your own perspective. The guide says this is unlikely to reach the higher levels of Personal engagement." },
      { title: "Reflection saved for the last paragraph", text: "A closing paragraph that restates the results. Describing results is limited reflection, and reflection that appears only at the end has to be of high quality, and show how it developed the exploration, to reach the top level." },
    ],
    faq: [
      { q: "What is the difference between the AA and AI IA?", a: "The criteria and the 20-mark total are the same. The syllabus differs, and Use of mathematics is judged against the course you take and your level." },
      { q: "How does it know whether I take SL or HL?", a: "Write your course and level, for example Math AA HL, at the top of the text you paste. The grader asks for the subject only, and Use of mathematics has separate SL and HL descriptors." },
      { q: "Can it read my proofs and graphs?", a: "Proofs and equations come through when they paste as text. Graphs and images do not, so the report reads the working and the explanation around them." },
      { q: "How accurate is the estimated mark?", a: "It is an estimate, not a mark. A language model applies the published criteria to what you paste, and it can be wrong. Your teacher marks the work and the IB moderates that marking, so their mark is the one that counts. Use the report to find what to fix before you submit." },
      { q: "Is it free?", a: "The first preview is free and needs no account: a range of totals that contains the estimate and, for most drafts, your weakest criterion with its feedback and the top risks in the draft. The full report, with every criterion marked and a ranked list of fixes, is $9.99, or $24.99 for five and $44.99 for ten." },
      { q: "Is my work stored?", a: "IBLens never saves the text you paste. It passes through our relay server to Anthropic, the AI provider, to produce the report, and Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. Reports made without an account are deleted after 90 days unless you buy the full report, and reports in a signed-in account stay until you delete them." },
    ],
  },
  relatedResources: [
    { label: "Math IA examples", href: "/resources/ib-math-ia-examples" },
    { label: "General Math IA grader", href: "/essay/math-ia" },
    { label: "Math AI IA grader", href: "/essay/maths-ai-ia" },
  ],
  relatedSubjects: [
    { label: "Math AI IA", href: "/essay/maths-ai-ia" },
    { label: "Physics IA", href: "/essay/physics-ia" },
    { label: "Chemistry IA", href: "/essay/chemistry-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function MathsAAIA() {
  return <SubjectEssayPage config={config} />;
}
