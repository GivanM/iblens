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
import { type ProductKey } from "@shared/pricing";
import { analytics } from "@/lib/analytics";
import { trackEssaySubmitted, trackEssayUploadStarted } from "@/lib/analytics/track";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

const IB_SUBJECTS = [
  "Business Management", "Economics", "History", "Biology", "Chemistry",
  "Physics", "Mathematics", "English A: Language and Literature", "English A: Literature",
  "Psychology", "Computer Science", "Geography", "Visual Arts", "Music", "Film",
  "Environmental Systems and Societies", "Philosophy",
];

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
};


function LockedTeaser({ result, isAuthenticated, hasPaidCredit, fingerprint, analysisId, onUnlocked, onBuy }: any) {
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
        {weakest && (
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1.5">Your weakest criterion — full feedback</p>
            <div className="flex justify-between text-sm font-semibold mb-1 text-foreground"><span>{weakest.name}</span><span>{weakest.score}/{weakest.max}</span></div>
            <p className="text-sm text-muted-foreground leading-relaxed">{weakest.comment}</p>
          </div>
        )}
        {(result.risks || []).length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Top risks in this draft</p>
            <ul className="space-y-2">
              {result.risks.map((r: any, i: number) => (
                <li key={i} className="text-sm"><strong className="text-foreground">{r.title}</strong>{r.description ? <span className="text-muted-foreground"> — {r.description}</span> : null}</li>
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
        </div>
        <div className="rounded-lg bg-primary/5 border border-primary/30 p-4">
          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <p className="text-sm flex-1"><strong className="text-foreground">Unlock the full report — $4.99.</strong> Sign in first so the report is saved to your account.</p>
              <Button asChild><a href={getLoginUrl()}>Sign in to unlock</a></Button>
            </div>
          ) : hasPaidCredit ? (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <p className="text-sm flex-1"><strong className="text-foreground">You have a credit.</strong> Open the full report now.</p>
              <Button disabled={unlock.isPending} onClick={doUnlock}>{unlock.isPending ? "Unlocking…" : "Unlock full report (1 credit)"}</Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <p className="text-sm flex-1"><strong className="text-foreground">Unlock the full report — $4.99.</strong> Exact score, every criterion with comments, and your ranked fix list.</p>
              <Button onClick={onBuy}>Buy &amp; unlock — $4.99</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const ANALYZING_STEPS = [
  "Reading your essay\u2026",
  "Checking it against the official IB rubric\u2026",
  "Scoring each criterion like a strict examiner\u2026",
  "Finding the exact marks you\u2019re losing\u2026",
  "Writing your improvement plan\u2026",
  "Formatting your report \u2014 almost there\u2026",
];

export default function EssayAnalyzer() {
  const { isAuthenticated } = useAuth();
  const [essayType, setEssayType] = useState("IA");
  const [subject, setSubject] = useState("Business Management");
  const [researchQuestion, setResearchQuestion] = useState("");
  const [examSession, setExamSession] = useState<"nov2026" | "may2027">("nov2026");
  const [essayText, setEssayText] = useState("");
  const [result, setResult] = useState<EssayResult | null>(null);
  const [essayPurchaseOpen, setEssayPurchaseOpen] = useState(false);

  const creditsQuery = trpc.dashboard.credits.useQuery(undefined, { enabled: isAuthenticated });
  const credits = creditsQuery.data;

  const [anonFp] = useState(() => {
    const key = 'iblens_anon_fp';
    let fp = localStorage.getItem(key);
    if (!fp) {
      fp = crypto.randomUUID();
      localStorage.setItem(key, fp);
    }
    return fp;
  });
  const anonCheckQuery = trpc.essay.canAnalyzeAnonymous.useQuery(
    { clientFingerprint: anonFp },
    { enabled: !isAuthenticated }
  );
  const canAnonAnalyze = !isAuthenticated ? (anonCheckQuery.data?.canAnalyze ?? !localStorage.getItem('iblens_anon_used')) : false;

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
        toast.success("Free analysis complete! Future analyses cost $5.");
      } else {
        toast.success("Analysis complete!");
      }
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  const anonAnalyzeMutation = trpc.essay.analyzeAnonymous.useMutation({
    onSuccess: (data) => {
      setResult(data.result as EssayResult);
      setLastAnalysisId(null);
      localStorage.setItem('iblens_anon_used', 'true');
      anonCheckQuery.refetch();
      const r = data.result as EssayResult;
      analytics.completeEssayAnalysis(subject, `${r.predicted_score}/${r.max_score}`);
      const wordCount = essayText.split(/\s+/).filter(Boolean).length;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'essay_submit', essay_type: essayType, subject, word_count: wordCount });
      window.dataLayer.push({ event: 'sign_up', method: 'free_essay_analysis' });
      toast.success("Free analysis complete! Sign in to save results and get more analyses.");
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  const isAnalyzing = analyzeMutation.isPending || anonAnalyzeMutation.isPending;

  const [reportEmail, setReportEmail] = useState("");
  const [reportEmailSaved, setReportEmailSaved] = useState(false);
  const saveEmailMutation = trpc.essay.saveReportEmail.useMutation({
    onSuccess: () => setReportEmailSaved(true),
    onError: () => toast.error("Could not save your email \u2014 please try again."),
  });

  const [lastAnalysisId, setLastAnalysisId] = useState<number | null>(null);
  const lockedQ = trpc.essay.lockedReport.useQuery(
    { fingerprint: anonFp },
    { enabled: isAuthenticated && !result }
  );
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

  const handleAnalyze = () => {
    if (essayText.length < 150) {
      toast.error("Please paste at least 200 words for meaningful analysis.");
      return;
    }

    const wordCount = essayText.split(/\s+/).filter(Boolean).length;
    const isFreeFirst = !isAuthenticated ? canAnonAnalyze : (credits?.freeEssayAvailable === true);
    trackEssayUploadStarted(subject, essayType);
    trackEssaySubmitted(subject, essayType, wordCount, !!isFreeFirst);
    analytics.startEssayAnalysis(subject);

    if (isAuthenticated) {
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
        examSession,
      });
    } else {
      if (!canAnonAnalyze) {
        setEssayPurchaseOpen(true);
        return;
      }
      const anonParams = getApiEssayParams(essayType, subject);
      anonAnalyzeMutation.mutate({
        essayType: anonParams.essayType,
        subject: anonParams.subject,
        researchQuestion: researchQuestion || undefined,
        essayText,
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
        title="IB Essay Grader & Checker — AI Feedback for IA, EE & TOK | IBLens"
        description="Free IB essay grader and checker. AI scores your IA, Extended Essay, or TOK against official IB rubrics — criterion by criterion, with a predicted grade. First analysis free."
        canonical="/essay"
      />
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Essay Analyzer</p>
        <h1 style={SERIF} className="text-4xl font-bold mb-3">IB Essay Analyzer</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Instant AI feedback on your Extended Essay, IA, or TOK — criterion by criterion, with a predicted score.
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
              { label: "Predicted Score", value: "18/25", color: "text-amber-600" },
              { label: "IB Band", value: "Band 6", color: "text-foreground" },
              { label: "Criteria Total", value: "72%", color: "text-foreground" },
            ].map((s) => (
              <div key={s.label} className="text-center p-4 bg-muted/50 rounded-lg border border-border">
                <div style={SERIF} className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Your IA demonstrates solid understanding of business concepts with good use of primary research.
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
              { name: "Criterion D: Analysis and evaluation", score: 4, max: 5, color: "bg-amber-500" },
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
                  <strong>Weak analysis depth</strong> — Criterion D needs more application of business models to your data.
                </div>
                <div className="p-3 bg-red-50 border-l-2 border-red-400 rounded-r text-sm">
                  <strong>Conclusion gap</strong> — Your conclusions don't fully answer the research question.
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">Quick Wins</p>
              <div className="space-y-2">
                <div className="p-3 bg-emerald-50 border-l-2 border-emerald-400 rounded-r text-sm">
                  <strong>+2 marks possible</strong> — Add comparative analysis using one more business tool.
                </div>
                <div className="p-3 bg-emerald-50 border-l-2 border-emerald-400 rounded-r text-sm">
                  <strong>Easy fix</strong> — Restate your research question explicitly in the conclusion.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t text-center">
            <p className="text-sm font-medium mb-1">↑ This is the depth of feedback you'll get for YOUR essay</p>
            <p className="text-xs text-muted-foreground">Paste your essay below → <strong>first one free</strong>, then $4.99/analysis</p>
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
            {essayType !== "TOK Exhibition" && (
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

            {(essayType === "EE" || (essayType === "IA" && (subject === "Psychology" || subject === "Computer Science"))) && (
              <div className="space-y-2">
                <Label>Exam session</Label>
                <Select value={examSession} onValueChange={(v) => setExamSession(v as "nov2026" | "may2027")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nov2026">May / Nov 2026 — current syllabus</SelectItem>
                    <SelectItem value="may2027">May 2027 — new syllabus</SelectItem>
                  </SelectContent>
                </Select>
                {essayType === "EE" && examSession === "nov2026" && (
                  <p className="text-xs text-muted-foreground">Writing your EE for May 2027 (started the DP in 2025)? Switch to the new 30-mark criteria.</p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Research question / title</Label>
            <Input
              placeholder="e.g. To what extent did Apple's marketing strategy contribute to its growth in 2015-2020?"
              value={researchQuestion}
              onChange={(e) => setResearchQuestion(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Paste your essay or IA text</Label>
            <Textarea
              placeholder="Paste the full text of your work here. Minimum 200 words for a meaningful analysis."
              rows={10}
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              className="resize-y"
            />
            <p className="text-xs text-muted-foreground">
              {essayText.split(/\s+/).filter(Boolean).length} words
              {essayText.length > 0 && ` · ${essayText.length} characters`}
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
                ? "Your first essay analysis is free!"
                : credits.essayCredits > 0
                  ? `You have ${credits.essayCredits} essay credit${credits.essayCredits > 1 ? "s" : ""} remaining.`
                  : <span>No credits remaining. <button onClick={() => setEssayPurchaseOpen(true)} className="underline font-medium cursor-pointer">Purchase credits</button> to continue.</span>
              }
            </div>
          )}

          {/* Anonymous: first-time free analysis banner */}
          {!isAuthenticated && canAnonAnalyze && (
            <div className="text-sm p-3 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Every essay gets a <strong>free preview</strong> — the full report unlocks for $4.99.</span>
            </div>
          )}

          {/* Anonymous: already used free analysis */}
          {!isAuthenticated && !canAnonAnalyze && (
            <div className="text-sm p-3 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
              You've used your free analysis.{" "}
              <a href={getLoginUrl()} className="underline font-medium">Sign in</a> to get more — starting at $4.99.
            </div>
          )}

          {/* Anonymous: analyze button (first-time) */}
          {!isAuthenticated && canAnonAnalyze && (
            <Button
              className="w-full h-11"
              onClick={handleAnalyze}
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
                  Analyze Free — No Account Needed
                </>
              )}
            </Button>
          )}

          {/* Anonymous: buy credits after free used */}
          {!isAuthenticated && !canAnonAnalyze && (
            <Button className="w-full h-11" onClick={() => setEssayPurchaseOpen(true)}>
              <CreditCard className="w-4 h-4 mr-2" />
              Buy Credits to Analyze ($4.99)
            </Button>
          )}

          {/* Authenticated: run analysis or buy credits */}
          {isAuthenticated && (
            <>
              <Button
                className="w-full h-11"
                onClick={handleAnalyze}
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
                    Analyze ($5)
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
      {isAuthenticated && !result && lockedQ.data?.exists && !lockedQ.data.unlocked && (
        <Card className="border-primary/40 bg-primary/5">
          <CardContent className="pt-6 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1">
              <p className="text-sm font-semibold">You have a locked report from this device</p>
              <p className="text-xs text-muted-foreground">{lockedQ.data.essayType} · {lockedQ.data.subject} · Band {lockedQ.data.band}</p>
            </div>
            {(credits?.essayCredits ?? 0) > 0 ? (
              <Button size="sm" disabled={pageUnlock.isPending} onClick={() => pageUnlock.mutate({ fingerprint: anonFp })}>
                {pageUnlock.isPending ? "Unlocking…" : "Unlock full report (1 credit)"}
              </Button>
            ) : (
              <Button size="sm" onClick={() => setEssayPurchaseOpen(true)}>Buy &amp; unlock — $4.99</Button>
            )}
          </CardContent>
        </Card>
      )}

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {(result as any).locked ? (
            <LockedTeaser result={result} isAuthenticated={isAuthenticated} hasPaidCredit={(credits?.essayCredits ?? 0) > 0} fingerprint={anonFp} analysisId={lastAnalysisId} onUnlocked={(full: any) => setResult(full as EssayResult)} onBuy={() => setEssayPurchaseOpen(true)} />
          ) : (<>
          {!isAuthenticated && (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-6">
                {reportEmailSaved ? (
                  <p className="text-sm font-medium flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Saved — we’ll email your report link and improvement tips.</p>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <div className="flex-1">
                      <p className="text-sm font-semibold mb-1">Keep this report</p>
                      <p className="text-xs text-muted-foreground">Get your criterion breakdown and targeted improvement tips by email.</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Input type="email" placeholder="you@email.com" value={reportEmail} onChange={(e) => setReportEmail(e.target.value)} className="sm:w-56 bg-background" />
                      <Button size="sm" disabled={!reportEmail.includes("@") || saveEmailMutation.isPending} onClick={() => saveEmailMutation.mutate({ email: reportEmail, fingerprint: anonFp })}>Save</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
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
                    Scored against official IB rubric: {result._rubricLabel}
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
                  <div className="text-xs text-muted-foreground mt-1">IB Band</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div style={SERIF} className="text-3xl font-bold">
                    {(() => {
                      const sumScores = result.criteria.reduce((a, c) => a + c.score, 0);
                      const sumMax = result.criteria.reduce((a, c) => a + c.max, 0);
                      return sumMax > 0 ? Math.round((sumScores / sumMax) * 100) : 0;
                    })()}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Criteria Total</div>
                </div>
              </div>
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
                    <span className={`text-sm font-bold ${getScoreColor(c.score, c.max)}`}>
                      {c.score}/{c.max}
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
            !isAuthenticated ? (
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
                      Sign in free to save this report and see all {result.next_steps.length} specific steps to raise your score.
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
                    const text = `I just scored ${result.predicted_score}/${result.max_score} (Band ${result.band_range}) on my IB ${essayType} in ${subject} using IBLens! 🎓 Get your free analysis at iblens.com`;
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
                    const text = `I just scored ${result.predicted_score}/${result.max_score} (Band ${result.band_range}) on my IB ${essayType} in ${subject} using IBLens! 🎓 Get your free analysis at iblens.com`;
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
                    const text = `I scored ${result.predicted_score}/${result.max_score} (Band ${result.band_range}) on my IB ${essayType} in ${subject}. Free analysis at iblens.com`;
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
                      <li key={c.name} className="text-sm text-muted-foreground"><strong className="text-foreground">{c.name}</strong> — {c.score}/{c.max} now, +{c.max - c.score} available</li>
                    ))}
                  </ul>
                  <p className="text-sm text-muted-foreground">Fix these in your draft using the comments above, then run a <strong>re-check</strong> — you will see exactly which criteria moved and by how much. That before/after delta is what an $80/hr tutor charges for.</p>
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
                    <h3 style={SERIF} className="font-bold text-xl mb-1">Save this report & analyze Draft 2</h3>
                    <p className="text-sm text-muted-foreground">
                      Sign in free to save your results and unlock your full action plan. Next analysis is <strong>$4.99</strong> — or a 5-pack for $19.99 ($4 each).
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Button size="lg" asChild className="h-12">
                    <a href={getLoginUrl()}>
                      <BookmarkPlus className="w-4 h-4 mr-2" />
                      Save Report — Free
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="h-12" onClick={() => { (window as any).dataLayer?.push({ event: "recheck_cta_click", auth: "anon" }); setEssayPurchaseOpen(true); }}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Buy Credits ($4.99)
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
