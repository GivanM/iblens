import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { PurchaseModal } from "@/components/PurchaseModal";
import { useMarkingCta } from "@/hooks/useMarkingCta";
import { PRICE_LABELS, type ProductKey } from "@shared/pricing";
import "@/styles/home-c.css";

/**
 * Home page candidate at /v2 (variant C, "Съёмка"), kept out of search. The photograph carries
 * the first screen; the sample report is made up and labelled so.
 */

const CRITERIA = [
  { key: "A", name: "Diagrams", score: 2, max: 3, colour: "var(--hl-a)" },
  { key: "B", name: "Terminology", score: 2, max: 2, colour: "var(--hl-b)" },
  { key: "C", name: "Application and analysis", score: 1, max: 3, colour: "var(--hl-c)" },
  { key: "D", name: "Key concept", score: 1, max: 3, colour: "var(--hl-d)" },
  { key: "E", name: "Evaluation", score: 1, max: 3, colour: "var(--hl-e)" },
];
const TOTAL = CRITERIA.reduce((s, c) => s + c.score, 0);
const MAX = CRITERIA.reduce((s, c) => s + c.max, 0);

const SUBJECTS: [string, string][] = [
  ["/essay/business-management-ia", "Business Management"],
  ["/essay/economics-ia", "Economics"],
  ["/essay/history-ia", "History"],
  ["/essay/biology-ia", "Biology"],
  ["/essay/chemistry-ia", "Chemistry"],
  ["/essay/physics-ia", "Physics"],
  ["/essay/math-ia", "Mathematics"],
  ["/essay/computer-science-ia", "Computer Science"],
  ["/essay/psychology-ia", "Psychology"],
  ["/essay/english-essay", "English A"],
];

const FAQ: [string, string][] = [
  ["Which subjects and types of work does IBLens mark?", "The IA or coursework in 14 subjects (Business Management, Economics, History, Biology, Chemistry, Physics, Mathematics, English A Language and Literature, English A Literature, Psychology, Computer Science, and the externally assessed coursework in Visual Arts, Music and Film), the Extended Essay, the TOK essay and the TOK exhibition. Each is marked on its own published criteria for your exam session. Visual Arts can be marked only for sessions through November 2026: from May 2027 the comparative study is no longer set."],
  ["Is the first preview really free?", "Yes. The first preview is free: a range of totals and, for most drafts, feedback on your weakest criterion and the top risks in your draft (for the TOK essay and exhibition, which are marked as a whole, the band, the start of the explanation and the top risks). The complete report, with an estimated mark, a mark and comment for each criterion that can be judged from your text (for the TOK essay and exhibition, the whole explanation) and a ranked list of fixes, unlocks for $9.99."],
  ["What payment methods do you accept?", "Payments are handled by Lemon Squeezy, which accepts major cards and the other methods shown at checkout. Your reports are added automatically once the payment is confirmed."],
  ["What if I'm not satisfied with my report?", "Email us at glushkovim@gmail.com within 7 days of your purchase and we'll refund you in full, no questions asked. We send the refund to the original payment method within 3-5 business days of approving it, and your bank may take a further 5-10 business days to show it."],
];

