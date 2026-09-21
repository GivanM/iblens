import { ResourceArticle } from "@/components/ResourceArticle";
import { ExamplesBridge } from "@/components/ExamplesBridge";
import { AnnotatedExcerpt } from "@/components/AnnotatedExcerpt";
import { Link } from "wouter";

export default function IBChemistryIAExamples() {
  return (
    <ResourceArticle
      title="IB Chemistry IA Examples: Annotated Excerpts and Topic Ideas | IBLens"
      description="A made-up Chemistry IA followed from research question to evaluation, each passage written weaker and stronger and annotated against the criteria, plus topic ideas."
      canonical="/resources/ib-chemistry-ia-examples"
      datePublished="2026-06-09"
      dateModified="2026-09-21"
    >
      <p>
        The IB Chemistry Internal Assessment is a 10-hour scientific investigation
        worth 20% of your final grade. It is marked on the same four criteria as the
        Biology and Physics IAs: Research design, Data analysis, Conclusion and
        Evaluation, 6 marks each. In Chemistry these criteria come down to quantitative data,
        uncertainties carried through the processing, and a method described in enough
        detail for someone else to repeat it. This guide follows one example investigation
        through the report, passage by passage, then covers which investigation types work
        best and where marks are most commonly lost.
      </p>

      <h2>How the IB Chemistry IA is marked</h2>
      <ul>
        <li><strong>Research design (6 marks):</strong> A research question described within a specific and appropriate context, the methodological considerations explained (how the variables are measured, how the sample or data were chosen, the range and repetition of measurements, the control variables, and safety, ethical and environmental issues), and a method described well enough to be reproduced.</li>
        <li><strong>Data analysis (6 marks):</strong> Recording and processing data clearly and precisely (following conventions for tables, graphs, units and significant figures), with processing that is relevant to the question and carried out appropriately and accurately, and an appropriate consideration of uncertainties.</li>
        <li><strong>Conclusion (6 marks):</strong> A conclusion justified by the analysis, answering the research question and compared with the accepted scientific context.</li>
        <li><strong>Evaluation (6 marks):</strong> The relative impact of specific methodological weaknesses or limitations explained, with realistic improvements relevant to them explained.</li>
      </ul>

      <h2>An annotated IB Chemistry IA example</h2>
      <p>
        Complete IAs with their marks and the moderator's reasoning are rarely public (the
        reasons are further down this page). Instead, here is one investigation followed through
        the report, with each key passage written twice: the way drafts often read, and the way
        the upper levels of the criteria describe it. We made up the investigation, the data and
        both versions to show the difference. The numbers are realistic but were not measured.
        They do not come from a student's IA, and no mark is claimed for either version.
      </p>
      <p>
        The investigation: whether two white vinegars labelled 5% acidity are as acidic as their
        labels say, measured by acid-base titration. Titrating vinegar is a standard class
        practical; what turns it into an investigation is the question: whether the label claim
        holds, given that safe pickling depends on that strength.
      </p>

      <AnnotatedExcerpt
        heading="Research question (Research design)"
        weaker={<p>How much acid is in vinegar?</p>}
        stronger={<p>Home pickling guides tell cooks to use vinegar of 5% acidity, meaning acidity equivalent to 5 g of ethanoic acid per 100 cm³, because a weaker vinegar may not make the food acidic enough to keep safely. Do the acidities of two white vinegars labelled 5% acidity, a branded one and a budget own-brand, match their labels, when measured by titration with sodium hydroxide of about 0.1 mol dm⁻³, standardised against potassium hydrogen phthalate, and expressed as ethanoic acid?</p>}
        why="The weaker question does not say which vinegar, which acid, in what units or how it will be measured, and gives no reason for asking. The stronger one gives the question a specific context (safe pickling), identifies the samples and the method, and states the value the result will be tested against, which is what the top band of Research design means by a research question described within a specific and appropriate context."
      />

      <AnnotatedExcerpt
        heading="Method (Research design)"
        weaker={<p>I titrated each vinegar with sodium hydroxide using phenolphthalein until it turned pink. I repeated it three times.</p>}
        stronger={<p>One bottle of each vinegar was bought from the same shop and opened on the day of the titrations; testing more bottles was not possible in the time available, a limit discussed in the Evaluation. Each vinegar was diluted tenfold: 25.00 cm³ was pipetted into a 250.00 cm³ volumetric flask, made up to the mark with deionised water and inverted to mix, so that a titre would be about 20 cm³, large enough to keep the burette's uncertainty to about 0.5%. The sodium hydroxide was standardised on the day it was used, by titrating it against a solution made from one weighed portion of potassium hydrogen phthalate, because sodium hydroxide solution absorbs carbon dioxide from the air and its concentration falls over time. Portions of 25.00 cm³ of each diluted vinegar, with three drops of 0.5% phenolphthalein indicator (below the 1% at which it is classed as a carcinogen), were titrated to the first pale pink that lasted 30 seconds, until three titres agreed within 0.10 cm³. Eye protection was worn: 0.1 mol dm⁻³ sodium hydroxide is below the concentration classed as an irritant, but alkali can still harm the eyes. Leftover sodium hydroxide was neutralised before being poured away.</p>}
        why="The weaker method leaves out everything that decides the result: the dilution, how the sodium hydroxide concentration is known, and when to stop repeating. The stronger one explains each of those choices, including why only one bottle of each was tested, covers safety and disposal, and gives enough detail to be repeated, as the top band of Research design asks."
      />

      <AnnotatedExcerpt
        heading="Data and processing (Data analysis)"
        weaker={<p>Vinegar A: 20.9 cm³. Vinegar B: 19.6 cm³. So vinegar B has less acid. The percentage error is 6%.</p>}
        stronger={
          <>
            <table>
              <thead><tr><th>Vinegar</th><th>Concordant titres / cm³ (±0.10)</th><th>Mean titre / cm³ (±0.10)</th><th>Acidity as ethanoic acid / g per 100 cm³</th></tr></thead>
              <tbody>
                <tr><td>A (branded)</td><td>20.85, 20.95, 20.90</td><td>20.90</td><td>5.02 ± 0.06</td></tr>
                <tr><td>B (budget)</td><td>19.55, 19.60, 19.65</td><td>19.60</td><td>4.71 ± 0.06</td></tr>
              </tbody>
            </table>
            <p>CH₃COOH(aq) + NaOH(aq) → CH₃COONa(aq) + H₂O(l). For vinegar A, the sodium hydroxide used is 0.1000 mol dm⁻³ × 20.90 × 10⁻³ dm³ = 2.090 × 10⁻³ mol, which is the ethanoic acid in 25.00 cm³ of diluted vinegar because they react 1:1. That is 0.08360 mol dm⁻³ in the diluted vinegar, 0.8360 mol dm⁻³ in the original (dilution factor 10), and 0.8360 × 60.06 g mol⁻¹ = 50.2 g dm⁻³, or 5.02 g per 100 cm³.</p>
            <p>Every step multiplies or divides, so the percentage uncertainties add: burette 0.48% (±0.10 cm³ on 20.90 cm³), sodium hydroxide concentration 0.50% (±0.0005 mol dm⁻³, carried over from the standardisation), two pipettings 0.24% (±0.03 cm³ on 25.00 cm³ each) and the flask 0.06% (±0.15 cm³ on 250.00 cm³): 1.28% in all, or ±0.06 g per 100 cm³. For vinegar B the smaller titre makes the burette term 0.51% and the total 1.31%, still ±0.06 g per 100 cm³.</p>
          </>
        }
        why="The weaker version reports raw titres and a percentage error with no source. The stronger version turns the titres into the quantity the question asks about, shows one calculation so it can be checked, and builds the uncertainty from the equipment step by step. That is what the top band of Data analysis describes: recording and processing communicated clearly and precisely, relevant to the research question, with an appropriate consideration of uncertainties."
      />

      <AnnotatedExcerpt
        heading="Conclusion"
        weaker={<p>Vinegar B had less acid than vinegar A, so it is a lower quality vinegar.</p>}
        stronger={<p>The branded vinegar's acidity is 5.02 ± 0.06 g per 100 cm³ expressed as ethanoic acid, consistent with its 5% label. The budget vinegar's is 4.71 ± 0.06 g per 100 cm³: even the top of its uncertainty range, 4.77 g per 100 cm³, is below the label, and the measured value is 0.29 g per 100 cm³ (5.8%) short of it. The branded result also argues against a fault common to both titrations, such as a wrong sodium hydroxide concentration: an error large enough to explain B's shortfall would mean A really holds about 5.33 g per 100 cm³, 6.6% above its label, and that is less likely than the method being sound. If 5% is read as the minimum that pickling guides mean, rather than as a rounded figure (4.71 would round to 5%), the budget vinegar falls short of it, although one bottle cannot show whether that is typical of the brand.</p>}
        why="The weaker conclusion jumps to quality, which the investigation did not measure. The stronger one answers the question for each vinegar, uses the uncertainty to decide whether the gap from the label is real, says how it reads the label, compares the result with the value that gives it meaning, and states the limit of the claim."
      />

      <AnnotatedExcerpt
        heading="Evaluation"
        weaker={<p>It was hard to see the exact end point, and there could have been mistakes reading the burette. Next time I would do more titrations.</p>}
        stronger={
          <>
            <p>Random error in the titrations was small: three titres agreed within 0.10 cm³ for each vinegar. The weaknesses that matter lie elsewhere, and they differ in how much they could change the conclusion.</p>
            <ol>
              <li>Only one bottle of each vinegar was tested, so a 5.8% shortfall could belong to one batch rather than the brand. This limits the conclusion more than anything in the titration. Testing bottles with different batch codes would show which.</li>
              <li>Each vinegar was diluted only once, so the concordant titres test the titration but not the dilution, and the comparison with A catches only errors shared by both vinegars. A slip in B's dilution would have to be large, about 1.5 cm³ on the 25.00 cm³ pipette, to explain the shortfall, but a second, independent dilution of each vinegar would rule it out.</li>
              <li>The uncertainty in the sodium hydroxide concentration (0.50%) is about as large as the burette term and, unlike it, systematic: it shifts both results in the same direction and by the same proportion, so it cannot explain why B is lower than A. At about 0.03 g per 100 cm³ it is too small to change either conclusion. Standardising against three separately weighed portions of potassium hydrogen phthalate, rather than one, would check the value and show its real spread.</li>
              <li>Any other acid present is titrated too and counted as ethanoic acid. Vinegar labels state acidity the same way, as total acid expressed as ethanoic acid, which is why the results are reported like that and why the comparison with the label is fair. White vinegar also contains little acid other than ethanoic acid. It would matter for a question about ethanoic acid itself, for example in a cider vinegar, which also contains malic acid, and that question would need a method that measures ethanoic acid on its own.</li>
            </ol>
          </>
        }
        why="The weaker evaluation names problems every titration has and suggests more of the same. The stronger one separates random from systematic error, ranks the weaknesses by how much they could change the conclusion, and says what would address each one, including when a limitation turns out not to affect the comparison. That is what the top band of Evaluation describes: the relative impact of specific methodological weaknesses, with improvements relevant to them."
      />

      <p>
        Each passage is shown under one criterion, but every criterion is judged across the whole
        report, and most drafts sit somewhere between the two versions. The useful question is
        which passages in yours still read like the weaker one: the <Link href="/essay/chemistry-ia">Chemistry IA grader</Link> marks
        your own draft criterion by criterion and points to them.
      </p>

      <h2>IB Chemistry IA topics that tend to work</h2>

      <h3>1. Effect of concentration on reaction rate (colorimetry)</h3>
      <p>
        Rates of reaction are part of the SL and HL course; rate equations, orders and rate
        constants are additional HL content. A well-executed version uses a colorimeter to
        measure absorbance at regular intervals, processes the data to find the rate, and can
        go on to deduce the order and the rate constant. A system with a real-world link gives
        the research question the context that Research design asks for, such as the
        bleaching of a food dye by household bleach. The reaction of iodine with propanone
        also suits a colorimeter, but it is a textbook reaction, so its context has to come
        from elsewhere.
      </p>
      <p>
        <em>What separates top-band work:</em> processing the absorbance data into an
        order and a rate constant (rate = k[A]ⁿ, HL content that SL students may also use),
        showing error bars on graphs, and discussing whether a non-integer order, or a
        difference from a literature order, comes from temperature drift or from absorbances
        outside the range where the colorimeter's reading is proportional to concentration.
      </p>

      <h3>2. Titration-based investigations</h3>
      <p>
        Acid-base or redox titrations are reliable but need a non-textbook angle to
        give the question a real context, which Research design rewards. Strong examples include: determining the vitamin C
        content of orange or pepper juice as it is stored or heated; comparing
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

      <h3>3. Effect of temperature on equilibrium position (Le Châtelier's principle)</h3>
      <p>
        Investigating a coloured equilibrium that needs no carcinogenic or highly
        toxic reagents, such as the iron(III) thiocyanate equilibrium, allows a student
        to measure colour change quantitatively using a colorimeter and apply Le
        Châtelier's principle. Avoid cobalt(II) chloride, which is classified as a
        carcinogen: the IB's experimentation guidelines do not allow students to handle
        carcinogens, and ask for toxic substances to be replaced by less harmful ones when
        possible, so a toxic-gas system such as the nitrogen dioxide equilibrium is best avoided too. A strong version measures the equilibrium constant
        at several temperatures, uses the trend to estimate ΔH (a plot of ln K against 1/T),
        compares that with a literature value, and discusses
        why the observed shift matches (or doesn't match) the exothermic/endothermic
        prediction.
      </p>

      <h3>4. Electrochemistry: cell potential investigations</h3>
      <p>
        Measuring the potentials of cells built from different pairs of metal electrodes
        in 1.0 mol dm⁻³ solutions allows comparison with standard electrode potentials
        from the data booklet; varying the concentration instead needs the Nernst equation,
        which goes beyond the course. Comparing the measured potentials with the standard
        values, and explaining the gap, gives both Data analysis and Evaluation plenty
        to work with. Electrode combinations with a practical context, such as the
        zinc in a zinc-carbon or alkaline battery, or the corrosion of a specific metal,
        give the question its context; avoid nickel and cadmium salts, which are classed as
        carcinogens and fall under the same IB rule as cobalt(II) chloride.
      </p>

      <h3>5. Chromatography and separation science</h3>
      <p>
        Paper chromatography or TLC to identify components of natural dyes, food
        colouring, or plant pigments is accessible and visually clear. The
        quantitative measure is the R<sub>f</sub> value; a strong IA runs reference samples
        on the same paper or plate rather than relying on literature R<sub>f</sub> values,
        which depend on the conditions, compares R<sub>f</sub> values across different
        solvent systems, discusses
        polarity effects on separation, and proposes which solvent system would
        be optimal for a specific application.
      </p>

      <h2>Where Chemistry IAs lose marks most often</h2>

      <h3>Insufficient replicates</h3>
      <p>
        The guide does not set a number of trials, but it does count the repetition
        and precision of measurements among the methodological decisions Research design
        looks at. In a titration, repeating until three titres agree within 0.10 cm³, as in
        the vinegar example, is the accepted standard. For measurements that scatter more,
        such as rates or colorimeter readings, three repeats give only a rough idea of the
        spread; five per condition make the uncertainty far easier to defend. Five conditions
        with five repeats each is 25 measurements, which fits in a 10-hour investigation if
        you plan for it.
      </p>

      <h3>Random errors treated as systematic errors (or vice versa)</h3>
      <p>
        A common Evaluation error is writing "there were errors in my measurements"
        without distinguishing between random error (scatter around the mean,
        reduced by averaging) and systematic error (consistent bias in one
        direction, not fixed by averaging). A colorimeter that was not zeroed
        correctly produces systematic error. Judging the end-point colour by eye adds
        random error, and a habit of stopping at a darker pink adds a systematic one. Each needs a different improvement, and an evaluation that names the right kind of error shows that you understand the difference.
      </p>

      <h3>Conclusions that don't reference the data</h3>
      <p>
        "The results supported the hypothesis" is not a conclusion. "The reaction
        rate constant k increased from 0.023 s⁻¹ at 25 °C to 0.091 s⁻¹ at 45 °C,
        which gives an activation energy of 54 kJ mol⁻¹, within 10% of the value reported
        in the study cited in the introduction" is a conclusion. Every number in your
        conclusion should be traceable to your data table or to a calculation shown in your
        processing.
      </p>

      <h3>Evaluation that lists errors without quantifying their effect</h3>
      <p>
        A developed evaluation gives the <em>direction and size</em> of each
        limitation's effect. "The water bath fluctuated by ±1.5 °C. Because the rate
        constant depends exponentially on temperature, for an activation energy of
        about 60 kJ mol⁻¹ that is a variation of roughly 11 to 13% in k, which is enough
        to account for the scatter in k" is developed evaluation. "The
        temperature was not perfectly controlled" is not.
      </p>

      <h2>Uncertainty calculations: what is required</h2>
      <p>
        Uncertainties are part of the Data analysis criterion. The basics:
      </p>
      <ul>
        <li>Record absolute uncertainty for every instrument (e.g., burette: ±0.05 cm³ per reading, so ±0.10 cm³ per titre).</li>
        <li>For addition/subtraction: add absolute uncertainties.</li>
        <li>For multiplication/division: add percentage uncertainties.</li>
        <li>Report final results with appropriate significant figures and absolute uncertainty.</li>
        <li>Compare your percentage uncertainty to your percentage error (difference between experimental and literature values). If the error is larger than the uncertainty, either there is a systematic error worth discussing in the Evaluation or, when the reference value is itself what you are testing (a label claim, for example), the difference may be real. The vinegar example above shows one way to weigh the two.</li>
      </ul>

            <ExamplesBridge
        workLabel="Chemistry IA"
        ctaHref="/essay/chemistry-ia"
        rows={[
          { criterion: "Research design", typical: "A standard class practical is used as it stands, with no reason given for its choices, and the variables are simply listed.", top: "The method is justified for this specific question: why this range, this many trials, these controls." },
          { criterion: "Data analysis", typical: "Raw data are tabulated and a mean is plotted; uncertainties appear once and are then forgotten.", top: "Uncertainties are carried through the processing, and the processing chosen is the one that answers the research question." },
          { criterion: "Conclusion", typical: "\"The hypothesis was supported\", with no reference to how strongly.", top: "The conclusion is stated with its uncertainty and compared against accepted values or published work." },
          { criterion: "Evaluation", typical: "Generic weaknesses: human error, not enough time, more trials next time.", top: "The relative impact of specific methodological weaknesses is explained, and so are realistic improvements that address them." },
        ]}
      />

      <h2>Internal Assessment in other subjects</h2>

      <ul>
        <li><Link href="/resources/ib-biology-ia-examples">Biology IA examples</Link></li>
        <li><Link href="/resources/ib-physics-ia-examples">Physics IA examples</Link></li>
        <li><Link href="/resources/ib-math-ia-examples">Math IA examples</Link></li>
        <li><Link href="/resources/ib-ia-feedback">Check your IA against the criteria</Link></li>
      </ul>

    </ResourceArticle>
  );
}
