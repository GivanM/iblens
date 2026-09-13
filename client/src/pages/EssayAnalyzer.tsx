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
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  FileText, Loader2, AlertTriangle, TrendingUp, ArrowRight,
  CheckCircle2, XCircle, Lock, Share2, Twitter, Copy, BookmarkPlus, CreditCard
} from "lucide-react";
import { PurchaseModal } from "@/components/PurchaseModal";
import { DeviceReportsList, deviceReportLabel, type DeviceReport } from "@/components/DeviceReportsList";
import { usePurchaseTracking } from "@/hooks/usePurchaseTracking";
import { PRICE_LABELS, type ProductKey } from "@shared/pricing";
import { WordCheckNote } from "@/components/WordCheckNote";
import { countWords, type WordCheck } from "@shared/wordcount";
import { IA_RUBRIC_SUBJECTS, EE_SUBJECTS, unmarkableReason } from "@shared/rubrics";
import { analytics } from "@/lib/analytics";
import { getAnonFingerprint } from "@/lib/fingerprint";
import { capitalise, fullReportAdds, type CriterionScope } from "@/lib/reportScope";
import { trackEssaySubmitted, trackEssayUploadStarted } from "@/lib/analytics/track";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

const IB_SUBJECTS: string[] = [...IA_RUBRIC_SUBJECTS];
const EE_SUBJECT_LIST: string[] = [...EE_SUBJECTS];
const subjectsFor = (type: string) => (type === "EE" ? EE_SUBJECT_LIST : IB_SUBJECTS);

// Three of the coursework subjects are marked on an externally assessed component,
// not on that subject's internal assessment. Under "Internal Assessment" the bare
// subject name let a Music student submit Experimenting with music and be marked
// on the criteria for Exploring music in context.
const EXTERNAL_COURSEWORK_LABELS: Record<string, string> = {
  "English A: Language and Literature": "English A: Language and Literature (individual oral)",
  "English A: Literature": "English A: Literature (individual oral)",
  "Visual Arts": "Visual Arts: comparative study (external)",
  "Music": "Music: exploring music in context (external)",
  "Film": "Film: textual analysis (external)",
};

