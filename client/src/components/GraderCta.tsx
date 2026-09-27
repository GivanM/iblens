import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PRICE_LABELS } from "@shared/pricing";

/**
 * The way into the grader from inside a guide. Guides bring about half the site's visitors
 * and almost none of its drafts: over twelve days in September, 797 visitors who landed on
 * a guide sent 5 pieces of work, against 8% of the visitors who landed on a subject page,
 * which carries a button like this one. A link in the last paragraph was not enough.
 */
export function GraderCta({ work, href, note }: { work: string; href: string; note?: string }) {
  return (
    <aside className="not-prose my-8 rounded-2xl border border-primary/30 bg-primary/5 p-5 md:p-6">
      <p className="font-semibold text-foreground mb-1">Check your {work} against the criteria</p>
      <p className="text-muted-foreground leading-relaxed mb-4">
        {note ?? `Paste your draft and IBLens marks it against the published criteria in a minute or two. The first preview is free and needs no account; the full report is ${PRICE_LABELS.ESSAY_SINGLE}.`}
      </p>
      <Button asChild className="min-h-11"><Link href={href}>Check my {work}</Link></Button>
      <p className="text-sm text-muted-foreground mt-3">
        Ask your teacher first, or your supervisor for the Extended Essay: outside feedback is allowed only if your school allows it.
      </p>
    </aside>
  );
}
