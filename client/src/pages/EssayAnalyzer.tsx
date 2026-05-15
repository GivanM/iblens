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
import { useState } from "react";
import { toast } from "sonner";
import {
  FileText, Loader2, AlertTriangle, TrendingUp, ArrowRight,
  CheckCircle2, XCircle, Lock, Share2, Twitter, Copy, BookmarkPlus, CreditCard
} from "lucide-react";
import { PurchaseModal } from "@/components/PurchaseModal";
import { type ProductKey } from "@shared/pricing";
import { analytics } from "@/lib/analytics";
import { trackEssaySubmitted, trackEssayUploadStarted } from "@/lib/analytics/track";

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
];

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

export default function EssayAnalyzer() {
  const { isAuthenticated } = useAuth();
  const [essayType, setEssayType] = useState("IA");
  const [subject, setSubject] = useState("Business Management");
  const [researchQuestion, setResearchQuestion] = useState("");
  const [essayText, setEssayText] = useState("");
  const [result, setResult] = useState<EssayResult | null>(null);
  const [essayPurchaseOpen, setEssayPurchaseOpen] = useState(false);

  const creditsQuery = trpc.dashboard.credits.useQuery(undefined, { enabled: isAuthenticated });
  const credits = creditsQuery.data;

  // Check if anonymous user can still analyze (only when not logged in)
  // Use client fingerprint for the check
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
  // Default to true so the button is enabled on first load (before server responds)
  const canAnonAnalyze = !isAuthenticated ? (anonCheckQuery.data?.canAnalyze ?? !localStorage.getItem('iblens_anon_used')) : false;

  // Authenticated analysis mutation
  const analyzeMutation = trpc.essay.analyze.useMutation({
    onSuccess: (data) => {
      setResult(data.result as EssayResult);
      creditsQuery.refetch();
      const r = data.result as EssayResult;
      analytics.completeEssayAnalysis(subject, `${r.predicted_score}/${r.max_score}`);
      // Push conversion events for Google Ads
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

  // Anonymous analysis mutation
  const anonAnalyzeMutation = trpc.essay.analyzeAnonymous.useMutation({
    onSuccess: (data) => {
      setResult(data.result as EssayResult);
      // Mark locally that free analysis was used
      localStorage.setItem('iblens_anon_used', 'true');
      anonCheckQuery.refetch();
      const r = data.result as EssayResult;
      analytics.completeEssayAnalysis(subject, `${r.predicted_score}/${r.max_score}`);
      // Push conversion events for Google Ads
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
      // Logged-in user flow
      if (!credits?.canAnalyzeEssay) {
        setEssayPurchaseOpen(true);
        return;
      }
      analyzeMutation.mutate({
        essayType: essayType as "IA" | "EE" | "TOK",
        subject,
        researchQuestion: researchQuestion || undefined,
        essayText,
      });
    } else {
      // Anonymous user flow
      if (!canAnonAnalyze) {
        setEssayPurchaseOpen(true);
        return;
      }
      anonAnalyzeMutation.mutate({
        essayType: essayType as "IA" | "EE" | "TOK",
        subject,
        researchQuestion: researchQuestion || undefined,
        essayText,
        clientFingerprint: anonFp,
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
    <div className="container py-8 max-w-4xl mx-auto">
      <SEOHead
        title="IB Essay Analyzer — AI Feedback & Score Prediction for IA, EE, TOK | IBLens"
        description="Get instant AI feedback on your IB essay with criterion-by-criterion scoring. First analysis free. Supports Extended Essay, Internal Assessment, TOK — all subjects."
        canonical="/essay"
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">IB Essay Analyzer</h1>
        <p className="text-muted-foreground">
          Instant AI feedback on your Extended Essay, IA, or TOK — criterion by criterion, with a predicted score.
        </p>
      </div>

      {/* ── Sample Report Preview ─────────────────────────────────── */}
      <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 overflow-hidden">
        <div className="px-6 py-4 bg-primary/10 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-0.5">Sample Report</p>
            <h2 className="text-lg font-bold">This is what you'll get for your essay</h2>
          </div>
          <span className="text-xs text-muted-foreground bg-white px-2.5 py-1 rounded-full border">
            Example · Business Management IA
          </span>
        </div>

        <div className="p-6 space-y-5">
          {/* Score summary */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Predicted Score", value: "28/36", color: "text-amber-600" },
              { label: "IB Band", value: "Band 6", color: "text-foreground" },
              { label: "Criteria Total", value: "78%", color: "text-foreground" },
            ].map((s) => (
              <div key={s.label} className="text-center p-4 bg-white rounded-lg border">
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
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
              { name: "Criterion A: Research Proposal", score: 5, max: 5, color: "bg-emerald-500" },
              { name: "Criterion B: Theoretical Framework", score: 6, max: 8, color: "bg-amber-500" },
              { name: "Criterion C: Research Methods", score: 5, max: 6, color: "bg-emerald-500" },
              { name: "Criterion D: Analysis & Discussion", score: 7, max: 11, color: "bg-amber-500" },
              { name: "Criterion E: Conclusions", score: 5, max: 6, color: "bg-emerald-500" },
            ].map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{c.name}</span>
                  <span className="font-semibold">{c.score}/{c.max}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
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
              <span>Your first analysis is <strong>completely free</strong> — no account or credit card needed.</span>
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
                  Analyzing your {essayType}… (20–40 seconds)
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
                    Analyzing your {essayType}... (20-40 seconds)
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
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                  <div className={`text-3xl font-bold ${getScoreColor(result.predicted_score, result.max_score)}`}>
                    {result.predicted_score}/{result.max_score}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Predicted Score</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-3xl font-bold">{result.band_range}</div>
                  <div className="text-xs text-muted-foreground mt-1">IB Band</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-3xl font-bold">
                    {(() => {
                      // Part 2: Transparent percentage = sum(criteria scores) / sum(criteria max) * 100
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
                    <span className="text-sm font-medium">{decodeAndSanitize(c.name)}</span>
                    <span className={`text-sm font-semibold ${getScoreColor(c.score, c.max)}`}>
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
                  <div key={i} className="p-3 bg-red-50 border-l-3 border-red-500 rounded-r-md">
                    <div className="text-sm font-medium mb-1">{decodeAndSanitize(r.title)}</div>
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
                  <div key={i} className="p-3 bg-emerald-50 border-l-3 border-emerald-500 rounded-r-md">
                    <div className="text-sm font-medium mb-1">{decodeAndSanitize(l.title)}</div>
                    <div className="text-xs text-muted-foreground">{decodeAndSanitize(l.description)}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          {result.next_steps?.length > 0 && (
            !isAuthenticated ? (
              <Card className="border-primary/20 overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    Next Steps ({result.next_steps.length} personalized actions)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* First step shown blurred as teaser */}
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

          {/* Save Results & Buy More CTA */}
          {!isAuthenticated ? (
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BookmarkPlus className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Save this report & analyze Draft 2</h3>
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
                  <Button variant="outline" size="lg" className="h-12" onClick={() => setEssayPurchaseOpen(true)}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Buy Credits ($4.99)
                  </Button>
                </div>
                <p className="text-xs text-center text-muted-foreground">7-day money-back guarantee · Crypto accepted</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="text-lg font-semibold">Analyze Another Essay</h3>
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
        </div>
      )}
    </div>
  );
}
