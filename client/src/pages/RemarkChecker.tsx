import { Link } from "wouter";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, TrendingDown, CalendarClock, ArrowRight, CheckCircle2 } from "lucide-react";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

const TIMELINE = [
  { date: "July 6", event: "Results released, 12:00 GMT on candidates.ibo.org" },
  { date: "July 6 - 29", event: "Cheapest window to register for November retakes" },
  { date: "~September 15", event: "Remark (EUR Category 1) requests close - submitted via your school" },
  { date: "November", event: "Retake exam session" },
  { date: "December 16", event: "November session results" },
];


const QUICK_STEPS = [
  "Reading your essay\u2026",
  "Checking it against the official rubric\u2026",
  "Scoring each criterion like a strict examiner\u2026",
  "Weighing how close it sits to the band edge\u2026",
  "Writing your remark verdict\u2026",
];

function bandVerdict(score: number, max: number, band: string) {
  const m = String(band || "").match(/(\d+)\s*[-\u2013\u2014]\s*(\d+)/);
  if (!m) return null;
  const lo = parseInt(m[1], 10);
  const hi = parseInt(m[2], 10);
  const near = score <= lo || score >= hi;
  return near
    ? { near, title: "Near a band edge \u2014 a remark has genuine upside", text: "Your essay reads at the edge of its band. This is exactly the profile where a fresh examiner read can land differently \u2014 in either direction. If this grade matters for your offer, a remark is a rational bet. Ask your coordinator about your school's deadline this week." }
    : { near, title: "Solidly mid-band \u2014 a remark likely changes nothing", text: "Your essay reads comfortably inside its band. A second examiner would most likely arrive at the same grade \u2014 this is the profile where remark fees get spent and nothing moves. Consider saving the money unless your coordinator confirms you were 1\u20132 raw marks from a boundary." };
}

