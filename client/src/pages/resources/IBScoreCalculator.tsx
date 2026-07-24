import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function IBScoreCalculator() {
  return (
    <ResourceArticle
      title="IB Score Calculator & Grade Boundaries 2024–2026 — Complete Guide | IBLens"
      description="Learn how IB scoring works, understand grade boundaries, calculate your predicted IB diploma score, and find out what scores top universities require."
      canonical="/resources/ib-score-calculator"
      datePublished="2026-06-06"
      dateModified="2026-06-06"
    >
      <h1>IB Score Calculator & Grade Boundaries: The Complete Guide</h1>
      <h2>How IB Scoring Works: The 45-Point System Explained</h2>
      <p>Every IB diploma candidate takes six subjects — three at Higher Level (HL) and three at Standard Level (SL). Each subject is graded on a scale of 1 to 7, giving a raw maximum of 42 subject points. The remaining 3 points come from the core: Theory of Knowledge (TOK) and the Extended Essay (EE) together award between 0 and 3 bonus points.</p>
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
      <p>Grade boundaries are the minimum raw marks required to achieve each grade from 1 to 7. They are set by the IB <em>after</em> each examination session by senior examiners who review the actual distribution of student scores. <strong>Grade boundaries are not fixed.</strong> A mark of 65% in one session might earn a grade 6, while the same mark earns a grade 7 in a harder paper.</p>

      <h3>Why Grade Boundaries Change Each Session</h3>
      <ul>
        <li><strong>Paper difficulty:</strong> If the May 2025 Mathematics HL paper was harder than May 2024, the boundary for grade 7 will typically drop.</li>
        <li><strong>Cohort performance:</strong> Statistical standardisation ensures grade distributions remain broadly consistent across years.</li>
        <li><strong>Curriculum changes:</strong> New syllabuses often produce boundary shifts in transition years.</li>
      </ul>

      <h3>Grade Boundary Trends 2022–2026</h3>
      <p>Mathematics Analysis and Approaches HL, Physics HL, and Economics HL frequently require 75–85% of available marks for a grade 7. Biology and Chemistry HL boundaries have been relatively stable. The post-pandemic 2022 session produced notable boundary drops; by 2025–2026 most subjects are tracking back toward pre-2020 historical norms.</p>

      <h2>What IB Score Do You Need for Top Universities?</h2>

      <h3>UK Universities</h3>
      <ul>
        <li><strong>Oxford and Cambridge:</strong> 38–40 points overall, with specific HL grade requirements (e.g., 7,7,6). Medicine typically requires 40–42 with 7s in Biology and Chemistry HL.</li>
        <li><strong>Imperial / UCL / LSE:</strong> 36–39 points with relevant HL grades of 6 or 7.</li>
        <li><strong>Russell Group generally:</strong> 32–36 points.</li>
      </ul>

      <h3>US Universities</h3>
      <ul>
        <li><strong>Ivy League:</strong> Most admitted IB students score 38–43. No formal cutoff but below 36 is rare in top-10 admitted pools.</li>
        <li><strong>Top-30 US:</strong> 34–40 points with strong HL performance in intended major area.</li>
      </ul>

      <h3>Other International</h3>
      <ul>
        <li><strong>University of Toronto / McGill:</strong> 32–36 for competitive programmes; 38+ for medicine.</li>
        <li><strong>ETH Zürich:</strong> 37–40 with strong Mathematics and Sciences HL.</li>
        <li><strong>NUS / NTU (Singapore):</strong> 38–43 for medicine and law; 34–38 for engineering and science.</li>
      </ul>

      <h2>Failing Conditions: When a High Score Doesn't Save You</h2>
      <ul>
        <li><strong>Grade E in either TOK or EE</strong> — automatic diploma failure.</li>
        <li><strong>CAS not completed</strong> — diploma failure regardless of academic scores.</li>
        <li><strong>Grade 1 in any subject</strong> — automatic failure.</li>
        <li><strong>Grade 2 in three or more subjects</strong> (HL or SL) — automatic failure.</li>
        <li><strong>A grade of 3 or lower awarded more than three times</strong> across the diploma — automatic failure.</li>
        <li><strong>Total subject score below 24 points</strong> — automatic failure.</li>
        <li><strong>Malpractice finding</strong> — diploma withdrawal.</li>
      </ul>

      <h2>Improve Your Essay Scores — Improve Your Diploma Total</h2>
      <p>The Extended Essay and TOK essay directly affect both your bonus points and your teacher's confidence in your predicted score. A weak EE draft can cost you up to 3 bonus points and reduce your predicted grade — a double penalty at the worst possible time.</p>
      <p><Link to="/essay">IBLens analyses your IB essay against the official criteria and shows you exactly where marks are being lost →</Link></p>
    </ResourceArticle>
  );
}
