import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { toast } from "sonner";
import { PRICE_LABELS } from "@shared/pricing";
import { PurchaseModal } from "@/components/PurchaseModal";
import { UcasReview } from "@/components/UcasReview";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, Printer, Lock } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { WordCheckNote } from "@/components/WordCheckNote";
import { usePurchaseTracking } from "@/hooks/usePurchaseTracking";
import { fullReportAdds } from "@/lib/reportScope";
import { deviceReportLabel } from "@/components/DeviceReportsList";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

const TYPE_LABEL: Record<string, string> = {
  EE: "Extended Essay",
  IA: "IA",
  TOK: "TOK essay",
  "TOK Exhibition": "TOK exhibition",
  UCAS: "UCAS personal statement",
};

const dateLabel = (d: any) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function AnalysisView() {
  const params = useParams();
  const id = Number(params.id);
  usePurchaseTracking();
  // Back from checkout: the webhook opens the report a few seconds after the payment
  // clears, so keep asking for a short while instead of showing it as locked.
  const paidReturn = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("payment") === "success";
  const [pollStart] = useState(() => Date.now());
  // Polling stops after two minutes; this re-renders once then, so the fallback shows.
  const [, setWaitedOut] = useState(false);
  useEffect(() => {
    if (!paidReturn) return;
    const t = setTimeout(() => setWaitedOut(true), 121000);
    return () => clearTimeout(t);
  }, [paidReturn]);
  const { data, isLoading, error } = trpc.dashboard.analysis.useQuery({ id }, {
    enabled: Number.isFinite(id),
    refetchInterval: (q: any) => {
      const d = q?.state?.data ?? q;
      return paidReturn && !(d as any)?.unlocked && Date.now() - pollStart < 120000 ? 4000 : false;
    },
  });
  const [buyOpen, setBuyOpen] = useState(false);
  const utils = trpc.useUtils();
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

  const a: any = data;
  const r: any = a.resultJson || {};
  const title = a.essayType === "UCAS"
    ? `UCAS personal statement, ${a.subject || "your course"}`
    : deviceReportLabel({ essayType: a.essayType, subject: a.subject });

  // Re-checks run for 14 days from the report opening; after that the server refuses
  // them, so the page must not keep offering them.
  const opened = a.unlockedAt ? new Date(a.unlockedAt).getTime() : new Date(a.createdAt).getTime();
  const windowOpen = (Date.now() - opened) / 86400000 <= 14;
  const rechecksLeft = windowOpen ? Math.max(0, 2 - (a.rerunsUsed ?? 0)) : 0;
  const header = (
    <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
      <Button asChild variant="ghost" size="sm">
        <Link href="/dashboard"><ArrowLeft className="w-4 h-4 mr-2" />Dashboard</Link>
      </Button>
      {a.unlocked && (
        <div className="flex flex-wrap items-center gap-2">
          {a.essayType !== "UCAS" && !a.rerunOf && rechecksLeft > 0 && (
            <Button asChild variant="outline" size="sm">
              <a href={`/essay?rerun=${id}${a.examSession ? `&session=${a.examSession}` : ""}&type=${encodeURIComponent(a.essayType === "TOK" && a.subject === "Exhibition" ? "TOK Exhibition" : a.essayType || "")}${a.subject && a.essayType !== "TOK" ? `&subject=${encodeURIComponent(a.subject)}` : ""}`}>Re-check a revised version</a>
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-2" />Save as PDF
          </Button>
        </div>
      )}
    </div>
  );

  // A UCAS review keeps its own shape; the shared component renders it in full.
  if (a.essayType === "UCAS" && !a.unlocked) {
    return (
      <div className="container max-w-3xl mx-auto py-20 text-center space-y-4">
        <SEOHead title="Your IBLens report | IBLens" description="Your saved IBLens report." canonical="/dashboard/analysis" />
        <h1 style={SERIF} className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">This review was refunded, so it is no longer available.</p>
        <Button asChild variant="outline"><Link href="/dashboard">Back to dashboard</Link></Button>
      </div>
    );
  }
  if (a.essayType === "UCAS") {
    return (
      <div className="container max-w-3xl mx-auto py-10 px-4 space-y-6">
        <SEOHead title="Your IBLens report | IBLens" description="Your saved IBLens report." canonical="/dashboard/analysis" />
        {header}
        <div>
          <h1 style={SERIF} className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">{dateLabel(a.createdAt)}</p>
        </div>
        <UcasReview result={r} course={a.subject || undefined} isUnlocked={true} />
        <p className="text-xs text-muted-foreground">
          Re-checks of a UCAS review run in the <Link href="/ucas-personal-statement" className="underline">UCAS checker</Link> on the device where you made the review, within 14 days of it opening, and only while that browser still holds it: signing out there ends them. This saved copy stays in your account either way.
        </p>
      </div>
    );
  }

  const criteria: any[] = Array.isArray(r.criteria) ? r.criteria : [];

  if (!a.unlocked) {
    // The preview the student already read, shown again: withholding it made this page a dead end.
    const p: any = a.preview || null;
    const weakest = p?.weakest_criterion;
    const holistic = (p?.criteria_names || []).length === 1;
    return (
      <div className="container max-w-3xl mx-auto py-10 px-4 space-y-6">
        <SEOHead title="Your IBLens report | IBLens" description="Your saved IBLens report." canonical="/dashboard/analysis" />
        {header}
        <Card className="border-primary/40">
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{a.unlockOrderId || a.rerunOf ? "Preview (purchase refunded)" : "Free preview"}</p>
            <CardTitle style={SERIF} className="text-xl">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{dateLabel(a.createdAt)}</p>
          </CardHeader>
          <CardContent className="space-y-5">
            {p?.band_range && (
              <div className="flex items-baseline gap-3">
                <span style={SERIF} className="text-4xl font-bold">{holistic ? "Band" : "Range"} {p.band_range}</span>
                {p.max_score ? <span className="text-sm text-muted-foreground">out of {p.max_score}</span> : null}
              </div>
            )}
            {p?.band_range && !holistic && <p className="text-xs text-muted-foreground -mt-3">IBLens's estimated total is somewhere in this range. It is not a margin of error; the full report gives the estimate.</p>}
            {!weakest && !holistic && p?.band_range && (
              <p className="text-sm rounded-lg border border-border bg-muted/40 p-4 text-muted-foreground">This preview names no criterion and lists no risks: for this draft, either would give the estimated mark away. The full report scores every criterion that can be marked from what you pasted.</p>
            )}
            {weakest && (
              <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1.5">{holistic ? "The start of the explanation" : "Your weakest criterion"}</p>
                <div className="flex justify-between gap-3 text-sm font-semibold mb-1 text-foreground"><span>{weakest.name}</span><span className="flex-shrink-0">{typeof weakest.score === "number" ? `${weakest.score}/${weakest.max}` : holistic ? `Band ${p.band_range}` : `?/${weakest.max}`}</span></div>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{weakest.comment}</p>
                {p?.weakest_comment_trimmed && <p className="text-xs text-amber-800 mt-2">Sentences that state a mark are left out of the preview; the full report has the whole comment.</p>}
              </div>
            )}
            {(p?.risks || []).length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Top risks in this draft</p>
                <ul className="space-y-2">
                  {p.risks.map((x: any, i: number) => (
                    <li key={i} className="text-sm"><strong className="text-foreground">{x.title}</strong>{x.description ? <span className="text-muted-foreground">: {x.description}</span> : null}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="rounded-lg bg-primary/5 border border-primary/30 p-4 space-y-3">
              <p className="text-sm flex items-start gap-2">
                <Lock className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>The full report adds {fullReportAdds(p?.criteria_names)}, with two free re-checks of revised versions within 14 days of it opening.</span>
              </p>
              {paidReturn ? (
                // Just paid for this report: offering to buy it again while the webhook lands invited a second payment.
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  {Date.now() - pollStart <= 120000 && <Loader2 className="w-4 h-4 flex-shrink-0 animate-spin" />}
                  <span>
                    {Date.now() - pollStart > 120000
                      ? <>Your payment went through but the report has not opened. This is on us: email glushkovim@gmail.com with order <code className="text-xs">{new URLSearchParams(window.location.search).get("order") || ""}</code> and we will open it or refund you.</>
                      : "Payment received. The report opens here as soon as the payment clears, usually within a few seconds."}
                  </span>
                </p>
              ) : paidLeft > 0 ? (
                <Button className="min-h-11 h-auto whitespace-normal" disabled={unlockHere.isPending} onClick={() => unlockHere.mutate({ analysisId: id })}>
                  {unlockHere.isPending ? "Unlocking…" : `Unlock with 1 of your ${paidLeft} paid ${paidLeft === 1 ? "report" : "reports"}`}
                </Button>
              ) : (
                <Button className="min-h-11 h-auto whitespace-normal" onClick={() => setBuyOpen(true)}>
                  Unlock the full report, {PRICE_LABELS.ESSAY_SINGLE}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        <PurchaseModal open={buyOpen} onOpenChange={setBuyOpen} sku="ESSAY_SINGLE" analysisId={id} unlocksPreview previewLabel={title} kind={holistic ? "tok" : "essay"} criteria={p?.criteria_names ?? null} />
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto py-10 px-4 space-y-6">
      <SEOHead title="Your IBLens report | IBLens" description="Your saved IBLens report." canonical="/dashboard/analysis" />
      {header}

      <Card>
        <CardHeader>
          <CardTitle style={SERIF} className="text-xl">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {dateLabel(a.createdAt)}
            {r._rubricLabel ? ` · ${r._rubricLabel}` : ""}
          </p>
          <p className="text-xs text-muted-foreground">
            {a.rerunOf
              ? "This is a re-check of a report you bought. Its re-checks belong to that original report."
              : rechecksLeft > 0
                ? `${rechecksLeft} free re-check${rechecksLeft === 1 ? "" : "s"} of a revised version left, within 14 days of this report opening.`
                : windowOpen
                  ? "Both free re-checks for this report have been used."
                  : "The 14 days for re-checks of this report have ended."}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <div style={SERIF} className="text-3xl font-bold">{r.predicted_score}/{r.max_score}</div>
              <p className="text-xs text-muted-foreground">Estimated mark (not an IB mark)</p>
            </div>
            {r.band_range && (
              <div>
                <div style={SERIF} className="text-3xl font-bold">{r.band_range}</div>
                <p className="text-xs text-muted-foreground">{(r.criteria?.length ?? 0) > 1 ? "The range a free preview shows" : "Band"}</p>
              </div>
            )}
          </div>

          <WordCheckNote check={r._wordCheck} />

          {r.overall_comment && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">Overall comment</h2>
              <p className="text-sm leading-relaxed whitespace-pre-line">{r.overall_comment}</p>
            </div>
          )}

          {criteria.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{criteria.length === 1 ? "The mark and its explanation" : "Criteria breakdown"}</h2>
              {criteria.map((c: any, i: number) => (
                <div key={i} className="border-t pt-3">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <p className="text-sm font-semibold">{c.name}</p>
                    <Badge variant="secondary" className="flex-shrink-0">{typeof c.score === "number" ? `${c.score}/${c.max}` : "not marked"}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{c.comment}</p>
                  {criteria.length === 1 && typeof r?.band_position === "string" && r.band_position.trim() && (
                    <p className="text-sm leading-relaxed whitespace-pre-line mt-2"><strong>Why this mark within the band:</strong> {r.band_position}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {Array.isArray(r.risks) && r.risks.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">What is losing marks</h2>
              <ul className="space-y-2">
                {r.risks.map((x: any, i: number) => (
                  <li key={i} className="text-sm">
                    <strong>{typeof x === "string" ? x : x.title}</strong>
                    {typeof x !== "string" && x.description ? <span className="text-muted-foreground">: {x.description}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {Array.isArray(r.leverage_zones) && r.leverage_zones.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">Where marks are recoverable</h2>
              <ul className="space-y-2">
                {r.leverage_zones.map((x: any, i: number) => (
                  <li key={i} className="text-sm">
                    <strong>{typeof x === "string" ? x : x.title}</strong>
                    {typeof x !== "string" && x.description ? <span className="text-muted-foreground">: {x.description}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {Array.isArray(r.next_steps) && r.next_steps.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">What to fix first</h2>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                {r.next_steps.map((s: any, i: number) => (
                  <li key={i}>{typeof s === "string" ? s : `${s.action || ""}${s.why ? `: ${s.why}` : ""}`}</li>
                ))}
              </ol>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
