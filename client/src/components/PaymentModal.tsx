import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, Bitcoin, ShieldCheck } from "lucide-react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceUrl: string | null;
  productName: string;
  price: string;
  onPaymentComplete?: () => void;
}

export function PaymentModal({
  open,
  onOpenChange,
  invoiceUrl,
  productName,
  price,
  onPaymentComplete,
}: PaymentModalProps) {
  const [redirecting, setRedirecting] = useState(false);

  const handlePay = () => {
    if (!invoiceUrl) return;
    setRedirecting(true);
    // Redirect in the same window — user returns to /dashboard?payment=success after paying
    window.location.href = invoiceUrl;
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!redirecting) onOpenChange(v); }}>
      <DialogContent className="max-w-md w-[95vw] sm:w-full p-0 gap-0 overflow-hidden rounded-xl">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 text-center border-b">
          <DialogTitle className="text-lg font-semibold">
            Complete Your Purchase
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            {productName}
          </DialogDescription>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {/* Price display */}
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-foreground">{price}</div>
            <p className="text-xs text-muted-foreground mt-1">One-time payment</p>
          </div>

          {/* Payment methods info */}
          <div className="bg-muted/40 rounded-lg p-4 mb-6">
            <p className="text-xs font-medium text-muted-foreground mb-3 text-center">Accepted payment methods</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CreditCard className="w-4 h-4" />
                <span>Visa / MC</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                <span>Apple Pay</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.97 14.95c-.18.06-.37.05-.55-.04l-2.72-1.36c-.24-.12-.39-.36-.39-.63V9.08c0-.27.15-.51.39-.63l2.72-1.36c.18-.09.37-.1.55-.04.18.06.33.19.42.36l2.72 5.44c.09.18.1.37.04.55-.06.18-.19.33-.36.42l-2.72 1.36c-.03.01-.07.03-.1.04zm5.22-1.36l-2.72 1.36c-.18.09-.37.1-.55.04-.18-.06-.33-.19-.42-.36l-2.72-5.44c-.09-.18-.1-.37-.04-.55.06-.18.19-.33.36-.42l2.72-1.36c.18-.09.37-.1.55-.04.18.06.33.19.42.36l2.72 5.44c.09.18.1.37.04.55-.06.18-.19.33-.36.42z"/></svg>
                <span>Google Pay</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Bitcoin className="w-4 h-4" />
                <span>70+ Crypto</span>
              </div>
            </div>
          </div>

          {/* Pay button */}
          <Button
            className="w-full h-12 text-base font-semibold"
            onClick={handlePay}
            disabled={!invoiceUrl || redirecting}
          >
            {redirecting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Redirecting to payment...
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 mr-2" />
                Pay {price}
              </>
            )}
          </Button>

          {/* Security note */}
          <p className="text-[10px] text-muted-foreground text-center mt-4">
            Secure payment powered by CoinGate. You will be redirected to a secure payment page and returned here after completion.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
