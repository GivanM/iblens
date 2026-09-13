import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function IBIAScorePredictor() {
  return (
    <ResourceArticle
      title="IB IA Score Estimator: Estimate Your Internal Assessment Mark | IBLens"
      description="How IB Internal Assessment marks are awarded and moderated, how to self-assess your IA criterion by criterion, and how to estimate your grade before results day."
      canonical="/resources/ib-ia-score-predictor"
      datePublished="2026-06-06"
      dateModified="2026-09-13"
    >
      <h1>IB IA Score Estimator: how to estimate your Internal Assessment mark</h1>
      <p>Your teacher has marked your Internal Assessment and you want to know whether that mark will hold. It may not: the mark is checked against a global standard before it counts. Knowing how that check works, and reading your own work criterion by criterion, gets you a realistic range rather than a single hopeful number.</p>

      <div className="not-prose my-6 rounded-xl border border-primary/30 bg-primary/5 p-5">
        <p className="text-base font-semibold text-foreground mb-1">The estimate</p>
        <p className="text-sm text-muted-foreground mb-3">
          Paste your IA into IBLens and get an estimated mark for each criterion your text can show, marked against the published criteria for your subject and session. The first preview is free: a range of totals and, for most drafts, your weakest criterion with its feedback and the top risks. Every mark is an estimate, not an IB mark.
        </p>
        <Link href="/essay?type=IA" className="inline-flex min-h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">Estimate my IA mark</Link>
      </div>

      <h2>How IB Internal Assessment marking works</h2>
      <h3>Stage 1: your teacher marks the work</h3>
      <p>Your teacher marks the IA against the assessment criteria in the subject guide. Each criterion has a maximum and a set of level descriptors. Totals differ by subject: the sciences are marked out of 24, Mathematics out of 20, History and Business Management out of 25, Psychology out of 22 through November 2026, and the Economics portfolio of three commentaries out of 45.</p>

      <h3>Stage 2: the IB moderates a sample</h3>
      <p>Your school uploads a sample of marked work, with the students chosen by the IB's system to cover the range of marks. An external moderator reviews that sample and decides whether the teacher's marks are right, too harsh or too lenient. Where they are out of line, the IB applies a moderation factor to the marks of every student at the school for that component, not only the students in the sample, and sends the school feedback on the difference.</p>
      <p>So the mark your teacher gave you is a well-informed estimate, not the final number. If the marking at your school was generous, everyone's marks in that subject can come down together.</p>

      <h2>Where marks are lost, subject by subject</h2>

      <h3>Biology, Chemistry and Physics</h3>
      <p>The scientific investigation is marked on four criteria of 6 marks each: Research design, Data analysis, Conclusion and Evaluation, 24 in total. A vague research question weakens everything after it, because the data, the conclusion and the evaluation all answer to it. Evaluation is another frequent gap: limitations are listed without saying how much they affected the result or what a realistic improvement would be.</p>

      <h3>Economics</h3>
      <p>Each of the three commentaries is marked on Diagrams, Terminology, Application and analysis, Key concept and Evaluation, 14 marks per commentary, and the portfolio earns 3 more under Criterion F for meeting the rubric requirements. A common loss: a supply and demand diagram that is drawn correctly but never tied back to what happened in the article. Evaluation means weighing the issue from different stakeholders and time frames, not restating the analysis after the word "however".</p>

      <h3>History</h3>
      <p>The Historical Investigation has three sections. In Section 1 you analyse the value and limitations of two of your sources, with reference to their origins, purpose and content. Saying a source "might be biased" stays in the lower levels; the top level asks for a detailed analysis and evaluation of two sources, with explicit discussion of their value and limitations for the investigation, with reference to their origins, purpose and content.</p>

      <h3>Psychology</h3>
      <p>Through November 2026 the IA is a report on a simple experiment based on a published study, theory or model, marked on Introduction, Exploration, Analysis and Evaluation. The Introduction needs an operationalised hypothesis. Evaluation is where marks slip most easily: the results are not related back to the original study, or the conclusions claim more than a small sample can support. From May 2027 the IA becomes a research proposal marked out of 24.</p>

      <h3>Mathematics</h3>
      <p>The exploration is marked on Presentation, Mathematical communication, Personal engagement, Reflection and Use of mathematics. Use of mathematics carries the most marks, 6 of 20, and its top level differs between SL and HL. At HL it asks for mathematics that is "precise and demonstrates sophistication and rigour". At SL the top level asks for relevant mathematics at the level of the course, used correctly, with thorough knowledge and understanding.</p>

      <h2>How to self-assess your IA</h2>

      <h3>Step 1: work from the real criteria</h3>
      <p>Ask your teacher for the assessment criteria from the subject guide. Paraphrased rubrics found online often drop the words that decide between two levels.</p>

      <h3>Step 2: mark one criterion at a time</h3>
      <p>Read your IA once for each criterion and ignore the others. When a descriptor says "clearly", ask whether a moderator who has never met you would find it clear.</p>

      <h3>Step 3: use best fit</h3>
      <p>Level descriptors are applied by best fit, not by ticking every phrase. This is the hardest judgement to make about your own work, and most students lean either too generous or too harsh.</p>

      <h3>Step 4: add up and compare</h3>
      <p>Add your criterion marks to get a raw total. Boundaries for the IA component are set each session and published to schools, so ask your teacher which grade a total usually corresponds to in your subject, and treat an older session's boundaries as a guide rather than a rule.</p>

      <h3>Step 5: allow for moderation</h3>
      <p>If your total sits close to a boundary, it is the most exposed to moderation. The IB does not publish how often or how far marks move, so treat your estimate as a range: the grade you calculated, or one either side of it.</p>

      <h2>Get your IA read criterion by criterion</h2>
      <p>Self-assessment has one limit you cannot get around: you know what you meant, so it is hard to see where the page does not say it.</p>
      <p><Link href="/essay">IBLens reads your Internal Assessment against the assessment criteria for your subject</Link> and returns an estimated mark for each criterion it can judge from the text, with the reasons behind it, so you can see which criterion is costing you the most before you submit. It is an estimate produced by a language model, not a moderated mark.</p>

      <h2>Frequently asked questions</h2>
      <h3>Can I predict my IA mark before my teacher marks it?</h3>
      <p>Roughly, by marking your work against the criteria one at a time. The difficulty is distance: you know the work too well to read it the way a moderator does.</p>

      <h3>How much can moderation change my IA mark?</h3>
      <p>The IB does not publish the size of moderation adjustments. What it does publish is how they work: a factor applied to every student at your school in that component when the sampled marks are out of line. Whether an adjustment changes your grade depends on how close your total sits to a boundary.</p>

      <h3>Are IA grade boundaries the same every year?</h3>
      <p>No. They are set each session, so boundaries from an earlier session are an approximation only.</p>

      <h3>Which subjects see the most moderation?</h3>
      <p>The IB does not publish moderation outcomes by subject. Every subject with an internally assessed component is moderated in the same way.</p>

      <h2>Related tools</h2>
      <ul>
        <li><Link href="/resources/ib-score-calculator">IB score calculator</Link></li>
        <li><Link href="/resources/ib-grade-boundaries">IB grade boundaries</Link></li>
        <li><Link href="/remark">Is an IB re-mark worth it?</Link></li>
      </ul>
    </ResourceArticle>
  );
}
