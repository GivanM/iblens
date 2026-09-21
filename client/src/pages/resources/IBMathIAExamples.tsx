import { ResourceArticle } from "@/components/ResourceArticle";
import { ExamplesBridge } from "@/components/ExamplesBridge";
import { AnnotatedExcerpt } from "@/components/AnnotatedExcerpt";
import { Link } from "wouter";

export default function IBMathIAExamples() {
  return (
    <ResourceArticle
      title="IB Math IA Examples: Annotated Excerpts and Topic Ideas | IBLens"
      description="A made-up Math IA followed from aim to reflection, each passage written weaker and stronger and annotated against criteria A to E, plus topic ideas for AA and AI."
      canonical="/resources/ib-math-ia-examples"
      datePublished="2026-06-09"
      dateModified="2026-09-21"
    >
      <p>
        The IB Mathematics Internal Assessment is worth 20% of your final grade, and
        it is the one component where you control the topic, the approach, and the
        depth of exploration. That freedom is also what makes it difficult. Marks are often
        lost where the mathematics is correct: the exploration shows little personal
        engagement, stays below the level of the course, or never states its aim clearly.
        This guide follows one example exploration through its key
        passages, then covers topics that work for each course and a structure that suits
        most explorations.
      </p>

      <h2>What the criteria look for</h2>
      <p>
        The IB Math IA is marked out of 20 on five criteria. A and B are worth 4 marks
        each, C and D 3 marks each, and E 6 marks:
      </p>
      <ul>
        <li><strong>Criterion A: Presentation (4 marks).</strong> Is the exploration coherent, well organised and concise, with an introduction, a clearly described aim and a conclusion, and graphs and tables placed where they are discussed?</li>
        <li><strong>Criterion B: Mathematical communication (4 marks).</strong> Are notation, symbols and terminology correct, consistent and defined, and do you use more than one form of representation (formulae, diagrams, tables, graphs) where it helps?</li>
        <li><strong>Criterion C: Personal engagement (3 marks).</strong> Does the work show you thinking independently or creatively, presenting ideas in your own way or testing your own predictions, rather than reproducing a textbook treatment?</li>
        <li><strong>Criterion D: Reflection (3 marks).</strong> Do you discuss limitations, surprises, and what you would do differently? Is your thinking visible throughout?</li>
        <li><strong>Criterion E: Use of mathematics (6 marks).</strong> Is the mathematics relevant to the aim? Is it commensurate with the level of the course? Is it applied correctly? Do you show that you understand it, not only that you can carry it out?</li>
      </ul>
      <p>
        Take an SL exploration that scores 4, 4, 3, 3 and 5 on criteria A to E: 19 out of
        20. If its mathematics stays at the level of the course but shows only limited
        understanding (3 on Criterion E) and its reflection only describes the results (1 on
        Criterion D), the same exploration scores 15. This guide is about closing that gap.
      </p>

      <h2>An annotated IB Math IA example</h2>
      <p>
        Complete explorations with their marks and the moderator's reasoning are rarely public
        (the reasons are further down this page). Instead, here is one exploration followed
        through its key passages, each written twice: the way drafts often read, and the way the
        upper levels of the criteria describe it. We made up the exploration, the measurements and
        both versions to show the difference. The numbers are realistic but were not measured.
        They do not come from a student's IA, and no mark is claimed for either version.
      </p>
      <p>
        The exploration: the paper cone cups at a school water dispenser. For a fixed volume,
        which cone shape uses the least paper, and do the real cups use it? The mathematics is
        optimisation with derivatives, which is in the Analysis and Approaches SL syllabus, so
        read this as an SL exploration; at HL the same aim would need mathematics that shows
        the sophistication the HL descriptors ask for. The five criteria are the same for Applications and Interpretation.
      </p>
      <p>
        The central result, h = r√2, is a standard textbook exercise, so deriving it would show
        little personal engagement on its own. What makes the exploration the student's own is testing the
        result against real cups and following up what the test showed. The passages appear in
        the order they come in the exploration, so the criteria run A, B, E, C, D.
      </p>

      <AnnotatedExcerpt
        heading="The aim (Criterion A: Presentation)"
        weaker={<p>In this exploration I will be looking at cones and how they are used in real life, because cones are everywhere, from ice cream to traffic cones.</p>}
        stronger={<p>The paper cups at our school's water dispenser are cones, and the bin beside it fills with them every day, which made me wonder whether their shape wastes paper. Aim: for a cone that holds a fixed volume, find the ratio of height to radius for which the cone uses the least paper, and test whether these cups use it. I measured the cups, modelled the paper as the curved surface of a cone, and minimised that area using differentiation.</p>}
        why="Criterion A rewards an exploration that is coherent, well organised and concise, and the guide describes a well-organised exploration as one that has an introduction, describes its aim and has a conclusion. The weaker opening never states an aim: cones in real life is a topic, not a question. The stronger one gives a reason for the choice, which helps a reader follow it, then says what will be found, about which object and by what method, in three sentences a reader can hold on to for the rest of the exploration."
      />

      <AnnotatedExcerpt
        heading="Setting up the model (Criterion B: Mathematical communication)"
        weaker={<p>A = pi*r*sqrt(r^2+h^2) and V = 1/3pi r^2 h. I put h into A and differentiated on my calculator and got h = 1.41r.</p>}
        stronger={
          <>
            <p>Let r be the radius of the rim, h the height of the cone and l its slant height, all in cm (Figure 1), and let V be its volume in cm³, which is fixed; for the comparison later, V is the volume of the real cups. The paper forms the curved surface, of area A cm², where A = πrl and l = √(r² + h²), so</p>
            <p className="eq">A = πr√(r² + h²)<span>(1)</span></p>
            <p>The volume V = ⅓πr²h gives h = 3V/(πr²). Because A is positive, A is smallest where A² is smallest, and minimising A² avoids differentiating a square root. Substituting for h in (1) and squaring:</p>
            <p className="eq">A² = π²r⁴ + 9V²/r²<span>(2)</span></p>
            <figure>
              <svg viewBox="0 0 360 150" className="w-full max-w-md" role="img" aria-label="A cone with its rim radius r, height h and slant height l labelled, and its net, a sector of radius l whose arc has length 2πr">
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M70 15 L34.5 105.2 M70 15 L105.5 105.2" />
                  <ellipse cx="70" cy="108" rx="36" ry="16" />
                  <path d="M70 15 L70 108 M70 108 L106 108" strokeDasharray="4 3" />
                  <path d="M255 20 L345.8 61.9 A100 100 0 0 1 164.2 61.9 Z" />
                </g>
                <g fill="currentColor" fontSize="14" fontStyle="italic" stroke="var(--muted)" strokeWidth="4" paintOrder="stroke">
                  <text x="74" y="68">h</text>
                  <text x="80" y="105">r</text>
                  <text x="91" y="52">l</text>
                  <text x="203" y="37">l</text>
                  <text x="255" y="140" textAnchor="middle">2πr</text>
                </g>
              </svg>
              <figcaption className="text-sm text-muted-foreground mt-1">Figure 1. The cone, in the proportions of the real cup, and its net: a sector of radius l whose arc is the rim, of length 2πr.</figcaption>
            </figure>
          </>
        }
        why="Criterion B looks for relevant, appropriate and consistent notation and terminology, with key terms and variables defined, and it accepts calculator notation such as ^ and * only in software output. The stronger version defines every symbol with its units, labels the lengths on a diagram, numbers the equations it will refer back to, and explains the one step (minimising A² instead of A) that a reader might otherwise stop at."
      />

      <AnnotatedExcerpt
        heading="Finding the optimum (Criterion E: Use of mathematics)"
        weaker={<p>dA/dr = 0 so h = 1.41r, which is the minimum.</p>}
        stronger={
          <>
            <p>Differentiating (2) with respect to r:</p>
            <p className="eq">d(A²)/dr = 4π²r³ − 18V²/r³</p>
            <p>Setting this equal to zero gives r⁶ = 9V²/(2π²), which has exactly one positive solution. Substituting V = ⅓πr²h back in gives r⁶ = r⁴h²/2, so h² = 2r² and h = r√2 ≈ 1.41r. The second derivative, d²(A²)/dr² = 12π²r² + 54V²/r⁴, is positive for every r &gt; 0, so d(A²)/dr is increasing: it is negative before this point and positive after it. A² therefore decreases and then increases, and this stationary point gives the smallest curved surface area of any cone with this volume.</p>
          </>
        }
        why="Criterion E asks for relevant mathematics commensurate with the level of the course, used correctly and with understanding demonstrated. The weaker line asserts both the result and that it is a minimum without showing either. The stronger one derives the result, shows that it is a minimum rather than a maximum, and explains why it is the minimum over every cone of this volume. At HL this derivation still counts as commensurate, because SL content is part of the HL course, but it shows no sophistication, which the guide defines as HL mathematics or SL mathematics used in a way beyond what an SL student could reasonably be expected to do: level 5 asks for sophistication or rigour, and level 6 for precise mathematics with both."
      />

      <AnnotatedExcerpt
        heading="Testing it against the real cups (Criterion C: Personal engagement)"
        weaker={<p>I found online that cone cups are about 7 cm wide and 9 cm tall, so they are not the optimal shape. I found this very interesting, because I have always been interested in maths and in how things are designed.</p>}
        stronger={<p>I expected a manufacturer to minimise paper, so I predicted that the cups would be close to h = 1.41r. The cup in my hand already disagreed: h = 1.41r gives a cone about 1.4 times as wide as it is deep, and these cups are deeper than they are wide. To find out how far apart they are, I measured ten cups with vernier callipers. The paper gives slightly under the jaws, so I read each length only to the nearest millimetre: the rim diameters ranged from 6.9 cm to 7.1 cm and the heights from 8.8 cm to 9.1 cm, with means of 7.00 cm and 9.00 cm; I took r = 3.50 cm, h = 9.00 cm and V = 115.5 cm³. The real cup has h/r = 2.57, far from 1.41. For this volume the optimum is r = 4.27 cm and h = 6.04 cm, which would use 99.3 cm² of paper instead of the real cup's 106.2 cm², 6.5% less. To see what that saving would cost, I cut out and built the optimal cone. Its net is a sector of 208°, against 130° for the real cup, and the cone is 8.5 cm across but only 6.0 cm deep: a bowl rather than a cup.</p>}
        why="Saying you are interested earns nothing on Criterion C: the guide looks for engagement shown in the work. The stronger passage checks the result against the object in the student's hand, measures to find out how far apart they are, and builds the optimal cone to see what the saving would cost."
      />

      <AnnotatedExcerpt
        heading="What the result means (Criterion D: Reflection)"
        weaker={<p>My model was accurate and I found the optimal cup. If I did this again, I would measure more cups.</p>}
        stronger={<p>The model answers a narrower question than the cup's designers faced. It counts only the curved surface, but a real cup uses paper in two more places. The glued overlap along the seam runs the length of the slant height, 9.66 cm on the real cup against 7.40 cm on the optimal one, so it favours the optimal shape and would make the saving larger. The rolled rim runs round the circumference, 22.0 cm on the real cup against 26.8 cm on the optimal one, so it favours the real cup and would make the saving smaller. I have not measured the width of either yet. Even ignoring the seam, the rim would cancel the 6.9 cm² saving only if its strip were at least 1.2 cm wide (a strip of width w extends the cone past its rim and adds πrw(2l + w)/l of paper). The rolled rim looks only a few millimetres across, but rolling hides the paper inside it, so this is the first thing to measure, by unrolling a cup. More importantly, the optimum ignores how the cup is used: a wide, shallow cone is harder to hold and spills more easily, and a saving of 6.5% of the paper is probably not worth that, which suggests the designers optimised for use rather than material. A next step would be to add the seam and the rim to the model as strips of measured width and see where the optimum moves.</p>}
        why="Describing results is limited reflection. The stronger passage evaluates the model's assumptions, says which way each would move the answer, weighs the result against the real problem, and proposes a specific next step: critical reflection in the sense of Criterion D. In a full exploration, reflection like this runs through the work instead of waiting for the last page."
      />

      <p>
        Each passage is shown under one criterion, but every criterion is judged across the whole
        exploration, and most drafts sit somewhere between the two versions. The useful question
        is which passages in yours still read like the weaker one: the <Link href="/essay/math-ia">Math IA grader</Link> marks
        your own draft criterion by criterion and points to them.
      </p>

      <h2>IB Math IA topic ideas for AA and AI</h2>

      <h3>Analysis and Approaches (AA), SL and HL: topics that work</h3>

      <h4>1. Modelling the spread of a rumour using differential equations</h4>
      <p>
        This classic exploration uses a logistic differential equation to model how
        information spreads through a population. It suits AA HL: solving the logistic
        differential equation by separating variables is additional higher level content (AHL 5.18). A student who chooses a real data
        source, such as post counts from a news story that went viral, gives Personal
        engagement something to reward: the context is self-chosen and the data set is
        one they assembled. The mathematics involves solving the logistic equation,
        fitting parameters to data, and comparing the model against observed values.
        At HL, level 5 of Criterion E asks for correct mathematics that shows sophistication
        or rigour, and level 6 for precise mathematics that shows sophistication and rigour,
        both with thorough knowledge and understanding. Going beyond the syllabus, for
        example with a model that adds a time delay, helps only if it serves the aim and
        is fully understood; the guide does not require mathematics beyond the syllabus
        for the highest levels.
      </p>
      <p>
        <em>Common mistake:</em> reproducing the textbook logistic model step by step
        tends to score low on Criterion C. Engagement shows in what you do with the
        model: testing a prediction against real figures, questioning an assumption,
        or trying a second approach and comparing them.
      </p>

      <h4>2. Investigating the golden ratio in architecture or music</h4>
      <p>
        A perennially popular topic, but one that frequently scores low because
        students state that golden ratio connections "prove" aesthetic preference
        without measuring anything systematically. A stronger version measures a
        defined set of buildings or compositions, chosen before looking for φ, computes
        the ratios and compares their mean with φ ≈ 1.618, using their standard deviation to
        judge whether the gap is large, then reflects honestly on whether the data supports
        the claim. Correlation does not
        answer this question: two dimensions can be almost perfectly correlated while their
        ratio is nowhere near φ. Ratios, a mean and a standard deviation are the most elementary
        statistics in AA and are unlikely to carry Criterion E on their own, so an AA version
        needs more, for example the regression line of the longer dimension on the shorter:
        if every ratio were φ, the line would have gradient φ and pass through the origin, so
        compare the gradient with φ and check that the intercept is close to zero, because a
        gradient near φ with a large intercept means the ratios are not φ. At HL, a proof by
        induction of Binet's formula for the Fibonacci numbers could add the rigour the upper
        levels look for. Hypothesis tests are not in the AA syllabus, so an AA
        student who uses one must show they understand it. Reflection such as "the ratios
        cluster around 1.5, not 1.618, which suggests…" is the kind of thinking Criterion D
        rewards.
      </p>

      <h4>3. Optimisation of a packaging design</h4>
      <p>
        Calculus-based optimisation is reliable AA SL content. A student who chooses a
        product they actually use (a protein bar wrapper, a tea tin, a particular shoe
        box) and measures its real dimensions before comparing them with the theoretical
        optimum gives Criterion C real evidence. The mathematics should justify the
        optimum, for example with a second derivative test, rather than only find it. At
        HL a single optimisation like this uses only SL techniques: it is part of the HL
        course, but on its own it shows none of the sophistication that level 6 of Criterion E
        requires, so an HL version needs more, for example a container whose volume has to be
        found as a volume of revolution (AHL 5.17).
      </p>

      <h3>Applications and Interpretation (AI), SL and HL: topics that work</h3>

      <h4>4. Regression analysis of Premier League goal data</h4>
      <p>
        An AI exploration built around regression is appropriate if the variables have
        a plausible relationship and the student goes beyond a single regression line.
        A strong version compares linear, quadratic, and exponential models, uses
        residual analysis to evaluate fit, and discusses which model is most appropriate
        and why. Non-linear regression, the sum of squared residuals and R² are HL content
        in Applications and Interpretation (AHL 4.13), so at SL use them only if you can show
        you understand them. A chi-squared test for independence between venue (home or away)
        and result (win or no win) for one club over several seasons can add a second strand
        of analysis; it is in the syllabus at both SL and HL. Keep to one club: a table built
        from both teams in every match pairs each home win with an away loss, so its
        observations are not independent.
      </p>

      <h4>5. Using Voronoi diagrams to optimise emergency service locations</h4>
      <p>
        Voronoi diagrams are in the AI syllabus at both SL and HL. An exploration that
        applies them to a real map, such as the nearest ambulance station for each
        district of a city or the nearest recycling point in a neighbourhood, works well
        because the application is practical and the mathematics is used rather than
        described. The student should take the stations' positions from a real map,
        construct the Voronoi cells from perpendicular bisectors, find the point furthest
        from every existing station (the syllabus's toxic waste dump problem, solved at a
        Voronoi vertex or on the boundary) as the site for a new one, and reflect on what
        straight-line distance ignores (traffic, road layout, capacity constraints).
      </p>

      <h4>6. Comparing body mass index between two age groups</h4>
      <p>
        A statistics-heavy AI exploration using publicly available health data. The
        student needs individual-level data, not published averages, for two age groups,
        applies the course's pooled two-sample t-test to compare their mean BMI, and checks
        what that test assumes: independent samples, similar variances in the two groups,
        and roughly normal data, which BMI often is not, although with large samples the
        sample means are close to normal anyway. The key to
        Criterion D here is recognising that statistical significance is not the same as
        practical significance: with a large sample, a difference too small to matter can
        still be significant.
      </p>

      <h2>Structure of a high-scoring IB Math IA</h2>
      <p>
        Your teacher marks the exploration and a moderator may read it cold. A clear
        structure shows organisation (Criterion A) and makes the mathematics easier to
        follow (Criterion B). This structure works for most explorations:
      </p>
      <ol>
        <li><strong>Introduction:</strong> why this topic, and what the aim is. State the aim explicitly. Do not start with "Mathematics is everywhere."</li>
        <li><strong>Background mathematics (optional):</strong> only the theory a reader needs to follow your exploration, not textbook definitions of things your reader already knows.</li>
        <li><strong>Exploration (most of the work):</strong> your calculations, models, graphs and reasoning. Show working, label every figure, and explain what each step means, not just what it is.</li>
        <li><strong>Reflection:</strong> what you found, what surprised you, the limitations of your model, and what you would do differently. Reflection that runs through the exploration counts, not only a closing section.</li>
        <li><strong>Conclusion:</strong> what you found in relation to your aim, with no new material.</li>
        <li><strong>Bibliography:</strong> cite every data source, textbook and website you used.</li>
      </ol>
      <p>
        Length: the guide suggests approximately 12 to 20 pages with double line spacing,
        including diagrams and graphs but not the bibliography, and adds that the quality
        of the mathematical writing matters, not the length.
      </p>

      <h2>The most common reasons IB Math IAs score below expectations</h2>

      <h3>Choosing a topic that is too broad</h3>
      <p>
        "The mathematics of climate change" cannot be explored in 20 pages. A focused
        question can, with a specific dataset: does a linear or an exponential model better
        fit the decline in September Arctic sea ice extent since 1979? Narrow your aim to
        something you can answer with the mathematics you know.
      </p>

      <h3>Listing results without explaining them</h3>
      <p>
        A student who writes "the derivative is 2x, therefore the minimum is at x=0"
        without explaining why this matters for the aim is losing marks on Criteria E and D:
        Use of mathematics asks for understanding to be demonstrated, and Reflection for results
        linked to the aim. Every result should be connected back to the research question.
      </p>

      <h3>Copying a well-known example</h3>
      <p>
        The "SIR model for disease spread" and the "mathematics of music and Fourier
        series" are familiar to anyone who marks IAs, and teachers and moderators
        recognise them quickly. If you choose a familiar topic, Criterion C depends on showing
        your own thinking: an unusual angle, predictions you test yourself, or a question the
        standard treatment does not ask.
      </p>

      <h3>Weak or absent reflection</h3>
      <p>
        A 1 on Criterion D is one of the most preventable mark losses in the Math IA.
        Students who write one paragraph at the end saying "in conclusion, my model
        was reasonably accurate" are describing, not reflecting. Reflection means
        asking: what did I assume? What could go wrong? How does this connect to
        real-world constraints? What mathematics could extend this exploration?
      </p>

            <ExamplesBridge
        workLabel="Math IA"
        ctaHref="/essay/math-ia"
        rows={[
          { criterion: "A: Presentation", typical: "Sections exist, but the reader has to reconstruct what the exploration is trying to find out.", top: "The aim is visible from the first page and the exploration stays coherent and concise around it." },
          { criterion: "B: Mathematical communication", typical: "Notation drifts, symbols appear undefined, graphs are unlabelled.", top: "Notation and terminology are correct throughout; every graph and table is labelled and referred to in the text." },
          { criterion: "C: Personal engagement", typical: "The introduction asserts that the topic is interesting to the student.", top: "Engagement is shown, not claimed: own data, an extension nobody assigned, an approach chosen independently." },
          { criterion: "D: Reflection", typical: "The ending summarises what was done.", top: "The reflection evaluates the mathematics itself, its limits, and what the result does not establish." },
          { criterion: "E: Use of mathematics", typical: "Routine procedures, correctly executed, only just at the level of the course.", top: "Mathematics commensurate with the level, and clearly understood rather than merely performed." },
        ]}
      />

      <h2>Internal Assessment in other subjects</h2>

      <ul>
        <li><Link href="/resources/ib-biology-ia-examples">Biology IA examples</Link></li>
        <li><Link href="/resources/ib-chemistry-ia-examples">Chemistry IA examples</Link></li>
        <li><Link href="/resources/ib-physics-ia-examples">Physics IA examples</Link></li>
        <li><Link href="/resources/ib-ia-feedback">Check your IA against the criteria</Link></li>
      </ul>

    </ResourceArticle>
  );
}
