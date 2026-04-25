import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, ShieldCheck, Star, Bitcoin, ExternalLink, MessageCircle } from "lucide-react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tributeUrl: string | null;
  productName: string;
  price: string;
  telegramUsername: string | null;
  onPaymentComplete?: () => void;
}

export function PaymentModal({
  open,
  onOpenChange,
  tributeUrl,
  productName,
  price,
  telegramUsername,
  onPaymentComplete,
}: PaymentModalProps) {
  const [opened, setOpened] = useState(false);

  const handlePay = () => {
    if (!tributeUrl) return;
    window.open(tributeUrl, "_blank");
    setOpened(true);
  };

  const handleDone = () => {
    onPaymentComplete?.();
    setOpened(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) setOpened(false); onOpenChange(v); }}>
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
                <span>Card</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Bitcoin className="w-4 h-4" />
                <span>Crypto</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Star className="w-4 h-4" />
                <span>Telegram Stars</span>
              </div>
            </div>
          </div>

          {/* Telegram username notice */}
          {!telegramUsername && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-4">
              <p className="text-xs text-amber-600 dark:text-amber-400 text-center">
                Please set your Telegram username in the dashboard first so we can link your payment to your account.
              </p>
            </div>
          )}

          {telegramUsername && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 mb-4">
              <p className="text-xs text-emerald-600 dark:text-emerald-400 text-center">
                Your Telegram: <span className="font-semibold">@{telegramUsername}</span> — we'll use this to link your payment.
              </p>
            </div>
          )}

          {!opened ? (
            <>
              {/* Pay button */}
              <Button
                className="w-full h-12 text-base font-semibold"
                onClick={handlePay}
                disabled={!tributeUrl || !telegramUsername}
              >
                <ShieldCheck className="w-5 h-5 mr-2" />
                Pay {price}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-[10px] text-muted-foreground text-center mt-3">
                You will be redirected to Tribute for secure payment.
              </p>
            </>
          ) : (
            <>
              {/* After opening payment page */}
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Payment page opened in a new tab. Complete the payment there.
                </p>

                {/* Manual activation message */}
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-left">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">
                        After payment, activate your credits:
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        Message <a href="https://t.me/iblens_support" target="_blank" rel="noopener noreferrer" className="font-bold underline">@iblens_support</a> on Telegram with your payment confirmation to activate your credits.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full h-12 text-base font-semibold"
                  onClick={handleDone}
                >
                  I've Completed Payment
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handlePay}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Payment Page Again
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-3">
                Credits are typically activated within a few minutes after you contact us.
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
