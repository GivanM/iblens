import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function IBPsychologyIA() {
  return (
    <ResourceArticle
      title="IB Psychology IA: How to Design Your Replication Study | IBLens"
      description="A guide to the IB Psychology Internal Assessment through November 2026: choosing a study to replicate, designing an ethical experiment, analysing the results, and what each criterion rewards."
      canonical="/resources/ib-psychology-ia"
      datePublished="2026-06-09"
      dateModified="2026-06-09"
    >
      <p>
        <strong>Sitting your exams in May 2027 or later?</strong> Your IA is a research
        proposal marked out of 24, and no experiment is carried out.{" "}
        <Link href="/resources/ib-psychology-ia-2027">See the 2027 Psychology IA</Link>. This
        guide covers the experimental report marked out of 22, for sessions through November 2026.
      </p>
      <p>
        The IB Psychology Internal Assessment is a report on an experiment that
        investigates a published study, theory or model. You plan and run the experiment
        in a group of two to four students, then write the report on your own: the
        analysis, the conclusions and the evaluation are yours alone, and the guide asks
        group members not to discuss the results. You may adapt the original study to
        what a school allows, with different participants, materials or fewer conditions.
        The IA is worth 25% of the final grade at SL and 20% at HL, and the report should
        be between 1,800 and 2,200 words.
      </p>

      <h2>The Four Sections and the Marks Behind Them</h2>
      <p>
        The report follows the four assessment criteria, 22 marks in total:
      </p>
      <ul>
        <li><strong>Introduction (6 marks):</strong> the aim of the investigation and why it is relevant, the theory or model your experiment is based on and how the two link, and null or research hypotheses in which the independent and dependent variables are operationalised.</li>
        <li><strong>Exploration (4 marks):</strong> the research design, the sampling technique, the choice of participants, the controlled variables and the choice of materials, each explained rather than only described.</li>
        <li><strong>Analysis (6 marks):</strong> descriptive and inferential statistics applied appropriately and accurately, a correctly presented graph that addresses the hypothesis, and statistical findings interpreted with regard to the data and linked to the hypothesis.</li>
        <li><strong>Evaluation (6 marks):</strong> your findings discussed with reference to the background theory or model, the strengths and limitations of the design, sample and procedure explained, and modifications explicitly linked to those limitations and justified.</li>
      </ul>
      <p>
        The appendices are not counted in the 1,800 to 2,200 words. They hold the raw
        data, the calculations or statistics software output, the blank consent form,
        and your standardised instructions and debriefing notes. The references are not
        marked, but they must be there.
      </p>

      <h2>Choosing a Study You Can Actually Run</h2>
      <p>
        The published study sets up everything that follows. A workable one has these
        properties:
      </p>
      <ol>
        <li><strong>An independent variable you can manipulate:</strong> two word lists, two sets of instructions, two conditions you control. The guide rules out independent variables that are characteristics participants already have, such as gender, age, native language, culture, education level, socio-economic status or handedness. An experiment built on one of these does not meet the requirements and earns no marks.</li>
        <li><strong>Nothing the guide excludes:</strong> no placebos, no food, drink, smoking or drugs, and no deprivation of sleep or food.</li>
        <li><strong>A dependent variable you can measure as a number:</strong> words recalled, seconds taken, a rating on a scale.</li>
        <li><strong>Participants you can reach:</strong> a study that needs a clinical population, an age group you cannot access or specialist equipment will not work. The guide sets no minimum sample, but with only a handful of people per condition an inferential test has very little to work with.</li>
        <li><strong>Ethics the guide allows:</strong> experiments that cause anxiety, stress, pain or discomfort are not permitted, and neither are conformity or obedience experiments. Partial deception is allowed only where full knowledge would change the outcome, no harm is done and participants are fully debriefed. Consent must be given on a consent form, children under 12 cannot take part, and participants aged 12 to 16 need the written consent of a parent or guardian.</li>
      </ol>

      <h2>Studies That Adapt Well</h2>

      <h3>1. Loftus and Palmer (1974): leading questions and eyewitness memory</h3>
      <p>
        Show participants a short clip of an everyday event rather than a car crash, then
        vary the verb in one question ("How fast was the car going when it
        <em> contacted / smashed into</em> the other vehicle?") and compare the speed
        estimates. Two separate groups make this an independent measures design.
      </p>

      <h3>2. Stroop (1935): interference in naming colours</h3>
      <p>
        Participants name the ink colour of colour words printed in a matching colour
        (RED in red) and in a clashing colour (RED in blue). The same people do both
        lists, which makes it a repeated measures design, so counterbalance the order.
        The time taken per list is the dependent variable, and a stopwatch is enough.
      </p>

      <h3>3. Bransford and Johnson (1972): context and recall</h3>
      <p>
        One group hears an ambiguous passage with its title given first, the other hears
        it without the title, and both then write down as much as they can remember. The
        number of ideas recalled is the dependent variable. It is simple to standardise and
        raises no ethical difficulty.
      </p>

      <h3>4. Craik and Tulving (1975): depth of processing</h3>
      <p>
        Participants answer a question about each word in a list: a shallow one (is it
        written in capital letters?) or a deep one (does it fit the sentence "I saw a ___
        in the park"?). After a short distractor task, they recall as many words as they
        can. Assigning the two question types to separate groups gives an independent
        measures design.
      </p>

      <h2>Choosing the Inferential Test</h2>
      <p>
        The guide asks for descriptive and inferential statistics suited to your design
        but does not name a test, and justifying your choice is part of the Analysis
        criterion. With two conditions, two common choices are:
      </p>
      <ul>
        <li><strong>Mann-Whitney U test:</strong> two separate groups of participants (independent measures). No one takes part in both conditions.</li>
        <li><strong>Wilcoxon signed-rank test:</strong> the same participants take part in both conditions (repeated measures), so each person's two scores are paired.</li>
      </ul>
      <p>
        A t-test is also possible when your data meet its assumptions. Put the
        calculation or the software output in the appendix, and in the Analysis section
        report the test, the result and the significance level you used, commonly
        p ≤ 0.05. Then say whether you reject or retain the null hypothesis. A
        non-significant result is not a failed study: it still says something about the
        original finding, your procedure and the people you sampled.
      </p>

      <h2>Ethics: More Than a Checkbox</h2>
      <p>
        Participants must be told the aims of the experiment, give written consent, know
        they can withdraw at any time, and be debriefed. These are part of the design, and
        a moderator reads your procedure to see whether they were really in place. Common
        problems:
      </p>
      <ul>
        <li>A consent form so specific that it gives the hypothesis away. Describe the general topic, such as a study about memory, without revealing what you expect to find.</li>
        <li>Participants drawn from your own class, where saying you may leave at any time means little because of social pressure. If that applied, discuss it in the Evaluation.</li>
        <li>No record of the debriefing. It should explain what the experiment was really testing and why any withholding of information was needed.</li>
      </ul>

      <h2>Evaluation: Where Marks Slip Most Easily</h2>
      <p>
        The Evaluation criterion asks for three things, and many reports do only one:
      </p>
      <ol>
        <li><strong>Findings discussed with reference to the theory or model:</strong> do your results support it, and do they match the study your experiment is based on? If not, what might explain the difference, such as the participants, the setting or the materials?</li>
        <li><strong>Limitations of your design and procedure:</strong> the guide means factors that probably affected the outcome and could not have been avoided, not mistakes that better planning would have prevented. Opportunity sampling, demand characteristics and order effects are typical examples.</li>
        <li><strong>Modifications that follow from those limitations:</strong> not "use more participants", but which change, why, and what it would let you conclude that you cannot conclude now.</li>
      </ol>

      <h2>Before Your Teacher Marks the Final Draft</h2>
      <p>
        Your teacher marks the report and the IB moderates a sample of the school's work,
        so the mark is largely settled before any moderator reads it. The time to find out
        which criterion is weakest is while you can still change the report.
      </p>
      <p>
        IBLens reads your Psychology IA report against the assessment criteria and gives
        an estimated mark for each one, with what it would take to reach the next level.
      </p>
      <p>
        <Link href="/essay/psychology-ia">Paste your Psychology IA draft into IBLens for criterion-by-criterion feedback →</Link>
      </p>
      <h2>Internal Assessment in other subjects</h2>

      <ul>
        <li><Link href="/resources/ib-psychology-ia-2027">Psychology IA 2027: research proposal</Link></li>
        <li><Link href="/resources/ib-economics-ia">Economics IA</Link></li>
        <li><Link href="/resources/ib-history-ia">History IA</Link></li>
        <li><Link href="/resources/ib-ia-feedback">Check your IA against the criteria</Link></li>
      </ul>

    </ResourceArticle>
  );
}
