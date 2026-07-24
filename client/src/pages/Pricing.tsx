import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { PRICE_LABELS, type ProductKey } from "@shared/pricing";
import { PurchaseModal } from "@/components/PurchaseModal";
import {
  CheckCircle2, ArrowRight, Shield, Gift, CreditCard
} from "lucide-react";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

const plans: Array<{
  name: string;
  price: string;
  description: string;
  popular: boolean;
  features: string[];
  cta: string;
  href: string;
  productKey: ProductKey;
}> = [
  {
    name: "Single Analysis",
    price: PRICE_LABELS.ESSAY_SINGLE,
    description: "1 essay analysis",
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
    productKey: "ESSAY_SINGLE",
  },
  {
    name: "5 Analyses",
    price: PRICE_LABELS.ESSAY_PACK_5,
    description: "5 essay analyses",
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
    productKey: "ESSAY_PACK_5",
  },
  {
    name: "10 Analyses",
    price: PRICE_LABELS.ESSAY_PACK_10,
    description: "10 essay analyses",
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
    productKey: "ESSAY_PACK_10",
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
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Pricing</p>
          <h1 style={SERIF} className="text-4xl md:text-5xl font-bold mb-4">
            Simple, transparent pricing.
          </h1>
          <p className="text-sm text-muted-foreground mt-2">No subscription. Credits never expire. No ads.</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            No subscriptions. No hidden fees. Pay only for what you use.
            Your first essay analysis is always free.
          </p>
        </div>

        {/* Free tier highlight */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="rounded-xl border border-border bg-card p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">First essay analysis is free</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Paste your essay — no sign-in, no credit card required. Get criterion scores and feedback instantly.
              </p>
            </div>
            <Button size="sm" asChild className="flex-shrink-0">
              <Link href="/essay">Try Free</Link>
            </Button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl border bg-card p-6 ${
                plan.popular ? "border-2 border-primary shadow-md" : "border border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold shadow-sm">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="mb-5">
                <h3 style={SERIF} className="text-lg font-bold mb-1">{plan.name}</h3>
                <div style={SERIF} className="text-3xl font-bold mb-1">{plan.price}</div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-2.5 text-sm flex-1 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="sm"
                className="w-full mb-2"
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleBuyNow(plan.productKey)}
              >
                <CreditCard className="w-3.5 h-3.5 mr-1.5" />
                Buy Now
              </Button>

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
            </div>
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
            <CreditCard className="w-4 h-4" />
            <span>Instant credit activation</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">Not sure yet? Try your first analysis for free.</p>
          <Button size="lg" asChild>
            <Link href="/essay">
              Start Free Analysis <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
