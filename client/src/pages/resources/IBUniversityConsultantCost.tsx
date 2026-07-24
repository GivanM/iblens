import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function IBUniversityConsultantCost() {
  return (
    <ResourceArticle
      title="IB University Consultant Cost 2026 — Are They Worth $5,000? | IBLens"
      description="What IB university admissions consultants actually cost ($3,000–$15,000+), what they do, which parts an AI tool replicates for $25, and when you genuinely need a human."
      canonical="/resources/ib-university-consultant-cost"
      datePublished="2026-07-02"
      dateModified="2026-07-02"
    >
      <h1>IB University Consultants: Are They Worth $5,000?</h1>

      <p>
        Every year, IB families are told the same thing: if you want a place at a top university, hire a private admissions consultant. The going rate is $3,000 to $15,000 — and elite packages run far higher. This guide breaks down what IB university consultants actually cost, what they genuinely do for that money, which parts of their service an AI tool now replicates for $25, and the specific situations where a human is still worth paying for.
      </p>

      <h2>What IB university consultants actually cost in 2026</h2>
      <p>
        Pricing varies enormously by market and prestige, but the typical ranges are:
      </p>
      <ul>
        <li><strong>Hourly consultants:</strong> $150–$400 per hour. A realistic engagement (list-building, essay review, interview prep) runs 15–40 hours.</li>
        <li><strong>Package / retainer:</strong> $3,000–$8,000 for a standard "application season" package covering a shortlist, essay guidance, and deadlines.</li>
        <li><strong>Premium / Ivy-focused:</strong> $10,000–$15,000+, and boutique firms marketing guaranteed-outcome narratives charge $30,000 and up.</li>
      </ul>

      <h2>What you are actually paying for</h2>
      <p>A good consultant delivers roughly six things:</p>
      <ol>
        <li><strong>A balanced university list</strong> — Safe, Match, and Reach schools calibrated to your predicted grades.</li>
        <li><strong>Admission-chance realism</strong> — an honest read on where you actually stand.</li>
        <li><strong>A personal-statement angle</strong> — positioning that makes your application distinct.</li>
        <li><strong>A deadline plan</strong> — UCAS, Common App, and direct-application timelines.</li>
        <li><strong>Essay editing</strong> — line-by-line feedback across drafts.</li>
        <li><strong>Interview and relationship coaching</strong> — the human, high-touch part.</li>
      </ol>

      <h2>Which parts an AI tool replicates for $25</h2>
      <p>
        The first four items on that list are structured, data-driven decisions — exactly what AI does well. IBLens takes your real IB predicted grades, HL/SL subjects, and preferences and returns a balanced 9-university Safe/Match/Reach list, admission-probability estimates, a personal-statement angle, and a full application timeline. That is the strategic core of a $5,000 package, generated in two minutes for <Link href="/university">$25</Link>.
      </p>
      <p>
        What AI does <em>not</em> replace is items five and six: multi-draft human essay editing and interview coaching. If those matter most to you, a consultant earns their fee. If what you need is a smart, honest map of where to apply — the decision that actually shapes your outcome — you do not need to spend thousands.
      </p>

      <h2>Consultant vs IBLens: an honest comparison</h2>
      <div style={{overflowX: "auto", margin: "1.5rem 0"}}>
        <table style={{borderCollapse: "collapse", width: "100%", fontSize: "0.95rem"}}>
          <thead>
            <tr style={{background: "var(--muted, #f5f5f5)"}}>
              <th style={{border: "1px solid #ddd", padding: "10px 14px", textAlign: "left"}}>What you get</th>
              <th style={{border: "1px solid #ddd", padding: "10px 14px"}}>Consultant ($3k–15k)</th>
              <th style={{border: "1px solid #ddd", padding: "10px 14px"}}>IBLens ($25)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Balanced Safe/Match/Reach list", "Yes", "Yes"],
              ["Admission-chance estimates", "Yes", "Yes"],
              ["Personal-statement angle", "Yes", "Yes"],
              ["Application timeline", "Yes", "Yes"],
              ["Multi-draft essay editing", "Yes", "No"],
              ["Interview coaching", "Yes", "No"],
              ["Turnaround", "Weeks", "2 minutes"],
            ].map(([f, c, i], idx) => (
              <tr key={idx}>
                <td style={{border: "1px solid #ddd", padding: "10px 14px"}}>{f}</td>
                <td style={{border: "1px solid #ddd", padding: "10px 14px", textAlign: "center"}}>{c}</td>
                <td style={{border: "1px solid #ddd", padding: "10px 14px", textAlign: "center", fontWeight: 600}}>{i}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>When you genuinely need a human consultant</h2>
      <ul>
        <li>You are targeting a tiny set of hyper-selective schools where interview performance decides everything.</li>
        <li>You have an unusual profile (transfers, gap years, extenuating circumstances) that needs bespoke narrative work.</li>
        <li>You want ongoing, multi-month essay editing across many drafts.</li>
      </ul>
      <p>
        For everyone else — the majority of IB students who simply need to apply to the right list of universities — the $25 strategy covers the decisions that matter.
      </p>

      <h2>Start with the strategy</h2>
      <p>
        Before you spend thousands, get the strategic core first. See your personalised 9-university Safe/Match/Reach list with real admission odds.
      </p>
      <p>
        <span className="text-muted-foreground">The IBLens University Strategy is being rebuilt on verified university data and is temporarily unavailable. In the meantime, <Link href="/essay" className="text-primary underline">grade your IB essays free</Link>.</span>
      </p>
    </ResourceArticle>
  );
}
