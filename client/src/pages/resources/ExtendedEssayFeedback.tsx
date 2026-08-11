import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function ExtendedEssayFeedback() {
  return (
    <ResourceArticle
      title="IB Extended Essay Feedback — How to Get It Before You Submit | IBLens"
      description="Every legitimate way to get feedback on your IB Extended Essay before submission: what your supervisor can and cannot comment on, how to self-check against the assessment criteria, where peers help, and what AI feedback adds — with an honest look at the limits of each."
      canonical="/resources/ib-extended-essay-feedback"
      datePublished="2026-08-11"
      dateModified="2026-08-11"
    >
      <h1>How to Get Feedback on Your IB Extended Essay Before You Submit</h1>

      <p>
        The Extended Essay is the one piece of IB work where feedback is both most valuable and most rationed. Your supervisor's written comments are limited to one complete draft, teachers cannot edit your work, and by the time the deadline is close, most students have exactly one question: <em>is this good enough, and what do I fix first?</em> This guide covers every legitimate feedback channel — what each one can tell you, what it cannot, and when in the process to use it.
      </p>

      <h2>The feedback channels, honestly compared</h2>

      <table>
        <thead>
          <tr><th>Channel</th><th>What it gives you</th><th>The limits</th></tr>
        </thead>
        <tbody>
          <tr><td>Supervisor</td><td>Expert, subject-aware comments; the only person who formally guides the EE</td><td>Written comments on one complete draft; cannot edit or proof-read; sessions are short</td></tr>
          <tr><td>Reflection sessions</td><td>Three formal check-ins to test your direction, including the interim reflection</td><td>Guidance on process and thinking, not line-by-line feedback</td></tr>
          <tr><td>Peers and family</td><td>A fresh reader: do the argument and structure make sense to a non-expert?</td><td>They do not know the criteria; encouragement is not assessment</td></tr>
          <tr><td>Self-check against criteria</td><td>Free, unlimited, and exactly what examiners use</td><td>Hard to be objective about your own writing</td></tr>
          <tr><td>AI rubric check</td><td>Instant criterion-by-criterion read on a draft, any time, before your one supervisor draft</td><td>An estimate, not an official mark; quality depends on the tool applying the real criteria</td></tr>
        </tbody>
      </table>

      <h2>Use your one supervisor draft well</h2>

      <p>
        Because your supervisor may give written feedback on only one complete draft, the worst way to spend that draft is on problems you could have caught yourself — missing signposting, sections that drift from the research question, an evaluation-free conclusion. Run a self-check first, fix the obvious, and let the supervisor round go to the things only an expert can see: subject accuracy, the strength of your sources, whether the argument would convince an examiner.
      </p>

      <h2>Self-checking against the actual criteria</h2>

      <p>
        The EE is marked against five criteria — and which set applies depends on your session. Through November 2026 the essay is marked out of 34 (Focus and method, Knowledge and understanding, Critical thinking, Presentation, Engagement). From May 2027 it is marked out of 30 under the new criteria: Framework for the essay (6), Knowledge and understanding (6), Analysis and line of argument (6), Discussion and evaluation (8) and Reflection (4). If you are drafting now for May 2027, check against the new set — <Link href="/resources/ib-extended-essay-new-criteria-2027">here is the full breakdown of what changed</Link>.
      </p>

      <p>
        The highest-leverage self-check questions, whichever rubric applies:
      </p>

      <ul>
        <li>Can a reader state your research question and your answer to it after the introduction and conclusion alone?</li>
        <li>Does every section analyse and argue, or do some merely report sources?</li>
        <li>Is evidence evaluated — strengths, limitations, competing interpretations — or just cited?</li>
        <li>Does the conclusion follow from the weighing of evidence, rather than restating the introduction?</li>
      </ul>

      <h2>Where AI feedback fits</h2>

      <p>
        An AI check is not a replacement for your supervisor — it is what you run <em>before</em> spending that one draft. IBLens grades your EE against the official criteria for your session (both the 34-mark and the new 30-mark May 2027 rubrics), criterion by criterion: predicted band range and your weakest criterion free, the full report $4.99 with no subscription. Using AI for feedback on your own work is a different thing from having AI write it — see our guide to <Link href="/resources/academic-integrity">AI feedback and IB academic integrity</Link> for where the line sits.
      </p>

      <p>
        <Link href="/essay/extended-essay">Get instant feedback on your EE draft →</Link>
      </p>

      <h2>Frequently asked questions</h2>

      <h3>How many drafts can my supervisor read?</h3>
      <p>
        Your supervisor may provide written comments on one complete draft of the essay. They can discuss your work in reflection sessions beyond that, but the full-draft feedback happens once — which is why it pays to self-check before you hand it in.
      </p>

      <h3>Can I pay someone to edit or improve my EE?</h3>
      <p>
        No. Feedback that identifies weaknesses is legitimate; editing, rewriting or improving the essay for you is not your own work and puts the essay at risk under IB academic integrity rules. That applies to tutors, services and AI alike.
      </p>

      <h3>When should I get feedback?</h3>
      <p>
        Early on the research question (a supervisor conversation), mid-way on structure and argument (self-check and an AI read), and near the end your one full supervisor draft — leaving yourself time to act on it.
      </p>

      <h2>Related resources</h2>

      <ul>
        <li><Link href="/resources/ib-extended-essay-guide">IB Extended Essay Guide</Link></li>
        <li><Link href="/resources/ib-extended-essay-new-criteria-2027">EE New Criteria 2027 (Marked /30)</Link></li>
        <li><Link href="/resources/ib-ee-examples-by-subject">EE Examples by Subject</Link></li>
      </ul>
    </ResourceArticle>
  );
}
