import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, X, ExternalLink } from "lucide-react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceUrl: string | null;
  productName: string;
  onPaymentComplete?: () => void;
}

export function PaymentModal({
  open,
  onOpenChange,
  invoiceUrl,
  productName,
  onPaymentComplete,
}: PaymentModalProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (!open) {
      setIframeLoaded(false);
    }
  }, [open]);

  // Listen for payment success via URL polling (when user returns from payment)
  useEffect(() => {
    if (!open) return;

    const checkPaymentStatus = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("payment") === "success") {
        onPaymentComplete?.();
        onOpenChange(false);
      }
    };

    const interval = setInterval(checkPaymentStatus, 2000);
    return () => clearInterval(interval);
  }, [open, onPaymentComplete, onOpenChange]);

  const handleIframeLoad = useCallback(() => {
    setIframeLoaded(true);
  }, []);

  const handleOpenExternal = () => {
    if (invoiceUrl) {
      window.open(invoiceUrl, "_blank");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-[95vw] sm:w-full p-0 gap-0 overflow-hidden rounded-xl max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
          <div>
            <DialogTitle className="text-sm font-semibold">
              Complete Payment
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {productName} — Pay with card, Apple Pay, or crypto
            </DialogDescription>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={handleOpenExternal}
              title="Open in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => onOpenChange(false)}
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Payment iframe */}
        <div className="relative w-full" style={{ height: "min(70vh, 600px)" }}>
          {/* Loading spinner */}
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-10">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
              <p className="text-sm text-muted-foreground">Loading payment page...</p>
            </div>
          )}

          {invoiceUrl && (
            <iframe
              src={invoiceUrl}
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
              allow="payment"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
              title="Payment"
            />
          )}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2.5 border-t bg-muted/20 text-center">
          <p className="text-[11px] text-muted-foreground">
            Secure payment powered by NOWPayments. Supports Visa, Mastercard, Apple Pay, Google Pay, and 350+ cryptocurrencies.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
