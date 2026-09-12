import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Mathematics IA",
  slug: "math-ia",
  keyword: "IB Math IA",
  metaTitle: "IB Math IA Grader: AI Feedback on Your Exploration | IBLens",
  metaDescription:
    "AI feedback in about a minute on your IB Mathematics exploration: presentation, mathematical communication, personal engagement, reflection and use of mathematics, marked out of 20.",
  canonicalPath: "/essay/math-ia",
  heroHeadline: "Where is your IB Math exploration losing marks?",
  heroSubline:
    "Paste your Math IA exploration and get feedback on all five criteria, including Use of mathematics and Personal engagement. Free preview first, full report $9.99.",
  analyzerHref: "/essay?type=IA&subject=Mathematics",
  criteria: [
    { name: "Criterion A: Presentation", max: 4, sampleScore: 3 },
    { name: "Criterion B: Mathematical communication", max: 4, sampleScore: 3 },
    { name: "Criterion C: Personal engagement", max: 3, sampleScore: 2 },
    { name: "Criterion D: Reflection", max: 3, sampleScore: 1 },
    { name: "Criterion E: Use of mathematics", max: 6, sampleScore: 4 },
  ],
  guide: {
    rubricHeading: "What the Math IA criteria reward (20 marks)",
    rubricIntro: [
      "The Math IA is the exploration: a report on a mathematical topic you choose, marked out of 20 on five criteria and worth 20% of the final grade. Analysis and approaches and Applications and interpretation use the same criteria at SL and HL, except that Use of mathematics has separate SL and HL descriptors. Your teacher marks it and the IB moderates the marking.",
      "There is no word limit. The guide suggests about 12 to 20 pages with double line spacing.",
    ],
    rubricItems: [
      { title: "Criterion A: Presentation, 4 marks", text: "A coherent, well-organized and concise exploration: an introduction, a stated aim and a conclusion, the graphs and tables you discuss placed in the text rather than in an appendix, and no repetitive calculations that add nothing." },
      { title: "Criterion B: Mathematical communication, 4 marks", text: "Appropriate notation, symbols and terminology used consistently, key terms and variables defined, suitable forms of representation such as formulae, graphs, tables and diagrams, and proofs set out logically where you use them. Calculator or computer notation is acceptable only in software output." },
      { title: "Criterion C: Personal engagement, 3 marks", text: "Evidence that you made the mathematics your own: thinking independently or creatively, presenting ideas in your own way, looking at the topic from different perspectives, making and testing predictions. It is not a measure of effort." },
      { title: "Criterion D: Reflection, 3 marks", text: "Review, analysis and evaluation of the exploration: what the results mean, the strengths and weaknesses of your approach, what could come next. Describing results is limited reflection. The top level needs critical reflection throughout, or reflection at the end that is of high quality and shows how it developed the exploration." },
      { title: "Criterion E: Use of mathematics, 6 marks", text: "Relevant mathematics at the level of your course, used correctly, with understanding demonstrated rather than answers obtained. At HL the top levels also need sophistication and rigour." },
    ],
    mistakesHeading: "Mistakes the Math IA criteria penalize",
    mistakes: [
      { title: "A textbook exploration", text: "Reproducing a known result or derivation without your own perspective. The guide says this is unlikely to reach the higher levels of Personal engagement." },
      { title: "Mathematics below the course", text: "An exploration built entirely on mathematics from prior learning. Use of mathematics expects work commensurate with your course, so it should not rest completely on prior learning." },
      { title: "Mathematics for show", text: "Overly complicated methods where simpler ones would do. The guide does not count them as relevant, and a few things done well score better than many done badly." },
      { title: "Answers without understanding", text: "Correct results from a calculator or software with no reasoning shown. Obtaining the right answer is not enough to demonstrate understanding." },
      { title: "No aim", text: "Starting without saying what you want to find out. A stated aim is part of a well-organized exploration under Presentation, and reflection is easier to show when it links back to the aim." },
      { title: "Unlabelled graphs", text: "Graphs without labels are one of the guide's examples of the lowest level of Mathematical communication." },
    ],
    faq: [
      { q: "Does it work for both AA and AI?", a: "Yes. The criteria are the same for both courses. What differs is the syllabus, which sets what counts as mathematics at the level of your course. There are separate pages for Analysis and approaches and for Applications and interpretation." },
      { q: "How does it know whether I take SL or HL?", a: "Write your course and level, for example Math AA HL, at the top of the text you paste. The analyzer asks for the subject only, and Use of mathematics has separate SL and HL descriptors." },
      { q: "Can it read my equations and graphs?", a: "Equations come through when they paste as text. Graphs and images do not, so the report reads the working and the explanation around them." },
      { q: "How accurate is the predicted mark?", a: "It is an estimate, not a mark. A language model applies the published criteria to what you paste, and it can be wrong. Your teacher marks the work and the IB moderates that marking, so their mark is the one that counts. Use the report to find what to fix before you submit." },
      { q: "Is it free?", a: "The first preview is free and needs no account: your band range, your weakest criterion with its full feedback, and the top risks in the draft. The full report, with every criterion marked and a ranked list of fixes, is $9.99, or $24.99 for a pack of five." },
      { q: "Is my work stored?", a: "The text you paste is never stored. It is sent to Anthropic, the AI provider, to produce the report. Reports made without an account are deleted after 90 days unless you buy the full report, and reports in a signed-in account stay until you delete them." },
    ],
  },
  relatedResources: [
    { label: "Math IA examples", href: "/resources/ib-math-ia-examples" },
    { label: "Maths AA IA grader", href: "/essay/maths-aa-ia" },
    { label: "Maths AI IA grader", href: "/essay/maths-ai-ia" },
  ],
  relatedSubjects: [
    { label: "Physics IA", href: "/essay/physics-ia" },
    { label: "Chemistry IA", href: "/essay/chemistry-ia" },
    { label: "Biology IA", href: "/essay/biology-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function MathematicsIA() {
  return <SubjectEssayPage config={config} />;
}
