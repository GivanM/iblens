import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function HowIBLensWorks() {
  return (
    <ResourceArticle
      title="How IBLens Works: AI Feedback on IB Essays Explained | IBLens"
      description="How IBLens marks IB coursework: which criteria it uses, how the estimated mark is produced, what the report includes, and what it cannot do."
      canonical="/resources/how-iblens-works"
      datePublished="2026-05-01"
      dateModified="2026-09-13"
    >
      <h1>How IBLens works</h1>

      <p>
        IBLens gives AI feedback on IB Diploma coursework. It reads coursework against the published assessment criteria: criterion by criterion for the Internal Assessment and the Extended Essay, and against the single holistic scale for TOK, which has no sub-criteria. The report comes back in about a minute.
      </p>

      <p>
        This page explains exactly how IBLens works: what happens when you paste an essay, how the AI generates its feedback, what the output looks like, what the tool can and cannot do, and how it compares to alternatives like private tutors or peer review.
      </p>

      <h2>What IBLens does</h2>

      <p>
        When you paste an essay into IBLens, the full report includes:
      </p>

      <ul>
        <li><strong>Criterion-by-criterion scoring:</strong> Your essay is evaluated against the specific IB assessment criteria for your subject and essay type. Each criterion receives an estimated score with an explanation of why that score was assigned. A criterion judged on something you cannot paste, such as a Music recording or Extended Essay reflections you left out, is shown as not marked rather than guessed.</li>
        <li><strong>Overall estimate:</strong> based on the criterion scores, an estimated mark out of the total for your task. The free preview shows a range of totals that contains it, not the mark.</li>
        <li><strong>What is losing marks:</strong> Specific sections or aspects of your essay that are likely to lose marks, with explanations of why and suggestions for improvement.</li>
        <li><strong>Where marks are recoverable:</strong> Areas where small improvements would yield the largest mark gains, helping you prioritise your revision time.</li>
        <li><strong>What to fix first:</strong> concrete suggestions for improving the criteria that are losing marks, in plain language, in order of how many marks they are likely to recover.</li>
        <li><strong>Word count:</strong> the words you pasted, counted against the limit for your task where the guide sets one, with what the official count leaves out.</li>
      </ul>

      <p>
        A Biology IA is assessed against different criteria from a History IA or an Extended Essay in English Literature.
      </p>

      <h2>How the criteria reach the model</h2>

      <p>
        IBLens uses a large language model (Anthropic's Claude), instructed with the assessment criteria for your task before it reads your work. In practice that means:
      </p>

      <p>
        <strong>The criteria:</strong> for each subject, essay type and exam session, IBLens holds the criterion names, their maximum marks and a short summary of what each one assesses, taken from the subject guides. For TOK, it holds the band descriptors of the holistic instrument.
      </p>

      <p>
        <strong>Reading against the levels:</strong> the model reads your work for what the levels describe, such as whether evidence is evaluated or only reported, and whether arguments are developed or only asserted. Description and analysis are among the clearest differences between the lower and upper levels in most criteria.
      </p>

      <p>
        <strong>Contextual understanding:</strong> The model is given each task's conventions, for example that a science IA is marked on research design, data analysis, conclusion and evaluation, that a History IA opens with an evaluation of the sources it relies on, and that a TOK essay is marked on its focus on the title, its links to areas of knowledge and how well its arguments and examples hold up.
      </p>

      <p>
        <strong>No calibration against marked scripts:</strong> IBLens has not been tested against a set of officially marked scripts. An estimated mark is the model's reading of the published criteria, which is why it is shown as an estimate, and why the criterion it flags matters more than the exact number.
      </p>

      <h2>What feedback looks like</h2>

      <p>
        When you receive your IBLens analysis, the output is laid out in this order. Here is what a typical analysis includes:
      </p>

      <p>
        <strong>Overall comment:</strong> your estimated mark, with an overview of what works and what does not.
      </p>

      <p>
        <strong>Criteria breakdown:</strong> for each assessment criterion you see an estimated mark (for example "Criterion B: Knowledge and understanding: 4/6"), followed by an explanation of what your essay shows at that level.
      </p>

      <p>
        <strong>Specific feedback:</strong> rather than generic advice like "improve your analysis", the feedback refers to what is actually in your essay. For example: "In paragraph 3, you describe the results of the experiment but do not explain why the trend occurs. Explaining the trend with the enzyme kinetics you cite in your background section would strengthen your conclusion."
      </p>

      <p>
        <strong>Priority order:</strong> risks and next steps are listed with the ones likely to cost or recover the most marks first, so you can spend limited revision time where it counts.
      </p>

      <h2>Limitations and what AI can and cannot do</h2>

      <p>
        No AI tool is a perfect substitute for human judgement, and understanding the limitations helps you use the tool effectively:
      </p>

      <h3>What the report looks for</h3>
      <ul>
        <li><strong>Identifying structural issues:</strong> Missing sections, weak introductions, conclusions that do not answer the research question</li>
        <li><strong>Detecting description vs. analysis:</strong> Recognising when you are telling rather than evaluating</li>
        <li><strong>Criterion alignment:</strong> Checking whether your essay addresses all required criteria</li>
        <li><strong>Consistency checking:</strong> Identifying where your argument contradicts itself or where evidence does not support your claims</li>
        <li><strong>Word count:</strong> counted by IBLens against the official limit for the task, with what the official count leaves out</li>
      </ul>

      <h3>What IBLens cannot do</h3>
      <ul>
        <li><strong>Verify factual accuracy:</strong> the model cannot reliably check whether your historical facts, scientific data or calculations are correct. It assesses how you use evidence, not whether the evidence itself is accurate.</li>
        <li><strong>Replace your teacher:</strong> Your teacher knows your subject, your school's expectations, and your personal development. IBLens provides a second opinion, not a replacement for teacher guidance.</li>
        <li><strong>Guarantee a specific grade:</strong> the marks are estimates. Actual grades depend on the examiner or moderator, the grade boundaries for that session, and moderation.</li>
        <li><strong>Assess practical components:</strong> For subjects with practical elements (science experiments, art portfolios, music performances), IBLens can only assess the written component.</li>
        <li><strong>Detect plagiarism:</strong> IBLens is not a plagiarism detection tool. It assumes the work submitted is your own.</li>
      </ul>

      <h2>Privacy and data handling</h2>

      <p>
        Here is how IBLens handles your data:
      </p>

      <ul>
        <li><strong>Storage:</strong> The essay text is never written to our database. An anonymous report you did not buy is deleted after 90 days. A purchased report is kept. If you sign in, your history stays in your account until you delete it, and every report there has a delete button. Essay content goes only through our relay server to Anthropic, which marks it, and is never used to train AI models.</li>
        <li><strong>Processed only to produce your report:</strong> Your essay passes over an encrypted connection through our relay server in Helsinki to our AI provider, Anthropic, solely to generate your analysis. IBLens never stores the text itself. It is not used to train any model, not sold, and not shared with schools, universities or other students.</li>
        <li><strong>Encrypted transmission:</strong> every connection, from your browser to our server, the relay and Anthropic, uses HTTPS.</li>
        <li><strong>No training on your data:</strong> Your essays are not used to train or improve the AI model. Your intellectual property remains yours.</li>
        <li><strong>What is kept:</strong> the reports themselves (which can quote short passages) and, if you sign in, your email and history. How long each is kept is set out in the <Link href="/privacy">Privacy Policy</Link>, and everything can be deleted on request.</li>
      </ul>

      <p>
        If your school needs details about how IBLens handles data, email glushkovim@gmail.com.
      </p>

      <h2>Pricing overview</h2>

      <p>
        IBLens offers several pricing tiers to match different needs:
      </p>

      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Price</th>
            <th>Per report</th>
            <th>Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Free preview</strong></td>
            <td>$0</td>
            <td>n/a</td>
            <td>A range of totals and, for most drafts, feedback on your weakest criterion and the top risks (for the TOK essay and exhibition, the band, the start of the explanation and the top risks), one per device or account</td>
          </tr>
          <tr>
            <td><strong>Full report</strong></td>
            <td>$9.99</td>
            <td>$9.99</td>
            <td>One piece of work, with two free re-checks of revised versions within 14 days of the report opening</td>
          </tr>
          <tr>
            <td><strong>5 reports</strong></td>
            <td>$24.99</td>
            <td>$5.00</td>
            <td>Several different pieces of work (drafts of the same work use the free re-checks)</td>
          </tr>
          <tr>
            <td><strong>10 reports</strong></td>
            <td>$44.99</td>
            <td>$4.50</td>
            <td>Different pieces of work across subjects, such as your IAs, the EE and both TOK tasks (revisions of the same work use the free re-checks)</td>
          </tr>
        </tbody>
      </table>

      <p>
        All purchases include a <Link href="/refund-policy" className="text-primary hover:underline">7-day money-back guarantee</Link>. For any reason, email glushkovim@gmail.com within 7 days of purchase for a full refund.
      </p>

      <p>
        For current pricing and to purchase, visit the <Link href="/pricing" className="text-primary hover:underline">pricing page</Link>.
      </p>

      <h2>Comparison to alternatives</h2>

      <p>
        How does IBLens compare to other ways of getting feedback on your IB essays?
      </p>

      <h3>Private IB tutors</h3>
      <p>
        <strong>Pros:</strong> Personalised, can ask follow-up questions, builds a relationship over time, can help with content knowledge.
        </p>
        <p>
          <strong>Cons:</strong> paid by the hour, scheduling constraints, quality varies a great deal, and fewer tutors for less common subjects.
        </p>
        <p>
          <strong>When to use:</strong> If you need ongoing subject support beyond essay feedback, or if you learn best through conversation.
      </p>

      <h3>Peer review</h3>
      <p>
        <strong>Pros:</strong> Free, builds collaborative skills, can catch obvious errors.
        </p>
        <p>
          <strong>Cons:</strong> peers are not trained examiners, may give inaccurate feedback, may hold back honest criticism, and rarely know the criteria well.
        </p>
        <p>
          <strong>When to use:</strong> For catching basic errors and getting a reader's perspective, but not for criterion-level assessment.
      </p>

      <h3>Teacher feedback</h3>
      <p>
        <strong>Pros:</strong> Authoritative, knows the subject deeply, understands your development, free.
        </p>
        <p>
          <strong>Cons:</strong> limited time per student, and for coursework the IB expects teachers to comment on one draft and not to edit it.
        </p>
        <p>
          <strong>When to use:</strong> always. Teacher feedback cannot be replaced, but there is usually only one round of it on coursework.
      </p>

      <h3>IBLens</h3>
      <p>
        <strong>Pros:</strong> fast (about a minute), against the published criteria, affordable, two free re-checks with each report, available at any hour.
        </p>
        <p>
          <strong>Cons:</strong> an estimate from a language model, not a moderated mark; cannot verify factual accuracy, replace subject expertise or assess practical work.
        </p>
        <p>
          <strong>When to use:</strong> once your teacher (for the EE, your supervisor) and your school's policy allow outside feedback, for a second opinion on a draft before submission and to see which criteria need the most work.
      </p>

      <p>
        The most effective approach combines multiple feedback sources: use IBLens for rapid, criterion-based feedback during revision, and your teacher for authoritative subject guidance. Check with your teacher before you use any outside feedback, peers included, because the IB academic integrity policy asks students not to receive assistance beyond what the subject guide permits. The Extended Essay is the exception: its guide allows no help with the research, writing or proofreading beyond what your supervisor permits, so ask your supervisor before using IBLens or anyone else on it.
      </p>

      <p>
        Ready to try it? <Link href="/essay" className="text-primary hover:underline">Paste your first essay for a free preview</Link> and see how your work maps to the IB criteria. For more on how IB assessment works, explore our guides on <Link href="/resources/ib-essay-criteria-explained" className="text-primary hover:underline">IB essay criteria</Link>, the <Link href="/resources/ib-extended-essay-guide" className="text-primary hover:underline">Extended Essay</Link>, and <Link href="/resources/ib-internal-assessment-guide" className="text-primary hover:underline">Internal Assessments</Link>.
      </p>
    </ResourceArticle>
  );
}