function RemarkQuickCheck() {
  const [essayType, setEssayType] = useState<"EE" | "TOK">("TOK");
  const [subject, setSubject] = useState("History");
  const [essayText, setEssayText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [reportEmail, setReportEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);
  const [fp] = useState(() => {
    const key = "iblens_anon_fp";
    let v = localStorage.getItem(key);
    if (!v) { v = crypto.randomUUID(); localStorage.setItem(key, v); }
    return v;
  });

  const saveEmail = trpc.essay.saveReportEmail.useMutation({ onSuccess: () => setEmailSaved(true) });
  const analyze = trpc.essay.analyzeAnonymous.useMutation({
    onSuccess: (data: any) => {
      setResult(data.result);
      localStorage.setItem("iblens_anon_used", "true");
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ event: "essay_submit", essay_type: essayType, subject: essayType === "TOK" ? "Theory of Knowledge" : subject, source: "remark_page" });
    },
  });

  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!analyze.isPending) { setStep(0); return; }
    const id = setInterval(() => setStep((s) => s + 1), 6000);
    return () => clearInterval(id);
  }, [analyze.isPending]);

  const errMsg = analyze.error ? String(analyze.error.message || "") : "";
  const alreadyUsed = /already used|sign in/i.test(errMsg);
  const verdict = result ? bandVerdict(result.predicted_score, result.max_score, result.band_range) : null;

  return (
    <div className="rounded-xl border-2 border-primary bg-card p-6 mb-12 shadow-sm">
      <h2 style={SERIF} className="text-2xl font-bold mb-1">Check your essay right here — free</h2>
      <p className="text-sm text-muted-foreground mb-4">Paste the exact EE or TOK essay you submitted. Strict rubric grading, band placement, and a remark verdict in about a minute.</p>

      {!result && (
        <>
          <div className="flex gap-2 mb-3 items-center">
            {(["TOK", "EE"] as const).map((t) => (
              <button key={t} type="button" onClick={() => setEssayType(t)}
                className={"px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer " + (essayType === t ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary")}>
                {t === "TOK" ? "TOK essay" : "Extended Essay"}
              </button>
            ))}
            {essayType === "EE" && (
              <select value={subject} onChange={(e) => setSubject(e.target.value)} className="ml-auto text-sm border border-border rounded-md px-2 py-1.5 bg-background cursor-pointer">
                {["History","English","Economics","Biology","Chemistry","Physics","Psychology","Business Management","Mathematics","Other"].map((s) => <option key={s}>{s}</option>)}
              </select>
            )}
          </div>
          <Textarea value={essayText} onChange={(e) => setEssayText(e.target.value)} rows={7}
            placeholder={essayType === "TOK" ? "Paste your full TOK essay (the version you submitted to IB)\u2026" : "Paste your full Extended Essay (the version you submitted to IB)\u2026"}
            className="mb-2 bg-background" />
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <span className="text-xs text-muted-foreground">{essayText.trim() ? essayText.trim().split(/\s+/).length + " words" : "No account needed. Your essay is not stored. First check free."}</span>
            <Button disabled={essayText.trim().length < 300 || analyze.isPending}
              onClick={() => analyze.mutate({ essayType, subject: essayType === "TOK" ? "Theory of Knowledge" : subject, essayText, clientFingerprint: fp })}>
              {analyze.isPending ? QUICK_STEPS[Math.min(step, QUICK_STEPS.length - 1)] : "Get my remark verdict"}
            </Button>
          </div>
          {essayText.trim().length > 0 && essayText.trim().length < 300 && (
            <p className="text-xs text-muted-foreground mt-2">Keep pasting — we need the full essay for a meaningful read.</p>
          )}
          {alreadyUsed && (
            <p className="text-sm mt-3">You have already used your free check on this device. <Link href="/essay" className="text-primary font-medium underline">Sign in on the analyzer page</Link> to run more — $4.99 per essay.</p>
          )}
          {errMsg && !alreadyUsed && (
            <p className="text-sm mt-3 text-destructive">{errMsg} — please try again.</p>
          )}
        </>
      )}

      {result && (
        <div>
          <div className="flex items-baseline gap-3 mb-2">
            <span style={SERIF} className="text-4xl font-bold text-primary">{result.predicted_score}<span className="text-lg text-muted-foreground"> / {result.max_score}</span></span>
            <span className="text-sm text-muted-foreground">band {result.band_range}</span>
          </div>
          {verdict && (
            <div className={"rounded-lg p-4 mb-4 border " + (verdict.near ? "border-amber-400 bg-amber-50" : "border-emerald-300 bg-emerald-50")}>
              <p className="font-semibold text-sm mb-1 text-foreground">{verdict.title}</p>
              <p className="text-sm text-muted-foreground">{verdict.text}</p>
            </div>
          )}
          <div className="space-y-3 mb-4">
            {(result.criteria || []).map((c: any) => (
              <div key={c.name}>
                <div className="flex justify-between text-sm font-medium mb-1"><span>{c.name}</span><span>{c.score}/{c.max}</span></div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: ((c.score / c.max) * 100) + "%" }} /></div>
              </div>
            ))}
          </div>
          <details className="mb-4">
            <summary className="text-sm font-semibold text-primary cursor-pointer">Full examiner-style comments</summary>
            <div className="mt-2 space-y-2">
              {(result.criteria || []).map((c: any) => <p key={c.name} className="text-sm text-muted-foreground"><strong className="text-foreground">{c.name}:</strong> {c.comment}</p>)}
              {result.overall_comment ? <p className="text-sm text-muted-foreground">{result.overall_comment}</p> : null}
            </div>
          </details>
          {emailSaved ? (
            <p className="text-sm font-medium mb-3">Saved — your report link and improvement tips are on the way.</p>
          ) : (
            <div className="flex gap-2 mb-3">
              <Input type="email" placeholder="you@email.com \u2014 email me this report" value={reportEmail} onChange={(e) => setReportEmail(e.target.value)} className="bg-background" />
              <Button size="sm" variant="outline" disabled={!reportEmail.includes("@") || saveEmail.isPending} onClick={() => saveEmail.mutate({ email: reportEmail, fingerprint: fp })}>Save</Button>
            </div>
          )}
          <p className="text-xs text-muted-foreground">Want more? The <Link href="/essay" className="text-primary underline">full analyzer</Link> covers subject-specific IA rubrics too — $4.99 per essay after your free one.</p>
        </div>
      )}
    </div>
  );
}

