import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
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
  CheckCircle2, XCircle, Lock
} from "lucide-react";
import { analytics } from "@/lib/analytics";

const IB_SUBJECTS = [
  "Business Management", "Economics", "History", "Biology", "Chemistry",
  "Physics", "Mathematics", "English A Literature", "Psychology",
  "Computer Science", "Geography", "Visual Arts", "Music",
  "Environmental Systems and Societies", "Philosophy",
];

const ESSAY_TYPES = [
  { value: "IA", label: "Internal Assessment (IA)" },
  { value: "EE", label: "Extended Essay (EE)" },
  { value: "TOK", label: "TOK Essay" },
];

function sanitizeText(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
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
};

export default function EssayAnalyzer() {
  const { isAuthenticated } = useAuth();
  const [essayType, setEssayType] = useState("IA");
  const [subject, setSubject] = useState("Business Management");
  const [researchQuestion, setResearchQuestion] = useState("");
  const [essayText, setEssayText] = useState("");
  const [result, setResult] = useState<EssayResult | null>(null);

  const creditsQuery = trpc.dashboard.credits.useQuery(undefined, { enabled: isAuthenticated });
  const credits = creditsQuery.data;

  // Check if anonymous user can still analyze (only when not logged in)
  const anonCheckQuery = trpc.essay.canAnalyzeAnonymous.useQuery(undefined, { enabled: !isAuthenticated });
  const canAnonAnalyze = anonCheckQuery.data?.canAnalyze ?? true;

  // Authenticated analysis mutation
  const analyzeMutation = trpc.essay.analyze.useMutation({
    onSuccess: (data) => {
      setResult(data.result as EssayResult);
      creditsQuery.refetch();
      const r = data.result as EssayResult;
      analytics.completeEssayAnalysis(subject, `${r.predicted_score}/${r.max_score}`);
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
      anonCheckQuery.refetch();
      const r = data.result as EssayResult;
      analytics.completeEssayAnalysis(subject, `${r.predicted_score}/${r.max_score}`);
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

    analytics.startEssayAnalysis(subject);

    if (isAuthenticated) {
      // Logged-in user flow
      if (!credits?.canAnalyzeEssay) {
        toast.error("No essay credits remaining. Purchase credits from your dashboard.");
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
        toast.error("You've used your free analysis. Sign in to purchase more credits.");
        return;
      }
      anonAnalyzeMutation.mutate({
        essayType: essayType as "IA" | "EE" | "TOK",
        subject,
        researchQuestion: researchQuestion || undefined,
        essayText,
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Essay Analyzer</h1>
        <p className="text-muted-foreground">
          Get detailed AI feedback on your IB essay with predicted scores and actionable improvements.
        </p>
      </div>

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
                  : <span>No credits remaining. <Link href="/dashboard" className="underline font-medium">Purchase credits</Link> to continue.</span>
              }
            </div>
          )}

          {/* Anonymous user banner */}
          {!isAuthenticated && (
            <div className={`text-sm p-3 rounded-lg ${
              canAnonAnalyze
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}>
              {canAnonAnalyze
                ? "No sign-in required! Your first essay analysis is completely free."
                : <span>You've used your free analysis. <a href={getLoginUrl()} className="underline font-medium">Sign in</a> to purchase more credits.</span>
              }
            </div>
          )}

          <Button
            className="w-full h-11"
            onClick={handleAnalyze}
            disabled={isAnalyzing || (isAuthenticated && !credits?.canAnalyzeEssay) || (!isAuthenticated && !canAnonAnalyze)}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing your {essayType}... (20-40 seconds)
              </>
            ) : !isAuthenticated ? (
              canAnonAnalyze ? (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Score My Essay Free — No Sign-in Needed
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Sign in to Get More Analyses
                </>
              )
            ) : !credits?.canAnalyzeEssay ? (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Purchase Credits to Analyze
              </>
            ) : credits?.freeEssayAvailable ? (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Analyze Free
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Analyze ($5)
              </>
            )}
          </Button>
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
                    {Math.round((result.predicted_score / result.max_score) * 100)}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Of Maximum</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed">{sanitizeText(result.overall_comment)}</p>
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
                    <span className="text-sm font-medium">{sanitizeText(c.name)}</span>
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
                  <p className="text-xs text-muted-foreground leading-relaxed">{sanitizeText(c.comment)}</p>
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
                    <div className="text-sm font-medium mb-1">{sanitizeText(r.title)}</div>
                    <div className="text-xs text-muted-foreground">{sanitizeText(r.description)}</div>
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
                    <div className="text-sm font-medium mb-1">{sanitizeText(l.title)}</div>
                    <div className="text-xs text-muted-foreground">{sanitizeText(l.description)}</div>
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
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.next_steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">{i + 1}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{sanitizeText(step)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
          {/* Sign-in CTA for anonymous users after seeing results */}
          {!isAuthenticated && (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-6 text-center space-y-3">
                <h3 className="text-lg font-semibold">Want more analyses?</h3>
                <p className="text-sm text-muted-foreground">
                  Sign in to save your results, track progress across essays, and purchase additional analysis credits.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button asChild>
                    <a href={getLoginUrl()}>Sign in to Continue</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/pricing">View Pricing</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
