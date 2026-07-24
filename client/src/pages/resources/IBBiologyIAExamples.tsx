import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function IBBiologyIAExamples() {
  return (
    <ResourceArticle
      title="IB Biology IA Examples — Topics, Data, and How to Score a 7 | IBLens"
      description="High-scoring IB Biology IA examples with analysis of what makes them work. Learn which topics get 7s and which common mistakes cost marks on every criterion."
      canonical="/resources/ib-biology-ia-examples"
      datePublished="2026-06-09"
      dateModified="2026-06-09"
    >
      <p>
        The IB Biology Internal Assessment is a scientific investigation worth 20% of
        your final grade. Unlike a lab practical in class, the IA asks you to design,
        conduct, and evaluate your own experiment — and the marks go to students who
        demonstrate genuine scientific thinking, not just correct data collection.
        This guide covers what high-scoring IB Biology IA examples look like, which
        topics reliably earn strong marks, and the specific mistakes that drag
        competent students from a 6 to a 4.
      </p>

      <h2>How the IB Biology IA Is Marked</h2>
      <p>
        The IA is marked out of 24 across five criteria:
      </p>
      <ul>
        <li><strong>Research design (6 marks):</strong> A focused research question in a genuine context, with an appropriate and safe methodology — the criterion where most marks are won or lost.</li>
        <li><strong>Exploration (6 marks):</strong> Clear research question, appropriate methodology, identified variables (independent, dependent, controlled), and sufficient background theory.</li>
        <li><strong>Analysis (6 marks):</strong> Correctly processed data, appropriate statistical tests, graphs with error bars, and a conclusion drawn from the data.</li>
        <li><strong>Evaluation (6 marks):</strong> Honest assessment of the methodology: what are the weaknesses? What systematic errors exist? How could the investigation be improved?</li>
        <li><strong>Communication (4 marks):</strong> Structure, clarity, appropriate use of scientific terminology, and correct citation format.</li>
      </ul>
      <p>
        A score of 20/24 or above typically corresponds to a 7. The most common reason
        for dropping from a 7 to a 6 is weak Evaluation — students describe what
        happened without critically analysing why the method may have introduced error.
      </p>

      <h2>IB Biology IA Examples That Score Well</h2>

      <h3>1. Effect of substrate concentration on enzyme activity</h3>
      <p>
        Enzyme kinetics is a syllabus topic and a reliable IA subject when done well.
        A high-scoring version does not simply measure how fast hydrogen peroxide
        decomposes in the presence of catalase at five concentrations. It also:
        estimates the Michaelis constant (Km) by plotting 1/velocity against
        1/concentration (Lineweaver-Burk), discusses why the curve deviates from
        the Michaelis-Menten model at very high substrate concentrations, and
        reflects on whether enzyme concentration was truly controlled across trials.
        A convincing personal context typically comes from choosing an enzyme or
        substrate with a personal connection — a student who works in a kitchen
        and investigates pineapple juice (bromelain) inhibiting gelatin setting
        makes the research question feel genuinely yours, which strengthens Research design.
      </p>

      <h3>2. Osmosis in plant tissue across a concentration gradient</h3>
      <p>
        Osmosis is another core syllabus topic. The mark differentiator at the top
        end is statistical analysis. A student who simply calculates percentage mass
        change and draws a graph will score Analysis = 4. A student who runs a
        minimum of five replicates at each concentration, calculates standard
        deviation, adds error bars to the graph, and uses a t-test or ANOVA to
        determine whether differences between groups are statistically significant
        will score Analysis = 6. Using two different plant tissues (e.g., potato
        and beetroot) and comparing the solute potential of each adds originality
        for Personal Engagement.
      </p>

      <h3>3. Effect of light intensity on the rate of photosynthesis</h3>
      <p>
        A classic topic that is frequently done poorly. The difference between a
        5 and a 7 on this IA comes down to three things:
      </p>
      <ul>
        <li>Controlling temperature precisely — failure to do so is the most common Evaluation point that students miss or understate.</li>
        <li>Using a colorimetric or dissolved oxygen method rather than just counting bubbles, which is qualitative and unreliable.</li>
        <li>Investigating a non-obvious variable — instead of light intensity (which every student uses), investigating the effect of light wavelength using coloured filters introduces more sophisticated Analysis and a stronger Exploration structure.</li>
      </ul>

      <h3>4. Microbial growth and antibiotic inhibition zones</h3>
      <p>
        Disc diffusion assays (Kirby-Bauer method) are appropriate for IA when the
        school has a suitable microbiology facility. A student who investigates
        whether natural antimicrobial compounds (garlic extract, tea tree oil,
        honey) produce inhibition zones comparable to a standard antibiotic
        earns strong Personal Engagement marks. The Analysis requires measuring
        inhibition zone diameters accurately, calculating means and standard
        deviations, and using a statistical test. The Evaluation should discuss
        why disc diffusion underestimates minimum inhibitory concentration and
        what a broth dilution assay would add.
      </p>

      <h3>5. Effect of temperature on membrane permeability in beetroot</h3>
      <p>
        Measuring absorbance of leaked anthocyanin pigment from beetroot cells
        across a temperature range is a clean, quantitative method that produces
        reliable data. The mark differentiator is using a colorimeter to measure
        absorbance at 550nm rather than estimating colour visually, and including
        enough replicates for error bars to be meaningful. A strong Evaluation
        discusses whether the protein denaturation responsible for membrane
        disruption is reversible, and compares the observed temperature threshold
        to published Tm values for phospholipid bilayers.
      </p>

      <h2>Topics to Avoid (or Handle Carefully)</h2>

      <h3>Survey-based IAs on human behaviour</h3>
      <p>
        "Does sleep affect memory performance?" or "Does music improve concentration?"
        are popular topics that almost never score well. The problem is experimental
        control: you cannot isolate the independent variable in a human population
        without randomisation, blinding, and washout periods that are not feasible
        in a school setting. Examiners mark down Exploration for poor methodology
        and Evaluation for failing to identify the resulting confounds. If you want
        to study human biology, choose a variable you can measure physiologically
        (heart rate, reaction time with a standard protocol) rather than survey-based
        self-reporting.
      </p>

      <h3>Germination rate experiments</h3>
      <p>
        Germination is fine as a topic but the timeline is a problem — seed germination
        can take days or weeks, leaving little time for replication and data collection.
        If you choose germination, use a fast-germinating species (radish, cress,
        mung beans) and design the protocol so you can complete at least 30 seeds per
        condition within your available lab time.
      </p>

      <h2>The Most Important Thing About IB Biology IA Evaluation</h2>
      <p>
        Criterion D (Evaluation) is where the most marks are lost among students who
        scored 5 or 6. The common failure is writing: "My experiment had some errors.
        I could improve it by being more careful." This is not evaluation — it is
        apology.
      </p>
      <p>
        Strong Evaluation identifies <em>specific</em> methodological weaknesses,
        explains the <em>direction</em> of the error they introduced (does this make
        your result an overestimate or underestimate?), and proposes a concrete
        improvement with a reason why it would reduce that specific error.
      </p>
      <p>
        Example of weak evaluation: "Temperature was not perfectly controlled,
        which may have affected results."
      </p>
      <p>
        Example of strong evaluation: "Water bath temperature fluctuated by ±2°C
        during the 10-minute reaction period. Since enzyme activity increases
        with temperature in the range used, this likely caused an overestimate
        of reaction rate at the lower concentration points, flattening the
        observed Km. A thermostatically controlled water bath or a temperature
        logger would allow me to quantify this variation and correct for it."
      </p>

      <h2>Getting Criterion-Level Feedback Before Submission</h2>
      <p>
        When you read IB Biology IA examples online, it is tempting to compare
        your work broadly — "mine looks similar in length and has graphs, so
        it should be fine." The problem is that marks are lost in specific places:
        a missing error bar here, an unacknowledged confounding variable there,
        a conclusion that does not reference the data. These are not things you
        can see by general comparison.
      </p>
      <p>
        IBLens analyses your IA draft against the official IB rubric criteria and
        shows you exactly where marks are being lost before your teacher submits
        your moderated grade.
      </p>
      <p>
        <Link to="/essay">Upload your Biology IA draft to IBLens for rubric-based feedback →</Link>
      </p>
    </ResourceArticle>
  );
}
