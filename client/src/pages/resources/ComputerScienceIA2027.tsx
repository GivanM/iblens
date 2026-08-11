import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function ComputerScienceIA2027() {
  return (
    <ResourceArticle
      title="IB Computer Science IA Changes 2027 — Marked Out of 30 | IBLens"
      description="From the May 2027 session the IB Computer Science IA is a computational solution marked out of 30: Problem specification, Planning, System overview, Development (12 marks), Evaluation. What changed from the 34-mark solution and how to check your documentation."
      canonical="/resources/ib-computer-science-ia-2027"
      datePublished="2026-08-11"
      dateModified="2026-08-11"
    >
      <h1>IB Computer Science IA Changes 2027 — What Changed and How to Check Your Project</h1>

      <p>
        From the May 2027 session, the IB Computer Science Internal Assessment is assessed as a <strong>computational solution marked out of 30</strong> — down from 34 — with a new criterion structure and lighter documentation requirements. If you started the Diploma Programme in 2025, your IA is marked with the criteria below, not the ones in most older guides.
      </p>

      <h2>Who is affected</h2>

      <ul>
        <li><strong>Exams in May 2027 or later:</strong> the new 30-mark criteria apply.</li>
        <li><strong>Sessions through November 2026:</strong> the current 34-mark criteria remain (Planning 6, Solution overview 6, Development 12, Functionality and extensibility of product 4, Evaluation 6).</li>
      </ul>

      <h2>The new criteria (marked out of 30)</h2>

      <table>
        <thead>
          <tr><th>Criterion</th><th>Marks</th><th>What it assesses</th></tr>
        </thead>
        <tbody>
          <tr><td>A: Problem specification</td><td>4</td><td>Specification of the problem and success criteria.</td></tr>
          <tr><td>B: Planning</td><td>4</td><td>Planning of the computational solution.</td></tr>
          <tr><td>C: System overview</td><td>6</td><td>Overview of the system design.</td></tr>
          <tr><td>D: Development</td><td>12</td><td>Development of the solution demonstrating appropriate techniques, with sources acknowledged.</td></tr>
          <tr><td>E: Evaluation</td><td>4</td><td>Evaluation of the solution against the success criteria.</td></tr>
        </tbody>
      </table>

      <p>
        Documentation is capped at 2,000 words (excluding code and diagrams), accompanied by a 3-minute video. The former client requirement is removed — you no longer need to recruit a client and evidence consultation with them.
      </p>

      <h2>What changed from the 34-mark rubric</h2>

      <ul>
        <li><strong>Total marks: 34 → 30.</strong></li>
        <li><strong>Development stays the giant:</strong> 12 marks — now 40% of the total (up from 35%). Demonstrating appropriate techniques, and acknowledging sources, decides more of your grade than ever.</li>
        <li><strong>A new first criterion, Problem specification (4),</strong> makes the problem statement and success criteria a marked component in their own right.</li>
        <li><strong>Functionality and extensibility of product (4)</strong> no longer exists as a separate criterion.</li>
        <li><strong>Planning drops from 6 to 4 marks, Evaluation from 6 to 4</strong> — and Evaluation is now explicitly against the success criteria you set in Criterion A.</li>
        <li><strong>The client requirement is removed</strong>, and documentation is capped at 2,000 words plus a 3-minute video.</li>
      </ul>

      <h2>How to check your project documentation</h2>

      <ul>
        <li><strong>Problem specification:</strong> Are your success criteria specific and measurable? Criterion E will evaluate against exactly these — vague criteria here cost marks twice.</li>
        <li><strong>Planning:</strong> Does the plan show real decisions (data structures, architecture, milestones), not a generic timeline?</li>
        <li><strong>System overview:</strong> Could a competent programmer understand your design from the overview alone?</li>
        <li><strong>Development:</strong> Are the techniques you used demonstrated and explained — and is every borrowed idea or snippet acknowledged?</li>
        <li><strong>Evaluation:</strong> Do you test against each success criterion from Criterion A and state honestly which are met?</li>
      </ul>

      <h2>Check your draft with IBLens</h2>

      <p>
        IBLens supports both Computer Science rubrics: choose <em>Internal Assessment → Computer Science</em> in the analyzer and set "Exam session" to <em>May 2027 — new syllabus</em> for the 30-mark criteria above, or leave it on May/Nov 2026 for the current 34-mark rubric. Free preview on every submission; a full report costs $4.99 with no subscription.
      </p>

      <p>
        <Link href="/essay/computer-science-ia">Check your CS IA against the 2027 criteria →</Link>
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Is the Computer Science IA still marked out of 34?</h3>
      <p>
        Only through the November 2026 session. From May 2027 the IA is marked out of 30 with a new criterion structure: Problem specification 4, Planning 4, System overview 6, Development 12, Evaluation 4.
      </p>

      <h3>Do I still need a client for my CS IA?</h3>
      <p>
        Not under the May 2027 syllabus — the client requirement is removed. Sessions through November 2026 still follow the current guide.
      </p>

      <h3>Which criterion is worth the most?</h3>
      <p>
        Development, at 12 of 30 marks — 40% of the total. It rewards demonstrating appropriate techniques in your solution, with sources acknowledged.
      </p>

      <h2>Related resources</h2>

      <ul>
        <li><Link href="/resources/ib-extended-essay-new-criteria-2027">IB Extended Essay New Criteria 2027</Link></li>
        <li><Link href="/resources/ib-psychology-ia-2027">IB Psychology IA Changes 2027</Link></li>
        <li><Link href="/resources/ib-internal-assessment-guide">IB Internal Assessment Guide</Link></li>
      </ul>
    </ResourceArticle>
  );
}
