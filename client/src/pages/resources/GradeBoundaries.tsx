import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function GradeBoundaries() {
  return (
    <ResourceArticle
      title="IB Grade Boundaries Explained: How IB Scoring Works | IBLens"
      description="How IB grade boundaries work: the 1 to 7 scale, how subject grades and the EE and TOK bonus points make up the 45-point Diploma score, and why boundaries move every session."
      canonical="/resources/ib-grade-boundaries"
      datePublished="2026-05-01"
      dateModified="2026-05-01"
    >
      <h1>IB Grade Boundaries Explained</h1>

      <p>
        The IB scoring system confuses students and parents alike. Each subject is graded from 1 to 7, the Extended Essay and Theory of Knowledge add up to 3 bonus points, and the raw marks needed for each grade change from one examination session to the next. This guide explains how those pieces fit together, from a single subject grade to the final Diploma score.
      </p>

      <h2>How the 7-Point Scale Works</h2>

      <p>
        Each IB subject is graded from 1 (lowest) to 7 (highest). The grades are not percentages: a 7 does not mean 70% or any other fixed share of the marks. After each session the IB sets grade boundaries, the minimum total mark needed for each grade, taking into account how demanding that session's papers turned out to be.
      </p>

      <p>
        Boundaries differ between subjects, between SL and HL, and between sessions, so no single percentage table applies to every subject. The boundaries for each session are published to schools after marking, and your teacher can tell you where they fell for your subject in recent sessions. Treat an older session's boundaries as a guide, not a promise.
      </p>

      <p>
        This is why nobody can tell you your exact grade during the course. You can estimate from past boundaries, but the boundaries that count are only fixed once that session's marking is complete.
      </p>

      <h2>How Subject Grades Combine into the Diploma Score</h2>

      <p>
        The Diploma score adds your six subject grades to the bonus points from the Extended Essay and TOK:
      </p>

      <ul>
        <li>6 subjects × 7 points maximum = <strong>42 points</strong></li>
        <li>Bonus points from the EE and TOK = <strong>3 points maximum</strong></li>
        <li><strong>Total maximum: 45 points</strong></li>
      </ul>

      <p>
        The Diploma is not awarded if any of the following applies, whatever the total:
      </p>

      <ul>
        <li>The CAS requirements have not been met</li>
        <li>The total is fewer than 24 points</li>
        <li>An "N" has been given for TOK, the EE or a contributing subject</li>
        <li>A grade E has been awarded for TOK, the EE or both</li>
        <li>A grade 1 has been awarded in any subject</li>
        <li>Grade 2 has been awarded three or more times</li>
        <li>Grade 3 or below has been awarded four or more times</li>
        <li>Fewer than 12 points on HL subjects (with four HL subjects, the three highest grades count)</li>
        <li>Fewer than 9 points on SL subjects (with only two SL subjects, at least 5 points at SL)</li>
      </ul>

      <p>
        So a student can reach 24 points and still not receive the Diploma, for example with a grade 1 in one subject. Students who are not awarded the Diploma receive DP Course Results for the subjects they completed.
      </p>

      <h2>What Moves a Boundary</h2>

      <p>
        A boundary is set for a subject and level as a whole, after all its components are marked. Two things are worth knowing about how that plays out in practice.
      </p>

      <h3>Coursework counts towards the same total</h3>
      <p>
        The internally assessed component is part of the total that the boundary is applied to. In the sciences and mathematics it is worth 20% of the grade, and more in some subjects, such as 30% of Economics at SL. Marks secured on the IA before the exams are marks you do not have to find on the papers.
      </p>

      <h3>Full marks are not required for a 7</h3>
      <p>
        Because boundaries are set below the maximum, a 7 does not require a perfect performance on every paper, in any subject. Where exactly the line falls depends on the session, so the useful question is how close your own marks are to it, which your teacher can help you judge.
      </p>

      <h2>Bonus Points from the EE and TOK Matrix</h2>

      <p>
        The Extended Essay and Theory of Knowledge are each graded from A to E. The two grades are combined in a matrix that gives 0 to 3 bonus points:
      </p>

      <table>
        <thead>
          <tr>
            <th>TOK ↓ / EE →</th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>
            <th>E</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>A</strong></td>
            <td>3</td>
            <td>3</td>
            <td>2</td>
            <td>2</td>
            <td>Fail</td>
          </tr>
          <tr>
            <td><strong>B</strong></td>
            <td>3</td>
            <td>2</td>
            <td>2</td>
            <td>1</td>
            <td>Fail</td>
          </tr>
          <tr>
            <td><strong>C</strong></td>
            <td>2</td>
            <td>2</td>
            <td>1</td>
            <td>0</td>
            <td>Fail</td>
          </tr>
          <tr>
            <td><strong>D</strong></td>
            <td>2</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>Fail</td>
          </tr>
          <tr>
            <td><strong>E</strong></td>
            <td>Fail</td>
            <td>Fail</td>
            <td>Fail</td>
            <td>Fail</td>
            <td>Fail</td>
          </tr>
        </tbody>
      </table>

      <p>
        What the matrix means in practice:
      </p>

      <ul>
        <li>An E in either TOK or the EE means the Diploma is not awarded, regardless of total points.</li>
        <li>The maximum 3 points needs an A in one component and at least a B in the other.</li>
        <li>B and B, or B and C, give 2 points. A single point comes from B with D, or C with C.</li>
        <li>Three bonus points are worth as much as half a grade in each of your six subjects.</li>
      </ul>

      <p>
        That is why your <Link href="/resources/ib-extended-essay-guide" className="text-primary hover:underline">Extended Essay</Link> and <Link href="/resources/tok-essay-guide" className="text-primary hover:underline">TOK essay</Link> deserve real attention: both are submitted work with no exam-day pressure, and they are worth up to 3 points between them.
      </p>

      <h2>Totals and University Offers</h2>

      <p>
        Universities set their own requirements for each course, and many care as much about grades in particular HL subjects as about the total. A UK offer, for example, can read "38 points including 766 at HL, with a 7 in Chemistry". A student on 38 points who meets those HL grades can hold an offer that a student on 40 points with the wrong HL grades does not.
      </p>

      <p>
        Requirements change, so use the university's own course page, and UCAS for UK courses, as the source for the course you are applying to. If you are writing a UCAS personal statement, our <Link href="/ucas-personal-statement" className="text-primary hover:underline">checker</Link> reviews it against the three-question format used from 2026 entry.
      </p>

      <h2>Where Your Effort Moves the Score</h2>

      <p>
        <strong>Internal Assessments:</strong> the IA is the part of each grade you work on over weeks rather than in an exam hall. Your teacher can comment on a draft, and you can check it against the criteria yourself or with a tool like <Link href="/essay" className="text-primary hover:underline">IBLens</Link> before you submit.
      </p>

      <p>
        <strong>The EE and TOK:</strong> an A in the EE and a B in TOK, or the other way round, gives the full 3 bonus points.
      </p>

      <p>
        <strong>Boundaries:</strong> if you sit close to the line between two grades in a subject, one or two marks on the IA or a paper can move you across it. Knowing roughly where the line has fallen before helps you decide where to spend revision time.
      </p>

      <p>
        For more on how essays and IAs are marked, see <Link href="/resources/ib-essay-criteria-explained" className="text-primary hover:underline">IB Essay Criteria Explained</Link> and the <Link href="/resources/ib-internal-assessment-guide" className="text-primary hover:underline">Internal Assessment Guide</Link>.
      </p>
      <h2>After results day</h2>

      <ul>
        <li><Link href="/remark">Is an IB remark worth it?</Link></li>
        <li><Link href="/resources/ib-score-calculator">IB Score Calculator</Link></li>
        <li><Link href="/resources/ib-ia-score-predictor">IA Score Predictor</Link></li>
      </ul>

    </ResourceArticle>
  );
}
