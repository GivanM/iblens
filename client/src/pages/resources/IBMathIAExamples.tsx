import { ResourceArticle } from "@/components/ResourceArticle";
import { ExamplesBridge } from "@/components/ExamplesBridge";
import { Link } from "wouter";

export default function IBMathIAExamples() {
  return (
    <ResourceArticle
      title="IB Math IA Examples: Topics, Structure and Common Mistakes | IBLens"
      description="IB Math IA topic ideas for Analysis and Approaches and for Applications and Interpretation, what each of the five criteria rewards, and the mistakes that cost marks."
      canonical="/resources/ib-math-ia-examples"
      datePublished="2026-06-09"
      dateModified="2026-06-09"
    >
      <p>
        The IB Mathematics Internal Assessment is worth 20% of your final grade, and
        it is the one component where you control the topic, the approach, and the
        depth of exploration. That freedom is also what makes it difficult. Explorations
        that lose marks usually do so not because the mathematics is wrong, but because
        they lack personal engagement, mathematics at the level of the course, or a
        clearly communicated aim. This guide walks through what high-scoring IB Math
        IA examples actually look like and how to replicate their structure.
      </p>

      <h2>What the Examiner Is Looking For</h2>
      <p>
        The IB Math IA is marked out of 20 on five criteria. A and B are worth 4 marks
        each, C and D 3 marks each, and E 6 marks:
      </p>
      <ul>
        <li><strong>Criterion A: Presentation (4 marks).</strong> Is the work well-organised, clearly written, and appropriately concise? Is there a table of contents and a bibliography?</li>
        <li><strong>Criterion B: Mathematical communication (4 marks).</strong> Are mathematical symbols, notation, and diagrams used correctly and consistently?</li>
        <li><strong>Criterion C: Personal engagement (3 marks).</strong> Does the exploration reflect your genuine curiosity? Is the approach original rather than a textbook rehash?</li>
        <li><strong>Criterion D: Reflection (3 marks).</strong> Do you discuss limitations, surprises, and what you would do differently? Is your thinking visible throughout?</li>
        <li><strong>Criterion E: Use of mathematics (6 marks).</strong> Is the mathematics relevant to the aim? Is it commensurate with the level of the course? Is it applied correctly?</li>
      </ul>
      <p>
        Marks of 4, 4, 3, 3 and 5 make 19 out of 20. Correct but routine mathematics
        (3 on Criterion E) together with almost no reflection (1 on Criterion D) brings
        the same exploration down to around 14, and those are the marks this guide is
        about.
      </p>

      <h2>IB Math IA Examples by Topic Area</h2>

      <h3>Analysis and Approaches (AA), SL and HL: topics that work</h3>

      <h4>1. Modelling the spread of a rumour using differential equations</h4>
      <p>
        This classic exploration uses a logistic differential equation to model how
        information spreads through a population. A student who chooses a real data
        source, such as post counts from a news story that went viral, gives Personal
        engagement something to reward: the context is self-chosen and the data is
        their own. The mathematics involves solving the logistic equation,
        fitting parameters to data, and comparing the model against observed values.
        At HL, this can be extended to include a delayed-response model (a delay
        differential equation), pushing Criterion E toward 5 or 6.
      </p>
      <p>
        <em>Common mistake:</em> writing out the logistic model without any data of your
        own tends to score low on Criterion C. The personal engagement
        comes from the student's specific choice of context and data, not from the
        mathematics alone.
      </p>

      <h4>2. Investigating the golden ratio in architecture or music</h4>
      <p>
        A perennially popular topic, but one that frequently scores low because
        students state that golden ratio connections "prove" aesthetic preference
        without using any statistical testing. A high-scoring version tests whether
        the ratio appears in a specific set of buildings or musical compositions using
        hypothesis testing or regression, then reflects honestly on whether the data
        supports the claim. The reflection ("the correlation was weaker than expected,
        which suggests…") is what earns marks on Criterion D.
      </p>

      <h4>3. Optimisation of a packaging design</h4>
      <p>
        Calculus-based optimisation is reliable AA content. A student who chooses a
        product they actually use (a protein bar wrapper, a tea tin, a particular shoe
        box) and measures its real dimensions before comparing them with the theoretical
        optimum gives Criterion C real evidence. The mathematics should justify the
        optimum, for example with a second derivative test, rather than only find it.
      </p>

      <h3>Applications and Interpretation (AI), SL and HL: topics that work</h3>

      <h4>4. Regression analysis of Premier League goal data</h4>
      <p>
        An AI exploration built around regression is appropriate if the variables have
        a plausible relationship and the student goes beyond a single regression line.
        A strong version compares linear, quadratic, and exponential models, uses
        residual analysis to evaluate fit, and discusses which model is most appropriate
        and why. A chi-squared test for independence between two categorical variables,
        such as home or away and whether the match was won, can add a second strand of
        analysis; it is in the syllabus at both SL and HL.
      </p>

      <h4>5. Using Voronoi diagrams to optimise emergency service locations</h4>
      <p>
        Voronoi diagrams are in the AI syllabus at both SL and HL. An exploration that
        applies them to a real map, such as the nearest ambulance station for each
        district of a city or the nearest recycling point in a neighbourhood, works well
        because the application is practical and the mathematics is used rather than
        described. The student should measure real
        distances, compute the Voronoi cells, and reflect on what the model ignores
        (traffic, road layout, capacity constraints).
      </p>

      <h4>6. Analysing body mass index data across age groups using statistics</h4>
      <p>
        A statistics-heavy AI exploration using publicly available health data. The
        student collects or downloads data, applies t-tests or ANOVA to compare
        distributions, and reflects on whether the statistical differences are
        meaningful in context. The key to Criterion D here is acknowledging that
        statistical significance is not the same as practical significance, which shows
        real understanding of what the test can and cannot tell you.
      </p>

      <h2>Structure of a High-Scoring IB Math IA</h2>
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
        <li><strong>Bibliography:</strong> Cite every data source, textbook, and website you used.</li>
      </ol>
      <p>
        Length: the guide suggests approximately 12 to 20 pages with double line spacing,
        including diagrams and graphs but not the bibliography, and adds that the quality
        of the mathematical writing matters, not the length.
      </p>

      <h2>The Most Common Reasons IB Math IAs Score Below Expectations</h2>

      <h3>Choosing a topic that is too broad</h3>
      <p>
        "The mathematics of climate change" cannot be explored in 20 pages. A focused
        version, "modelling the rate of Arctic ice loss using exponential decay" with
        a specific dataset, can. Narrow your aim to something you can actually answer
        with the mathematics you know.
      </p>

      <h3>Listing results without explaining them</h3>
      <p>
        A student who writes "the derivative is 2x, therefore the minimum is at x=0"
        without explaining why this matters for the aim is scoring low on Criterion B
        and D. Every result should be connected back to the research question.
      </p>

      <h3>Copying a well-known example</h3>
      <p>
        The "SIR model for disease spread" and the "mathematics of music and Fourier
        series" are familiar to anyone who marks IAs, and teachers and moderators
        recognise them quickly. If you choose a familiar topic, you need an original data source,
        an unusual angle, or a self-collected dataset to score well on Criterion C.
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
          { criterion: "E: Use of mathematics", typical: "Routine procedures, correctly executed, at the edge of the syllabus.", top: "Mathematics commensurate with the level, and clearly understood rather than merely performed." },
        ]}
      />

      <h2>How Your IA Draft Compares to the Rubric</h2>
      <p>
        Reading high-scoring IB Math IA examples is useful, but the gap between
        understanding a strong example and writing one yourself is where most marks
        are lost. When you have a draft, the most efficient use of your time is
        to get criterion-by-criterion feedback: exactly where is Criterion D weak?
        Is your Criterion B notation consistent throughout? Are there places where
        the mathematical reasoning is unclear?
      </p>
      <p>
        IBLens reads your Math IA draft against the assessment criteria and shows which
        criterion is losing you the most marks, while you can still change the draft.
      </p>
      <p>
        <Link href="/essay/math-ia">Paste your Math IA draft into IBLens for criterion-by-criterion feedback →</Link>
      </p>
      <h2>Internal Assessment in other subjects</h2>

      <ul>
        <li><Link href="/resources/ib-biology-ia-examples">Biology IA Examples</Link></li>
        <li><Link href="/resources/ib-chemistry-ia-examples">Chemistry IA Examples</Link></li>
        <li><Link href="/resources/ib-physics-ia-examples">Physics IA Examples</Link></li>
        <li><Link href="/resources/ib-ia-feedback">Check your IA against the criteria</Link></li>
      </ul>

    </ResourceArticle>
  );
}
