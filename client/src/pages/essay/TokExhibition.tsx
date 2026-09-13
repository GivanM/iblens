import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

const config: SubjectConfig = {
  subject: "TOK Exhibition",
  slug: "tok-exhibition",
  keyword: "IB TOK Exhibition",
  metaTitle: "IB TOK Exhibition Grader: AI Feedback on Your Three Objects | IBLens",
  metaDescription:
    "AI feedback on your IB Theory of Knowledge exhibition: whether your three objects link convincingly to your IA prompt, read against the holistic instrument out of 10, with the words counted against 950.",
  canonicalPath: "/essay/tok-exhibition",
  heroHeadline: "Do your TOK exhibition objects actually link to the IA prompt?",
  heroSubline:
    "Paste your exhibition commentary and get it read against the holistic instrument out of 10. Free preview first, full report $9.99. See whether your justifications are strong enough for the top band.",
  analyzerHref: "/essay?type=TOK%20Exhibition",
  wordLimit: "950-word",
  criteria: [
    { name: "Holistic assessment: how well the exhibition shows TOK in the world", max: 10, sampleScore: 6 },
  ],
  guide: {
    rubricHeading: "How the TOK exhibition is marked (10 marks)",
    rubricIntro: [
      "Your TOK teacher marks the exhibition and the IB moderates the marking, against one holistic instrument out of 10 with no separate criteria. Behind every mark is one question: does the exhibition successfully show how TOK manifests in the world around us?",
      "You choose one of the 35 IA prompts and three objects, or images of objects, that link to it, with a commentary on each. The commentary is limited to 950 words in total, and marking stops at that point. With only two objects the maximum is 6 marks, and with one object it is 3.",
    ],
    rubricItems: [
      { title: "Three specific objects in real-world contexts", text: "Each object is identified along with the specific real-world context it belongs to. A generic image of a type of object, rather than a particular object, is what the lowest band describes." },
      { title: "Clear links to one prompt", text: "The link between each object and the selected IA prompt is clearly made and well explained, with points supported by evidence and explicit references to the prompt." },
      { title: "A justification for every object", text: "A strong justification of the particular contribution each object makes to the exhibition, rather than one justification repeated three times." },
    ],
    rubricNote: [
      "These are the qualities the top band, Excellent (9-10), describes. Below it come Good (7-8), Satisfactory (5-6), Basic (3-4) and Rudimentary (1-2). An exhibition that does not use one of the IA prompts scores 0.",
    ],
    mistakesHeading: "Mistakes the TOK exhibition bands penalise",
    mistakes: [
      { title: "Objects that stand for an idea", text: "A book standing for knowledge in general. The object should be a particular thing with its own real-world context." },
      { title: "Links asserted, not explained", text: "Saying an object relates to the prompt without explaining how. Links that are unconvincing or unfocused are what the Basic band describes." },
      { title: "The same point three times", text: "Three objects making one argument in three versions. Significant repetition across the justifications is named in the Basic band." },
      { title: "Losing the wording of the prompt", text: "Writing about knowledge in general instead of the prompt you chose. Explicit references to the prompt are part of the top band." },
      { title: "Commentary past 950 words", text: "Marking stops at 950 words, so the commentary on the third object is the one most at risk. Text on the objects themselves, references and the bibliography are not counted." },
    ],
    faq: [
      { q: "Should I paste all three commentaries at once?", a: "Yes. The exhibition is marked as a whole, so paste the prompt and the commentary on each object together, with each object labelled." },
      { q: "Can it see my images?", a: "No. The grader takes text, so the feedback is based on how each commentary identifies the object and its context, which the commentary has to do anyway." },
      { q: "How is this different from the TOK essay?", a: "The essay responds to a prescribed title in up to 1,600 words and is marked by IB examiners. The exhibition links three objects to one IA prompt in up to 950 words and is marked by your teacher." },
      { q: "How accurate is the predicted mark?", a: "It is an estimate, not a mark. A language model applies the published criteria to what you paste, and it can be wrong. Your teacher marks the work and the IB moderates that marking, so their mark is the one that counts. Use the report to find what to fix before you submit." },
      { q: "Is it free?", a: "The first preview is free and needs no account: the band your work falls in, the opening of the explanation for it, and the top risks in the draft. The full report, with the complete explanation and a ranked list of fixes, is $9.99, or $24.99 for a pack of five." },
      { q: "Is my work stored?", a: "IBLens never saves the text you paste. It passes through our relay server to Anthropic, the AI provider, to produce the report, and Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. Reports made without an account are deleted after 90 days unless you buy the full report, and reports in a signed-in account stay until you delete them." },
    ],
  },
  relatedResources: [
    { label: "TOK Exhibition Checklist", href: "/resources/tok-exhibition-checklist" },
    { label: "TOK Essay Guide", href: "/resources/tok-essay-guide" },
  ],
  relatedSubjects: [
    { label: "TOK Essay", href: "/essay/tok-essay" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
    { label: "History IA", href: "/essay/history-ia" },
    { label: "Psychology IA", href: "/essay/psychology-ia" },
  ],
};

export default function TokExhibition() {
  return <SubjectEssayPage config={config} />;
}
