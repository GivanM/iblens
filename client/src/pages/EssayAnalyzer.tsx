import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { SEOHead } from "@/components/SEOHead";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  FileText, Loader2, AlertTriangle, TrendingUp, ArrowRight,
  CheckCircle2, XCircle, Lock, Share2, Twitter, Copy, BookmarkPlus, CreditCard
} from "lucide-react";
import { PurchaseModal } from "@/components/PurchaseModal";
import { PRICE_LABELS, type ProductKey } from "@shared/pricing";
import { WordCheckNote } from "@/components/WordCheckNote";
import type { WordCheck } from "@shared/wordcount";
import { IA_RUBRIC_SUBJECTS, unmarkableReason } from "@shared/rubrics";
import { analytics } from "@/lib/analytics";
import { getAnonFingerprint } from "@/lib/fingerprint";
import { trackEssaySubmitted, trackEssayUploadStarted } from "@/lib/analytics/track";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

const IB_SUBJECTS: string[] = [...IA_RUBRIC_SUBJECTS];

const ESSAY_TYPES = [
  { value: "IA", label: "Internal Assessment (IA)" },
  { value: "EE", label: "Extended Essay (EE)" },
  { value: "TOK", label: "TOK Essay" },
  { value: "TOK Exhibition", label: "TOK Exhibition" },
];

function getApiEssayParams(essayType: string, subject: string) {
  if (essayType === "TOK Exhibition") {
    return { essayType: "TOK" as const, subject: "Exhibition" };
  }
  // The subject dropdown is hidden for the TOK essay, but its state keeps whatever
  // was last chosen (Business Management by default), which then went into the
  // prompt and onto the saved report as the essay's subject.
  if (essayType === "TOK") {
    return { essayType: "TOK" as const, subject: "Essay" };
  }
  return { essayType: essayType as "IA" | "EE" | "TOK", subject };
}

/**
 * Decode HTML entities that the AI may accidentally produce (e.g. &amp; → &).
 * Then sanitize the result so it's safe to render as text.
 */
function decodeAndSanitize(text: string): string {
  if (!text) return "";
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;          // decode entities
  return textarea.value;              // plain text, safe for textContent rendering
}

type EssayResult = {
  band_range: string;
  predicted_score: number;
  max_score: number;
  overall_comment: string;
  criteria: Array<{ name: string; score: number; max: number; comment: string }>;
  risks: Array<{ title: string; description: string }>;
  leverage_zones: Array<{ title: string; description: string }>;
  next_steps: string[];
  _rubricAvailable?: boolean;
  _rubricLabel?: string;
  _rubricTotalMarks?: number;
  _wordCheck?: WordCheck | null;
};


