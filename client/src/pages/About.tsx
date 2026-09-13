import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function About() {
  return (
    <ResourceArticle
      title="About IBLens: Where It Came From and How the Grader Works | IBLens"
      description="IBLens is an independent AI feedback tool for IB coursework. How the grader works, which official criteria it applies, what it will not do, and how to reach us."
      canonical="/about"
      datePublished="2026-08-11"
      dateModified="2026-09-13"
    >
      <h1>About IBLens</h1>

      <p>
        IBLens gives IB students an honest, criterion-level read on their coursework before they submit it. Paste a draft (coursework in 14 subjects, including the externally assessed Visual Arts, Music and Film coursework, an Extended Essay, a TOK essay or an exhibition commentary) and get feedback structured around the published assessment criteria it will be marked on, in about a minute. There is also a checker for the three answers of a UCAS personal statement. For the Extended Essay, ask your supervisor first: its guide allows no help with the research, writing or proofreading beyond what your supervisor permits.
      </p>

      <h2>Where IBLens came from</h2>

      <p>
        IBLens started as a tool built inside one IB family, to check a student's drafts against the actual assessment criteria instead of guessing, and grew into a public product. It is an independent project, not affiliated with, endorsed by, or connected to the International Baccalaureate Organization in any way.
      </p>

      <h2>How the grader works</h2>

      <ul>
        <li>
          <strong>The published criteria, per subject and session.</strong> The grading engine carries the assessment criteria for each supported component (the criterion names, their mark allocations and a short description of what each one assesses), including both Extended Essay rubrics (the current 34-mark criteria and the new 30-mark May 2027 criteria) and the 2027 formats for Psychology and Computer Science IAs. You pick the work type, subject and exam session; the engine applies the matching instrument.
        </li>
        <li>
          <strong>AI analysis.</strong> The essay is analysed by a large language model (Anthropic's Claude) instructed with the relevant criteria. A full report gives an estimated mark overall and for each criterion that can be judged from the text, with concrete comments and, where your task has a word limit, a word count against it.
        </li>
        <li>
          <strong>Estimates, not guarantees.</strong> Scores are AI estimates. Real marking involves examiner judgement and moderation, and no tool can promise your final mark. What IBLens is built to do well is show which criterion is costing you most while you still have time to act.
        </li>
      </ul>

      <p>
        The full pipeline is described in <Link href="/resources/how-iblens-works">How IBLens works</Link>, and you can read real example outputs in <Link href="/resources/sample-reports">Sample IBLens reports</Link>.
      </p>

      <h2>What IBLens will not do</h2>

      <ul>
        <li>It will not write, rewrite or edit your essay. Feedback identifies weaknesses; the writing stays yours. Where the academic integrity line sits is covered in <Link href="/resources/academic-integrity">AI feedback and IB academic integrity</Link>.</li>
        <li>It will not claim accuracy it cannot demonstrate. We publish no invented statistics, and scores are always presented as estimates.</li>
        <li>It will not sell your essays. How texts are processed and stored is set out in the <Link href="/privacy">Privacy Policy</Link>.</li>
      </ul>

      <h2>Pricing, briefly</h2>

      <p>
        The first preview is free, with no account needed: a range of totals and, for most drafts, feedback on your weakest criterion and the top risks (for the TOK essay and exhibition, the band, the start of the explanation and the top risks). A full report costs $9.99 and includes two free re-checks of a revised version of the same work, within 14 days of the report opening. There is no subscription, and a <Link href="/refund-policy">7-day money-back guarantee</Link> applies.
      </p>

      <h2>Contact</h2>

      <p>
        Questions, corrections or feedback: <a href="mailto:glushkovim@gmail.com">glushkovim@gmail.com</a>. If you spot a factual error anywhere on this site, such as a criterion name, a mark allocation or a syllabus date, we want to know about it and will fix it.
      </p>
    </ResourceArticle>
  );
}
