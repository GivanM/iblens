import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function AcademicIntegrity() {
  return (
    <ResourceArticle
      title="AI Feedback and IB Academic Integrity: Is It Allowed? | IBLens"
      description="What the IB academic integrity policy means for AI feedback on your EE, TOK essay or IA, and how IBLens handles your data: no training on your essays, no sharing beyond our relay server and the AI provider that marks them, deletion on request."
      canonical="/resources/academic-integrity"
      datePublished="2026-07-03"
      dateModified="2026-09-13"
    >
      <h1>AI feedback and IB academic integrity</h1>

      <p>
        The most common question students ask before using any AI tool on their IB work is not about
        accuracy. It is "will this get me in trouble?" That is a fair question, and most tools avoid
        answering it. Here is an honest walkthrough of where the line sits, and exactly what IBLens
        does and does not do with your essay.
      </p>

      <h2>What the IB integrity policy actually cares about</h2>
      <p>
        The IB academic integrity policy is built around one principle: the work you submit must be
        your own. The IB defines academic misconduct as behaviour, whether deliberate or inadvertent, that results
        in, or may result in, you or any other student gaining an unfair advantage in one or more
        components of assessment. Behaviour that may disadvantage another student is also academic misconduct. That covers plagiarism and collusion,
        and also reusing your own work: the same piece of work cannot be submitted for both an internal
        assessment and the extended essay.
      </p>
      <p>
        <strong>The Extended Essay is stricter.</strong> The Extended Essay guide says students are not allowed to receive assistance with any aspect of the research, writing or proofreading of the essay beyond that which is permitted through their supervisor. Ask your supervisor before you use any outside feedback on your EE, IBLens included.
      </p>
      <p>
        Getting <strong>feedback on work you wrote yourself</strong> is different from having it written or
        edited for you, but it is not automatically allowed. For most IAs and the TOK essay your teacher comments on one draft (for the individual
        oral, on your outline and on practice orals), and your supervisor comments in writing on one full draft of your EE. The IB academic
        integrity policy asks students to abstain from receiving non-permitted assistance in the completion or editing of work, such as from friends, relatives, other students, private tutors,
        essay writing or copy-editing services, pre-written essay banks or file sharing websites, and the Extended Essay guide is
        stricter still, as set out above. Before you use outside feedback on an IA or the TOK essay, AI tools
        included, check that your teacher and your school's policy allow it. The IB has also publicly stated that it will not ban AI tools, and that their use
        must follow its academic integrity policy, which now has an appendix on artificial intelligence
        (see the <a href="https://ibo.org/news/news-about-the-ib/statement-from-the-ib-about-chatgpt-and-artificial-intelligence-in-assessment-and-education/" target="_blank" rel="noopener">IB statement on ChatGPT and AI</a> and the IB page on{" "}
        <a href="https://ibo.org/programmes/artificial-intelligence-ai-in-learning-teaching-and-assessment/" target="_blank" rel="noopener">AI in learning, teaching and assessment</a>).
      </p>
      <p>
        Two important caveats. First, <strong>your school may have its own stricter rules</strong>: some schools
        restrict any AI use on assessed work. Check with your IB coordinator; when in doubt, disclose.
        Second, the line is bright: the moment AI-generated text goes <em>into</em> your essay, it stops
        being your work. Never paste AI writing into a submission.
      </p>

      <h2>How to use AI feedback with integrity</h2>
      <ul>
        <li><strong>Get feedback, not text.</strong> Use the criterion breakdown to see where marks are lost, then fix it in your own words.</li>
        <li><strong>Keep your drafts.</strong> A visible draft history is your best evidence that the work is yours.</li>
        <li><strong>Ask first, then say that you used it.</strong> Ask your teacher before you use it on an IA or the TOK essay, and your supervisor before you use it on the Extended Essay, and follow your school's policy on how to record it.</li>
        <li><strong>Never submit AI-written text as your own.</strong> Not sentences, not paragraphs. Feedback in, your own writing out.</li>
      </ul>

      <h2>How to acknowledge AI feedback</h2>
      <ul>
        <li><strong>AI material in your work must be credited.</strong> The IB academic integrity policy says that if you copy or paraphrase text produced by an AI tool, or use an image, graph or other material from one, you must reference the tool in the body of the work and add it to the bibliography, and the in-text citation should use quotation marks in your school's referencing style and give the prompt you used and the date the text was generated. IBLens describes what to change rather than writing text for you, but if any wording from a report goes into your work, even paraphrased, credit it in the same way.</li>
        <li><strong>Mention it to your teacher or supervisor,</strong> as the rule above says. For the Extended Essay, a supervision session is the natural place.</li>
        <li><strong>Keep the reports with your drafts.</strong> Together they show that the revisions came from you. Save each report with your browser's print to PDF (saved reports in an account also have a Save as PDF button).</li>
        <li><strong>Orals and the TOK exhibition work the same way.</strong> The ideas and words in your individual oral or exhibition commentary must be yours. The Language A guides let teachers give feedback on your outline, and on practice orals that use different works and global issues, but not rehearse the actual oral with you, so do not get feedback from anyone, a tool included, on a rehearsal of the oral you will deliver. A script written by a tool is never allowed.</li>
      </ul>

      <h2>What IBLens does with your essay</h2>
      <ul>
        <li><strong>We do not train models on your essays.</strong> Your text is sent to the grading model, scored, and returned. It does not become training data.</li>
        <li><strong>We do not sell or publish your essay. It passes through our relay server in Helsinki to Anthropic, which marks it, and goes to no one else.</strong> No exemplar library built from user submissions, no reselling, no indexing.</li>
        <li><strong>IBLens never saves the essay text, and an anonymous report you did not buy is deleted after 90 days.</strong> Anthropic, which marks it, deletes the text within 30 days unless it is flagged under its usage policy or the law requires otherwise. Signed-in users keep their history in their dashboard; you can request full deletion at any time.</li>
        <li><strong>Nothing goes into plagiarism databases.</strong> IBLens does not feed Turnitin or any similarity database. Getting feedback here does not create a record that later flags your submission.</li>
      </ul>

      <h2>Will my teacher know I used IBLens?</h2>
      <p>
        Not from IBLens: it does not contact your school, and it adds nothing to your work or to any database
        a school or the IB checks. Your teacher will know if you tell them, and you should, as the rules above
        explain: the IB allows AI tools used within its academic integrity policy, and saying you had feedback
        is how you use them openly. What does get noticed, and counts as misconduct, is uncredited AI-written text
        in the work you submit.
      </p>

      <h2>Will Turnitin or the IB flag me for using AI feedback?</h2>
      <p>
        Similarity tools compare your submission against published text and other submissions. Reading
        AI feedback about your essay adds nothing to those databases: there is nothing to match
        against. What similarity and AI-detection tools <em>do</em> flag is AI-generated prose inside your
        submission. The rule from the section above covers you: feedback in, your own writing out.
      </p>

      <h2>If you are applying through UCAS</h2>

      <p>
        UCAS rules are separate from IB rules, and they are stricter about one specific thing. When you
        submit your application you declare that the personal statement is your own work and has not been
        copied or provided from another source, <strong>including artificial intelligence software</strong>.
        Generating your statement with an AI tool and submitting it as your own can be treated as cheating
        by the universities you applied to.
      </p>

      <p>
        UCAS also runs every submitted statement through similarity detection, comparing it against
        statements previously submitted to UCAS and sample statements collected from websites and other sources. This is
        a similarity check rather than an AI detector, but the practical consequence is the same: anything
        that resembles text someone else has submitted, or text published on a website, can be flagged to
        the universities you applied to. Individual universities also run their own checks and can ask you
        about your statement at interview.
      </p>

      <p>
        Two practical rules follow from this. First, never paste wording from any tool, including ours,
        into your application: our reviews deliberately describe what to change rather than hand you
        sentences, precisely so there is nothing to copy. Second, do not post your statement anywhere
        public (forums, social media, essay-sharing sites), because that is how a statement ends up in a
        similarity database before you have even submitted it.
      </p>

      <p>
        What IBLens does with a statement you paste into the{" "}
        <Link href="/ucas-personal-statement">UCAS personal statement checker</Link>: we analyse it and show
        you the feedback. The statement itself is never stored; the review, which can quote short passages,
        is kept for the periods set out in our <Link href="/privacy">Privacy Policy</Link>. We do not publish it,
        do not train models on it, and do not submit it to Turnitin or any similarity database.
      </p>

      <h2>Why we built it this way</h2>
      <p>
        IBLens exists to answer one question, "where does my essay lose marks against the published
        criteria?", which is the same question a good supervisor answers on a draft. That is why the product
        returns criterion-level feedback and an estimated mark rather than rewritten text: it is
        designed so that the version you submit is always yours.
      </p>

      <p>
        Questions about your data? Email <a href="mailto:glushkovim@gmail.com">glushkovim@gmail.com</a> and we will delete your records, with no forms to fill in.
        Ready to see where your essay stands? <Link href="/essay">Check it against the criteria</Link>.
      </p>
    </ResourceArticle>
  );
}
