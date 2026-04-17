import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { useState, useEffect, useMemo } from "react";
import {
  FileText, GraduationCap, Shield, Zap, BarChart3, Target,
  CheckCircle2, ArrowRight, Sparkles, Lock, Brain, Bitcoin, Gift,
  Clock, Star, Users, ChevronDown, ChevronUp, Upload, Search, TrendingUp
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
            <span>{days} days until IB {examYear} exams — improve your essays now</span>
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-base px-8 h-12 shadow-lg shadow-primary/25" asChild>
                <Link href="/essay">
                  <FileText className="w-4 h-4 mr-2" />
                  Analyze My Essay Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 h-12" asChild>
                <Link href="/university">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  University Strategy
                </Link>
              </Button>
            </div>
            {!isAuthenticated && (
              <p className="text-sm text-muted-foreground mt-4">
                <a href={getLoginUrl()} className="text-primary hover:underline font-medium">Sign in</a> to get your first essay analysis free — no credit card required
              </p>
            )}

            {/* Social proof mini-bar */}
            <div className="flex items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-primary" />
                <span>Used by IB students worldwide</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500" />
                <span>4.8/5 average rating</span>
              </div>
              <div className="hidden md:flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-500" />
                <span>Results in 30 seconds</span>
              </div>
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
                  <span className="text-xs text-muted-foreground">then $5/analysis</span>
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
                  <span className="text-sm font-medium text-primary">$15/strategy</span>
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
            <p className="text-muted-foreground text-lg">Real feedback from students who improved their scores</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote: "IBLens predicted my IA score within 1 mark. The criterion breakdown showed me exactly where I was losing points. I revised my analysis section and went from a 4 to a 6.",
                name: "Sarah K.",
                detail: "Business Management IA — Score: 6/7",
                stars: 5,
              },
              {
                quote: "The university strategy was incredibly detailed. It gave me 9 realistic options with actual admission probabilities. I got into my match school — University of Edinburgh!",
                name: "Marcus L.",
                detail: "IB Score: 38 — Admitted to Edinburgh",
                stars: 5,
              },
              {
                quote: "I was stuck on my Extended Essay and didn't know what to fix. IBLens identified weak argumentation in my conclusion and gave me specific steps. My supervisor was impressed with the revision.",
                name: "Aisha M.",
                detail: "History Extended Essay — Grade: A",
                stars: 5,
              },
            ].map(({ quote, name, detail, stars }) => (
              <Card key={name} className="border">
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
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-xs text-muted-foreground">{detail}</p>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {/* Free Essay */}
            <Card className="border-2 border-emerald-500/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                Free
              </div>
              <CardContent className="p-6 text-center">
                <Gift className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">First Essay</h3>
                <div className="text-3xl font-bold mb-2">$0</div>
                <p className="text-xs text-muted-foreground mb-4">Full analysis with all features</p>
                <Button variant="outline" size="sm" className="w-full border-emerald-500/30 text-emerald-600 hover:bg-emerald-50" asChild>
                  <Link href="/essay">Try Free</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Single Essay */}
            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <FileText className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Essay Analysis</h3>
                <div className="text-3xl font-bold mb-2">$5</div>
                <p className="text-xs text-muted-foreground mb-4">Per analysis</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/essay">Analyze Essay</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Essay Pack */}
            <Card className="border-2 border-primary relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                Best Value
              </div>
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Essay Pack (10)</h3>
                <div className="text-3xl font-bold mb-1">$35</div>
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
                <div className="text-3xl font-bold mb-2">$15</div>
                <p className="text-xs text-muted-foreground mb-4">Per strategy</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/university">Get Strategy</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Payment methods */}
          <div className="flex items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              <span>Card, Crypto & Telegram Stars</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bitcoin className="w-4 h-4" />
              <span>Secure payments via Tribute</span>
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
              answer="We accept card payments, cryptocurrency (BTC, ETH, USDT, and more), and Telegram Stars through Tribute. The payment process is fast and secure — choose whichever method works best for you."
            />
            <FAQItem
              question="Can I use IBLens for multiple subjects?"
              answer="Yes! IBLens supports all IB subjects including Business Management, Economics, History, Biology, Chemistry, Physics, Mathematics, English Literature, Psychology, and more. Each analysis is tailored to the specific subject's criteria."
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
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
                <li><Link href="/essay" className="hover:text-foreground transition-colors">Free Essay Analysis</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
