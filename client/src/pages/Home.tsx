import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { PRICE_LABELS, type ProductKey } from "@shared/pricing";
import { SEOHead } from "@/components/SEOHead";
import { PurchaseModal } from "@/components/PurchaseModal";
import { useEffect, useState } from "react";
import {
  ArrowRight, Gift, ChevronDown, ChevronUp, ShieldCheck, Lock, Server, Sparkles, FileText, Quote
} from "lucide-react";
import { useMarkingCta } from "@/hooks/useMarkingCta";
import { HOME_HEADLINES, homeHeadlineVariant, recordHeadline } from "@/lib/headlineTest";

const SERIF = { fontFamily: "'Funnel Display', 'Funnel Sans', system-ui, sans-serif", letterSpacing: "-0.015em" };

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-medium text-sm md:text-base pr-4">{question}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      {open && (
        <p className="text-sm text-muted-foreground pb-5 leading-relaxed">{answer}</p>
      )}
    </div>
  );
}

const WHICH_WORK = "The IA or coursework in 14 subjects (Business Management, Economics, History, Biology, Chemistry, Physics, Mathematics, English A Language and Literature, English A Literature, Psychology, Computer Science, and the externally assessed coursework in Visual Arts, Music and Film), the Extended Essay, the TOK essay and the TOK exhibition. Each is marked on its own published criteria for your exam session. Subjects outside this list are not offered. Visual Arts can be marked only for sessions through November 2026: from May 2027 the comparative study is no longer set.";
const PREVIEW_FREE = "Yes. The first preview is free: a range of totals and, for most drafts, feedback on your weakest criterion and the top risks in your draft (for the TOK essay and exhibition, which are marked as a whole, the band, the start of the explanation and the top risks). The complete report, with an estimated mark, a mark and comment for each criterion that can be judged from your text (for the TOK essay and exhibition, the whole explanation) and a ranked list of fixes, unlocks for $9.99.";
const PAYMENT = "Payments are handled by Lemon Squeezy, which accepts major cards and the other methods shown at checkout. Your reports are added automatically once the payment is confirmed.";
const REFUND = "Email us at glushkovim@gmail.com within 7 days of your purchase and we'll refund you in full, no questions asked. We send the refund to the original payment method within 3-5 business days of approving it, and your bank may take a further 5-10 business days to show it.";

const FAQ: [string, string][] = [
  ["Which subjects and types of work does IBLens mark?", WHICH_WORK],
  ["Is the first preview really free?", PREVIEW_FREE],
  ["What payment methods do you accept?", PAYMENT],
  ["What if I'm not satisfied with my report?", REFUND],
];

const INTEGRITY_QUOTE = "abstain from receiving non-permitted assistance in the completion or editing of work, such as from friends, relatives, other students, private tutors, essay writing or copy-editing services, pre-written essay banks or file sharing websites";

// Sample score card criteria for hero
const SAMPLE_CRITERIA = [
  { name: "A: Integration of a key concept", score: 3, max: 5 },
  { name: "B: Supporting documents", score: 3, max: 4 },
  { name: "C: Selection and application of tools and theories", score: 3, max: 4 },
  { name: "D: Analysis and evaluation", score: 2, max: 5 },
  { name: "E: Conclusions", score: 2, max: 3 },
  { name: "F: Structure", score: 2, max: 2 },
  { name: "G: Presentation", score: 1, max: 2 },
];

