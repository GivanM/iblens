import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreditCard, Loader2, Shield, Mail } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { getAnonFingerprint } from "@/lib/fingerprint";
import { PRICE_LABELS, PRICES, type ProductKey } from "@shared/pricing";
import { trackBeginCheckout, trackViewItem } from "@/lib/analytics/track";
import type { ProductSlug } from "@/lib/analytics/config";

const SKU_LABELS: Record<ProductKey, string> = {
  ESSAY_SINGLE: "Full report",
  ESSAY_PACK_5: "5 reports",
  ESSAY_PACK_10: "10 reports",
  UNIVERSITY_SINGLE: "University Strategy Report",
};

const SKU_COUNT: Record<ProductKey, number> = {
  ESSAY_SINGLE: 1,
  ESSAY_PACK_5: 5,
  ESSAY_PACK_10: 10,
  UNIVERSITY_SINGLE: 1,
};

interface PurchaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sku: ProductKey;
  /** A signed-in buyer's locked account report, opened by this payment. */
  analysisId?: number | null;
  /**
   * The buyer is looking at a locked preview and this payment opens it. Anywhere
   * else a purchase only adds reports for new work.
   */
  unlocksPreview?: boolean;
  /** What that preview is, in a few words, so the dialog can name it. */
  previewLabel?: string | null;
  /**
   * What the report is. A UCAS review has no mark and no criteria, and a TOK task is
   * marked as a whole, so "every criterion" and "your predicted mark" are wrong there.
   */
  kind?: "essay" | "tok" | "ucas";
}

// Map ProductKey to analytics ProductSlug
const SKU_TO_SLUG: Record<ProductKey, ProductSlug> = {
  ESSAY_SINGLE: "essay_single",
  ESSAY_PACK_5: "essay_pack_5",
  ESSAY_PACK_10: "essay_pack_10",
  UNIVERSITY_SINGLE: "university_strategy",
};

