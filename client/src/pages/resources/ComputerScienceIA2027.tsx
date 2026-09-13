import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function ComputerScienceIA2027() {
  return (
    <ResourceArticle
      title="IB Computer Science IA Changes 2027: Marked Out of 30 | IBLens"
      description="From the May 2027 session the IB Computer Science IA is a computational solution marked out of 30: Problem specification, Planning, System overview, Development (12 marks) and Evaluation. What changed from the 34-mark solution."
      canonical="/resources/ib-computer-science-ia-2027"
      datePublished="2026-08-11"
      dateModified="2026-09-13"
    >
      <h1>IB Computer Science IA Changes 2027: What Changed and How to Check Your Project</h1>

      <p>
        From the May 2027 session, the IB Computer Science Internal Assessment is assessed as a <strong>computational solution marked out of 30</strong>, down from 34, with a new criterion structure and no client requirement. If you sit your exams in May 2027 or later, your IA is marked with the criteria below, not the ones in most older guides.
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
          <tr><td>A: Problem specification</td><td>4</td><td>The problem scenario in terms of measurable requirements, appropriate success criteria, and why the computational context fits.</td></tr>
          <tr><td>B: Planning</td><td>4</td><td>A reasonable decomposition of the problem and a plan that addresses the success criteria.</td></tr>
          <tr><td>C: System overview</td><td>6</td><td>A complete system model, algorithms for its components, and a testing strategy aligned with the success criteria.</td></tr>
          <tr><td>D: Development</td><td>12</td><td>A fully functional product built with appropriate techniques, the implementation choices evaluated, and the testing strategy justified.</td></tr>
          <tr><td>E: Evaluation</td><td>4</td><td>How far the success criteria were met, evaluated, with justified improvements.</td></tr>
        </tbody>
      </table>

      <p>
        Documentation is capped at 2,000 words (excluding code excerpts, comments and diagrams), accompanied by a video of up to 5 minutes. There is no client requirement: you no longer need to recruit a client and evidence your consultation with them.
      </p>

      <h2>What changed from the 34-mark rubric</h2>

      <ul>
        <li><strong>Total marks: 34 → 30.</strong></li>
        <li><strong>Development is still the largest criterion:</strong> 12 marks, now 40% of the total (up from 35%). A fully functional product built with appropriate techniques, with the implementation choices evaluated and the testing strategy justified, decides more of the mark than before.</li>
        <li><strong>A new first criterion, Problem specification (4),</strong> makes the problem statement and success criteria a marked component in their own right.</li>
        <li><strong>Functionality and extensibility of product (4)</strong> no longer exists as a separate criterion.</li>
        <li><strong>Planning drops from 6 to 4 marks, Evaluation from 6 to 4.</strong> Evaluation still measures the product against the success criteria you set in Criterion A, and improvements now have to be justified.</li>
        <li><strong>The client requirement is removed.</strong> The documentation stays capped at 2,000 words, and the video can be up to 5 minutes.</li>
      </ul>

      <h2>How to check your project documentation</h2>

      <ul>
        <li><strong>Problem specification:</strong> are your success criteria specific and measurable? Criterion E evaluates against exactly these, so vague criteria here cost marks twice.</li>
        <li><strong>Planning:</strong> Does the plan show real decisions (data structures, architecture, milestones), not a generic timeline?</li>
        <li><strong>System overview:</strong> Could a competent programmer understand your design from the overview alone?</li>
        <li><strong>Development:</strong> Does the product work fully, are the techniques appropriate to the algorithms, and do you evaluate your implementation choices and justify your testing strategy? Borrowed code still has to be acknowledged under academic integrity rules.</li>
        <li><strong>Evaluation:</strong> Do you test against each success criterion from Criterion A and state honestly which are met?</li>
      </ul>

      <h2>Check your draft with IBLens</h2>

      <p>
        IBLens supports both Computer Science rubrics: choose <em>Internal Assessment (IA) or coursework</em> and then <em>Computer Science</em> in the analyser, and keep "Exam session" on <em>Exams in May 2027 or later</em>, the default, for the 30-mark criteria above, or switch it to <em>Exams in May or November 2026</em> for the 34-mark rubric. Free preview on your first submission from a device; a full report is $9.99 with no subscription and includes two free re-checks of the same draft within 14 days, so you can revise and check whether the fix landed.
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
        Not under the May 2027 syllabus: the guide has no client requirement. Sessions through November 2026 still follow the current guide.
      </p>

      <h3>Which criterion is worth the most?</h3>
      <p>
        Development: 12 of 30 marks, or 40% of the total. It rewards a fully functional product built with appropriate techniques, an evaluation of your implementation choices, and a justified testing strategy.
      </p>

      <h2>Related resources</h2>

      <ul>
        <li><Link href="/resources/ib-extended-essay-new-criteria-2027">IB Extended Essay New Criteria 2027</Link></li>
        <li><Link href="/resources/ib-psychology-ia-2027">IB Psychology IA Changes 2027</Link></li>
        <li><Link href="/resources/ib-internal-assessment-guide">IB Internal Assessment Guide</Link></li>
      </ul>
      <h2>Other 2027 syllabus changes</h2>

      <ul>
        <li><Link href="/resources/ib-extended-essay-new-criteria-2027">EE New Criteria 2027 (marked /30)</Link></li>
        <li><Link href="/resources/ib-psychology-ia-2027">Psychology IA 2027: research proposal</Link></li>
        <li><Link href="/resources/ib-rpf-extended-essay-2027">The EE RPF: 500-word reflective statement</Link></li>
      </ul>

    </ResourceArticle>
  );
}
