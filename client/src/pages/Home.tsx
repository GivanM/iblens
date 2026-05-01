import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { PRICE_LABELS } from "@shared/pricing";
import { useState, useEffect, useMemo } from "react";
import {
  FileText, GraduationCap, Shield, Zap, BarChart3, Target,
  CheckCircle2, ArrowRight, Sparkles, Lock, Brain, Bitcoin, Gift,
  Clock, Star, ChevronDown, ChevronUp, Upload, Search, TrendingUp, ShieldCheck
} from "lucide-react";

function useExamCountdown() {
  // IB exams typically start first week of May
  const [now, setNow] = useState(new Date());
  const examDate = useMemo(() => {
    const current = new Date();
    // May 1 of current year, or next year if past May
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

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { days, examYear } = useExamCountdown();

  return (
    <div>
      {/* Exam Countdown Banner */}
      {days > 0 && days < 200 && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2.5 text-center text-sm font-medium">
          <div className="container flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Only {days} days until IB {examYear} exams — get your essay scored now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.623_0.214_259.815/0.08),transparent_50%)]" />
        <div className="container relative py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered IB Analysis
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text">
              Get the IB score<br />you deserve
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              IBLens analyzes your essays against real IB criteria and builds personalized university strategies — powered by AI that thinks like an experienced examiner.
            </p>
            <div className="flex flex-col items-center gap-3">
              <Button size="lg" className="text-base px-10 h-13 shadow-lg shadow-primary/25" asChild>
                <Link href="/essay">
                  <FileText className="w-4 h-4 mr-2" />
                  Score My Essay Free — 60 Seconds
                </Link>
              </Button>
              <Link href="/university" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Or get a personalized University Strategy →
              </Link>
            </div>
            {!isAuthenticated && (
              <p className="text-sm text-muted-foreground mt-4">
                <a href={getLoginUrl()} className="text-primary hover:underline font-medium">Sign in</a> to get your first essay analysis free — no credit card required
              </p>
            )}

            {/* Honest trust line */}
            <div className="flex items-center justify-center gap-2 mt-10 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Built by an IB parent — scored against the official IB rubric for your subject.</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight mb-3">How it works</h2>
            <p className="text-muted-foreground text-lg">Three simple steps to better IB scores</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                icon: Upload,
                title: "Upload your essay",
                desc: "Paste your IA, Extended Essay, or TOK essay. Select your subject and essay type.",
              },
              {
                step: "2",
                icon: Search,
                title: "AI analyzes against IB criteria",
                desc: "Our AI evaluates every criterion — from knowledge to critical thinking — just like a real IB examiner.",
              },
              {
                step: "3",
                icon: TrendingUp,
                title: "Get your predicted score",
                desc: "See your predicted band, detailed criterion scores, risk areas, and specific steps to improve your grade.",
              },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="text-center relative">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full text-6xl font-extrabold text-primary/5 select-none">
                  {step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="shadow-lg shadow-primary/25" asChild>
              <Link href="/essay">
                Try It Free — No Credit Card Needed <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight mb-3">Two powerful tools, one platform</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to maximize your IB performance and get into your dream university.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Essay Analyzer</h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Get detailed feedback on your IA, Extended Essay, or TOK essay. See predicted scores, criterion-by-criterion breakdown, and specific steps to improve.
                </p>
                <ul className="space-y-2.5 text-sm">
                  {["Predicted score & IB band", "Criteria breakdown with progress bars", "Risk areas that lose marks", "Leverage zones to gain marks", "Actionable next steps"].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center gap-3">
                  <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">First analysis free</span>
                  <span className="text-xs text-muted-foreground">then $4.99/analysis</span>
                </div>
                <Button variant="ghost" className="mt-3 group-hover:text-primary" asChild>
                  <Link href="/essay">
                    Try it now <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">University Strategy</h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Get a personalized university list with admission probabilities, essay positioning advice, and a step-by-step application roadmap.
                </p>
                <ul className="space-y-2.5 text-sm">
                  {["9 universities: 3 safe, 3 match, 3 reach", "Admission probability estimates", "Essay positioning angle", "Timeline-based action roadmap", "Profile strengths & concerns"].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <span className="text-sm font-medium text-primary">{PRICE_LABELS.UNIVERSITY_SINGLE}/strategy</span>
                </div>
                <Button variant="ghost" className="mt-3 group-hover:text-primary" asChild>
                  <Link href="/university">
                    Get your strategy <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight mb-3">What IB students say</h2>
            <p className="text-muted-foreground text-lg">Feedback from students who used IBLens</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote: "The criterion-by-criterion breakdown showed me exactly which sections were dragging my mark down. I knew what to revise without guessing.",
                attribution: "IB Student, Business Management IA",
                stars: 5,
              },
              {
                quote: "Used the university strategy after my mocks to figure out which schools actually fit my predicted points. Saved me from wasting application slots.",
                attribution: "IB Diploma Candidate, Year 2",
                stars: 5,
              },
              {
                quote: "I uploaded my Extended Essay draft and got back specific feedback on argumentation gaps in the conclusion. Fixed it before my supervisor saw it.",
                attribution: "IB Student, History EE",
                stars: 5,
              },
            ].map(({ quote, attribution, stars }) => (
              <Card key={attribution} className="border">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-4 text-muted-foreground italic">
                    "{quote}"
                  </p>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">— {attribution}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why IBLens Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight mb-3">Why IBLens?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Brain, title: "AI Examiner", desc: "Trained on IB criteria and marking standards" },
              { icon: Zap, title: "Instant Feedback", desc: "Get detailed analysis in under 30 seconds" },
              { icon: Shield, title: "Secure & Private", desc: "Your essays are never stored or shared" },
              { icon: Lock, title: "API-Safe", desc: "All AI calls routed through our secure backend" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background" id="pricing">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight mb-3">Pay only for what you use</h2>
            <p className="text-muted-foreground text-lg">No subscriptions. No commitments. Your first essay analysis is free.</p>
          </div>

          {/* Free tier highlight */}
          <div className="max-w-md mx-auto mb-8">
            <Card className="border-2 border-emerald-500/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                Free
              </div>
              <CardContent className="p-6 text-center">
                <Gift className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">First Essay Analysis</h3>
                <div className="text-3xl font-bold mb-2">$0</div>
                <p className="text-xs text-muted-foreground mb-4">Full analysis with all features — no credit card required</p>
                <Button variant="outline" size="sm" className="w-full border-emerald-500/30 text-emerald-600 hover:bg-emerald-50" asChild>
                  <Link href="/essay">Try Free</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Paid plans grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {/* Single Essay */}
            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <FileText className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Single Analysis</h3>
                <div className="text-3xl font-bold mb-2">{PRICE_LABELS.ESSAY_SINGLE}</div>
                <p className="text-xs text-muted-foreground mb-4">Per analysis</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/essay">Analyze Essay</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Essay Pack 5 */}
            <Card className="border-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full hidden"></div>
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Essay Pack (5)</h3>
                <div className="text-3xl font-bold mb-1">{PRICE_LABELS.ESSAY_PACK_5}</div>
                <p className="text-xs text-muted-foreground mb-4">$4.00 per analysis</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  {isAuthenticated ? (
                    <Link href="/dashboard">Buy Pack</Link>
                  ) : (
                    <a href={getLoginUrl()}>Sign in</a>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Essay Pack 10 */}
            <Card className="border-2 border-primary relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                Best Value
              </div>
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Essay Pack (10)</h3>
                <div className="text-3xl font-bold mb-1">{PRICE_LABELS.ESSAY_PACK_10}</div>
                <p className="text-xs text-muted-foreground mb-4">$3.50 per analysis</p>
                <Button size="sm" className="w-full" asChild>
                  {isAuthenticated ? (
                    <Link href="/dashboard">Buy Pack</Link>
                  ) : (
                    <a href={getLoginUrl()}>Sign in</a>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* University Strategy */}
            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <GraduationCap className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">University Strategy</h3>
                <div className="text-3xl font-bold mb-2">{PRICE_LABELS.UNIVERSITY_SINGLE}</div>
                <p className="text-xs text-muted-foreground mb-4">Per strategy</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/university">Get Strategy</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Money-back guarantee + payment methods */}
          <div className="flex flex-col items-center gap-4 mt-10">
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
              <ShieldCheck className="w-4 h-4" />
              <span>7-Day Money-Back Guarantee — No Questions Asked</span>
              <Link href="/refund-policy" className="text-emerald-600 underline underline-offset-2 ml-1 text-xs">Details</Link>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bitcoin className="w-4 h-4" />
                <span>BTC, ETH, USDT & more</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30" id="faq">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight mb-3">Frequently asked questions</h2>
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
              answer="Yes! Every new user gets their first essay analysis completely free with all features included — predicted score, criterion breakdown, risk areas, leverage zones, and actionable next steps. No credit card required."
            />
            <FAQItem
              question="How accurate is the predicted IB score?"
              answer="IBLens provides a predicted score band based on IB marking criteria analysis. While no tool can guarantee exact scores, our AI is trained on IB standards and provides reliable estimates to help you understand where your essay stands and how to improve it."
            />
            <FAQItem
              question="Is my essay data kept private and secure?"
              answer="Absolutely. Your essays are processed securely through our backend and are never stored permanently or shared with third parties. All AI processing happens through encrypted API calls."
            />
            <FAQItem
              question="What payment methods do you accept?"
              answer="We accept card payments (Visa, Mastercard, Amex) and cryptocurrency (BTC, ETH, USDT, and more). The payment process is fast and secure — choose whichever method works best for you."
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
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to improve your IB score?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Join IB students worldwide who use AI-powered feedback to achieve their best results.
          </p>
          <Button size="lg" className="text-base px-8 h-12 shadow-lg shadow-primary/25" asChild>
            <Link href="/essay">
              Start Your Free Analysis <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-4">No credit card required. Results in 30 seconds.</p>
        </div>
      </section>

      {/* Enhanced Footer with SEO links */}
      <section className="py-10 border-t border-border bg-background">
        <div className="container">
          <div className="grid sm:grid-cols-3 gap-8 text-sm">
            <div>
              <h4 className="font-semibold mb-3">Tools</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/essay" className="hover:text-foreground transition-colors">IB Essay Analyzer</Link></li>
                <li><Link href="/university" className="hover:text-foreground transition-colors">University Strategy</Link></li>
                <li><Link href="/essay" className="hover:text-foreground transition-colors">IB IA Checker</Link></li>
                <li><Link href="/essay" className="hover:text-foreground transition-colors">Extended Essay Feedback</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Supported Subjects</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/essay" className="hover:text-foreground transition-colors">Business Management IA</Link></li>
                <li><Link href="/essay" className="hover:text-foreground transition-colors">Economics IA</Link></li>
                <li><Link href="/essay" className="hover:text-foreground transition-colors">History IA</Link></li>
                <li><Link href="/essay" className="hover:text-foreground transition-colors">Biology / Chemistry / Physics IA</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
                <li><Link href="/essay" className="hover:text-foreground transition-colors">Free Essay Analysis</Link></li>
                <li><Link href="/refund-policy" className="hover:text-foreground transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
