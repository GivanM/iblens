import { useState } from "react";
import { useParams, Link } from "wouter";
import { toast } from "sonner";
import { PRICE_LABELS } from "@shared/pricing";
import { PurchaseModal } from "@/components/PurchaseModal";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, Printer } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { WordCheckNote } from "@/components/WordCheckNote";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

export default function AnalysisView() {
  const params = useParams();
  const id = Number(params.id);
  // Back from checkout: the webhook opens the report a few seconds after the payment
  // clears, so keep asking for a short while instead of showing it as locked.
  const paidReturn = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("payment") === "success";
  const [pollStart] = useState(() => Date.now());
  const { data, isLoading, error } = trpc.dashboard.analysis.useQuery({ id }, {
    enabled: Number.isFinite(id),
    refetchInterval: (q: any) => {
      const d = q?.state?.data ?? q;
      return paidReturn && !(d as any)?.unlocked && Date.now() - pollStart < 120000 ? 4000 : false;
    },
  });
  const [buyOpen, setBuyOpen] = useState(false);
  const utils = trpc.useUtils();
  // A locked report had no way to be opened from here: the dashboard sent people
  // to the analyzer, where the unlock button only ever existed for the anonymous
  // report of the current session.
  const creditsQ = trpc.dashboard.credits.useQuery(undefined, { enabled: Number.isFinite(id) });
  const paidLeft = creditsQ.data?.essayCredits ?? 0;
  const unlockHere = trpc.essay.unlockAnalysis.useMutation({
    onSuccess: () => { toast.success("Report unlocked."); utils.dashboard.analysis.invalidate(); utils.dashboard.credits.invalidate(); },
    onError: (e: any) => toast.error(e.message || "Could not unlock this report"),
  });

  if (isLoading) {
    return (
      <div className="container max-w-3xl mx-auto py-20 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container max-w-3xl mx-auto py-20 text-center space-y-4">
        <p className="text-muted-foreground">This report is not available.</p>
        <Button asChild variant="outline"><Link href="/dashboard">Back to dashboard</Link></Button>
      </div>
    );
  }

  const r: any = (data as any).resultJson || {};
  // A UCAS review has a different shape entirely. Rendering it here printed
  // "undefined/undefined" with empty criteria.
  if ((data as any).essayType === "UCAS") {
    return (
      <div className="container max-w-3xl mx-auto py-20 text-center space-y-4">
        <h1 style={SERIF} className="text-2xl font-bold">{r.verdict || "Your UCAS review"}</h1>
        <p className="text-muted-foreground">{r.verdict_reason || "This is a UCAS personal statement review."}</p>
        <Button asChild><Link href="/ucas-personal-statement">Open it on the UCAS page</Link></Button>
      </div>
    );
  }
  const unlocked = (data as any).unlocked;
  const criteria: any[] = Array.isArray(r.criteria) ? r.criteria : [];

  if (!unlocked) {
    return (
      <div className="container max-w-3xl mx-auto py-20 text-center space-y-4">
        <h1 style={SERIF} className="text-2xl font-bold">This report is still locked</h1>
        <p className="text-muted-foreground">You saw the free preview for this draft. The full report unlocks the exact mark, comments on every criterion, and your ranked fix list.</p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          {paidLeft > 0 ? (
            <Button disabled={unlockHere.isPending} onClick={() => unlockHere.mutate({ analysisId: id })}>
              {unlockHere.isPending ? "Unlocking…" : `Unlock with 1 of your ${paidLeft} paid ${paidLeft === 1 ? "report" : "reports"}`}
            </Button>
          ) : (
            <Button onClick={() => setBuyOpen(true)}>
              Unlock the full report, {PRICE_LABELS.ESSAY_SINGLE}
            </Button>
          )}
        </div>
        {paidReturn && <p className="text-sm text-muted-foreground">Payment received. The report opens here as soon as the payment clears, usually within a minute.</p>}
        <PurchaseModal open={buyOpen} onOpenChange={setBuyOpen} sku="ESSAY_SINGLE" analysisId={id} />
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto py-10 px-4 space-y-6">
      <SEOHead title="Your IBLens Report" description="Your saved IBLens analysis report." canonical="/dashboard" />

      <div className="flex items-center justify-between gap-3 print:hidden">
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard"><ArrowLeft className="w-4 h-4 mr-2" />Dashboard</Link>
        </Button>
        <div className="flex items-center gap-2">
          {!(data as any).rerunOf && Math.max(0, 2 - ((data as any).rerunsUsed ?? 0)) > 0 && (
            <Button asChild variant="outline" size="sm">
              <Link href={`/essay?rerun=${id}&session=${(data as any)?.examSession || ""}`}>Re-check my revised draft</Link>
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-2" />Save as PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle style={SERIF} className="text-xl">
            {(data as any).essayType}, {(data as any).subject}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {new Date((data as any).createdAt).toLocaleDateString()}
            {r._rubricLabel ? ` · ${r._rubricLabel}` : ""}
          </p>
          <p className="text-xs text-muted-foreground">
            {(data as any).rerunOf
        ? "This is a re-check of a report you bought. Its re-checks belong to that original report."
        : `Included with this report: ${Math.max(0, 2 - ((data as any).rerunsUsed ?? 0))} free re-check(s) of this draft within 14 days.`}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <div style={SERIF} className="text-3xl font-bold">{r.predicted_score}/{r.max_score}</div>
              <p className="text-xs text-muted-foreground">Predicted score</p>
            </div>
            {r.band_range && (
              <div>
                <div style={SERIF} className="text-3xl font-bold">{r.band_range}</div>
                <p className="text-xs text-muted-foreground">Band range</p>
              </div>
            )}
          </div>

          <WordCheckNote check={r._wordCheck} />

          {r.overall_comment && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">Overall comment</h2>
              <p className="text-sm leading-relaxed">{r.overall_comment}</p>
            </div>
          )}

          {criteria.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Criteria</h2>
              {criteria.map((c: any, i: number) => (
                <div key={i} className="border-t pt-3">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <p className="text-sm font-semibold">{c.name}</p>
                    <Badge variant="secondary" className="flex-shrink-0">{c.score}/{c.max}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.comment}</p>
                </div>
              ))}
            </div>
          )}

          {Array.isArray(r.next_steps) && r.next_steps.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">What to fix first</h2>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                {r.next_steps.map((s: any, i: number) => (
                  <li key={i}>{typeof s === "string" ? s : `${s.action || ""} ${s.why ? `- ${s.why}` : ""}`}</li>
                ))}
              </ol>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
