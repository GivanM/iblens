import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function IBScoreCalculator() {
  return (
    <ResourceArticle
      title="IB Score Calculator: Points, Grade Boundaries and Diploma Requirements | IBLens"
      description="How the 45-point IB Diploma score is calculated: subject grades, the EE and TOK bonus matrix, grade boundaries, and the totals universities ask for."
      canonical="/resources/ib-score-calculator"
      datePublished="2026-06-06"
      dateModified="2026-06-06"
    >
      <h1>IB Score Calculator & Grade Boundaries: The Complete Guide</h1>
      <h2>How IB Scoring Works: The 45-Point System Explained</h2>
      <p>Every IB diploma candidate takes six subjects, three or four at Higher Level and the rest at Standard Level. Each subject is graded on a scale of 1 to 7, giving a raw maximum of 42 subject points. The remaining 3 points come from the core: Theory of Knowledge (TOK) and the Extended Essay (EE) together award between 0 and 3 bonus points.</p>
      <p><strong>Maximum total: 6 subjects × 7 points = 42 + 3 bonus points = 45 points.</strong></p>

      <h2>How to Calculate Your Predicted IB Score Step by Step</h2>
      <ol>
        <li><strong>List your six subject predicted grades.</strong> Add them together. A student predicted 7, 7, 6, 6, 6, 6 scores 38 subject points.</li>
        <li><strong>Add your TOK and EE grades to the bonus matrix</strong> (see the table below). The combination determines your bonus: 0, 1, 2, or 3 points.</li>
        <li><strong>Sum subject points + bonus points.</strong> The result is your predicted IB diploma score.</li>
        <li><strong>Check the failing conditions</strong> (see below).</li>
      </ol>
      <p>Example: 7, 7, 7, 6, 6, 5 = 38 subject points. TOK grade A, EE grade B = 3 bonus points. Predicted total = <strong>41 points</strong>.</p>

      <h2>IB Bonus Points Matrix: TOK and Extended Essay</h2>
      <p>Your bonus depends on the letter grade you receive in both TOK and the EE (A highest to E lowest). An E in either TOK or EE is an automatic failing condition regardless of your total points.</p>
      <div style={{overflowX: "auto", margin: "1.5rem 0"}}>
        <table style={{borderCollapse: "collapse", width: "100%", fontSize: "0.95rem", textAlign: "center"}}>
          <caption style={{fontWeight: 600, marginBottom: "0.5rem", textAlign: "left"}}>IB Bonus Points: TOK × EE Grade Combinations</caption>
          <thead>
            <tr style={{background: "var(--muted, #f5f5f5)"}}>
              <th style={{border: "1px solid #ddd", padding: "10px 14px"}}>EE \ TOK</th>
              <th style={{border: "1px solid #ddd", padding: "10px 14px"}}>A</th>
              <th style={{border: "1px solid #ddd", padding: "10px 14px"}}>B</th>
              <th style={{border: "1px solid #ddd", padding: "10px 14px"}}>C</th>
              <th style={{border: "1px solid #ddd", padding: "10px 14px"}}>D</th>
              <th style={{border: "1px solid #ddd", padding: "10px 14px"}}>E</th>
            </tr>
          </thead>
          <tbody>
            {[["A","3","3","2","2","Fail"],["B","3","2","2","1","Fail"],["C","2","2","1","0","Fail"],["D","2","1","0","0","Fail"],["E","Fail","Fail","Fail","Fail","Fail"]].map(([ee,...cells]) => (
              <tr key={ee}>
                <td style={{border:"1px solid #ddd",padding:"10px 14px",fontWeight:600,background:"var(--muted,#f5f5f5)"}}>{`EE ${ee}`}</td>
                {cells.map((cell,i) => (
                  <td key={i} style={{border:"1px solid #ddd",padding:"10px 14px",color:cell==="Fail"?"#c0392b":cell==="3"?"#27ae60":"inherit",fontWeight:cell==="Fail"||cell==="3"?600:400}}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>IB Grade Boundaries: What They Are and Why They Change</h2>
      <p>Grade boundaries are the minimum marks needed for each grade from 1 to 7. The IB sets them <em>after</em> each examination session, once marking is complete. <strong>They are not fixed.</strong> The same share of the marks can earn a 6 in one session and a 7 in another where the papers were harder.</p>

      <h3>Why Grade Boundaries Change Each Session</h3>
      <ul>
        <li><strong>Paper difficulty:</strong> a harder paper usually means a lower mark is needed for each grade, so that a grade means the same standard from one year to the next.</li>
        <li><strong>New syllabuses:</strong> the first sessions of a new course have no earlier boundaries for that course to compare with.</li>
      </ul>

      <h3>Where to Find the Boundaries</h3>
      <p>The IB publishes each session's boundaries to schools after marking, so no fixed percentage can be quoted for any subject. Your teacher or DP coordinator can tell you where the boundaries fell for your subject and level in recent sessions.</p>

      <h2>What Some Universities Publish</h2>
      <p>Requirements are set per course and change from year to year, so the university's own course page is the only reliable source. Three well-known examples, as those universities state them:</p>
      <ul>
        <li><strong>Oxford:</strong> 38, 39 or 40 points including core points, depending on the course, with 6s and 7s in Higher Level subjects. Course pages range from 666 to 776 at HL, and 666 or 766 are the most common.</li>
        <li><strong>Cambridge:</strong> minimum offers of 41 to 42 points out of 45, with 776 at Higher Level. Some colleges ask for 777 or a higher total.</li>
        <li><strong>ETH Zurich:</strong> 38 out of 42 points, without bonus points, with Mathematics, one of Physics, Chemistry or Biology, and one Language A at Higher Level.</li>
      </ul>
      <p>US universities do not set IB point thresholds in the same way: they read the IB grades as part of the whole application.</p>

      <h2>Failing Conditions: When a High Score Doesn't Save You</h2>
      <p>The Diploma is not awarded if any of these applies, whatever the total:</p>
      <ul>
        <li><strong>CAS requirements not met.</strong></li>
        <li><strong>Fewer than 24 points</strong> in total, bonus points included.</li>
        <li><strong>An "N"</strong> for TOK, the EE or a contributing subject.</li>
        <li><strong>A grade E</strong> for TOK, the EE or both.</li>
        <li><strong>A grade 1</strong> in any subject.</li>
        <li><strong>Grade 2 three or more times</strong>, at SL or HL.</li>
        <li><strong>Grade 3 or below four or more times</strong>, at SL or HL.</li>
        <li><strong>Fewer than 12 points on HL subjects</strong> (with four HL subjects, the three highest grades count).</li>
        <li><strong>Fewer than 9 points on SL subjects</strong> (with only two SL subjects, at least 5 points at SL).</li>
      </ul>
      <p>A finding of academic misconduct leads to no grade being awarded for the subject or requirement concerned.</p>

      <h2>Improve Your Essay Scores, Improve Your Diploma Total</h2>
      <p>The Extended Essay and the TOK essay decide your bonus points between them, and a weak draft usually also shapes the grade your supervisor predicts. Both are still in your hands while you are drafting.</p>
      <p><Link href="/essay">IBLens reads your essay against the assessment criteria and shows which criterion is losing you the most marks →</Link></p>
      <h2>Related tools</h2>

      <ul>
        <li><Link href="/remark">Is an IB remark worth it?</Link></li>
        <li><Link href="/resources/ib-grade-boundaries">IB Grade Boundaries</Link></li>
        <li><Link href="/resources/ib-ia-score-predictor">IA Score Predictor</Link></li>
      </ul>

    </ResourceArticle>
  );
}