export default function RemarkChecker() {
  return (
    <>
      <SEOHead
        title="IB Remark 2026 - Is an EUR Worth It? Check Before You Pay | IBLens"
        description="An IB remark costs around $100-120, your grade can go down, and the deadline is mid-September. Run your EE or TOK essay through a strict AI grader first - know if you are near a boundary before you pay."
        canonical="/remark"
      />
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">IB Results 2026</p>
          <h1 style={SERIF} className="text-4xl font-bold leading-tight mb-4">
            Should you pay for an IB remark?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            A remark (Enquiry Upon Results) costs around $100-120 per subject, your grade can go
            <em> down</em> as well as up, and you have until mid-September to decide. Most students
            decide blind. Here is how to decide with data.
          </p>

          <RemarkQuickCheck />

          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            <Card>
              <CardContent className="pt-6">
                <AlertTriangle className="w-5 h-5 text-primary mb-2" />
                <p className="font-semibold text-sm mb-1">~$100-120 per subject</p>
                <p className="text-xs text-muted-foreground">Fee is refunded only if your grade actually changes. Exact fee varies by school and region.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <TrendingDown className="w-5 h-5 text-primary mb-2" />
                <p className="font-semibold text-sm mb-1">Grades can go down</p>
                <p className="text-xs text-muted-foreground">The remark result is final - even if the new grade is lower than the original.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <CalendarClock className="w-5 h-5 text-primary mb-2" />
                <p className="font-semibold text-sm mb-1">Deadline ~Sept 15</p>
                <p className="text-xs text-muted-foreground">Requests go through your IB coordinator - schools often set earlier internal cutoffs.</p>
              </CardContent>
            </Card>
          </div>

          <h2 style={SERIF} className="text-2xl font-bold mb-3">The problem: you are deciding blind</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The standard advice is to remark only when you are 1-2 marks from a grade boundary. Good
            advice - except IB does not show you component marks up front, so most students have no
            idea how close they actually are. That turns a $110 decision into a coin flip.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Your Extended Essay and TOK essay are externally marked - exactly the components where
            remarks apply and where examiner judgement varies most. That also means they can be
            re-graded independently, right now.
          </p>

          <div className="rounded-xl border-2 border-primary bg-primary/5 p-6 mb-12">
            <h2 style={SERIF} className="text-2xl font-bold mb-3">Run the numbers before you pay</h2>
            <ol className="space-y-2 text-sm text-muted-foreground mb-5 list-decimal pl-5">
              <li>Paste the exact EE or TOK essay you submitted to IB.</li>
              <li>IBLens grades it against the official rubric, criterion by criterion - calibrated strict, not flattering.</li>
              <li>If it lands near a grade boundary, a remark has genuine upside. If it sits mid-band, save your money.</li>
            </ol>
            <p className="text-sm text-muted-foreground mb-5">
              First analysis free, then $4.99 - versus a $110 gamble with a grade that can drop.
            </p>
            <Button size="lg" asChild>
              <Link href="/essay">Grade my submitted essay <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>

          <h2 style={SERIF} className="text-2xl font-bold mb-4">Key dates after results day</h2>
          <div className="border border-border rounded-lg divide-y divide-border mb-12">
            {TIMELINE.map((t) => (
              <div key={t.date} className="flex gap-4 p-4">
                <span className="font-semibold text-sm text-primary whitespace-nowrap w-32 shrink-0">{t.date}</span>
                <span className="text-sm text-muted-foreground">{t.event}</span>
              </div>
            ))}
          </div>

          <h2 style={SERIF} className="text-2xl font-bold mb-4">Remark or retake?</h2>
          <div className="space-y-3 mb-12">
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Remark</strong> - when your essay reads close to a boundary. Fast, ~$110, no new work, but the grade can drop.</p>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">November retake</strong> - when you are several marks off or the exam went wrong, not the coursework. Register between July 6-29 for the lowest fees.</p>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Neither</strong> - if your points still meet your offer, or your essay grades solidly mid-band. Most remarks change nothing - that is why the fee is refundable only on a grade change.</p>
            </div>
          </div>

          <h2 style={SERIF} className="text-2xl font-bold mb-4">Frequently asked questions</h2>
          <div className="space-y-5 mb-12">
            <div>
              <p className="font-semibold text-sm mb-1">How much does an IB remark cost in 2026?</p>
              <p className="text-sm text-muted-foreground">An EUR Category 1 re-mark typically costs around $100-120 per subject depending on your school and region. The fee is refunded only if your grade changes.</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Can my grade go down after a remark?</p>
              <p className="text-sm text-muted-foreground">Yes. Grades can move up or down on a remark, and the new grade is final. This is why you should only remark when you have reason to believe you are near a boundary.</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">What is the remark deadline?</p>
              <p className="text-sm text-muted-foreground">Around September 15 for the May session, but requests go through your school - coordinators often set earlier internal deadlines. Ask yours this week.</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Should I remark my EE or TOK essay?</p>
              <p className="text-sm text-muted-foreground">EE and TOK are externally marked essays - the components where a fresh examiner read genuinely can differ. Grade the essay you submitted with IBLens first: near-boundary means a remark is worth considering, mid-band means it probably is not.</p>
            </div>
          </div>

          <div className="text-center border-t border-border pt-10">
            <p style={SERIF} className="text-xl font-bold mb-3">Know before you pay.</p>
            <Button size="lg" asChild>
              <Link href="/essay">Grade my essay - first one free <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
