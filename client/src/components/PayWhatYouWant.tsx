import { Button } from "@/components/ui/button";
import { PAY_WHAT_YOU_WANT, PRICE_LABELS } from "@shared/pricing";

/**
 * Name your own price for the report on the page. It buys what the fixed price buys, so a
 * reader who cannot spend $9.99 still has a way to open their report. Until 27 September 2026
 * this button took money and unlocked nothing, and in the month it existed nobody used it.
 */
export function PayWhatYouWant({ onNamePrice }: { onNamePrice: () => void }) {
  if (!PAY_WHAT_YOU_WANT.buyUrl || !PAY_WHAT_YOU_WANT.unlocksReport) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-t border-border pt-4">
      <p className="text-sm text-muted-foreground flex-1">
        <strong className="text-foreground">{PRICE_LABELS.ESSAY_SINGLE} is too much right now?</strong> Name your own
        price, from ${PAY_WHAT_YOU_WANT.minUsd}, and the same full report opens, with the same two re-checks.
      </p>
      <Button variant="outline" className="min-h-11" onClick={onNamePrice}>Name your price</Button>
    </div>
  );
}
