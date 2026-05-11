import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { PRICE_LABELS, type ProductKey } from "@shared/pricing";
import { PurchaseModal } from "@/components/PurchaseModal";
import {
  FileText, GraduationCap, BarChart3, CheckCircle2, ArrowRight,
  Shield, Bitcoin, Gift, Sparkles, CreditCard
} from "lucide-react";

const plans: Array<{
  name: string;
  price: string;
  description: string;
  icon: typeof FileText;
  popular: boolean;
  features: string[];
  cta: string;
  href: string;
  requiresAuth: boolean;
  productKey: ProductKey;
}> = [
  {
    name: "Single Analysis",
    price: PRICE_LABELS.ESSAY_SINGLE,
    description: "1 essay analysis",
    icon: FileText,
    popular: false,
    features: [
      "Predicted score & IB band",
      "Criterion-by-criterion breakdown",
      "Risk areas & leverage zones",
      "Actionable improvement steps",
      "Supports IA, EE & TOK",
    ],
    cta: "Get Started",
    href: "/essay",
    requiresAuth: false,
    productKey: "ESSAY_SINGLE",
  },
  {
    name: "5 Analyses",
    price: PRICE_LABELS.ESSAY_PACK_5,
    description: "5 essay analyses",
    icon: BarChart3,
    popular: true,
    features: [
      "Everything in single analysis",
      "Save 20% vs single price",
      "Use across any subjects",
      "No expiration date",
      "Perfect for exam prep",
    ],
    cta: "Get Started",
    href: "/dashboard",
    requiresAuth: true,
    productKey: "ESSAY_PACK_5",
  },
  {
    name: "10 Analyses",
    price: PRICE_LABELS.ESSAY_PACK_10,
    description: "10 essay analyses",
    icon: Sparkles,
    popular: false,
    features: [
      "Everything in single analysis",
      "Save 30% vs single price",
      "Use across any subjects",
      "No expiration date",
      "Best value for serious students",
    ],
    cta: "Get Started",
    href: "/dashboard",
    requiresAuth: true,
    productKey: "ESSAY_PACK_10",
  },
  {
    name: "University Strategy",
    price: PRICE_LABELS.UNIVERSITY_SINGLE,
    description: "Complete university strategy report",
    icon: GraduationCap,
    popular: false,
    features: [
      "9 universities: safe, match, reach",
      "Admission probability estimates",
      "Essay positioning angle",
      "Timeline-based action roadmap",
      "Profile strengths & concerns",
    ],
    cta: "Get Strategy",
    href: "/university",
    requiresAuth: false,
    productKey: "UNIVERSITY_SINGLE",
  },
];

export default function Pricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSku, setModalSku] = useState<ProductKey>("ESSAY_SINGLE");

  const handleBuyNow = (productKey: ProductKey) => {
    setModalSku(productKey);
    setModalOpen(true);
  };

  return (
    <div className="py-16 md:py-24">
      <SEOHead
        title="Pricing — IB Essay Analysis from $4.99 | IBLens"
        description="Affordable IB essay feedback: first analysis free, single essays from $4.99, packs of 5 for $19.99, packs of 10 for $34.99. 7-day money-back guarantee."
        canonical="/pricing"
      />
      <div className="container">
        {/* Purchase Modal */}
        <PurchaseModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          sku={modalSku}
        />

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
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-3 text-sm flex-1 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Single Buy Now button opens PurchaseModal */}
                <Button
                  size="sm"
                  className="w-full mb-2"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleBuyNow(plan.productKey)}
                >
                  <CreditCard className="w-3.5 h-3.5 mr-1.5" />
                  Buy Now
                </Button>

                {/* Navigate to feature page */}
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full text-xs text-muted-foreground"
                  asChild
                >
                  <Link href={plan.href}>
                    {plan.cta} <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment methods */}
        <div className="flex items-center justify-center gap-6 mt-12 text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1.5">
            <CreditCard className="w-4 h-4" />
            <span>Visa, Mastercard, Amex</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4" />
            <span>Secure checkout</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bitcoin className="w-4 h-4" />
            <span>USDT, BTC, ETH & more</span>
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
