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

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

const TIMELINE = [
  { date: "6 July", event: "May session results released from 12:00 GMT on candidates.ibo.org" },
  { date: "By 29 July", event: "Register for November retakes by midnight GMT for the lowest fees" },
  { date: "15 September", event: "Last day for enquiry upon results requests for the May session, made through your school" },
  { date: "November", event: "Retake examination session" },
];


const QUICK_STEPS = [
  "Reading your essay\u2026",
  "Checking it against the official rubric\u2026",
  "Scoring each criterion like a strict examiner\u2026",
  "Weighing how close it sits to the band edge\u2026",
  "Writing your remark verdict\u2026",
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
  const alreadyUsed = /already used|used your free|sign in/i.test(errMsg);

  return (
    <div className="rounded-xl border-2 border-primary bg-card p-6 mb-12 shadow-sm">
      <h2 style={SERIF} className="text-2xl font-bold mb-1">Check your essay right here, free</h2>
      <p className="text-sm text-muted-foreground mb-4">Paste the exact EE or TOK essay you submitted. You get marking against the published criteria, the band it lands in, and a remark verdict in about a minute.</p>

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
            <span className="text-xs text-muted-foreground">{essayText.trim() ? essayText.trim().split(/\s+/).length + " words" : "No account needed. Never used to train AI. Free preview, full report $9.99."}</span>
            <Button disabled={essayText.trim().length < 300 || analyze.isPending}
              onClick={() => analyze.mutate({
      spendDeviceCredit: false, essayType, subject: essayType === "TOK" ? "Theory of Knowledge" : subject, essayText, clientFingerprint: fp })}>
              {analyze.isPending ? QUICK_STEPS[Math.min(step, QUICK_STEPS.length - 1)] : "Get my remark verdict"}
            </Button>
          </div>
          {essayText.trim().length > 0 && essayText.trim().length < 300 && (
            <p className="text-xs text-muted-foreground mt-2">Keep pasting: the verdict needs the full essay.</p>
          )}
          {alreadyUsed && (
            <p className="text-sm mt-3">You have already used your free check on this device. A full report is $9.99 on the <Link href="/essay" className="text-primary font-medium underline">analyzer page</Link>, with no account needed.</p>
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
            <div className={"rounded-lg p-4 mb-4 border " + (result.near_band_edge ? "border-amber-400 bg-amber-50" : "border-emerald-300 bg-emerald-50")}>
              <p className="font-semibold text-sm mb-1 text-foreground">{result.near_band_edge ? "Near a band edge: a re-mark has real upside" : "Solidly mid-band: a re-mark is unlikely to change the grade"}</p>
              <p className="text-sm text-muted-foreground">{result.near_band_edge ? "Your essay reads at the edge of its band. That is the profile where a fresh examiner can land differently, in either direction. If this grade matters for your offer, a re-mark is a reasonable bet." : "Your essay reads comfortably inside its band. A second examiner would most likely arrive at the same grade, so a re-mark fee is unlikely to buy a different result."}</p>
            </div>
          )}
          {result.weakest_criterion && (
            <div className="rounded-lg border border-border bg-muted/40 p-4 mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Your weakest criterion, full feedback</p>
              <div className="flex justify-between text-sm font-semibold mb-1"><span>{result.weakest_criterion.name}</span><span>{result.weakest_criterion.score}/{result.weakest_criterion.max}</span></div>
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
          <p className="text-sm text-muted-foreground mb-3">The full report, with the exact mark, comments on every criterion and a ranked list of fixes, unlocks for $9.99 on the analyzer page. This verdict is an estimate from a language model, not the IB's mark.</p>
          <Button asChild><Link href="/essay">Unlock the full report, $9.99</Link></Button>
        </div>
      )}
    </div>
  );
}

export default function RemarkChecker() {
  return (
    <>
      <SEOHead
        title="IB Remark 2026: Is an EUR Worth It? Check Before You Pay | IBLens"
        description="An IB re-mark can lower your grade as well as raise it, and May session requests close on 15 September. Mark the EE or TOK essay you submitted first and see whether it sits near a band edge before you pay."
        canonical="/remark"
      />
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">IB Results 2026</p>
          <h1 style={SERIF} className="text-4xl font-bold leading-tight mb-4">
            Should you pay for an IB remark?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            A re-mark (enquiry upon results, category 1) costs a fee set by the IB, refunded only if
            your grade changes. The grade can go <em>down</em> as well as up, and for the May session
            your school must submit the request by 15 September. Most students decide without knowing
            how close they are to a boundary. Here is how to decide with more to go on.
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
                <p className="font-semibold text-sm mb-1">Deadline: 15 September</p>
                <p className="text-xs text-muted-foreground">Requests are made by your school, which may set an earlier internal deadline.</p>
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
            <h2 style={SERIF} className="text-2xl font-bold mb-3">Run the numbers before you pay</h2>
            <ol className="space-y-2 text-sm text-muted-foreground mb-5 list-decimal pl-5">
              <li>Paste the exact EE or TOK essay you submitted to IB.</li>
              <li>IBLens grades it against the official rubric, criterion by criterion where the instrument has criteria, instructed to mark strictly rather than flatter.</li>
              <li>If it lands near a grade boundary, a remark has genuine upside. If it sits mid-band, save your money.</li>
            </ol>
            <p className="text-sm text-muted-foreground mb-5">
              The first preview is free; the full report is $9.99.
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
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Re-mark:</strong> when your essay reads close to a boundary. No new work, but the grade can drop as well as rise.</p>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">November retake:</strong> when you are several marks off, or the exam went wrong rather than the coursework. Register by 29 July for the lowest fees.</p>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Neither:</strong> if your points already meet your offer, or your essay reads solidly mid-band.</p>
            </div>
          </div>

          <h2 style={SERIF} className="text-2xl font-bold mb-4">Frequently asked questions</h2>
          <div className="space-y-5 mb-12">
            <div>
              <p className="font-semibold text-sm mb-1">How much does an IB remark cost in 2026?</p>
              <p className="text-sm text-muted-foreground">The IB publishes its enquiry upon results fees to schools rather than on its public website, so ask your coordinator for the current fee. There is no charge for a category 1 re-mark that results in a change of grade.</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Can my grade go down after a remark?</p>
              <p className="text-sm text-muted-foreground">Yes. A category 1 re-mark can raise or lower the grade, and your school must have your written consent before requesting one. That is why a re-mark makes most sense when you have reason to think you are near a boundary.</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">What is the remark deadline?</p>
              <p className="text-sm text-muted-foreground">Enquiry upon results requests for the May session can be made up to 15 September, two months after results. Your school submits them and may set an earlier deadline, so ask your coordinator as soon as results are out.</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Should I remark my EE or TOK essay?</p>
              <p className="text-sm text-muted-foreground">The EE and the TOK essay are externally assessed, so a category 1 re-mark covers them. Mark the essay you submitted with IBLens first: near a band edge, a re-mark is worth considering; solidly mid-band, it probably is not.</p>
            </div>
          </div>

          <div className="text-center border-t border-border pt-10">
            <p style={SERIF} className="text-xl font-bold mb-3">Know before you pay.</p>
            <Button size="lg" asChild>
              <Link href="/essay">Mark my essay: the first preview is free <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
