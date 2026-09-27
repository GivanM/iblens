import { Button } from "@/components/ui/button";
import { PAY_WHAT_YOU_WANT, PRICE_LABELS } from "@shared/pricing";

/**
 * Name your own price for the report on the page. It buys what the fixed price buys, so a
 * reader who cannot spend $9.99 still has a way to open their report. Between 16 August and
 * 27 September 2026 the earlier version of this button, which took money and unlocked
 * nothing, was used zero times.
 *
 * Without `onNamePrice` there is no locked report on the page, and the button stays what it
 * was: the price of a free check, for a reader who wants to pay for it.
 */
export function PayWhatYouWant({ place, onNamePrice }: { place: "essay_preview" | "ucas_preview" | "remark_check"; onNamePrice?: () => void }) {
  if (!PAY_WHAT_YOU_WANT.buyUrl) return null;
  if (onNamePrice && PAY_WHAT_YOU_WANT.unlocksReport) {
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
  const url = new URL(PAY_WHAT_YOU_WANT.buyUrl);
  url.searchParams.set("checkout[custom][kind]", "pay_what_you_want");
  url.searchParams.set("checkout[custom][place]", place);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-t border-border pt-4">
      <p className="text-sm text-muted-foreground flex-1">
        <strong className="text-foreground">This check is free.</strong> If it helped, you can pay what you want
        for it (${PAY_WHAT_YOU_WANT.suggestedUsd} suggested). Paying unlocks nothing extra.
      </p>
      <Button variant="outline" className="min-h-11" asChild>
        <a href={url.toString()} target="_blank" rel="noopener noreferrer">Pay what you want</a>
      </Button>
    </div>
  );
}
