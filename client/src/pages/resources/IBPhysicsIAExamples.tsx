import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function IBPhysicsIAExamples() {
  return (
    <ResourceArticle
      title="IB Physics IA Examples — Investigation Ideas and How to Score a 7 | IBLens"
      description="High-scoring IB Physics IA examples with examiner commentary. Discover which investigations earn top marks, how to handle uncertainty, and what kills your Evaluation score."
      canonical="/resources/ib-physics-ia-examples"
      datePublished="2026-06-09"
      dateModified="2026-06-09"
    >
      <p>
        The IB Physics Internal Assessment is a practical investigation worth 20%
        of your final grade. Physics IAs are particularly unforgiving on data
        quality: examiners expect quantitative analysis, proper uncertainty
        propagation, and graphs that are correctly processed. A student who
        designs a clever investigation but takes sloppy data will score lower
        than a student who runs a simpler experiment with rigorous measurement.
        This guide covers which IB Physics IA topics produce reliable high scores
        and what the marking criteria actually require.
      </p>

      <h2>Marking Criteria Overview</h2>
      <ul>
        <li><strong>Research design (6 marks):</strong> A focused research question in a genuine context — a non-standard variable, a context from the student's own life, or an original approach strengthens the design.</li>
        <li><strong>Exploration (6 marks):</strong> Research question, background theory, identified variables (IV, DV, controlled), and a methodology detailed enough to be reproduced.</li>
        <li><strong>Analysis (6 marks):</strong> Processed data with uncertainties, appropriate graphs (often linearised), and a conclusion with a comparison to expected values or theory.</li>
        <li><strong>Evaluation (6 marks):</strong> Specific, directional assessment of limitations and improvements. Random vs systematic error distinction. This is where most marks are lost.</li>
        <li><strong>Communication (4 marks):</strong> Clear structure, correct physics notation, appropriate length.</li>
      </ul>

      <h2>IB Physics IA Examples That Score Well</h2>

      <h3>1. Simple harmonic motion — spring constant or pendulum period</h3>
      <p>
        Investigating how the period of a spring-mass system varies with mass
        (T = 2π√(m/k)) is a clean, quantitative Physics IA. The key to a high
        score is linearisation: plot T² vs m and fit a straight line, extracting
        k from the gradient. This demonstrates mathematical processing (Analysis
        criterion) beyond simply plotting T vs m. Adding error bars on both axes
        and a best-fit/worst-fit line analysis to determine uncertainty in k pushes
        the Analysis score to 5 or 6.
      </p>
      <p>
        Personal context: investigate the spring constant of a specific object
        with physical meaning — the spring in a retractable pen, a bungee cord
        sample, a guitar string under tension. This transforms a textbook lab into
        an original investigation.
      </p>

      <h3>2. Optics — focal length of lenses using the lens equation</h3>
      <p>
        Measuring image and object distances for convex lenses and applying 1/f =
        1/v + 1/u is a reliable method. A strong version linearises the equation
        (plot 1/v vs 1/u, extract f from the intercepts), compares the experimental
        focal length to the manufacturer's specification, and discusses how lens
        aberrations affect accuracy at small object distances. Personal engagement:
        use lenses from a real optical system — reading glasses, a camera lens,
        a magnifying glass from a specific application.
      </p>

      <h3>3. Projectile motion and drag</h3>
      <p>
        Investigating how launch angle or initial speed affects range — and then
        extending to quantify the effect of air resistance — is engaging and
        produces good data. Video analysis (using Tracker or equivalent software)
        allows frame-by-frame position measurement, making the velocity and
        acceleration calculations rigorous. A student who extracts a drag
        coefficient from the data and compares it to expected values for the
        projectile's shape earns strong Analysis and Evaluation marks.
      </p>

      <h3>4. Electromagnetic induction — Faraday's law</h3>
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
        Measuring specific heat capacity by electrical heating (E = mcΔT) is
        accessible, quantitative, and directly comparable to literature values.
        The investigation is most original when applied to a non-standard material:
        different cooking oils, metals from specific alloys, or composite materials.
        The systematic error from heat loss to the surroundings is significant and
        must be addressed in Evaluation — either by applying a cooling correction
        or by estimating the heat loss rate and showing its effect on the result.
      </p>

      <h2>Linearisation: The Most Important Analysis Skill</h2>
      <p>
        Physics IAs almost always involve a relationship between two variables that
        is not linear in its raw form. Examiners reward students who linearise their
        graphs because it demonstrates understanding of the underlying physics.
      </p>
      <p>Common linearisations in IB Physics:</p>
      <ul>
        <li>T = 2π√(L/g) → plot T² vs L to get a straight line with gradient 4π²/g</li>
        <li>E = hf - φ → plot maximum kinetic energy vs frequency (photoelectric effect)</li>
        <li>I = I₀e^(-μx) → plot ln(I) vs x to get a straight line with gradient -μ</li>
        <li>v² = u² + 2as → plot v² vs s to get gradient 2a</li>
        <li>P = IV → if investigating resistance, plot V vs I to confirm linearity (Ohm's law)</li>
      </ul>
      <p>
        Once linearised, use the gradient and intercept to extract physical constants,
        then compare to accepted values and calculate percentage error.
      </p>

      <h2>Uncertainty Analysis: What Examiners Actually Want</h2>
      <p>
        The single most common reason Physics IAs score Analysis = 3 or 4 instead
        of 5 or 6 is incomplete uncertainty handling. What examiners expect:
      </p>
      <ol>
        <li>Record absolute uncertainty for every measuring instrument (ruler: ±0.5 mm, stopwatch: ±0.1 s, digital balance: ±0.01 g).</li>
        <li>Calculate absolute uncertainty of derived quantities using propagation rules.</li>
        <li>Plot error bars on graphs (both x and y if both have significant uncertainty).</li>
        <li>Draw a best-fit line AND a worst-case line (max gradient, min gradient) to determine the uncertainty in any gradient you extract.</li>
        <li>Express the final result as value ± uncertainty with appropriate significant figures.</li>
        <li>Compare your percentage uncertainty to your percentage error from the accepted value — and explain the discrepancy if they differ significantly.</li>
      </ol>

      <h2>Evaluation: How to Write It Well</h2>
      <p>
        The Evaluation criterion rewards students who go beyond listing errors to
        actually analysing them. The structure that consistently earns 5–6 marks:
      </p>
      <ul>
        <li><strong>Identify the limitation specifically:</strong> Not "human error" — name the exact source (parallax reading a ruler, air currents in the lab, temperature drift during a 30-minute experiment).</li>
        <li><strong>State whether it is random or systematic:</strong> Random errors increase scatter; systematic errors shift all values in one direction.</li>
        <li><strong>Quantify the effect where possible:</strong> "The temperature rose by 2°C during the experiment; using the temperature coefficient of resistance for copper, this introduces a systematic 0.8% error in resistance."</li>
        <li><strong>Propose a concrete improvement:</strong> Not "be more careful" — identify a specific change (use a thermostatically controlled enclosure, replace the stopwatch with a light gate, use a digital vernier instead of a ruler) and explain why it would reduce that specific error.</li>
      </ul>

      <h2>Get Feedback Before Your Teacher Submits</h2>
      <p>
        Physics IA marks are often lower than students expect because the gap between
        "correct experiment" and "correct report" is larger than it appears. A well-run
        investigation with poorly presented uncertainty analysis or vague Evaluation
        loses 4–6 marks needlessly.
      </p>
      <p>
        IBLens analyses your Physics IA against the official IB marking rubric and
        identifies exactly where marks are being lost on each criterion — before your
        teacher finalises the moderated submission.
      </p>
      <p>
        <Link to="/essay">Upload your Physics IA draft to IBLens for rubric-based feedback →</Link>
      </p>
    </ResourceArticle>
  );
}
