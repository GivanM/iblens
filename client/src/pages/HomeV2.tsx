import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { PurchaseModal } from "@/components/PurchaseModal";
import { useMarkingCta } from "@/hooks/useMarkingCta";
import { getLoginUrl } from "@/const";
import { PRICE_LABELS, type ProductKey } from "@shared/pricing";
import "@/styles/composition.css";

/**
 * A candidate home page in the "composition" direction, shown at /v2 and kept out of search.
 * The copy follows the live home page, which answers a visitor's doubts in order: how far to
 * trust the estimate, whether it is allowed, where the text goes, and what it costs.
 */

// May 2027 Extended Essay criteria, the session most current students sit. Made-up scores.
const SAMPLE = [
  { letter: "A", name: "Framework for the essay", score: 5, max: 6, note: "The research question is focused and the method fits it. The scope is set two sections later than a reader needs it." },
  { letter: "B", name: "Knowledge and understanding", score: 5, max: 6, note: "Sources are used accurately, but mostly one at a time and rarely set against each other." },
  { letter: "C", name: "Analysis and line of argument", score: 3, max: 6, note: "Two readings of the evidence are named in the fourth section and neither is weighed. Say which one the evidence supports, and why.", weak: true },
  { letter: "D", name: "Discussion and evaluation", score: 6, max: 8, note: "The conclusion follows from the argument. The limitations of the sources are listed rather than discussed." },
  { letter: "E", name: "Reflection", score: 2, max: 4, note: "The reflective statement describes what you did. The criterion asks how the work changed you as a learner, with specific examples." },
];
const SAMPLE_TOTAL = SAMPLE.reduce((sum, c) => sum + c.score, 0);
const SAMPLE_MAX = SAMPLE.reduce((sum, c) => sum + c.max, 0);

const FAQ: [string, string][] = [
  ["Which subjects and types of work does IBLens mark?", "The IA or coursework in 14 subjects (Business Management, Economics, History, Biology, Chemistry, Physics, Mathematics, English A Language and Literature, English A Literature, Psychology, Computer Science, and the externally assessed coursework in Visual Arts, Music and Film), the Extended Essay, the TOK essay and the TOK exhibition. Each is marked on its own published criteria for your exam session. Subjects outside this list are not offered. Visual Arts can be marked only for sessions through November 2026: from May 2027 the comparative study is no longer set."],
  ["Is the first preview really free?", "Yes. The first preview is free: a range of totals and, for most drafts, feedback on your weakest criterion and the top risks in your draft (for the TOK essay and exhibition, which are marked as a whole, the band, the start of the explanation and the top risks). The complete report, with an estimated mark, a mark and comment for each criterion that can be judged from your text (for the TOK essay and exhibition, the whole explanation) and a ranked list of fixes, unlocks for $9.99."],
  ["What payment methods do you accept?", "Payments are handled by Lemon Squeezy, which accepts major cards and the other methods shown at checkout. Your reports are added automatically once the payment is confirmed."],
  ["What if I'm not satisfied with my report?", "Email us at glushkovim@gmail.com within 7 days of your purchase and we'll refund you in full, no questions asked. We send the refund to the original payment method within 3-5 business days of approving it, and your bank may take a further 5-10 business days to show it."],
];

const SUBJECT_LINKS: [string, string][] = [
  ["/essay/business-management-ia", "Business Management IA"],
  ["/essay/economics-ia", "Economics IA"],
  ["/essay/history-ia", "History IA"],
  ["/essay/biology-ia", "Biology IA"],
  ["/essay/chemistry-ia", "Chemistry IA"],
  ["/essay/physics-ia", "Physics IA"],
  ["/essay/math-ia", "Mathematics IA"],
  ["/essay/computer-science-ia", "Computer Science IA"],
  ["/essay/psychology-ia", "Psychology IA"],
  ["/essay/english-essay", "English A individual oral"],
  ["/essay/extended-essay", "Extended Essay"],
  ["/essay/tok-essay", "TOK essay"],
  ["/essay/tok-exhibition", "TOK exhibition"],
];

