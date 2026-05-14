import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import {
  FileText, ArrowRight, CheckCircle2, Star, ChevronDown, ChevronUp,
  Shield, Zap, Lock, ShieldCheck
} from "lucide-react";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="font-medium text-sm md:text-base pr-4">{question}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      {open && (
        <p className="text-sm text-muted-foreground pb-4 leading-relaxed">{answer}</p>
      )}
    </div>
  );
}

const SAMPLE_CRITERIA = [
  { label: "Knowledge & Understanding", score: 4, max: 6, color: "bg-amber-400" },
  { label: "Application & Analysis", score: 3, max: 6, color: "bg-orange-400" },
  { label: "Synthesis & Evaluation", score: 5, max: 6, color: "bg-emerald-500" },
  { label: "Use of Appropriate Skills", score: 2, max: 4, color: "bg-blue-400" },
];

export default function LandingPage() {
  return (
    <>
      <SEOHead
        title="Free IB Essay Grader — Grade My IB Essay in 60 Seconds | IBLens"
        description="Grade your IB Extended Essay, IA, or TOK essay instantly. AI-powered IB essay grader gives criterion-by-criterion feedback and predicted band in 60 seconds. Free."
        canonical="/grade"
      />

      {/* Minimal Header */}
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14">
          <Link href="/" className="font-bold text-lg tracking-tight flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            IBLens
          </Link>
          <Button size="sm" asChild>
            <Link href="/essay">
              Grade My Essay Free <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-6 uppercase tracking-wide">
              ✓ First analysis free — no credit card
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5 leading-tight">
              Grade Your IB Essay<br />in 60 Seconds
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              Upload your IA, Extended Essay, or TOK. Get a full criterion-by-criterion AI grade, risk areas, and exactly what to fix — free.
            </p>
            <Button size="lg" className="text-base px-10 h-13 shadow-lg shadow-primary/25 mb-4" asChild>
              <Link href="/essay">
                <FileText className="w-4 h-4 mr-2" />
                Grade My Essay Free
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground">No account needed · Results in 60 seconds · All IB subjects</p>
          </div>
        </section>

        {/* Sample Result Mockup */}
        <section className="py-16 bg-background">
          <div className="container max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight mb-2">Here's what your grade report looks like</h2>
              <p className="text-muted-foreground text-sm">Criterion scores, risk areas, and actionable feedback — all in one place</p>
            </div>

            <Card className="border-2 shadow-lg">
              <CardContent className="p-6">
                {/* Mock header */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Business Management IA · Draft 2</p>
                    <p className="font-semibold text-sm">The Impact of Remote Work on Employee Productivity</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-primary">14</div>
                    <div className="text-xs text-muted-foreground">/ 22 pts</div>
                    <div className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded mt-1">Band 4</div>
                  </div>
                </div>

                {/* Criteria rows */}
                <div className="space-y-3 mb-4">
                  {SAMPLE_CRITERIA.map(({ label, score, max, color }) => (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">{label}</span>
                        <span className="text-xs text-muted-foreground font-semibold">{score}/{max}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${color}`}
                          style={{ width: `${(score / max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Blurred bottom row teaser */}
                <div className="relative">
                  <div className="space-y-3 blur-sm select-none pointer-events-none">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">Risk Areas & Leverage Zones</span>
                        <span className="text-xs text-muted-foreground">3 items</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-rose-400" style={{ width: "40%" }} />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">⚠ Criterion C: argument lacks primary source...</div>
                    <div className="text-xs text-muted-foreground">✦ Quick win: restructure conclusion to re-state RQ...</div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="sm" asChild>
                      <Link href="/essay">
                        <Lock className="w-3.5 h-3.5 mr-1.5" />
                        See Full Feedback — Free
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Trust badges */}
        <section className="py-8 bg-muted/30 border-y">
          <div className="container">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-500" /><span>Scored against official IB rubric</span></div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-500" /><span>Results in under 60 seconds</span></div>
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-blue-500" /><span>Essays never stored</span></div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /><span>All IB subjects supported</span></div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Questions</h2>
            <div className="bg-background rounded-xl border p-5">
              <FAQItem
                question="Is the first essay grade really free?"
                answer="Yes — every new user gets one full analysis free with all features: criterion scores, risk areas, leverage zones, and next steps. No credit card required."
              />
              <FAQItem
                question="Which essay types and subjects does IBLens support?"
                answer="IBLens grades Internal Assessments (IA), Extended Essays (EE), and TOK essays across all IB subjects — Business, Economics, History, Biology, Chemistry, Physics, English Literature, Psychology, and more."
              />
              <FAQItem
                question="How accurate is the AI grade?"
                answer="IBLens evaluates your essay against official IB marking criteria for your subject. The predicted band gives you a reliable signal of where you stand and exactly which criteria to improve — the same way a real examiner would assess it."
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background text-center">
          <div className="container max-w-xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to see your IB grade?</h2>
            <p className="text-muted-foreground mb-8">Upload your essay now — free, instant, no account needed.</p>
            <Button size="lg" className="text-base px-10 shadow-lg shadow-primary/25" asChild>
              <Link href="/essay">
                Grade My Essay Free <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-4">7-day money-back guarantee on all paid plans</p>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 border-t bg-background text-center text-xs text-muted-foreground">
        <div className="flex items-center justify-center gap-6">
          <Link href="/" className="font-semibold text-foreground">IBLens</Link>
          <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/refund-policy" className="hover:text-foreground transition-colors">Refund Policy</Link>
        </div>
      </footer>
    </>
  );
}
