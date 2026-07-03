import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function IBChemistryIAExamples() {
  return (
    <ResourceArticle
      title="IB Chemistry IA Examples — Topics, Methods, and How to Score a 7 | IBLens"
      description="High-scoring IB Chemistry IA examples with examiner analysis. Learn which investigation types earn top marks, how to handle data processing, and what Evaluation actually means."
      canonical="/resources/ib-chemistry-ia-examples"
      datePublished="2026-06-09"
      dateModified="2026-06-09"
    >
      <p>
        The IB Chemistry Internal Assessment is a 10-hour scientific investigation
        worth 20% of your final grade. It is marked on the same five criteria as
        other Group 4 IAs — Personal Engagement, Exploration, Analysis, Evaluation,
        and Communication — but Chemistry brings specific challenges: quantitative
        data is expected, error calculations are required, and examiners have a low
        tolerance for vague methodology. This guide covers what high-scoring IB
        Chemistry IA examples look like, which investigation types work best, and
        where marks are most commonly lost.
      </p>

      <h2>How the IB Chemistry IA Is Marked</h2>
      <ul>
        <li><strong>Personal Engagement (2 marks):</strong> Evidence that the student shaped the investigation. A genuine question from their own experience, a non-standard variable, or an original data source earns this.</li>
        <li><strong>Exploration (6 marks):</strong> Clear research question, relevant background theory, correct identification of variables (independent, dependent, controlled), and a reproducible methodology.</li>
        <li><strong>Analysis (6 marks):</strong> Quantitative data processing (means, uncertainties, graphs), correct use of units, and a conclusion supported by the data. Error propagation is expected at HL.</li>
        <li><strong>Evaluation (6 marks):</strong> Specific assessment of methodological limitations, systematic and random errors, and concrete improvements. The most under-scored criterion.</li>
        <li><strong>Communication (4 marks):</strong> Clear structure, appropriate scientific notation, correct citations, and appropriate length (6–12 pages).</li>
      </ul>

      <h2>IB Chemistry IA Topics That Score Well</h2>

      <h3>1. Effect of concentration on reaction rate (colorimetry)</h3>
      <p>
        Rate kinetics is a core HL and SL topic. A well-executed version uses a
        colorimeter to measure absorbance at regular intervals, processes the data
        to determine rate constants, and — at HL — determines the order of reaction
        with respect to the varying reactant. The personal engagement mark comes from
        choosing a reaction with a real-world context: the bleaching of food dyes,
        the oxidation of ascorbic acid, or the iodine clock with household starch.
      </p>
      <p>
        <em>What separates a 7 from a 5:</em> Processing the data to produce a rate
        law expression (rate = k[A]ⁿ), including uncertainty bars on graphs, and
        discussing whether the deviation from expected order is due to temperature
        fluctuation or the colorimeter's detection limit.
      </p>

      <h3>2. Titration-based investigations</h3>
      <p>
        Acid-base or redox titrations are reliable but need a non-textbook angle to
        score Personal Engagement. Strong examples include: determining the vitamin C
        content of different apple varieties across a ripening period; comparing
        acidity of commercial kombucha brands; measuring iron(II) content in iron
        supplement tablets before and after air exposure. The methodology is
        standard — the originality comes from the context.
      </p>
      <p>
        For Analysis, calculating the percentage uncertainty of each piece of
        equipment (burette, pipette) and propagating those through to the final
        result is expected. Students who report only "the percentage error was 3%"
        without showing the calculation source lose Analysis marks.
      </p>

      <h3>3. Effect of temperature on equilibrium position (Le Chatelier's principle)</h3>
      <p>
        Investigating the equilibrium between NO₂ and N₂O₄, or the cobalt(II)
        chloride equilibrium in different solvents, allows a student to measure
        colour change quantitatively using a colorimeter and apply Le Chatelier's
        principle. A strong version compares experimental equilibrium constants
        at different temperatures with literature values for ΔH, and discusses
        why the observed shift matches (or doesn't match) the exothermic/endothermic
        prediction.
      </p>

      <h3>4. Electrochemistry — cell potential investigations</h3>
      <p>
        Measuring electrochemical cell potentials using different metal electrodes
        or concentrations allows for comparison with standard electrode potentials
        from data tables. Using the Nernst equation at HL to predict how cell
        potential should vary with concentration, then comparing this to measured
        values, produces rich data for both Analysis and Evaluation. Personal
        engagement comes from choosing electrode combinations with a practical
        context (batteries in consumer electronics, corrosion of specific metals).
      </p>

      <h3>5. Chromatography and separation science</h3>
      <p>
        Paper chromatography or TLC to identify components of natural dyes, food
        colouring, or plant pigments is accessible and visually clear. The
        quantitative measure is the Rf value; a strong IA compares calculated
        Rf values to literature values across different solvent systems, discusses
        polarity effects on separation, and proposes which solvent system would
        be optimal for a specific application.
      </p>

      <h2>The Most Common Reasons Chemistry IAs Score Below a 6</h2>

      <h3>Insufficient replicates</h3>
      <p>
        Chemistry examiners expect a minimum of five trials per condition to
        calculate a meaningful standard deviation. Three replicates produce a
        standard deviation that is statistically unreliable. If you have five
        conditions (five concentrations, five temperatures) × five replicates,
        that is 25 data points — achievable in a 10-hour IA. Students who run
        three replicates because they ran out of time are losing Analysis marks
        that are very easy to earn.
      </p>

      <h3>Random errors treated as systematic errors (or vice versa)</h3>
      <p>
        A common Evaluation error is writing "there were errors in my measurements"
        without distinguishing between random error (scatter around the mean,
        reduced by averaging) and systematic error (consistent bias in one
        direction, not fixed by averaging). A colorimeter that was not zeroed
        correctly produces systematic error. Temperature fluctuations during
        titration produce random error. Each requires a different improvement —
        and examiners can tell whether the student understands the distinction.
      </p>

      <h3>Conclusions that don't reference the data</h3>
      <p>
        "The results supported the hypothesis" is not a conclusion. "The reaction
        rate constant k increased from 0.023 s⁻¹ at 25°C to 0.091 s⁻¹ at 45°C,
        consistent with the Arrhenius equation prediction and within the range
        reported by [source]" is a conclusion. Every number in your conclusion
        should be traceable to a row in your data table.
      </p>

      <h3>Evaluation that lists errors without quantifying their effect</h3>
      <p>
        Examiners want to know the <em>direction and magnitude</em> of each
        limitation's effect. "The water bath fluctuated by ±1.5°C. Since the
        rate constant is exponentially sensitive to temperature (from the Arrhenius
        equation), this represents approximately a 12% variation in rate constant
        at the temperatures used, which explains the scatter visible in the graph
        at higher temperatures" — that is developed evaluation. "The temperature
        was not perfectly controlled" is not.
      </p>

      <h2>Uncertainty Calculations: What's Actually Required</h2>
      <p>
        IB Chemistry explicitly requires uncertainty propagation. The basics:
      </p>
      <ul>
        <li>Record absolute uncertainty for every instrument (e.g., burette: ±0.05 cm³ per reading, so ±0.10 cm³ per titre).</li>
        <li>For addition/subtraction: add absolute uncertainties.</li>
        <li>For multiplication/division: add percentage uncertainties.</li>
        <li>Report final results with appropriate significant figures and absolute uncertainty.</li>
        <li>Compare your percentage uncertainty to your percentage error (difference between experimental and literature values). If your percentage error exceeds your calculated uncertainty, there is a systematic error — this is worth discussing in Evaluation.</li>
      </ul>

      <h2>How to Get Criterion-Level Feedback on Your Chemistry IA</h2>
      <p>
        The difference between a Chemistry IA that scores 18/24 and one that scores
        22/24 is usually two specific marks on Evaluation and one on Analysis. These
        are not visible from a general read-through — they require mapping each
        paragraph against the criterion descriptors to identify exactly what is
        missing.
      </p>
      <p>
        IBLens analyses your IB IA or essay against the official marking criteria
        and shows you precisely where marks are being lost — before your teacher
        submits your moderated grade.
      </p>
      <p>
        <Link to="/essay">Upload your Chemistry IA draft to IBLens for rubric-based feedback →</Link>
      </p>
    </ResourceArticle>
  );
}
