import { ResourceArticle } from "@/components/ResourceArticle";
import { ExamplesBridge } from "@/components/ExamplesBridge";
import { AnnotatedExcerpt } from "@/components/AnnotatedExcerpt";
import { Link } from "wouter";

export default function IBBiologyIAExamples() {
  return (
    <ResourceArticle
      title="IB Biology IA Examples: Annotated Excerpts and Topic Ideas | IBLens"
      description="A made-up Biology IA followed from research question to evaluation, each passage written weaker and stronger and annotated against the criteria, plus topic ideas."
      canonical="/resources/ib-biology-ia-examples"
      datePublished="2026-06-09"
      dateModified="2026-09-21"
    >
      <p>
        The IB Biology Internal Assessment is a scientific investigation worth 20% of
        your final grade. Unlike a lab practical in class, the IA asks you to design,
        conduct and evaluate your own investigation, and the marks reward scientific
        thinking, not only correct data collection. This guide follows one example
        investigation through the report, passage by passage, then covers topics that tend
        to work and the mistakes that cost otherwise competent investigations their marks.
      </p>

      <h2>How the IB Biology IA is marked</h2>
      <p>
        The IA is marked out of 24 across four criteria (2025 syllabus, first assessment May 2025):
      </p>
      <ul>
        <li><strong>Research design (6 marks):</strong> A research question described within a specific and appropriate context, the methodological considerations explained (how the variables are measured, how the sample or data were chosen, the range and repetition of measurements, the control variables, and safety, ethical and environmental issues), and a method described well enough to be reproduced.</li>
        <li><strong>Data analysis (6 marks):</strong> Recording and processing data clearly and precisely (following conventions for tables, graphs, units and significant figures), with processing that is relevant to the question and carried out appropriately and accurately, and an appropriate consideration of uncertainties.</li>
        <li><strong>Conclusion (6 marks):</strong> A conclusion justified by the analysis, answering the research question and compared with the accepted scientific context.</li>
        <li><strong>Evaluation (6 marks):</strong> The relative impact of specific methodological weaknesses or limitations explained, with realistic improvements relevant to them explained.</li>
      </ul>
      <p>
        The report has a maximum of 3,000 words. Evaluation is a frequent weak point: the
        report describes what happened without analysing how the method may have
        affected the result.
      </p>

      <h2>An annotated IB Biology IA example</h2>
      <p>
        Complete IAs with their marks and the moderator's reasoning are rarely public (the
        reasons are further down this page). Instead, here is one investigation followed through
        the report, with each key passage written twice: the way drafts often read, and the way
        the upper levels of the criteria describe it. We made up the investigation, the data and
        both versions to show the difference. The numbers are realistic but were not measured.
        They do not come from a student's IA, and no mark is claimed for either version.
      </p>
      <p>
        The investigation: whether ivy leaves that grow in sun have more stomata per square
        millimetre than leaves that grow in shade, measured from nail varnish peels under a
        microscope and compared with a statistical test.
      </p>

      <AnnotatedExcerpt
        heading="Research question (Research design)"
        weaker={<p>Do sun leaves have more stomata than shade leaves?</p>}
        stronger={<p>Leaves that grow in full sun can photosynthesise faster than shaded leaves, and more stomata would allow more gas exchange. Is the stomatal density (stomata per mm²) on the lower surface of fully expanded juvenile ivy (<em>Hedera helix</em>) leaves from the sunlit south face of a garden wall different from that of leaves from its shaded north face, and how large is the difference?</p>}
        why="The stronger question names the organism, the leaf form and surface, the stage of the leaf and where each group comes from, and gives the question a biological reason. That is the core of the specific and appropriate context the top band of Research design describes; the full report would build it out with a short background section and sources. It also fixes what will be measured: a density per mm², not a count."
      />

      <AnnotatedExcerpt
        heading="Method (Research design)"
        weaker={<p>I picked 10 sun leaves and 10 shade leaves and painted nail varnish on them. I peeled it off with tape and counted the stomata under the microscope.</p>}
        stronger={<p>A single ivy plant, rooted at one end of a free-standing garden wall that runs east to west, has spread along both faces; its stems were traced back to one trunk. Ten leaves were taken from each face on the same morning, with the owner's permission, each from a separate climbing shoot with lobed, juvenile leaves growing 0.5 to 1.5 m above the ground; the shoots in that band on each face were numbered and ten were drawn at random. Flowering shoots with unlobed adult leaves, which form mainly in bright light, were left out so that leaf form could not stand in for light. On each shoot the fifth leaf from the tip was taken if it was fully expanded, otherwise the next one down, so that leaves were compared at the same stage of development. Light at leaf height on each face was measured with a lux meter at noon on three days; a lux meter under-reads the bluer light of the north face compared with a PAR meter, but it is enough to show a several-fold difference. A strip of clear nail varnish was painted on the lower surface of the central lobe, midway between the midrib and the margin and away from the main veins, left to dry for ten minutes, and lifted onto a slide with clear tape. A classmate coded the slides, so the counting was done without knowing which face a leaf came from. Stomata were counted in five fields of view per leaf at ×400, at fixed stage positions rather than chosen by looking; stomata cut by the edge of a field were counted only on its upper half. Five fields meant counting about 100 stomata on a shade leaf and 140 on a sun leaf, which keeps the counting error in each leaf mean to about 10% or less; ten leaves per face was the most that could be counted blind in the time available. The field diameter, 0.45 ± 0.01 mm, was measured with a stage micrometer, giving a field area of 0.159 ± 0.007 mm² (±4%). The varnish was used in a ventilated room away from flames, and taking twenty leaves from a large plant does it no lasting harm.</p>}
        why="Most choices in the stronger method answer a specific threat to the comparison: leaf form and stage, the part of the leaf sampled, and the unconscious bias of whoever chooses the shoots and fields and does the counting. It explains the number of leaves and fields, measures what is needed to turn counts into a density, records the independent variable instead of assuming it, and covers safety, permission and the effect on the plant, which the criterion also names. The weaker version could not be repeated, and nothing in it rules out that the groups differed in leaf form or age rather than in light."
      />

      <AnnotatedExcerpt
        heading="Data and processing (Data analysis)"
        weaker={<p>Average number of stomata: sun leaves 28.6, shade leaves 20.7. Sun leaves have more stomata. (Bar chart of the two averages.)</p>}
        stronger={
          <>
            <table>
              <thead><tr><th></th><th>Sun leaves</th><th>Shade leaves</th></tr></thead>
              <tbody>
                <tr><td>Leaves (n)</td><td>10</td><td>10</td></tr>
                <tr><td>Noon illuminance at leaf height, mean of 3 days / lux</td><td>48 000</td><td>6 500</td></tr>
                <tr><td>Mean count per field</td><td>28.6</td><td>20.7</td></tr>
                <tr><td>Mean density / mm⁻²</td><td>180</td><td>130</td></tr>
                <tr><td>Standard deviation of the ten leaf means / mm⁻²</td><td>22</td><td>18</td></tr>
              </tbody>
            </table>
            <p>The table summarises the 100 raw counts (five fields for each of the twenty leaves). A sample of them, the five counts for two leaves from each face, sits in the body of the report, and the rest are in the appendix. Each leaf's five fields were averaged first, so the leaf, not the field, is the unit of replication: fields on the same leaf are not independent of each other. Density is the mean count divided by the field area. All slides were counted on the same microscope at the same magnification, so the 4% uncertainty in the field area scales both means by the same factor: it cannot create or remove the difference or change the t-test, and it adds only about ±2 per mm² to the size of the difference.</p>
            <p>The variation between leaves is the uncertainty that matters here, so the ten leaf means of each group were compared with a two-sample t-test (the leaf means in each group were roughly symmetrical and the two standard deviations similar): t = 5.6, 18 degrees of freedom, p &lt; 0.001. The difference is 50 ± 19 stomata per mm² (95% confidence interval).</p>
          </>
        }
        why="The weaker version compares two averages without their spread, so it cannot say whether the difference is larger than the variation between leaves, and it reports counts per field rather than the density the question asks about. The stronger version reports the independent variable it measured, converts the counts, shows the spread, decides which uncertainty matters for this comparison and uses a test suited to it. That is what the top band of Data analysis describes: processing relevant to the research question, carried out appropriately and accurately, with an appropriate consideration of uncertainties."
      />

      <AnnotatedExcerpt
        heading="Conclusion"
        weaker={<p>Sun leaves had more stomata than shade leaves, so my hypothesis was correct.</p>}
        stronger={<p>On this ivy plant, juvenile leaves from the sunlit face had a stomatal density 38% higher than those from the shaded face: 180 compared with 130 per mm², a difference of 50 ± 19 per mm² (95% confidence interval). If leaves from the two faces did not differ on average, a difference at least this large would arise by chance in fewer than one pair of samples in a thousand (p &lt; 0.001). The data are hard to explain as chance variation between leaves, but the test cannot show that light caused the difference, because the south face is also warmer and drier. Both means lie within the 125 to 240 per mm² reported for the lower surface of ivy leaves (Metcalfe, 2005), and the direction of the difference fits the accepted picture that leaves developing in high light form more stomata per unit area than shade leaves of the same plant.</p>}
        why="Both conclusions say that sun leaves have more stomata. The stronger one gives the size of the difference with its uncertainty, says what the test does and does not show, keeps the claim to what was sampled, and compares the result with the accepted scientific context, including a published range for this species. A full report would also cite a study for the general pattern."
      />

      <AnnotatedExcerpt
        heading="Evaluation"
        weaker={<p>The experiment could be improved by using more leaves and more fields of view. Some peels were not clear, which made counting hard, and there may have been human error in counting.</p>}
        stronger={
          <>
            <p>The weaknesses that matter most are in the design, not the counting. They are listed in order, starting with the one that limits the conclusion most.</p>
            <ol>
              <li>All twenty leaves came from one plant, so the result shows a difference within this plant and cannot be extended to ivy in general. Taking one leaf from the sunlit side and one from the shaded side of each of ten plants that grow in both would keep the count at twenty leaves, allow a paired comparison and support a claim about ivy in the area sampled.</li>
              <li>Light was not the only difference between the faces: the south face is also warmer and drier, and both can affect how leaves develop, so the difference cannot be put down to light alone. Logging temperature and humidity at both faces while the leaves were expanding would show how different they were. Rooting cuttings from one plant and growing them side by side in the open and under shade cloth, counting only leaves that form after the treatment starts, would separate light from most of the rest, although it takes months rather than one morning.</li>
              <li>Density depends on how far the epidermis expanded as well as on how many stomata formed. Sun leaves are often smaller and thicker, with smaller epidermal cells, so part of the difference may come from expansion alone. Counting the other epidermal cells in one fixed field per leaf and calculating the stomatal index (the number of stomata as a percentage of stomata plus other epidermal cells) would show whether sun leaves really turn a larger share of their epidermal cells into stomata, or only have smaller cells.</li>
              <li>Blurred areas on some peels may have hidden stomata, which makes both means slight underestimates. The blurred fields were split about evenly between the groups, so they add scatter rather than a difference and cannot explain a 38% gap. Skipping to the next fixed stage position whenever a field is more than a quarter blurred, and remaking any peel where this happens often, would remove most of the problem.</li>
            </ol>
          </>
        }
        why="The weaker evaluation lists routine problems and a generic fix. The stronger one ranks the weaknesses by their effect on the conclusion, explains how each limits, biases or blurs the result, and proposes a realistic improvement aimed at each one. That is what the top band of Evaluation describes: the relative impact of specific methodological weaknesses, with realistic improvements relevant to them."
      />

      <p>
        Each passage is shown under one criterion, but every criterion is judged across the whole
        report, and most drafts sit somewhere between the two versions. The useful question is
        which passages in yours still read like the weaker one: the <Link href="/essay/biology-ia">Biology IA grader</Link> marks
        your own draft criterion by criterion and points to them.
      </p>

      <h2>IB Biology IA topics that tend to work</h2>

      <h3>1. Effect of substrate concentration on enzyme activity</h3>
      <p>
        Enzyme activity is a syllabus topic and a reliable IA subject when done well. A
        strong version does not stop at measuring how fast catalase breaks down hydrogen
        peroxide at five concentrations. It also processes the rates to show where the
        rate levels off, asks whether that plateau comes from the enzyme or from the limits
        of the method (catalase follows simple saturation kinetics only at low peroxide
        concentrations), and checks that the amount of enzyme was really the same in every
        trial. Tying the enzyme to a real system gives the question a context of its own,
        which is what Research design looks for: lactase, the enzyme used to make
        lactose-free milk, can be given a range of lactose concentrations and the glucose
        it releases measured.
      </p>

      <h3>2. Osmosis in plant tissue across a concentration gradient</h3>
      <p>
        Osmosis is another core syllabus topic, and the processing is what separates the
        top of the mark range. Percentage mass change and a graph are a starting point.
        Several repeats at each concentration, standard deviations and error bars, and
        reading from the graph the concentration at which the tissue would neither gain
        nor lose mass, with its uncertainty, are the kind of processing the upper levels
        of Data analysis describe. Comparing two tissues, such as potato and sweet potato, and estimating
        the water potential of each gives the investigation a question of its own.
      </p>

      <h3>3. Effect of light intensity on the rate of photosynthesis</h3>
      <p>
        A classic topic that is often done poorly. Three things lift it:
      </p>
      <ul>
        <li>Controlling temperature closely, since a lamp also heats the plant, and saying in the Evaluation how far it varied.</li>
        <li>Using a dissolved oxygen probe or a colorimetric method rather than counting bubbles, which is imprecise because bubbles differ in size.</li>
        <li>Choosing a less obvious variable: the colour of light, using LEDs or coloured filters, instead of the light intensity almost everyone tests. Filters also cut the amount of light, so match the light intensity between colours with a PAR meter; a lux meter is weighted to human vision and under-reads blue and red light.</li>
      </ul>

      <h3>4. Microbial growth and inhibition zones of natural extracts</h3>
      <p>
        Disc diffusion assays can suit an IA when the school has a suitable
        microbiology facility and follows the IB's experimentation guidelines:
        non-pathogenic cultures from a recognised supplier, incubation at or below
        25 °C, and no testing of antibiotic resistance, which the guidelines do not
        allow even with non-pathogenic strains. A student who compares the inhibition
        zones of natural extracts (garlic, tea tree oil, honey) at different
        concentrations has a question with a real context. Research design expects
        the safety measures to be addressed. For Data analysis, measure each zone along
        two perpendicular diameters, calculate means and standard deviations, and use a
        statistical test suited to the design. The Evaluation should explain that zone
        size depends on how well an extract diffuses through agar as well as on how
        strongly it inhibits growth (oily tea tree oil and viscous honey diffuse poorly),
        so zones compare concentrations of one extract more fairly than different
        extracts, and what a broth dilution assay, which gives a minimum inhibitory
        concentration, would add.
      </p>

      <h3>5. Effect of temperature on membrane permeability in beetroot</h3>
      <p>
        Measuring the absorbance of betacyanin pigment leaking from beetroot cells
        across a temperature range gives quantitative data with simple equipment. What
        lifts it is using a colorimeter to measure
        absorbance with a green filter, close to the pigment's absorbance peak, rather
        than judging colour by eye, and including enough repeats for error bars to be
        meaningful. A strong Conclusion explains why leakage rises sharply above a
        certain temperature: the pigment is held in the vacuole and leaks only when both
        the tonoplast and the plasma membrane fail, as their phospholipids become more
        fluid and their proteins denature. A strong Evaluation weighs weaknesses such as pigment from cut
        cells that was not rinsed off, or pieces that had not reached the bath temperature,
        by how much each could shift the curve.
      </p>

      <h2>Topics to avoid (or handle carefully)</h2>

      <h3>Survey-based IAs on human behaviour</h3>
      <p>
        "Does sleep affect memory performance?" or "Does music improve concentration?"
        are popular topics that rarely score well. The problem is control: you cannot
        isolate the independent variable in people without randomisation, blinding and
        washout periods, which are hard to run properly in a school. The weakness shows up in Research
        design, and again in an Evaluation that fails to name the confounding variables. If you want
        to study human biology, choose a variable you can measure physiologically
        (heart rate, reaction time with a standard protocol) rather than survey-based
        self-reporting, and follow the IB's rules for human subjects: teacher approval,
        written informed consent, written consent from a parent or guardian for participants under 16, a health questionnaire (such as a PAR-Q)
        before moderate or vigorous exercise, no substances given to participants, caffeine
        included, and no body fluids such as sweat or saliva.
      </p>

      <h3>Germination rate experiments</h3>
      <p>
        Germination is a reasonable topic, but the timeline is a problem: seeds can take
        days or weeks to germinate, which leaves little time to rerun the experiment if
        something goes wrong. If you choose germination, use a fast-germinating species
        (radish, cress, mung beans) and design the protocol with several dishes per
        condition (for example, five dishes of 20 seeds), treating the dish rather than
        the seed as the unit of replication, because seeds in one dish share its moisture
        and temperature.
      </p>

      <h2>The most important thing about IB Biology IA evaluation</h2>
      <p>
        Evaluation is where many otherwise good IAs lose marks. The common failure is
        writing: "My experiment had some errors. I could improve it by being more
        careful." That names no weakness and no effect on the result, so it earns little
        under Evaluation.
      </p>
      <p>
        Strong Evaluation identifies <em>specific</em> methodological weaknesses,
        explains how each one affected the result (a bias in one direction, making it an
        overestimate or an underestimate, or random scatter that hides a trend), says which
        weaknesses matter most, and proposes a realistic improvement aimed at each one.
      </p>
      <p>
        Example of weak evaluation: "Temperature was not perfectly controlled,
        which may have affected results."
      </p>
      <p>
        Example of strong evaluation: "The water bath temperature differed by up to ±2 °C from
        one trial to the next. Because enzyme activity rises with temperature
        over this range, the variation added scatter to every rate, by roughly the same
        proportion at each concentration, which widened the error bars along the whole
        curve. A thermostatically
        controlled water bath, with a temperature logger to record what variation
        remained, would reduce that scatter and let me quantify it."
      </p>

            <ExamplesBridge
        workLabel="Biology IA"
        ctaHref="/essay/biology-ia"
        rows={[
          { criterion: "Research design", typical: "A standard class practical is used as it stands, with no reason given for its choices, and the variables are simply listed.", top: "The method is justified for this specific question: why this range, this many trials, these controls." },
          { criterion: "Data analysis", typical: "Raw data are tabulated and a mean is plotted; uncertainties appear once and are then forgotten.", top: "Uncertainties are considered appropriately in the recording and processing, and the processing chosen is the one that answers the research question." },
          { criterion: "Conclusion", typical: "\"The hypothesis was supported\", with no reference to how strongly.", top: "The conclusion is stated with its uncertainty and compared against accepted values or published work." },
          { criterion: "Evaluation", typical: "Generic weaknesses: human error, not enough time, more trials next time.", top: "The relative impact of specific methodological weaknesses is explained, and so are realistic improvements that address them." },
        ]}
      />

      <h2>Internal Assessment in other subjects</h2>

      <ul>
        <li><Link href="/resources/ib-chemistry-ia-examples">Chemistry IA examples</Link></li>
        <li><Link href="/resources/ib-physics-ia-examples">Physics IA examples</Link></li>
        <li><Link href="/resources/ib-math-ia-examples">Math IA examples</Link></li>
        <li><Link href="/resources/ib-ia-feedback">Check your IA against the criteria</Link></li>
      </ul>

    </ResourceArticle>
  );
}
