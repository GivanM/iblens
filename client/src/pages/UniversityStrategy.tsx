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
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import {
  GraduationCap, Loader2, Lock, MapPin, Calendar,
  CheckCircle2, AlertTriangle, Quote, Target
} from "lucide-react";
import { analytics } from "@/lib/analytics";

const FIELDS_OF_STUDY = [
  "Business / Management", "Sports Management / Hospitality", "Economics",
  "Law", "Engineering", "Medicine / Pre-med", "Computer Science",
  "Psychology / Social Sciences", "Humanities / Liberal Arts", "Natural Sciences",
];

const BUDGET_OPTIONS = [
  { value: "no restrictions", label: "No restrictions" },
  { value: "need scholarship or financial aid", label: "Need scholarship / aid" },
  { value: "prefer state universities", label: "Prefer state universities" },
];

const REGIONS = [
  { value: "UK", label: "UK" },
  { value: "USA", label: "USA" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "continental Europe", label: "Europe" },
  { value: "Canada", label: "Canada" },
  { value: "Australia", label: "Australia" },
  { value: "Singapore", label: "Asia" },
  { value: "UAE", label: "Middle East" },
];

function sanitizeText(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

type University = {
  name: string;
  country: string;
  type: "safe" | "match" | "reach";
  program: string;
  typical_ib: string;
  admission_prob: number;
  why: string;
};

type UniResult = {
  profile_summary: string;
  universities: University[];
  essay_angle: string;
  roadmap: Array<{ period: string; action: string }>;
  strengths: string[];
  red_flags: string[];
};

export default function UniversityStrategy() {
  const { isAuthenticated } = useAuth();
  const [predictedScore, setPredictedScore] = useState("");
  const [averageGrade, setAverageGrade] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("Business / Management");
  const [budget, setBudget] = useState("no restrictions");
  const [selectedRegions, setSelectedRegions] = useState<string[]>(["UK"]);
  const [extracurriculars, setExtracurriculars] = useState("");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<UniResult | null>(null);

  const creditsQuery = trpc.dashboard.credits.useQuery(undefined, { enabled: isAuthenticated });
  const credits = creditsQuery.data;

  const analyzeMutation = trpc.university.analyze.useMutation({
    onSuccess: (data) => {
      setResult(data.result as UniResult);
      creditsQuery.refetch();
      analytics.completeUniversityStrategy();
      toast.success("Strategy ready!");
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  const toggleRegion = (value: string) => {
    setSelectedRegions((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
    );
  };

  const handleAnalyze = () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    if (!credits?.canAnalyzeUniversity) {
      toast.error("No university strategy credits. Purchase credits from your dashboard.");
      return;
    }
    if (!predictedScore || !averageGrade) {
      toast.error("Please fill in predicted score and average grade.");
      return;
    }
    analytics.startUniversityStrategy();
    analyzeMutation.mutate({
      predictedScore: Number(predictedScore),
      averageGrade: Number(averageGrade),
      fieldOfStudy,
      budget,
      regions: selectedRegions,
      extracurriculars: extracurriculars || undefined,
      notes: notes || undefined,
    });
  };

  const typeConfig = {
    safe: { label: "Safe", color: "bg-emerald-100 text-emerald-700 border-emerald-200", barColor: "bg-emerald-500" },
    match: { label: "Match", color: "bg-blue-100 text-blue-700 border-blue-200", barColor: "bg-blue-500" },
    reach: { label: "Reach", color: "bg-amber-100 text-amber-700 border-amber-200", barColor: "bg-amber-500" },
  };

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">University Strategy</h1>
        <p className="text-muted-foreground">
          Get a personalized university list with admission probabilities and an action roadmap.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Predicted total (out of 45)</Label>
              <Input
                type="number"
                min={24}
                max={45}
                placeholder="e.g. 34"
                value={predictedScore}
                onChange={(e) => setPredictedScore(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Average grade (1-7 scale)</Label>
              <Input
                type="number"
                min={1}
                max={7}
                step={0.1}
                placeholder="e.g. 5.2"
                value={averageGrade}
                onChange={(e) => setAverageGrade(e.target.value)}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Intended field of study</Label>
              <Select value={fieldOfStudy} onValueChange={setFieldOfStudy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FIELDS_OF_STUDY.map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Budget sensitivity</Label>
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BUDGET_OPTIONS.map((b) => (
                    <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Preferred regions</Label>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((r) => (
                <button
                  key={r.value}
                  onClick={() => toggleRegion(r.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    selectedRegions.includes(r.value)
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-background text-muted-foreground border-border hover:border-primary/30"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Extracurricular activities</Label>
            <Textarea
              placeholder="e.g. Captain of school football team, Model UN, photography..."
              rows={3}
              value={extracurriculars}
              onChange={(e) => setExtracurriculars(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Anything else to consider? (optional)</Label>
            <Input
              placeholder="e.g. want strong sports scene, prefer smaller class sizes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Credit status banner */}
          {isAuthenticated && credits && (
            <div className={`text-sm p-3 rounded-lg ${
              credits.canAnalyzeUniversity
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}>
              {credits.universityCredits > 0
                ? `You have ${credits.universityCredits} university strategy credit${credits.universityCredits > 1 ? "s" : ""}.`
                : <span>No credits remaining. <Link href="/dashboard" className="underline font-medium">Purchase credits ($9.99)</Link> to continue.</span>
              }
            </div>
          )}

          <Button
            className="w-full h-11"
            onClick={handleAnalyze}
            disabled={analyzeMutation.isPending || (isAuthenticated && !credits?.canAnalyzeUniversity)}
          >
            {analyzeMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Building your strategy... (20-40 seconds)
              </>
            ) : !isAuthenticated ? (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Sign in to Build Strategy ($9.99)
              </>
            ) : !credits?.canAnalyzeUniversity ? (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Purchase Credits to Build Strategy
              </>
            ) : (
              <>
                <GraduationCap className="w-4 h-4 mr-2" />
                Build My University Strategy ($9.99)
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Profile Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Profile Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{sanitizeText(result.profile_summary)}</p>
            </CardContent>
          </Card>

          {/* University List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                University List
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.universities.map((u, i) => {
                const config = typeConfig[u.type] || typeConfig.match;
                const prob = Math.min(100, Math.max(0, u.admission_prob || 50));
                return (
                  <div key={i} className="flex items-start gap-4 py-4 border-b last:border-b-0">
                    <Badge variant="outline" className={`${config.color} flex-shrink-0 mt-1`}>
                      {config.label}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">
                        {sanitizeText(u.name)}{" "}
                        <span className="text-sm font-normal text-muted-foreground">
                          {sanitizeText(u.country)}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-0.5">
                        {sanitizeText(u.program)} · Typical IB: {sanitizeText(u.typical_ib)}
                      </div>
                      <p className="text-sm mt-1">{sanitizeText(u.why)}</p>
                    </div>
                    <div className="text-right flex-shrink-0 min-w-[60px]">
                      <div className="text-lg font-semibold">{prob}%</div>
                      <div className="text-xs text-muted-foreground">chance</div>
                      <div className="h-1.5 bg-muted rounded-full mt-2 w-14 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${config.barColor}`}
                          style={{ width: `${prob}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Essay Angle */}
          {result.essay_angle && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Quote className="w-4 h-4" />
                  Your Essay Positioning Angle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-primary/5 border-l-3 border-primary rounded-r-md italic text-sm leading-relaxed">
                  {sanitizeText(result.essay_angle)}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Roadmap */}
          {result.roadmap?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Action Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.roadmap.map((r, i) => (
                  <div key={i} className="flex gap-4 py-2 border-b last:border-b-0">
                    <div className="text-sm font-semibold text-primary min-w-[140px] flex-shrink-0">
                      {sanitizeText(r.period)}
                    </div>
                    <p className="text-sm">{sanitizeText(r.action)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Strengths */}
          {result.strengths?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-emerald-600 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Profile Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {result.strengths.map((s, i) => (
                  <div key={i} className="p-3 bg-emerald-50 border-l-3 border-emerald-500 rounded-r-md text-sm">
                    {sanitizeText(s)}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Red Flags */}
          {result.red_flags?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-red-600 uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Concerns to Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {result.red_flags.map((f, i) => (
                  <div key={i} className="p-3 bg-red-50 border-l-3 border-red-500 rounded-r-md text-sm">
                    {sanitizeText(f)}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