const ESSAY_TYPES = [
  { value: "IA", label: "Internal Assessment (IA) or coursework" },
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


function LockedTeaser({ result, isAuthenticated, hasPaidCredit, fingerprint, analysisId, onUnlocked, onBuy, essayText, deviceCredits = 0, onDeviceUnlock, deviceUnlocking }: any) {
  const unlock = trpc.essay.unlockAnalysis.useMutation({
    onSuccess: (d: any) => onUnlocked(d.result),
    onError: (e: any) => toast.error(e.message || "Unlock failed"),
  });
  const weakest = result.weakest_criterion;
  // A holistic instrument has one criterion, and its score is the exact mark.
  const holistic = (result.criteria_names || []).length === 1;
  const others = (result.criteria_names || []).filter((c: any) => c?.name !== weakest?.name && c?.assessed !== false);
  const unassessed = (result.criteria_names || []).filter((c: any) => c?.assessed === false);
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
          <span style={SERIF} className="text-4xl font-bold">{holistic ? "Band" : "Range"} {result.band_range}</span>
          <span className="text-sm text-muted-foreground">out of {result.max_score}</span>
        </div>
        {!holistic && <p className="text-xs text-muted-foreground -mt-3">IBLens's estimated total is somewhere in this range. It is not a margin of error; the full report gives the estimate.</p>}
        <WordCheckNote check={result._wordCheck} text={essayText} />
        {!weakest && !holistic && (
          <p className="text-sm rounded-lg border border-border bg-muted/40 p-4 text-muted-foreground">This preview names no criterion and lists no risks: for this draft, either would give the estimated mark away. The full report scores every criterion that can be marked from what you pasted.</p>
        )}
        {weakest && (
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1.5">{holistic ? "The start of the explanation" : "Your weakest criterion"}</p>
            <div className="flex justify-between text-sm font-semibold mb-1 text-foreground"><span>{weakest.name}</span><span>{typeof weakest.score === "number" ? `${weakest.score}/${weakest.max}` : holistic ? `Band ${result.band_range}` : `?/${weakest.max}`}</span></div>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{weakest.comment}</p>
            {result.weakest_comment_trimmed && <p className="text-xs text-amber-800 mt-2">Sentences that state a mark are left out of the preview; the full report has the whole comment.</p>}
          </div>
        )}
        {(result.risks || []).length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Top risks in this draft</p>
            <ul className="space-y-2">
              {result.risks.map((r: any, i: number) => (
                <li key={i} className="text-sm"><strong className="text-foreground">{r.title}</strong>{r.description ? <span className="text-muted-foreground">: {r.description}{/\u2026$/.test(r.description) ? " (continued in the full report)" : ""}</span> : null}</li>
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
            <li className="flex items-center gap-2 text-sm text-muted-foreground"><Lock className="w-3.5 h-3.5 shrink-0" /> {holistic ? "Your estimated mark within the band, and the full explanation" : unassessed.length ? "Your estimated mark, and a mark for every criterion that could be assessed" : "Your estimated mark, and a mark for every criterion"}</li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground"><Lock className="w-3.5 h-3.5 shrink-0" /> The overall comment</li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground"><Lock className="w-3.5 h-3.5 shrink-0" /> Step-by-step fixes, ranked by marks gained</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3">
            {holistic
              ? "This task is marked as a whole, against one instrument. The preview shows the band and the start of the explanation; the full report gives the estimated mark and the whole explanation."
              : `${weakest ? "The criterion shown above is the one where this draft loses the largest share of its available marks. The others are scored in the full report." : "No criterion is named in this preview, because naming one would give the estimated mark away. Every criterion that can be marked from your text is scored in the full report."}${unassessed.length ? ` Not assessed from the pasted text: ${unassessed.map((c: any) => c.name).join(", ")}.` : ""}`}
          </p>
        </div>
        <div className="rounded-lg bg-primary/5 border border-primary/30 p-4">
          {!isAuthenticated && deviceCredits > 0 && !analysisId ? (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <p className="text-sm flex-1"><strong className="text-foreground">This browser has {deviceCredits} paid {deviceCredits === 1 ? "report" : "reports"}.</strong> Open this one in full with one of them.</p>
              <Button disabled={deviceUnlocking} onClick={onDeviceUnlock}>{deviceUnlocking ? "Unlocking…" : "Unlock the full report (uses 1 paid report)"}</Button>
            </div>
          ) : !isAuthenticated ? (
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <p className="text-sm flex-1"><strong className="text-foreground">Unlock the full report, $9.99.</strong> No account needed: pay with your email and it opens straight away, with two free re-checks of revised versions of this work within 14 days of it opening.</p>
                <Button className="min-h-11" onClick={onBuy}>Buy &amp; unlock, $9.99</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Prefer to keep everything in one place? <a href={getLoginUrl()} className="underline">Sign in first</a> and the report is saved to your account.
              </p>
            </div>
          ) : hasPaidCredit ? (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <p className="text-sm flex-1"><strong className="text-foreground">You have a paid report to use.</strong> Open the full report now.</p>
              <Button disabled={unlock.isPending} onClick={doUnlock}>{unlock.isPending ? "Unlocking…" : "Unlock the full report (uses 1 paid report)"}</Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <p className="text-sm flex-1"><strong className="text-foreground">Unlock the full report, $9.99.</strong> {capitalise(fullReportAdds(result.criteria_names))}, plus two free re-checks of revised versions of this work within 14 days, so you can see whether your edits landed.</p>
              <Button className="min-h-11" onClick={onBuy}>Buy &amp; unlock, $9.99</Button>
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
  "Marking each criterion against its descriptors\u2026",
  "Finding where you are losing marks\u2026",
  "Writing your improvement plan\u2026",
  "Formatting your report, almost there\u2026",
];

type RecheckChange = {
  summary: string;
  moved: Array<{ name: string; before: number | null; after: number | null; max: number | null }>;
  /** Whether criterion marks could be compared at all. */
  compared: boolean;
};

/**
 * What a re-check changed: the total, and every criterion whose mark moved. The page
 * promises "which criteria moved and by how much", and it used to show the total only.
 */
function describeRecheck(previous: any, now: any): RecheckChange | null {
  const before = previous?.predicted_score;
  const after = now?.predicted_score;
  if (before == null || after == null) return null;
  const beforeMax = previous?.max_score;
  const afterMax = now?.max_score;
  const move = after - before;
  // Totals differ when a criterion was assessed one time and not the other
  // (an EE reflection pasted once, an oral given as a transcript then an outline).
  const summary = beforeMax && afterMax && beforeMax !== afterMax
    ? `Before: ${before}/${beforeMax}. Now: ${after}/${afterMax}. The totals differ because a different set of criteria was assessed, so the two totals are not directly comparable.`
    : `Before: ${before}${afterMax ? `/${afterMax}` : ""}. Now: ${after}${afterMax ? `/${afterMax}` : ""}. ` +
      (move > 0 ? `Up ${move} mark${move === 1 ? "" : "s"}.` : move < 0 ? `Down ${Math.abs(move)} mark${Math.abs(move) === 1 ? "" : "s"}.` : "No change in the total.");
  const prevCriteria: any[] = Array.isArray(previous?.criteria) ? previous.criteria : [];
  const nowCriteria: any[] = Array.isArray(now?.criteria) ? now.criteria : [];
  // A task marked as a whole has one criterion, and the total already says how it moved.
  const compared = prevCriteria.length > 1 && nowCriteria.length > 1;
  const prevByName = new Map(prevCriteria.map((c: any) => [String(c?.name ?? ""), c]));
  const moved = compared
    ? nowCriteria.map((c: any) => {
        const p: any = prevByName.get(String(c?.name ?? ""));
        return {
          name: String(c?.name ?? ""),
          before: typeof p?.score === "number" ? p.score : null,
          after: typeof c?.score === "number" ? c.score : null,
          max: typeof c?.max === "number" ? c.max : null,
        };
      }).filter((c) => c.before !== c.after)
    : [];
  return { summary, moved, compared };
}

export default function EssayAnalyzer() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const purchase = usePurchaseTracking();
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
      subject: subject && (IB_SUBJECTS.includes(subject) || EE_SUBJECT_LIST.includes(subject)) ? subject : undefined,
    };
  })();
  const [essayType, setEssayType] = useState(handoff.type ?? "IA");
  // No default subject: a preset one (Business Management) marked other subjects' work on
  // the wrong criteria whenever the dropdown was left alone, and it cost the free preview.
  const [subject, setSubject] = useState(handoff.subject ?? "");
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
  // What the last re-check changed, shown above the report it produced.
  const [rerunDelta, setRerunDelta] = useState<RecheckChange | null>(null);
  const [essayPurchaseOpen, setEssayPurchaseOpen] = useState(false);
  // What a purchase from this page is for: the locked preview on screen, or new work.
  // The difference decides what the payment opens, so every button says which it is.
  const [buyFor, setBuyFor] = useState<"preview" | "new">("new");
  const [buyLabel, setBuyLabel] = useState<string | null>(null);
  const [buyKind, setBuyKind] = useState<"essay" | "tok">("essay");
  // The criteria of the preview being bought, so the dialog promises only what it marks.
  const [buyCriteria, setBuyCriteria] = useState<CriterionScope[] | null>(null);
  // The work the report on screen belongs to, fixed when it was produced or reopened.
  // Reading the form instead named the wrong work after the task was switched.
  const [resultWork, setResultWork] = useState<{ label: string; kind: "essay" | "tok" } | null>(null);
  const formWork = () => ({
    label: deviceReportLabel({ essayType, subject: essayType === "TOK" || essayType === "TOK Exhibition" ? null : subject || null }),
    kind: (essayType === "TOK" || essayType === "TOK Exhibition" ? "tok" : "essay") as "essay" | "tok",
  });
  // The form follows the report being reopened or re-checked, so the right boxes show
  // (an Extended Essay's reflections) and the report's own task is what gets checked.
  const formFromReport = (type?: string | null, subj?: string | null) => {
    if (type === "TOK") { setEssayType(subj === "Exhibition" ? "TOK Exhibition" : "TOK"); return; }
    if (type === "IA" || type === "EE") {
      setEssayType(type);
      if (subj) setSubject(subj);
    }
  };
  const openBuy = (kind: "preview" | "new", label: string | null = null, work: "essay" | "tok" = "essay", criteria: CriterionScope[] | null = null) => {
    setBuyFor(kind);
    setBuyLabel(label);
    setBuyKind(work);
    setBuyCriteria(kind === "preview" ? criteria : null);
    setEssayPurchaseOpen(true);
  };
  const resultRef = useRef<HTMLDivElement | null>(null);

  const creditsQuery = trpc.dashboard.credits.useQuery(undefined, { enabled: isAuthenticated });
  const credits = creditsQuery.data;

  const [anonFp] = useState(getAnonFingerprint);

  const anonCheckQuery = trpc.essay.canAnalyzeAnonymous.useQuery(
    { clientFingerprint: anonFp },
    { enabled: !isAuthenticated }
  );
  const canAnonAnalyze = !isAuthenticated ? (anonCheckQuery.data?.canAnalyze ?? !(() => { try { return localStorage.getItem('iblens_anon_used'); } catch { return null; } })()) : false;

  const rerunMutation = trpc.essay.rerunAnalysis.useMutation({
    onSuccess: (data: any) => {
      setResult(data.result as EssayResult);
      setResultAnalysisId(data.id);
      setRerunDelta(describeRecheck(data.previous, data.result));
      toast.success(`Re-check complete. ${data.rerunsLeft} free ${data.rerunsLeft === 1 ? "re-check" : "re-checks"} left for this draft.`);
    },
    onError: (err: any) => {
      toast.error(err.message || "Re-check unavailable");
    },
  });

  const analyzeMutation = trpc.essay.analyze.useMutation({
    onSuccess: (data) => {
      setResult(data.result as EssayResult);
      setResultAnalysisId((data as any).id ?? null);
      setRerunDelta(null);
      creditsQuery.refetch();
      const r = data.result as EssayResult;
      analytics.completeEssayAnalysis(subject, `${r.predicted_score}/${r.max_score}`);
      const wordCount = essayText.split(/\s+/).filter(Boolean).length;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'essay_submit', essay_type: essayType, subject, word_count: wordCount });
      if (data.wasFree) {
        toast.success((credits?.essayCredits ?? 0) > 0 ? "Free preview ready. Unlock the full report with one of your paid reports." : `Free preview ready. The full report unlocks for ${PRICE_LABELS.ESSAY_SINGLE}.`);
      } else {
        toast.success("Your full report is ready below.");
      }
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  const anonAnalyzeMutation = trpc.essay.analyzeAnonymous.useMutation({
    onSuccess: (data: any) => {
      setResult(data.result as EssayResult);
      setResultAnalysisId(null);
      setRerunDelta(null);
      // A run paid for with a device credit comes back open. Without this the
      // page kept treating it as the locked preview and blurred the fix list
      // the buyer had just paid for.
      if (data.unlocked === true) {
        setPaidRunUnlocked(true);
        deviceCreditsQ.refetch();
        setAnonRerunsLeft(null);
        setRerunDelta(null);
        setRecheckTargetId(null);
        deviceReportsQ.refetch();
      }
      try { localStorage.setItem('iblens_anon_used', 'true'); } catch { /* storage blocked */ }
      anonCheckQuery.refetch();
      anonReportQ.refetch();
      const r = data.result as EssayResult;
      analytics.completeEssayAnalysis(subject, `${r.predicted_score}/${r.max_score}`);
      const wordCount = essayText.split(/\s+/).filter(Boolean).length;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'essay_submit', essay_type: essayType, subject, word_count: wordCount });
      toast.success(data.unlocked ? "Your paid report is open below." : (deviceCreditsQ.data?.credits ?? 0) > 0 ? "Free preview ready. Unlock the full report with one of your paid reports." : `Free preview ready. The full report unlocks for ${PRICE_LABELS.ESSAY_SINGLE}.`);
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  const isAnalyzing = analyzeMutation.isPending || anonAnalyzeMutation.isPending || rerunMutation.isPending;


  // The account report now on screen, if it is one. Set only by a run or re-check on the
  // account and cleared whenever anything else is shown: left over, it attached a new
  // report's purchase and re-check link to an earlier piece of work.
  const [resultAnalysisId, setResultAnalysisId] = useState<number | null>(null);
  // Guests too: a reload used to drop the free preview for good, and the page then
  // offered to sell "the report you are looking at" with nothing on the screen.
  const lockedQ = trpc.essay.lockedReport.useQuery(
    { fingerprint: anonFp },
    { enabled: !result }
  );
  // Coming back from a guest checkout. The webhook has already unlocked the report,
  // so there is nothing to click: read it and show it.
  const paidReturn = typeof window !== "undefined"
    && new URLSearchParams(window.location.search).get("payment") === "success";
  // A purchase made for new work opens nothing; it adds reports to this browser.
  const paidOpens = typeof window !== "undefined"
    && new URLSearchParams(window.location.search).get("opened") !== "0";
  const [waitedFor, setWaitedFor] = useState(0);
  const paidReportQ = trpc.essay.anonymousReport.useQuery(
    { fingerprint: anonFp },
    {
      // Signed-in buyers of a preview saved on this device come back here too.
      enabled: paidReturn && paidOpens && !result,
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
      setResultAnalysisId(null);
      setRerunDelta(null);
      const pr: any = paidReportQ.data;
      if (pr.essayType) setResultWork({ label: deviceReportLabel({ essayType: pr.essayType, subject: pr.subject }), kind: pr.essayType === "TOK" ? "tok" : "essay" });
      // A pack opened here also put reports on the device.
      deviceCreditsQ.refetch();
      deviceReportsQ.refetch();
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
  // Every paid report on this browser, and the one a guest re-check will go to.
  const deviceReportsQ = trpc.essay.deviceReports.useQuery(
    { fingerprint: anonFp, kind: "essay" },
    { enabled: !isAuthenticated }
  );
  const reportsOnDevice: DeviceReport[] = (deviceReportsQ.data as any) ?? [];
  const [recheckTargetId, setRecheckTargetId] = useState<number | null>(null);
  // Tracked by the purchase (the head of its chain), which survives each re-check adding a version.
  const recheckTarget = reportsOnDevice.find((r) => r.id === recheckTargetId) ?? reportsOnDevice[0] ?? null;
  const [openingReport, setOpeningReport] = useState<number | null>(null);
  const trpcUtils = trpc.useUtils();
  const openDeviceReport = async (r: DeviceReport) => {
    setOpeningReport(r.latestId);
    try {
      const d: any = await trpcUtils.essay.deviceReport.fetch({ fingerprint: anonFp, id: r.latestId });
      if (d?.found) {
        setResultWork({ label: deviceReportLabel(r), kind: r.essayType === "TOK" || r.essayType === "TOK Exhibition" ? "tok" : "essay" });
        setResult(d.result as EssayResult);
        setRerunDelta(null);
        formFromReport(d.essayType, d.subject);
        if (d.examSession === "nov2026" || d.examSession === "may2027") setExamSession(d.examSession);
        setResultAnalysisId(null);
        setRecheckTargetId(r.id);
      }
    } finally {
      setOpeningReport(null);
    }
  };
  // This browser holds a paid report, the newest row or an older one under a newer free preview.
  const anonUnlocked = !isAuthenticated && (anonReportQ.data?.unlocked === true || paidRunUnlocked || reportsOnDevice.length > 0);
  const deviceCreditsQ = trpc.essay.deviceCredits.useQuery(
    { fingerprint: anonFp },
    {
      enabled: true,
      refetchInterval: (q: any) => {
        const d = q?.state?.data ?? q;
        return paidReturn && !paidOpens && !purchase.paid && waitedFor <= 120000 ? 4000 : false;
      },
    }
  );
  // The payment is confirmed: read the browser's reports once more, now that they are there.
  useEffect(() => {
    if (purchase.paid) deviceCreditsQ.refetch();
  }, [purchase.paid]);
  // Moving what this browser bought into the account happens once, in the layout, on
  // every page. A second claim here raced it and copied reports twice.
  const deviceCredits = isAuthenticated ? 0 : (deviceCreditsQ.data?.credits ?? 0);
  // Coming back later, on the same device: the report is bought and paid for, so
  // show it. Before this, a guest who closed the tab could never reach it again.
  useEffect(() => {
    if (anonReportQ.data?.unlocked && !result) {
      setResult(anonReportQ.data.result as EssayResult);
      setResultAnalysisId(null);
      setRerunDelta(null);
      const ar: any = anonReportQ.data;
      // Named after the report itself: the form's defaults named it "IA" on a reload.
      if (ar.essayType) {
        setResultWork({ label: deviceReportLabel({ essayType: ar.essayType, subject: ar.subject }), kind: ar.essayType === "TOK" ? "tok" : "essay" });
        formFromReport(ar.essayType, ar.subject);
      }
    }
  }, [anonReportQ.data, result]);
  const rerunAnonMutation = trpc.essay.rerunAnonymous.useMutation({
    onSuccess: (d: any) => {
      setResult(d.result as EssayResult);
      setResultAnalysisId(null);
      setAnonRerunsLeft(d.rerunsLeft);
      deviceReportsQ.refetch();
      setRerunDelta(describeRecheck(d.previous, d.result));
      toast.success(`Re-check complete. ${d.rerunsLeft} free ${d.rerunsLeft === 1 ? "re-check" : "re-checks"} left for this draft.`);
    },
    onError: (e: any) => toast.error(e.message || "Re-check unavailable"),
  });

  const pageUnlock = trpc.essay.unlockAnalysis.useMutation({
    onSuccess: (d: any) => { setResult(d.result as EssayResult); setResultAnalysisId(null); setRerunDelta(null); lockedQ.refetch(); if (isAuthenticated) creditsQuery.refetch(); },
    onError: (e: any) => toast.error(e.message || "Unlock failed"),
  });
  const deviceUnlock = trpc.essay.unlockPreviewWithDeviceCredit.useMutation({
    onSuccess: (d: any) => {
      setResult(d.result as EssayResult);
      setResultAnalysisId(null);
      setRerunDelta(null);
      setPaidRunUnlocked(true);
      lockedQ.refetch();
      deviceCreditsQ.refetch();
      anonReportQ.refetch();
    },
    onError: (e: any) => toast.error(e.message || "Unlock failed"),
  });
  useEffect(() => {
    if (!result) return;
    // After the form above it has settled (the button under it changes once the preview is
    // used), or a phone was left looking at a buy button instead of the result.
    const t = setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 350);
    return () => clearTimeout(t);
  }, [result]);
  const lockedPreview: any = lockedQ.data?.exists && !lockedQ.data.unlocked ? lockedQ.data : null;
  // Arriving from "Unlock it on the grader page" on /remark: show the saved preview and its
  // unlock button, not the top of the form.
  const savedPreviewShown = useRef(false);
  useEffect(() => {
    if (!lockedPreview || savedPreviewShown.current || typeof window === "undefined" || window.location.hash !== "#saved-preview") return;
    savedPreviewShown.current = true;
    setTimeout(() => document.getElementById("saved-preview")?.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
  }, [lockedPreview]);
  const typeLabel = (t?: string | null) => t === "EE" ? "Extended Essay" : t === "TOK" ? "TOK essay" : t === "TOK Exhibition" ? "TOK exhibition" : t === "IA" ? "IA" : (t || "");
  // Exhibitions are stored as task "TOK" with subject "Exhibition".
  const lockedLabel = lockedPreview ? deviceReportLabel({ essayType: lockedPreview.essayType, subject: lockedPreview.subject }) : null;
  const unmarkableNow = unmarkableReason(essayType, subject, examSession);
  const isOral = essayType === "IA" && subject.startsWith("English A");
  // Arriving from a page for different work (a History IA link while the saved preview
  // is a Biology IA), the saved preview steps aside instead of heading the page.
  const handoffApi = handoff.type === "TOK Exhibition" ? { type: "TOK", subject: "Exhibition" } : handoff.type === "TOK" ? { type: "TOK", subject: "Essay" } : { type: handoff.type, subject: handoff.subject };
  const otherWorkRequested: boolean = !!lockedPreview && (
    (!!handoffApi.type && handoffApi.type !== lockedPreview.essayType) ||
    (!!handoffApi.subject && lockedPreview.essayType !== "TOK" && handoffApi.subject !== lockedPreview.subject) ||
    (handoffApi.type === "TOK" && !!handoffApi.subject && (lockedPreview.subject === "Exhibition") !== (handoffApi.subject === "Exhibition"))
  );

  const [analyzingStep, setAnalyzingStep] = useState(0);
  useEffect(() => {
    if (!isAnalyzing) { setAnalyzingStep(0); return; }
    const id = setInterval(() => setAnalyzingStep((s) => s + 1), 6000);
    return () => clearInterval(id);
  }, [isAnalyzing]);
  const analyzingLabel = ANALYZING_STEPS[Math.min(analyzingStep, ANALYZING_STEPS.length - 1)];

  type RunMode = "free" | "paid" | "recheck";
  const handleAnalyze = (mode: RunMode = "free") => {
    // A re-check is marked on the task, subject and session of the report it belongs to,
    // on the server, so the form's own choices must not stop it.
    const isRecheck = isAuthenticated ? !!rerunId : (anonUnlocked && mode === "recheck");
    if (!isRecheck && (essayType === "IA" || essayType === "EE") && !subject) {
      toast.error("Choose your subject first, so the work is marked on the right criteria.");
      return;
    }
    const unmarkable = isRecheck ? null : unmarkableReason(essayType, subject, examSession);
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
    // The report that comes back belongs to what was submitted, whatever the form shows later.
    setResultWork(formWork());
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
        openBuy("new");
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
        // The button that says it uses a paid report; the free preview stays unused.
        spendCredit: mode === "paid",
      });
    } else {
      // Which button was pressed decides this. Reading it from state gave the
      // handler the value from the previous render, so the re-check button spent
      // a credit on its first click.
      if (anonUnlocked && mode === "recheck") {
        rerunAnonMutation.mutate({
          fingerprint: anonFp,
          essayText,
          reflections: reflections || undefined,
          examSession,
          ...(recheckTarget ? { recordId: recheckTarget.latestId } : {}),
        });
        return;
      }
      if (!canAnonAnalyze && deviceCredits === 0) {
        openBuy("new");
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
        description="AI feedback on your IB Internal Assessment, Extended Essay or TOK work in 14 subjects: a free preview with a range of totals and, usually, your weakest criterion, then a full report against the published criteria."
        canonical="/essay"
      />
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Essay Grader</p>
        <h1 style={SERIF} className="text-4xl font-bold mb-3">IB essay grader</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          AI feedback on your Extended Essay, IA or TOK work in about a minute, against the published criteria, with an estimated mark.
        </p>
      </div>

      {!isAuthenticated && (
        <DeviceReportsList
          reports={reportsOnDevice}
          showSingle={anonReportQ.data?.unlocked !== true}
          selectedId={recheckTarget?.id ?? null}
          opening={openingReport}
          onOpen={openDeviceReport}
          onRecheck={(r) => {
            setRecheckTargetId(r.id);
            formFromReport(r.essayType, r.subject);
            document.getElementById("essay-text")?.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        />
      )}

      {!result && lockedPreview && otherWorkRequested && (
        <div className="mb-6 rounded-lg border border-border bg-muted/40 p-3 text-sm flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="flex-1 text-muted-foreground">The free preview on this device was used on {lockedLabel || "another piece of work"}. {deviceCredits > 0 || (credits?.essayCredits ?? 0) > 0 ? "The work below can be marked with one of your paid reports." : `A full report for the work below is ${PRICE_LABELS.ESSAY_SINGLE}.`}</span>
          {lockedPreview.preview && (
            <Button variant="ghost" className="min-h-11 h-auto whitespace-normal" onClick={() => { setResultWork({ label: lockedLabel || "", kind: lockedPreview.essayType === "TOK" || lockedPreview.essayType === "TOK Exhibition" ? "tok" : "essay" }); setResult(lockedPreview.preview as EssayResult); setResultAnalysisId(null); }}>
              Reopen that preview
            </Button>
          )}
        </div>
      )}

      {!result && lockedPreview && !otherWorkRequested && (
        <Card id="saved-preview" className="mb-6 border-primary/40 bg-primary/5 scroll-mt-24">
          <CardContent className="pt-6 space-y-3">
            <div>
              <p className="text-sm font-semibold">Your free preview is saved on this device</p>
              <p className="text-xs text-muted-foreground">It used this device's free preview.</p>
              <p className="text-xs text-muted-foreground">
                {lockedLabel}{lockedPreview.band ? ` · ${lockedPreview.essayType === "TOK" || lockedPreview.essayType === "TOK Exhibition" ? "Band" : "Range"} ${lockedPreview.band}` : ""}
                {lockedPreview.createdAt ? ` · ${new Date(lockedPreview.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}` : ""}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              {lockedPreview.preview && (
                <Button variant="outline" className="min-h-11 h-auto whitespace-normal" onClick={() => { setResultWork({ label: lockedLabel || "", kind: lockedPreview.essayType === "TOK" || lockedPreview.essayType === "TOK Exhibition" ? "tok" : "essay" }); setResult(lockedPreview.preview as EssayResult); setResultAnalysisId(null); }}>
                  Reopen my free preview
                </Button>
              )}
              {isAuthenticated && (credits?.essayCredits ?? 0) > 0 ? (
                <Button className="min-h-11 h-auto whitespace-normal" disabled={pageUnlock.isPending} onClick={() => pageUnlock.mutate({ fingerprint: anonFp })}>
                  {pageUnlock.isPending ? "Unlocking…" : "Unlock the full report (uses 1 paid report)"}
                </Button>
              ) : !isAuthenticated && deviceCredits > 0 ? (
                <Button className="min-h-11 h-auto whitespace-normal" disabled={deviceUnlock.isPending} onClick={() => deviceUnlock.mutate({ fingerprint: anonFp })}>
                  {deviceUnlock.isPending ? "Unlocking…" : "Unlock the full report (uses 1 paid report)"}
                </Button>
              ) : paidReturn && paidOpens ? null : (
                <Button className="min-h-11 h-auto whitespace-normal" onClick={() => openBuy("preview", lockedLabel, lockedPreview.essayType === "TOK" || lockedPreview.essayType === "TOK Exhibition" ? "tok" : "essay", (lockedPreview.preview as any)?.criteria_names ?? null)}>
                  Unlock this {lockedLabel || "preview"} in full, {PRICE_LABELS.ESSAY_SINGLE}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-8">
        <CardContent className="p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type of work</Label>
              <Select value={essayType} onValueChange={(t) => { setEssayType(t); if (subject && !subjectsFor(t).includes(subject)) setSubject(""); }}>
                <SelectTrigger className="w-full data-[size=default]:h-auto min-h-11 sm:min-h-9 py-1.5 whitespace-normal text-left *:data-[slot=select-value]:line-clamp-2" aria-label="Type of work">
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
                  <SelectTrigger className="w-full data-[size=default]:h-auto min-h-11 sm:min-h-9 py-1.5 whitespace-normal text-left *:data-[slot=select-value]:line-clamp-2" aria-label="Subject">
                    <SelectValue placeholder="Choose your subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectsFor(essayType).map((s) => (
                      <SelectItem key={s} value={s}>{essayType === "IA" ? (EXTERNAL_COURSEWORK_LABELS[s] ?? s) : s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {(essayType === "EE" || (essayType === "IA" && (subject === "Psychology" || subject === "Computer Science" || subject === "Visual Arts"))) && (
              <div className="space-y-2">
                <Label>Exam session</Label>
                <Select value={examSession} onValueChange={(v) => setExamSession(v as "nov2026" | "may2027")}>
                  <SelectTrigger className="w-full data-[size=default]:h-auto min-h-11 sm:min-h-9 py-1.5 whitespace-normal text-left *:data-[slot=select-value]:line-clamp-2" aria-label="Exam session">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nov2026">Exams in November 2026, or work submitted in May 2026</SelectItem>
                    <SelectItem value="may2027">Exams in May 2027 or later</SelectItem>
                  </SelectContent>
                </Select>
                {essayType === "EE" && examSession === "may2027" && (
                  <p className="text-xs text-muted-foreground">Exams in November 2026, or checking an essay you submitted in May 2026? Choose that session for the 34-mark criteria.</p>
                )}
                {essayType === "IA" && subject === "Visual Arts" && examSession === "nov2026" && (
                  <p className="text-xs text-muted-foreground">Marked on the SL criteria, out of 30. At HL, Criterion F (connections to your own art-making, 12 marks) is not marked.</p>
                )}
                {unmarkableReason(essayType, subject, examSession) && (
                  <p className="text-xs rounded-md border border-amber-300 bg-amber-50 text-amber-900 px-2.5 py-2">{unmarkableReason(essayType, subject, examSession)}</p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="rq-input">{essayType === "TOK Exhibition" ? "Your exhibition prompt (one of the 35 prompts in the TOK guide)" : essayType === "TOK" ? "Prescribed title" : (isOral ? "Global issue (optional)" : "Research question or title (optional)")}</Label>
            <Input
              id="rq-input"
              maxLength={500}
              placeholder={essayType === "TOK Exhibition" ? "e.g. What counts as knowledge?" : essayType === "TOK" ? "The prescribed title, copied exactly" : (isOral ? "The global issue your oral explores" : "Your research question or title")}
              value={researchQuestion}
              onChange={(e) => setResearchQuestion(e.target.value)}
            />
          </div>

          {essayType === "EE" ? (
            <p className="text-xs rounded-md border border-amber-300 bg-amber-50 text-amber-900 px-2.5 py-2">
              The Extended Essay guide allows no assistance with the research, writing or proofreading beyond what your supervisor permits. Ask your supervisor before you use IBLens on your EE.
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              The IB asks students not to receive assistance beyond what the subject or TOK guide permits, so check that your teacher and your school allow outside feedback on this work before you use IBLens.
            </p>
          )}
          {essayType === "EE" && (
            <div className="space-y-2">
              <Label>
                {examSession === "may2027" ? "Reflective statement (RPF)" : "Reflections (RPPF)"}<span className="text-muted-foreground font-normal">&nbsp;(optional)</span>
              </Label>
              <Textarea
                placeholder={examSession === "may2027"
                  ? "Paste your reflective statement, up to 500 words."
                  : "Paste your three reflections, 500 words in total."}
                rows={4}
                maxLength={8000}
                className="field-sizing-fixed resize-y"
                value={reflections}
                onChange={(e) => setReflections(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                {examSession === "may2027"
                  ? "Criterion E is marked on the reflective statement from your reflection and progress form (RPF), not on the essay. An RPF that is blank, not submitted or in a language other than the essay's is awarded zero for Criterion E, so submit yours to your school either way. Leave this box empty and the report marks criteria A to D only."
                  : "Criterion E is marked on your three reflections in the reflections on planning and progress form (RPPF), not on the essay. An RPPF that is blank, not submitted or in a language other than the essay's is awarded zero for Criterion E, so submit yours to your school either way. Leave this box empty and the report marks criteria A to D only."}
              </p>
            </div>
          )}

          <div className="space-y-2">
            {anonUnlocked && (
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
                {(recheckTarget ? recheckTarget.rerunsLeft : (anonRerunsLeft ?? anonReportQ.data?.rerunsLeft ?? 2)) > 0 ? (
                  <><strong>Your report is unlocked on this device.</strong> Paste a revised version of the same work below and re-check it.
                  Two re-checks are included, within 14 days of the report opening, and they do not use a paid report.</>
                ) : (
                  <><strong>Your report is open on this device.</strong> Both re-checks for it have been used, or its 14 days have ended.</>
                )}
              </div>
            )}
            {rerunId && (
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
                <strong>Re-checking a report you bought.</strong> Paste the revised version of the same work below. This re-check is free and does not use a paid report.
              </div>
            )}
            <Label htmlFor="essay-text">{essayType === "TOK Exhibition" ? "Paste your commentary on all three objects" : essayType === "TOK" ? "Paste your TOK essay" : essayType === "EE" ? "Paste your Extended Essay" : isOral ? "Paste your oral outline or practice transcript" : "Paste your work"}</Label>
            <Textarea
              id="essay-text"
              placeholder={essayType === "TOK Exhibition" ? "Paste your commentary for all three objects, including how each links to the prompt." : "Paste the full text of your work here. A short extract can be marked, but the report is only as good as what it sees. Anything past 30,000 characters, about 5,000 words, is not passed to the AI or marked."}
              rows={10}
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              className="field-sizing-fixed resize-y"
            />
            <p className={`text-xs ${essayText.length > 30000 ? "text-amber-600 font-medium" : "text-muted-foreground"}`}>
              {countWords(essayText)} words
              {essayText.length > 0 && ` · ${essayText.length} characters`}
              {essayText.length > 30000 &&
                ` · only the first 30,000 characters are marked, so the last ${essayText.length - 30000} will not be read`}
            </p>
            {essayType === "TOK Exhibition" && (
              <p className="text-xs text-muted-foreground">Up to 950 words across the three commentaries. Images are not read, so say in each commentary what the object is.</p>
            )}
            {essayType === "TOK" && (
              <p className="text-xs text-muted-foreground">Up to 1,600 words. Examiners stop reading at the limit.</p>
            )}
            {isOral && (
              <p className="text-xs text-muted-foreground">A transcript of a practice oral that uses works and a global issue different from those of your assessed oral is marked on all four criteria: the Language A guides do not let your teacher rehearse the actual oral with you. From an outline, criteria A to C are marked and Criterion D (language) is not, because spoken language cannot be judged from notes.</p>
            )}
            {essayType === "IA" && subject === "Music" && (
              <p className="text-xs text-muted-foreground">Paste the written portfolio. Criteria A, B1 and B2 are marked on it. C1 and C2 judge the creating exercise and the performed adaptation themselves, which text cannot carry, so the report leaves them unmarked and gives the estimated mark out of the 18 marks it assessed.</p>
            )}
            {essayType === "IA" && subject === "Economics" && (
              <p className="text-xs text-muted-foreground">Paste one commentary at a time, up to 800 words each. Each commentary is its own report.</p>
            )}
            <p className="text-xs text-muted-foreground">
              Your text passes through our relay server to Anthropic, which marks it. IBLens never saves the text itself, and Anthropic deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. The report is saved and can quote short passages: without an account it is deleted after 90 days unless you buy it, and in an account it stays until you delete it. <Link href="/privacy" className="underline">Privacy</Link>
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
                  ? `You have ${credits.essayCredits} paid report${credits.essayCredits > 1 ? "s" : ""} left.`
                  : <span>You have used your free preview. <button onClick={() => openBuy("new")} className="underline font-medium cursor-pointer">Buy a report</button> to mark new work.</span>
              }
            </div>
          )}


          {/* Paid guest who bought reports for new work */}
          {paidReturn && !paidOpens && !isAuthenticated && !result && (
            <div className="text-sm p-3 rounded-lg bg-primary/5 border border-primary/30 flex items-center gap-2">
              {purchase.paid && deviceCredits > 0 ? <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-primary" /> : waitedFor > 120000 ? null : <Loader2 className="w-4 h-4 flex-shrink-0 animate-spin" />}
              <span>
                {purchase.paid && deviceCredits > 0
                  ? `Payment confirmed. This browser now has ${deviceCredits} paid ${deviceCredits === 1 ? "report" : "reports"}: paste your work above and press "Mark a new piece of work".`
                  : waitedFor > 120000
                    ? "Your payment went through but the reports have not arrived. This is on us: email glushkovim@gmail.com with your order number and we will add them or refund you."
                    : "Payment received. Adding your reports to this browser, this takes a few seconds."}
              </span>
            </div>
          )}

          {/* Paid, waiting for the webhook */}
          {paidReturn && paidOpens && !result && (
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

          {/* Anonymous: the free preview is unused, whatever else this browser has bought */}
          {!authLoading && !isAuthenticated && canAnonAnalyze && (
            <div className="text-sm p-3 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Your first preview is <strong>free</strong>, one per device or account, so check the task and subject above. {deviceCredits > 0 ? "The full report then uses one of your paid reports." : `The full report unlocks for ${PRICE_LABELS.ESSAY_SINGLE}.`}</span>
            </div>
          )}

          {/* Anonymous: already used free analysis, and has not bought anything */}
          {!authLoading && !isAuthenticated && !canAnonAnalyze && !anonUnlocked && !paidReturn && !lockedPreview && !result && (
            <div className="text-sm p-3 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
              You have used the free preview on this device. A full report for new work is {PRICE_LABELS.ESSAY_SINGLE},
              with no account needed.
            </div>
          )}

          {/* Anonymous: analyze button (first-time) */}
          {!authLoading && !isAuthenticated && canAnonAnalyze && (
            <Button
              className="w-full min-h-11 h-auto py-2.5 whitespace-normal"
              onClick={() => handleAnalyze("free")}
              disabled={isAnalyzing || !!unmarkableNow}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {analyzingLabel}
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2 shrink-0" />
                  Get my free preview
                </>
              )}
            </Button>
          )}

          {/* Guest holding credits bought without an account */}
          {!isAuthenticated && deviceCredits > 0 && (
            <Button className="w-full min-h-11 h-auto py-2.5 whitespace-normal" onClick={() => handleAnalyze("paid")} disabled={isAnalyzing || !!unmarkableNow}>
              {isAnalyzing ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{analyzingLabel}</>
              ) : (
                <><FileText className="w-4 h-4 mr-2" />Mark a new piece of work ({deviceCredits} paid {deviceCredits === 1 ? "report" : "reports"} left)</>
              )}
            </Button>
          )}

          {/* Paid guest: the two re-checks they were promised */}
          {anonUnlocked && (recheckTarget ? recheckTarget.rerunsLeft : (anonRerunsLeft ?? anonReportQ.data?.rerunsLeft ?? 2)) > 0 && (
            <Button
              className="w-full min-h-11 h-auto py-2.5 whitespace-normal"
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
                  {recheckTarget
                    ? `Re-check your revised ${deviceReportLabel(recheckTarget)} (free, ${recheckTarget.rerunsLeft} left)`
                    : `Re-check your revised version (free, ${anonRerunsLeft ?? anonReportQ.data?.rerunsLeft ?? 2} left)`}
                </>
              )}
            </Button>
          )}

          {/* Anonymous: buy a report. Also for someone who already bought one:
              their re-checks are for the same draft, a new draft is a new report. */}
          {/* Hidden while a locked preview is on screen: its own "Buy & unlock" is the button
              that opens it, and this one buys a report for different work. */}
          {!authLoading && !isAuthenticated && !canAnonAnalyze && deviceCredits === 0 && !(result as any)?.locked && (
            <Button
              className="w-full min-h-11 h-auto py-2.5 whitespace-normal"
              variant={anonUnlocked || lockedPreview ? "outline" : "default"}
              onClick={() => openBuy("new")}
              disabled={!!unmarkableNow}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              {anonUnlocked
                ? `Mark a different piece of work (${PRICE_LABELS.ESSAY_SINGLE})`
                : `Buy a report (${PRICE_LABELS.ESSAY_SINGLE})`}
            </Button>
          )}
          {!authLoading && !isAuthenticated && !canAnonAnalyze && deviceCredits === 0 && essayText.trim() && !(result as any)?.locked && (
            <p className="text-xs text-muted-foreground text-center">Your text is not kept through checkout: after paying, paste it here again and press "Mark a new piece of work".</p>
          )}

          {/* Authenticated: run analysis or buy credits */}
          {isAuthenticated && (
            <>
              <Button
                className="w-full min-h-11 h-auto py-2.5 whitespace-normal"
                onClick={() => handleAnalyze("free")}
                // A re-check is marked on its report's own session, so the form's session cannot block it.
                disabled={isAnalyzing || (!rerunId && !!unmarkableNow)}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {analyzingLabel}
                  </>
                ) : rerunId ? (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Re-check the revised version (free)
                  </>
                ) : !credits?.canAnalyzeEssay ? (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Buy a report ({PRICE_LABELS.ESSAY_SINGLE})
                  </>
                ) : credits?.freeEssayAvailable ? (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Get my free preview
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Mark this work ({credits.essayCredits} paid {credits.essayCredits === 1 ? "report" : "reports"} left)
                  </>
                )}
              </Button>
              {!rerunId && credits?.freeEssayAvailable && (credits?.essayCredits ?? 0) > 0 && (
                <Button variant="outline" className="w-full min-h-11 h-auto py-2.5 whitespace-normal" onClick={() => handleAnalyze("paid")} disabled={isAnalyzing || !!unmarkableNow}>
                  <FileText className="w-4 h-4 mr-2 shrink-0" />
                  Mark this work in full instead (uses 1 of your {credits.essayCredits} paid {credits.essayCredits === 1 ? "report" : "reports"})
                </Button>
              )}
            </>
          )}

          <PurchaseModal
            open={essayPurchaseOpen}
            onOpenChange={setEssayPurchaseOpen}
            sku="ESSAY_SINGLE"
            analysisId={isAuthenticated && buyFor === "preview" ? resultAnalysisId : null}
            unlocksPreview={buyFor === "preview"}
            previewLabel={buyFor === "preview" ? buyLabel : null}
            kind={buyFor === "preview" ? buyKind : undefined}
            criteria={buyFor === "preview" ? buyCriteria : null}
          />
          <p className="text-xs text-muted-foreground text-center">
            IBLens is independent of the International Baccalaureate and not endorsed by it. Every mark is an AI estimate, not an IB mark.{" "}
            <Link href="/resources/academic-integrity" className="underline">Using AI feedback within IB rules</Link>
          </p>
        </CardContent>
      </Card>

      {!result && (
        <>
      {/* ── Sample Report Preview ─────────────────────────────────── */}
      <div className="mb-10 rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-0.5">Sample Report</p>
            <h2 style={SERIF} className="text-lg font-bold">What a full report looks like</h2>
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full border">
            Example · Business Management IA
          </span>
        </div>

        <div className="p-6 space-y-5">
          {/* Score summary */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Estimated mark", value: "16/25", color: "text-amber-600" },
              { label: "Range in the free preview", value: "13-18", color: "text-foreground" },
              { label: "Share of marks", value: "64%", color: "text-foreground" },
            ].map((s) => (
              <div key={s.label} className="text-center p-2 sm:p-4 bg-muted/50 rounded-lg border border-border min-w-0">
                <div style={SERIF} className={`text-lg sm:text-2xl font-bold break-words leading-tight ${s.color}`}>{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Overall comment</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your IA demonstrates solid understanding of business concepts, and the supporting documents are well chosen, but their data is used only superficially.
            The main areas for improvement are the depth of analysis in Criterion D and the connection
            between your research question and conclusions.
          </p>

          {/* Criteria bars */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Criteria breakdown</p>
            {[
              { name: "Criterion A: Integration of a key concept", score: 3, max: 5, color: "bg-amber-500" },
              { name: "Criterion B: Supporting documents", score: 3, max: 4, color: "bg-emerald-500" },
              { name: "Criterion C: Selection and application of tools and theories", score: 3, max: 4, color: "bg-emerald-500" },
              { name: "Criterion D: Analysis and evaluation", score: 2, max: 5, color: "bg-red-500" },
              { name: "Criterion E: Conclusions", score: 2, max: 3, color: "bg-amber-500" },
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
              <p className="text-xs font-semibold uppercase tracking-wider text-red-600 mb-2">What is losing marks</p>
              <div className="space-y-2">
                <div className="p-3 bg-red-50 border-l-2 border-red-400 rounded-r text-sm">
                  <strong>Thin use of the documents:</strong> Criterion D needs the data in your supporting documents used to analyse and evaluate the research question.
                </div>
                <div className="p-3 bg-red-50 border-l-2 border-red-400 rounded-r text-sm">
                  <strong>Conclusion gap:</strong> your conclusions don't fully answer the research question.
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">Where marks are recoverable</p>
              <div className="space-y-2">
                <div className="p-3 bg-emerald-50 border-l-2 border-emerald-400 rounded-r text-sm">
                  <strong>Use the documents in Criterion D:</strong> bring figures from your supporting documents into the evaluation of each option.
                </div>
                <div className="p-3 bg-emerald-50 border-l-2 border-emerald-400 rounded-r text-sm">
                  <strong>Answer the question:</strong> answer your research question explicitly in the conclusion.
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">What to fix first</p>
            <ol className="space-y-1.5 text-sm list-decimal pl-5">
              <li>Use the figures in two of your supporting documents to weigh each option in Criterion D.</li>
              <li>End with a direct answer to the research question, drawn from that analysis.</li>
              <li>Label every table and chart with its source and what it shows.</li>
            </ol>
          </div>

          <div className="pt-3 border-t text-center">
            {(isAuthenticated ? !!credits?.freeEssayAvailable : canAnonAnalyze) ? (
              <>
                <p className="text-sm font-medium mb-1">↑ This is what a full report looks like, unlocked for $9.99. Your free preview shows a range of totals, usually your weakest criterion, and the top risks.</p>
                <p className="text-xs text-muted-foreground">Paste your work in the form above: <strong>the first preview is free</strong>, then $9.99 per report, with two re-checks included</p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium mb-1">↑ This is what a full report looks like.</p>
                <p className="text-xs text-muted-foreground">Paste your work in the form above: a full report is $9.99, or one of your paid reports, with two re-checks included.</p>
              </>
            )}
          </div>
        </div>
      </div>
      {/* ────────────────────────────────────────────────────────────── */}

        </>
      )}

      {/* Results */}
      {result && (
        <div ref={resultRef} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 scroll-mt-20">
          {rerunDelta && !(result as any).locked && (
            <div className="text-sm p-4 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 space-y-2">
              <p><strong>Re-check done.</strong> {rerunDelta.summary}</p>
              {rerunDelta.moved.length > 0 ? (
                <ul className="space-y-1">
                  {rerunDelta.moved.map((c) => (
                    <li key={c.name}>{c.name}: {c.before ?? "not marked"} → {c.after ?? "not marked"}{c.max ? ` out of ${c.max}` : ""}</li>
                  ))}
                </ul>
              ) : rerunDelta.compared ? (
                <p>No criterion's mark changed.</p>
              ) : null}
            </div>
          )}
          {(result as any).locked ? (
            <LockedTeaser essayText={essayText} result={result} isAuthenticated={isAuthenticated} hasPaidCredit={(credits?.essayCredits ?? 0) > 0} fingerprint={anonFp} analysisId={resultAnalysisId} onUnlocked={(full: any) => { setResult(full as EssayResult); setRerunDelta(null); }} deviceCredits={deviceCredits} deviceUnlocking={deviceUnlock.isPending} onDeviceUnlock={() => deviceUnlock.mutate({ fingerprint: anonFp })} onBuy={() => openBuy("preview", resultWork?.label ?? lockedLabel, resultWork?.kind ?? "essay", (result as any)?.criteria_names ?? null)} />
          ) : (<>
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Overall comment
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
                  <div className="text-xs text-muted-foreground mt-1">Estimated mark</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div style={SERIF} className="text-3xl font-bold">{result.band_range}</div>
                  <div className="text-xs text-muted-foreground mt-1">{(result.criteria?.length ?? 0) > 1 ? "Range shown in the free preview" : "Band"}</div>
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
                  <div className="text-xs text-muted-foreground mt-1">Share of marks</div>
                </div>
              </div>
              <div className="mb-4"><WordCheckNote check={result._wordCheck} text={essayText} /></div>
              <p className="text-sm leading-relaxed whitespace-pre-line">{decodeAndSanitize(result.overall_comment)}</p>
            </CardContent>
          </Card>

          {/* Criteria Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {result.criteria.length === 1 ? "The mark and its explanation" : "Criteria breakdown"}
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
                      style={{ width: `${typeof c.score === "number" && c.max > 0 ? (c.score / c.max) * 100 : 0}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{decodeAndSanitize(c.comment)}</p>
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
                  What is losing marks
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
                  Where marks are recoverable
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    What to fix first
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
          )}
          {/* Share Results */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share your estimate
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const text = `IBLens estimates my IB ${resultWork?.label || formWork().label} at ${result.predicted_score}/${result.max_score} against the published criteria. Free preview at iblens.com`;
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
                    const text = `IBLens estimates my IB ${resultWork?.label || formWork().label} at ${result.predicted_score}/${result.max_score} against the published criteria. Free preview at iblens.com`;
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
                    const text = `IBLens estimates my IB ${resultWork?.label || formWork().label} at ${result.predicted_score}/${result.max_score} against the published criteria. Free preview at iblens.com`;
                    navigator.clipboard.writeText(text);
                    toast.success("Copied.");
                  }}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy estimate
                </Button>
              </div>
            </CardContent>
          </Card>

          {(() => {
            const weakest = [...(result.criteria || [])]
              // A criterion that was not marked (an EE without its reflection) has no score
              // to improve on, and "null < 4" counted it as four marks on the table.
              .filter((c: any) => typeof c.score === "number" && c.max > 0 && c.score < c.max)
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
                  {(isAuthenticated || (recheckTarget ? recheckTarget.rerunsLeft : (anonRerunsLeft ?? anonReportQ.data?.rerunsLeft ?? 0)) > 0) && (
                    <p className="text-sm text-muted-foreground">Fix these in your draft using the comments above, then <strong>re-check</strong> the revised version to see how the {result.criteria.length === 1 ? "mark moves" : "marks move"}.</p>
                  )}
                  {isAuthenticated && resultAnalysisId && !rerunId && (
                    <Button asChild variant="outline" className="mt-3 min-h-11 h-auto whitespace-normal">
                      <a href={`/essay?rerun=${resultAnalysisId}&session=${examSession}&type=${encodeURIComponent(essayType)}${subject ? `&subject=${encodeURIComponent(subject)}` : ""}`}>Re-check a revised version (free, two per report)</a>
                    </Button>
                  )}
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
                      Sign in free on this device with the email you paid with, and this report moves to your dashboard, where it stays until you delete it. Your next report is <strong>{PRICE_LABELS.ESSAY_SINGLE}</strong>, or five for {PRICE_LABELS.ESSAY_PACK_5} ($5.00 each).
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
                  <Button variant="outline" size="lg" className="h-12" onClick={() => { (window as any).dataLayer?.push({ event: "recheck_cta_click", auth: "anon" }); openBuy("new"); }}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Buy another report ({PRICE_LABELS.ESSAY_SINGLE})
                  </Button>
                </div>
                <p className="text-xs text-center text-muted-foreground">7-day money-back guarantee · Secure checkout</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-6 text-center space-y-4">
                <h3 style={SERIF} className="text-xl font-bold">Mark another piece of work</h3>
                <p className="text-sm text-muted-foreground">
                  {credits?.essayCredits ? `You have ${credits.essayCredits} paid report${credits.essayCredits > 1 ? 's' : ''} left.` : 'A different piece of work needs a new report. Revisions of this one use your free re-checks.'}
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => {
                    // Still on a re-check address, the only button would re-check the old report.
                    if (rerunId) { window.location.assign("/essay"); return; }
                    setResult(null); setResultAnalysisId(null); setRerunDelta(null); window.scrollTo(0, 0);
                  }}>
                    <FileText className="w-4 h-4 mr-2" />
                    Mark another piece of work
                  </Button>
                  {!credits?.essayCredits && (
                    <Button variant="outline" onClick={() => openBuy("new")}>
                      Buy a report
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
