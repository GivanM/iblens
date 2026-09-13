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
    name: "Full report",
    price: PRICE_LABELS.ESSAY_SINGLE,
    description: "One report on IB coursework or a UCAS statement",
    popular: false,
    features: [
      "An estimated mark and band",
      "Every criterion marked, with comments",
      "The risks, and where marks are recoverable",
      "Next steps ranked by the marks they recover",
      "Two free re-checks of a revised version of the same work, within 14 days of the report opening",
      "IA, EE, TOK and UCAS personal statements",
    ],
    cta: "Get Started",
    href: "/essay",
    productKey: "ESSAY_SINGLE",
  },
  {
    name: "5 reports",
    price: PRICE_LABELS.ESSAY_PACK_5,
    description: "Five reports on any mix of work",
    popular: false,
    features: [
      "Everything in the full report",
      "$5.00 per report, 50% less than buying singly",
      "Two free re-checks for each report, within 14 days of it opening",
      "Use across any subjects",
      "No expiry. Without an account, unused reports wait in the browser you bought them in until you sign in",
      "For several pieces of work; drafts of the same work use the free re-checks",
    ],
    cta: "Get Started",
    href: "/dashboard",
    productKey: "ESSAY_PACK_5",
  },
  {
    name: "10 reports",
    price: PRICE_LABELS.ESSAY_PACK_10,
    description: "Ten reports on any mix of work",
    popular: true,
    features: [
      "Everything in the full report",
      "$4.50 per report, 55% less than buying singly",
      "Two free re-checks for each report, within 14 days of it opening",
      "Use across any subjects",
      "No expiry. Without an account, unused reports wait in the browser you bought them in until you sign in",
      "Enough for the IAs in six subjects, the Extended Essay and both TOK tasks",
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
        title="IB Essay Feedback from $9.99: No Subscription, No Account Needed | IBLens"
        description="A free preview on your first IB essay, then a full report for $9.99, five for $24.99 or ten for $44.99. No subscription, paid reports do not expire, two re-checks per report, and a 7-day money-back guarantee."
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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            No subscription and no expiry. Your first preview is free, one per device or account. Prices in US dollars.
          </p>
        </div>

        {/* Free tier highlight */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Your first preview is free</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Paste your essay with no sign-in and no credit card. The preview shows your band range, feedback on your weakest criterion (for the TOK essay and exhibition, the start of the explanation) and the top risks in your draft.
              </p>
            </div>
            <Button size="sm" asChild className="flex-shrink-0 self-start sm:self-auto">
              <Link href="/essay">Get a free preview</Link>
            </Button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                    Lowest price per report
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

            </div>
          ))}
        </div>

        <p className="max-w-3xl mx-auto mt-8 text-sm text-muted-foreground text-center">
          <strong className="text-foreground">7-day money-back guarantee.</strong> Email us within 7 days of your purchase for a full refund, no questions asked.{" "}
          <Link href="/refund-policy" className="underline">Refund policy</Link>
        </p>
        <p className="max-w-3xl mx-auto mt-3 text-sm text-muted-foreground text-center">
          Without an account, this browser keeps your newest report open, with its re-checks, and holds any unused paid reports. To keep every report you buy and re-check each one, sign in with Google on this device, using the email you pay with.
        </p>

        {/* Payment methods */}
        <div className="flex items-center justify-center gap-6 mt-12 text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1.5">
            <CreditCard className="w-4 h-4" />
            <span>Major cards and other methods at checkout</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4" />
            <span>Secure checkout</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CreditCard className="w-4 h-4" />
            <span>Reports are added as soon as the payment clears</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">Not sure yet? Start with the free preview.</p>
          <Button size="lg" asChild>
            <Link href="/essay">
              Start your free preview <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
