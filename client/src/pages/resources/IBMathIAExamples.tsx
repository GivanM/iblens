import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function IBMathIAExamples() {
  return (
    <ResourceArticle
      title="IB Math IA Examples — High-Scoring Topics, Structures & Common Mistakes | IBLens"
      description="Real IB Math IA examples with examiner commentary. Understand what a 7-scoring Math Internal Assessment looks like and how to structure yours."
      canonical="/resources/ib-math-ia-examples"
      datePublished="2026-06-09"
      dateModified="2026-06-09"
    >
      <p>
        The IB Mathematics Internal Assessment is worth 20% of your final grade — and
        it is the one component where you control the topic, the approach, and the
        depth of exploration. That freedom is also what makes it difficult. Most
        students who score below a 6 do so not because their mathematics is wrong, but
        because their exploration lacks personal engagement, mathematical sophistication,
        or a clearly communicated aim. This guide walks through what high-scoring IB Math
        IA examples actually look like and how to replicate their structure.
      </p>

      <h2>What the Examiner Is Looking For</h2>
      <p>
        The IB Math IA is marked on five criteria, each worth a maximum of 4 marks
        (except Criterion E which is 6):
      </p>
      <ul>
        <li><strong>Criterion A — Presentation (4 marks):</strong> Is the work well-organized, clearly written, and appropriately concise? Is there a table of contents and a bibliography?</li>
        <li><strong>Criterion B — Mathematical Communication (4 marks):</strong> Are mathematical symbols, notation, and diagrams used correctly and consistently?</li>
        <li><strong>Criterion C — Personal engagement (3 marks):</strong> Does the exploration reflect your genuine curiosity? Is the approach original rather than a textbook rehash?</li>
        <li><strong>Criterion D — Reflection (3 marks):</strong> Do you discuss limitations, surprises, and what you would do differently? Is your thinking visible throughout?</li>
        <li><strong>Criterion E — Use of Mathematics (6 marks):</strong> Is the mathematics relevant to the aim? Is it commensurate with the level of the course? Is it applied correctly?</li>
      </ul>
      <p>
        A student who scores 4, 4, 3, 3, 5 = 19/20 has a high chance of a 7 on the IA.
        A student with correct but shallow mathematics (Criterion E = 3) combined with
        no reflection (Criterion D = 1) ends up around 14/20 — which is a 5 or low 6.
      </p>

      <h2>IB Math IA Examples by Topic Area</h2>

      <h3>Analysis and Approaches (AA) HL/SL — Strong Topic Examples</h3>

      <h4>1. Modelling the spread of a rumour using differential equations</h4>
      <p>
        This classic exploration uses a logistic differential equation to model how
        information spreads through a population. A student who chooses a real
        data source — for instance, tweet counts from a viral news event — scores
        highly on the personal-context element of Research design because the context is self-selected and
        the data is original. The mathematics involves solving the logistic equation,
        fitting parameters to data, and comparing the model against observed values.
        At HL, this can be extended to include a delayed-response model (a delay
        differential equation), pushing Criterion E toward 5 or 6.
      </p>
      <p>
        <em>Common mistake:</em> Students who simply write out the logistic model without
        collecting their own data score 2 on Criterion C. The personal engagement
        comes from the student's specific choice of context and data, not from the
        mathematics alone.
      </p>

      <h4>2. Investigating the golden ratio in architecture or music</h4>
      <p>
        A perennially popular topic — but one that frequently scores low because
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
        product they actually use — a protein bar wrapper, a tea tin, a specific shoe
        box — and measures real dimensions before comparing against the theoretical
        optimum earns strong marks on Criterion C. The mathematics should include
        second derivative tests and, for HL, possibly Lagrange multipliers if the
        constraint is complex.
      </p>

      <h3>Applications and Interpretation (AI) HL/SL — Strong Topic Examples</h3>

      <h4>4. Regression analysis of Premier League goal data</h4>
      <p>
        An AI exploration built around regression is appropriate if the variables have
        a plausible relationship and the student goes beyond a single regression line.
        A strong version compares linear, quadratic, and exponential models, uses
        residual analysis to evaluate fit, and discusses which model is most appropriate
        and why. At HL, adding a chi-squared test for independence between two
        categorical variables (e.g., home/away result versus number of shots on target)
        strengthens Criterion E.
      </p>

      <h4>5. Using Voronoi diagrams to optimise emergency service locations</h4>
      <p>
        Voronoi diagrams appear explicitly in the AI HL syllabus. An exploration
        that applies Voronoi tessellation to a real map — choosing the nearest ambulance
        station for each postcode in a city, or the nearest recycling point in a
        neighbourhood — scores well because the application is practical and the
        mathematics is used rather than described. The student should measure real
        distances, compute the Voronoi cells, and reflect on what the model ignores
        (traffic, road layout, capacity constraints).
      </p>

      <h4>6. Analysing body mass index data across age groups using statistics</h4>
      <p>
        A statistics-heavy AI exploration using publicly available health data. The
        student collects or downloads data, applies t-tests or ANOVA to compare
        distributions, and reflects on whether the statistical differences are
        meaningful in context. The key to Criterion D here is acknowledging that
        statistical significance does not equal practical significance — a nuance
        that signals genuine mathematical understanding.
      </p>

      <h2>Structure of a High-Scoring IB Math IA</h2>
      <p>
        Examiners read hundreds of IAs. A clear structure signals organisation (Criterion A)
        and makes the mathematics easier to follow (Criterion B). The following
        structure appears in most top-scoring explorations:
      </p>
      <ol>
        <li><strong>Introduction (150–250 words):</strong> Why this topic? What is the aim? State your research question explicitly. Do not start with "Mathematics is everywhere."</li>
        <li><strong>Background mathematics (optional, 200–400 words):</strong> Explain only the theory a reader needs to follow your exploration. Do not include textbook definitions of concepts your reader already knows.</li>
        <li><strong>Exploration (the bulk, 800–1500 words):</strong> Your calculations, models, graphs, and reasoning. Show working. Label every figure. Explain what each step means, not just what it is.</li>
        <li><strong>Reflection (200–400 words):</strong> What did you find? Were you surprised? What are the limitations of your model? What would you do differently?</li>
        <li><strong>Conclusion (100–200 words):</strong> Restate what you found in relation to your aim. Do not introduce new material here.</li>
        <li><strong>Bibliography:</strong> Cite every data source, textbook, and website you used.</li>
      </ol>
      <p>
        Total length: 12–20 pages including figures, or roughly 2000–4000 words of prose.
        Going over 4000 words rarely improves scores and often signals that the student
        included padding rather than depth.
      </p>

      <h2>The Most Common Reasons IB Math IAs Score Below Expectations</h2>

      <h3>Choosing a topic that is too broad</h3>
      <p>
        "The mathematics of climate change" cannot be explored in 20 pages. A focused
        version — "modelling the rate of Arctic ice loss using exponential decay" with
        a specific dataset — can. Narrow your aim to something you can actually answer
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
        series" are among the most submitted IA topics. Examiners recognise them
        immediately. If you choose a familiar topic, you need an original data source,
        an unusual angle, or a self-collected dataset to score well on Criterion C.
      </p>

      <h3>Weak or absent reflection</h3>
      <p>
        Criterion D = 1 is the single most preventable mark loss in the Math IA.
        Students who write one paragraph at the end saying "in conclusion, my model
        was reasonably accurate" are describing, not reflecting. Reflection means
        asking: what did I assume? What could go wrong? How does this connect to
        real-world constraints? What mathematics could extend this exploration?
      </p>

      <h2>How Your IA Draft Compares to the Rubric</h2>
      <p>
        Reading high-scoring IB Math IA examples is useful — but the gap between
        understanding a strong example and writing one yourself is where most marks
        are lost. When you have a draft, the most efficient use of your time is
        to get criterion-by-criterion feedback: exactly where is Criterion D weak?
        Is your Criterion B notation consistent throughout? Are there places where
        the mathematical reasoning is unclear?
      </p>
      <p>
        IBLens analyses your IB essay or IA draft against the official IB marking
        criteria and identifies precisely where marks are being lost — before your
        teacher submits your final grade.
      </p>
      <p>
        <Link to="/essay">Upload your Math IA draft to IBLens for rubric-based feedback →</Link>
      </p>
    </ResourceArticle>
  );
}
