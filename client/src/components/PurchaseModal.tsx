import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Bitcoin, Loader2, Shield, Mail } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { PRICE_LABELS, PRICES, type ProductKey } from "@shared/pricing";
import { trackBeginCheckout, trackViewItem } from "@/lib/analytics/track";
import type { ProductSlug, PaymentMethod as AnalyticsPaymentMethod } from "@/lib/analytics/config";

const SKU_LABELS: Record<ProductKey, string> = {
  ESSAY_SINGLE: "1 Essay Analysis",
  ESSAY_PACK_5: "5 Essay Analyses",
  ESSAY_PACK_10: "10 Essay Analyses",
  UNIVERSITY_SINGLE: "University Strategy Report",
};

type PaymentMethod = "card" | "crypto";

interface PurchaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sku: ProductKey;
}

// Map ProductKey to analytics ProductSlug
const SKU_TO_SLUG: Record<ProductKey, ProductSlug> = {
  ESSAY_SINGLE: "essay_single",
  ESSAY_PACK_5: "essay_pack_5",
  ESSAY_PACK_10: "essay_pack_10",
  UNIVERSITY_SINGLE: "university_strategy",
};

export function PurchaseModal({ open, onOpenChange, sku }: PurchaseModalProps) {
  const { isAuthenticated } = useAuth();
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [loading, setLoading] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");

  // Fire view_item when modal opens
  useEffect(() => {
    if (open) {
      trackViewItem(SKU_TO_SLUG[sku], PRICES[sku] / 100);
    }
  }, [open, sku]);

  // Authenticated: card checkout via LemonSqueezy
  const createCardCheckout = trpc.payment.createLemonsqueezyCheckout.useMutation({
    onSuccess: (data) => {
      toast.success("Redirecting to checkout...");
      window.location.href = data.checkoutUrl;
      setLoading(false);
    },
    onError: (error) => {
      toast.error("Payment error", { description: error.message || "Failed to create checkout." });
      setLoading(false);
    },
  });

  // Authenticated: crypto checkout via NOWPayments
  const createCryptoInvoice = trpc.payment.createCryptoInvoice.useMutation({
    onSuccess: (data) => {
      toast.success("Redirecting to crypto checkout...");
      window.location.href = data.invoiceUrl;
      setLoading(false);
    },
    onError: (error) => {
      toast.error("Payment error", { description: error.message || "Failed to create invoice." });
      setLoading(false);
    },
  });

  // Guest (unauthenticated): card checkout with email
  const createGuestCheckout = trpc.payment.createGuestCheckout.useMutation({
    onSuccess: (data) => {
      toast.success("Redirecting to checkout...");
      window.location.href = data.checkoutUrl;
      setLoading(false);
    },
    onError: (error) => {
      toast.error("Payment error", { description: error.message || "Failed to create checkout." });
      setLoading(false);
    },
  });

  const handlePay = () => {
    if (!isAuthenticated) {
      // Guest flow: require email, card only
      const trimmedEmail = guestEmail.trim();
      if (!trimmedEmail || !trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
        toast.error("Please enter a valid email address");
        return;
      }
      setLoading(true);
      trackBeginCheckout(SKU_TO_SLUG[sku], PRICES[sku] / 100, "lemonsqueezy");
      createGuestCheckout.mutate({ productKey: sku, email: trimmedEmail });
      return;
    }

    // Authenticated flow
    setLoading(true);
    const analyticsMethod: AnalyticsPaymentMethod = method === "card" ? "lemonsqueezy" : "nowpayments";
    trackBeginCheckout(SKU_TO_SLUG[sku], PRICES[sku] / 100, analyticsMethod);
    if (method === "card") {
      createCardCheckout.mutate({ productKey: sku });
    } else {
      createCryptoInvoice.mutate({ productKey: sku });
    }
  };

  const price = PRICE_LABELS[sku];
  const label = SKU_LABELS[sku];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Complete Your Purchase</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Product info */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className="text-4xl font-bold tracking-tight">{price}</p>
            <p className="text-xs text-muted-foreground mt-1">One-time payment</p>
          </div>

          {/* Guest: email input */}
          {!isAuthenticated && (
            <div className="space-y-1.5">
              <Label htmlFor="guest-email" className="text-sm font-medium flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                Your email
              </Label>
              <input
                id="guest-email"
                type="email"
                placeholder="you@example.com"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                Credits will be linked to this email after payment.
              </p>
            </div>
          )}

          {/* Authenticated: payment method selector */}
          {isAuthenticated && (
            <RadioGroup
              value={method}
              onValueChange={(v) => setMethod(v as PaymentMethod)}
              className="space-y-3"
            >
              <label
                htmlFor="method-card"
                className={`flex items-center gap-3 p-3.5 border rounded-lg cursor-pointer transition-all ${
                  method === "card"
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <RadioGroupItem value="card" id="method-card" />
                <CreditCard className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1">
                  <Label htmlFor="method-card" className="font-medium text-sm cursor-pointer">
                    Pay with card
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Visa, Mastercard, Amex — instant activation
                  </p>
                </div>
              </label>

              <label
                htmlFor="method-crypto"
                className={`flex items-center gap-3 p-3.5 border rounded-lg cursor-pointer transition-all ${
                  method === "crypto"
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <RadioGroupItem value="crypto" id="method-crypto" />
                <Bitcoin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1">
                  <Label htmlFor="method-crypto" className="font-medium text-sm cursor-pointer">
                    Pay with crypto
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    USDT, BTC, ETH — instant activation
                  </p>
                </div>
              </label>
            </RadioGroup>
          )}

          {/* Guest: show card-only indicator */}
          {!isAuthenticated && (
            <div className="flex items-center gap-3 p-3.5 border rounded-lg border-primary bg-primary/5 ring-1 ring-primary/20">
              <CreditCard className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm">Pay with card</p>
                <p className="text-xs text-muted-foreground">
                  Visa, Mastercard, Amex — instant activation
                </p>
              </div>
            </div>
          )}

          {/* Pay button */}
          <Button
            className="w-full h-11 text-base font-semibold"
            onClick={handlePay}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ${price}`
            )}
          </Button>

          {/* Small print */}
          <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
            <Shield className="w-3 h-3" />
            Secure checkout. Credits activate automatically after payment.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
