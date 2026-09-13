import { useState, useMemo, useEffect } from "react";
import { getAnonFingerprint } from "@/lib/fingerprint";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Lock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { PurchaseModal } from "@/components/PurchaseModal";
import { UcasReview } from "@/components/UcasReview";
import { DeviceReportsList, type DeviceReport } from "@/components/DeviceReportsList";
import { usePurchaseTracking } from "@/hooks/usePurchaseTracking";
import {
  UCAS_QUESTIONS,
  UCAS_TOTAL_CHAR_LIMIT,
  UCAS_MIN_CHARS_PER_ANSWER,
} from "@shared/ucas";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

// the device id lives in one place now: lib/fingerprint.ts

const STATUS_STYLE: Record<string, string> = {
  strong: "bg-emerald-100 text-emerald-800",
  adequate: "bg-amber-100 text-amber-800",
  weak: "bg-rose-100 text-rose-800",
};

export default function UcasPersonalStatement() {
  const [course, setCourse] = useState("");
  const [universityType, setUniversityType] = useState<"typical" | "competitive">("typical");
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [result, setResult] = useState<any>(null);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  // A purchase beside a locked preview opens it; from anywhere else it adds a report.
  const [buyFor, setBuyFor] = useState<"preview" | "new">("new");
  const [limitReached, setLimitReached] = useState<string | null>(null);

  const total = answers.q1.length + answers.q2.length + answers.q3.length;
  const remaining = UCAS_TOTAL_CHAR_LIMIT - total;

  // The device id the free review and the purchase are both tied to.
  const [anonFp] = useState(getAnonFingerprint);
  // Every UCAS review bought on this browser, and the one a re-check goes to.
  const ucasReportsQ = trpc.essay.deviceReports.useQuery({ fingerprint: anonFp, kind: "ucas" });
  const ucasReports: DeviceReport[] = (ucasReportsQ.data as any) ?? [];
  const [ucasTargetId, setUcasTargetId] = useState<number | null>(null);
  const ucasTarget = ucasReports.find((r) => r.id === ucasTargetId) ?? ucasReports[0] ?? null;
  const [openingReview, setOpeningReview] = useState<number | null>(null);
  const ucasUtils = trpc.useUtils();

  // Coming back from checkout: the webhook has already unlocked the review.
  const paidReturn = typeof window !== "undefined"
    && new URLSearchParams(window.location.search).get("payment") === "success";
  const paidOpens = typeof window !== "undefined"
    && new URLSearchParams(window.location.search).get("opened") !== "0";
  const [pageOpenedAt] = useState(() => Date.now());
  const purchase = usePurchaseTracking();
  // Polling stops after two minutes; this re-renders once then, so the fallback shows.
  const [, setWaitedOut] = useState(false);
  useEffect(() => {
    if (!paidReturn) return;
    const t = setTimeout(() => setWaitedOut(true), 121_000);
    return () => clearTimeout(t);
  }, [paidReturn]);
  const paidReviewQ = trpc.essay.anonymousReport.useQuery(
    { fingerprint: anonFp, kind: "ucas" },
    // Keep asking until the full review is on the page. Stopping as soon as any result was
    // shown froze the page on the saved preview when the webhook landed a second later.
    {
      enabled: paidReturn && paidOpens && !(result && result.answers),
      refetchInterval: (q: any) => {
        const d = q?.state?.data ?? q;
        return (d as any)?.unlocked || Date.now() - pageOpenedAt > 120_000 ? false : 4000;
      },
    }
  );
  // The free preview survives a reload. It used to vanish, leaving only a buy button.
  const lockedUcasQ = trpc.essay.lockedReport.useQuery({ fingerprint: anonFp, kind: "ucas" }, { enabled: !result });
  useEffect(() => {
    const d: any = lockedUcasQ.data;
    if (!result && d?.exists && !d.unlocked && d.preview) setResult(d.preview);
  }, [lockedUcasQ.data, result]);
  useEffect(() => {
    if (paidReviewQ.data?.unlocked && !(result && result.answers)) {
      setResult(paidReviewQ.data.result);
      setLimitReached(null);
      toast.success("Payment confirmed. Your full review is open below.");
    }
  }, [paidReviewQ.data, result]);

  // Two re-checks of the same statement, included with the purchase.
  const [rechecksLeft, setRechecksLeftState] = useState<number | null>(null);
  const setRechecksLeft = setRechecksLeftState;
  const unlockedQ = trpc.essay.anonymousReport.useQuery({ fingerprint: anonFp, kind: "ucas" }, { enabled: !paidReturn });
  const isUnlocked = unlockedQ.data?.unlocked === true || paidReviewQ.data?.unlocked === true;
  // Show the review that was paid for when the reader comes back. Without this
  // the page said "your full review is unlocked on this device" and then showed
  // an empty form, and the only way to see it again was to spend a re-check.
  useEffect(() => {
    if (unlockedQ.data?.unlocked && !result) setResult((unlockedQ.data as any).result);
  }, [unlockedQ.data, result]);
  const serverRechecks = (unlockedQ.data as any)?.rerunsLeft ?? (paidReviewQ.data as any)?.rerunsLeft ?? null;
  // With several reviews on this browser, the count is the selected review's.
  const effectiveRechecks = ucasReports.length > 1 && ucasTarget ? ucasTarget.rerunsLeft : (rechecksLeft ?? serverRechecks);
  const recheck = trpc.essay.rerunAnonymous.useMutation({
    onSuccess: (d: any) => {
      setResult(d.result);
      setRechecksLeft(d.rerunsLeft);
      ucasReportsQ.refetch();
      toast.success(`Re-check complete. ${d.rerunsLeft} free ${d.rerunsLeft === 1 ? "re-check" : "re-checks"} left for this statement.`);
    },
    onError: (e: any) => toast.error(e.message || "Re-check unavailable"),
  });

  const { isAuthenticated } = useAuth();
  const creditsQ = trpc.dashboard.credits.useQuery(undefined, { enabled: isAuthenticated });
  const hasCredit = (creditsQ.data?.essayCredits ?? 0) > 0;
  // Credits bought without an account live on the device, and this page could not
  // see them: a guest who had paid was told the review costs $9.99.
  const deviceCreditsQ = trpc.essay.deviceCredits.useQuery(
    { fingerprint: anonFp },
    {
      enabled: !isAuthenticated,
      // Back from buying a report for new work: poll until it lands on this browser.
      refetchInterval: (q: any) => {
        const d = q?.state?.data ?? q;
        return paidReturn && !paidOpens && !purchase.paid && Date.now() - pageOpenedAt <= 120_000 ? 4000 : false;
      },
    }
  );
  useEffect(() => {
    if (purchase.paid) deviceCreditsQ.refetch();
  }, [purchase.paid]);
  const deviceCredits = isAuthenticated ? 0 : (deviceCreditsQ.data?.credits ?? 0);
  const canPayHere = hasCredit || deviceCredits > 0;
  // Whether this device's free UCAS preview has been used, asked of the server. A saved
  // review used to count as the preview, so buying a review first hid the free one.
  const ucasFreeQ = trpc.essay.canAnalyzeAnonymous.useQuery({ clientFingerprint: anonFp, kind: "ucas" });
  const previewUsed = ucasFreeQ.data ? ucasFreeQ.data.canAnalyze === false : (lockedUcasQ.data as any)?.exists === true;
  const onFullReview = (d: any) => {
    setResult(d.result);
    setLimitReached(null);
    unlockedQ.refetch();
    lockedUcasQ.refetch();
    ucasFreeQ.refetch();
    // Credits are an account query: asked for by a guest, the refused request sent them
    // to the sign-in page a few seconds after their review appeared.
    if (isAuthenticated) creditsQ.refetch();
    deviceCreditsQ.refetch();
    toast.success("Your full review is open below.");
  };
  const unlockWithAccount = trpc.essay.unlockAnalysis.useMutation({ onSuccess: onFullReview, onError: (e: any) => toast.error(e.message || "Unlock failed") });
  const unlockWithDevice = trpc.essay.unlockPreviewWithDeviceCredit.useMutation({ onSuccess: onFullReview, onError: (e: any) => toast.error(e.message || "Unlock failed") });
  const openFullReview = () => {
    if (isAuthenticated && hasCredit) { unlockWithAccount.mutate({ fingerprint: anonFp, kind: "ucas" }); return; }
    if (!isAuthenticated && deviceCredits > 0) { unlockWithDevice.mutate({ fingerprint: anonFp, kind: "ucas" }); return; }
    setBuyFor("preview");
    setPurchaseOpen(true);
  };

  const review = trpc.essay.analyzeUcasAnonymous.useMutation({
    // A paid review opens with its own two re-checks: refresh everything that decides
    // the next button, or it kept offering another paid review.
    onSuccess: (data: any) => {
      setResult(data.result);
      setRechecksLeft(null);
      unlockedQ.refetch();
      if (isAuthenticated) creditsQ.refetch();
      deviceCreditsQ.refetch();
      lockedUcasQ.refetch();
      ucasReportsQ.refetch();
      ucasFreeQ.refetch();
    },
    onError: (err: any) => {
      const msg = err?.message || "Review failed";
      // By the refusal itself, not its wording, which changes.
      if (err?.data?.code === "FORBIDDEN") { setLimitReached(msg); ucasFreeQ.refetch(); }
      else toast.error(msg);
    },
  });

  // A free review is one per device, so submitting a draft UCAS would reject outright is the
  // easiest way to waste it. Block it and say exactly what is wrong.
  const blockers = useMemo(() => {
    const out: string[] = [];
    if (course.trim().length < 2) out.push("Tell us which course you are applying for.");
    UCAS_QUESTIONS.forEach((q, i) => {
      const len = (answers as any)[q.id].length;
      if (len === 0) out.push(`Question ${i + 1} is empty.`);
      else if (len < UCAS_MIN_CHARS_PER_ANSWER)
        out.push(`Question ${i + 1} is ${len} characters; UCAS requires at least ${UCAS_MIN_CHARS_PER_ANSWER}.`);
    });
    if (total > UCAS_TOTAL_CHAR_LIMIT)
      out.push(`Your answers are ${(total - UCAS_TOTAL_CHAR_LIMIT).toLocaleString("en-GB")} characters over the ${UCAS_TOTAL_CHAR_LIMIT.toLocaleString("en-GB")} limit.`);
    return out;
  }, [course, answers, total]);

  const canSubmit = blockers.length === 0 && !review.isPending;

  return (
    <div className="container max-w-3xl mx-auto py-10 px-4 space-y-6">
      <SEOHead
        title="UCAS Personal Statement Checker: Three-Question Format for 2027 Entry | IBLens"
        description="Check your UCAS personal statement against the format used from 2026 entry: three questions, 4,000 characters, 350 minimum per answer. Evidence-based feedback on each answer from an admissions-tutor perspective. Free preview, no account."
        canonical="/ucas-personal-statement"
      />

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">For 2027 entry, and 2028 deferred entry</p>
        <h1 style={SERIF} className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          UCAS Personal Statement Checker
        </h1>
        <p className="text-muted-foreground">
          From 2026 entry the personal statement is three separate questions sharing one 4,000-character
          budget, with a 350-character minimum per answer. Paste your draft answers and get a read on
          each one: what a tutor would credit, what they would look for and not find, and what to fix
          first. No score, UCAS publishes no mark scheme, and inventing one would not help you.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground leading-relaxed">
        <strong className="text-foreground">Before you paste anything.</strong> UCAS is explicit that
        submitting text generated by an AI tool as your own can be treated as cheating, and submitted
        statements are checked for similarity against previously submitted work. This tool gives you
        feedback on your own writing and deliberately never hands you sentences to copy. We do not
        publish your statement, do not train models on it, and do not feed it to any similarity
        database. IBLens never saves the answers you paste: they pass through our relay server to
        Anthropic, which reviews them and deletes them within 30 days unless flagged under its usage
        policy or required by law. The review itself is saved and can quote short passages, as the{" "}
        <Link href="/privacy" className="underline">Privacy Policy</Link> sets out. Do not post your statement anywhere public either: that is what puts it into
        similarity checks. <Link href="/resources/academic-integrity" className="underline">How to use AI feedback safely</Link>
      </div>

      <DeviceReportsList
        reports={ucasReports}
        showSingle={unlockedQ.data?.unlocked !== true}
        selectedId={ucasTarget?.id ?? null}
        opening={openingReview}
        onOpen={async (r) => {
          setOpeningReview(r.latestId);
          try {
            const d: any = await ucasUtils.essay.deviceReport.fetch({ fingerprint: anonFp, id: r.latestId });
            if (d?.found) { setResult(d.result); setUcasTargetId(r.id); }
          } finally {
            setOpeningReview(null);
          }
        }}
        onRecheck={(r) => {
          setUcasTargetId(r.id);
          document.getElementById("q1")?.scrollIntoView({ behavior: "smooth", block: "center" });
        }}
      />

      <Card>
        <CardContent className="pt-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="course">Course you are applying for</Label>
              <Input
                id="course"
                maxLength={120}
                placeholder="e.g. Economics, Medicine, History"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Where you are applying</Label>
              <Select value={universityType} onValueChange={(v) => setUniversityType(v as any)}>
                <SelectTrigger className="w-full data-[size=default]:h-auto min-h-9 py-1.5 whitespace-normal text-left *:data-[slot=select-value]:line-clamp-2"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="typical">A typical applicant pool</SelectItem>
                  <SelectItem value="competitive">Highly competitive (Oxbridge, Medicine, LSE…)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {UCAS_QUESTIONS.map((q, i) => {
            const val = (answers as any)[q.id] as string;
            const short = val.length > 0 && val.length < UCAS_MIN_CHARS_PER_ANSWER;
            return (
              <div key={q.id} className="space-y-2">
                <Label htmlFor={q.id}>
                  Question {i + 1}: {q.question}
                </Label>
                <p className="text-xs text-muted-foreground">{q.looksFor}</p>
                <Textarea
                  id={q.id}
                  rows={6}
                  className="field-sizing-fixed resize-y"
                  placeholder="Paste your answer…"
                  value={val}
                  onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                />
                <p className={`text-xs ${short ? "text-rose-600" : "text-muted-foreground"}`}>
                  {val.length} characters
                  {short && ` · UCAS requires at least ${UCAS_MIN_CHARS_PER_ANSWER}`}
                </p>
              </div>
            );
          })}

          <div className={`text-sm rounded-lg p-3 ${remaining < 0 ? "bg-rose-50 text-rose-800" : "bg-muted/50"}`}>
            <strong>{total.toLocaleString("en-GB")}</strong> of {UCAS_TOTAL_CHAR_LIMIT.toLocaleString("en-GB")} characters used
            {remaining >= 0 ? ` · ${remaining.toLocaleString("en-GB")} left` : ` · ${Math.abs(remaining).toLocaleString("en-GB")} over the limit`}
          </div>

          {paidReturn && paidOpens && !isUnlocked && (
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
              {Date.now() - pageOpenedAt > 120_000
                ? "Your payment went through but the review has not opened yet. Reload the page, and if it still has not opened, email glushkovim@gmail.com with your order number and we will open it or refund you."
                : "Payment received. Opening your full review, this takes a few seconds. If it has not opened within two minutes, email glushkovim@gmail.com with your order number and we will open it or refund you."}
            </div>
          )}

          {paidReturn && !paidOpens && !isAuthenticated && (
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
              {purchase.paid && deviceCredits > 0
                ? `Payment confirmed. This browser has ${deviceCredits} paid ${deviceCredits === 1 ? "report" : "reports"}: paste your answers and choose the button marked "uses 1 paid report".`
                : Date.now() - pageOpenedAt > 120_000
                  ? "Your payment went through but the report has not arrived on this browser. Email glushkovim@gmail.com with your order number and we will add it or refund you."
                  : "Payment received. Adding your report to this browser, this takes a few seconds."}
            </div>
          )}

          {!isUnlocked && !canPayHere && !result && (
            <p className="text-xs text-muted-foreground">
              Your first review is a free preview: the verdict, the character checks and your weakest answer reviewed in full.
              One per device or account, separate from the essay preview. The full review of all three answers is $9.99.
            </p>
          )}

          {limitReached && (
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-3">
              <p className="text-sm"><strong className="text-foreground">{limitReached}</strong></p>
              <p className="text-xs text-muted-foreground">
                A full review covers all three answers, the issues across the statement as a whole and a
                ranked revision list, plus two free re-checks of this statement within 14 days.
              </p>
              <Button size="sm" onClick={() => { setBuyFor("new"); setPurchaseOpen(true); }}>Buy a full review, $9.99</Button>
            </div>
          )}

          {blockers.length > 0 && (total > 0 || course.length > 0) && (
            <ul className="text-xs text-amber-700 space-y-1">
              {blockers.map((b, i) => (
                <li key={i} className="flex gap-2"><AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />{b}</li>
              ))}
            </ul>
          )}

          {isUnlocked && (
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm mb-3">
              {effectiveRechecks === null || effectiveRechecks > 0 ? (
                <><strong>Your full review is unlocked on this device.</strong> Revise the answers above and re-check them.
                Two re-checks are included for 14 days and cost nothing.</>
              ) : (
                <><strong>Your full review is open on this device.</strong> Both re-checks for it have been used, or its 14 days have ended.</>
              )}
            </div>
          )}

          {(() => {
            // One decision for the main button: a re-check of the review that was bought,
            // then the free preview while it is unused, then a paid report, then buying.
            // The free preview used to disappear as soon as anything had been bought.
            const busy = review.isPending || recheck.isPending;
            const canRecheck = isUnlocked && (effectiveRechecks === null || effectiveRechecks > 0);
            const mode: "recheck" | "free" | "paid" | "buy" = canRecheck ? "recheck" : !previewUsed ? "free" : canPayHere ? "paid" : "buy";
            const run = (m: "free" | "paid") => review.mutate({
              course: course.trim(), universityType,
              q1: answers.q1, q2: answers.q2, q3: answers.q3,
              clientFingerprint: anonFp,
              // A credit is spent only by a button that says so.
              spendCredit: m === "paid" && hasCredit,
              spendDeviceCredit: m === "paid" && !hasCredit && deviceCredits > 0,
            });
            const onMain = () => {
              if (mode === "recheck") {
                recheck.mutate({ fingerprint: anonFp, answers, course: course.trim(), ...(ucasTarget ? { recordId: ucasTarget.latestId } : {}) });
                return;
              }
              if (mode === "buy") {
                setBuyFor("new");
                setPurchaseOpen(true);
                return;
              }
              run(mode);
            };
            const mainLabel = mode === "recheck"
              ? `Re-check my statement (free${effectiveRechecks !== null ? `, ${effectiveRechecks} left` : ""})`
              : mode === "free"
                ? (isUnlocked ? "Review a new statement: free preview" : "Review my statement, free")
                : mode === "paid"
                  ? (isUnlocked ? "Review a new statement (uses 1 paid report)" : "Review my statement in full (uses 1 paid report)")
                  : (isUnlocked ? "Buy a review of a new statement, $9.99" : "Buy a full review, $9.99");
            return (
              <>
                <Button size="lg" className="w-full min-h-11 h-auto whitespace-normal" disabled={blockers.length > 0 || busy} onClick={onMain}>
                  {busy ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Reading your statement…</> : mainLabel}
                </Button>
                {mode === "buy" && (
                  <p className="text-xs text-muted-foreground">The answers are not kept through checkout: after paying, paste them again and choose the button marked "uses 1 paid report".</p>
                )}
                {mode === "recheck" && !previewUsed && (
                  <Button variant="outline" className="w-full min-h-11 h-auto whitespace-normal" disabled={blockers.length > 0 || busy} onClick={() => run("free")}>
                    Review a different statement: free preview
                  </Button>
                )}
                {(mode === "recheck" || mode === "free") && canPayHere && (
                  <Button variant="outline" className="w-full min-h-11 h-auto whitespace-normal" disabled={blockers.length > 0 || busy} onClick={() => run("paid")}>
                    {mode === "recheck" ? "Review a different statement instead (uses 1 paid report)" : "Review it in full instead (uses 1 paid report)"}
                  </Button>
                )}
              </>
            );
          })()}
        </CardContent>
      </Card>

      {result && (
        <UcasReview
          result={result}
          course={course}
          isUnlocked={isUnlocked}
          onBuy={paidReturn && paidOpens && !isUnlocked ? undefined : openFullReview}
          buyLabel={canPayHere ? "Open the full review (uses 1 paid report)" : undefined}
          buyPending={unlockWithAccount.isPending || unlockWithDevice.isPending}
        />
      )}
      <PurchaseModal
        open={purchaseOpen}
        onOpenChange={setPurchaseOpen}
        sku="ESSAY_SINGLE"
        unlocksPreview={buyFor === "preview"}
        previewLabel={buyFor === "preview" ? "your UCAS statement" : null}
        kind="ucas"
      />
    </div>
  );
}
