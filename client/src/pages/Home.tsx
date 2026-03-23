import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import {
  FileText, GraduationCap, Shield, Zap, BarChart3, Target,
  CheckCircle2, ArrowRight, Sparkles, Lock, Brain
} from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.623_0.214_259.815/0.08),transparent_50%)]" />
        <div className="container relative py-20 md:py-32">
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
              <Button size="lg" className="text-base px-8 h-12" asChild>
                <Link href="/essay">
                  <FileText className="w-4 h-4 mr-2" />
                  Analyze My Essay
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
                <a href={getLoginUrl()} className="text-primary hover:underline font-medium">Sign in</a> to get your first analysis free
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
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
                <Button variant="ghost" className="mt-5 group-hover:text-primary" asChild>
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
                <Button variant="ghost" className="mt-5 group-hover:text-primary" asChild>
                  <Link href="/university">
                    Try it now <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
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
            <h2 className="text-3xl font-bold tracking-tight mb-3">Simple pricing</h2>
            <p className="text-muted-foreground text-lg">Start free, upgrade when you need more.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card className="border-2">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold mb-1">Free</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">$0</span>
                </div>
                <p className="text-muted-foreground text-sm mb-6">Perfect for trying out IBLens</p>
                <ul className="space-y-3 text-sm mb-8">
                  {["1 free analysis (essay or university)", "Full detailed feedback", "Criteria breakdown", "Next steps recommendations"].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/essay">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                Most Popular
              </div>
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold mb-1">Pro</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">$14.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground text-sm mb-6">Unlimited analyses for serious students</p>
                <ul className="space-y-3 text-sm mb-8">
                  {["Unlimited essay analyses", "Unlimited university strategies", "Analysis history & dashboard", "Priority AI processing", "Save & compare results"].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" asChild>
                  {isAuthenticated ? (
                    <Link href="/dashboard">Upgrade to Pro</Link>
                  ) : (
                    <a href={getLoginUrl()}>Sign in to Upgrade</a>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to improve your IB score?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Join thousands of IB students who use AI-powered feedback to achieve their best results.
          </p>
          <Button size="lg" className="text-base px-8 h-12" asChild>
            <Link href="/essay">
              Start Your Free Analysis <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
