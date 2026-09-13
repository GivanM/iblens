import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function ExtendedEssayFeedback() {
  return (
    <ResourceArticle
      title="IB Extended Essay Feedback: How to Get It Before You Submit | IBLens"
      description="The feedback the IB allows on your Extended Essay: what your supervisor may and may not do, how to check your own draft against the criteria, and why any other help, AI feedback included, needs your supervisor's agreement first."
      canonical="/resources/ib-extended-essay-feedback"
      datePublished="2026-08-11"
      dateModified="2026-09-13"
    >
      <h1>How to get feedback on your IB Extended Essay before you submit</h1>

      <p>
        The Extended Essay is the one piece of IB work where feedback is both most valuable and most rationed. Your supervisor's written comments are limited to one complete draft, supervisors cannot edit your work, and by the time the deadline is close, most students have exactly one question: <em>is this good enough, and what do I fix first?</em> This guide covers every legitimate feedback channel, what each one can tell you, what it cannot, and when in the process to use it.
      </p>

      <h2>The feedback channels, honestly compared</h2>

      <table>
        <thead>
          <tr><th>Channel</th><th>What it gives you</th><th>The limits</th></tr>
        </thead>
        <tbody>
          <tr><td>Supervisor</td><td>Guidance from your supervisor, the member of staff responsible for your EE: questioning, prompting, suggesting and recommending (the school librarian can also help with research skills, and in some cases the school can agree to an external mentor)</td><td>Written comments on one complete draft; cannot edit or proof-read; sessions are short</td></tr>
          <tr><td>Reflection sessions</td><td>Three mandatory reflection sessions with your supervisor (first, interim and the viva voce), separate from informal check-ins</td><td>Guidance on process and thinking, not line-by-line feedback</td></tr>
          <tr><td>Peers and family</td><td>Talking through your topic</td><td>The EE guide says students must not receive assistance with any aspect of the research, writing or proofreading beyond that which is permitted through their supervisor, so do not ask them to read, correct or proofread the essay</td></tr>
          <tr><td>Self-check against criteria</td><td>Free, unlimited, and exactly what examiners use</td><td>Hard to be objective about your own writing</td></tr>
          <tr><td>AI rubric check</td><td>A criterion-by-criterion estimate of a draft</td><td>Outside help: use it only if your supervisor agrees and your school's AI policy allows it; an estimate, not an official mark</td></tr>
        </tbody>
      </table>

      <h2>Use your one supervisor draft well</h2>

      <p>
        Because your supervisor may give written feedback on only one complete draft, the worst way to spend that draft is on problems you could have caught yourself: missing signposting, sections that drift from the research question, a conclusion with no evaluation in it. Run a self-check first, fix the obvious, and let your supervisor's written comments go to what you cannot judge yourself: whether your question, method and sources can carry the argument.
      </p>

      <h2>Self-checking against the actual criteria</h2>

      <p>
        The EE is marked against five criteria, and which set applies depends on your session. Through November 2026 the essay is marked out of 34 (Focus and method, Knowledge and understanding, Critical thinking, Presentation, Engagement). From May 2027 it is marked out of 30 under the new criteria: Framework for the essay (6), Knowledge and understanding (6), Analysis and line of argument (6), Discussion and evaluation (8) and Reflection (4). If you are drafting now for May 2027, check against the new set: <Link href="/resources/ib-extended-essay-new-criteria-2027">here is the full breakdown of what changed</Link>.
      </p>

      <p>
        The highest-leverage self-check questions, whichever rubric applies:
      </p>

      <ul>
        <li>Can a reader state your research question and your answer to it after the introduction and conclusion alone?</li>
        <li>Does every section analyse and argue, or do some merely report sources?</li>
        <li>Is evidence evaluated (strengths, limitations, competing interpretations) or just cited?</li>
        <li>Does the conclusion follow from the weighing of evidence, rather than restating the introduction?</li>
      </ul>

      <h2>Where AI feedback fits</h2>

      <p>
        An AI check is outside help. The EE guide says students must not receive assistance with any aspect of the research, writing or proofreading beyond that which is permitted through their supervisor, so ask your supervisor before you use IBLens or any other tool on your EE, and tell them if you do. If they agree, IBLens marks your EE against the criteria for your session (the 34-mark set or the new 30-mark May 2027 set), criterion by criterion. A range of totals and, for most drafts, your weakest criterion and the top risks are free, and the full report is $9.99 with no subscription. Using AI for feedback on your own work is a different thing from having AI write it: see our guide to <Link href="/resources/academic-integrity">AI feedback and IB academic integrity</Link> for where the line sits.
      </p>

      <p>
        <Link href="/essay/extended-essay">Get feedback on your EE draft in about a minute →</Link>
      </p>

      <h2>Frequently asked questions</h2>

      <h3>How many drafts can my supervisor read?</h3>
      <p>
        Your supervisor may provide written comments on one complete draft of the essay. They can discuss your work in reflection sessions beyond that, but the full-draft feedback happens once, which is why it pays to self-check before you hand it in.
      </p>

      <h3>Can I pay someone to edit or improve my EE?</h3>
      <p>
        No. The Extended Essay guide says students must not receive assistance with any aspect of the research, writing or proofreading of the essay beyond that which is permitted through their supervisor, so paying a tutor or a service to read, edit or improve your EE is not allowed. A supervisor who suspects the essay could not have been completed without such help must report it, and it may be investigated as academic misconduct. Any other feedback, AI included, needs your supervisor's agreement first.
      </p>

      <h3>When should I get feedback?</h3>
      <p>
        Early on the research question (a supervisor conversation), mid-way on structure and argument (your own check against the criteria, and an AI read only if your supervisor agrees), and near the end your one full supervisor draft, leaving yourself time to act on it.
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
