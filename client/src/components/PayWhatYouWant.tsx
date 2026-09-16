import { Button } from "@/components/ui/button";
import { PAY_WHAT_YOU_WANT } from "@shared/pricing";

/**
 * Pay what you want for a free preview that was useful. It is the price of the preview the
 * reader already has, not a donation (LemonSqueezy does not allow donations), and it unlocks
 * nothing. Shown only once the product exists in the store.
 */
export function PayWhatYouWant({ place }: { place: "essay_preview" | "ucas_preview" | "remark_check" }) {
  if (!PAY_WHAT_YOU_WANT.buyUrl) return null;
  const url = new URL(PAY_WHAT_YOU_WANT.buyUrl);
  url.searchParams.set("checkout[custom][kind]", "pay_what_you_want");
  url.searchParams.set("checkout[custom][place]", place);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-t border-border pt-4">
      <p className="text-sm text-muted-foreground flex-1">
        <strong className="text-foreground">This preview is free.</strong> If it helped, you can pay what you want
        for it (${PAY_WHAT_YOU_WANT.suggestedUsd} suggested). Paying unlocks nothing extra.
      </p>
      <Button variant="outline" className="min-h-11" asChild>
        <a href={url.toString()} target="_blank" rel="noopener noreferrer">Pay what you want</a>
      </Button>
    </div>
  );
}
