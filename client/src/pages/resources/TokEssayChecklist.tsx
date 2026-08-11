import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function TokEssayChecklist() {
  return (
    <ResourceArticle
      title="TOK Essay Checklist — Check Your Essay Against the IB Criteria | IBLens"
      description="A practical TOK essay checklist built on the official holistic assessment instrument: the five bands out of 10, the exact question examiners ask, and the concrete checks to run on your draft before submission — no tutor needed."
      canonical="/resources/tok-essay-checklist"
      datePublished="2026-08-11"
      dateModified="2026-08-11"
    >
      <h1>TOK Essay Checklist — How to Check Your Essay Against the IB Criteria (Without a Tutor)</h1>

      <p>
        The TOK essay is marked with a single holistic instrument out of 10 — there are no separate criteria with individual marks. Examiners ask one global question: <em>does the essay provide a clear, coherent and critical exploration of the essay title?</em> That makes self-checking possible: you do not need to juggle five rubric strands, you need to test your draft against one question, rigorously. This checklist turns that question into concrete checks you can run on your own.
      </p>

      <h2>How the TOK essay is actually marked</h2>

      <p>
        Your essay is placed into one of five bands based on its overall quality — not scored criterion by criterion:
      </p>

      <table>
        <thead>
          <tr><th>Band</th><th>Marks</th><th>What it looks like</th></tr>
        </thead>
        <tbody>
          <tr><td>Excellent</td><td>9–10</td><td>Clear, coherent and critical throughout; arguments effectively supported by specific examples; implications considered.</td></tr>
          <tr><td>Good</td><td>7–8</td><td>Focused on the title with real analysis; examples support the points; some evaluation of perspectives.</td></tr>
          <tr><td>Satisfactory</td><td>5–6</td><td>Relevant and competent but more descriptive than critical; examples present but doing little argumentative work.</td></tr>
          <tr><td>Basic</td><td>3–4</td><td>Loses the title for stretches; assertions instead of arguments; examples vague or missing.</td></tr>
          <tr><td>Rudimentary</td><td>1–2</td><td>Little connection to the title; no meaningful exploration of knowledge questions.</td></tr>
        </tbody>
      </table>

      <p>
        The limit is 1,600 words, and the essay is written on one of the prescribed titles for your session — as worded, with no changes. Together with the Extended Essay, TOK contributes up to 3 bonus points to your Diploma total.
      </p>

      <h2>The checklist</h2>

      <h3>Title focus</h3>
      <ul>
        <li>Every paragraph connects back to the prescribed title <em>as written</em> — not to a more comfortable paraphrase you drifted into.</li>
        <li>Somewhere in the essay you explicitly answer the question the title asks — a reader could quote your answer.</li>
        <li>Key ambiguous terms in the title are unpacked early, and your working definitions hold for the whole essay.</li>
      </ul>

      <h3>Knowledge questions and Areas of Knowledge</h3>
      <ul>
        <li>The essay explores <em>knowledge questions</em> — claims about how knowledge is produced, tested and trusted — not just facts about a topic.</li>
        <li>Two Areas of Knowledge are developed in genuine depth (unless the title directs otherwise), and the pairing creates a real contrast rather than two parallel summaries.</li>
      </ul>

      <h3>Examples</h3>
      <ul>
        <li>Each main claim is supported by a specific, named real-world example — a particular discovery, event, artwork or case, described precisely enough to do argumentative work.</li>
        <li>Examples are analysed, not decorated: you show <em>what the example demonstrates</em> about the knowledge question, not just that it exists.</li>
      </ul>

      <h3>Counter-arguments and perspectives</h3>
      <ul>
        <li>Every major claim meets a genuine counter-claim or alternative perspective — and you respond to it rather than leaving it hanging.</li>
        <li>Different perspectives are evaluated, not merely listed for balance.</li>
      </ul>

      <h3>Coherence</h3>
      <ul>
        <li>A reader can state your overall thesis after a single read.</li>
        <li>The conclusion is the <em>outcome</em> of your analysis — it goes beyond anything you could have written before doing the exploration.</li>
      </ul>

      <h2>Common reasons essays stay in the 5–6 band</h2>

      <ul>
        <li><strong>Description instead of criticism:</strong> the essay explains what happens in each AOK but never weighs, challenges or evaluates. This is the single most common ceiling.</li>
        <li><strong>Examples as decoration:</strong> generic examples ("science uses experiments") that could support any essay on any title.</li>
        <li><strong>Perspective counting:</strong> "some people think X, others think Y" without evaluating either.</li>
        <li><strong>Title drift:</strong> the introduction addresses the title, the body addresses the topic. Bands are set by exploration <em>of the title</em>.</li>
      </ul>

      <h2>Self-check, teacher feedback, or AI</h2>

      <p>
        Your TOK teacher's comments are the gold standard, but feedback rounds are limited — most drafts get one meaningful pass. Running this checklist first means the teacher round is spent on substance rather than on problems you could have caught yourself. For an instant second opinion, IBLens applies the holistic instrument to your draft: you get the band range it currently sits in and the weakest area of the exploration — free, before any payment.
      </p>

      <p>
        <Link href="/essay/tok-essay">Check your TOK essay against the IB criteria →</Link>
      </p>

      <h2>Frequently asked questions</h2>

      <h3>How is the TOK essay marked — are there separate criteria?</h3>
      <p>
        No. Unlike the Extended Essay or Internal Assessments, the TOK essay uses one holistic assessment instrument out of 10. Examiners judge the essay as a whole against the question "does the essay provide a clear, coherent and critical exploration of the essay title?" and place it in one of five bands.
      </p>

      <h3>How many points is the TOK essay worth for my Diploma?</h3>
      <p>
        The essay is marked out of 10 and determines most of your TOK grade (A–E). Your TOK grade then combines with your Extended Essay grade to award up to 3 bonus points toward the Diploma. An E in either component is a failing condition.
      </p>

      <h3>Can I just ask ChatGPT to check my TOK essay?</h3>
      <p>
        A generic chatbot will comment on writing quality, but it does not apply the TOK holistic instrument unless you feed it the exact assessment language — and it tends to grade generously. A rubric-specific check asks the examiner's actual question and tells you which band the essay currently sits in.
      </p>

      <h2>Related resources</h2>

      <ul>
        <li><Link href="/resources/tok-essay-structure">TOK Essay Structure — paragraph by paragraph</Link></li>
        <li><Link href="/resources/tok-essay-format">TOK Essay Format — word count and formatting rules</Link></li>
        <li><Link href="/resources/tok-essay-guide">TOK Essay Guide — prescribed titles and knowledge claims</Link></li>
      </ul>
    </ResourceArticle>
  );
}