export default function Home() {
  const { previewUsed, paidLabel, paidLeft } = useMarkingCta();
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [purchaseSku, setPurchaseSku] = useState<ProductKey>("ESSAY_PACK_5");
  const [variant] = useState(homeHeadlineVariant);
  const headline = HOME_HEADLINES[variant] ?? HOME_HEADLINES[0];
  useEffect(() => { recordHeadline("view"); }, []);

  const openPurchase = (sku: ProductKey) => {
    recordHeadline("cta");
    setPurchaseSku(sku);
    setPurchaseModalOpen(true);
  };
  const primaryLabel = previewUsed ? paidLabel : "Get my free preview";
  const trustLine = previewUsed
    ? `A full report is ${paidLeft > 0 ? "one of your paid reports" : PRICE_LABELS.ESSAY_SINGLE}, with two re-checks of your revised draft.`
    : `Free preview first. A full report is ${PRICE_LABELS.ESSAY_SINGLE}, with two re-checks of your revised draft.`;

  return (
    <>
      <PurchaseModal open={purchaseModalOpen} onOpenChange={setPurchaseModalOpen} sku={purchaseSku} />
      <SEOHead
        title="IB Essay Grader 2026: Free Preview, AI Feedback on IA, EE & TOK | IBLens"
        description="AI feedback on your IB essay in about a minute: marks against the published criteria, a range of totals, the risks costing you marks, and what to fix first. Free preview, no account needed."
        canonical="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "IBLens",
            url: "https://iblens.com",
            description: "AI-powered IB essay grader providing criterion-based feedback and estimated marks for Extended Essays, Internal Assessments, and TOK essays.",
            
          },
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "IBLens",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            url: "https://iblens.com",
            offers: {
              "@type": "AggregateOffer",
              lowPrice: "0",
              highPrice: "44.99",
              priceCurrency: "USD",
            },
            description: "AI-powered IB essay grader giving feedback against the published criteria with estimated marks.",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
          },
        ]}
      />
      <div>
        {/* Hero: the promise, the button and the product, all on the first screen of a phone */}
        <section className="pt-8 pb-14 md:py-24 bg-background">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">IB essay grader</p>
                <h1 style={SERIF} className="text-[2rem] leading-[1.12] sm:text-4xl md:text-5xl font-bold md:leading-[1.1] mb-3 md:mb-4">
                  {headline.lead} <em className="text-primary">{headline.rest}</em>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5 md:mb-6 max-w-md">
                  Coursework in 14 subjects, the Extended Essay and TOK, marked on the criteria for your exam session. No account needed.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:mb-3">
                  <Button size="lg" className="text-base px-8 shadow-lg shadow-primary/25 min-h-12" asChild>
                    <Link href="/essay" onClick={() => recordHeadline("cta")}>{primaryLabel}</Link>
                  </Button>
                  <Button size="lg" variant="ghost" className="hidden lg:inline-flex min-h-11" asChild>
                    <Link href="/resources/sample-reports">Read three real reports</Link>
                  </Button>
                </div>
                <p className="hidden lg:block text-sm text-muted-foreground">{trustLine}</p>
              </div>

              {/* Sample report */}
              <div className="rounded-xl border border-border bg-card shadow-sm p-5 md:p-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Business Management IA</p>
                  <p className="text-[11px] text-muted-foreground">Illustration, made-up scores</p>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span style={SERIF} className="text-4xl md:text-5xl font-bold">16</span>
                  <span className="text-muted-foreground text-xl">/ 25</span>
                  <span className="ml-2 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">Estimate</span>
                </div>
                <div className="space-y-2.5">
                  {SAMPLE_CRITERIA.map((c) => {
                    const weakest = c.name.startsWith("D:");
                    return (
                      <div key={c.name}>
                        <div className="flex items-center justify-between gap-3 text-sm mb-1">
                          <span className={weakest ? "font-semibold text-foreground" : "text-foreground"}>{c.name}</span>
                          <span className="font-semibold text-xs tabular-nums">{c.score}/{c.max}</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${weakest ? "bg-amber-500" : "bg-primary"}`} style={{ width: `${(c.score / c.max) * 100}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-950">
                  <p className="font-semibold mb-1">Costing you the most: D, Analysis and evaluation</p>
                  <p className="text-amber-900">Fix first: judge what your supporting documents show about the research question, instead of summarising them.</p>
                </div>
              </div>
              <p className="lg:hidden text-sm text-muted-foreground -mt-2">
                {trustLine} <Link href="/resources/sample-reports" className="text-primary underline underline-offset-2">Read three real reports</Link>
              </p>
            </div>
          </div>
        </section>

        {/* Objection 1: is the mark accurate? */}
        <section className="py-14 md:py-20 border-t border-border">
          <div className="container max-w-4xl">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Is it accurate?</p>
            <h2 style={SERIF} className="text-3xl font-bold mb-8 md:mb-12 max-w-2xl">How far to trust the estimate.</h2>
            <ol className="grid md:grid-cols-3 gap-6 md:gap-8">
              <li className="border-t-2 border-primary pt-5">
                <h3 className="text-lg font-semibold mb-2 flex md:block items-baseline gap-3"><span style={SERIF} className="md:block text-2xl md:text-3xl font-bold text-primary md:mb-3">01</span>The real criteria</h3>
                <p className="text-muted-foreground leading-relaxed">Your draft is read against the IB criteria for its subject and exam session, with their mark allocations, including the May 2027 changes.</p>
              </li>
              <li className="border-t-2 border-primary pt-5">
                <h3 className="text-lg font-semibold mb-2 flex md:block items-baseline gap-3"><span style={SERIF} className="md:block text-2xl md:text-3xl font-bold text-primary md:mb-3">02</span>An estimate, not an IB mark</h3>
                <p className="text-muted-foreground leading-relaxed">We have not measured it against examiner marks, so treat the number as a guide. The useful part is which criterion it flags, and why.</p>
              </li>
              <li className="border-t-2 border-primary pt-5">
                <h3 className="text-lg font-semibold mb-2 flex md:block items-baseline gap-3"><span style={SERIF} className="md:block text-2xl md:text-3xl font-bold text-primary md:mb-3">03</span>Judge it before you pay</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Three TOK essays, marked by IBLens and left unedited, with our notes on where the reports stray from the descriptors.{" "}
                  <Link href="/resources/sample-reports" className="text-primary underline underline-offset-2">Read them</Link>
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* Objection 2: is it allowed? */}
        <section className="py-14 md:py-20 bg-muted/30">
          <div className="container max-w-4xl">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Is it allowed?</p>
            <h2 style={SERIF} className="text-3xl font-bold mb-8 max-w-2xl">Ask your teacher before you paste.</h2>
            <div className="grid md:grid-cols-5 gap-8 items-start">
              <figure className="md:col-span-3 rounded-xl bg-background border border-border p-5 md:p-6">
                <Quote className="w-5 h-5 text-primary mb-3" aria-hidden="true" />
                <blockquote className="text-[15px] md:text-base leading-relaxed">
                  The IB academic integrity policy asks students to &ldquo;{INTEGRITY_QUOTE}&rdquo;.
                </blockquote>
                <figcaption className="text-xs text-muted-foreground mt-3">IB, Academic integrity policy</figcaption>
              </figure>
              <ul className="md:col-span-2 space-y-4 text-sm leading-relaxed">
                <li><strong>IA, TOK and orals:</strong> check that your teacher and your school allow outside feedback on the work first.</li>
                <li><strong>Extended Essay:</strong> the guide says students are not allowed to receive assistance with any aspect of the research, writing or proofreading of the essay beyond that which is permitted through their supervisor, so ask your supervisor.</li>
                <li><strong>Your words stay yours:</strong> the grader is instructed to say what to change, never to write sentences you could paste in. If any wording from a report goes into your work, credit it.</li>
                <li><Link href="/resources/academic-integrity" className="text-primary underline underline-offset-2">Using AI feedback within IB rules</Link></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Objection 3: where does my text go? */}
        <section className="py-14 md:py-20">
          <div className="container max-w-4xl">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Your text</p>
            <h2 style={SERIF} className="text-3xl font-bold mb-8 max-w-2xl">Where your essay goes, and what is kept.</h2>
            <ol className="grid grid-cols-2 md:flex md:flex-row md:items-stretch gap-2 md:gap-0 mb-8" aria-label="The path your text takes">
              {[
                { icon: Lock, title: "Your browser", note: "encrypted connection" },
                { icon: Server, title: "Our relay in Helsinki", note: "passes it on" },
                { icon: Sparkles, title: "Anthropic", note: "the AI provider that marks it" },
                { icon: FileText, title: "Your report", note: "saved, can quote short passages" },
              ].map((step, i, all) => (
                <li key={step.title} className="flex md:flex-1 items-center md:text-center">
                  <div className="flex flex-col items-center text-center gap-1.5 md:gap-2 flex-1 h-full rounded-lg border border-border bg-card px-3 py-3 md:px-4 md:py-4 w-full">
                    <step.icon className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold">{step.title}</p>
                      <p className="text-xs text-muted-foreground">{step.note}</p>
                    </div>
                  </div>
                  {i < all.length - 1 && <ArrowRight className="hidden md:block w-4 h-4 mx-1 text-muted-foreground flex-shrink-0" aria-hidden="true" />}
                </li>
              ))}
            </ol>
            <ul className="grid md:grid-cols-3 gap-6 text-sm leading-relaxed text-muted-foreground">
              <li><strong className="text-foreground">The text itself is not stored.</strong> IBLens never saves it, and Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise.</li>
              <li><strong className="text-foreground">Not for training, not for sale.</strong> Your essay is not used to train AI models and is not shared with your school, universities or other students.</li>
              <li><strong className="text-foreground">The report is kept.</strong> It can quote short passages. Without an account, a report you did not buy is deleted after 90 days; a signed-in history stays until you delete it. Details are in the <Link href="/privacy" className="text-primary underline underline-offset-2">Privacy Policy</Link>.</li>
            </ul>
          </div>
        </section>

        {/* Objection 4: price */}
        <section className="py-14 md:py-20 bg-muted/30" id="pricing">
          <div className="container">
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Pricing</p>
              <h2 style={SERIF} className="text-3xl font-bold mb-3">Pay per report, not per hour.</h2>
              <p className="text-muted-foreground">
                A tutor charges by the hour, and teachers usually comment on one draft of coursework. A report is {PRICE_LABELS.ESSAY_SINGLE} and includes two re-checks of your revised draft within 14 days. No subscription.
              </p>
            </div>

            {!previewUsed && (
              <div className="max-w-4xl mx-auto mb-5 rounded-xl border-2 border-primary/20 bg-background p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <Gift className="w-7 h-7 text-primary flex-shrink-0" aria-hidden="true" />
                <div className="flex-1">
                  <p className="font-semibold">First preview: <span style={SERIF} className="text-xl">$0</span></p>
                  <p className="text-sm text-muted-foreground">A range of totals and, for most drafts, your weakest criterion and the top risks. No credit card, no account.</p>
                </div>
                <Button variant="outline" className="min-h-11" asChild>
                  <Link href="/essay" onClick={() => recordHeadline("cta")}>Get a free preview</Link>
                </Button>
              </div>
            )}

            <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <Card className="border border-border py-0 sm:py-6 gap-0">
                <CardContent className="p-4 sm:p-5 grid grid-cols-[1fr_auto] items-center gap-x-4 sm:block sm:text-center">
                  <h3 className="font-semibold sm:mb-1">Full report</h3>
                  <div style={SERIF} className="text-2xl sm:text-3xl font-bold sm:mb-1 row-span-2 text-right sm:text-center">{PRICE_LABELS.ESSAY_SINGLE}</div>
                  <p className="text-xs text-muted-foreground sm:mb-4">One report, with two re-checks</p>
                  <Button variant="outline" className="w-full min-h-11 col-span-2 mt-3 sm:mt-0" asChild>
                    <Link href="/essay" onClick={() => recordHeadline("cta")}>Mark my work</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border border-border py-0 sm:py-6 gap-0">
                <CardContent className="p-4 sm:p-5 grid grid-cols-[1fr_auto] items-center gap-x-4 sm:block sm:text-center">
                  <h3 className="font-semibold sm:mb-1">5 reports</h3>
                  <div style={SERIF} className="text-2xl sm:text-3xl font-bold sm:mb-1 row-span-2 text-right sm:text-center">{PRICE_LABELS.ESSAY_PACK_5}</div>
                  <p className="text-xs text-muted-foreground sm:mb-4">$5.00 per report</p>
                  <Button variant="outline" className="w-full min-h-11 col-span-2 mt-3 sm:mt-0" onClick={() => openPurchase("ESSAY_PACK_5")}>Buy 5 reports</Button>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary relative py-0 sm:py-6 gap-0">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full whitespace-nowrap">Lowest price per report</div>
                <CardContent className="p-4 pt-5 sm:p-5 grid grid-cols-[1fr_auto] items-center gap-x-4 sm:block sm:text-center">
                  <h3 className="font-semibold sm:mb-1">10 reports</h3>
                  <div style={SERIF} className="text-2xl sm:text-3xl font-bold sm:mb-1 row-span-2 text-right sm:text-center">{PRICE_LABELS.ESSAY_PACK_10}</div>
                  <p className="text-xs text-muted-foreground sm:mb-4">$4.50 per report</p>
                  <Button className="w-full min-h-11 col-span-2 mt-3 sm:mt-0" onClick={() => openPurchase("ESSAY_PACK_10")}>Buy 10 reports</Button>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mt-8">
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-xl sm:rounded-full text-center">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                <span>7-day money-back guarantee, no questions asked</span>
                <Link href="/refund-policy" className="text-primary underline underline-offset-2 text-xs">Details</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why it exists */}
        <section className="py-14 md:py-20">
          <div className="container max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img
                src="/founder.jpg"
                alt="Ivan Glushkov, founder of IBLens"
                width={96}
                height={96}
                loading="lazy"
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover object-top shadow-md flex-shrink-0"
              />
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Why IBLens exists</p>
                <h2 style={SERIF} className="text-2xl font-bold mb-4">
                  "I built this because my son's IB tutor charged $120 for one feedback session, and it came the week before the deadline."
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The IB's criteria are written down in its subject guides. IBLens reads a draft against those same criteria in about a minute, while there is still time to act on what it finds. It does not replace your teacher.
                </p>
                <p className="text-sm font-semibold">Ivan, founder of IBLens</p>
                <p className="text-xs text-muted-foreground">IB parent</p>
              </div>
            </div>
          </div>
        </section>

        {/* Other tools */}
        <section className="py-12 md:py-16 bg-muted/30 border-y border-border">
          <div className="container max-w-4xl">
            <h2 style={SERIF} className="text-2xl font-bold mb-6">Also on IBLens</h2>
            <ul className="divide-y divide-border rounded-xl border border-border bg-background">
              <li>
                <Link href="/remark" className="flex items-center gap-4 p-5 hover:bg-muted/40 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold">Results in? Should you pay for a re-mark?</p>
                    <p className="text-sm text-muted-foreground">Whether a re-mark is worth it, what it can cost you, and the deadlines: 15 September for the May session, 15 March for November.</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/ucas-personal-statement" className="flex items-center gap-4 p-5 hover:bg-muted/40 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold">Applying to UK universities? UCAS personal statement checker</p>
                    <p className="text-sm text-muted-foreground">From 2026 entry the statement is three questions. Each answer is read from an admissions-tutor perspective, with exact character checks.</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 md:py-20" id="faq">
          <div className="container">
            <h2 style={SERIF} className="text-3xl font-bold mb-8 text-center">Frequently asked questions</h2>
            <div className="max-w-2xl mx-auto bg-background rounded-xl border p-5 md:p-8">
              {FAQ.map(([q, a]) => <FAQItem key={q} question={q} answer={a} />)}
            </div>
          </div>
        </section>

        {/* Final call to action */}
        <section className="py-14 md:py-20 bg-muted/30 border-t border-border">
          <div className="container text-center max-w-2xl mx-auto">
            <h2 style={SERIF} className="text-3xl font-bold mb-4">Mark your draft while you can still change it.</h2>
            <p className="text-muted-foreground mb-8">{previewUsed ? "Every report comes with two re-checks of your revised draft." : "The free preview takes about a minute."}</p>
            <Button size="lg" className="text-base px-8 min-h-12 shadow-lg shadow-primary/25" asChild>
              <Link href="/essay" onClick={() => recordHeadline("cta")}>
                {previewUsed ? paidLabel : "Start your free preview"} <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-4">{previewUsed ? "Results in about a minute. Refundable within 7 days." : "No credit card required. Results in about a minute."}</p>
          </div>
        </section>

        {/* Links for search engines and for students looking for their subject */}
        <section className="py-10 border-t border-border">
          <div className="container grid sm:grid-cols-3 gap-8 text-sm">
            <nav aria-label="Tools">
              <h3 className="font-semibold mb-3">Tools</h3>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 sm:block sm:space-y-2 text-muted-foreground">
                <li><Link href="/essay" className="hover:text-foreground">IB essay grader</Link></li>
                <li><Link href="/essay/extended-essay" className="hover:text-foreground">Extended Essay grader</Link></li>
                <li><Link href="/essay/tok-essay" className="hover:text-foreground">TOK essay grader</Link></li>
                <li><Link href="/remark" className="hover:text-foreground">Re-mark checker</Link></li>
                <li><Link href="/ucas-personal-statement" className="hover:text-foreground">UCAS statement checker</Link></li>
              </ul>
            </nav>
            <nav aria-label="Subject pages">
              <h3 className="font-semibold mb-3">Subject pages</h3>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground">
                {[
                  ["/essay/business-management-ia", "Business Management IA"],
                  ["/essay/economics-ia", "Economics IA"],
                  ["/essay/history-ia", "History IA"],
                  ["/essay/biology-ia", "Biology IA"],
                  ["/essay/chemistry-ia", "Chemistry IA"],
                  ["/essay/physics-ia", "Physics IA"],
                  ["/essay/math-ia", "Mathematics IA"],
                  ["/essay/maths-aa-ia", "Maths AA IA"],
                  ["/essay/maths-ai-ia", "Maths AI IA"],
                  ["/essay/computer-science-ia", "Computer Science IA"],
                  ["/essay/psychology-ia", "Psychology IA"],
                  ["/essay/english-essay", "English A individual oral"],
                  ["/essay/tok-essay", "TOK essay"],
                  ["/essay/tok-exhibition", "TOK exhibition"],
                  ["/essay/extended-essay", "Extended Essay (EE)"],
                ].map(([href, label]) => (
                  <li key={href}><Link href={href} className="hover:text-foreground">{label}</Link></li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Resources">
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 sm:block sm:space-y-2 text-muted-foreground">
                <li><Link href="/resources" className="hover:text-foreground">All guides</Link></li>
                <li><Link href="/resources/ib-extended-essay-guide" className="hover:text-foreground">Extended Essay guide</Link></li>
                <li><Link href="/resources/ib-internal-assessment-guide" className="hover:text-foreground">IA guide</Link></li>
                <li><Link href="/resources/tok-essay-guide" className="hover:text-foreground">TOK essay guide</Link></li>
                <li><Link href="/resources/ib-grade-boundaries" className="hover:text-foreground">Grade boundaries</Link></li>
                <li><Link href="/resources/ib-university-admissions" className="hover:text-foreground">University admissions</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="/refund-policy" className="hover:text-foreground">Refund policy</Link></li>
              </ul>
            </nav>
          </div>
        </section>
      </div>
    </>
  );
}
