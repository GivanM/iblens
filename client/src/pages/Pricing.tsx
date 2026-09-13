import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { PRICE_LABELS, type ProductKey } from "@shared/pricing";
import { PurchaseModal } from "@/components/PurchaseModal";
import { useMarkingCta } from "@/hooks/useMarkingCta";
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
      "IB coursework: an estimated mark, a mark and comments on each criterion that can be judged from your text (TOK: the estimated mark within its band and the whole explanation), the risks and ranked next steps",
      "UCAS statement: all three answers reviewed, issues across the statement and a ranked revision list, with no score, because UCAS publishes no mark scheme",
      "Two free re-checks of a revised version of the same work, within 14 days of the report opening",
      "No account needed to buy",
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
      "$5.00 per report, almost 50% less than buying singly",
      "Two free re-checks for each report, within 14 days of it opening",
      "Use across the 14 coursework subjects, the Extended Essay, TOK and UCAS statements",
      "No expiry. Without an account, unused reports wait in the browser you bought them in, for as long as its site data is kept; sign in with Google to keep them in an account",
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
      "$4.50 per report, almost 55% less than buying singly",
      "Two free re-checks for each report, within 14 days of it opening",
      "Use across the 14 coursework subjects, the Extended Essay, TOK and UCAS statements",
      "No expiry. Without an account, unused reports wait in the browser you bought them in, for as long as its site data is kept; sign in with Google to keep them in an account",
      "For example the Extended Essay, both TOK tasks and several IAs (an Economics portfolio takes three, one per commentary)",
    ],
    cta: "Get Started",
    href: "/dashboard",
    productKey: "ESSAY_PACK_10",
  },
];

export default function Pricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSku, setModalSku] = useState<ProductKey>("ESSAY_SINGLE");
  const { previewUsed, paidLabel } = useMarkingCta();

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
            No subscription and no expiry. {previewUsed ? "Your free essay preview is used; the UCAS preview is separate, one per device." : "Your first preview is free, one per device or account."} Prices in US dollars.
          </p>
        </div>

        {/* Free tier highlight */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{previewUsed ? "Your free preview is used" : "Your first preview is free"}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {previewUsed
                  ? "A full report adds the estimated mark, every comment and the ranked fixes to what the preview showed."
                  : "Paste your essay with no sign-in and no credit card. The preview shows a range of totals, usually feedback on your weakest criterion (for the TOK essay and exhibition, the start of the explanation) and the top risks in your draft."}
              </p>
            </div>
            <Button size="sm" asChild className="flex-shrink-0 self-start sm:self-auto">
              <Link href="/essay">{previewUsed ? paidLabel : "Get a free preview"}</Link>
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
                Buy
              </Button>

            </div>
          ))}
        </div>

        <p className="max-w-3xl mx-auto mt-8 text-sm text-muted-foreground text-center">
          <strong className="text-foreground">7-day money-back guarantee.</strong> Email us within 7 days of your purchase for a full refund, no questions asked.{" "}
          <Link href="/refund-policy" className="underline">Refund policy</Link>
        </p>
        <p className="max-w-3xl mx-auto mt-3 text-sm text-muted-foreground text-center">
          Use a report on coursework only once your teacher, or for the Extended Essay your supervisor, has agreed to outside feedback.
        </p>
        <p className="max-w-3xl mx-auto mt-3 text-sm text-muted-foreground text-center">
          Without an account, this browser keeps every report you buy, with its re-checks, and any unused paid reports, for as long as its site data is kept. To keep every report you buy in an account, with the re-checks of IB work, sign in with Google on this device, using the email you pay with: reports you have opened move to an account with that email, and unused reports move to whichever Google account signs in here first (UCAS re-checks run only in the browser the review was made in, and signing out there ends them). Buying for your child or someone else? Pay on their device, or have them sign in with their own Google account first: reports then follow that account to any device. Paid on the wrong device? Email glushkovim@gmail.com with your order number and we will move the reports.
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
          <p className="text-muted-foreground mb-4">{previewUsed ? "Ready to mark your next piece of work?" : "Not sure yet? Start with the free preview."}</p>
          <Button size="lg" asChild>
            <Link href="/essay">
              {previewUsed ? paidLabel : "Start your free preview"} <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