function DeskPhoto({ strip = false }: { strip?: boolean }) {
  const wide = "/img/home/desk-1024.avif 1024w, /img/home/desk-1600.avif 1600w, /img/home/desk-2400.avif 2400w";
  const wideWebp = "/img/home/desk-1024.webp 1024w, /img/home/desk-1600.webp 1600w, /img/home/desk-2400.webp 2400w";
  return (
    <picture className={strip ? undefined : "cmp-shot"}>
      {!strip && <source media="(max-width: 899px)" type="image/avif" srcSet="/img/home/desk-sq-720.avif 720w, /img/home/desk-sq-1080.avif 1080w" sizes="100vw" />}
      {!strip && <source media="(max-width: 899px)" type="image/webp" srcSet="/img/home/desk-sq-720.webp 720w, /img/home/desk-sq-1080.webp 1080w" sizes="100vw" />}
      <source type="image/avif" srcSet={wide} sizes="100vw" />
      <source type="image/webp" srcSet={wideWebp} sizes="100vw" />
      <img
        src="/img/home/desk-1600.webp"
        width={2400}
        height={1357}
        alt={strip ? "" : "A printed essay draft with red pen marks in the margins, on a desk in morning light"}
        loading={strip ? "lazy" : "eager"}
        fetchPriority={strip ? "low" : "high"}
        decoding="async"
      />
    </picture>
  );
}

