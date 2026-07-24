import { useState } from "react";
import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

function getTiers(total: number) {
  if (total >= 40) return {
    reach: ["Oxford / Cambridge (38–42)", "Harvard · MIT · Stanford (near-perfect + strong profile)", "Imperial top courses (39–41)"],
    match: ["LSE (37–38)", "UCL (38–39)", "Top-30 US universities", "Toronto · McGill top programs"],
    safe: ["Most Russell Group (34–36)", "Strong US public universities", "Amsterdam · Delft · Melbourne"],
  };
  if (total >= 36) return {
    reach: ["LSE · Imperial · UCL (37–39)", "Oxbridge stretch (38+)", "Top-40 US universities"],
    match: ["Russell Group (34–36)", "Toronto · McGill · UBC", "Edinburgh · Manchester · Warwick"],
    safe: ["UK direct-entry (32–34)", "Amsterdam · Groningen · Utrecht", "Australian Group of Eight"],
  };
  if (total >= 32) return {
    reach: ["Russell Group (34–36)", "Warwick · Bristol · Edinburgh"],
    match: ["Mid-tier UK (30–33)", "Most Dutch research universities", "Australian Group of Eight", "Canadian mid-tier"],
    safe: ["Wide UK direct-entry (28–31)", "Many EU English-taught programs", "Most Australian universities"],
  };
  if (total >= 28) return {
    reach: ["Mid-tier UK (30–33)", "Selective Dutch programs"],
    match: ["UK direct-entry (26–30)", "Most Australian universities", "Applied-science EU programs"],
    safe: ["Foundation pathways", "Clearing options", "Many direct-entry EU / AUS programs"],
  };
  return {
    reach: ["UK direct-entry (26–29)", "Selective Australian programs"],
    match: ["Foundation / pathway programs", "Many Australian & EU direct-entry"],
    safe: ["Foundation-year routes", "Clearing", "Open-admission pathways"],
  };
}

export default function IBUniversityChances() {
  const [total, setTotal] = useState(36);
  const tiers = getTiers(total);
  const tierMeta = [
    { key: "safe", label: "Safe", color: "#15803d", desc: "Very likely — at or above typical requirement", items: tiers.safe },
    { key: "match", label: "Match", color: "#7B1D2E", desc: "Realistic — around the typical requirement", items: tiers.match },
    { key: "reach", label: "Reach", color: "#b45309", desc: "Ambitious — a stretch worth trying", items: tiers.reach },
  ];
  return (
    <ResourceArticle
      title="IB University Chances Checker — What Can My IB Score Get Me? | IBLens"
      description="Free IB university chances checker. Move the slider to your predicted IB score and see realistic Safe, Match, and Reach universities across the UK, US, Canada, Europe and Australia."
      canonical="/resources/ib-university-chances"
      datePublished="2026-07-02"
      dateModified="2026-07-02"
    >
      <h1>IB University Chances Checker</h1>
      <p>
        Move the slider to your predicted IB total and see a directional read on which universities are realistic Safe, Match, and Reach options. This is a free estimate based on published IB entry requirements — a personalised, purchasable version is being rebuilt on verified university data.
      </p>

      <div style={{border: "1px solid #e5e7eb", borderRadius: 12, padding: "24px", margin: "24px 0", background: "#fff"}}>
        <label htmlFor="ib-total" style={{display: "block", fontWeight: 600, marginBottom: 8}}>
          Your predicted IB total: <span style={{...SERIF, color: "#7B1D2E", fontSize: "1.5rem"}}>{total}</span> / 45
        </label>
        <input
          id="ib-total"
          type="range"
          min={24}
          max={45}
          value={total}
          onChange={(e) => setTotal(Number(e.target.value))}
          style={{width: "100%", accentColor: "#7B1D2E", cursor: "pointer"}}
          aria-label="Predicted IB total points"
        />
        <div style={{display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#6b7280", marginTop: 4}}>
          <span>24</span><span>45</span>
        </div>
      </div>

      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, margin: "24px 0"}}>
        {tierMeta.map((t) => (
          <div key={t.key} style={{border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden"}}>
            <div style={{background: t.color, color: "#fff", padding: "10px 16px", fontWeight: 700, ...SERIF}}>{t.label}</div>
            <div style={{padding: "12px 16px"}}>
              <p style={{fontSize: "0.8rem", color: "#6b7280", margin: "0 0 10px"}}>{t.desc}</p>
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.8, fontSize: "0.9rem"}}>
                {t.items.map((it, i) => (<li key={i}>{it}</li>))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div style={{background: "#7B1D2E", color: "#fff", borderRadius: 12, padding: "24px", margin: "28px 0", textAlign: "center"}}>
        <p style={{...SERIF, fontSize: "1.25rem", fontWeight: 700, margin: "0 0 8px"}}>Want your real, personalised list?</p>
        <p style={{margin: "0 0 16px", opacity: 0.9, fontSize: "0.95rem"}}>
          9 universities matched to your exact IB profile — with admission probabilities, a personal-statement angle, and a full timeline. University consultants charge $5,000+. IBLens costs $25.
        </p>
        <Link href="/university" style={{display: "inline-block", background: "#fff", color: "#7B1D2E", fontWeight: 700, padding: "12px 28px", borderRadius: 8, textDecoration: "none"}}>
          University Strategy — coming back soon
        </Link>
      </div>

      <h2>How the estimate works</h2>
      <p>
        The checker maps your predicted IB total onto typical entry requirements for universities across the UK, US, Canada, the Netherlands, and Australia. Requirements vary by course — competitive subjects like Medicine, Law, and Computer Science sit above the university average, so treat this as directional. Your HL/SL subject mix, personal statement, and admissions test scores all shift real outcomes, which is exactly what the full $25 strategy factors in.
      </p>

      <h2>What different IB scores mean for university</h2>
      <ul>
        <li><strong>40–45 points:</strong> Competitive for the most selective universities worldwide — Oxbridge, Ivy League, LSE, Imperial.</li>
        <li><strong>36–39 points:</strong> Strong for the Russell Group, top Canadian and Dutch universities, and many US institutions.</li>
        <li><strong>32–35 points:</strong> A wide range of solid UK, European, and Australian universities via direct entry.</li>
        <li><strong>28–31 points:</strong> Many direct-entry programs across the UK, Australia, and the EU, plus foundation pathways to higher-ranked schools.</li>
        <li><strong>24–27 points:</strong> Foundation and pathway routes, clearing, and open-admission programs that can lead to strong final destinations.</li>
      </ul>

      <p>
        <Link href="/essay">Grade your IB essays free →</Link>
      </p>
    </ResourceArticle>
  );
}
