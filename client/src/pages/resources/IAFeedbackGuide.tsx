import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function IAFeedbackGuide() {
  return (
    <ResourceArticle
      title="IB IA Feedback — Check Your IA Against the Official Criteria | IBLens"
      description="How to check your IB Internal Assessment against the official criteria without a tutor: what each subject is marked out of, where the heaviest criteria sit, a self-check sequence that works for any subject, and where AI feedback fits."
      canonical="/resources/ib-ia-feedback"
      datePublished="2026-08-11"
      dateModified="2026-08-11"
    >
      <h1>How to Check Your IB IA Against the Official Criteria (Without a Tutor)</h1>

      <p>
        Every IB Internal Assessment is marked against published criteria with fixed mark allocations — which means you can check a draft against the same instrument your examiner will use. The catch: the criteria differ completely by subject, and the smartest check starts from where the marks actually are. This guide shows what each subject is marked out of, where the heaviest criteria sit, and a self-check sequence that works for any of them.
      </p>

      <h2>Know what your IA is marked out of</h2>

      <table>
        <thead>
          <tr><th>Subject</th><th>Marked out of</th><th>The heaviest criterion</th></tr>
        </thead>
        <tbody>
          <tr><td>Biology, Chemistry, Physics (2025 instrument)</td><td>24</td><td>Four equal criteria of 6: Research design, Data analysis, Conclusion, Evaluation</td></tr>
          <tr><td>History</td><td>25</td><td>Section B: the investigation itself — 15 of 25 marks</td></tr>
          <tr><td>Business Management</td><td>25</td><td>Integration of a key concept (5) and Analysis and evaluation (5)</td></tr>
          <tr><td>Economics (per commentary)</td><td>14</td><td>Even spread — each commentary must apply a different key concept, 800-word limit</td></tr>
          <tr><td>Mathematics (AA and AI)</td><td>20</td><td>Criterion E: Use of mathematics — 6 marks</td></tr>
          <tr><td>Psychology (through Nov 2026)</td><td>22</td><td>Introduction, Analysis and Evaluation at 6 each</td></tr>
          <tr><td>Computer Science (through Nov 2026)</td><td>34</td><td>Criterion C: Development — 12 marks</td></tr>
        </tbody>
      </table>

      <p>
        Psychology and Computer Science change format from the May 2027 session — a research proposal out of 24 and a computational solution out of 30 respectively. If you sit exams in May 2027 or later, check against the new criteria: <Link href="/resources/ib-psychology-ia-2027">Psychology 2027</Link>, <Link href="/resources/ib-computer-science-ia-2027">Computer Science 2027</Link>.
      </p>

      <h2>The self-check sequence</h2>

      <ol>
        <li>
          <strong>Start with the heaviest criterion.</strong> A History IA lives or dies on Section B; a CS IA on Development; a Math IA is capped by the mathematics you actually use. Check that criterion first — it moves the most marks.
        </li>
        <li>
          <strong>Check the caps and limits.</strong> Word limits are hard: examiners stop crediting beyond them. Check yours before polishing prose that will not be read.
        </li>
        <li>
          <strong>Read one criterion at a time, draft in the other hand.</strong> For each criterion ask: where exactly in my draft is the evidence for the top markband? If you cannot point to a paragraph, the examiner cannot either.
        </li>
        <li>
          <strong>Fix the weakest criterion before the strongest.</strong> Marks lost at the bottom are cheaper to recover than marks squeezed at the top.
        </li>
      </ol>

      <h2>Teacher feedback and where AI fits</h2>

      <p>
        Your teacher gives guidance during the IA process and feedback on a draft — use it for what only a subject expert can judge: whether your method is sound and your subject content accurate. What AI adds is unlimited, instant iterations against the criteria between teacher rounds. IBLens grades IA drafts for 17 subjects against the official criteria for your session — predicted band range and weakest criterion free, full criterion-by-criterion report $4.99, no subscription.
      </p>

      <p>
        <Link href="/resources/ib-ia-grader">See how the IA grader works →</Link> or <Link href="/essay">check your draft now →</Link>
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Which IA has the heaviest single criterion?</h3>
      <p>
        History — Section B carries 15 of 25 marks, 60% of the IA. Computer Science's Development criterion (12 of 34 through November 2026, 12 of 30 from May 2027) is the other outlier.
      </p>

      <h3>Are the science IAs really marked identically?</h3>
      <p>
        Biology, Chemistry and Physics share the 2025 assessment instrument: Research design, Data analysis, Conclusion and Evaluation, 6 marks each, 24 in total — so a self-check method that works in one science transfers to the others.
      </p>

      <h3>Can I check my IA against the criteria myself?</h3>
      <p>
        Yes — the criteria are published, and this page's sequence is designed for exactly that. The hard part is objectivity about your own writing, which is where a second reader or a rubric-calibrated AI check earns its place.
      </p>

      <h2>Related resources</h2>

      <ul>
        <li><Link href="/resources/ib-internal-assessment-guide">IB Internal Assessment Guide</Link></li>
        <li><Link href="/resources/ib-ia-grader">IB IA Grader — all subjects</Link></li>
        <li><Link href="/resources/ib-ia-score-predictor">IB IA Score Predictor</Link></li>
      </ul>
    </ResourceArticle>
  );
}
