import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function HowIBLensWorks() {
  return (
    <ResourceArticle
      title="How IBLens Works — AI-Powered IB Essay Feedback Explained"
      description="Learn how IBLens uses AI trained on IB rubrics to provide criterion-based essay feedback, predicted scores, and actionable improvement steps. Includes limitations, privacy, and pricing."
      canonical="/resources/how-iblens-works"
      datePublished="2026-05-01"
      dateModified="2026-05-01"
    >
      <h1>How IBLens Works</h1>

      <p>
        IBLens is an AI-powered essay analysis tool designed specifically for IB Diploma Programme students. It provides criterion-by-criterion feedback on Internal Assessments, Extended Essays, and Theory of Knowledge essays — the same type of detailed assessment that an experienced IB examiner would provide, delivered in approximately 60 seconds.
      </p>

      <p>
        This page explains exactly how IBLens works: what happens when you upload an essay, how the AI generates its feedback, what the output looks like, what the tool can and cannot do, and how it compares to alternatives like private tutors or peer review. We believe in transparency about our technology so you can make an informed decision about whether it is useful for your preparation.
      </p>

      <h2>What IBLens Does</h2>

      <p>
        When you upload an essay to IBLens, the system performs a comprehensive analysis that includes:
      </p>

      <ul>
        <li><strong>Criterion-by-criterion scoring:</strong> Your essay is evaluated against the specific IB assessment criteria for your subject and essay type. Each criterion receives a predicted score with an explanation of why that score was assigned.</li>
        <li><strong>Overall predicted grade:</strong> Based on the criterion scores, IBLens provides a predicted grade (1–7 for subject IAs, A–E for Extended Essays and TOK).</li>
        <li><strong>Risk areas:</strong> Specific sections or aspects of your essay that are likely to lose marks, with explanations of why and suggestions for improvement.</li>
        <li><strong>Leverage zones:</strong> Areas where small improvements would yield the largest mark gains — helping you prioritize your revision time.</li>
        <li><strong>Actionable next steps:</strong> Concrete, specific suggestions for how to improve each criterion score, written in plain language that tells you exactly what to do.</li>
      </ul>

      <p>
        The analysis is tailored to your specific subject and essay type. A Biology IA is assessed against different criteria than a History IA or an Extended Essay in English Literature. IBLens recognizes the subject context and applies the appropriate framework.
      </p>

      <h2>How the AI Was Trained Against IB Rubrics</h2>

      <p>
        IBLens uses advanced language models that have been specifically configured to understand and apply IB assessment criteria. The system works by:
      </p>

      <p>
        <strong>Criteria mapping:</strong> For each subject and essay type, the system has a detailed understanding of the assessment criteria, band descriptors, and what examiners look for at each level. This is derived from the official IBO assessment criteria published in subject guides, examiner reports, and marking guidance documents.
      </p>

      <p>
        <strong>Pattern recognition:</strong> The AI identifies patterns in your writing that correspond to different performance levels. For example, it can distinguish between descriptive writing (which typically scores in the middle bands) and analytical writing (which scores in the upper bands) by looking at how you use evidence, whether you evaluate sources, and whether you develop arguments with counter-claims.
      </p>

      <p>
        <strong>Contextual understanding:</strong> The AI understands subject-specific conventions. It knows that a science IA should have controlled variables and statistical analysis, that a History IA should evaluate sources using OPCVL or similar frameworks, and that a TOK essay should develop knowledge claims with examples from multiple areas of knowledge.
      </p>

      <p>
        <strong>Calibration:</strong> The system is calibrated to produce scores that align with the standards applied by real IB examiners. This means the predicted scores are realistic estimates, not inflated or deflated — if IBLens predicts a 5, it means your essay currently demonstrates the qualities that examiners typically associate with a grade 5.
      </p>

      <h2>What Feedback Looks Like</h2>

      <p>
        When you receive your IBLens analysis, the output is structured to be immediately actionable. Here is what a typical analysis includes:
      </p>

      <p>
        <strong>Summary section:</strong> Your overall predicted grade, total marks, and a brief overview of strengths and areas for improvement. This gives you the headline picture in 30 seconds.
      </p>

      <p>
        <strong>Criterion breakdown:</strong> For each assessment criterion, you see your predicted score (e.g., "Criterion B: Knowledge and Understanding — 4/6"), followed by a detailed explanation of what your essay demonstrates at this level and what would be needed to reach the next level.
      </p>

      <p>
        <strong>Specific feedback:</strong> Rather than generic advice like "improve your analysis," IBLens points to specific sections of your essay. For example: "In paragraph 3, you describe the results of the experiment but do not explain why the trend occurs. Adding a theoretical explanation connecting your results to [relevant theory] would strengthen Criterion C."
      </p>

      <p>
        <strong>Priority ranking:</strong> The feedback is organized by impact — the changes that would improve your score the most are highlighted first. This helps you allocate limited revision time effectively.
      </p>

      <h2>Limitations and What AI Can and Cannot Do</h2>

      <p>
        We believe in being transparent about what IBLens can and cannot do. No AI tool is a perfect substitute for human judgment, and understanding the limitations helps you use the tool effectively:
      </p>

      <h3>What IBLens does well</h3>
      <ul>
        <li><strong>Identifying structural issues:</strong> Missing sections, weak introductions, conclusions that do not answer the research question</li>
        <li><strong>Detecting description vs. analysis:</strong> Recognizing when you are telling rather than evaluating</li>
        <li><strong>Criterion alignment:</strong> Checking whether your essay addresses all required criteria</li>
        <li><strong>Consistency checking:</strong> Identifying where your argument contradicts itself or where evidence does not support your claims</li>
        <li><strong>Formatting and conventions:</strong> Checking academic writing standards, citation presence, and structural requirements</li>
      </ul>

      <h3>What IBLens cannot do</h3>
      <ul>
        <li><strong>Verify factual accuracy:</strong> The AI cannot check whether your historical facts, scientific data, or mathematical calculations are correct. It assesses how you use evidence, not whether the evidence itself is accurate.</li>
        <li><strong>Replace your teacher:</strong> Your teacher knows your subject, your school's expectations, and your personal development. IBLens provides a second opinion, not a replacement for teacher guidance.</li>
        <li><strong>Guarantee a specific grade:</strong> Predicted scores are estimates based on criteria analysis. Actual grades depend on many factors including the specific examiner, grade boundaries for that session, and moderation outcomes.</li>
        <li><strong>Assess practical components:</strong> For subjects with practical elements (science experiments, art portfolios, music performances), IBLens can only assess the written component.</li>
        <li><strong>Detect plagiarism:</strong> IBLens is not a plagiarism detection tool. It assumes the work submitted is your own.</li>
      </ul>

      <h2>Privacy and Data Handling</h2>

      <p>
        We take student privacy seriously. Here is how IBLens handles your data:
      </p>

      <ul>
        <li><strong>Essays are not stored permanently:</strong> Your essay text is processed through the AI for analysis and then discarded. We do not maintain a database of student essays.</li>
        <li><strong>No sharing with third parties:</strong> Your essay content is never shared with other students, schools, universities, or any third party.</li>
        <li><strong>Encrypted transmission:</strong> All data is transmitted over HTTPS with industry-standard encryption.</li>
        <li><strong>No training on your data:</strong> Your essays are not used to train or improve the AI model. Your intellectual property remains yours.</li>
        <li><strong>Account data:</strong> We store minimal account information (email, usage history) needed to provide the service. This can be deleted on request.</li>
      </ul>

      <p>
        If you have specific privacy concerns or need to comply with school policies about external tools, contact us at glushkovim@gmail.com and we can provide additional documentation.
      </p>

      <h2>Pricing Overview</h2>

      <p>
        IBLens offers several pricing tiers to match different needs:
      </p>

      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Price</th>
            <th>Per Analysis</th>
            <th>Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Free Trial</strong></td>
            <td>$0</td>
            <td>—</td>
            <td>Trying the tool on one essay to see if it is useful</td>
          </tr>
          <tr>
            <td><strong>Single Analysis</strong></td>
            <td>$4.99</td>
            <td>$4.99</td>
            <td>One-off feedback on a final draft before submission</td>
          </tr>
          <tr>
            <td><strong>Essay Pack (5)</strong></td>
            <td>$19.99</td>
            <td>$4.00</td>
            <td>Multiple drafts of the same essay or several different IAs</td>
          </tr>
          <tr>
            <td><strong>Essay Pack (10)</strong></td>
            <td>$34.99</td>
            <td>$3.50</td>
            <td>Full IB preparation — analyze all your IAs, EE drafts, and TOK essay</td>
          </tr>
          <tr>
            <td><strong>University Strategy</strong></td>
            <td>$25.00</td>
            <td>—</td>
            <td>Personalized university recommendations based on your predicted scores</td>
          </tr>
        </tbody>
      </table>

      <p>
        All purchases include a <Link href="/refund-policy" className="text-primary hover:underline">7-day money-back guarantee</Link>. If you are not satisfied with the analysis quality, email glushkovim@gmail.com within 7 days for a full refund.
      </p>

      <p>
        For current pricing and to purchase, visit the <Link href="/pricing" className="text-primary hover:underline">pricing page</Link>.
      </p>

      <h2>Comparison to Alternatives</h2>

      <p>
        How does IBLens compare to other ways of getting feedback on your IB essays?
      </p>

      <h3>Private IB Tutors</h3>
      <p>
        <strong>Pros:</strong> Personalized, can ask follow-up questions, builds a relationship over time, can help with content knowledge.
        <strong>Cons:</strong> Expensive ($50–150/hour), scheduling constraints, quality varies enormously, limited availability for niche subjects.
        <strong>When to use:</strong> If you need ongoing subject support beyond essay feedback, or if you learn best through conversation.
      </p>

      <h3>Peer Review</h3>
      <p>
        <strong>Pros:</strong> Free, builds collaborative skills, can catch obvious errors.
        <strong>Cons:</strong> Peers are not trained examiners, may give inaccurate feedback, social dynamics can prevent honest criticism, limited understanding of criteria.
        <strong>When to use:</strong> For catching basic errors and getting a reader's perspective, but not for criterion-level assessment.
      </p>

      <h3>Teacher Feedback</h3>
      <p>
        <strong>Pros:</strong> Authoritative, knows the subject deeply, understands your development, free.
        <strong>Cons:</strong> Limited time per student (teachers have 20+ students), may only review one draft, feedback turnaround can be slow (weeks).
        <strong>When to use:</strong> Always — teacher feedback is irreplaceable. But you typically only get 1–2 rounds of teacher review.
      </p>

      <h3>IBLens</h3>
      <p>
        <strong>Pros:</strong> Instant (60 seconds), criterion-specific, affordable, unlimited revisions possible, available 24/7, consistent quality.
        <strong>Cons:</strong> Cannot verify factual accuracy, cannot replace subject expertise, cannot assess practical components.
        <strong>When to use:</strong> Between teacher feedback rounds, for iterative revision, for a second opinion before submission, for identifying which criteria need the most work.
      </p>

      <p>
        The most effective approach combines multiple feedback sources: use IBLens for rapid, criterion-based feedback during revision, your teacher for authoritative subject guidance, and peers for a reader's perspective. Each source catches different issues.
      </p>

      <p>
        Ready to try it? <Link href="/essay" className="text-primary hover:underline">Upload your first essay free</Link> and see how your work maps to IB criteria. For more on how IB assessment works, explore our guides on <Link href="/resources/ib-essay-criteria-explained" className="text-primary hover:underline">IB Essay Criteria</Link>, the <Link href="/resources/ib-extended-essay-guide" className="text-primary hover:underline">Extended Essay</Link>, and <Link href="/resources/ib-internal-assessment-guide" className="text-primary hover:underline">Internal Assessments</Link>.
      </p>
    </ResourceArticle>
  );
}
