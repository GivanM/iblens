import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function AcademicIntegrity() {
  return (
    <ResourceArticle
      title="AI Feedback and IB Academic Integrity - Is It Allowed? | IBLens"
      description="What the IB academic integrity policy means for AI feedback on your EE, TOK essay or IA - and exactly how IBLens handles your data: no training on your essays, no sharing, deletion on request."
      canonical="/resources/academic-integrity"
      datePublished="2026-07-03"
      dateModified="2026-07-03"
    >
      <h1>AI Feedback and IB Academic Integrity</h1>

      <p>
        The most common question students ask before using any AI tool on their IB work is not about
        accuracy - it is "will this get me in trouble?" It is a fair question, and most tools avoid
        answering it. Here is an honest walkthrough of where the line sits, and exactly what IBLens
        does and does not do with your essay.
      </p>

      <h2>What the IB integrity policy actually cares about</h2>
      <p>
        The IB academic integrity policy is built around one principle: the work you submit must be
        your own. The violations it names - plagiarism, collusion, having someone else produce your
        work - are all versions of submitting writing that is not yours.
      </p>
      <p>
        Getting <strong>feedback on work you wrote yourself</strong> is a different category. Teachers do it,
        supervisors do it on your EE draft, tutors charge for it. Feedback that helps you understand
        where your own writing loses marks - which you then revise yourself - is study support, not
        misconduct. The IB has also publicly stated it will not ban AI tools, treating them like any
        other source: the integrity question is how you use them.
      </p>
      <p>
        Two important caveats. First, <strong>your school may have its own stricter rules</strong> - some schools
        restrict any AI use on assessed work. Check with your IB coordinator; when in doubt, disclose.
        Second, the line is bright: the moment AI-generated text goes <em>into</em> your essay, it stops
        being your work. Never paste AI writing into a submission.
      </p>

      <h2>How to use AI feedback with integrity</h2>
      <ul>
        <li><strong>Get feedback, not text.</strong> Use the criterion breakdown to see where marks are lost - then fix it in your own words.</li>
        <li><strong>Keep your drafts.</strong> A visible draft history is your best evidence that the work is yours.</li>
        <li><strong>Follow your school policy.</strong> If your school requires disclosing AI-assisted feedback, disclose it - the same way you would mention a tutor reviewed your draft.</li>
        <li><strong>Never submit AI-written text.</strong> Not sentences, not paragraphs. Feedback in, your own writing out.</li>
      </ul>

      <h2>What IBLens does with your essay</h2>
      <ul>
        <li><strong>We do not train models on your essays.</strong> Your text is sent to the grading model, scored, and returned. It does not become training data.</li>
        <li><strong>We do not share, sell or publish your essay.</strong> No exemplar library built from user submissions, no reselling, no indexing.</li>
        <li><strong>Anonymous analyses are not stored permanently.</strong> Signed-in users keep their history in their dashboard; you can request full deletion at any time.</li>
        <li><strong>Nothing goes into plagiarism databases.</strong> IBLens does not feed Turnitin or any similarity database. Getting feedback here does not create a record that later flags your submission.</li>
      </ul>

      <h2>Will Turnitin or the IB flag me for using AI feedback?</h2>
      <p>
        Similarity tools compare your submission against published text and other submissions. Reading
        AI feedback about your essay adds nothing to those databases - there is nothing to match
        against. What similarity and AI-detection tools <em>do</em> flag is AI-generated prose inside your
        submission. The rule from the section above covers you: feedback in, your own writing out.
      </p>

      <h2>Why we built it this way</h2>
      <p>
        IBLens exists to answer one question - "where does my essay lose marks against the official
        rubric?" - the same question a good supervisor answers on a draft. That is why the product
        returns criterion-level feedback and a predicted band rather than rewritten text: it is
        designed so that the version you submit is always yours.
      </p>

      <p>
        Questions about your data? Email us and we will delete your records - no forms, no friction.
        Ready to see where your essay stands? <Link href="/essay">Your first analysis is free</Link>.
      </p>
    </ResourceArticle>
  );
}
