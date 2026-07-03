import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function IBPsychologyIA() {
  return (
    <ResourceArticle
      title="IB Psychology IA — How to Design Your Replication Study and Score a 7 | IBLens"
      description="A complete guide to the IB Psychology Internal Assessment: how to choose a study to replicate, design an ethical experiment, analyse results statistically, and score well on every criterion."
      canonical="/resources/ib-psychology-ia"
      datePublished="2026-06-09"
      dateModified="2026-06-09"
    >
      <p>
        The IB Psychology Internal Assessment is a replication study: you choose an
        existing published psychological study, adapt it for an ethical school setting,
        collect data from a minimum of ten participants per condition, and write a
        formal report in the style of a scientific paper. It is worth 25% of your
        final grade at SL and 20% at HL. Unlike other IB IAs, Psychology explicitly
        requires you to replicate an existing study rather than design a completely
        original experiment — and this constraint is both an advantage and a challenge.
      </p>

      <h2>The Four Sections of the IB Psychology IA Report</h2>
      <p>
        The Psychology IA has a specific required structure that differs from other
        Group 3 IAs. The four sections and their approximate word allocations are:
      </p>
      <ul>
        <li><strong>Introduction (approx. 200–300 words):</strong> Background to the original study, explanation of the research question and aim, and a clear directional hypothesis (one-tailed or two-tailed).</li>
        <li><strong>Exploration (approx. 200–350 words):</strong> Design of your study — independent variable, dependent variable, controls, sampling method, ethical considerations (including informed consent and right to withdraw).</li>
        <li><strong>Analysis (approx. 150–250 words):</strong> Descriptive statistics (means, standard deviations) presented in a table, an appropriate graph, and the result of an inferential test.</li>
        <li><strong>Evaluation (approx. 200–350 words):</strong> Comparison of your results to the original study, discussion of limitations, and suggested improvements.</li>
      </ul>
      <p>
        Total word limit: 1500–2200 words (not including references, raw data in
        appendix, or participant consent forms). Staying within the word limit is
        itself assessed under Communication.
      </p>

      <h2>Choosing the Right Study to Replicate</h2>
      <p>
        The choice of original study determines how straightforward your IA will be.
        A good replication study for the IB Psychology IA has four properties:
      </p>
      <ol>
        <li><strong>Simple, operationalisable IV and DV:</strong> The independent variable must be something you can manipulate in a school setting (two word lists, two images, two conditions) and the dependent variable must be measurable numerically (number of words recalled, response time in seconds, rating on a scale).</li>
        <li><strong>Ethical with secondary school participants:</strong> Studies involving deception are acceptable if debriefing is provided, but anything involving stress induction, deception about a participant's health or performance, or sensitive topics (eating, depression, self-esteem) requires especially careful ethical planning.</li>
        <li><strong>Accessible to replicate with ≥10 participants per condition:</strong> A study requiring clinical populations, specific age groups you cannot access, or expensive equipment is unsuitable.</li>
        <li><strong>An expected result that is testable with a Mann-Whitney U test or Wilcoxon signed-rank test:</strong> These are the two inferential tests specified in the IB Psychology course. Your study design must produce data suited to one of them.</li>
      </ol>

      <h2>IB Psychology IA Study Examples That Work Well</h2>

      <h3>1. Replication of Loftus and Palmer (1974) — leading questions and eyewitness memory</h3>
      <p>
        Show participants a short video clip of an everyday event (not a car crash —
        less distressing). Vary the verb in a critical question ("How fast was the
        car going when it <em>contacted/smashed into</em> the other vehicle?").
        Compare estimated speeds between the two conditions. This is a between-subjects
        design; use the Mann-Whitney U test. Well understood, easy to run, clear results.
      </p>

      <h3>2. Replication of Stroop (1935) — cognitive interference</h3>
      <p>
        Create two word lists: colour words printed in a congruent colour (RED in red)
        and the same words printed in an incongruent colour (RED in blue). Measure
        time to name the ink colour for each list. This is a within-subjects design;
        use the Wilcoxon signed-rank test. Response time is the DV — measurable with
        a stopwatch, no specialist equipment needed.
      </p>

      <h3>3. Replication of Miller (1956) — the magical number 7 and working memory capacity</h3>
      <p>
        Give participants a sequence of random digits (lists of varying length: 5, 7,
        9, or 11 digits) to recall immediately. Measure accuracy by list length. A
        simpler version: compare recall accuracy for a 7-item list vs a 11-item list
        (between subjects). This directly tests Miller's claim about working memory
        capacity limits. Easy to standardise, clear ethical picture.
      </p>

      <h3>4. Replication of Craik and Lockhart (1972) — levels of processing</h3>
      <p>
        Present participants with a word list under two encoding conditions: one group
        answers shallow questions about each word (is it in capital letters?), the
        other answers deep questions (does it fit in the sentence "I saw a ___ in the
        park"?). Measure free recall after a distractor task. Between-subjects design;
        Mann-Whitney U test. This directly tests the levels of processing effect.
      </p>

      <h2>The Statistical Test: Mann-Whitney U vs Wilcoxon</h2>
      <p>
        IB Psychology requires one of two non-parametric tests. Choosing correctly
        is assessed under Analysis:
      </p>
      <ul>
        <li><strong>Mann-Whitney U test:</strong> Use when you have two separate groups of participants (between-subjects / independent measures design). Your two groups are independent — no participant appears in both conditions.</li>
        <li><strong>Wilcoxon signed-rank test:</strong> Use when the same participants take part in both conditions (within-subjects / repeated measures design). Each participant's two scores are paired.</li>
      </ul>
      <p>
        Calculate the test statistic by hand (the IB requires this) and compare to
        the critical value table at p ≤ 0.05. State whether you reject or retain the
        null hypothesis. Do not interpret a non-significant result as "the study
        failed" — a non-significant result still has things to say about the original
        study, your methodology, and the population you sampled.
      </p>

      <h2>Ethical Considerations: More Than a Checkbox</h2>
      <p>
        The Psychology IA requires explicit ethical planning — informed consent, right
        to withdraw, confidentiality, and debriefing. These are not formalities:
        examiners check whether your ethical procedures were actually appropriate for
        the study you ran. Common problems:
      </p>
      <ul>
        <li>Informed consent forms that describe the study so specifically that they prime participants — defeating the purpose of any deception. Solution: describe the general topic (a study about memory) without revealing the specific hypothesis.</li>
        <li>Studies run on friends or classmates without a genuine right to withdraw — social pressure makes "you can leave at any time" meaningless. Note this in Evaluation as a limitation.</li>
        <li>No debriefing documented. Debriefing must explain what the study was actually testing and why any deception (if used) was necessary.</li>
      </ul>

      <h2>Evaluation: The Most Commonly Under-Scored Section</h2>
      <p>
        Psychology IA Evaluation requires you to do three things, and most students
        only do one:
      </p>
      <ol>
        <li><strong>Compare your results to the original study:</strong> Did you replicate the finding? If not, why might the results differ? Consider participant demographics, cultural context, the specific stimuli used.</li>
        <li><strong>Identify and explain specific limitations of your design:</strong> Convenience sampling (you used your classmates — how might this affect generalisability?), demand characteristics, social desirability, order effects if within-subjects.</li>
        <li><strong>Propose concrete improvements:</strong> Not "use more participants" without justification — specify how many, why that number, and what statistical power that would give you. A specific suggested modification to reduce a named confound is much stronger than a general statement.</li>
      </ol>

      <h2>Before Your Supervisor Reads Your Final Draft</h2>
      <p>
        Psychology IA marks are largely determined before the moderator sees the
        work — your supervisor's assessment is moderated but is usually close to
        the final mark. Getting criterion-by-criterion feedback before your
        supervisor finalises their mark is the highest-leverage intervention
        available to you.
      </p>
      <p>
        IBLens analyses your Psychology IA report against the official IB marking
        criteria and tells you exactly what each criterion needs to reach the next
        mark band — before it is too late to change anything.
      </p>
      <p>
        <Link to="/essay">Upload your Psychology IA draft to IBLens for rubric-based feedback →</Link>
      </p>
    </ResourceArticle>
  );
}
