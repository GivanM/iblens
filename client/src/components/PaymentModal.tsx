import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Bitcoin, ShieldCheck, Coins } from "lucide-react";

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
            <p className="text-xs font-medium text-muted-foreground mb-3 text-center">Pay with cryptocurrency</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Bitcoin className="w-4 h-4" />
                <span>BTC</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Coins className="w-4 h-4" />
                <span>ETH</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Coins className="w-4 h-4" />
                <span>USDT</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Coins className="w-4 h-4" />
                <span>LTC</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Coins className="w-4 h-4" />
                <span>20+ more</span>
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
            Secure crypto payment via Plisio. You will be redirected to a secure payment page and returned here after completion.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
