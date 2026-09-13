import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { PRICE_LABELS, type ProductKey } from "@shared/pricing";
import { SEOHead } from "@/components/SEOHead";
import { PurchaseModal } from "@/components/PurchaseModal";
import { useState } from "react";
import {
  CheckCircle2, ArrowRight, Gift,
  ChevronDown, ChevronUp, ShieldCheck
} from "lucide-react";
import { SampleReports } from "@/components/SampleReports";
import { usePreviewUsed } from "@/hooks/usePreviewUsed";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

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
  const previewUsed = usePreviewUsed();
  const { isAuthenticated } = useAuth();
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [purchaseSku, setPurchaseSku] = useState<ProductKey>("ESSAY_PACK_5");

  const openPurchase = (sku: ProductKey) => {
    setPurchaseSku(sku);
    setPurchaseModalOpen(true);
  };

  return (
    <>
      <PurchaseModal open={purchaseModalOpen} onOpenChange={setPurchaseModalOpen} sku={purchaseSku} />
      <SEOHead
        title="IB Essay Grader 2026: Free Preview, AI Feedback on IA, EE & TOK | IBLens"
        description="AI feedback on your IB essay in about a minute: marks against the published criteria, an estimated band, the risks costing you marks, and what to fix first. Free preview, no account needed."
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
            mainEntity: [
              {
                "@type": "Question",
                name: "How does IBLens analyse my IB essay?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "IBLens uses a large language model instructed with the published IB assessment criteria for your subject and session. It marks each criterion (the set depends on your subject), gives an estimated score, identifies the risks that could lose marks, and suggests specific improvements.",
                },
              },
              {
                "@type": "Question",
                name: "Which IB essay types does IBLens support?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "IBLens supports coursework in 14 subjects (the IA in eleven, plus the externally assessed coursework in Visual Arts, Music and Film), Extended Essays (EE), TOK essays and the TOK exhibition. Each type is analysed against its own published criteria.",
                },
              },
              {
                "@type": "Question",
                name: "Is my first essay analysis really free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. The first preview is free: your band range, feedback on your weakest criterion (for the TOK essay and exhibition, which are marked as a whole, the start of the explanation) and the top risks in your draft. The complete report, with an estimated mark and comments for every criterion and a ranked list of fixes, unlocks for $9.99.",
                },
              },
              {
                "@type": "Question",
                name: "How accurate is the estimated mark?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It is an estimate, not a mark. No tool can guarantee an exact score. The model is instructed with the published criteria for your subject and session, and its estimate has not been measured against examiner marks, so the value of the report is in which criterion it flags and why.",
                },
              },
              {
                "@type": "Question",
                name: "Is my essay data kept private and secure?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Your essay is sent to our AI provider (Anthropic PBC) over an encrypted connection solely to generate your analysis. We do not use it to train any AI model, we do not sell it, and we do not share it with your school, universities, or other students. IBLens never saves the essay text; Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. An anonymous report you did not buy is deleted after 90 days.",
                },
              },
              {
                "@type": "Question",
                name: "What payment methods do you accept?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Payments are handled by Lemon Squeezy, which accepts major cards and the other methods shown at checkout. Your reports are added automatically once the payment is confirmed.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use IBLens for multiple subjects?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "IBLens marks coursework in 14 subjects: Business Management, Economics, History, Biology, Chemistry, Physics, Mathematics, English A Language and Literature, English A Literature, Psychology, Computer Science, Visual Arts, Music and Film. Each analysis uses that subject's own criteria. Subjects outside this list are not offered, because the grader carries only the criteria for the subjects listed here. Visual Arts can be marked only for sessions through November 2026: from May 2027 the comparative study is no longer set.",
                },
              },
              {
                "@type": "Question",
                name: "What if I'm not satisfied with my analysis?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Email us at glushkovim@gmail.com within 7 days of your purchase and we'll refund you in full, no questions asked. We process refunds via the original payment method within 3-5 business days.",
                },
              },
            ],
          },
        ]}
      />
      <div>
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left column */}
              <div>
                <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">IB Essay Grader</p>
                <h1 style={SERIF} className="text-5xl font-bold leading-tight mb-6">
                  Know where<br />your marks go<br /><em className="text-primary">before you submit.</em>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
                  Paste your essay. AI marks it against the published IB criteria in about a minute.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <Button size="lg" className="text-base px-8 shadow-lg shadow-primary/25 min-h-11" asChild>
                    <Link href="/essay">{previewUsed ? "Mark my essay" : "Get my free preview"}</Link>
                  </Button>
                  <Button size="lg" variant="ghost" asChild>
                    <Link href="/resources/sample-reports">See sample TOK reports</Link>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">No subscription. No account needed. Instructed to apply the criteria as written and to be <strong>honest</strong> about weaknesses.</p>
              </div>

              {/* Right column, score card */}
              <div className="rounded-xl border border-border bg-card shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Business Management IA · Sample</p>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Sample</span>
                </div>
                <div style={SERIF} className="text-5xl font-bold mb-1">16 <span className="text-muted-foreground text-3xl">/</span> 25</div>
                <p className="text-sm text-muted-foreground mb-4">Sample report · illustrative</p>
                <div className="border-t border-border pt-4 space-y-3">
                  {SAMPLE_CRITERIA.map((c) => {
                    const pct = (c.score / c.max) * 100;
                    return (
                      <div key={c.name}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-foreground">{c.name}</span>
                          <span className="font-semibold text-xs">{c.score}/{c.max}</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social proof strip */}
        <div className="bg-muted/50 border-y border-border py-4">
          <div className="container">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-sm text-muted-foreground">
              <span><strong className="text-foreground">No account</strong> needed for your first essay</span>
              <span className="hidden sm:block text-border">|</span>
              <span><strong className="text-foreground">Every criterion</strong> in the full report</span>
              <span className="hidden sm:block text-border">|</span>
              <span><strong className="text-foreground">IA · EE · TOK</strong></span>
              <span className="hidden sm:block text-border">|</span>
              <span><strong className="text-foreground">Free</strong> first preview</span>
            </div>
          </div>
        </div>

        {/* Features, numbered */}
        <section className="py-20" id="sample">
          <div className="container">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3 text-center">How IBLens marks</p>
            <h2 style={SERIF} className="text-3xl font-bold text-center mb-12">Built on the actual IB rubric.</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { n: "01", title: "The published criteria", desc: "The criteria for your subject and exam session, with their real mark allocations, including the May 2027 changes." },
                { n: "02", title: "Criterion feedback", desc: "Written feedback criterion by criterion in the full report, not just a total. See where the marks are lost." },
                { n: "03", title: "About a minute", desc: "Paste, click, read. No account needed for your first preview, and IBLens counts your words against the official limit." },
              ].map(f => (
                <div key={f.n} className="border-t-2 border-primary pt-6">
                  <p style={SERIF} className="text-4xl font-bold text-primary mb-4">{f.n}</p>
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Two tools */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3 text-center">What you get</p>
            <h2 style={SERIF} className="text-3xl font-bold text-center mb-12">Two tools, one platform.</h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="rounded-xl border border-border bg-card p-8">
                <h3 style={SERIF} className="text-xl font-bold mb-3">Essay Grader</h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Get detailed feedback on your IA, Extended Essay, TOK essay or exhibition, or English A individual oral. Estimated marks against the published criteria, and specific steps to improve.
                </p>
                <ul className="space-y-2.5 text-sm mb-6">
                  {["Estimated score & IB band", "Criteria breakdown with progress bars", "Risk areas that lose marks", "Leverage zones to gain marks", "Actionable next steps"].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">Free preview</span>
                  <span className="text-xs text-muted-foreground">then $9.99 per report, two re-checks included</span>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/essay">Try it now <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>

              <div className="rounded-xl border border-border bg-card p-8">
                <h3 style={SERIF} className="text-xl font-bold mb-3">UCAS Personal Statement Checker</h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Applying to UK universities? From 2026 entry the personal statement is three separate questions, not one essay. Get a read on each answer from an admissions-tutor perspective.
                </p>
                <ul className="space-y-2.5 text-sm mb-6">
                  {["All three answers reviewed separately", "Exact character checks against the 4,000 limit", "What a tutor would credit, and what they would miss", "Whether it reads as your subject specifically", "Ranked revision list"].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded whitespace-nowrap">Free preview</span>
                  <span className="text-xs text-muted-foreground">No invented score, because UCAS publishes no mark scheme</span>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/ucas-personal-statement">Check my statement <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Reports Section */}
        <SampleReports />

        {/* Founder Story Section */}
        <section className="py-20 bg-background border-y border-border">
          <div className="container max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <img
                  src="/founder.jpg"
                  alt="Ivan Glushkov, founder of IBLens"
                  className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover object-top shadow-md"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Why IBLens exists</p>
                <h2 style={SERIF} className="text-2xl font-bold mb-4">
                  "I built this because my daughter's IB tutor charged $120 for one feedback session, and it came the week before the deadline."
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The IB's assessment criteria are written down in its subject guides, and a trained examiner knows them by heart. So I asked: why can't an AI read a draft against those same criteria, in about a minute, for any student?
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  IBLens is the result. It doesn't replace your teacher. It shows you, criterion by criterion, where a draft stands against the criteria, before you've run out of time to act on it. The first preview is free, with no account needed.
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <img
                    src="/founder.jpg"
                    alt="Ivan"
                    className="w-9 h-9 rounded-full object-cover object-top flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm font-semibold">Ivan, founder of IBLens</p>
                    <p className="text-xs text-muted-foreground">IB parent · built for students who can't afford to wait</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tutor Comparison Section */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">The honest comparison</p>
            <h2 style={SERIF} className="text-2xl font-bold mb-10">What does IB feedback actually cost?</h2>
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
              <div className="bg-background border-2 border-border rounded-xl p-5 text-center">
                <p className="font-semibold mb-1">IB Tutor</p>
                <div className="text-2xl font-bold text-muted-foreground mb-1">By the hour</div>
                <p className="text-xs text-muted-foreground">Subject judgement no tool has, but paid per session and booked around someone else's calendar.</p>
              </div>
              <div className="bg-background border-2 border-border rounded-xl p-5 text-center">
                <p className="font-semibold mb-1">IB Teacher</p>
                <div className="text-2xl font-bold text-muted-foreground mb-1">Free</div>
                <p className="text-xs text-muted-foreground">Knows you and your school, and marks your IA against the criteria, but comments on coursework drafts are limited, usually to one.</p>
              </div>
              <div className="bg-primary/5 border-2 border-primary rounded-xl p-5 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full whitespace-nowrap">Recommended</div>
                <p className="font-semibold mb-1">IBLens</p>
                <div style={SERIF} className="text-2xl font-bold text-primary mb-1">$9.99</div>
                <p className="text-xs text-muted-foreground">Full criterion breakdown, estimated score and risk areas in about a minute, with two re-checks.</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Your first preview is free, one per device or account. No credit card, no account.</p>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-background" id="pricing">
          <div className="container">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Pricing</p>
              <h2 style={SERIF} className="text-3xl font-bold mb-3">Pay only for what you use.</h2>
              <p className="text-muted-foreground text-lg">No subscriptions. No commitments. Your first preview is free.</p>
            </div>

            {/* Free tier highlight */}
            <div className="max-w-md mx-auto mb-8">
              <Card className="border-2 border-primary/20 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                  Free
                </div>
                <CardContent className="p-6 text-center">
                  <Gift className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 style={SERIF} className="text-xl font-bold mb-1">First Essay Preview</h3>
                  <div style={SERIF} className="text-3xl font-bold mb-2">$0</div>
                  <p className="text-xs text-muted-foreground mb-4">Band range, weakest criterion and top risks. No credit card required.</p>
                  <Button variant="outline" className="w-full min-h-11" asChild>
                    <Link href="/essay">Get a free preview</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Paid plans grid */}
            <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
              <Card className="border border-border">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-1">Full report</h3>
                  <div style={SERIF} className="text-3xl font-bold mb-2">{PRICE_LABELS.ESSAY_SINGLE}</div>
                  <p className="text-xs text-muted-foreground mb-4">One report, with two re-checks</p>
                  <Button variant="outline" className="w-full min-h-11" asChild>
                    <Link href="/essay">Mark my work</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-border">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-1">5 reports</h3>
                  <div style={SERIF} className="text-3xl font-bold mb-1">{PRICE_LABELS.ESSAY_PACK_5}</div>
                  <p className="text-xs text-muted-foreground mb-4">$5.00 per report</p>
                  <Button variant="outline" className="w-full min-h-11" onClick={() => openPurchase("ESSAY_PACK_5")}>
                    Buy 5 reports
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full whitespace-nowrap">
                  Lowest price per report
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-1">10 reports</h3>
                  <div style={SERIF} className="text-3xl font-bold mb-1">{PRICE_LABELS.ESSAY_PACK_10}</div>
                  <p className="text-xs text-muted-foreground mb-4">$4.50 per report</p>
                  <Button className="w-full min-h-11" onClick={() => openPurchase("ESSAY_PACK_10")}>
                    Buy 10 reports
                  </Button>
                </CardContent>
              </Card>

            </div>

            <div className="flex flex-col items-center gap-4 mt-10">
              <div className="flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
                <ShieldCheck className="w-4 h-4" />
                <span>7-day money-back guarantee, no questions asked</span>
                <Link href="/refund-policy" className="text-primary underline underline-offset-2 ml-1 text-xs">Details</Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30" id="faq">
          <div className="container">
            <div className="text-center mb-14">
              <h2 style={SERIF} className="text-3xl font-bold mb-3">Frequently asked questions</h2>
            </div>

            <div className="max-w-2xl mx-auto bg-background rounded-xl border p-6 md:p-8">
              <FAQItem
                question="How does IBLens analyse my IB essay?"
                answer="IBLens uses a large language model instructed with the published IB assessment criteria for your subject and session. It marks each criterion (the set depends on your subject), gives an estimated score, identifies the risks that could lose marks, and suggests specific improvements."
              />
              <FAQItem
                question="Which IB essay types does IBLens support?"
                answer="IBLens supports coursework in 14 subjects (the IA in eleven, plus the externally assessed coursework in Visual Arts, Music and Film), Extended Essays (EE), TOK essays and the TOK exhibition. Each type is analysed against its own published criteria."
              />
              <FAQItem
                question="Is my first essay analysis really free?"
                answer="Yes. The first preview is free: your band range, feedback on your weakest criterion (for the TOK essay and exhibition, which are marked as a whole, the start of the explanation) and the top risks in your draft. The complete report, with an estimated mark and comments for every criterion and a ranked list of fixes, unlocks for $9.99."
              />
              <FAQItem
                question="How accurate is the estimated mark?"
                answer="It is an estimate, not a mark. No tool can guarantee an exact score. The model is instructed with the published criteria for your subject and session, and its estimate has not been measured against examiner marks, so the value of the report is in which criterion it flags and why."
              />
              <FAQItem
                question="Is my essay data kept private and secure?"
                answer="Your essay is sent to our AI provider (Anthropic PBC) over an encrypted connection solely to generate your analysis. We do not use it to train any AI model, we do not sell it, and we do not share it with your school, universities, or other students. IBLens never saves the essay text; Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. An anonymous report you did not buy is deleted after 90 days."
              />
              <FAQItem
                question="What payment methods do you accept?"
                answer="Payments are handled by Lemon Squeezy, which accepts major cards and the other methods shown at checkout. Your reports are added automatically once the payment is confirmed."
              />
              <FAQItem
                question="Can I use IBLens for multiple subjects?"
                answer="IBLens marks coursework in 14 subjects: Business Management, Economics, History, Biology, Chemistry, Physics, Mathematics, English A Language and Literature, English A Literature, Psychology, Computer Science, Visual Arts, Music and Film. Each analysis uses that subject's own criteria. Subjects outside this list are not offered, because the grader carries only the criteria for the subjects listed here. Visual Arts can be marked only for sessions through November 2026: from May 2027 the comparative study is no longer set."
              />
              <FAQItem
                question="What if I'm not satisfied with my analysis?"
                answer="Email us at glushkovim@gmail.com within 7 days of your purchase and we'll refund you in full, no questions asked. We process refunds via the original payment method within 3-5 business days."
              />
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-background">
          <div className="container text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Get started</p>
            <h2 style={SERIF} className="text-3xl font-bold mb-4">Ready to improve your IB score?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Paste a draft and see which criterion is costing you the most, while you can still change it.
            </p>
            <Button size="lg" className="text-base px-8 h-12 shadow-lg shadow-primary/25" asChild>
              <Link href="/essay">
                Start your free preview <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-4">No credit card required. Results in about a minute.</p>
          </div>
        </section>

        {/* Enhanced Footer with SEO links */}
        <section className="py-10 border-t border-border bg-muted/30">
          <div className="container">
            <div className="grid sm:grid-cols-3 gap-8 text-sm">
              <div>
                <h4 className="font-semibold mb-3">Tools</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="/essay" className="hover:text-foreground transition-colors">IB Essay Grader</Link></li>
                  <li><Link href="/essay/extended-essay" className="hover:text-foreground transition-colors">Extended Essay Grader</Link></li>
                  <li><Link href="/essay/tok-essay" className="hover:text-foreground transition-colors">TOK Essay Grader</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Supported Subjects</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="/essay/business-management-ia" className="hover:text-foreground transition-colors">Business Management IA</Link></li>
                  <li><Link href="/essay/economics-ia" className="hover:text-foreground transition-colors">Economics IA</Link></li>
                  <li><Link href="/essay/history-ia" className="hover:text-foreground transition-colors">History IA</Link></li>
                  <li><Link href="/essay/biology-ia" className="hover:text-foreground transition-colors">Biology IA</Link></li>
                  <li><Link href="/essay/chemistry-ia" className="hover:text-foreground transition-colors">Chemistry IA</Link></li>
                  <li><Link href="/essay/physics-ia" className="hover:text-foreground transition-colors">Physics IA</Link></li>
                  <li><Link href="/essay/math-ia" className="hover:text-foreground transition-colors">Mathematics IA</Link></li>
                  <li><Link href="/essay/psychology-ia" className="hover:text-foreground transition-colors">Psychology IA</Link></li>
                  <li><Link href="/essay/english-essay" className="hover:text-foreground transition-colors">English Individual Oral</Link></li>
                  <li><Link href="/essay/tok-essay" className="hover:text-foreground transition-colors">TOK Essay</Link></li>
                  <li><Link href="/essay/tok-exhibition" className="hover:text-foreground transition-colors">TOK Exhibition</Link></li>
                  <li><Link href="/essay/extended-essay" className="hover:text-foreground transition-colors">Extended Essay (EE)</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Resources</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="/resources" className="hover:text-foreground transition-colors">All Guides</Link></li>
                  <li><Link href="/resources/ib-extended-essay-guide" className="hover:text-foreground transition-colors">Extended Essay Guide</Link></li>
                  <li><Link href="/resources/ib-internal-assessment-guide" className="hover:text-foreground transition-colors">IA Guide</Link></li>
                  <li><Link href="/resources/tok-essay-guide" className="hover:text-foreground transition-colors">TOK Essay Guide</Link></li>
                  <li><Link href="/resources/ib-grade-boundaries" className="hover:text-foreground transition-colors">Grade Boundaries</Link></li>
                  <li><Link href="/resources/ib-university-admissions" className="hover:text-foreground transition-colors">University Admissions</Link></li>
                  <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                  <li><Link href="/refund-policy" className="hover:text-foreground transition-colors">Refund Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
