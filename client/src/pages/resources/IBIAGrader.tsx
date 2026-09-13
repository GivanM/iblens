import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function IBIAGrader() {
  return (
    <ResourceArticle
      title="IB IA Grader: AI Feedback on Your Coursework in 14 Subjects | IBLens"
      description="An IB IA grader with a free preview: AI feedback on your Internal Assessment against the published criteria for Biology, Chemistry, Physics, Math, History, Economics, Psychology and more."
      canonical="/resources/ib-ia-grader"
      datePublished="2026-06-17"
      dateModified="2026-09-13"
    >
      <h1>IB IA Grader: AI Feedback on Your Internal Assessment</h1>

      <p>
        An IB Internal Assessment is usually worth 20% to 30% of the final subject grade, and more in some arts subjects. Many students submit without a clear idea of which criterion is costing them marks, because detailed feedback before submission is hard to get. Your teacher can comment on a draft, but not on every revision. Tutors charge by the hour. Classmates rarely know the criteria well enough to mark against them.
      </p>

      <p>
        IBLens is an AI grader that reads your Internal Assessment against the assessment criteria for your subject and gives you an estimated mark for each criterion, the marks you are losing, and what to change. It takes about a minute, and the first preview is free.
      </p>

      <p>
        <Link href="/essay?type=IA">Get a free preview of my IA →</Link>
      </p>

      <h2>Which IB Subjects Does the Grader Support?</h2>

      <p>IBLens marks coursework in 14 subjects, each against the criteria for that subject:</p>

      <ul>
        <li><strong><Link href="/essay/biology-ia">IB Biology IA</Link>:</strong> the scientific investigation, marked on Research design, Data analysis, Conclusion and Evaluation (24 marks, SL and HL)</li>
        <li><strong><Link href="/essay/chemistry-ia">IB Chemistry IA</Link>:</strong> the same four criteria as Biology (24 marks)</li>
        <li><strong><Link href="/essay/physics-ia">IB Physics IA</Link>:</strong> the same four criteria (24 marks)</li>
        <li><strong><Link href="/essay/math-ia">IB Mathematics IA (the exploration)</Link>:</strong> Presentation, Mathematical communication, Personal engagement, Reflection, Use of mathematics (20 marks)</li>
        <li><strong><Link href="/essay/economics-ia">IB Economics IA</Link>:</strong> per commentary, Diagrams, Terminology, Application and analysis, Key concept, Evaluation (14 marks each; the portfolio is marked out of 45)</li>
        <li><strong><Link href="/essay/business-management-ia">IB Business Management IA</Link>:</strong> the business research project, marked on Integration of a key concept, Supporting documents, Selection and application of tools and theories, Analysis and evaluation, Conclusions, Structure, Presentation (25 marks)</li>
        <li><strong><Link href="/essay/history-ia">IB History IA</Link>:</strong> the historical investigation, marked on Identification and evaluation of sources (6), Investigation (15) and Reflection (4), 25 marks</li>
        <li><strong><Link href="/essay/psychology-ia">IB Psychology IA</Link>:</strong> Introduction, Exploration, Analysis, Evaluation (22 marks) through November 2026; the research proposal marked out of 24 from May 2027</li>
        <li><strong><Link href="/essay/computer-science-ia">IB Computer Science IA</Link>:</strong> Planning, Solution overview, Development, Functionality and extensibility, Evaluation (34 marks) through November 2026; the new 30-mark criteria from May 2027</li>
        <li><strong>IB English A (Literature, or Language and Literature):</strong> the individual oral, marked on four criteria of 10 marks each; paste your outline or a transcript</li>
        <li><strong>IB Visual Arts, Music and Film coursework (externally assessed):</strong> each against its own criteria. Visual Arts is marked for sessions through November 2026 only, because the comparative study is replaced from May 2027, and on the SL criteria out of 30: the extra HL criterion (connections to your own art-making, 12 marks) is not marked</li>
      </ul>

      <p>
        Subjects outside this list are not offered: IBLens only marks work it has the published criteria for.
      </p>

      <h2>How the IB IA Grader Works</h2>

      <ol>
        <li><strong>Choose your essay type and subject.</strong> Select "Internal Assessment (IA) or coursework" and your IB subject from the dropdown.</li>
        <li><strong>Paste your IA text.</strong> Copy in the full text of your Internal Assessment: method, analysis, evaluation, everything.</li>
        <li><strong>Enter your research question.</strong> This helps the AI assess whether your investigation stays focused on a specific, answerable question.</li>
        <li><strong>Get your report.</strong> In about a minute you receive an estimated mark for each criterion, the marks you are losing and why, and specific steps to recover them. IBLens also counts the words against your subject's limit.</li>
      </ol>

      <h2>What You Get in the Report</h2>

      <ul>
        <li><strong>Estimated mark and band:</strong> where your IA sits overall against the criteria, with the mark range the draft currently falls in</li>
        <li><strong>Criterion breakdown:</strong> each criterion marked individually, with the reasons for that mark</li>
        <li><strong>Risk areas:</strong> the specific parts of your IA that are losing marks, and why</li>
        <li><strong>Leverage zones:</strong> criteria where a small improvement would gain the most marks</li>
        <li><strong>Next steps:</strong> concrete changes to make before submission</li>
      </ul>

      <h2>IBLens vs Other IB IA Graders</h2>

      <p>
        Several tools claim to grade IB IAs. Here is how IBLens compares:
      </p>

      <ul>
        <li><strong>vs. RevisionDojo:</strong> RevisionDojo includes AI coursework feedback in a wider revision platform sold by subscription; check its pricing page for current prices. IBLens charges per report: $9.99 for one, $24.99 for five, with no subscription. Which costs less depends on how many reports you need, so compare current prices on both sites.</li>
        <li><strong>vs. a general chatbot:</strong> a general AI model marks against whatever it remembers of the criteria, which may be an older version, such as the science criteria retired in 2025. IBLens gives the model the current criteria for your subject and session, and counts the words for you.</li>
        <li><strong>vs. a tutor:</strong> a good tutor brings subject judgement no tool has, at an hourly rate. IBLens gives you an estimate against the criteria in about a minute, for a fixed price, with two re-checks of revised versions within 14 days of the report opening.</li>
      </ul>

      <h2>Is the First IB IA Preview Really Free?</h2>

      <p>
        Yes, your first preview is free: band range, your weakest criterion with its full feedback, and the top risks. The complete report unlocks for $9.99 and includes two free re-checks of revised versions of the same work within 14 days of the report opening. In packs it works out at $5.00 per report (5 for $24.99) or $4.50 (10 for $44.99).
      </p>

      <h2>How Accurate Is the AI Grade?</h2>

      <p>
        The grader is given the criteria for your subject and session: the name of each criterion, its maximum mark and what it assesses, summarised from the subject guide. Its mark is an estimate from a language model, not a moderated mark, and no tool can predict exactly what a teacher or moderator will decide on a borderline piece of work. Where it is useful is in showing which criteria are underdeveloped, the mark range the draft sits in, and where to spend revision time. Running it before your teacher reads the draft means their comments can go on substance.
      </p>

      <p>
        <Link href="/essay?type=IA">Get a free preview of my IA →</Link>
      </p>
      <h2>Subject-specific IA guides</h2>

      <ul>
        <li><Link href="/resources/ib-biology-ia-examples">Biology IA Examples</Link></li>
        <li><Link href="/resources/ib-chemistry-ia-examples">Chemistry IA Examples</Link></li>
        <li><Link href="/resources/ib-physics-ia-examples">Physics IA Examples</Link></li>
        <li><Link href="/resources/ib-math-ia-examples">Math IA Examples</Link></li>
        <li><Link href="/resources/ib-ia-feedback">Check your IA against the criteria</Link></li>
      </ul>

    </ResourceArticle>
  );
}