export function PurchaseModal({ open, onOpenChange, sku, analysisId, unlocksPreview, previewLabel, kind }: PurchaseModalProps) {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  // Fire view_item when modal opens
  useEffect(() => {
    if (open) {
      trackViewItem(SKU_TO_SLUG[sku], PRICES[sku] / 100);
    }
  }, [open, sku]);

  const onCheckoutReady = (data: { checkoutUrl: string }) => {
    toast.success("Opening secure checkout…");
    window.location.href = data.checkoutUrl;
  };
  const onCheckoutError = (error: any) => {
    setLoading(false);
    // The server validates the address again; its message is a JSON blob, not a sentence.
    if (/email/i.test(String(error?.message || ""))) {
      setEmailError("That email address does not look right. Check it and try again.");
      return;
    }
    toast.error("Checkout could not start", { description: "Please try again in a moment." });
  };

  // Authenticated: card checkout via LemonSqueezy
  const createCardCheckout = trpc.payment.createLemonsqueezyCheckout.useMutation({
    onSuccess: onCheckoutReady,
    onError: onCheckoutError,
  });

  // Guest (unauthenticated): checkout with email
  const createGuestCheckout = trpc.payment.createGuestCheckout.useMutation({
    onSuccess: onCheckoutReady,
    onError: onCheckoutError,
  });

  const opensPreview = !!analysisId || unlocksPreview === true;
  const returnTo = typeof window !== "undefined" && window.location.pathname.startsWith("/ucas")
    ? ("ucas-personal-statement" as const)
    : ("essay" as const);

  const handlePay = () => {
    if (!isAuthenticated) {
      const trimmedEmail = guestEmail.trim();
      if (!/^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(trimmedEmail)) {
        setEmailError("Enter the email address the receipt should go to.");
        document.getElementById("guest-email")?.focus();
        return;
      }
      setEmailError(null);
      setLoading(true);
      trackBeginCheckout(SKU_TO_SLUG[sku], PRICES[sku] / 100, "lemonsqueezy");
      // The device id always travels: a guest's reports live on this browser.
      createGuestCheckout.mutate({
        productKey: sku,
        email: trimmedEmail,
        fingerprint: getAnonFingerprint(),
        returnTo,
        unlockPreview: opensPreview,
      });
      return;
    }

    setLoading(true);
    trackBeginCheckout(SKU_TO_SLUG[sku], PRICES[sku] / 100, "lemonsqueezy");
    createCardCheckout.mutate({
      productKey: sku,
      fingerprint: getAnonFingerprint(),
      returnTo,
      unlockPreview: opensPreview && !analysisId,
      ...(analysisId && opensPreview ? { analysisId } : {}),
    });
  };

  const price = PRICE_LABELS[sku];
  const label = SKU_LABELS[sku];
  const count = SKU_COUNT[sku];
  const named = previewLabel ? ` (${previewLabel})` : "";

  const contents = kind === "ucas"
    ? "all three answers reviewed, the issues across the statement and a ranked revision list (no score: UCAS publishes no mark scheme)"
    : kind === "tok"
      ? "your estimated mark within the band, the whole explanation and the ranked fix list"
      : "every criterion with its comments, your estimated mark and the ranked fix list";
  const firstLine = opensPreview
    ? count > 1
      ? `The locked preview on this page${named} opens in full, and ${count - 1} more reports wait for your other work`
      : `The locked preview on this page${named}, opened in full: ${contents}`
    : count > 1
      ? `${count} full reports for different pieces of work: IB coursework (every criterion with comments, or for TOK the whole explanation, with an estimated mark and ranked fixes) or UCAS statements (all three answers, no score)`
      : kind === "ucas"
        ? `One full review for your next UCAS statement: ${contents}`
        : `One full report for your next piece of work: ${contents}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md max-h-[92dvh] overflow-y-auto"
        // On a phone, focusing the email field opens the keyboard over the price.
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Complete your purchase</DialogTitle>
          <DialogDescription className="sr-only">
            {label}, {price}, one-time payment through LemonSqueezy.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-1">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className="text-4xl font-bold tracking-tight">{price} <span className="text-base font-medium text-muted-foreground">USD</span></p>
            <p className="text-xs text-muted-foreground mt-1">One-time payment. No subscription.</p>
            <div className="mt-3 rounded-lg bg-muted/50 p-3 text-left">
              <p className="text-xs font-medium mb-1">What you get</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                <li>{firstLine}</li>
                <li>{count > 1
                  ? "Two free re-checks of revised versions of the same work with each report, within 14 days of that report opening"
                  : "Two free re-checks of revised versions of the same work, within 14 days of the report opening"}</li>
                {isAuthenticated
                  ? <li>{opensPreview ? "The report opens in your account" : "The reports are added to your account"} as soon as the payment clears</li>
                  : <>
                      <li>No account needed. {opensPreview && count === 1 ? "The report opens in this browser" : `The ${count > 1 ? "reports go" : "report goes"} to this browser`} as soon as the payment clears. Without an account, this browser keeps unused reports and your newest opened report with its re-checks, for as long as its site data is kept; clearing it loses them.</li>
                      <li>To keep every report in an account and use them on another device, sign in with Google on this device with the email you enter below. Buying for someone else? Pay on their phone or computer, or have them sign in here with their own Google account first.</li>
                    </>}
              </ul>
            </div>
          </div>

          {!isAuthenticated && (
            <div className="space-y-1.5">
              <Label htmlFor="guest-email" className="text-sm font-medium flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                Your email, for the receipt
              </Label>
              <input
                id="guest-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={guestEmail}
                aria-invalid={emailError ? true : undefined}
                aria-describedby={emailError ? "guest-email-error" : undefined}
                onChange={(e) => { setGuestEmail(e.target.value); if (emailError) setEmailError(null); }}
                className={`w-full px-3 py-2.5 text-base sm:text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${emailError ? "border-rose-500" : ""}`}
              />
              {emailError && <p id="guest-email-error" className="text-xs text-rose-600">{emailError}</p>}
            </div>
          )}

          <div className="flex items-center gap-3 p-3.5 border rounded-lg border-primary bg-primary/5 ring-1 ring-primary/20">
            <CreditCard className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Pay by card (Visa, Mastercard, Amex) or another method shown at checkout.
            </p>
          </div>

          <Button
            className="w-full min-h-11 h-auto py-2.5 text-base font-semibold whitespace-normal"
            onClick={handlePay}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Opening checkout…
              </>
            ) : (
              `Continue to checkout, ${price}`
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
            <Shield className="w-3 h-3 flex-shrink-0" />
            Secure checkout by LemonSqueezy. Prices are in US dollars.
          </p>
          <p className="text-xs text-center text-muted-foreground">
            <a href="/refund-policy" target="_blank" rel="noopener" className="underline hover:text-foreground">7-day money-back guarantee</a> · <a href="/resources/sample-reports" target="_blank" rel="noopener" className="underline hover:text-foreground">see sample reports</a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
