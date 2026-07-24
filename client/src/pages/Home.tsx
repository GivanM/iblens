import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { PRICE_LABELS, type ProductKey } from "@shared/pricing";
import { SEOHead } from "@/components/SEOHead";
import { PurchaseModal } from "@/components/PurchaseModal";
import { useState, useEffect, useMemo } from "react";
import {
  CheckCircle2, ArrowRight, Gift,
  Clock, ChevronDown, ChevronUp, ShieldCheck
} from "lucide-react";
import { SampleReports } from "@/components/SampleReports";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

function useExamCountdown() {
  const [now, setNow] = useState(new Date());
  const examDate = useMemo(() => {
    const current = new Date();
    let year = current.getFullYear();
    const may1 = new Date(year, 4, 1);
    if (current > may1) year++;
    return new Date(year, 4, 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const diff = examDate.getTime() - now.getTime();
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  return { days, examYear: examDate.getFullYear() };
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
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
  { name: "A: Research question", score: 2, max: 3 },
  { name: "B: Methodology", score: 3, max: 4 },
  { name: "C: Analysis & discussion", score: 7, max: 10 },
  { name: "D: Conclusions", score: 2, max: 3 },
  { name: "E: Evaluation", score: 2, max: 3 },
  { name: "F: Structure & presentation", score: 2, max: 2 },
];

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { days, examYear } = useExamCountdown();
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
        title="IBLens — Free IB Essay Grader & Feedback Tool"
        description="Free IB essay grader — upload your Extended Essay, IA, or TOK and get AI feedback with a predicted grade in 60 seconds. No credit card required."
        canonical="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "IBLens",
            url: "https://iblens.com",
            description: "AI-powered IB essay grader providing criterion-based feedback and predicted grades for Extended Essays, Internal Assessments, and TOK essays.",
            sameAs: [],
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
              highPrice: "34.99",
              priceCurrency: "USD",
            },
            description: "AI-powered IB essay grader providing criterion-by-criterion feedback and predicted grades.",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How does IBLens analyze my IB essay?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "IBLens uses advanced AI trained on IB marking criteria to analyze your essay. It evaluates each criterion (e.g., Knowledge and Understanding, Application, Analysis) and provides a predicted score, identifies risk areas that could lose marks, and suggests specific improvements.",
                },
              },
              {
                "@type": "Question",
                name: "Which IB essay types does IBLens support?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "IBLens supports Internal Assessments (IA) for all IB subjects, Extended Essays (EE), and Theory of Knowledge (TOK) essays. Each type is analyzed against its specific IB criteria.",
                },
              },
              {
                "@type": "Question",
                name: "Is my first essay analysis really free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes — every essay gets a free preview: your band range, your weakest criterion with full examiner-style feedback, and the top risks in your draft. The complete report — exact score, every criterion with comments, and a ranked fix list — unlocks for $4.99.",
                },
              },
              {
                "@type": "Question",
                name: "How accurate is the predicted IB score?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "IBLens provides a predicted score band based on IB marking criteria analysis. While no tool can guarantee exact scores, our AI is trained on IB standards and provides reliable estimates to help you understand where your essay stands and how to improve it.",
                },
              },
              {
                "@type": "Question",
                name: "Is my essay data kept private and secure?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Your essay is sent to our AI provider (Anthropic PBC) over an encrypted connection solely to generate your analysis. We do not use it to train any AI model, we do not sell it, and we do not share it with your school, universities, or other students. Anonymous analyses are not stored permanently.",
                },
              },
              {
                "@type": "Question",
                name: "What payment methods do you accept?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We accept card payments (Visa, Mastercard, Amex). The payment process is fast and secure — credits activate automatically after payment.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use IBLens for multiple subjects?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! IBLens supports all IB subjects including Business Management, Economics, History, Biology, Chemistry, Physics, Mathematics, English Literature, Psychology, and more. Each analysis is tailored to the specific subject's criteria.",
                },
              },
              {
                "@type": "Question",
                name: "What if I'm not satisfied with my analysis?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Email us at glushkovim@gmail.com within 7 days of your purchase and we'll refund you in full, no questions asked. We process refunds via the original payment method within 3–5 business days.",
                },
              },
            ],
          },
        ]}
      />
      <div>
        {/* Exam Countdown Banner */}
        {days > 0 && days < 200 && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2.5 text-center text-sm font-medium">
            <div className="container flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Only {days} days until IB {examYear} exams — get your essay graded now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left column */}
              <div>
                <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">IB Essay Grader</p>
                <h1 style={SERIF} className="text-5xl font-bold leading-tight mb-6">
                  Know your<br />IB score<br /><em className="text-primary">before the exam.</em>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
                  Paste your essay. AI grades it against the official IB rubric — criterion by criterion — in under 60 seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <Button size="lg" className="text-base px-8 shadow-lg shadow-primary/25" asChild>
                    <Link href="/essay">Grade my essay — free</Link>
                  </Button>
                  <Button size="lg" variant="ghost" asChild>
                    <Link href="/resources/sample-reports">See real sample reports</Link>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">No subscription. No account for your first essay. Calibrated to grade like a <strong>strict examiner</strong> — no inflated scores.</p>
              </div>

              {/* Right column — score card */}
              <div className="rounded-xl border border-border bg-card shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Business Management IA · Sample</p>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Sample</span>
                </div>
                <div style={SERIF} className="text-5xl font-bold mb-1">18 <span className="text-muted-foreground text-3xl">/</span> 25</div>
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
              <span><strong className="text-foreground">Every criterion</strong>, scored strictly</span>
              <span className="hidden sm:block text-border">|</span>
              <span><strong className="text-foreground">IA · EE · TOK</strong></span>
              <span className="hidden sm:block text-border">|</span>
              <span><strong className="text-foreground">Free</strong> first essay</span>
            </div>
          </div>
        </div>

        {/* Features — numbered */}
        <section className="py-20" id="sample">
          <div className="container">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3 text-center">Why students choose IBLens</p>
            <h2 style={SERIF} className="text-3xl font-bold text-center mb-12">Built on the actual IB rubric.</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { n: "01", title: "Official criteria", desc: "Same assessment criteria as IB examiners — no simplified versions. Every band descriptor, every criterion." },
                { n: "02", title: "Criterion feedback", desc: "Specific written feedback on every criterion, not just a total score. Know exactly where marks are lost." },
                { n: "03", title: "60-second results", desc: "Paste, click, done. Full breakdown in under a minute. No account required for your first analysis." },
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
                <h3 style={SERIF} className="text-xl font-bold mb-3">Essay Analyzer</h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Get detailed feedback on your IA, Extended Essay, or TOK essay. Predicted scores, criterion-by-criterion breakdown, and specific steps to improve.
                </p>
                <ul className="space-y-2.5 text-sm mb-6">
                  {["Predicted score & IB band", "Criteria breakdown with progress bars", "Risk areas that lose marks", "Leverage zones to gain marks", "Actionable next steps"].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">First analysis free</span>
                  <span className="text-xs text-muted-foreground">then $4.99/analysis</span>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/essay">Try it now <ArrowRight className="w-4 h-4 ml-1" /></Link>
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
                  "I built this because my daughter's IB tutor charged $120 for one feedback session — and it came the week before the deadline."
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The IB marking rubric is public. Every criterion, every band descriptor, every score level — it's all in the official IBO documentation. A trained examiner knows it by heart. So I asked: why can't an AI do the same thing, instantly, for any student?
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  IBLens is the result. It doesn't replace your teacher — but it gives you the same quality signal an experienced examiner would, before you've run out of time to act on it. First analysis is free. No account needed.
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
                <div className="text-3xl mb-3">😰</div>
                <p className="font-semibold mb-1">IB Tutor</p>
                <div className="text-2xl font-bold text-muted-foreground mb-1">$80–150<span className="text-sm font-normal">/hr</span></div>
                <p className="text-xs text-muted-foreground">One feedback session = $120+. Wait 1–2 weeks. No rubric breakdown.</p>
              </div>
              <div className="bg-background border-2 border-border rounded-xl p-5 text-center">
                <div className="text-3xl mb-3">😐</div>
                <p className="font-semibold mb-1">IB Teacher</p>
                <div className="text-2xl font-bold text-muted-foreground mb-1">Free</div>
                <p className="text-xs text-muted-foreground">When available. Generic feedback. No criterion scores. Wait days.</p>
              </div>
              <div className="bg-primary/5 border-2 border-primary rounded-xl p-5 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">Recommended</div>
                <div className="text-3xl mb-3">⚡</div>
                <p className="font-semibold mb-1">IBLens</p>
                <div style={SERIF} className="text-2xl font-bold text-primary mb-1">$4.99</div>
                <p className="text-xs text-muted-foreground">Full criterion breakdown. Predicted score. Risk areas. 60 seconds.</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">First analysis is always free. No credit card, no account.</p>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-background" id="pricing">
          <div className="container">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Pricing</p>
              <h2 style={SERIF} className="text-3xl font-bold mb-3">Pay only for what you use.</h2>
              <p className="text-muted-foreground text-lg">No subscriptions. No commitments. Your first essay analysis is free.</p>
            </div>

            {/* Free tier highlight */}
            <div className="max-w-md mx-auto mb-8">
              <Card className="border-2 border-primary/20 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                  Free
                </div>
                <CardContent className="p-6 text-center">
                  <Gift className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 style={SERIF} className="text-xl font-bold mb-1">First Essay Analysis</h3>
                  <div style={SERIF} className="text-3xl font-bold mb-2">$0</div>
                  <p className="text-xs text-muted-foreground mb-4">Full analysis with all features — no credit card required</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/essay">Try Free</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Paid plans grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              <Card className="border border-border">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-1">Single Analysis</h3>
                  <div style={SERIF} className="text-3xl font-bold mb-2">{PRICE_LABELS.ESSAY_SINGLE}</div>
                  <p className="text-xs text-muted-foreground mb-4">Per analysis</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/essay">Analyze Essay</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-border">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-1">Essay Pack (5)</h3>
                  <div style={SERIF} className="text-3xl font-bold mb-1">{PRICE_LABELS.ESSAY_PACK_5}</div>
                  <p className="text-xs text-muted-foreground mb-4">$4.00 per analysis</p>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => openPurchase("ESSAY_PACK_5")}>
                    Buy Pack
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  Best Value
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-1">Essay Pack (10)</h3>
                  <div style={SERIF} className="text-3xl font-bold mb-1">{PRICE_LABELS.ESSAY_PACK_10}</div>
                  <p className="text-xs text-muted-foreground mb-4">$3.50 per analysis</p>
                  <Button size="sm" className="w-full" onClick={() => openPurchase("ESSAY_PACK_10")}>
                    Buy Pack
                  </Button>
                </CardContent>
              </Card>

            </div>

            <div className="flex flex-col items-center gap-4 mt-10">
              <div className="flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
                <ShieldCheck className="w-4 h-4" />
                <span>7-Day Money-Back Guarantee — No Questions Asked</span>
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
                question="How does IBLens analyze my IB essay?"
                answer="IBLens uses advanced AI trained on IB marking criteria to analyze your essay. It evaluates each criterion (e.g., Knowledge and Understanding, Application, Analysis) and provides a predicted score, identifies risk areas that could lose marks, and suggests specific improvements."
              />
              <FAQItem
                question="Which IB essay types does IBLens support?"
                answer="IBLens supports Internal Assessments (IA) for all IB subjects, Extended Essays (EE), and Theory of Knowledge (TOK) essays. Each type is analyzed against its specific IB criteria."
              />
              <FAQItem
                question="Is my first essay analysis really free?"
                answer="Yes — every essay gets a free preview: your band range, your weakest criterion with full examiner-style feedback, and the top risks in your draft. The complete report — exact score, every criterion with comments, and a ranked fix list — unlocks for $4.99."
              />
              <FAQItem
                question="How accurate is the predicted IB score?"
                answer="IBLens provides a predicted score band based on IB marking criteria analysis. While no tool can guarantee exact scores, our AI is trained on IB standards and provides reliable estimates to help you understand where your essay stands and how to improve it."
              />
              <FAQItem
                question="Is my essay data kept private and secure?"
                answer="Your essay is sent to our AI provider (Anthropic PBC) over an encrypted connection solely to generate your analysis. We do not use it to train any AI model, we do not sell it, and we do not share it with your school, universities, or other students. Anonymous analyses are not stored permanently."
              />
              <FAQItem
                question="What payment methods do you accept?"
                answer="We accept card payments (Visa, Mastercard, Amex). The payment process is fast and secure — credits activate automatically after payment."
              />
              <FAQItem
                question="Can I use IBLens for multiple subjects?"
                answer="Yes! IBLens supports all IB subjects including Business Management, Economics, History, Biology, Chemistry, Physics, Mathematics, English Literature, Psychology, and more. Each analysis is tailored to the specific subject's criteria."
              />
              <FAQItem
                question="What if I'm not satisfied with my analysis?"
                answer="Email us at glushkovim@gmail.com within 7 days of your purchase and we'll refund you in full, no questions asked. We process refunds via the original payment method within 3–5 business days."
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
              Join IB students worldwide who use AI-powered feedback to achieve their best results.
            </p>
            <Button size="lg" className="text-base px-8 h-12 shadow-lg shadow-primary/25" asChild>
              <Link href="/essay">
                Start Your Free Analysis <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-4">No credit card required. Results in 60 seconds.</p>
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
                  <li><Link href="/essay/english-essay" className="hover:text-foreground transition-colors">English Essay</Link></li>
                  <li><Link href="/essay/tok-essay" className="hover:text-foreground transition-colors">TOK Essay</Link></li>
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
