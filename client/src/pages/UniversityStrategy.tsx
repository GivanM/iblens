import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { SEOHead } from "@/components/SEOHead";
import { getLoginUrl } from "@/const";
import { PRICE_LABELS, type ProductKey } from "@shared/pricing";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PurchaseModal } from "@/components/PurchaseModal";
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
  CheckCircle2, AlertTriangle, Quote, Target, CreditCard
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

  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

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
      <SEOHead
        title="IB University Strategy — Know Your Real Chances at 9 Universities | IBLens"
        description="AI-powered IB university strategy: 9 personalised picks (Safe/Match/Reach) with admission probabilities, your essay angle, and application timeline. IB consultants charge $300+ — we do it in 2 minutes."
        canonical="/university"
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Don't apply blind.</h1>
        <p className="text-xl text-muted-foreground mb-4">
          Know your real chances at 9 universities — before you write a single word.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
          {[
            "9 universities (Safe / Match / Reach)",
            "Admission probability per school",
            "Your personal essay angle",
            "Step-by-step application timeline",
          ].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Sample Strategy Preview — full locked report */}
      {!result && (
        <div className="mb-8 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Example Report</p>
              <p className="text-sm text-muted-foreground">Aiden C. · IB Year 2 · Economics · UK/NL · Predicted: 37</p>
            </div>
            <Badge variant="outline" className="text-xs border-amber-300 text-amber-700 bg-amber-50">Sample</Badge>
          </div>

          {/* Profile Assessment */}
          <Card>
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Profile Assessment</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4">
              <p className="text-sm leading-relaxed text-foreground">
                A solid IB profile with a 37 predicted, strong HL Economics (7) and HL Mathematics (6), and clear academic direction toward Economics and Finance. The extracurricular portfolio — competitive debating and an economics research project — provides genuine differentiation. The main vulnerability is a limited international experience section, which top LSE and UCL selectors weight heavily. Realistically competitive for Russell Group; a stretch for LSE without a carefully constructed personal statement.
              </p>
            </CardContent>
          </Card>

          {/* University List */}
          <Card>
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">University List — 9 Picks</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4 space-y-3">
              {/* 3 visible universities */}
              {[
                { name: "University of Warwick", country: "UK", type: "safe" as const, program: "BSc Economics", typical_ib: "33-35", admission_prob: 88, why: "Your 37 predicted clears the typical offer comfortably. Warwick Economics is highly regarded; debate experience maps well to their analytical focus." },
                { name: "University of Edinburgh", country: "UK", type: "match" as const, program: "MA Economics", typical_ib: "36-38", admission_prob: 62, why: "Competitive but realistic given your HL Economics grade. Edinburgh values research-oriented students — your economics project is a strong fit." },
                { name: "University of Amsterdam", country: "NL", type: "match" as const, program: "BSc Economics & Business", typical_ib: "35-37", admission_prob: 71, why: "Strong English-language programme with lower selectivity than Russell Group equivalents. A near-certain offer at your profile level." },
              ].map((uni, i) => {
                const cfg = typeConfig[uni.type];
                const prob = uni.admission_prob;
                return (
                  <div key={i} className="flex items-start gap-4 py-3 border-b last:border-b-0">
                    <Badge variant="outline" className={`${cfg.color} flex-shrink-0 mt-0.5 text-xs`}>{cfg.label}</Badge>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{uni.name} <span className="font-normal text-muted-foreground">{uni.country}</span></div>
                      <div className="text-xs text-muted-foreground mt-0.5">{uni.program} · Typical IB: {uni.typical_ib}</div>
                      <p className="text-xs mt-1 text-muted-foreground">{uni.why}</p>
                    </div>
                    <div className="text-right flex-shrink-0 min-w-[52px]">
                      <div className="text-base font-semibold">{prob}%</div>
                      <div className="text-[10px] text-muted-foreground">chance</div>
                      <div className="h-1.5 bg-muted rounded-full mt-1.5 w-12 overflow-hidden">
                        <div className={`h-full rounded-full ${cfg.barColor}`} style={{ width: `${prob}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* 6 locked universities */}
              <div className="relative">
                <div className="space-y-2 blur-sm select-none pointer-events-none">
                  {[
                    { type: "match" as const, label: "University of Bristol · UK · BSc Economics" },
                    { type: "match" as const, label: "University of Glasgow · UK · MA Economics" },
                    { type: "reach" as const, label: "London School of Economics · UK · BSc Economics" },
                    { type: "reach" as const, label: "UCL · UK · BSc Economics" },
                    { type: "safe" as const, label: "Maastricht University · NL · BSc Economics & Business Economics" },
                    { type: "safe" as const, label: "University of Groningen · NL · BSc Economics" },
                  ].map((u, i) => {
                    const cfg = typeConfig[u.type];
                    return (
                      <div key={i} className="flex items-center gap-3 py-2.5 border-b last:border-b-0">
                        <Badge variant="outline" className={`${cfg.color} flex-shrink-0 text-xs`}>{cfg.label}</Badge>
                        <span className="text-sm text-muted-foreground">{u.label}</span>
                        <span className="ml-auto text-sm font-semibold text-muted-foreground">??%</span>
                      </div>
                    );
                  })}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/90 border rounded-lg px-4 py-3 flex items-center gap-2 shadow-sm">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">6 more universities in your report</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Essay Angle — fully visible (best hook) */}
          <Card>
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Quote className="w-3.5 h-3.5" /> Your Essay Positioning Angle
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4">
              <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-md italic text-sm leading-relaxed">
                "Lead with the moment your economics textbook failed you — when theory predicted one outcome and the market did the opposite. Your research project gives you a real example of this. Open every personal statement draft with that tension, then use your HL Economics grade and debate background to show you've built the tools to resolve it. Admissions tutors at Warwick and Edinburgh read 3,000+ statements; almost none open with intellectual vulnerability. Yours should."
              </div>
            </CardContent>
          </Card>

          {/* Action Roadmap — partial */}
          <Card>
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" /> Application Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4 space-y-0">
              {[
                { period: "May – June", action: "Finalise your 9-university shortlist from this report. Request official predicted grade letter from your IB coordinator." },
                { period: "July", action: "Draft personal statement v1 using the essay angle above. Aim for 600 words before editing down. Share with your economics teacher for subject-specific feedback." },
                { period: "August", action: "Research UCAS deadlines per university. UCL and LSE close early — mark 15 October in your calendar now." },
              ].map((r, i) => (
                <div key={i} className="flex gap-4 py-3 border-b">
                  <div className="text-sm font-semibold text-primary min-w-[110px] flex-shrink-0">{r.period}</div>
                  <p className="text-sm text-muted-foreground">{r.action}</p>
                </div>
              ))}
              {/* Blurred remaining steps */}
              <div className="relative">
                <div className="blur-sm select-none pointer-events-none space-y-0">
                  {[
                    { period: "September", action: "Complete UCAS form. Ask two teachers for references — brief them on your essay angle so their reference reinforces your narrative." },
                    { period: "October", action: "Submit UCAS application before 15 October for LSE/UCL. Other universities: 31 January deadline but earlier is always better." },
                    { period: "Nov – Jan", action: "Prepare for any interviews (Edinburgh, Warwick sometimes invite). Review your research project — interviewers often probe the topic in your PS." },
                    { period: "Deadline Day", action: "Ensure all documents submitted. Check email daily for offers and any requests for additional information." },
                  ].map((r, i) => (
                    <div key={i} className="flex gap-4 py-3 border-b last:border-b-0">
                      <div className="text-sm font-semibold min-w-[110px] flex-shrink-0">{r.period}</div>
                      <p className="text-sm">{r.action}</p>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/90 border rounded-lg px-4 py-2.5 flex items-center gap-2 shadow-sm">
                    <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium">4 more steps through Deadline Day</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strengths — partial */}
          <Card>
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-xs font-semibold text-emerald-600 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> Profile Strengths
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4 space-y-2">
              <div className="p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-md text-sm">HL Economics grade 7 is a direct signal to Economics departments — it removes the biggest admissions doubt before they reach your personal statement.</div>
              <div className="p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-md text-sm">Competitive debating demonstrates structured argumentation — exactly what Economics personal statements claim but rarely prove.</div>
              <div className="relative">
                <div className="blur-sm select-none pointer-events-none space-y-2">
                  <div className="p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-md text-sm">Independent economics research project sets you apart from 80% of applicants who list only classroom activities.</div>
                  <div className="p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-md text-sm">Multilingual background adds diversity signal valued by Amsterdam and other continental programmes.</div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/90 border rounded-lg px-3 py-2 flex items-center gap-1.5 shadow-sm">
                    <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium">2 more strengths</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Red Flags — fully locked */}
          <Card>
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-xs font-semibold text-red-600 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5" /> Concerns to Address
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4">
              <div className="relative">
                <div className="blur-sm select-none pointer-events-none space-y-2">
                  <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-md text-sm">HL Mathematics grade (6) is the weak spot for LSE and UCL — address this by emphasising your quantitative research project rather than raw grades.</div>
                  <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-md text-sm">No work experience in economics or finance contexts — difficult to fix now, but a brief mention of any exposure (even informal) helps.</div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/90 border rounded-lg px-3 py-2.5 flex items-center gap-2 shadow-sm">
                    <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium">Concerns to address — in your report</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center py-2 text-sm text-muted-foreground">
            ↑ This is a sample report. Fill in the form below to get yours.
          </div>
        </div>
      )}

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
                : <span>No credits remaining. <Link href="/dashboard" className="underline font-medium">Purchase credits ({PRICE_LABELS.UNIVERSITY_SINGLE})</Link> to continue.</span>
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
                Sign in to Build Strategy ({PRICE_LABELS.UNIVERSITY_SINGLE})
              </>
            ) : !credits?.canAnalyzeUniversity ? (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Purchase Credits to Build Strategy
              </>
            ) : (
              <>
                <GraduationCap className="w-4 h-4 mr-2" />
                Build My University Strategy ({PRICE_LABELS.UNIVERSITY_SINGLE})
              </>
            )}
          </Button>

          {/* Price comparison */}
          <p className="text-center text-xs text-muted-foreground/70">
            IB consultants charge $300–500 for this. We do it in 2 minutes.
          </p>

          {/* Direct purchase button when no credits */}
          {isAuthenticated && !credits?.canAnalyzeUniversity && (
            <Button
              variant="secondary"
              size="sm"
              className="w-full mt-3 text-xs"
              onClick={() => setPurchaseModalOpen(true)}
            >
              <CreditCard className="w-3 h-3 mr-1.5" />
              Buy Now ({PRICE_LABELS.UNIVERSITY_SINGLE})
            </Button>
          )}

          <PurchaseModal
            open={purchaseModalOpen}
            onOpenChange={setPurchaseModalOpen}
            sku="UNIVERSITY_SINGLE"
          />
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
