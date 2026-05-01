import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function GradeBoundaries() {
  return (
    <ResourceArticle
      title="IB Grade Boundaries Explained — How IB Scoring Works"
      description="Understand how IB grade boundaries work: the 7-point scale, how subject scores combine, bonus points from EE/TOK, and what different total scores mean for university admissions."
      canonical="/resources/ib-grade-boundaries"
      datePublished="2026-05-01"
      dateModified="2026-05-01"
    >
      <h1>IB Grade Boundaries Explained</h1>

      <p>
        One of the most confusing aspects of the IB Diploma Programme for students and parents is the scoring system. Unlike national curricula that use percentages or letter grades, the IB uses a 7-point scale for each subject, bonus points from core components, and grade boundaries that shift between examination sessions. This guide explains how the entire system works — from individual subject grades to the final diploma score — so you can understand where your marks come from and what you need to achieve your goals.
      </p>

      <h2>How the 7-Point Scale Works</h2>

      <p>
        Each IB subject is graded on a scale of 1 (lowest) to 7 (highest). These grades are not percentages — a 7 does not mean you scored 70% or above. Instead, grade boundaries are set after each examination session based on the difficulty of the papers and the performance of the global cohort.
      </p>

      <p>
        The grade boundaries represent the minimum raw mark (out of the total available marks for all components) needed to achieve each grade. For example, in a subject where the total available marks across all papers and IA is 100:
      </p>

      <table>
        <thead>
          <tr>
            <th>Grade</th>
            <th>Typical Boundary Range</th>
            <th>Approximate Percentage</th>
            <th>Descriptor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>7</strong></td>
            <td>73–85+</td>
            <td>~73–85%</td>
            <td>Excellent</td>
          </tr>
          <tr>
            <td><strong>6</strong></td>
            <td>60–72</td>
            <td>~60–72%</td>
            <td>Very Good</td>
          </tr>
          <tr>
            <td><strong>5</strong></td>
            <td>48–59</td>
            <td>~48–59%</td>
            <td>Good</td>
          </tr>
          <tr>
            <td><strong>4</strong></td>
            <td>36–47</td>
            <td>~36–47%</td>
            <td>Satisfactory</td>
          </tr>
          <tr>
            <td><strong>3</strong></td>
            <td>25–35</td>
            <td>~25–35%</td>
            <td>Mediocre</td>
          </tr>
          <tr>
            <td><strong>2</strong></td>
            <td>14–24</td>
            <td>~14–24%</td>
            <td>Poor</td>
          </tr>
          <tr>
            <td><strong>1</strong></td>
            <td>0–13</td>
            <td>~0–13%</td>
            <td>Very Poor</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Important:</strong> These ranges are approximate and vary significantly between subjects and sessions. Mathematics Analysis & Approaches HL might have a grade 7 boundary at 74%, while History HL might set it at 70% in the same session. The IBO adjusts boundaries to maintain consistent standards across years — if a paper was unusually difficult, boundaries are lowered so that a similar proportion of students achieve each grade.
      </p>

      <p>
        This is why it is impossible to know your exact grade during the course. You can estimate based on historical boundaries, but the actual boundaries are only finalized after all papers are marked for that session.
      </p>

      <h2>How Subject Scores Combine to Total Points</h2>

      <p>
        The IB Diploma score is calculated by adding together your grades from all six subjects plus bonus points from the core (TOK + EE). The maximum possible score is:
      </p>

      <ul>
        <li>6 subjects × 7 points maximum = <strong>42 points</strong></li>
        <li>Core bonus points (EE + TOK) = <strong>3 points maximum</strong></li>
        <li><strong>Total maximum: 45 points</strong></li>
      </ul>

      <p>
        To be awarded the IB Diploma (as opposed to individual subject certificates), you must meet all of the following conditions:
      </p>

      <ul>
        <li>Score at least <strong>24 points</strong> in total</li>
        <li>Complete CAS requirements</li>
        <li>No grade 1 in any subject</li>
        <li>No more than two grade 2s</li>
        <li>No more than three grade 3s (or below) across all subjects</li>
        <li>At least 12 points from Higher Level subjects</li>
        <li>At least 9 points from Standard Level subjects</li>
        <li>No "N" (not graded) in any subject, TOK, or EE</li>
      </ul>

      <p>
        Failing to meet any of these conditions results in not being awarded the Diploma, even if your total points are above 24. The most common reason for Diploma failure (beyond not reaching 24 points) is receiving a grade 2 or below in a subject where the student did not submit the IA or missed an exam.
      </p>

      <h2>Grade Boundaries by Subject: General Patterns</h2>

      <p>
        While exact boundaries vary by session, certain patterns are consistent across years:
      </p>

      <h3>Sciences (Physics, Chemistry, Biology)</h3>
      <p>
        Science subjects tend to have relatively high grade 7 boundaries (often 75–80%) because the papers include structured questions with clear right/wrong answers. However, the IA component (20%) provides an opportunity to secure marks through careful preparation. Students who score highly on the IA effectively lower the exam performance needed for a 7.
      </p>

      <h3>Mathematics</h3>
      <p>
        Mathematics Analysis & Approaches HL is known for having some of the lowest grade 7 boundaries in the IB (sometimes as low as 70–74%) because the papers are designed to be challenging. Mathematics Applications & Interpretation tends to have slightly higher boundaries. The key insight: in mathematics, you do not need to answer every question correctly to achieve a 7.
      </p>

      <h3>Humanities (History, Economics, Psychology)</h3>
      <p>
        Humanities subjects typically have grade 7 boundaries in the 70–76% range. The challenge in these subjects is not the boundary itself but the difficulty of achieving high marks on essay-based papers where examiners apply holistic marking criteria. A "perfect" essay is rare in humanities marking.
      </p>

      <h3>Languages (Group 1 and Group 2)</h3>
      <p>
        Language subjects often have the highest grade 7 boundaries (sometimes 85%+) because the marking is more generous on individual components. However, the Individual Oral (IO) can be unpredictable, and many students find it harder to achieve consistent marks across all four skills (reading, writing, speaking, listening).
      </p>

      <h2>Bonus Points from the EE/TOK Matrix</h2>

      <p>
        The Extended Essay and Theory of Knowledge are each graded A–E. These two grades are combined using a matrix to determine how many bonus points (0–3) are added to your diploma score:
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
        Key observations from this matrix:
      </p>

      <ul>
        <li>An E grade in either TOK or EE results in automatic Diploma failure regardless of your total points</li>
        <li>To get the maximum 3 bonus points, you need at least an A in one component and a B in the other</li>
        <li>The most common outcome (B/B or B/C) gives 2 or 1 bonus points</li>
        <li>These bonus points can be the difference between a 42 and a 45, or between meeting and missing a university offer</li>
      </ul>

      <p>
        This is why investing time in your <Link href="/resources/ib-extended-essay-guide" className="text-primary hover:underline">Extended Essay</Link> and <Link href="/resources/tok-essay-guide" className="text-primary hover:underline">TOK essay</Link> is strategically important — they offer "free" points that require effort but no exam-day performance pressure.
      </p>

      <h2>What Different Total Scores Mean for University Admissions</h2>

      <p>
        IB scores are recognized by universities worldwide, but requirements vary significantly by institution and program:
      </p>

      <table>
        <thead>
          <tr>
            <th>Score Range</th>
            <th>Competitiveness</th>
            <th>Typical University Targets</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>40–45</strong></td>
            <td>Highly competitive</td>
            <td>Oxbridge, Ivy League, top medical schools, ETH Zurich</td>
          </tr>
          <tr>
            <td><strong>36–39</strong></td>
            <td>Very strong</td>
            <td>Russell Group (UK), top US liberal arts, University of Toronto, NUS</td>
          </tr>
          <tr>
            <td><strong>32–35</strong></td>
            <td>Strong</td>
            <td>Most competitive programs at good universities worldwide</td>
          </tr>
          <tr>
            <td><strong>28–31</strong></td>
            <td>Solid</td>
            <td>Many university programs, some competitive programs with strong HL scores</td>
          </tr>
          <tr>
            <td><strong>24–27</strong></td>
            <td>Passing</td>
            <td>Diploma awarded; limited competitive options but many pathways available</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Important nuance:</strong> Many universities care more about your HL subject grades than your total score. A student with 38 points but 7,7,6 at HL in relevant subjects may be more competitive than a student with 40 points but 6,6,5 at HL. UK universities in particular often make offers based on specific HL grades (e.g., "766 at HL including 7 in Chemistry").
      </p>

      <p>
        For personalized guidance on which universities match your predicted scores and subject combination, <Link href="/university" className="text-primary hover:underline">IBLens's University Strategy tool</Link> can help you identify realistic targets and reach schools based on historical admissions data.
      </p>

      <h2>How to Maximize Your Total Score</h2>

      <p>
        Based on the scoring structure, here are strategic approaches to maximizing your IB Diploma score:
      </p>

      <p>
        <strong>Prioritize IAs:</strong> Internal Assessments are the most controllable component of your grade. You have weeks to refine them, can get teacher feedback, and can use tools like <Link href="/essay" className="text-primary hover:underline">IBLens</Link> to identify areas for improvement. A strong IA can compensate for a weaker exam performance.
      </p>

      <p>
        <strong>Invest in EE and TOK:</strong> The 3 bonus points from the EE/TOK matrix are achievable with focused effort. An A in your EE and a B in TOK gives you the maximum 3 points — equivalent to raising one subject grade by half a point across all six subjects.
      </p>

      <p>
        <strong>Know your boundaries:</strong> If you are on the borderline between two grades in a subject, even 1–2 extra marks on the IA or one paper can push you up. Understanding approximately where boundaries fall helps you allocate revision time strategically.
      </p>

      <p>
        <strong>Balance effort across subjects:</strong> Going from a 6 to a 7 in one subject requires significantly more effort than going from a 4 to a 5 in another. If your goal is to maximize total points, focus on subjects where you are closest to the next grade boundary.
      </p>

      <p>
        For more on how to achieve top marks on your essays and IAs, see our guides on <Link href="/resources/ib-essay-criteria-explained" className="text-primary hover:underline">IB Essay Criteria Explained</Link> and <Link href="/resources/ib-internal-assessment-guide" className="text-primary hover:underline">Internal Assessment Guide</Link>. Understanding the <Link href="/pricing" className="text-primary hover:underline">pricing</Link> of essay analysis tools can help you decide how to invest in your preparation.
      </p>
    </ResourceArticle>
  );
}
