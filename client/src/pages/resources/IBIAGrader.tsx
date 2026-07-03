import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function IBIAGrader() {
  return (
    <ResourceArticle
      title="IB IA Grader — Free AI Internal Assessment Grader for All Subjects | IBLens"
      description="Free IB IA grader powered by AI. Grade your Internal Assessment against official IB rubrics for Biology, Chemistry, Physics, Maths, History, Economics, Psychology and more."
      canonical="/resources/ib-ia-grader"
      datePublished="2026-06-17"
      dateModified="2026-06-17"
    >
      <h1>IB IA Grader — Free AI Feedback on Your Internal Assessment</h1>

      <p>
        An IB Internal Assessment is worth between 20% and 30% of your final subject grade. Most students submit without knowing whether they are on track for a 6 or a 3 — because getting meaningful feedback before submission is hard. A teacher review is one or two sessions a year. Tutors charge by the hour. Peer feedback misses the nuance of what examiners actually look for.
      </p>

      <p>
        IBLens is an AI-powered IB IA grader that reads your Internal Assessment against the official IB rubric for your subject and gives you a criterion-by-criterion score, the specific marks you are losing, and exactly what to fix. It takes 60 seconds and the first analysis is free.
      </p>

      <p>
        <Link href="/essay">Grade My IB IA Free →</Link>
      </p>

      <h2>Which IB Subjects Does the Grader Support?</h2>

      <p>IBLens grades Internal Assessments for all major IB subjects, each evaluated against the specific rubric for that subject:</p>

      <ul>
        <li><strong><Link href="/essay/biology-ia">IB Biology IA</Link></strong> — Science IA rubric: Personal Engagement, Exploration, Analysis, Evaluation, Communication (total 24 marks)</li>
        <li><strong><Link href="/essay/chemistry-ia">IB Chemistry IA</Link></strong> — Science IA rubric: same five criteria as Biology (24 marks)</li>
        <li><strong><Link href="/essay/physics-ia">IB Physics IA</Link></strong> — Science IA rubric: same five criteria (24 marks)</li>
        <li><strong><Link href="/essay/math-ia">IB Mathematics IA (Exploration)</Link></strong> — Math IA rubric: Communication, Mathematical Presentation, Personal Engagement, Reflection, Use of Mathematics (20 marks)</li>
        <li><strong><Link href="/essay/economics-ia">IB Economics IA</Link></strong> — Per-commentary rubric: Diagrams, Terminology, Application, Analysis, Evaluation (14 marks per commentary)</li>
        <li><strong>IB Business Management IA</strong> — Research Question, Methodology, Analysis, Conclusions, Evaluation, Structure (25 marks)</li>
        <li><strong><Link href="/essay/history-ia">IB History IA</Link></strong> — Historical Investigation: Identification, Investigation, Reflection, Citation, Presentation (25 marks)</li>
        <li><strong><Link href="/essay/psychology-ia">IB Psychology IA</Link></strong> — Introduction, Exploration, Analysis, Evaluation, Presentation (22 marks)</li>
        <li><strong>IB Computer Science IA</strong> — Planning, Solution Overview, Development, Functionality, Evaluation (34 marks)</li>
        <li><strong>IB English A IA (Literature / Language & Literature)</strong> — assessed against the subject-specific oral or written commentary rubric</li>
        <li><strong>IB Visual Arts IA, Music IA, Film IA</strong> — assessed against subject-specific criteria</li>
      </ul>

      <p>
        For subjects not listed (Geography, Philosophy, Environmental Systems), the grader provides general IB IA feedback — not subject-specific rubric scoring.
      </p>

      <h2>How the IB IA Grader Works</h2>

      <ol>
        <li><strong>Choose your essay type and subject.</strong> Select "Internal Assessment (IA)" and your IB subject from the dropdown.</li>
        <li><strong>Paste your IA text.</strong> Copy the full text of your Internal Assessment — methodology, analysis, evaluation, everything.</li>
        <li><strong>Enter your research question.</strong> This helps the AI assess whether your investigation stays focused on a specific, answerable question.</li>
        <li><strong>Get your grade report.</strong> Within 60 seconds you receive a criterion-by-criterion score, a predicted grade, the marks you are losing and why, and specific steps to recover them.</li>
      </ol>

      <h2>What You Get in the Grade Report</h2>

      <ul>
        <li><strong>Predicted score and IB band</strong> — how your IA scores overall against the rubric, with the corresponding IB grade (1–7)</li>
        <li><strong>Criterion breakdown</strong> — each criterion scored individually with an explanation of why you received that score</li>
        <li><strong>Risk areas</strong> — the specific parts of your IA that are losing marks and why</li>
        <li><strong>Leverage zones</strong> — criteria where a small improvement would gain the most marks</li>
        <li><strong>Actionable next steps</strong> — concrete changes to make before submission</li>
      </ul>

      <h2>IBLens vs Other IB IA Graders</h2>

      <p>
        Several tools claim to grade IB IAs. Here is how IBLens compares:
      </p>

      <ul>
        <li><strong>vs. RevisionDojo:</strong> RevisionDojo bundles IA grading inside a $19/month subscription that also includes videos and practice papers. IBLens is pay-per-analysis — $4.99 for a single analysis, $19.99 for 5. No subscription required. If you just need feedback on one or two IAs, IBLens is significantly cheaper.</li>
        <li><strong>vs. ChatGPT / Claude directly:</strong> Generic AI models don't know the specific IB rubric for your subject. IBLens is built on the official IBO marking criteria and formats the feedback to match how real IB examiners score work.</li>
        <li><strong>vs. a tutor:</strong> A tutor charges $50–120 per hour and may give you subjective feedback. IBLens applies the rubric mechanically — the same way an examiner does — and identifies specific mark losses by criterion.</li>
      </ul>

      <h2>Is the First IB IA Analysis Really Free?</h2>

      <p>
        Yes. Every new user gets one complete analysis free — no credit card, no account required. You see the full grade report: predicted score, criterion breakdown, risk areas, and next steps. After that, individual analyses are $4.99 or $3.50–$3.99 per analysis in packs.
      </p>

      <h2>How Accurate Is the AI Grade?</h2>

      <p>
        The grader applies the official IB rubric criteria as written in IBO subject guides. It cannot perfectly predict what a human moderator will decide on boundary cases — no tool can. But it is reliable for identifying which criteria are underdeveloped, what the mark range is, and where to focus revision effort. Students consistently report that the AI flags the same issues their teachers later point out.
      </p>

      <p>
        <Link href="/essay">Grade My IB IA Free →</Link>
      </p>
    </ResourceArticle>
  );
}
