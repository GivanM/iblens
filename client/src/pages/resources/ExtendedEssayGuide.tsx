import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function ExtendedEssayGuide() {
  return (
    <ResourceArticle
      title="IB Extended Essay Guide — Structure, Criteria & How to Score an A"
      description="Complete guide to the IB Extended Essay: word count, structure, research question, assessment criteria A-E, common mistakes, and strategies for scoring an A."
      canonical="/resources/ib-extended-essay-guide"
      datePublished="2026-05-01"
      dateModified="2026-05-01"
    >
      <h1>The Complete IB Extended Essay Guide</h1>

      <p>
        The Extended Essay (EE) is one of the three core requirements of the IB Diploma Programme, alongside Theory of Knowledge and CAS. It is a 4,000-word independent research paper that asks students to investigate a topic of personal interest within one of the IB subject areas. For many students, the EE represents their first experience with sustained academic research, and it contributes up to 3 bonus points toward the IB Diploma when combined with the TOK grade.
      </p>

      <p>
        This guide covers everything you need to know about the Extended Essay: from choosing a research question to understanding how examiners apply the assessment criteria. Whether you are just starting your EE journey or revising a final draft, the information below will help you understand what examiners are looking for and how to maximize your score.
      </p>

      <h2>What Is the IB Extended Essay?</h2>

      <p>
        The Extended Essay is a required component for all IB Diploma candidates. It is an in-depth study of a focused topic chosen from one of the student's six DP subjects (or, in some cases, from an interdisciplinary perspective under the World Studies option). The essay must be the result of the student's own research and must demonstrate the ability to formulate an appropriate research question, engage in personal exploration of the topic, communicate ideas effectively, and develop a reasoned argument.
      </p>

      <p>
        The EE is supervised by a teacher at the student's school, but the research and writing must be the student's own work. The IBO allocates approximately 40 hours of work to the Extended Essay, spread across the final two years of the Diploma Programme. Students are expected to meet regularly with their supervisor, who provides guidance on methodology, structure, and academic conventions — but does not edit or rewrite the essay.
      </p>

      <h2>Word Count and Timeline</h2>

      <p>
        The maximum word count for the Extended Essay is <strong>4,000 words</strong>. This limit includes the introduction, body, conclusion, and any quotations. It does <em>not</em> include the abstract (which was removed from the requirements in 2018), table of contents, maps, charts, diagrams, annotated illustrations, tables, equations, formulas, calculations, citations/references, bibliography, or appendices.
      </p>

      <p>
        Going significantly under the word count (below 3,500 words) often indicates insufficient depth of analysis. Going over the limit means the examiner will stop reading at 4,000 words and will not assess any content beyond that point. Aim for 3,800–4,000 words to demonstrate thorough engagement without padding.
      </p>

      <p>
        A typical timeline for the Extended Essay spans 12–18 months:
      </p>

      <ul>
        <li><strong>Months 1–3:</strong> Subject selection, initial research, supervisor assignment, research question formulation</li>
        <li><strong>Months 4–7:</strong> Deep research, data collection, experimentation (for sciences), primary source analysis (for humanities)</li>
        <li><strong>Months 8–10:</strong> First draft writing, supervisor feedback sessions</li>
        <li><strong>Months 11–12:</strong> Revision, final draft, formatting, and submission</li>
      </ul>

      <p>
        Schools set their own internal deadlines, which are typically earlier than the IBO's final submission deadline. Missing internal deadlines can result in loss of supervisor support or, in extreme cases, inability to submit the essay.
      </p>

      <h2>Choosing a Research Question</h2>

      <p>
        The research question (RQ) is arguably the most important element of the Extended Essay. A well-crafted RQ provides focus, determines the scope of research, and guides the entire argument. A poor RQ leads to unfocused essays that struggle to demonstrate analysis.
      </p>

      <p>
        Characteristics of a strong research question:
      </p>

      <ul>
        <li><strong>Specific and focused:</strong> "To what extent did propaganda influence voter turnout in the 1933 German federal election?" is better than "How did propaganda affect Germany?"</li>
        <li><strong>Answerable within 4,000 words:</strong> If the question requires a book-length answer, it is too broad</li>
        <li><strong>Researchable:</strong> Sufficient primary and secondary sources must be available</li>
        <li><strong>Analytical, not descriptive:</strong> Questions beginning with "To what extent," "How far," or "Evaluate" tend to produce better arguments than "What" or "Describe" questions</li>
        <li><strong>Connected to a subject area:</strong> The RQ must clearly fit within one IB subject's methodology and assessment criteria</li>
      </ul>

      <p>
        Common mistakes in research question formulation include choosing a topic that is too broad (resulting in superficial treatment), too narrow (running out of material before 4,000 words), too personal (lacking academic rigor), or too reliant on a single source.
      </p>

      <h2>Structure and Formatting</h2>

      <p>
        While the IBO does not mandate a single structure for all Extended Essays (since structure varies by subject), most successful essays follow this general framework:
      </p>

      <ul>
        <li><strong>Title page:</strong> Research question, subject, word count, candidate information</li>
        <li><strong>Table of contents:</strong> With page numbers</li>
        <li><strong>Introduction (300–400 words):</strong> Context, research question, scope, methodology overview</li>
        <li><strong>Body (3,000–3,200 words):</strong> Organized into logical sections with clear headings, presenting evidence, analysis, and argumentation</li>
        <li><strong>Conclusion (200–300 words):</strong> Direct answer to the RQ, summary of findings, acknowledgment of limitations, suggestions for further research</li>
        <li><strong>Bibliography:</strong> Consistent citation style (MLA, APA, Chicago, or Harvard — pick one and use it throughout)</li>
        <li><strong>Appendices (if needed):</strong> Raw data, interview transcripts, supplementary materials</li>
      </ul>

      <p>
        For science subjects, the structure typically mirrors a lab report: introduction, methodology, results, analysis, conclusion. For humanities and social sciences, a thematic or chronological structure with argumentative sections works best.
      </p>

      <h2>Assessment Criteria (A–E)</h2>

      <p>
        The Extended Essay is assessed against five criteria, totaling 34 marks. The criteria were updated in 2018 and apply uniformly across all subjects:
      </p>

      <table>
        <thead>
          <tr>
            <th>Criterion</th>
            <th>Focus</th>
            <th>Max Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>A: Focus and Method</strong></td>
            <td>Topic, research question, methodology</td>
            <td>6</td>
          </tr>
          <tr>
            <td><strong>B: Knowledge and Understanding</strong></td>
            <td>Context, subject-specific terminology, source use</td>
            <td>6</td>
          </tr>
          <tr>
            <td><strong>C: Critical Thinking</strong></td>
            <td>Research, analysis, discussion, evaluation</td>
            <td>12</td>
          </tr>
          <tr>
            <td><strong>D: Presentation</strong></td>
            <td>Structure, layout, formatting</td>
            <td>4</td>
          </tr>
          <tr>
            <td><strong>E: Engagement</strong></td>
            <td>Reflections on planning and progress (RPPF)</td>
            <td>6</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Criterion C (Critical Thinking)</strong> carries the most weight at 12 marks. This is where examiners assess whether you have genuinely analyzed your evidence, considered alternative perspectives, evaluated the reliability of sources, and developed a reasoned argument. Descriptive essays that merely report information without analysis will score poorly here.
      </p>

      <p>
        <strong>Criterion E (Engagement)</strong> is assessed through the Reflections on Planning and Progress Form (RPPF), which consists of three reflections written at different stages of the research process plus a final reflection after the viva voce. This criterion evaluates intellectual engagement, decision-making, and the student's ability to reflect on their learning process.
      </p>

      <h2>Common Mistakes</h2>

      <p>
        Based on examiner reports published by the IBO, the most frequent issues with Extended Essays include:
      </p>

      <ul>
        <li><strong>Descriptive rather than analytical writing:</strong> Reporting what happened or what sources say without evaluating, comparing, or arguing</li>
        <li><strong>Research question too broad:</strong> Attempting to cover too much ground, resulting in superficial treatment</li>
        <li><strong>Over-reliance on secondary sources:</strong> Particularly in history and social science essays where primary sources are expected</li>
        <li><strong>Poor source evaluation:</strong> Citing sources without assessing their reliability, bias, or limitations</li>
        <li><strong>Weak conclusion:</strong> Failing to directly answer the research question or introducing new material in the conclusion</li>
        <li><strong>Inconsistent referencing:</strong> Mixing citation styles or failing to cite all borrowed ideas</li>
        <li><strong>Ignoring the RPPF:</strong> Treating the reflections as an afterthought rather than a genuine record of intellectual engagement</li>
        <li><strong>Exceeding word count:</strong> Including material that will not be read or assessed</li>
      </ul>

      <h2>How to Score an A</h2>

      <p>
        An A grade on the Extended Essay (equivalent to approximately 28–34 marks out of 34) requires excellence across all five criteria. Based on analysis of high-scoring essays and examiner commentary, here are the key characteristics of A-grade Extended Essays:
      </p>

      <p>
        <strong>Clear, focused research question</strong> that is genuinely interesting and allows for in-depth analysis within 4,000 words. The best RQs often emerge from genuine curiosity rather than from trying to find a "safe" topic.
      </p>

      <p>
        <strong>Sophisticated critical thinking</strong> demonstrated through evaluation of evidence, consideration of counter-arguments, acknowledgment of limitations, and nuanced conclusions. A-grade essays rarely present black-and-white answers; they acknowledge complexity.
      </p>

      <p>
        <strong>Effective use of subject-specific methodology:</strong> In sciences, this means rigorous experimental design and statistical analysis. In humanities, it means engagement with historiographical debates or literary theory. In social sciences, it means appropriate research methods and ethical considerations.
      </p>

      <p>
        <strong>Genuine personal engagement</strong> visible in the RPPF reflections and in the essay itself. Examiners can tell when a student is genuinely interested in their topic versus going through the motions.
      </p>

      <p>
        <strong>Professional presentation:</strong> Clear structure, consistent formatting, accurate referencing, and polished academic writing. While presentation only accounts for 4 marks, poor presentation creates a negative impression that can affect how examiners perceive the quality of thinking.
      </p>

      <h2>Final Checklist Before Submission</h2>

      <p>
        Before submitting your Extended Essay, verify the following:
      </p>

      <ul>
        <li>Word count is between 3,800 and 4,000 words (check what is included/excluded)</li>
        <li>Research question is clearly stated on the title page and in the introduction</li>
        <li>Every section of the body directly relates to answering the research question</li>
        <li>Conclusion directly answers the research question with evidence from the body</li>
        <li>All sources are cited consistently using one citation style throughout</li>
        <li>Bibliography is complete and properly formatted</li>
        <li>RPPF contains three substantive reflections plus the viva voce reflection</li>
        <li>Table of contents has accurate page numbers</li>
        <li>Headers and formatting are consistent throughout</li>
        <li>No material in appendices that should be in the main body</li>
        <li>The essay has been proofread for grammar, spelling, and clarity</li>
      </ul>

      <p>
        If you want objective, criterion-based feedback on your Extended Essay before submission, <Link href="/essay" className="text-primary hover:underline">IBLens can analyze your draft</Link> against the official IB criteria and identify specific areas for improvement. Getting a predicted score and seeing which criteria need work can help you focus your revision efforts in the final weeks before the deadline.
      </p>

      <p>
        For more on how IB assessment criteria work across all essay types, see our guide on <Link href="/resources/ib-essay-criteria-explained" className="text-primary hover:underline">IB Essay Criteria Explained</Link>. If you are working on an IA instead, check our <Link href="/resources/ib-internal-assessment-guide" className="text-primary hover:underline">Internal Assessment Guide</Link>.
      </p>
    </ResourceArticle>
  );
}
