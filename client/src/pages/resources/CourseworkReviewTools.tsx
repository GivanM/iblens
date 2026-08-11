import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function CourseworkReviewTools() {
  return (
    <ResourceArticle
      title="AI Tools IB Students Use to Review Coursework — 2026 Comparison | IBLens"
      description="An honest comparison of the AI tools IB students use to review IAs, Extended Essays and TOK work before submission: IBLens, RevisionDojo, MyRevisionAgent, Clastify and generic chatbots — what each grades, pricing models, free tiers, and who supports the new May 2027 EE criteria."
      canonical="/resources/ib-coursework-review-tools"
      datePublished="2026-08-11"
      dateModified="2026-08-11"
    >
      <h1>AI Tools IB Students Use to Review Coursework Before Submission (2026)</h1>

      <p>
        Before the coursework deadline, most IB students want the same thing: an honest read on where a draft stands against the actual assessment criteria, without burning their one supervisor draft to get it. A handful of tools now do this with AI. Here is how they compare — including where we fit, stated as plainly as we describe everyone else. Details below were checked in August 2026; features and prices change, so verify on each site.
      </p>

      <h2>The comparison</h2>

      <table>
        <thead>
          <tr><th>Tool</th><th>What it reviews</th><th>Pricing model</th><th>New May 2027 EE rubric</th></tr>
        </thead>
        <tbody>
          <tr><td>IBLens</td><td>IA across 17 subjects, EE, TOK essay, TOK exhibition</td><td>Free preview on every essay; full report $4.99, no subscription</td><td>Yes — grades against both the 34-mark and the new 30-mark criteria</td></tr>
          <tr><td>RevisionDojo</td><td>Coursework grader for EE, IA and TOK alongside a large IB resource library</td><td>See site</td><td>Not stated on the grader as of August 2026</td></tr>
          <tr><td>MyRevisionAgent</td><td>TOK essay (/10), EE, IA across 27 subject-levels</td><td>2 free grading tokens on signup; token packs from £4.99</td><td>No — EE graded /34 on the current criteria as of August 2026</td></tr>
          <tr><td>Clastify</td><td>AI grader plus paid human review by IB examiners; large library of examiner-verified exemplars</td><td>See site</td><td>Not stated on the grader as of August 2026</td></tr>
          <tr><td>Generic chatbots (ChatGPT and others)</td><td>Anything you paste</td><td>Free tiers and subscriptions</td><td>Only if you paste the criteria in yourself</td></tr>
        </tbody>
      </table>

      <h2>What actually matters when you pick one</h2>

      <ul>
        <li>
          <strong>Does it apply the real criteria for your subject and session?</strong> An EE drafted for May 2027 is marked out of 30 against new criteria — a tool grading it /34 is checking your work against a rubric you will never be marked with. The same applies to Psychology and Computer Science IAs, which change format in 2027.
        </li>
        <li>
          <strong>Criterion-level output, not a general impression.</strong> "This is a solid essay" does not tell you what to fix first. Look for a per-criterion breakdown and an identified weakest criterion.
        </li>
        <li>
          <strong>A free look before you pay.</strong> Every serious tool in the table offers some free entry point — a preview, free tokens, or sample feedback. Use it to judge quality on your own draft before paying anything.
        </li>
        <li>
          <strong>Feedback, not editing.</strong> Whatever tool you use, IB academic integrity rules draw the line at work that is no longer yours. Tools that identify weaknesses are on the right side of it; anything that rewrites your draft is not. Our <Link href="/resources/academic-integrity">academic integrity guide</Link> covers where that line sits.
        </li>
      </ul>

      <h2>Where generic chatbots fall short</h2>

      <p>
        ChatGPT and its peers write fluently about IB work, but they do not apply the official assessment instrument unless you supply it — and even then the grading language drifts. Rubric-specific tools exist precisely because the IB marks against published criteria with fixed mark allocations: a review that does not name your weakest criterion against those allocations is a writing critique, not a mark estimate.
      </p>

      <h2>How IBLens works</h2>

      <p>
        Paste your draft, pick the work type, subject and exam session, and IBLens grades it against the official criteria for that combination — including both Extended Essay rubrics and the 2027 formats for Psychology and Computer Science. The preview (predicted band range and weakest criterion) is free with no account; the full criterion-by-criterion report is $4.99 per essay, with no subscription to cancel.
      </p>

      <p>
        <Link href="/essay">Try it on your draft →</Link>
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Are these tools allowed under IB rules?</h3>
      <p>
        Using AI to get feedback on work you wrote is a different activity from having AI produce the work. Feedback tools sit in the same category as a peer pointing out weaknesses; submitting AI-written text as your own is academic misconduct. Keep drafts, use feedback to revise your own writing, and you are on the right side of the line.
      </p>

      <h3>Which tool supports the new May 2027 Extended Essay criteria?</h3>
      <p>
        As of August 2026, IBLens grades against the new 30-mark criteria (with a session switch for the current 34-mark rubric). MyRevisionAgent's EE grader used the 34-mark rubric, and RevisionDojo and Clastify did not state 2027 support on their grader pages when we checked.
      </p>

      <h3>Can an AI tool predict my exact mark?</h3>
      <p>
        No tool can promise your exact final mark — moderation and examiner judgement are real. What a rubric-calibrated tool can do is place a draft in a band range and show which criterion is costing you most, early enough to act on it.
      </p>

      <h2>Related resources</h2>

      <ul>
        <li><Link href="/resources/ib-extended-essay-feedback">How to Get EE Feedback Before You Submit</Link></li>
        <li><Link href="/resources/ib-extended-essay-new-criteria-2027">EE New Criteria 2027</Link></li>
        <li><Link href="/resources/how-iblens-works">How IBLens Works</Link></li>
      </ul>
    </ResourceArticle>
  );
}