export default function HomeV2() {
  const { previewUsed, paidLabel, paidLeft, isAuthenticated } = useMarkingCta();
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [sku, setSku] = useState<ProductKey>("ESSAY_PACK_5");
  const buy = (next: ProductKey) => { setSku(next); setPurchaseOpen(true); };
  const primary = previewUsed ? paidLabel : "Get my free preview";

  return (
    <div className="cmp">
      <SEOHead
        title="IBLens: IB Essay Grader, Criterion by Criterion"
        description="Paste an IB draft and see where its marks go: marked against the published criteria for your subject and session, in about a minute. Free preview first, full report $9.99."
        canonical="/"
      />
      <Helmet>
        <meta name="robots" content="noindex" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap" />
        <link rel="preload" as="image" type="image/avif" media="(max-width: 899px)" imageSrcSet="/img/home/desk-sq-720.avif 720w, /img/home/desk-sq-1080.avif 1080w" imageSizes="100vw" />
        <link rel="preload" as="image" type="image/avif" media="(min-width: 900px)" imageSrcSet="/img/home/desk-1024.avif 1024w, /img/home/desk-1600.avif 1600w, /img/home/desk-2400.avif 2400w" imageSizes="100vw" />
      </Helmet>
      <PurchaseModal open={purchaseOpen} onOpenChange={setPurchaseOpen} sku={sku} />

      {/* 1. The photograph, the headline and a sample mark sitting on the seam */}
      <section className="cmp-hero">
        <header className="cmp-top">
          <div className="cmp-wrap">
            <Link href="/" className="cmp-logo">IBLens</Link>
            <nav className="cmp-nav" aria-label="Main">
              <Link href="/essay">Essay grader</Link>
              <Link href="/remark">Re-mark checker</Link>
              <Link href="/resources">Resources</Link>
              <Link href="/pricing">Pricing</Link>
            </nav>
            <div className="end">
              {isAuthenticated ? <Link href="/dashboard">Dashboard</Link> : <a href={getLoginUrl()}>Sign in</a>}
            </div>
          </div>
        </header>
        <div className="cmp-shotwrap">
          <DeskPhoto />
          <div className="cmp-seam">
            <div className="cmp-wrap">
              <a href="#report" className="cmp-number" aria-label={`Sample Extended Essay report: ${SAMPLE_TOTAL} out of ${SAMPLE_MAX}, made-up scores`}>
                <span className="n" aria-hidden="true">{SAMPLE_TOTAL}</span>
                <span className="side" aria-hidden="true">
                  <span className="of">/{SAMPLE_MAX}</span>
                  <span className="tag">Sample, made-up scores</span>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="cmp-h1-over">
          <div className="cmp-wrap">
            <h1 className="cmp-h1">Find the lost marks <em>before your deadline does.</em></h1>
          </div>
        </div>
      </section>

      <section className="cmp-intro">
        <div className="cmp-wrap">
          <div className="col">
            <p className="cmp-lede">
              Paste your IA, Extended Essay or TOK draft. IBLens marks it against the published criteria for your subject and exam session, in about a minute, and shows where the marks go.
            </p>
            <div className="cmp-act">
              <Link href="/essay" className="cmp-btn">{primary}</Link>
              <Link href="/resources/sample-reports" className="cmp-link">Read three real reports</Link>
            </div>
            <p className="cmp-fine">
              {previewUsed
                ? `A full report is ${paidLeft > 0 ? "one of your paid reports" : PRICE_LABELS.ESSAY_SINGLE}, with two re-checks of your revised draft.`
                : `No account, no card. After the free preview, a full report is ${PRICE_LABELS.ESSAY_SINGLE} with two re-checks.`}
            </p>
          </div>
        </div>
      </section>

      {/* 2. What the full report looks like: one band per criterion */}
      <section className="cmp-report" id="report">
        <div className="cmp-wrap">
          <div className="head">
            <h2>The full report, one criterion at a time.</h2>
            <p className="cmp-fine">
              An illustration with made-up scores, on the May 2027 Extended Essay criteria, which mark the essay out of 30 instead of 34. Choose your exam session and the report follows it.
            </p>
          </div>
          {SAMPLE.map((c) => (
            <div key={c.letter} className={`cmp-band${c.weak ? " weak" : ""}`}>
              <span className="n">{c.score}/{c.max}</span>
              <span className="name"><small>Criterion {c.letter}{c.weak ? ", costing the most" : ""}</small>{c.name}</span>
              <p className="d">{c.note}</p>
            </div>
          ))}
          <p className="cmp-fine foot">
            The report also ranks the risks and the fixes, starting with the one worth the most marks. The TOK essay and exhibition are marked as a whole: the report gives the band and explains it.
          </p>
        </div>
      </section>

      {/* 3. How far to trust it */}
      <section className="cmp-trust">
        <div className="cmp-wrap">
          <p className="say">It is an estimate, and it says so.</p>
          <div className="cmp-cols">
            <div>
              <h3>The published criteria</h3>
              <p>Each draft is read against the IB criteria for its subject and exam session, with their mark allocations, including the May 2027 changes.</p>
            </div>
            <div>
              <h3>Not an IB mark</h3>
              <p>We have not measured the estimate against examiner marks, so use the number as a guide. What helps is which criterion it flags, and why.</p>
            </div>
            <div>
              <h3>Judge it before you pay</h3>
              <p>Three TOK essays, marked by IBLens and left unedited, with our notes on where the reports stray from the descriptors. <Link href="/resources/sample-reports" className="cmp-link">Read them</Link></p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The rule, on a flat field */}
      <section className="cmp-field">
        <div className="cmp-wrap">
          <p className="cmp-mono">Before you paste</p>
          <figure>
            <blockquote>
              The IB academic integrity policy asks students to &ldquo;abstain from receiving non-permitted assistance in the completion or editing of work, such as from friends, relatives, other students, private tutors, essay writing or copy-editing services, pre-written essay banks or file sharing websites&rdquo;.
            </blockquote>
            <figcaption>IB, Academic integrity policy</figcaption>
          </figure>
          <div className="notes">
            <p><b>IA, TOK and orals</b>Check that your teacher and your school allow outside feedback on the work before you use IBLens.</p>
            <p><b>Extended Essay</b>The guide says students are not allowed to receive assistance with any aspect of the research, writing or proofreading of the essay beyond that which is permitted through their supervisor. Ask your supervisor first.</p>
            <p><b>Your words stay yours</b>The grader is instructed to say what to change, never to write sentences you could paste in. If any wording from a report goes into your work, credit it.</p>
          </div>
          <Link href="/resources/academic-integrity" className="cmp-link">Using AI feedback within IB rules</Link>
        </div>
      </section>

      {/* 5. Where the text goes */}
      <section className="cmp-path">
        <div className="cmp-wrap">
          <h2>Where your essay goes, and what is kept.</h2>
          <ol className="cmp-stops">
            <li><b>Your browser</b><span>encrypted connection</span></li>
            <li><b>Our relay in Helsinki</b><span>passes the text on</span></li>
            <li><b>Anthropic</b><span>the AI provider that marks it</span></li>
            <li><b>Your report</b><span>saved, can quote short passages</span></li>
          </ol>
          <div className="cmp-facts">
            <p><b>The text itself is not stored.</b> IBLens never saves it, and Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise.</p>
            <p><b>Not for training, not for sale.</b> Your essay is not used to train AI models and is not shared with your school, universities or other students.</p>
            <p><b>The report is kept.</b> Without an account, a report you did not buy is deleted after 90 days; a signed-in history stays until you delete it. <Link href="/privacy" className="cmp-link">Privacy Policy</Link></p>
          </div>
        </div>
      </section>

      <div className="cmp-strip" aria-hidden="true"><DeskPhoto strip /></div>

      {/* 6. Price as a ledger */}
      <section className="cmp-price" id="pricing">
        <div className="cmp-wrap">
          <h2>Pay per report. No subscription.</h2>
          <p className="cmp-fine">A tutor charges by the hour, and teachers usually comment on one draft of coursework.</p>
          <div className="cmp-row free">
            <span className="what">First preview</span><span className="p">Free</span>
            <span className="notes">A range of totals and, for most drafts, your weakest criterion and the top risks. No account.</span>
          </div>
          <div className="cmp-row">
            <span className="what">Full report</span><span className="p">{PRICE_LABELS.ESSAY_SINGLE}</span>
            <span className="notes">Every criterion your text can show, ranked fixes, and two re-checks of your revised draft within 14 days.</span>
          </div>
          <div className="cmp-row">
            <span className="what">5 reports</span><span className="p">{PRICE_LABELS.ESSAY_PACK_5}</span>
            <span className="notes">$5.00 per report</span>
          </div>
          <div className="cmp-row">
            <span className="what">10 reports</span><span className="p">{PRICE_LABELS.ESSAY_PACK_10}</span>
            <span className="notes">$4.50 per report, the lowest price</span>
          </div>
          <div className="cmp-row">
            <span className="what">Refund</span><span className="p">7 days</span>
            <span className="notes">In full, no questions asked. <Link href="/refund-policy" className="cmp-link">Refund policy</Link></span>
          </div>
          <div className="cmp-act">
            <Link href="/essay" className="cmp-btn">{primary}</Link>
            <button type="button" className="cmp-btn ghost" onClick={() => buy("ESSAY_PACK_5")}>Buy 5 reports</button>
            <button type="button" className="cmp-btn ghost" onClick={() => buy("ESSAY_PACK_10")}>Buy 10 reports</button>
          </div>
        </div>
      </section>

      {/* 7. Why it exists */}
      <section className="cmp-why">
        <div className="cmp-wrap">
          <img src="/founder.jpg" alt="Ivan Glushkov, founder of IBLens" width={128} height={128} loading="lazy" />
          <div>
            <blockquote>"I built this because my son's IB tutor charged $120 for one feedback session, and it came the week before the deadline."</blockquote>
            <p>The IB's criteria are written down in its subject guides. IBLens reads a draft against those same criteria in about a minute, while there is still time to act on what it finds. It does not replace your teacher.</p>
            <p className="cmp-fine">Ivan, founder of IBLens, IB parent</p>
          </div>
        </div>
      </section>

      {/* 8. The other tools */}
      <section className="cmp-also">
        <div className="cmp-wrap">
          <ul>
            <li>
              <Link href="/remark">
                <span className="t">Results in? Should you pay for a re-mark?</span>
                <span className="s">Whether a re-mark is worth it, what it can cost you, and the deadlines: 15 September for the May session, 15 March for November.</span>
                <span className="arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </li>
            <li>
              <Link href="/ucas-personal-statement">
                <span className="t">Applying to UK universities? Check your UCAS statement.</span>
                <span className="s">From 2026 entry the statement is three questions. Each answer is read from an admissions-tutor perspective, with exact character checks.</span>
                <span className="arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* 9. Questions */}
      <section className="cmp-faq">
        <div className="cmp-wrap">
          <h2>Questions</h2>
          {FAQ.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 10. Last call */}
      <section className="cmp-end">
        <div className="cmp-wrap">
          <h2>Mark your draft while you can still change it.</h2>
          <div className="cmp-act">
            <Link href="/essay" className="cmp-btn">{primary}</Link>
          </div>
          <p className="cmp-fine">{previewUsed ? "Results in about a minute. Refundable within 7 days." : "No credit card required. Results in about a minute."}</p>
        </div>
      </section>

      <footer className="cmp-foot">
        <div className="cmp-wrap">
          <nav aria-label="Site">
            <Link href="/essay">Essay grader</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/remark">Re-mark checker</Link>
            <Link href="/ucas-personal-statement">UCAS statement</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/refund-policy">Refund policy</Link>
            <Link href="/resources/academic-integrity">Academic integrity</Link>
            <button type="button" onClick={() => window.dispatchEvent(new Event("iblens:cookie-settings"))}>Cookie settings</button>
          </nav>
          <nav aria-label="Subjects" className="subjects">
            {SUBJECT_LINKS.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
          <p className="cmp-fine">
            &copy; {new Date().getFullYear()} IBLens. Independent of the International Baccalaureate Organization, which does not endorse it. Every mark is an AI estimate, not an IB mark. Your text is processed by Anthropic PBC.
          </p>
        </div>
      </footer>
    </div>
  );
}