function LockedTeaser({ result, isAuthenticated, hasPaidCredit, fingerprint, analysisId, onUnlocked, onBuy, essayText }: any) {
  const unlock = trpc.essay.unlockAnalysis.useMutation({
    onSuccess: (d: any) => onUnlocked(d.result),
    onError: (e: any) => toast.error(e.message || "Unlock failed"),
  });
  const weakest = result.weakest_criterion;
  const others = (result.criteria_names || []).filter((c: any) => c?.name !== weakest?.name);
  const doUnlock = () => unlock.mutate(analysisId ? { analysisId } : { fingerprint });
  return (
    <Card className="border-primary/40">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Free preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-baseline gap-3">
          <span style={SERIF} className="text-4xl font-bold">Band {result.band_range}</span>
          <span className="text-sm text-muted-foreground">out of {result.max_score}</span>
        </div>
        <WordCheckNote check={result._wordCheck} text={essayText} />
        {weakest && (
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1.5">Your weakest criterion, full feedback</p>
            <div className="flex justify-between text-sm font-semibold mb-1 text-foreground"><span>{weakest.name}</span><span>{weakest.score}/{weakest.max}</span></div>
            <p className="text-sm text-muted-foreground leading-relaxed">{weakest.comment}</p>
          </div>
        )}
        {(result.risks || []).length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Top risks in this draft</p>
            <ul className="space-y-2">
              {result.risks.map((r: any, i: number) => (
                <li key={i} className="text-sm"><strong className="text-foreground">{r.title}</strong>{r.description ? <span className="text-muted-foreground">: {r.description}</span> : null}</li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Locked in the full report</p>
          <ul className="space-y-2">
            {others.map((c: any) => (
              <li key={c.name} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{c.name}</span>
                <span className="ml-auto inline-block h-2 w-20 rounded bg-muted-foreground/20 blur-[2px]" />
                <span className="text-xs whitespace-nowrap">?/{c.max}</span>
              </li>
            ))}
            <li className="flex items-center gap-2 text-sm text-muted-foreground"><Lock className="w-3.5 h-3.5 shrink-0" /> Exact predicted score</li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground"><Lock className="w-3.5 h-3.5 shrink-0" /> Examiner-style overall comment</li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground"><Lock className="w-3.5 h-3.5 shrink-0" /> Step-by-step fixes, ranked by marks gained</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3">
            The criterion shown above in full is the one where this draft loses the largest share of its available marks. The others are scored in the full report.
          </p>
        </div>
        <div className="rounded-lg bg-primary/5 border border-primary/30 p-4">
          {!isAuthenticated ? (
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <p className="text-sm flex-1"><strong className="text-foreground">Unlock the full report, $9.99.</strong> No account needed: pay with your email and it opens straight away, with two free re-checks of this draft over the next 14 days.</p>
                <Button onClick={onBuy}>Buy &amp; unlock, $9.99</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Prefer to keep everything in one place? <a href={getLoginUrl()} className="underline">Sign in first</a> and the report is saved to your account.
              </p>
            </div>
          ) : hasPaidCredit ? (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <p className="text-sm flex-1"><strong className="text-foreground">You have a credit.</strong> Open the full report now.</p>
              <Button disabled={unlock.isPending} onClick={doUnlock}>{unlock.isPending ? "Unlocking…" : "Unlock full report (1 credit)"}</Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <p className="text-sm flex-1"><strong className="text-foreground">Unlock the full report, $9.99.</strong> The exact mark, comments on every criterion, your ranked fix list, and two free re-checks of this draft over the next 14 days, so you can see whether your edits landed.</p>
              <Button onClick={onBuy}>Buy &amp; unlock, $9.99</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const ANALYZING_STEPS = [
  "Reading your essay\u2026",
  "Checking it against the published criteria\u2026",
  "Scoring each criterion like a strict examiner\u2026",
  "Finding the exact marks you\u2019re losing\u2026",
  "Writing your improvement plan\u2026",
  "Formatting your report, almost there\u2026",
];

export default function EssayAnalyzer() {
  const { isAuthenticated } = useAuth();
  // The homepage submission slip hands over the task and session it was filled
  // in with, so the same choice is not asked for twice.
  const handoff = (() => {
    if (typeof window === "undefined") return {};
    const q = new URLSearchParams(window.location.search);
    const type = q.get("type");
    const session = q.get("session");
    const subject = q.get("subject");
    return {
      type: ESSAY_TYPES.some((t) => t.value === type) ? (type as string) : undefined,
      session: session === "nov2026" || session === "may2027" ? (session as "nov2026" | "may2027") : undefined,
      subject: subject && IB_SUBJECTS.includes(subject) ? subject : undefined,
    };
  })();
  const [essayType, setEssayType] = useState(handoff.type ?? "IA");
  const [subject, setSubject] = useState(handoff.subject ?? "Business Management");
  const [researchQuestion, setResearchQuestion] = useState("");
  const [reflections, setReflections] = useState("");
  const [examSession, setExamSession] = useState<"nov2026" | "may2027">(handoff.session ?? "may2027");
  // ?rerun=<analysisId>, a paid report includes two free re-checks of the same draft.
  const rerunId = (() => {
    if (typeof window === "undefined") return null;
    const v = new URLSearchParams(window.location.search).get("rerun");
    return v && /^\d+$/.test(v) ? Number(v) : null;
  })();
  const [essayText, setEssayText] = useState("");
  const [result, setResult] = useState<EssayResult | null>(null);
  const [essayPurchaseOpen, setEssayPurchaseOpen] = useState(false);

  const creditsQuery = trpc.dashboard.credits.useQuery(undefined, { enabled: isAuthenticated });
  const credits = creditsQuery.data;

  const [anonFp] = useState(getAnonFingerprint);

  const anonCheckQuery = trpc.essay.canAnalyzeAnonymous.useQuery(
    { clientFingerprint: anonFp },
    { enabled: !isAuthenticated }
  );
  const canAnonAnalyze = !isAuthenticated ? (anonCheckQuery.data?.canAnalyze ?? !localStorage.getItem('iblens_anon_used')) : false;

  const rerunMutation = trpc.essay.rerunAnalysis.useMutation({
    onSuccess: (data: any) => {
      setResult(data.result as EssayResult);
      setLastAnalysisId(data.id);
      toast.success(`Re-check complete. ${data.rerunsLeft} free re-check(s) left for this draft.`);
    },
    onError: (err: any) => {
      toast.error(err.message || "Re-check unavailable");
    },
  });

  const analyzeMutation = trpc.essay.analyze.useMutation({
    onSuccess: (data) => {
      setResult(data.result as EssayResult);
      setLastAnalysisId((data as any).id ?? null);
      creditsQuery.refetch();
      const r = data.result as EssayResult;
      analytics.completeEssayAnalysis(subject, `${r.predicted_score}/${r.max_score}`);
      const wordCount = essayText.split(/\s+/).filter(Boolean).length;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'essay_submit', essay_type: essayType, subject, word_count: wordCount });
      window.dataLayer.push({ event: 'sign_up', method: 'free_essay_analysis' });
      if (data.wasFree) {
        toast.success(`Free preview ready. The full report unlocks for ${PRICE_LABELS.ESSAY_SINGLE}.`);
      } else {
        toast.success("Analysis complete!");
      }
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  const anonAnalyzeMutation = trpc.essay.analyzeAnonymous.useMutation({
    onSuccess: (data: any) => {
      setResult(data.result as EssayResult);
      setLastAnalysisId(null);
      // A run paid for with a device credit comes back open. Without this the
      // page kept treating it as the locked preview and blurred the fix list
      // the buyer had just paid for.
      if (data.unlocked === true) {
        setPaidRunUnlocked(true);
        deviceCreditsQ.refetch();
      }
      localStorage.setItem('iblens_anon_used', 'true');
      anonCheckQuery.refetch();
      anonReportQ.refetch();
      const r = data.result as EssayResult;
      analytics.completeEssayAnalysis(subject, `${r.predicted_score}/${r.max_score}`);
      const wordCount = essayText.split(/\s+/).filter(Boolean).length;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'essay_submit', essay_type: essayType, subject, word_count: wordCount });
      window.dataLayer.push({ event: 'sign_up', method: 'free_essay_analysis' });
      toast.success(data.unlocked ? "Your paid report is open below." : `Free preview ready. The full report unlocks for ${PRICE_LABELS.ESSAY_SINGLE}.`);
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  const isAnalyzing = analyzeMutation.isPending || anonAnalyzeMutation.isPending || rerunMutation.isPending;


  const [lastAnalysisId, setLastAnalysisId] = useState<number | null>(null);
  const lockedQ = trpc.essay.lockedReport.useQuery(
    { fingerprint: anonFp },
    { enabled: isAuthenticated && !result }
  );
  // Coming back from a guest checkout. The webhook has already unlocked the report,
  // so there is nothing to click: read it and show it.
  const paidReturn = typeof window !== "undefined"
    && new URLSearchParams(window.location.search).get("payment") === "success";
  const [waitedFor, setWaitedFor] = useState(0);
  const paidReportQ = trpc.essay.anonymousReport.useQuery(
    { fingerprint: anonFp },
    {
      enabled: paidReturn && !isAuthenticated && !result,
      // Stop after two minutes rather than spinning for ever: if the payment has
      // not arrived by then, something is wrong and the reader needs to be told.
      refetchInterval: (d: any) => (d?.unlocked || waitedFor > 120000 ? false : 4000),
    }
  );
  useEffect(() => {
    if (!paidReturn || result) return;
    const t = setInterval(() => setWaitedFor((w) => w + 4000), 4000);
    return () => clearInterval(t);
  }, [paidReturn, result]);
  useEffect(() => {
    if (paidReportQ.data?.unlocked && !result) {
      setResult(paidReportQ.data.result as EssayResult);
      toast.success("Payment confirmed. Your full report is open below.");
    }
  }, [paidReportQ.data, result]);

  // Someone who bought without an account still gets their two re-checks. The
  // authenticated re-run path cannot see their report, so it has its own.
  const [anonRerunsLeft, setAnonRerunsLeft] = useState<number | null>(null);
  const anonReportQ = trpc.essay.anonymousReport.useQuery(
    { fingerprint: anonFp },
    { enabled: !isAuthenticated }
  );
  const [paidRunUnlocked, setPaidRunUnlocked] = useState(false);
  const anonUnlocked = !isAuthenticated && (anonReportQ.data?.unlocked === true || paidRunUnlocked);
  const deviceCreditsQ = trpc.essay.deviceCredits.useQuery(
    { fingerprint: anonFp },
    { enabled: true }
  );
  // Signing in must not strand what was bought before signing in.
  const claimCredits = trpc.essay.claimDeviceCredits.useMutation({
    onSuccess: (d: any) => {
      if (d.moved > 0) {
        toast.success(`${d.moved} report${d.moved === 1 ? "" : "s"} you bought on this device moved to your account.`);
        creditsQuery.refetch();
        deviceCreditsQ.refetch();
      }
    },
  });
  useEffect(() => {
    if (isAuthenticated && (deviceCreditsQ.data?.credits ?? 0) > 0 && !claimCredits.isPending && !claimCredits.isSuccess) {
      claimCredits.mutate({ fingerprint: anonFp });
    }
  }, [isAuthenticated, deviceCreditsQ.data]);
  const deviceCredits = isAuthenticated ? 0 : (deviceCreditsQ.data?.credits ?? 0);
  // Coming back later, on the same device: the report is bought and paid for, so
  // show it. Before this, a guest who closed the tab could never reach it again.
  useEffect(() => {
    if (anonReportQ.data?.unlocked && !result) {
      setResult(anonReportQ.data.result as EssayResult);
    }
  }, [anonReportQ.data, result]);
  const [rerunDelta, setRerunDelta] = useState<string | null>(null);
  const rerunAnonMutation = trpc.essay.rerunAnonymous.useMutation({
    onSuccess: (d: any) => {
      setResult(d.result as EssayResult);
      setAnonRerunsLeft(d.rerunsLeft);
      const before = d.previous?.predicted_score;
      const after = d.result?.predicted_score;
      if (before != null && after != null) {
        const max = d.result?.max_score ?? d.previous?.max_score;
        const move = after - before;
        setRerunDelta(
          `Before: ${before}${max ? `/${max}` : ""}. Now: ${after}${max ? `/${max}` : ""}. ` +
          (move > 0 ? `Up ${move} mark${move === 1 ? "" : "s"}.` : move < 0 ? `Down ${Math.abs(move)}.` : "No change.")
        );
      }
      toast.success(`Re-check complete. ${d.rerunsLeft} free re-check(s) left for this draft.`);
    },
    onError: (e: any) => toast.error(e.message || "Re-check unavailable"),
  });

  const pageUnlock = trpc.essay.unlockAnalysis.useMutation({
    onSuccess: (d: any) => { setResult(d.result as EssayResult); lockedQ.refetch(); },
    onError: (e: any) => toast.error(e.message || "Unlock failed"),
  });

  const [analyzingStep, setAnalyzingStep] = useState(0);
  useEffect(() => {
    if (!isAnalyzing) { setAnalyzingStep(0); return; }
    const id = setInterval(() => setAnalyzingStep((s) => s + 1), 6000);
    return () => clearInterval(id);
  }, [isAnalyzing]);
  const analyzingLabel = ANALYZING_STEPS[Math.min(analyzingStep, ANALYZING_STEPS.length - 1)];

  type RunMode = "free" | "paid" | "recheck";
  const handleAnalyze = (mode: RunMode = "free") => {
    const unmarkable = unmarkableReason(essayType, subject, examSession);
    if (unmarkable) {
      toast.error(unmarkable);
      return;
    }
    if (essayText.length < 300) {
      toast.error("Paste at least 300 characters, roughly 50 words, or there is nothing to mark.");
      return;
    }

    const wordCount = essayText.split(/\s+/).filter(Boolean).length;
    const isFreeFirst = !isAuthenticated ? canAnonAnalyze : (credits?.freeEssayAvailable === true);
    trackEssayUploadStarted(subject, essayType);
    trackEssaySubmitted(subject, essayType, wordCount, !!isFreeFirst);
    analytics.startEssayAnalysis(subject);

    if (isAuthenticated) {
      // A re-check is part of a report already paid for, so it is checked before
      // the credit gate. Spending the credit on the unlock used to leave the
      // buyer with no credits and therefore no way to use their two re-checks.
      if (rerunId) {
        rerunMutation.mutate({ analysisId: rerunId, essayText, examSession, reflections: reflections || undefined });
        return;
      }
      if (!credits?.canAnalyzeEssay) {
        setEssayPurchaseOpen(true);
        return;
      }
      const authParams = getApiEssayParams(essayType, subject);
      analyzeMutation.mutate({
        essayType: authParams.essayType,
        subject: authParams.subject,
        researchQuestion: researchQuestion || undefined,
        essayText,
        reflections: reflections || undefined,
        examSession,
      });
    } else {
      // Which button was pressed decides this. Reading it from state gave the
      // handler the value from the previous render, so the re-check button spent
      // a credit on its first click.
      if (anonUnlocked && (deviceCredits === 0 || mode === "recheck")) {
        rerunAnonMutation.mutate({
          fingerprint: anonFp,
          essayText,
          reflections: reflections || undefined,
          examSession,
        });
        return;
      }
      if (!canAnonAnalyze && deviceCredits === 0) {
        setEssayPurchaseOpen(true);
        return;
      }
      const anonParams = getApiEssayParams(essayType, subject);
      anonAnalyzeMutation.mutate({
        // Only the button that says it costs a credit spends one. The free button
        // sitting next to it must never charge.
        spendDeviceCredit: mode === "paid" && deviceCredits > 0,
        essayType: anonParams.essayType,
        subject: anonParams.subject,
        researchQuestion: researchQuestion || undefined,
        essayText,
        reflections: reflections || undefined,
        clientFingerprint: anonFp,
        examSession,
      });
    }
  };

  const getScoreColor = (score: number, max: number) => {
    const pct = score / max;
    if (pct >= 0.75) return "text-emerald-600";
    if (pct >= 0.5) return "text-amber-600";
    return "text-red-600";
  };

  const getBarColor = (score: number, max: number) => {
    const pct = score / max;
    if (pct >= 0.75) return "bg-emerald-500";
    if (pct >= 0.5) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <SEOHead
        title="IB Essay Grader: AI Feedback on IA, Extended Essay and TOK | IBLens"
        description="AI feedback on your IB Internal Assessment, Extended Essay or TOK work in 14 subjects: a free preview with your band range and weakest criterion, then a full criterion-by-criterion report."
        canonical="/essay"
      />
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Essay Analyzer</p>
        <h1 style={SERIF} className="text-4xl font-bold mb-3">IB Essay Analyzer</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          AI feedback on your Extended Essay, IA or TOK work in about a minute, criterion by criterion, with a predicted score.
        </p>
      </div>

      {/* ── Sample Report Preview ─────────────────────────────────── */}
      <div className="mb-10 rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-0.5">Sample Report</p>
            <h2 style={SERIF} className="text-lg font-bold">This is what you'll get for your essay</h2>
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full border">
            Example · Business Management IA
          </span>
        </div>

        <div className="p-6 space-y-5">
          {/* Score summary */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Predicted Score", value: "16/25", color: "text-amber-600" },
              { label: "Weakest criterion", value: "D: Analysis", color: "text-foreground" },
              { label: "Criteria Total", value: "64%", color: "text-foreground" },
            ].map((s) => (
              <div key={s.label} className="text-center p-4 bg-muted/50 rounded-lg border border-border">
                <div style={SERIF} className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Your IA demonstrates solid understanding of business concepts and makes good use of the supporting documents.
            The main areas for improvement are the depth of analysis in Criterion D and the connection
            between your research question and conclusions.
          </p>

          {/* Criteria bars */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Criteria Breakdown</p>
            {[
              { name: "Criterion A: Integration of a key concept", score: 3, max: 5, color: "bg-amber-500" },
              { name: "Criterion B: Supporting documents", score: 3, max: 4, color: "bg-emerald-500" },
              { name: "Criterion C: Tools and theories", score: 3, max: 4, color: "bg-amber-500" },
              { name: "Criterion D: Analysis and evaluation", score: 2, max: 5, color: "bg-red-500" },
              { name: "Criterion E: Conclusions", score: 2, max: 3, color: "bg-emerald-500" },
              { name: "Criterion F: Structure", score: 2, max: 2, color: "bg-emerald-500" },
              { name: "Criterion G: Presentation", score: 1, max: 2, color: "bg-amber-500" },
            ].map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{c.name}</span>
                  <span className="font-semibold">{c.score}/{c.max}</span>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div className={`h-full rounded-full ${c.color}`} style={{ width: `${(c.score / c.max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Risks & wins */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-red-600 mb-2">Losing Marks</p>
              <div className="space-y-2">
                <div className="p-3 bg-red-50 border-l-2 border-red-400 rounded-r text-sm">
                  <strong>Weak analysis depth:</strong> Criterion D needs the business tools applied to the evidence in your supporting documents.
                </div>
                <div className="p-3 bg-red-50 border-l-2 border-red-400 rounded-r text-sm">
                  <strong>Conclusion gap:</strong> your conclusions don't fully answer the research question.
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">Quick Wins</p>
              <div className="space-y-2">
                <div className="p-3 bg-emerald-50 border-l-2 border-emerald-400 rounded-r text-sm">
                  <strong>+2 marks possible:</strong> weigh the options with one more business tool, applied to your documents.
                </div>
                <div className="p-3 bg-emerald-50 border-l-2 border-emerald-400 rounded-r text-sm">
                  <strong>Easy fix:</strong> answer your research question explicitly in the conclusion.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t text-center">
            <p className="text-sm font-medium mb-1">↑ This is what a full report looks like, unlocked for $9.99. Your free preview shows the band range, your weakest criterion in full, and the top risks.</p>
            <p className="text-xs text-muted-foreground">Paste your essay below → <strong>the first preview is free</strong>, then $9.99 per essay, two re-checks included</p>
          </div>
        </div>
      </div>
      {/* ────────────────────────────────────────────────────────────── */}

      <Card className="mb-8">
        <CardContent className="p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type of work</Label>
              <Select value={essayType} onValueChange={setEssayType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ESSAY_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {essayType !== "TOK Exhibition" && essayType !== "TOK" && (
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {IB_SUBJECTS.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {(essayType === "EE" || (essayType === "IA" && (subject === "Psychology" || subject === "Computer Science" || subject === "Visual Arts"))) && (
              <div className="space-y-2">
                <Label>Exam session</Label>
                <Select value={examSession} onValueChange={(v) => setExamSession(v as "nov2026" | "may2027")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nov2026">May / Nov 2026, current syllabus</SelectItem>
                    <SelectItem value="may2027">May 2027, new syllabus</SelectItem>
                  </SelectContent>
                </Select>
                {essayType === "EE" && examSession === "may2027" && (
                  <p className="text-xs text-muted-foreground">Sitting your exams in November 2026 or earlier? Switch to the current 34-mark criteria.</p>
                )}
                {unmarkableReason(essayType, subject, examSession) && (
                  <p className="text-xs rounded-md border border-amber-300 bg-amber-50 text-amber-900 px-2.5 py-2">{unmarkableReason(essayType, subject, examSession)}</p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>{essayType === "TOK Exhibition" ? "Your IA prompt (the one all three objects respond to)" : "Research question / title"}</Label>
            <Input
              placeholder={essayType === "TOK Exhibition" ? "e.g. What counts as knowledge?" : "e.g. To what extent did the UK sugar levy change soft drink prices in supermarkets?"}
              value={researchQuestion}
              onChange={(e) => setResearchQuestion(e.target.value)}
            />
          </div>

          {essayType === "EE" && (
            <div className="space-y-2">
              <Label>
                {examSession === "may2027" ? "Reflective statement (RPF)" : "Reflections (RPPF)"}
                <span className="text-muted-foreground font-normal">, optional</span>
              </Label>
              <Textarea
                placeholder={examSession === "may2027"
                  ? "Paste your reflective statement, up to 500 words. Criterion E is marked on this and not on the essay, so without it the report covers the other four criteria only."
                  : "Paste your three RPPF reflections, 500 words in total. Criterion E is marked on these and not on the essay, so without them the report covers the other four criteria only."}
                rows={4}
                maxLength={8000}
                value={reflections}
                onChange={(e) => setReflections(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            {anonUnlocked && (
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
                <strong>Your report is unlocked on this device.</strong> Paste your revised draft below and re-check it.
                Two re-checks are included for 14 days, and they do not cost a credit.
              </div>
            )}
            {rerunId && (
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
                <strong>Re-checking your paid draft.</strong> Paste the revised version below, this re-check is free and does not use a credit.
              </div>
            )}
            <Label>{essayType === "TOK Exhibition" ? "Paste your commentary on all three objects" : "Paste your essay or IA text"}</Label>
            <Textarea
              placeholder={essayType === "TOK Exhibition" ? "Paste your commentary for all three objects, including how each links to the prompt." : "Paste the full text of your work here. A short extract can be marked, but the report is only as good as what it sees. Anything past 30,000 characters, about 5,000 words, is not sent."}
              rows={10}
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              className="resize-y"
            />
            <p className={`text-xs ${essayText.length > 30000 ? "text-amber-600 font-medium" : "text-muted-foreground"}`}>
              {essayText.split(/\s+/).filter(Boolean).length} words
              {essayText.length > 0 && ` · ${essayText.length} characters`}
              {essayText.length > 30000 &&
                ` · only the first 30,000 characters are marked, so the last ${essayText.length - 30000} will not be read`}
            </p>
          </div>

          {/* Credit status banner */}
          {isAuthenticated && credits && (
            <div className={`text-sm p-3 rounded-lg ${
              credits.canAnalyzeEssay
                ? credits.freeEssayAvailable
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-blue-50 text-blue-700 border border-blue-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}>
              {credits.freeEssayAvailable
                ? "Your first preview is free."
                : credits.essayCredits > 0
                  ? `You have ${credits.essayCredits} essay credit${credits.essayCredits > 1 ? "s" : ""} remaining.`
                  : <span>No credits remaining. <button onClick={() => setEssayPurchaseOpen(true)} className="underline font-medium cursor-pointer">Purchase credits</button> to continue.</span>
              }
            </div>
          )}

          {rerunDelta && (
            <div className="text-sm p-3 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
              <strong>Re-check done.</strong> {rerunDelta}
            </div>
          )}

          {/* Paid guest, waiting for the webhook */}
          {paidReturn && !isAuthenticated && !result && (
            <div className="text-sm p-3 rounded-lg bg-primary/5 border border-primary/30 flex items-center gap-2">
              <Loader2 className="w-4 h-4 flex-shrink-0 animate-spin" />
              <span>
                {waitedFor > 120000
                  ? "Your payment went through but the report has not opened. This is on us: "
                  : "Payment received. Opening your full report, this takes a few seconds. If it does not open, "}
                email glushkovim@gmail.com with order{" "}
                <code className="text-xs">{new URLSearchParams(window.location.search).get("order") || ""}</code> and
                we will open it or refund you.
              </span>
            </div>
          )}

          {/* Anonymous: first-time free analysis banner */}
          {!isAuthenticated && canAnonAnalyze && !anonUnlocked && (
            <div className="text-sm p-3 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Your first analysis on this device is a <strong>free preview</strong>. The full report unlocks for {PRICE_LABELS.ESSAY_SINGLE}.</span>
            </div>
          )}

          {/* Anonymous: already used free analysis, and has not bought anything */}
          {!isAuthenticated && !canAnonAnalyze && !anonUnlocked && !paidReturn && (
            <div className="text-sm p-3 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
              You have used your free analysis on this device. A full report is {PRICE_LABELS.ESSAY_SINGLE},
              with no account needed.
            </div>
          )}

          {/* Anonymous: analyze button (first-time) */}
          {!isAuthenticated && canAnonAnalyze && !anonUnlocked && (
            <Button
              className="w-full h-11"
              onClick={() => handleAnalyze("free")}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {analyzingLabel}
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Get my free preview, no account needed
                </>
              )}
            </Button>
          )}

          {/* Guest holding credits bought without an account */}
          {!isAuthenticated && deviceCredits > 0 && (
            <Button className="w-full h-11" onClick={() => handleAnalyze("paid")} disabled={isAnalyzing}>
              {isAnalyzing ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{analyzingLabel}</>
              ) : (
                <><FileText className="w-4 h-4 mr-2" />Mark a new piece of work ({deviceCredits} paid {deviceCredits === 1 ? "report" : "reports"} left)</>
              )}
            </Button>
          )}

          {/* Paid guest: the two re-checks they were promised */}
          {anonUnlocked && (anonRerunsLeft ?? anonReportQ.data?.rerunsLeft ?? 2) > 0 && (
            <Button
              className="w-full h-11"
              onClick={() => handleAnalyze("recheck")}
              disabled={rerunAnonMutation.isPending}
            >
              {rerunAnonMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Re-checking your revision…
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Re-check this draft (free, {anonRerunsLeft ?? anonReportQ.data?.rerunsLeft ?? 2} left)
                </>
              )}
            </Button>
          )}

          {/* Anonymous: buy a report. Also for someone who already bought one:
              their re-checks are for the same draft, a new draft is a new report. */}
          {!isAuthenticated && !canAnonAnalyze && deviceCredits === 0 && (
            <Button
              className="w-full h-11"
              variant={anonUnlocked ? "outline" : "default"}
              onClick={() => setEssayPurchaseOpen(true)}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              {anonUnlocked
                ? `Mark a different piece of work (${PRICE_LABELS.ESSAY_SINGLE})`
                : `Unlock the full report (${PRICE_LABELS.ESSAY_SINGLE})`}
            </Button>
          )}

          {/* Authenticated: run analysis or buy credits */}
          {isAuthenticated && (
            <>
              <Button
                className="w-full h-11"
                onClick={() => handleAnalyze("free")}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {analyzingLabel}
                  </>
                ) : !credits?.canAnalyzeEssay ? (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Purchase Credits to Analyze
                  </>
                ) : credits?.freeEssayAvailable ? (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Analyze Free (First Essay)
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Analyze ({PRICE_LABELS.ESSAY_SINGLE})
                  </>
                )}
              </Button>

              {!credits?.canAnalyzeEssay && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full mt-3 text-xs"
                  onClick={() => setEssayPurchaseOpen(true)}
                >
                  <CreditCard className="w-3 h-3 mr-1.5" />
                  Buy Essay Credits
                </Button>
              )}
            </>
          )}

          <PurchaseModal
            open={essayPurchaseOpen}
            onOpenChange={setEssayPurchaseOpen}
            sku="ESSAY_SINGLE"
          />
        </CardContent>
      </Card>

      {/* Results */}
      {!result && lockedQ.data?.exists && !lockedQ.data.unlocked && (
        <Card className="border-primary/40 bg-primary/5">
          <CardContent className="pt-6 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1">
              <p className="text-sm font-semibold">Your report from this device is still here</p>
              <p className="text-xs text-muted-foreground">{lockedQ.data.essayType} · {lockedQ.data.subject} · Band {lockedQ.data.band}</p>
            </div>
            <div className="flex items-center gap-2">
              {(lockedQ.data as any).preview && (
                <Button size="sm" variant="outline" onClick={() => setResult((lockedQ.data as any).preview as EssayResult)}>
                  Reopen my free preview
                </Button>
              )}
              {(credits?.essayCredits ?? 0) > 0 ? (
                <Button size="sm" disabled={pageUnlock.isPending} onClick={() => pageUnlock.mutate({ fingerprint: anonFp })}>
                  {pageUnlock.isPending ? "Unlocking…" : "Unlock full report (1 credit)"}
                </Button>
              ) : (
                <Button size="sm" onClick={() => setEssayPurchaseOpen(true)}>Buy &amp; unlock, $9.99</Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {(result as any).locked ? (
            <LockedTeaser essayText={essayText} result={result} isAuthenticated={isAuthenticated} hasPaidCredit={(credits?.essayCredits ?? 0) > 0} fingerprint={anonFp} analysisId={lastAnalysisId} onUnlocked={(full: any) => setResult(full as EssayResult)} onBuy={() => setEssayPurchaseOpen(true)} />
          ) : (<>
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Overall Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Rubric badge */}
              {result._rubricAvailable && (
                <div className="mb-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    Marked against the published IB criteria: {result._rubricLabel}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div style={SERIF} className={`text-3xl font-bold ${getScoreColor(result.predicted_score, result.max_score)}`}>
                    {result.predicted_score}/{result.max_score}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Predicted Score</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div style={SERIF} className="text-3xl font-bold">{result.band_range}</div>
                  <div className="text-xs text-muted-foreground mt-1">Band range</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div style={SERIF} className="text-3xl font-bold">
                    {(() => {
                      // Only criteria that were actually marked. Counting the max of an
                      // unassessed criterion made this disagree with the score above it.
                      const marked = result.criteria.filter((c) => c.score != null);
                      const sumScores = marked.reduce((a, c) => a + c.score, 0);
                      const sumMax = marked.reduce((a, c) => a + c.max, 0);
                      return sumMax > 0 ? Math.round((sumScores / sumMax) * 100) : 0;
                    })()}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Criteria Total</div>
                </div>
              </div>
              <div className="mb-4"><WordCheckNote check={result._wordCheck} text={essayText} /></div>
              <p className="text-sm leading-relaxed">{decodeAndSanitize(result.overall_comment)}</p>
            </CardContent>
          </Card>

          {/* Criteria Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Criteria Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {result.criteria.map((c, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{decodeAndSanitize(c.name)}</span>
                    <span className={`text-sm font-bold ${c.score == null ? "text-muted-foreground" : getScoreColor(c.score, c.max)}`}>
                      {c.score == null ? "not marked" : `${c.score}/${c.max}`}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${getBarColor(c.score, c.max)}`}
                      style={{ width: `${(c.score / c.max) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{decodeAndSanitize(c.comment)}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Risks */}
          {result.risks?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-red-600 uppercase tracking-wider flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  What's Losing Marks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.risks.map((r, i) => (
                  <div key={i} className="p-3 bg-red-50 border-l-2 border-red-400 rounded-r-md">
                    <div className="text-sm font-semibold mb-1">{decodeAndSanitize(r.title)}</div>
                    <div className="text-xs text-muted-foreground">{decodeAndSanitize(r.description)}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Leverage Zones */}
          {result.leverage_zones?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-emerald-600 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Score Leverage Zones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.leverage_zones.map((l, i) => (
                  <div key={i} className="p-3 bg-emerald-50 border-l-2 border-emerald-500 rounded-r-md">
                    <div className="text-sm font-semibold mb-1">{decodeAndSanitize(l.title)}</div>
                    <div className="text-xs text-muted-foreground">{decodeAndSanitize(l.description)}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          {result.next_steps?.length > 0 && (
            (!isAuthenticated && !anonUnlocked) ? (
              <Card className="border-border overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    Next Steps ({result.next_steps.length} personalized actions)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 blur-sm select-none pointer-events-none">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">1</span>
                    </div>
                    <p className="text-sm leading-relaxed">{decodeAndSanitize(result.next_steps[0])}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
                    <p className="text-sm font-semibold mb-1">Unlock your full action plan</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Unlock the full report to see all {result.next_steps.length} specific steps, ranked by the marks they recover.
                    </p>
                    <Button size="sm" asChild>
                      <a href={getLoginUrl()}>
                        <BookmarkPlus className="w-3.5 h-3.5 mr-1.5" />
                        Save Report & Unlock Steps
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Next Steps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {result.next_steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">{i + 1}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{decodeAndSanitize(step)}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          )}
          {/* Share Results */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Your Score
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const text = `IBLens estimates my IB ${essayType === "TOK" ? "TOK essay" : essayType === "TOK Exhibition" ? "TOK exhibition" : `${essayType} in ${subject}`} at ${result.predicted_score}/${result.max_score} against the published criteria. Free preview at iblens.com`;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Share on X
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const text = `IBLens estimates my IB ${essayType === "TOK" ? "TOK essay" : essayType === "TOK Exhibition" ? "TOK exhibition" : `${essayType} in ${subject}`} at ${result.predicted_score}/${result.max_score} against the published criteria. Free preview at iblens.com`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const text = `IBLens estimates my IB ${essayType === "TOK" ? "TOK essay" : essayType === "TOK Exhibition" ? "TOK exhibition" : `${essayType} in ${subject}`} at ${result.predicted_score}/${result.max_score} (band ${result.band_range}) against the published criteria. Free preview at iblens.com`;
                    navigator.clipboard.writeText(text);
                    toast.success("Score copied to clipboard!");
                  }}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Score
                </Button>
              </div>
            </CardContent>
          </Card>

          {(() => {
            const weakest = [...(result.criteria || [])]
              .filter((c: any) => c.max > 0 && c.score < c.max)
              .sort((a: any, b: any) => a.score / a.max - b.score / b.max)
              .slice(0, 2);
            const potential = weakest.reduce((s: number, c: any) => s + (c.max - c.score), 0);
            if (!weakest.length) return null;
            return (
              <Card>
                <CardContent className="p-6">
                  <h3 style={SERIF} className="text-xl font-bold mb-2">Your fastest wins: +{potential} marks on the table</h3>
                  <ul className="space-y-1.5 mb-3">
                    {weakest.map((c: any) => (
                      <li key={c.name} className="text-sm text-muted-foreground"><strong className="text-foreground">{c.name}:</strong> {c.score}/{c.max} now, +{c.max - c.score} available</li>
                    ))}
                  </ul>
                  <p className="text-sm text-muted-foreground">Fix these in your draft using the comments above, then run a <strong>re-check</strong>: you will see which criteria moved and by how much.</p>
                </CardContent>
              </Card>
            );
          })()}

          {/* Save Results & Buy More CTA */}
          {!isAuthenticated ? (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BookmarkPlus className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 style={SERIF} className="font-bold text-xl mb-1">Keep this report in an account</h3>
                    <p className="text-sm text-muted-foreground">
                      Sign in free and this report moves to your dashboard, where it stays until you delete it. Your next report is <strong>{PRICE_LABELS.ESSAY_SINGLE}</strong>, or five for {PRICE_LABELS.ESSAY_PACK_5} ($5.00 each).
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Button size="lg" asChild className="h-12">
                    <a href={getLoginUrl()}>
                      <BookmarkPlus className="w-4 h-4 mr-2" />
                      Save report to an account
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="h-12" onClick={() => { (window as any).dataLayer?.push({ event: "recheck_cta_click", auth: "anon" }); setEssayPurchaseOpen(true); }}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Buy Credits ($9.99)
                  </Button>
                </div>
                <p className="text-xs text-center text-muted-foreground">7-day money-back guarantee · Secure checkout</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-6 text-center space-y-4">
                <h3 style={SERIF} className="text-xl font-bold">Analyze Another Essay</h3>
                <p className="text-sm text-muted-foreground">
                  {credits?.essayCredits ? `You have ${credits.essayCredits} credit${credits.essayCredits > 1 ? 's' : ''} remaining.` : 'Purchase more credits to continue analyzing.'}
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => { setResult(null); window.scrollTo(0, 0); }}>
                    <FileText className="w-4 h-4 mr-2" />
                    Analyze Another Essay
                  </Button>
                  {!credits?.essayCredits && (
                    <Button variant="outline" onClick={() => setEssayPurchaseOpen(true)}>
                      Buy Credits
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          </>)}
        </div>
      )}
    </div>
  );
}
