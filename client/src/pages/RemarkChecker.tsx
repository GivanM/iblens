import { Link } from "wouter";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { getAnonFingerprint } from "@/lib/fingerprint";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, TrendingDown, CalendarClock, ArrowRight, CheckCircle2 } from "lucide-react";
import { REMARK_FAQ } from "@shared/remarkFaq";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

// Both sessions, so the page stays true after one window closes.
const TIMELINE = [
  { date: "Early July", event: "May session results released on candidates.ibo.org" },
  { date: "15 September", event: "Last day for enquiry upon results requests for the May session, made through your school" },
  { date: "Mid-December", event: "November session results released, usually in mid-December (17 December in 2025): your coordinator confirms the date" },
  { date: "15 March", event: "Last day for enquiry upon results requests for the November session, made through your school" },
];


const QUICK_STEPS = [
  "Reading your essay\u2026",
  "Checking it against the published criteria\u2026",
  "Marking each criterion against its descriptors\u2026",
  "Working out where it sits in its band\u2026",
  "Writing up where it stands\u2026",
];


function RemarkQuickCheck() {
  const [essayType, setEssayType] = useState<"EE" | "TOK">("TOK");
  const [subject, setSubject] = useState("History");
  const [essayText, setEssayText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [fp] = useState(getAnonFingerprint);

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
  const alreadyUsed = /already used|used (your|the) free|sign in/i.test(errMsg);

  return (
    <div className="rounded-xl border-2 border-primary bg-card p-6 mb-12 shadow-sm">
      <h2 style={SERIF} className="text-2xl font-bold mb-1">Check your essay right here, free</h2>
      <p className="text-sm text-muted-foreground mb-4">Paste the exact EE or TOK essay you submitted. In about a minute you see how it reads against the published criteria and where it sits in its band. That is information for your decision, not a prediction of what a re-mark would do.</p>

      {!result && (
        <>
          <div className="flex flex-wrap gap-2 mb-3 items-center">
            {(["TOK", "EE"] as const).map((t) => (
              <button key={t} type="button" onClick={() => setEssayType(t)}
                className={"px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer " + (essayType === t ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary")}>
                {t === "TOK" ? "TOK essay" : "Extended Essay"}
              </button>
            ))}
            {essayType === "EE" && (
              <label className="w-full sm:w-auto sm:ml-auto flex items-center gap-2 text-sm text-muted-foreground">
                EE subject
                <select value={subject} onChange={(e) => setSubject(e.target.value)} className="flex-1 sm:flex-none min-h-11 text-sm border border-border rounded-md px-2 bg-background text-foreground cursor-pointer">
                  {["History","English","Economics","Biology","Chemistry","Physics","Psychology","Business Management","Mathematics","Other"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
            )}
          </div>
          <Textarea value={essayText} onChange={(e) => setEssayText(e.target.value)} rows={7}
            placeholder={essayType === "TOK" ? "Paste your full TOK essay (the version you submitted to IB)\u2026" : "Paste your full Extended Essay (the version you submitted to IB)\u2026"}
            className="mb-2 bg-background field-sizing-fixed resize-y" />
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <span className="text-xs text-muted-foreground">{essayText.trim() ? essayText.trim().split(/\s+/).length.toLocaleString("en-GB") + " words" : "Uses this device's free essay preview, one per device or account. No account needed. Full report $9.99."}</span>
            <Button disabled={essayText.trim().length < 300 || analyze.isPending}
              onClick={() => analyze.mutate({
      // Every essay checked here was submitted, so it was marked on the criteria in force through November 2026.
      spendDeviceCredit: false, essayType, subject: essayType === "TOK" ? "Theory of Knowledge" : subject, essayText, clientFingerprint: fp, examSession: "nov2026" as const })}>
              {analyze.isPending ? QUICK_STEPS[Math.min(step, QUICK_STEPS.length - 1)] : "See where my essay stands"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">IBLens never saves the essay text. It passes through our relay server to Anthropic, which marks it and deletes it within 30 days unless it is flagged under its usage policy or the law requires otherwise. <Link href="/privacy" className="underline">Privacy</Link></p>
          {essayText.trim().length > 0 && essayText.trim().length < 300 && (
            <p className="text-xs text-muted-foreground mt-2">Keep pasting: the check needs the full essay.</p>
          )}
          {alreadyUsed && (
            <p className="text-sm mt-3">You have already used the free preview on this device. A full report is $9.99 on the <Link href="/essay?session=nov2026" className="text-primary font-medium underline">grader page</Link>, with no account needed.</p>
          )}
          {errMsg && !alreadyUsed && (
            <p className="text-sm mt-3 text-destructive">{errMsg.replace(/[.\s]*$/, ".")} Please try again.</p>
          )}
        </>
      )}

      {result && (
        <div>
          <div className="flex items-baseline gap-3 mb-2">
            <span style={SERIF} className="text-3xl font-bold text-primary">Band {result.band_range}</span>
            <span className="text-sm text-muted-foreground">out of {result.max_score}</span>
          </div>
          {typeof result.near_band_edge === "boolean" && (
            <div className="rounded-lg p-4 mb-4 border border-border bg-muted/40">
              <p className="font-semibold text-sm mb-1 text-foreground">{result.near_band_edge ? "The estimate sits at the edge of its band" : "The estimate sits inside its band"}</p>
              <p className="text-sm text-muted-foreground">{result.near_band_edge
                ? "A mark at the top or bottom of a band is where a different reading is most likely to move it, in either direction."
                : "A mark in the middle of a band is less likely to change band on another reading."} This is an estimate from a language model, and it cannot tell you what a second examiner will do. Before you decide, ask your coordinator for your actual component mark and the grade boundaries.</p>
            </div>
          )}
          {result.near_band_edge === null && essayType === "TOK" && (
            <div className="rounded-lg p-4 mb-4 border border-border bg-muted/40">
              <p className="text-sm text-muted-foreground">TOK bands are two marks wide, so every mark sits at a band edge and the band alone says little about a re-mark. Ask your coordinator for your actual mark and the grade boundaries before you decide.</p>
            </div>
          )}
          {essayType === "EE" && (
            <p className="text-xs text-muted-foreground mb-3">Criterion E is marked on your reflections form, which this check does not include, so the estimate covers the other criteria only.</p>
          )}
          {result.weakest_criterion && (
            <div className="rounded-lg border border-border bg-muted/40 p-4 mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{typeof result.weakest_criterion.score === "number" ? "Your weakest criterion, full feedback" : "The start of the explanation"}</p>
              <div className="flex justify-between text-sm font-semibold mb-1"><span>{result.weakest_criterion.name}</span><span>{typeof result.weakest_criterion.score === "number" ? `${result.weakest_criterion.score}/${result.weakest_criterion.max}` : `Band ${result.band_range}`}</span></div>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.weakest_criterion.comment}</p>
            </div>
          )}
          {(result.risks || []).length > 0 && (
            <ul className="space-y-1.5 mb-4">
              {result.risks.map((r: any, i: number) => (
                <li key={i} className="text-sm"><strong className="text-foreground">{r.title}</strong></li>
              ))}
            </ul>
          )}
          <p className="text-sm text-muted-foreground mb-3">The full report, with the estimated mark, the full comments and a ranked list of fixes, unlocks for $9.99 on the grader page, where this preview is saved. Everything here is an estimate from a language model, not the IB's mark.</p>
          <Button asChild><Link href="/essay?session=nov2026">Unlock it on the grader page, $9.99</Link></Button>
        </div>
      )}
    </div>
  );
}

export default function RemarkChecker() {
  return (
    <>
      <SEOHead
        title="IB Remark: Is an Enquiry Upon Results Worth It? Check Before You Pay | IBLens"
        description="An IB re-mark can lower your grade as well as raise it. Requests close on 15 September for the May session and 15 March for November. See how the EE or TOK essay you submitted reads against the criteria before you decide."
        canonical="/remark"
      />
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">IB results and re-marks</p>
          <h1 style={SERIF} className="text-4xl font-bold leading-tight mb-4">
            Should you pay for an IB re-mark?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            A re-mark (enquiry upon results, category 1) costs a fee set by the IB, refunded only if
            your grade changes. The grade can go <em>down</em> as well as up. Your school must submit the
            request by 15 September for the May session, or by 15 March for the November session. Most
            students decide without knowing how close they are to a boundary. Here is how to decide with
            more to go on.
          </p>

          <RemarkQuickCheck />

          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            <Card>
              <CardContent className="pt-6">
                <AlertTriangle className="w-5 h-5 text-primary mb-2" />
                <p className="font-semibold text-sm mb-1">Refunded only on a grade change</p>
                <p className="text-xs text-muted-foreground">The IB publishes the fee to schools, so your coordinator can tell you what it is. There is no charge for a category 1 re-mark that changes your grade.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <TrendingDown className="w-5 h-5 text-primary mb-2" />
                <p className="font-semibold text-sm mb-1">Grades can go down</p>
                <p className="text-xs text-muted-foreground">A re-mark can raise or lower the grade, which is why your school needs your written consent before requesting one.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <CalendarClock className="w-5 h-5 text-primary mb-2" />
                <p className="font-semibold text-sm mb-1">Deadlines: 15 September and 15 March</p>
                <p className="text-xs text-muted-foreground">For the May and November sessions. Requests are made by your school, which may set an earlier internal deadline.</p>
              </CardContent>
            </Card>
          </div>

          <h2 style={SERIF} className="text-2xl font-bold mb-3">The problem: you are deciding blind</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The usual advice is to request a re-mark only when you are one or two marks from a grade
            boundary. Good advice, except that most students see only their subject grade, and
            component marks reach them through the coordinator if at all. So the decision gets made
            without the one number that matters.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Your Extended Essay and TOK essay are externally assessed, which is what a category 1
            re-mark covers. It also means you can read them against the criteria again yourself,
            right now.
          </p>

          <div className="rounded-xl border-2 border-primary bg-primary/5 p-6 mb-12">
            <h2 style={SERIF} className="text-2xl font-bold mb-3">Get more to go on before you pay</h2>
            <ol className="space-y-2 text-sm text-muted-foreground mb-5 list-decimal pl-5">
              <li>Ask your coordinator for your component mark and the grade boundaries. They decide whether a re-mark can change your grade.</li>
              <li>Paste the exact EE or TOK essay you submitted and see how it reads against the published criteria, criterion by criterion where the instrument has criteria.</li>
              <li>Read the two together. The estimate shows where the essay is strong and weak; it cannot predict what a second examiner will do.</li>
            </ol>
            <p className="text-sm text-muted-foreground mb-5">
              The first preview is free; the full report is $9.99.
            </p>
            <Button size="lg" asChild>
              <Link href="/essay?session=nov2026">Grade my submitted essay <ArrowRight className="w-4 h-4 ml-2" /></Link>
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

          <h2 style={SERIF} className="text-2xl font-bold mb-4">Re-mark or retake?</h2>
          <div className="space-y-3 mb-12">
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Re-mark:</strong> when your component mark is one or two marks from a grade boundary. No new work, but the grade can drop as well as rise.</p>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Retake:</strong> when you are several marks off, or the exam went wrong rather than the coursework. Registration for a retake has its own deadlines and fees, so ask your coordinator early.</p>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Neither:</strong> if your points already meet your offer.</p>
            </div>
          </div>

          <h2 style={SERIF} className="text-2xl font-bold mb-4">Frequently asked questions</h2>
          <div className="space-y-5 mb-12">
            {REMARK_FAQ.map((f) => (
              <div key={f.question}>
                <p className="font-semibold text-sm mb-1">{f.question}</p>
                <p className="text-sm text-muted-foreground">{f.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center border-t border-border pt-10">
            <p style={SERIF} className="text-xl font-bold mb-3">Know before you pay.</p>
            <Button size="lg" asChild>
              <Link href="/essay?session=nov2026">Mark my essay: the first preview is free <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
