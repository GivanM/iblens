import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import {
  FileText, ArrowRight, CheckCircle2, ChevronDown, ChevronUp,
  Shield, Zap, Lock, ShieldCheck, Clock, ListOrdered
} from "lucide-react";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        aria-expanded={open}
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

// The current Business research project criteria (first assessment 2024), out of 25.
const SAMPLE_CRITERIA = [
  { label: "A: Integration of a key concept", score: 3, max: 5, color: "bg-amber-400" },
  { label: "B: Supporting documents", score: 3, max: 4, color: "bg-emerald-500" },
  { label: "C: Selection and application of tools and theories", score: 2, max: 4, color: "bg-orange-400" },
  { label: "D: Analysis and evaluation", score: 2, max: 5, color: "bg-orange-400" },
  { label: "E: Conclusions", score: 2, max: 3, color: "bg-emerald-500" },
  { label: "F: Structure", score: 1, max: 2, color: "bg-amber-400" },
  { label: "G: Presentation", score: 2, max: 2, color: "bg-emerald-500" },
];

export default function LandingPage() {
  return (
    <>
      <SEOHead
        title="IB Essay Grader: Free Preview of Your IA, EE or TOK Marks in About a Minute | IBLens"
        description="Paste your IB essay and get a free preview in about a minute: your band range, weakest criterion and top risks. The full report marks every criterion. Extended Essay, IA or TOK, no account needed."
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
              Get My Free Preview <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-6 uppercase tracking-wide">
              First preview free · No account · No card
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5 leading-tight">
              Grade Your IB Essay<br />in About a Minute
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              Paste your IA, Extended Essay or TOK work. The free preview comes back in about a minute with your band range, weakest criterion and top risks; the full report marks every criterion and ranks the fixes.
            </p>
            <Button size="lg" className="text-base px-10 h-14 shadow-lg shadow-primary/25 mb-4" asChild>
              <Link href="/essay">
                <FileText className="w-4 h-4 mr-2" />
                Get My Free Preview
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground">No account needed · Results in about a minute · Coursework in 14 IB subjects · 7-day money-back guarantee</p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 bg-background border-b">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-center mb-8 text-muted-foreground uppercase tracking-wider text-sm">How it works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "1", Icon: FileText, title: "Paste your essay", desc: "Copy and paste your IA, EE or TOK text and choose the task and subject." },
                { step: "2", Icon: Clock, title: "AI marks it in about a minute", desc: "Marked against the published criteria for your subject, task and exam session." },
                { step: "3", Icon: ListOrdered, title: "See what to fix", desc: "The marks you are losing against the criteria, and the fixes ranked by what they recover." },
              ].map(({ step, Icon, title, desc }) => (
                <div key={step} className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><Icon className="w-5 h-5 text-primary" aria-hidden="true" /></div>
                  <div>
                    <p className="font-semibold mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample Result Mockup */}
        <section className="py-16 bg-background">
          <div className="container max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight mb-2">What a full report looks like ($9.99)</h2>
              <p className="text-muted-foreground text-sm">Every criterion scored, with the risks and the fixes. The free preview shows your band, your weakest criterion and the top risks.</p>
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
                    <div className="text-3xl font-extrabold text-primary">15</div>
                    <div className="text-xs text-muted-foreground">/ 25 marks</div>
                    <div className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded mt-1">Sample</div>
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
                    <div className="text-xs text-muted-foreground">Criterion D: analysis summarises the documents instead of weighing them...</div>
                    <div className="text-xs text-muted-foreground">Quick win: answer the research question directly in the conclusion...</div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="sm" asChild>
                      <Link href="/essay">
                        <Lock className="w-3.5 h-3.5 mr-1.5" />
                        Get a free preview
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
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-500" /><span>Published IB criteria</span></div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-500" /><span>Results in about a minute</span></div>
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-blue-500" /><span>IBLens never saves your text</span></div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /><span>Coursework in 14 IB subjects</span></div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Questions</h2>
            <div className="bg-background rounded-xl border p-5">
              <FAQItem
                question="Is the first preview really free?"
                answer="Yes. The first preview is free: your band range, feedback on your weakest criterion (for the TOK essay and exhibition, which are marked as a whole, the start of the explanation) and the top risks in your draft. The complete report, with an estimated mark and comments for every criterion and a ranked list of fixes, unlocks for $9.99."
              />
              <FAQItem
                question="Which essay types and subjects does IBLens support?"
                answer="IBLens grades Extended Essays, TOK essays, the TOK exhibition and coursework in 14 subjects: Business Management, Economics, History, Biology, Chemistry, Physics, Mathematics, English A Language and Literature, English A Literature, Psychology, Computer Science, Visual Arts, Music and Film. Visual Arts can be marked only for sessions through November 2026: from May 2027 the comparative study is no longer set."
              />
              <FAQItem
                question="How accurate is the AI grade?"
                answer="It is an estimate, not a mark. IBLens reads your essay against the published criteria for your subject and session, and the value of the report is in which criterion it flags and why, more than in the exact number."
              />
              <FAQItem
                question="What payment methods do you accept?"
                answer="Payments are handled by LemonSqueezy, which accepts major cards and the other methods shown at checkout. Your reports are added automatically once the payment is confirmed, and you do not need an account to pay."
              />
              <FAQItem
                question="Is my essay private?"
                answer="Your essay is sent to our AI provider over an encrypted connection to generate your analysis. We do not use it to train any model or sell it. IBLens never saves the essay text; Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. An anonymous report you did not buy is deleted after 90 days."
              />
            </div>
          </div>
        </section>

        {/* Urgency + Final CTA */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background text-center">
          <div className="container max-w-xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to see where your essay stands?</h2>
            <p className="text-muted-foreground mb-8">Paste your essay now: a free preview in about a minute, with no account needed.</p>
            <Button size="lg" className="text-base px-10 shadow-lg shadow-primary/25" asChild>
              <Link href="/essay">
                Get My Free Preview <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-4">No account needed · 7-day money-back guarantee on paid reports</p>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 border-t bg-background text-center text-xs text-muted-foreground">
        <div className="flex items-center justify-center gap-6">
          <Link href="/" className="font-semibold text-foreground">IBLens</Link>
          <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/refund-policy" className="hover:text-foreground transition-colors">Refund Policy</Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
        </div>
      </footer>
    </>
  );
}
