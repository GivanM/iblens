import { ResourceArticle } from "@/components/ResourceArticle";
import { ExamplesBridge } from "@/components/ExamplesBridge";
import { Link } from "wouter";

export default function IBChemistryIAExamples() {
  return (
    <ResourceArticle
      title="IB Chemistry IA Examples: Topics, Methods and What Scores Well | IBLens"
      description="IB Chemistry IA investigation types that work, how to handle uncertainties and data processing, and what the Evaluation criterion actually asks for."
      canonical="/resources/ib-chemistry-ia-examples"
      datePublished="2026-06-09"
      dateModified="2026-09-13"
    >
      <p>
        The IB Chemistry Internal Assessment is a 10-hour scientific investigation
        worth 20% of your final grade. It is marked on the same four criteria as the
        Biology and Physics IAs: Research design, Data analysis, Conclusion and
        Evaluation, 6 marks each. Chemistry brings its own demands: quantitative data,
        uncertainties carried through the processing, and a method described in enough
        detail for someone else to repeat it. This guide covers what high-scoring IB
        Chemistry IA examples look like, which investigation types work best, and
        where marks are most commonly lost.
      </p>

      <h2>How the IB Chemistry IA is marked</h2>
      <ul>
        <li><strong>Research design (6 marks):</strong> A focused research question in a genuine context, a methodology with identified variables and controls, and consideration of safety, ethical and environmental issues.</li>
        <li><strong>Data analysis (6 marks):</strong> Recording, processing and presenting data in ways relevant to the question, including uncertainties and appropriate graphs.</li>
        <li><strong>Conclusion (6 marks):</strong> A conclusion justified by the analysis, answering the research question and compared with the accepted scientific context.</li>
        <li><strong>Evaluation (6 marks):</strong> Honest assessment of methodological weaknesses and limitations, with realistic improvements.</li>
      </ul>

      <h2>IB Chemistry IA topics that score well</h2>

      <h3>1. Effect of concentration on reaction rate (colorimetry)</h3>
      <p>
        Rate kinetics is a core HL and SL topic. A well-executed version uses a
        colorimeter to measure absorbance at regular intervals, processes the data
        to determine rate constants, and, at HL, determines the order of reaction
        with respect to the varying reactant. A real-world system gives the research
        question the context that Research design asks for: the bleaching of food dyes,
        the oxidation of ascorbic acid, or an iodine clock using household starch.
      </p>
      <p>
        <em>What separates top-band work:</em> processing the data to produce a rate
        law expression (rate = k[A]ⁿ), including uncertainty bars on graphs, and
        discussing whether the deviation from expected order is due to temperature
        fluctuation or the colorimeter's detection limit.
      </p>

      <h3>2. Titration-based investigations</h3>
      <p>
        Acid-base or redox titrations are reliable but need a non-textbook angle to
        give the question a real context, which Research design rewards. Strong examples include: determining the vitamin C
        content of different apple varieties across a ripening period; comparing
        acidity of commercial kombucha brands; measuring iron(II) content in iron
        supplement tablets before and after exposure to air. The method is standard;
        what makes the investigation distinctive is the context.
      </p>
      <p>
        For Data analysis, work out the uncertainty of each piece of equipment
        (burette, pipette) and carry it through to the final result. Reporting only
        "the percentage error was 3%" without showing where it comes from costs marks
        on that criterion.
      </p>

      <h3>3. Effect of temperature on equilibrium position (Le Chatelier's principle)</h3>
      <p>
        Investigating a coloured equilibrium that needs no carcinogenic or highly
        toxic reagents, such as the iron(III) thiocyanate equilibrium, allows a student
        to measure colour change quantitatively using a colorimeter and apply Le
        Chatelier's principle. Avoid cobalt(II) chloride, which is classified as a
        carcinogen: the IB's experimentation guidelines do not allow students to handle
        carcinogens, and ask for toxic substances such as nitrogen dioxide to be replaced
        where possible. A strong version compares experimental equilibrium constants
        at different temperatures with literature values for ΔH, and discusses
        why the observed shift matches (or doesn't match) the exothermic/endothermic
        prediction.
      </p>

      <h3>4. Electrochemistry: cell potential investigations</h3>
      <p>
        Measuring electrochemical cell potentials using different metal electrodes
        or concentrations allows for comparison with standard electrode potentials
        from the data booklet. Comparing the measured potentials with the standard
        values, and explaining the gap, gives both Data analysis and Evaluation plenty
        to work with. Electrode combinations with a practical context, such as the
        metals in a particular battery or the corrosion of a specific metal, give the
        question its context.
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

      <h2>Where Chemistry IAs lose marks most often</h2>

      <h3>Insufficient replicates</h3>
      <p>
        The guide does not set a number of trials, but it does count the repetition
        and precision of measurements among the methodological decisions Research design
        looks at. Three repeats give only a rough idea of the spread; five per condition
        make the uncertainty far easier to defend. Five conditions with five repeats each
        is 25 measurements, which fits in a 10-hour investigation if you plan for it.
      </p>

      <h3>Random errors treated as systematic errors (or vice versa)</h3>
      <p>
        A common Evaluation error is writing "there were errors in my measurements"
        without distinguishing between random error (scatter around the mean,
        reduced by averaging) and systematic error (consistent bias in one
        direction, not fixed by averaging). A colorimeter that was not zeroed
        correctly produces systematic error. Temperature fluctuations during
        titration produce random error. Each needs a different improvement, and an evaluation that names the right kind of error shows that you understand the difference.
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
        A developed evaluation gives the <em>direction and size</em> of each
        limitation's effect. "The water bath fluctuated by ±1.5°C. Because the rate
        constant depends exponentially on temperature, for an activation energy of
        about 60 kJ mol⁻¹ that is a variation of roughly 11 to 12% in k, which accounts
        for the scatter at higher temperatures" is developed evaluation. "The
        temperature was not perfectly controlled" is not.
      </p>

      <h2>Uncertainty calculations: what's actually required</h2>
      <p>
        Uncertainties are part of the Data analysis criterion. The basics:
      </p>
      <ul>
        <li>Record absolute uncertainty for every instrument (e.g., burette: ±0.05 cm³ per reading, so ±0.10 cm³ per titre).</li>
        <li>For addition/subtraction: add absolute uncertainties.</li>
        <li>For multiplication/division: add percentage uncertainties.</li>
        <li>Report final results with appropriate significant figures and absolute uncertainty.</li>
        <li>Compare your percentage uncertainty to your percentage error (difference between experimental and literature values). If your percentage error is larger than your calculated uncertainty, a systematic error is likely, and that is worth discussing in the Evaluation.</li>
      </ul>

            <ExamplesBridge
        workLabel="Chemistry IA"
        ctaHref="/essay/chemistry-ia"
        rows={[
          { criterion: "Research design", typical: "The method is lifted from a standard class practical and the variables are simply listed.", top: "The method is justified for this specific question: why this range, this many trials, these controls." },
          { criterion: "Data analysis", typical: "Raw data is tabulated and a mean is plotted; uncertainties appear once and are then forgotten.", top: "Uncertainties are propagated through the processing, and the processing chosen is the one that actually tests the hypothesis." },
          { criterion: "Conclusion", typical: "\"The hypothesis was supported\", with no reference to how strongly.", top: "The conclusion is stated with its uncertainty and compared against accepted values or published work." },
          { criterion: "Evaluation", typical: "Generic weaknesses: human error, not enough time, more trials next time.", top: "The relative impact of specific methodological weaknesses explained, with realistic improvements that address them explained." },
        ]}
      />

      <h2>How to get criterion-level feedback on your Chemistry IA</h2>
      <p>
        The marks between a good Chemistry IA and a top-band one are usually a few
        specific gaps, often in the Evaluation or the handling of uncertainties. A
        general read-through rarely finds them; checking each part against the
        criterion descriptors does.
      </p>
      <p>
        IBLens reads your Chemistry IA against the four criteria and shows which one is
        losing you the most marks, while you can still revise the report.
      </p>
      <p>
        <Link href="/essay/chemistry-ia">Paste your Chemistry IA draft into IBLens for criterion-by-criterion feedback →</Link>
      </p>
      <h2>Internal Assessment in other subjects</h2>

      <ul>
        <li><Link href="/resources/ib-biology-ia-examples">Biology IA Examples</Link></li>
        <li><Link href="/resources/ib-physics-ia-examples">Physics IA Examples</Link></li>
        <li><Link href="/resources/ib-math-ia-examples">Math IA Examples</Link></li>
        <li><Link href="/resources/ib-ia-feedback">Check your IA against the criteria</Link></li>
      </ul>

    </ResourceArticle>
  );
}
