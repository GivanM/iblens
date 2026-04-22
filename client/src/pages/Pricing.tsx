import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import {
  FileText, GraduationCap, BarChart3, CheckCircle2, ArrowRight,
  Shield, Bitcoin, Gift, Sparkles
} from "lucide-react";

const plans = [
  {
    name: "1 Essay Analysis",
    price: "$4.99",
    priceNote: "per analysis",
    icon: FileText,
    popular: false,
    free: false,
    features: [
      "Predicted score & IB band",
      "Criterion-by-criterion breakdown",
      "Risk areas & leverage zones",
      "Actionable improvement steps",
      "Supports IA, EE & TOK",
    ],
    cta: "Analyze Essay",
    href: "/essay",
  },
  {
    name: "5 Essay Analyses",
    price: "$19.99",
    priceNote: "$4.00 per analysis",
    icon: BarChart3,
    popular: true,
    free: false,
    features: [
      "Everything in single analysis",
      "Save 20% vs single price",
      "Use across any subjects",
      "No expiration date",
      "Perfect for exam prep",
    ],
    cta: "Buy 5 Pack",
    href: "/dashboard",
    requiresAuth: true,
  },
  {
    name: "10 Essay Analyses",
    price: "$34.99",
    priceNote: "$3.50 per analysis",
    icon: Sparkles,
    popular: false,
    free: false,
    features: [
      "Everything in single analysis",
      "Save 30% vs single price",
      "Use across any subjects",
      "No expiration date",
      "Best value for serious students",
    ],
    cta: "Buy 10 Pack",
    href: "/dashboard",
    requiresAuth: true,
  },
  {
    name: "University Strategy",
    price: "$9.99",
    priceNote: "per strategy",
    icon: GraduationCap,
    popular: false,
    free: false,
    features: [
      "9 universities: safe, match, reach",
      "Admission probability estimates",
      "Essay positioning angle",
      "Timeline-based action roadmap",
      "Profile strengths & concerns",
    ],
    cta: "Get Strategy",
    href: "/university",
  },
];

export default function Pricing() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            No subscriptions. No hidden fees. Pay only for what you use.
            Your first essay analysis is always free.
          </p>
        </div>

        {/* Free tier highlight */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="border-2 border-emerald-500/30 bg-emerald-50/50">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <Gift className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-emerald-800">First essay analysis is free</h3>
                <p className="text-sm text-emerald-700/70">
                  Sign in and get a full AI analysis with predicted score, criterion breakdown, and improvement tips — no credit card required.
                </p>
              </div>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 flex-shrink-0" asChild>
                <Link href="/essay">Try Free</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Pricing cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col border-2 transition-all duration-300 hover:shadow-lg ${
                plan.popular ? "border-primary shadow-md" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold shadow-sm">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardContent className="p-6 flex flex-col flex-1">
                <div className="text-center mb-6">
                  <plan.icon className={`w-8 h-8 mx-auto mb-3 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                  <h3 className="font-semibold text-base mb-3">{plan.name}</h3>
                  <div className="text-4xl font-bold tracking-tight mb-1">{plan.price}</div>
                  <p className="text-xs text-muted-foreground">{plan.priceNote}</p>
                </div>

                <ul className="space-y-3 text-sm flex-1 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.requiresAuth && !isAuthenticated ? (
                  <Button
                    size="sm"
                    className={`w-full ${plan.popular ? "" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <a href={getLoginUrl()}>
                      Sign in to Buy <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href={plan.href}>
                      {plan.cta} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment methods */}
        <div className="flex items-center justify-center gap-6 mt-12 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4" />
            <span>Card, Crypto & Telegram Stars</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bitcoin className="w-4 h-4" />
            <span>Secure payments via Tribute</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">Not sure yet? Try your first analysis for free.</p>
          <Button size="lg" className="shadow-lg shadow-primary/25" asChild>
            <Link href="/essay">
              Start Free Analysis <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
