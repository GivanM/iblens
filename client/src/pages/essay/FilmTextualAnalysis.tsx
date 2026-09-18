import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

// Facts checked against the Film guide (second edition, first assessment 2023, pp. 69-73,
// the same textual analysis as the 2019 guide) on 18 September 2026.
const config: SubjectConfig = {
  subject: "Film textual analysis",
  slug: "film-textual-analysis",
  keyword: "IB Film textual analysis",
  metaTitle: "IB Film Textual Analysis Feedback: AI Marking on the Three Criteria | IBLens",
  metaDescription:
    "AI feedback on your IB Film textual analysis: cultural context, film elements and the relationships within the film text, marked out of 28, with the words counted against 1,750. Free preview first.",
  canonicalPath: "/essay/film-textual-analysis",
  heroHeadline: "Is your Film textual analysis evaluating the extract, or describing it?",
  heroSubline:
    "Paste your textual analysis and get feedback against the three Film criteria in about a minute, with the words counted against the 1,750-word limit.",
  analyzerHref: "/essay?type=IA&subject=Film",
  wordLimit: "1,750-word",
  criteria: [
    { name: "Criterion A: Cultural context", max: 8, sampleScore: 5 },
    { name: "Criterion B: Film elements", max: 12, sampleScore: 7 },
    { name: "Criterion C: Relationships within the film text", max: 8, sampleScore: 5 },
  ],
  guide: {
    rubricHeading: "What the Film textual analysis criteria reward (28 marks)",
    rubricIntro: [
      "The textual analysis is externally assessed coursework: a written analysis of up to 1,750 words of an extract from one film, with a list of all the sources you used. It is worth 30% of the final grade at SL and 20% at HL, and examiners assess only the work that falls within the word limit.",
      "The film comes from the list of 10 films the IB publishes each year. Your teacher picks three to five of them, none studied in class, and you choose one you have not studied before. The extract can be up to five minutes long and must be a single, continuous sequence.",
    ],
    rubricItems: [
      { title: "Criterion A: Cultural context, 8 marks", text: "Your understanding of the cultural context of the film, supported by research from appropriate and relevant sources." },
      { title: "Criterion B: Film elements, 12 marks", text: "How the extract uses the film elements you identify to convey meaning, with relevant film vocabulary. The bands move from listing the elements, through outlining and explaining them, to evaluating them, which is what the top band rewards." },
      { title: "Criterion C: Relationships within the film text, 8 marks", text: "How the cultural context and the film elements in the extract relate to each other and to the film as a whole, and where it fits, to other films." },
    ],
    rubricNote: [
      "You can include illustrations such as screen grabs. Their labels are left out of the word count, but they must not include commentary.",
    ],
    mistakesHeading: "Mistakes the Film textual analysis criteria penalise",
    mistakes: [
      { title: "Retelling the extract", text: "A shot-by-shot account of what happens is description. Criterion B rewards evaluating how the film elements create meaning; listing or outlining them sits in its lower bands." },
      { title: "Elements named, never judged", text: "Calling a shot a low angle or a cut a match cut without saying what it does for the meaning of the sequence, or how well it does it." },
      { title: "Context without sources", text: "Criterion A asks for an understanding of the cultural context supported by research from appropriate and relevant sources, so context written from memory holds it back." },
      { title: "Context and analysis in separate halves", text: "A block of background followed by a block of shot analysis, never connected. Criterion C rewards showing how the context and the film elements relate to each other and to the film as a whole." },
      { title: "Commentary in the labels", text: "Labels on screen grabs are not counted, so it is tempting to put analysis in them. The guide says labels must not include commentary." },
      { title: "Words past 1,750", text: "Examiners assess only the work within the 1,750-word limit. The list of sources and the labels on illustrations are not counted." },
    ],
    faq: [
      { q: "Can IBLens watch the extract?", a: "No. It reads the text you paste, and screen grabs do not come through, so the report judges your analysis as written. Refer to moments by timecode and describe what is on screen where your argument depends on it." },
      { q: "Should I paste the list of sources?", a: "Yes, after the analysis. The official count leaves it out, and it shows the report what your cultural context rests on for Criterion A. The word count in the report counts everything you paste, so allow for the list when you read it." },
      { q: "Does it mark the other Film tasks?", a: "No. IBLens marks the textual analysis only." },
      { q: "How accurate is the estimated mark?", a: "It is an estimate, not a mark. A language model applies the published criteria to what you paste, and it can be wrong. The textual analysis is marked by an IB examiner, so use the report to find what to fix before you submit." },
      { q: "Is it free?", a: "The first preview is free and needs no account: a range of totals that contains the estimate and, for most drafts, your weakest criterion with its feedback and the top risks in the draft. The full report, with every criterion marked and a ranked list of fixes, is $9.99, or $24.99 for five and $44.99 for ten." },
      { q: "Is my work stored?", a: "IBLens never saves the text you paste. Our server sends it to Anthropic, the AI provider, to produce the report, and Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. Reports made without an account are deleted after 90 days unless you buy the full report, and reports in a signed-in account stay until you delete them." },
    ],
  },
  relatedResources: [
    { label: "Using AI feedback within IB rules", href: "/resources/academic-integrity" },
  ],
  relatedSubjects: [
    { label: "Music exploring music in context", href: "/essay/music-exploring-music-in-context" },
    { label: "TOK exhibition", href: "/essay/tok-exhibition" },
    { label: "English A individual oral", href: "/essay/english-essay" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function FilmTextualAnalysis() {
  return <SubjectEssayPage config={config} />;
}
