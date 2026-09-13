import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Mathematics: Applications and Interpretation IA",
  slug: "maths-ai-ia",
  keyword: "IB Math AI IA",
  metaTitle: "IB Math AI IA Grader: AI Feedback on Your Applications and Interpretation Exploration | IBLens",
  metaDescription:
    "AI feedback on your IB Mathematics: Applications and Interpretation exploration: presentation, mathematical communication, personal engagement, reflection and use of mathematics, marked out of 20.",
  canonicalPath: "/essay/maths-ai-ia",
  heroHeadline: "Is your IB Math AI exploration on track?",
  heroSubline:
    "Paste your Mathematics: Applications and Interpretation exploration and get feedback on all five criteria in about a minute, including Use of mathematics and Reflection. Free preview first.",
  analyzerHref: "/essay?type=IA&subject=Mathematics",
  criteria: [
    { name: "Criterion A: Presentation", max: 4, sampleScore: 3 },
    { name: "Criterion B: Mathematical communication", max: 4, sampleScore: 3 },
    { name: "Criterion C: Personal engagement", max: 3, sampleScore: 2 },
    { name: "Criterion D: Reflection", max: 3, sampleScore: 2 },
    { name: "Criterion E: Use of mathematics", max: 6, sampleScore: 4 },
  ],
  guide: {
    rubricHeading: "What the Math AI IA criteria reward (20 marks)",
    rubricIntro: [
      "Mathematics: applications and interpretation uses the same five exploration criteria as Analysis and approaches, out of 20 and worth 20% of the final grade. Use of mathematics judges whether your mathematics is commensurate with the AI syllabus at your level, with separate SL and HL descriptors. Your teacher marks it and the IB moderates the marking.",
      "There is no word limit. The guide suggests about 12 to 20 pages with double line spacing.",
    ],
    rubricItems: [
      { title: "Criterion A: Presentation, 4 marks", text: "A coherent, well-organised and concise exploration with an introduction, a stated aim and a conclusion. Large data sets belong in an appendix, and the graphs and tables you discuss belong in the text." },
      { title: "Criterion B: Mathematical communication, 4 marks", text: "Appropriate notation, symbols and terminology used consistently, key terms and variables defined, and suitable representations such as tables, graphs and models. Calculator or computer notation is acceptable only in software output." },
      { title: "Criterion C: Personal engagement, 3 marks", text: "Evidence that you made the mathematics your own: independent or creative thinking, different perspectives on the topic, predictions made and tested." },
      { title: "Criterion D: Reflection, 3 marks", text: "Critical review of the exploration, such as what your results imply, how well your approach worked and where it stops applying, and what could come next." },
      { title: "Criterion E: Use of mathematics, 6 marks", text: "Relevant mathematics commensurate with the course, used correctly, with understanding demonstrated. At HL, level 5 also needs sophistication or rigour, and level 6 needs both." },
    ],
    mistakesHeading: "Mistakes the Math AI IA criteria penalise",
    mistakes: [
      { title: "Software output without understanding", text: "A regression line or a test result copied from software with no explanation of what it means. Substituting values or reporting results does not by itself demonstrate understanding." },
      { title: "Data with no question", text: "Collecting data first and looking for mathematics afterwards leaves the exploration without an aim, which Presentation and Reflection both depend on." },
      { title: "A model that is never questioned", text: "Fitting a model and stopping there. Discussing how well it fits, what it assumes and where it breaks down is the kind of reflection that goes beyond describing results." },
      { title: "Mathematics for show", text: "Overly complicated methods where simpler ones would do. The guide does not count them as relevant, and a few things done well score better than many done badly." },
      { title: "Unlabelled graphs", text: "Graphs without labels are one of the guide's examples of the lowest level of Mathematical communication." },
    ],
    faq: [
      { q: "What is the difference between the AI and AA IA?", a: "The criteria and the 20-mark total are the same. The syllabus differs, and Use of mathematics is judged against the course you take and your level." },
      { q: "How does it know whether I take SL or HL?", a: "Write your course and level, for example Math AI SL, at the top of the text you paste. The analyser asks for the subject only, and Use of mathematics has separate SL and HL descriptors." },
      { q: "Should I paste my raw data?", a: "Put large data sets in an appendix, as the guide advises, and paste the part of the exploration that uses them. Up to 30,000 characters are marked, so a long table of raw data can crowd out the text." },
      { q: "How accurate is the predicted mark?", a: "It is an estimate, not a mark. A language model applies the published criteria to what you paste, and it can be wrong. Your teacher marks the work and the IB moderates that marking, so their mark is the one that counts. Use the report to find what to fix before you submit." },
      { q: "Is it free?", a: "The first preview is free and needs no account: your band range, your weakest criterion with its full feedback, and the top risks in the draft. The full report, with every criterion marked and a ranked list of fixes, is $9.99, or $24.99 for a pack of five." },
      { q: "Is my work stored?", a: "The text you paste is never stored. It is sent to Anthropic, the AI provider, to produce the report. Reports made without an account are deleted after 90 days unless you buy the full report, and reports in a signed-in account stay until you delete them." },
    ],
  },
  relatedResources: [
    { label: "Math IA examples", href: "/resources/ib-math-ia-examples" },
    { label: "General Math IA grader", href: "/essay/math-ia" },
    { label: "Maths AA IA grader", href: "/essay/maths-aa-ia" },
  ],
  relatedSubjects: [
    { label: "Math AA IA", href: "/essay/maths-aa-ia" },
    { label: "Physics IA", href: "/essay/physics-ia" },
    { label: "Economics IA", href: "/essay/economics-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function MathsAIIA() {
  return <SubjectEssayPage config={config} />;
}