export default function HomeV2() {
  const { previewUsed, paidLabel, paidLeft } = useMarkingCta();
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [sku, setSku] = useState<ProductKey>("ESSAY_PACK_5");
  const buy = (next: ProductKey) => { setSku(next); setPurchaseOpen(true); };
  const primary = previewUsed ? paidLabel : "Get a free preview";

  return (
    <div className="hc">
      <SEOHead
        title="IBLens: Find the Criterion That Is Costing You Marks"
        description="Paste your IA, Extended Essay or TOK essay and see which criterion is costing you marks, against the IB criteria for your subject and session, in about a minute. Free preview first."
        canonical="/"
      />
      <Helmet>
        <meta name="robots" content="noindex" />
        <link rel="preload" as="image" type="image/avif" media="(max-width: 899px)" imageSrcSet="/img/home-c/desk-tall-720.avif 720w, /img/home-c/desk-tall-1080.avif 1080w" imageSizes="100vw" />
        <link rel="preload" as="image" type="image/avif" media="(min-width: 900px)" imageSrcSet="/img/home-c/desk-1024.avif 1024w, /img/home-c/desk-1600.avif 1600w, /img/home-c/desk-2400.avif 2400w" imageSizes="100vw" />
      </Helmet>
      <PurchaseModal open={purchaseOpen} onOpenChange={setPurchaseOpen} sku={sku} />

      <section className="hc-shot">
        <picture>
          <source media="(max-width: 899px)" type="image/avif" srcSet="/img/home-c/desk-tall-720.avif 720w, /img/home-c/desk-tall-1080.avif 1080w" sizes="100vw" />
          <source media="(max-width: 899px)" type="image/webp" srcSet="/img/home-c/desk-tall-720.webp 720w, /img/home-c/desk-tall-1080.webp 1080w" sizes="100vw" />
          <source type="image/avif" srcSet="/img/home-c/desk-1024.avif 1024w, /img/home-c/desk-1600.avif 1600w, /img/home-c/desk-2400.avif 2400w" sizes="100vw" />
          <source type="image/webp" srcSet="/img/home-c/desk-1024.webp 1024w, /img/home-c/desk-1600.webp 1600w, /img/home-c/desk-2400.webp 2400w" sizes="100vw" />
          <img src="/img/home-c/desk-1600.webp" width={2400} height={1357} alt="A printed essay draft marked with highlighters, a watch and a planner with a date circled, on a desk at night" fetchPriority="high" decoding="async" />
        </picture>
        <div className="hc-wrap hc-copy">
          <p className="kicker">Due on Friday?</p>
          <h1>Find out tonight which criterion is costing you marks.</h1>
          <p className="lede">Paste your IA, Extended Essay or TOK essay. IBLens marks it against the IB criteria for your subject and exam session in about a minute.</p>
          <div className="act">
            <Link href="/essay" className="hc-btn light">{primary}</Link>
            <small>{previewUsed ? `A full report is ${paidLeft > 0 ? "one of your paid reports" : PRICE_LABELS.ESSAY_SINGLE}, with two re-checks.` : `No account needed. Full report ${PRICE_LABELS.ESSAY_SINGLE}.`}</small>
          </div>
        </div>
      </section>

      <main>
        <section className="hc-split">
          <div className="hc-wrap">
            <h2 className="hc-h2">What happens to your draft</h2>
          </div>
          <div className="hc-wrap grid">
            <div className="steps">
              <div className="hc-step">
                <h3>You paste it</h3>
                <p>Choose the type of work, your subject and your exam session. The first preview needs no account and no card.</p>
              </div>
              <div className="hc-step">
                <h3>It is read against your criteria</h3>
                <p>An AI marks the draft against the published IB criteria for that subject and session. The mark is an estimate: we have not measured it against examiner marks, so use it to decide what to fix.</p>
              </div>
              <div className="hc-step">
                <h3>You see where the marks go</h3>
                <p>The free preview shows a range of totals and, for most drafts, your weakest criterion and the top risks. The full report gives a mark and a comment for every criterion your text can show, a ranked list of fixes and two re-checks within 14 days.</p>
              </div>
              <div className="hc-step">
                <h3>Your essay is not kept</h3>
                <p>It passes through our relay in Helsinki to Anthropic, which marks it. IBLens never saves the text, and Anthropic deletes it within 30 days unless its usage policy or the law requires otherwise. <Link href="/privacy" className="hc-link">Privacy Policy</Link></p>
              </div>
            </div>
            <aside className="hc-card" aria-label="Sample report">
              <div className="top">
                <b>Economics IA<small>Sample report, made-up scores</small></b>
                <span className="t">{TOTAL} <span>/ {MAX}</span></span>
              </div>
              <ul>
                {CRITERIA.map((c) => (
                  <li key={c.key}>
                    <span className="l" style={{ background: c.colour }}>{c.key}</span>
                    <span>{c.name}</span>
                    <span className="s">{c.score}/{c.max}</span>
                  </li>
                ))}
              </ul>
              <div className="weak">
                <b>Costing you the most: Application and analysis</b>
                <p>"Consumers will simply buy less" contradicts the low elasticity you have just described. Show the small fall in quantity on your diagram.</p>
              </div>
              <p className="fine">Every mark is an estimate. The free preview shows a range of totals and, for most drafts, the weakest criterion and the top risks.</p>
            </aside>
          </div>
        </section>

        <section className="hc-frame">
          <div className="hc-wrap grid">
            <picture>
              <source type="image/avif" srcSet="/img/home-c/page-1000.avif 1000w, /img/home-c/page-1600.avif 1600w" sizes="(min-width: 960px) 62vw, 100vw" />
              <source type="image/webp" srcSet="/img/home-c/page-1000.webp 1000w, /img/home-c/page-1600.webp 1600w" sizes="(min-width: 960px) 62vw, 100vw" />
              <img src="/img/home-c/page-1000.webp" width={1600} height={1062} alt="A printed essay page with passages marked in five highlighter colours" loading="lazy" decoding="async" />
            </picture>
            <div className="cap">
              <h2 className="hc-h2">It tells you what to fix. You do the writing.</h2>
              <p>The report points to passages in your draft and says what each criterion is missing. It is instructed never to write sentences you could paste in.</p>
              <p>The IB academic integrity policy rules out non-permitted help with coursework, so check with your teacher that outside feedback is allowed. For the Extended Essay, ask your supervisor.</p>
              <Link href="/resources/academic-integrity" className="hc-link">Using AI feedback within IB rules</Link>
            </div>
          </div>
        </section>

        <section className="hc-subjects">
          <div className="hc-wrap col">
            <h2 className="hc-h2">For your subject and session</h2>
            <p className="list">
              The IA in{" "}
              {SUBJECTS.map(([href, label], i) => (
                <span key={label}><Link href={href}>{label}</Link>{i < SUBJECTS.length - 1 ? ", " : ""}</span>
              ))}
              , the coursework in Visual Arts, Music and Film, the <Link href="/essay/extended-essay">Extended Essay</Link>, the <Link href="/essay/tok-essay">TOK essay</Link> and the <Link href="/essay/tok-exhibition">TOK exhibition</Link>.
            </p>
            <p className="note">The Extended Essay can be marked on the November 2026 or the May 2027 criteria, and Psychology and Computer Science on their 2027 formats. Pick your session and the report follows it.</p>
          </div>
        </section>

        <section className="hc-cost" id="pricing">
          <div className="hc-wrap">
            <h2 className="hc-h2">What a read of your draft costs</h2>
            <dl className="hc-stack">
              <div className="us"><dt>IBLens</dt><dd><span className="big">{PRICE_LABELS.ESSAY_SINGLE}</span>, first preview free. About a minute, with two re-checks within 14 days. Uses the published criteria for your subject and session, as an estimate.</dd></div>
              <div><dt>Tutor</dt><dd>Paid by the hour, when they have a slot. Subject judgement no tool has.</dd></div>
              <div><dt>Teacher</dt><dd>Free, and knows you, your school and the criteria. Usually comments on one draft of coursework.</dd></div>
            </dl>
            <div className="hc-tw">
              <table className="hc-table">
                <thead>
                  <tr><th scope="col"><span className="sr-only">Compared</span></th><th scope="col">Tutor</th><th scope="col">Teacher</th><th scope="col" className="us">IBLens</th></tr>
                </thead>
                <tbody>
                  <tr><th scope="row">Price</th><td>By the hour</td><td>Free</td><td className="us"><span className="big">{PRICE_LABELS.ESSAY_SINGLE}</span><br />first preview free</td></tr>
                  <tr><th scope="row">When</th><td>When they have a slot</td><td>Usually one draft of coursework</td><td className="us">About a minute, with two re-checks within 14 days</td></tr>
                  <tr><th scope="row">What it knows</th><td>Subject judgement no tool has</td><td>You, your school and the criteria</td><td className="us">The published criteria for your subject and session, as an estimate</td></tr>
                </tbody>
              </table>
            </div>
            <div className="hc-packs">
              <div className="hc-pack"><div><b>5 reports, {PRICE_LABELS.ESSAY_PACK_5}</b><br /><span>$5.00 per report</span></div><button type="button" className="hc-btn line" onClick={() => buy("ESSAY_PACK_5")}>Buy 5 reports</button></div>
              <div className="hc-pack"><div><b>10 reports, {PRICE_LABELS.ESSAY_PACK_10}</b><br /><span>$4.50 per report</span></div><button type="button" className="hc-btn line" onClick={() => buy("ESSAY_PACK_10")}>Buy 10 reports</button></div>
            </div>
            <p className="fine">Not what you needed? Email us within 7 days for a full refund. <Link href="/refund-policy" className="hc-link">Refund policy</Link></p>
          </div>
        </section>

        <section className="hc-why">
          <div className="hc-wrap">
            <blockquote>"I built this because my son's IB tutor charged $120 for one feedback session, and it came the week before the deadline."</blockquote>
            <div className="by">
              <img src="/founder.jpg" alt="Ivan Glushkov, founder of IBLens" width={56} height={56} loading="lazy" />
              <span>Ivan, founder of IBLens and an IB parent. It does not replace your teacher; it gives you a read against the criteria while there is still time to act on it.</span>
            </div>
          </div>
        </section>

        <section className="hc-more">
          <div className="hc-wrap cols">
            <div>
              <h2>Also on IBLens</h2>
              <ul className="hc-tools">
                <li><Link href="/remark"><b>Re-mark checker</b><span>Whether a re-mark is worth it, what it can cost you, and the deadlines.</span></Link></li>
                <li><Link href="/ucas-personal-statement"><b>UCAS personal statement checker</b><span>Each of the three answers read from an admissions-tutor perspective.</span></Link></li>
              </ul>
            </div>
            <div className="hc-faq">
              <h2>Questions</h2>
              {FAQ.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
