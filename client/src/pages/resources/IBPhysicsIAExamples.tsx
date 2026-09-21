import { ResourceArticle } from "@/components/ResourceArticle";
import { ExamplesBridge } from "@/components/ExamplesBridge";
import { AnnotatedExcerpt } from "@/components/AnnotatedExcerpt";
import { Link } from "wouter";

export default function IBPhysicsIAExamples() {
  return (
    <ResourceArticle
      title="IB Physics IA Examples: Annotated Excerpts and Topic Ideas | IBLens"
      description="A made-up Physics IA followed from research question to evaluation, each passage written weaker and stronger and annotated against the criteria, plus topic ideas."
      canonical="/resources/ib-physics-ia-examples"
      datePublished="2026-06-09"
      dateModified="2026-09-21"
    >
      <p>
        The IB Physics Internal Assessment is the scientific investigation, worth 20%
        of your final grade and marked on four criteria of 6 marks each. It can use
        laboratory work, fieldwork, a spreadsheet model, a database or a simulation. Physics IAs are
        unforgiving on data quality: the criteria look for data processed
        accurately and relevantly, an appropriate consideration of uncertainties, and a
        conclusion consistent with that processing. A clever investigation with careless measurements can end up below
        a simpler one measured rigorously. This guide follows one example investigation through
        the report, passage by passage, then covers topics that tend to work and the analysis
        skills the criteria reward.
      </p>

      <h2>Marking criteria overview</h2>
      <ul>
        <li><strong>Research design (6 marks):</strong> A research question described within a specific and appropriate context, the methodological considerations explained (how the variables are measured, how the sample or data were chosen, the range and repetition of measurements, the control variables, and safety, ethical and environmental issues), and a method described well enough to be reproduced.</li>
        <li><strong>Data analysis (6 marks):</strong> Recording and processing data clearly and precisely (following conventions for tables, graphs, units and significant figures), with processing that is relevant to the question and carried out appropriately and accurately, and an appropriate consideration of uncertainties.</li>
        <li><strong>Conclusion (6 marks):</strong> A conclusion justified by the analysis, answering the research question and compared with the accepted scientific context.</li>
        <li><strong>Evaluation (6 marks):</strong> The relative impact of specific methodological weaknesses or limitations explained, with realistic improvements relevant to them explained.</li>
      </ul>

      <h2>An annotated IB Physics IA example</h2>
      <p>
        Complete IAs with their marks and the moderator's reasoning are rarely public (the
        reasons are further down this page). Instead, here is one investigation followed through
        the report, with each key passage written twice: the way drafts often read, and the way
        the upper levels of the criteria describe it. We made up the investigation, the data and
        both versions to show the difference. The numbers are realistic but were not measured.
        They do not come from a student's IA, and no mark is claimed for either version.
      </p>
      <p>
        The investigation: how the vibrating length of a guitar string sets the frequency of its
        note. For an ideal string the fundamental frequency is f = (1/(2L))√(T/μ), where L is the
        vibrating length, T the tension and μ the mass per unit length, so f should be inversely
        proportional to L.
      </p>

      <AnnotatedExcerpt
        heading="Research question (Research design)"
        weaker={<p>How does the length of a string affect its frequency?</p>}
        stronger={<p>Frets raise the pitch of a guitar string by shortening the part that vibrates. How does the vibrating length L (0.200 m to 0.600 m) of a plain steel guitar string of stated gauge 0.010 in (0.254 mm), held at a constant tension of 19.6 N, affect the frequency f of its fundamental, and is the string's mass per unit length, found from the results, consistent with the value calculated from its gauge and the density of steel?</p>}
        why="The weaker question names two variables but not the system, the range, or what the answer will be tested against. The stronger one fixes the system, the range and the controlled tension, ties the question to a real use (frets) and says how the result will be judged. In a full report it would follow a short background section on standing waves on a string, and the two together are what the top band of Research design means by a research question described within a specific and appropriate context."
      />

      <AnnotatedExcerpt
        heading="Method (Research design)"
        weaker={<p>I plucked the string at different lengths and measured the frequency with a phone app. I did each length three times. Control variables: same string, same tension, same room.</p>}
        stronger={<p>The string was clamped at one end and ran over a pulley to a hanging mass of 2.000 ± 0.010 kg, so the tension was set by its weight, mg = 19.6 N, rather than by a tuning peg that could slip. A fixed bridge near the clamp and a movable bridge nearer the pulley set the vibrating length, measured between their edges with a metre rule (±0.001 m, from two readings of ±0.5 mm). Seven lengths from 0.200 m to 0.600 m spread 1/L across a threefold range, enough to test for a straight line. At each length the string was plucked gently five times at its midpoint, which suppresses the even harmonics, and the peak frequency was read from the audio spectrum in the phyphox app, with a sample window long enough to resolve about 3 Hz. The fundamental was taken as the lowest strong peak, checked against the weaker peaks near 3f and 5f, and the five readings were averaged. The mass hung over a padded box and safety glasses were worn, because a steel string under tension can whip if it snaps; there were no ethical or environmental issues.</p>}
        why="The weaker method could not be repeated from its description, and it lists control variables without saying how they were controlled. The stronger one explains the choices that matter for this question: where the tension comes from, why these lengths, how many repeats, how the frequency was read and checked, and the safety risk. With a labelled diagram of the set-up beside it, someone else could reproduce it, which the top band of Research design asks for."
      />

      <AnnotatedExcerpt
        heading="Data and processing (Data analysis)"
        weaker={
          <>
            <table>
              <thead><tr><th>Length (cm)</th><th>Frequency</th></tr></thead>
              <tbody>
                <tr><td>20</td><td>563</td></tr>
                <tr><td>25</td><td>449</td></tr>
                <tr><td>30</td><td>374</td></tr>
                <tr><td>35</td><td>322</td></tr>
                <tr><td>40</td><td>281</td></tr>
                <tr><td>50</td><td>225</td></tr>
                <tr><td>60</td><td>187</td></tr>
              </tbody>
            </table>
            <p>The graph of frequency against length is a curve going down, so as the length increases the frequency decreases.</p>
          </>
        }
        stronger={
          <>
            <table>
              <thead><tr><th>L / m (±0.001)</th><th>1/L / m⁻¹</th><th>f / Hz (mean of 5, ±3)</th></tr></thead>
              <tbody>
                <tr><td>0.200</td><td>5.00</td><td>563</td></tr>
                <tr><td>0.250</td><td>4.00</td><td>449</td></tr>
                <tr><td>0.300</td><td>3.33</td><td>374</td></tr>
                <tr><td>0.350</td><td>2.86</td><td>322</td></tr>
                <tr><td>0.400</td><td>2.50</td><td>281</td></tr>
                <tr><td>0.500</td><td>2.00</td><td>225</td></tr>
                <tr><td>0.600</td><td>1.67</td><td>187</td></tr>
              </tbody>
            </table>
            <p>The ±3 Hz is half the largest range of the five readings at any length. The ±0.001 m in L gives 1/L an uncertainty of ±0.025 m⁻¹ at 0.200 m, worth about ±3 Hz along the line, as much as the frequency uncertainty, so the graph has error bars on both axes.</p>
            <p>Plotting f against 1/L linearises the relationship: an ideal string gives a straight line through the origin with gradient k = ½√(T/μ). The least-squares line, fitted to unrounded values of 1/L, has a gradient of 112.6 m s⁻¹ and an intercept of −0.4 Hz. Lines of maximum and minimum gradient through the corners of the error boxes give 115.6 and 110.1 m s⁻¹, so k = 112.6 ± 2.7 m s⁻¹ (±2.43%), and their intercepts, from −9 Hz to +7 Hz, include zero.</p>
            <p>Rearranging, μ = T/(4k²) = 3.87 × 10⁻⁴ kg m⁻¹. Its percentage uncertainty is twice that of k plus that of T (0.5%, from the mass): 2 × 2.43% + 0.5% = 5.4%, so μ = (3.87 ± 0.21) × 10⁻⁴ kg m⁻¹.</p>
          </>
        }
        why="The weaker version records the data but does nothing with it that tests the physics: a falling curve fits many relationships, and the table has no units for frequency and no uncertainties. The stronger version chooses the processing that answers the question, a linearised graph whose gradient is a physical quantity, puts error bars on both axes because both matter, and carries the uncertainty into the gradient and then into μ. That is what the top band of Data analysis describes: processing relevant to the research question, carried out appropriately and accurately, with an appropriate consideration of uncertainties."
      />

      <AnnotatedExcerpt
        heading="Conclusion"
        weaker={<p>As the length of the string increased, the frequency decreased. This supports my hypothesis that frequency is inversely proportional to length.</p>}
        stronger={<p>Across 0.200 m to 0.600 m the results are consistent with the fundamental frequency being inversely proportional to the vibrating length: f against 1/L is a straight line whose intercept is zero within its uncertainty. The mass per unit length found from the gradient, (3.87 ± 0.21) × 10⁻⁴ kg m⁻¹, agrees with the 3.98 × 10⁻⁴ kg m⁻¹ calculated from the string's stated gauge and the density of steel (7850 kg m⁻³): the 2.8% difference lies inside the 5.4% uncertainty. That is a weaker test than it looks, because the calculated value has an unknown uncertainty of its own: the gauge was taken from the label, not measured. Within this range and to this precision, the string behaved as the ideal-string model predicts.</p>}
        why="A falling frequency is true of an inverse relationship and of many others, so the weaker conclusion claims more than its data show. The stronger one states what the analysis established, with its uncertainty and its limits, and compares it with the accepted scientific context: the ideal-string equation and an independent value of μ."
      />

      <AnnotatedExcerpt
        heading="Evaluation"
        weaker={<p>Sources of error: human error when plucking, and the phone app may not be accurate. The room was also noisy. To improve, I would take more repeats and be more careful.</p>}
        stronger={
          <>
            <p>The random scatter was small: every point lies within 1 Hz of the line, well inside the ±3 Hz error bars, so the 5.4% uncertainty in μ is generous and the 2.8% difference may well be real. The weaknesses that matter are systematic. The first and third could each account for the whole difference on their own. The size of the second is unknown, because the pulley's friction was not measured; the test below would show whether it matters.</p>
            <ol>
              <li>A steel string is stiff, so it does not bend sharply over a bridge and vibrates as if it were slightly shorter than the distance between the bridge edges, by something of the order of 1 mm at each end at this tension. This raises f most at the shortest lengths, which steepens the line of f against 1/L and lowers the μ found from it. Refitting against 1/(L − 1 mm), 0.5 mm at each end, raises μ by 1.3%, and against 1/(L − 2 mm), 1 mm at each end, by 2.7%, so this effect alone could account for the whole difference, and the intercept, anywhere from −9 Hz to +7 Hz, cannot rule it out (a 2 mm end correction would put it near −2 Hz). Narrow knife-edge bridges would reduce it. Plotting L against 1/f would measure it, because a vibrating length of L − 2δ makes the line cross the L axis at 2δ. With these error bars that intercept could be anywhere from −8 mm to +9 mm. Recording each pluck and taking the spectrum of 2 s of it in audio software would give the frequencies to ±0.5 Hz (phyphox's longest window, 32,768 samples, resolves only about 1.5 Hz), and a steel rule read through a magnifier would give the lengths to ±0.5 mm; together they would narrow it to about ±1.5 mm.</li>
              <li>The tension was taken to be mg, but the pulley turned stiffly, so friction could leave the tension in the vibrating section above or below 19.6 N. Measuring the pulley's friction on its own, with 2.000 kg hanging on each end of a cord over it and extra mass added to one side until it starts to turn, would bound the effect: 20 g would mean up to 1% in T, and so 1% in μ, since μ = T/(4k²). A force sensor between the clamp and the fixed bridge, on the vibrating side of the pulley, would measure the tension directly.</li>
              <li>The comparison value is only as good as the stated gauge and the assumed density of steel. μ depends on the diameter squared, so a string 1.4% thinner than its label would on its own explain the whole 2.8% difference. A micrometer reading to 0.01 mm cannot settle this, because ±0.005 mm on 0.254 mm is ±4% in μ. Weighing the string itself afterwards, with the ball end and its twisted wrap cut off and the remaining length measured (about 1 m, so about 0.4 g), on a 0.001 g balance would give μ directly to better than 0.5%, which would turn the comparison into a real test.</li>
            </ol>
          </>
        }
        why="The weaker evaluation names problems that could belong to any experiment and suggests improvements that would not change the result. The stronger one identifies weaknesses of this method, estimates how far each could move the final value compared with the 2.8% difference, says where it cannot yet do so (the pulley) and how that would be found, and pairs each with a realistic improvement that addresses it. That is what the top band of Evaluation describes: the relative impact of specific methodological weaknesses, with realistic improvements relevant to them."
      />

      <p>
        Each passage is shown under one criterion, but every criterion is judged across the whole
        report, and most drafts sit somewhere between the two versions. The useful question is
        which passages in yours still read like the weaker one: the <Link href="/essay/physics-ia">Physics IA grader</Link> marks
        your own draft criterion by criterion and points to them.
      </p>

      <h2>IB Physics IA topics that tend to work</h2>

      <h3>1. Simple harmonic motion: spring constant or pendulum period</h3>
      <p>
        Investigating how the period of a spring-mass system varies with mass
        (T = 2π√(m/k)) is a clean, quantitative Physics IA. What makes it strong
        is linearisation: plot T² vs m and fit a straight line, extracting
        k from the gradient. That is processing which tests the relationship, not just
        a plot of T against m. Error bars on both axes, and maximum and minimum gradient
        lines to find the uncertainty in k, are the kind of processing the top levels of
        Data analysis describe.
      </p>
      <p>
        Context: investigate an object with a real use, such as a gate or screen-door
        spring, the spring from a baby bouncer or a length of bungee cord. That
        turns a textbook practical into your own investigation and gives the research
        question the context Research design asks for.
      </p>

      <h3>2. Optics: the focal length of a lens from the lens equation</h3>
      <p>
        Measuring image and object distances for convex lenses and applying 1/f =
        1/v + 1/u is a reliable method. A strong version linearises the equation
        (plot 1/v vs 1/u, extract f from the intercepts), compares the experimental
        focal length to the manufacturer's specification, and discusses why the image
        becomes hard to locate as the object approaches the focal point. For context, use a
        lens from a real optical system: reading glasses or a magnifying glass.
      </p>

      <h3>3. Projectile motion and drag</h3>
      <p>
        Investigating how launch angle or initial speed affects range, and then
        extending to quantify the effect of air resistance, gives plenty of data.
        Video analysis (using Tracker or equivalent software) records the position frame
        by frame, so the trajectory can be fitted rather than differentiated twice. A
        student who extracts a drag coefficient from the data and compares it with
        expected values for the projectile's shape supplies the processing Data analysis
        rewards and the comparison the Conclusion asks for.
      </p>

      <h3>4. Electromagnetic induction: Faraday's law</h3>
      <p>
        Dropping a magnet through a coil and measuring the induced EMF as a
        function of magnet speed, coil turns, or magnet strength directly
        tests Faraday's law (ε = −NΔΦ/Δt), which is additional higher level content in the 2025 guide. This works well because it has
        several measurable variables and a quantitative prediction, and the departures
        from ideal behaviour, such as the magnet speeding up as it falls through the coil
        and the coil's finite length, give the Evaluation material. The pulse from a
        falling magnet lasts only a few milliseconds, so it needs a data logger sampling at
        1 kHz or more, or an oscilloscope; a phone's magnetometer measures field rather
        than EMF and samples far too slowly to replace either.
      </p>

      <h3>5. Specific heat capacity of metals or liquids</h3>
      <p>
        Measuring specific heat capacity by electrical heating (Q = mcΔT) is
        accessible, quantitative, and directly comparable to literature values.
        The investigation is most original when applied to a non-standard material:
        different cooking oils, metals from specific alloys, or composite materials.
        The systematic error from heat loss to the surroundings is significant and
        must be dealt with, either in the processing, by applying a cooling correction,
        or in the Evaluation, by estimating the rate of heat loss and showing its effect
        on the result.
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
        <li>E<sub>max</sub> = hf − Φ → plot maximum kinetic energy vs frequency (photoelectric effect): gradient h, intercept −Φ</li>
        <li>I = I₀e<sup>−αx</sup> → plot ln(I) vs x to get a straight line with gradient −α</li>
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
        <li>Record the absolute uncertainty of every measurement (ruler: ±0.5 mm; digital balance: ±0.01 g; hand-timed stopwatch: about ±0.1 s from reaction time, not the 0.01 s on its display).</li>
        <li>Calculate absolute uncertainty of derived quantities using propagation rules.</li>
        <li>Plot error bars on graphs (both x and y if both have significant uncertainty).</li>
        <li>Draw a best-fit line and the lines of maximum and minimum gradient that still pass through all the error bars, to find the uncertainty in any gradient you extract.</li>
        <li>Express the final result as value ± uncertainty with appropriate significant figures.</li>
        <li>Compare your percentage uncertainty to your percentage error from the accepted value, and explain the discrepancy if they differ significantly.</li>
      </ol>

      <h2>Evaluation: how to write it well</h2>
      <p>
        The Evaluation criterion rewards analysis of the weaknesses you name: how far each
        one moved the result, and what would fix it. A structure that works:
      </p>
      <ul>
        <li><strong>Identify the limitation specifically:</strong> not "human error" but the exact source, such as parallax when reading a ruler, air currents in the lab or temperature drift during a 30-minute run.</li>
        <li><strong>State whether it is random or systematic:</strong> random errors increase the scatter; systematic errors shift values consistently in one direction.</li>
        <li><strong>Quantify the effect where possible:</strong> "The temperature rose by 2 °C during the experiment; with the temperature coefficient of resistance of copper, 0.0039 K⁻¹, that raised the resistance by about 0.8%."</li>
        <li><strong>Propose a concrete improvement:</strong> not "be more careful" but a specific change, such as a thermostatically controlled enclosure, a light gate instead of a stopwatch or digital callipers instead of a ruler, and explain why it would reduce that particular error.</li>
      </ul>

            <ExamplesBridge
        workLabel="Physics IA"
        ctaHref="/essay/physics-ia"
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
        <li><Link href="/resources/ib-chemistry-ia-examples">Chemistry IA examples</Link></li>
        <li><Link href="/resources/ib-math-ia-examples">Math IA examples</Link></li>
        <li><Link href="/resources/ib-ia-feedback">Check your IA against the criteria</Link></li>
      </ul>

    </ResourceArticle>
  );
}
