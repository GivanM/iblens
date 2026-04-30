import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { PRICE_LABELS } from "@shared/pricing";
import {
  FileText, GraduationCap, BarChart3, CheckCircle2, ArrowRight,
  Shield, Bitcoin, Gift, Sparkles, Loader2, CreditCard
} from "lucide-react";

type ProductKey = "ESSAY_SINGLE" | "ESSAY_PACK_5" | "ESSAY_PACK_10" | "UNIVERSITY_SINGLE";

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
  const { isAuthenticated } = useAuth();
  const [loadingCrypto, setLoadingCrypto] = useState<string | null>(null);
  const [loadingCard, setLoadingCard] = useState<string | null>(null);

  const createInvoice = trpc.payment.createCryptoInvoice.useMutation({
    onSuccess: (data) => {
      toast.success("Redirecting to crypto checkout...", {
        description: "A new tab will open with your payment page.",
      });
      window.open(data.invoiceUrl, "_blank");
      setLoadingCrypto(null);
    },
    onError: (error) => {
      toast.error("Payment error", {
        description: error.message || "Failed to create invoice. Please try again.",
      });
      setLoadingCrypto(null);
    },
  });

  const createCardCheckout = trpc.payment.createLemonsqueezyCheckout.useMutation({
    onSuccess: (data) => {
      toast.success("Redirecting to card checkout...", {
        description: "A new tab will open with your payment page.",
      });
      window.open(data.checkoutUrl, "_blank");
      setLoadingCard(null);
    },
    onError: (error) => {
      toast.error("Payment error", {
        description: error.message || "Failed to create checkout. Please try again.",
      });
      setLoadingCard(null);
    },
  });

  const handleCryptoPay = (productKey: ProductKey) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    setLoadingCrypto(productKey);
    createInvoice.mutate({ productKey });
  };

  const handleCardPay = (productKey: ProductKey) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    setLoadingCard(productKey);
    createCardCheckout.mutate({ productKey });
  };

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

                {/* Primary CTA — navigate to feature page */}
                {plan.requiresAuth && !isAuthenticated ? (
                  <Button
                    size="sm"
                    className="w-full mb-2"
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <a href={getLoginUrl()}>
                      {plan.cta} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="w-full mb-2"
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href={plan.href}>
                      {plan.cta} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </Button>
                )}

                {/* Pay with Card button (LemonSqueezy) */}
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-full mb-1.5 text-xs"
                  onClick={() => handleCardPay(plan.productKey)}
                  disabled={loadingCard === plan.productKey}
                >
                  {loadingCard === plan.productKey ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                      Creating checkout...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-3 h-3 mr-1.5" />
                      Pay with Card
                    </>
                  )}
                </Button>

                {/* Pay with Crypto button (NOWPayments) */}
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => handleCryptoPay(plan.productKey)}
                  disabled={loadingCrypto === plan.productKey}
                >
                  {loadingCrypto === plan.productKey ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                      Creating invoice...
                    </>
                  ) : (
                    <>
                      <Bitcoin className="w-3 h-3 mr-1.5" />
                      Pay with Crypto
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment methods */}
        <div className="flex items-center justify-center gap-6 mt-12 text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1.5">
            <CreditCard className="w-4 h-4" />
            <span>All major cards via LemonSqueezy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4" />
            <span>Telegram Stars via Tribute</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bitcoin className="w-4 h-4" />
            <span>Crypto via NOWPayments</span>
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
