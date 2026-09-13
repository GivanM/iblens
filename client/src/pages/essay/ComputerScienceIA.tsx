import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "Computer Science IA",
  slug: "computer-science-ia",
  keyword: "IB Computer Science IA",
  metaTitle: "IB Computer Science IA Grader: AI Feedback on Your Solution | IBLens",
  metaDescription:
    "AI feedback on your IB Computer Science Internal Assessment against the 34-mark criteria through November 2026 or the new 30-mark criteria from May 2027. Free preview first, no account needed.",
  canonicalPath: "/essay/computer-science-ia",
  heroHeadline: "Is your Computer Science IA losing marks you can't see?",
  heroSubline:
    "Paste your CS IA documentation and get feedback against the criteria for your exam session, criterion by criterion. The free preview comes back in about a minute.",
  analyzerHref: "/essay?type=IA&subject=Computer%20Science",
  sessionAware: true,
  criteria: [
    { name: "Criterion A: Problem specification", max: 4, sampleScore: 3 },
    { name: "Criterion B: Planning", max: 4, sampleScore: 3 },
    { name: "Criterion C: System overview", max: 6, sampleScore: 4 },
    { name: "Criterion D: Development", max: 12, sampleScore: 7 },
    { name: "Criterion E: Evaluation", max: 4, sampleScore: 2 },
  ],
  sampleCaption: "The computational solution criteria, from May 2027. Through November 2026 the IA is marked out of 34 on a different set.",
  guide: {
    rubricHeading: "What the Computer Science IA criteria reward",
    rubricIntro: [
      "The criteria depend on your exam session. From May 2027 the IA is a computational solution marked out of 30, documented in up to 2,000 words, with code excerpts, comments and diagrams not counted, plus a video of up to 5 minutes. There is no longer a client requirement. Through November 2026 it is the 34-mark solution, which involves a client or an adviser. Choose your session in the grader and the report uses the matching criteria.",
      "The criteria below apply from May 2027.",
    ],
    rubricItems: [
      { title: "Criterion A: Problem specification, 4 marks", text: "The problem scenario described in terms of measurable solution requirements, appropriate success criteria, and an explanation of why the computational context you chose fits the problem." },
      { title: "Criterion B: Planning, 4 marks", text: "A reasonable decomposition of the problem scenario and a plan that addresses the success criteria." },
      { title: "Criterion C: System overview, 6 marks", text: "A complete system model, algorithms for its components that would let the product perform, and a testing strategy aligned with the success criteria." },
      { title: "Criterion D: Development, 12 marks", text: "A fully functional product, shown in the video, built with appropriate techniques to implement the algorithms, with your implementation choices evaluated and the effectiveness of your testing strategy justified." },
      { title: "Criterion E: Evaluation, 4 marks", text: "An evaluation of the extent to which the success criteria were met, and justified improvements to the product." },
    ],
    rubricNote: [
      "Through November 2026 the criteria are Planning (6 marks), Solution overview (6), Development (12), Functionality and extensibility of product (4) and Evaluation (6), with feedback from your client or adviser part of the evaluation.",
    ],
    mistakesHeading: "Mistakes the Computer Science IA criteria penalise",
    mistakes: [
      { title: "Success criteria nobody can test", text: "'The app should be easy to use' gives the evaluation nothing to measure. Write criteria that a test can show are met or not met." },
      { title: "A plan with no link to the success criteria", text: "A timeline written after the product was built. From May 2027, Planning rewards decomposing the problem and planning a solution that addresses the success criteria." },
      { title: "Choices shown but never evaluated", text: "Screenshots of code with no discussion of why the algorithms were implemented that way or what the alternatives were. The top band of Development asks you to evaluate your implementation choices, and the documentation is where that shows." },
      { title: "Testing that only tries normal inputs", text: "A testing strategy that never tries invalid or boundary inputs. The system overview has to include a testing strategy aligned with the success criteria, and Development asks you to justify how effective it was." },
      { title: "Long code listings", text: "Pasting whole files into the documentation. Code excerpts do not count towards the 2,000 words from May 2027, but they do not explain your decisions either." },
    ],
    faq: [
      { q: "Can it see my product or my video?", a: "No. It reads the documentation you paste. Criteria that rest on the working product and the video, Development in particular, are marked on what the documentation shows, and the report says so." },
      { q: "Do I still need a client?", a: "Not from May 2027. Through November 2026 the client or adviser is part of the task." },
      { q: "Which session am I in?", a: "It depends on when you sit your exams, not on when you started the course. May 2027 or later means the 30-mark computational solution. November 2026 means the 34-mark solution. Your IB coordinator can confirm." },
      { q: "How accurate is the estimated mark?", a: "It is an estimate, not a mark. A language model applies the published criteria to what you paste, and it can be wrong. Your teacher marks the work and the IB moderates that marking, so their mark is the one that counts. Use the report to find what to fix before you submit." },
      { q: "Is it free?", a: "The first preview is free and needs no account: your band range, your weakest criterion with its full feedback, and the top risks in the draft. The full report, with every criterion marked and a ranked list of fixes, is $9.99, or $24.99 for five and $44.99 for ten." },
      { q: "Is my work stored?", a: "IBLens never saves the text you paste. It passes through our relay server to Anthropic, the AI provider, to produce the report, and Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. Reports made without an account are deleted after 90 days unless you buy the full report, and reports in a signed-in account stay until you delete them." },
    ],
  },
  relatedResources: [
    { label: "What changes in 2027", href: "/resources/ib-computer-science-ia-2027" },
    { label: "Check your IA against the criteria", href: "/resources/ib-ia-feedback" },
  ],
  relatedSubjects: [
    { label: "Mathematics IA", href: "/essay/math-ia" },
    { label: "Physics IA", href: "/essay/physics-ia" },
    { label: "Biology IA", href: "/essay/biology-ia" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function ComputerScienceIA() {
  return <SubjectEssayPage config={config} />;
}
