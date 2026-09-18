import SubjectEssayPage, { SubjectConfig } from "./SubjectEssayPage";

// Facts checked against the Music guide (first assessment 2022, pp. 42-47) on 18 September 2026.
const config: SubjectConfig = {
  subject: "Exploring music in context portfolio",
  slug: "music-exploring-music-in-context",
  keyword: "IB Music exploring music in context",
  metaTitle: "IB Music Exploring Music in Context Feedback: AI Marking | IBLens",
  metaDescription:
    "AI feedback on the written part of your IB Music exploring music in context portfolio: selection of evidence, musical research and implications, with the words counted against 2,400. Free preview first.",
  canonicalPath: "/essay/music-exploring-music-in-context",
  heroHeadline: "Is the written part of your Music portfolio earning its marks?",
  heroSubline:
    "Paste the written work from your exploring music in context portfolio and get feedback on criteria A, B1 and B2 in about a minute, with the words counted against the 2,400-word limit.",
  analyzerHref: "/essay?type=IA&subject=Music",
  wordLimit: "2,400-word",
  criteriaCaveat:
    "A mark for criteria A, B1 and B2, with the reason for each one. C1 and C2 judge your creating exercise and performed adaptation themselves, which a pasted text does not carry, so they are left unmarked",
  criteria: [
    { name: "Criterion A: Selection of evidence", max: 6, sampleScore: 4 },
    { name: "Criterion B1: Conducting musical research", max: 9, sampleScore: 5 },
    { name: "Criterion B2: Implications", max: 3, sampleScore: 2 },
  ],
  sampleCaption: "C1 and C2 (6 of the 24 marks) judge the exercises themselves, so the estimate is out of 18.",
  guide: {
    rubricHeading: "What the exploring music in context criteria reward (24 marks)",
    rubricIntro: [
      "Exploring music in context is externally assessed coursework, worth 30% of the final grade at SL and 20% at HL. The portfolio holds your written work, up to 2,400 words, one creating exercise (a score of up to 32 bars and/or up to a minute of audio, as suits the style) and one performed adaptation of music from a local or global context for your own instrument, up to two minutes.",
      "All the practical evidence goes into a single audio file of up to four minutes. Track lists in an appendix, citations and the bibliography are not counted in the 2,400 words.",
    ],
    rubricItems: [
      { title: "Criterion A: Selection of evidence, 6 marks", text: "The diversity, breadth and balance of the music you chose as evidence: contrasting material from personal, local and global contexts, across at least two areas of inquiry." },
      { title: "Criterion B1: Conducting musical research, 9 marks", text: "How well you extract, communicate and locate musical and extra-musical findings, and how effective those findings are, using accurate terminology." },
      { title: "Criterion B2: Implications, 3 marks", text: "How clearly you explain what your research means for creating and performing in the styles you studied." },
      { title: "Criterion C1: Understanding creating conventions, 3 marks", text: "Your understanding of creating conventions, shown in the creating exercise." },
      { title: "Criterion C2: Understanding performing practices, 3 marks", text: "Your understanding of performing practices, shown in the performed adaptation." },
    ],
    rubricNote: [
      "C1 and C2 are judged on the exercises themselves, the score and the audio, which IBLens cannot hear or see. The report marks A, B1 and B2 from your written work, leaves C1 and C2 out of its estimate, and does not count the missing exercises as a weakness.",
    ],
    mistakesHeading: "Mistakes the exploring music in context criteria penalise",
    mistakes: [
      { title: "Evidence from one corner", text: "Pieces that all come from the same context or the same area of inquiry. Criterion A rewards contrasting material from personal, local and global contexts across at least two areas of inquiry." },
      { title: "Findings with no location", text: "Saying what a piece feels like without pointing to where a feature happens. Criterion B1 rewards findings that are extracted, communicated and located, so give the bar or the timing." },
      { title: "Loose terminology", text: "Everyday words where the subject has a precise term. Criterion B1 asks for accurate terminology." },
      { title: "Research that leads nowhere", text: "Analysis that never says what it means for your own creating and performing. Criterion B2 asks you to explain those implications." },
      { title: "Words past 2,400", text: "The written work has a maximum of 2,400 words. Track lists in an appendix, citations and the bibliography are not counted." },
    ],
    faq: [
      { q: "Can IBLens hear my creating exercise or adaptation?", a: "No. It reads the text you paste. It marks A, B1 and B2 from your written work and leaves C1 and C2 unmarked, so the estimate is out of 18 rather than 24." },
      { q: "What should I paste?", a: "The written work of the portfolio. You can add the track list: the official count leaves it out, and it shows the range of your evidence for Criterion A. The word count in the report counts everything you paste, so allow for the list when you read it." },
      { q: "Does it mark the Music internal assessment?", a: "No. IBLens marks exploring music in context only, not experimenting with music or the other Music tasks." },
      { q: "How accurate is the estimated mark?", a: "It is an estimate, not a mark. A language model applies the published criteria to what you paste, and it can be wrong. Exploring music in context is marked by an IB examiner, so use the report to find what to fix before you submit." },
      { q: "Is it free?", a: "The first preview is free and needs no account: a range of totals that contains the estimate and, for most drafts, your weakest criterion with its feedback and the top risks in the draft. The full report, with every criterion it can mark scored and a ranked list of fixes, is $9.99, or $24.99 for five and $44.99 for ten." },
      { q: "Is my work stored?", a: "IBLens never saves the text you paste. Our server sends it to Anthropic, the AI provider, to produce the report, and Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. Reports made without an account are deleted after 90 days unless you buy the full report, and reports in a signed-in account stay until you delete them." },
    ],
  },
  relatedResources: [
    { label: "Using AI feedback within IB rules", href: "/resources/academic-integrity" },
  ],
  relatedSubjects: [
    { label: "Film textual analysis", href: "/essay/film-textual-analysis" },
    { label: "TOK exhibition", href: "/essay/tok-exhibition" },
    { label: "English A individual oral", href: "/essay/english-essay" },
    { label: "Extended Essay", href: "/essay/extended-essay" },
  ],
};

export default function MusicExploringMusicInContext() {
  return <SubjectEssayPage config={config} />;
}
