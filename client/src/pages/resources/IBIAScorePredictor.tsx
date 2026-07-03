import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function IBIAScorePredictor() {
  return (
    <ResourceArticle
      title="IB IA Score Predictor — How to Estimate Your Internal Assessment Grade | IBLens"
      description="Learn how IB IA grading and moderation work, how to self-assess your Internal Assessment, and how to estimate your IA grade before results day."
      canonical="/resources/ib-ia-score-predictor"
      datePublished="2026-06-06"
      dateModified="2026-06-06"
    >
      <h1>IB IA Score Predictor: How to Estimate Your Internal Assessment Grade</h1>
      <p>Every IB student reaches the same anxious moment: you've submitted your Internal Assessment, your teacher has awarded a mark, and now you're left wondering — <em>is that grade going to stick?</em> Understanding how IA grading actually works — and how to apply a systematic self-assessment — can get you surprisingly close to the real number before results day.</p>

      <h2>How IB Internal Assessment Grading Actually Works</h2>
      <h3>Stage 1: Teacher Marking</h3>
      <p>Your subject teacher marks your IA against an official mark scheme published by the IBO. Every criterion has a maximum score and a set of level descriptors. Raw marks vary by subject: Biology IAs are marked out of 24, Economics commentaries out of 45 (across three), Mathematics AIs out of 20, History IAs out of 25, Psychology IAs out of 22, and Chemistry IAs out of 24.</p>

      <h3>Stage 2: IBO Moderation</h3>
      <p>After teachers submit their marks, the IBO samples student work from each school — typically five students — and a trained moderator re-marks those samples independently. If the moderator consistently scores higher or lower than the teacher, the IBO applies a statistical adjustment to <em>all</em> marks from that school for that subject.</p>
      <p>This means your final moderated mark is not simply what your teacher gave you. If your school's teacher was systematically generous, your whole cohort might be scaled down. This is the most important thing to understand about IB IA grade prediction: your teacher's mark is an estimate, not a final score.</p>

      <h2>What Affects Your IA Score: Criteria by Subject</h2>

      <h3>Biology and Chemistry IA</h3>
      <p>Science IAs are assessed on five criteria: Personal Engagement (2 marks), Exploration (6), Analysis (6), Evaluation (6), and Communication (4). Exploration is where most students lose points — a weak research question cascades into problems in every subsequent criterion. Evaluation is the other common weak point: students frequently describe limitations without quantifying their impact or suggesting realistic improvements.</p>

      <h3>Economics IA</h3>
      <p>Students submit three commentaries assessed on Diagrams, Terminology, Application, Analysis, and Evaluation. Many students draw supply-and-demand diagrams and never explicitly explain what the shifts represent in terms of the article — this costs marks in both Diagrams and Analysis. Genuine evaluation requires considering different perspectives and stakeholder impacts, not simply restating analysis with "however" in front of it.</p>

      <h3>History IA</h3>
      <p>The Historical Investigation uses three sections. OPCVL analysis in Section A must go beyond surface observations. A source's limitation being "it might be biased" scores at the lower levels; explaining precisely how the author's position shaped what they omit scores at the top.</p>

      <h3>Psychology IA</h3>
      <p>Psychology IAs replicate a cognitive psychology study. The Introduction must include a clearly operationalised hypothesis. Discussion is where marks are most frequently dropped: students either fail to relate findings back to the original study or write conclusions that go far beyond what their small sample can support.</p>

      <h3>Mathematics IA</h3>
      <p>Assessed on Presentation, Mathematical Communication, Personal Engagement, Reflection, and Use of Mathematics. The Use of Mathematics criterion differentiates grades most sharply — the mathematics must be "precise, elegant, and demonstrates sophistication," meaning a genuinely non-trivial approach for your level.</p>

      <h2>How to Self-Assess Your IA: A Practical Method</h2>

      <h3>Step 1: Get the Official Mark Scheme</h3>
      <p>Download the Subject Guide and the Internal Assessment section for your subject from the IBO resources page via your school's MyIB login. Third-party rubrics are often paraphrased and imprecise.</p>

      <h3>Step 2: Mark Each Criterion Independently</h3>
      <p>Read your IA once for each criterion, ignoring all the others. If a descriptor uses the word "clearly," ask whether a moderator reading your work cold would find it clear.</p>

      <h3>Step 3: Apply the "Fit" Test</h3>
      <p>IBO level descriptors describe the <em>best fit</em> for a band, not a perfect match. This is the judgment call where self-assessment is hardest — most students are either over-generous or over-harsh.</p>

      <h3>Step 4: Sum Your Marks and Convert</h3>
      <p>Add up your criterion marks to get a raw total. Then use the most recent grade boundary table for your subject. Remember that grade boundaries shift each session — using boundaries from two or three years ago can mislead you by one grade.</p>

      <h3>Step 5: Factor in Moderation Uncertainty</h3>
      <p>If your raw mark sits near a grade boundary, you are in the highest-risk zone. A moderation adjustment of ±2 marks is common; adjustments of ±4 or more are possible. Students near boundaries should treat their estimated grade as a range: the grade they calculate, plus or minus one.</p>

      <h2>Why Predicted IA Grades Change After Moderation</h2>
      <p>In most sessions, a majority of schools receive some adjustment. The variance is higher in subjects with more subjective criteria — History and Psychology IAs tend to see wider adjustment ranges than Chemistry or Maths IAs. Two factors drive large adjustments: teacher inexperience with IB marking standards, and grade inflation pressure from knowing students personally.</p>

      <h2>Get Your IA Analyzed by AI</h2>
      <p>Self-assessment has a fundamental limitation: you can't read your own work the way a stranger would. You know what you meant to say, which makes it hard to see where you failed to say it clearly enough to earn a mark.</p>
      <p><Link to="/essay">IBLens analyses your Internal Assessment against the official mark scheme criteria</Link>{" "}— giving you a criterion-by-criterion breakdown that identifies where your work is strong and where it's losing marks, with a predicted score range explained in detail. It's the closest thing to having an experienced IB examiner read your draft before you submit.</p>

      <h2>Frequently Asked Questions</h2>
      <h3>Can I predict my IB IA score before my teacher marks it?</h3>
      <p>Yes — by self-assessing against the official mark scheme descriptors, criterion by criterion. The challenge is objectivity: you know your work too well to read it the way a moderator would.</p>

      <h3>How much can moderation change my IA grade?</h3>
      <p>An adjustment of ±2–3 marks is common; adjustments of ±4–6 marks occur in some schools each session. Whether it changes your final grade depends on where you sit relative to the grade boundaries for that session.</p>

      <h3>Are IB IA grade boundaries the same every year?</h3>
      <p>No. Grade boundaries are set fresh each session based on the difficulty of the work submitted. Using boundaries from a previous year gives you an approximation only.</p>

      <h3>Which IB subjects have the most variable IA moderation?</h3>
      <p>History, Psychology, and Group 1 language and literature IAs tend to see wider variation. Sciences and Mathematics IAs are more stable because criteria are more explicitly defined.</p>
    </ResourceArticle>
  );
}
