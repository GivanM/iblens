import { ResourceArticle } from "@/components/ResourceArticle";
import { ExamplesBridge } from "@/components/ExamplesBridge";
import { Link } from "wouter";

export default function IBPhysicsIAExamples() {
  return (
    <ResourceArticle
      title="IB Physics IA Examples: Investigation Ideas and What Scores Well | IBLens"
      description="IB Physics IA investigation ideas, how to handle uncertainties, and what the Evaluation criterion needs, with the mistakes that cost marks most often."
      canonical="/resources/ib-physics-ia-examples"
      datePublished="2026-06-09"
      dateModified="2026-09-13"
    >
      <p>
        The IB Physics Internal Assessment is the scientific investigation, worth 20%
        of your final grade and marked on four criteria of 6 marks each. It can use
        laboratory work, fieldwork, a spreadsheet model, a database or a simulation. Physics IAs are
        unforgiving on data quality: the criteria look for quantitative analysis,
        uncertainties carried through the processing, and graphs that actually test the
        relationship. A clever investigation with careless measurements can end up below
        a simpler one measured rigorously. This guide covers topics that tend to work and
        what the criteria ask for.
      </p>

      <h2>Marking criteria overview</h2>
      <ul>
        <li><strong>Research design (6 marks):</strong> A focused research question in a genuine context, a methodology with identified variables and controls, and consideration of safety, ethical and environmental issues.</li>
        <li><strong>Data analysis (6 marks):</strong> Recording, processing and presenting data in ways relevant to the question, including uncertainties and appropriate graphs.</li>
        <li><strong>Conclusion (6 marks):</strong> A conclusion justified by the analysis, answering the research question and compared with the accepted scientific context.</li>
        <li><strong>Evaluation (6 marks):</strong> Honest assessment of methodological weaknesses and limitations, with realistic improvements.</li>
      </ul>

      <h2>IB Physics IA examples that score well</h2>

      <h3>1. Simple harmonic motion: spring constant or pendulum period</h3>
      <p>
        Investigating how the period of a spring-mass system varies with mass
        (T = 2π√(m/k)) is a clean, quantitative Physics IA. The key to a high
        score is linearisation: plot T² vs m and fit a straight line, extracting
        k from the gradient. That is processing which tests the relationship, not just
        a plot of T against m. Error bars on both axes, and maximum and minimum gradient
        lines to find the uncertainty in k, are the kind of processing the top levels of
        Data analysis describe.
      </p>
      <p>
        Context: investigate an object with a real use, such as the spring in a
        retractable pen, a length of bungee cord or a guitar string under tension. That
        turns a textbook practical into your own investigation and gives the research
        question the context Research design asks for.
      </p>

      <h3>2. Optics: the focal length of a lens from the lens equation</h3>
      <p>
        Measuring image and object distances for convex lenses and applying 1/f =
        1/v + 1/u is a reliable method. A strong version linearises the equation
        (plot 1/v vs 1/u, extract f from the intercepts), compares the experimental
        focal length to the manufacturer's specification, and discusses how lens
        aberrations affect accuracy at small object distances. For context, use a lens
        from a real optical system: reading glasses, a camera lens or a magnifying glass.
      </p>

      <h3>3. Projectile motion and drag</h3>
      <p>
        Investigating how launch angle or initial speed affects range, and then
        extending to quantify the effect of air resistance, is engaging and
        produces good data. Video analysis (using Tracker or equivalent software)
        allows frame-by-frame position measurement, making the velocity and
        acceleration calculations rigorous. A student who extracts a drag
        coefficient from the data and compares it to expected values for the
        projectile's shape earns strong marks in Data analysis and Evaluation.
      </p>

      <h3>4. Electromagnetic induction: Faraday's law</h3>
      <p>
        Dropping a magnet through a coil and measuring the induced EMF as a
        function of magnet speed, coil turns, or magnet strength directly
        tests Faraday's law (EMF = -dΦ/dt). This works well because it generates
        multiple measurable variables, is quantitatively predictable, and the
        deviations from ideal behaviour (flux leakage, finite coil resistance)
        provide rich Evaluation content. A data logger or oscilloscope makes
        the measurement precise; a smartphone with a magnetometer app can substitute
        in a resource-limited school.
      </p>

      <h3>5. Specific heat capacity of metals or liquids</h3>
      <p>
        Measuring specific heat capacity by electrical heating (Q = mcΔT) is
        accessible, quantitative, and directly comparable to literature values.
        The investigation is most original when applied to a non-standard material:
        different cooking oils, metals from specific alloys, or composite materials.
        The systematic error from heat loss to the surroundings is significant and
        must be addressed in Evaluation, either by applying a cooling correction
        or by estimating the heat loss rate and showing its effect on the result.
      </p>

      <h2>Linearisation: the most important analysis skill</h2>
      <p>
        Many Physics investigations study a relationship that is not linear as measured.
        Linearising it lets you test the relationship directly and pull a physical
        constant, with its uncertainty, out of the gradient or intercept, which is the
        kind of processing Data analysis rewards.
      </p>
      <p>Common linearisations in IB Physics:</p>
      <ul>
        <li>T = 2π√(L/g) → plot T² vs L to get a straight line with gradient 4π²/g</li>
        <li>E = hf - φ → plot maximum kinetic energy vs frequency (photoelectric effect)</li>
        <li>I = I₀e^(-μx) → plot ln(I) vs x to get a straight line with gradient -μ</li>
        <li>v² = u² + 2as → plot v² vs s to get gradient 2a</li>
        <li>V = IR → plot V vs I; the gradient is the resistance if the conductor is ohmic</li>
      </ul>
      <p>
        Once linearised, use the gradient and intercept to extract physical constants,
        then compare to accepted values and calculate percentage error.
      </p>

      <h2>Uncertainty analysis: what the criterion looks for</h2>
      <p>
        Incomplete handling of uncertainties is one of the most frequent reasons a
        Physics IA falls short on Data analysis. A complete treatment:
      </p>
      <ol>
        <li>Record absolute uncertainty for every measuring instrument (ruler: ±0.5 mm, stopwatch: ±0.1 s, digital balance: ±0.01 g).</li>
        <li>Calculate absolute uncertainty of derived quantities using propagation rules.</li>
        <li>Plot error bars on graphs (both x and y if both have significant uncertainty).</li>
        <li>Draw a best-fit line AND a worst-case line (max gradient, min gradient) to determine the uncertainty in any gradient you extract.</li>
        <li>Express the final result as value ± uncertainty with appropriate significant figures.</li>
        <li>Compare your percentage uncertainty to your percentage error from the accepted value, and explain the discrepancy if they differ significantly.</li>
      </ol>

      <h2>Evaluation: how to write it well</h2>
      <p>
        The Evaluation criterion rewards students who go beyond listing errors to
        actually analysing them. A structure that works:
      </p>
      <ul>
        <li><strong>Identify the limitation specifically:</strong> not "human error" but the exact source, such as parallax when reading a ruler, air currents in the lab or temperature drift during a 30-minute run.</li>
        <li><strong>State whether it is random or systematic:</strong> Random errors increase scatter; systematic errors shift all values in one direction.</li>
        <li><strong>Quantify the effect where possible:</strong> "The temperature rose by 2°C during the experiment; using the temperature coefficient of resistance for copper, this introduces a systematic 0.8% error in resistance."</li>
        <li><strong>Propose a concrete improvement:</strong> not "be more careful" but a specific change, such as a thermostatically controlled enclosure, a light gate instead of a stopwatch or digital calipers instead of a ruler, and why it would reduce that particular error.</li>
      </ul>

            <ExamplesBridge
        workLabel="Physics IA"
        ctaHref="/essay/physics-ia"
        rows={[
          { criterion: "Research design", typical: "The method is lifted from a standard class practical and the variables are simply listed.", top: "The method is justified for this specific question: why this range, this many trials, these controls." },
          { criterion: "Data analysis", typical: "Raw data is tabulated and a mean is plotted; uncertainties appear once and are then forgotten.", top: "Uncertainties are propagated through the processing, and the processing chosen is the one that actually tests the hypothesis." },
          { criterion: "Conclusion", typical: "\"The hypothesis was supported\", with no reference to how strongly.", top: "The conclusion is stated with its uncertainty and compared against accepted values or published work." },
          { criterion: "Evaluation", typical: "Generic weaknesses: human error, not enough time, more trials next time.", top: "The relative impact of specific methodological weaknesses explained, with realistic improvements that address them explained." },
        ]}
      />

      <h2>Get feedback before your teacher marks the final report</h2>
      <p>
        Physics IA marks often come back lower than expected because a correct
        experiment and a report that earns the marks are not the same thing. A well-run
        investigation with thin uncertainty analysis or a vague Evaluation gives away
        marks it did not need to.
      </p>
      <p>
        IBLens reads your Physics IA against the four criteria and shows which one is
        losing you the most marks, while you can still revise the report.
      </p>
      <p>
        <Link href="/essay/physics-ia">Paste your Physics IA draft into IBLens for criterion-by-criterion feedback →</Link>
      </p>
      <h2>Internal Assessment in other subjects</h2>

      <ul>
        <li><Link href="/resources/ib-biology-ia-examples">Biology IA Examples</Link></li>
        <li><Link href="/resources/ib-chemistry-ia-examples">Chemistry IA Examples</Link></li>
        <li><Link href="/resources/ib-math-ia-examples">Math IA Examples</Link></li>
        <li><Link href="/resources/ib-ia-feedback">Check your IA against the criteria</Link></li>
      </ul>

    </ResourceArticle>
  );
}
