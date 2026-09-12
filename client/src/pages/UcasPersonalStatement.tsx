import { useState, useMemo, useEffect } from "react";
import { getAnonFingerprint } from "@/lib/fingerprint";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Lock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { PurchaseModal } from "@/components/PurchaseModal";
import {
  UCAS_QUESTIONS,
  UCAS_TOTAL_CHAR_LIMIT,
  UCAS_MIN_CHARS_PER_ANSWER,
} from "@shared/ucas";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

// the device id lives in one place now: lib/fingerprint.ts

const STATUS_STYLE: Record<string, string> = {
  strong: "bg-emerald-100 text-emerald-800",
  adequate: "bg-amber-100 text-amber-800",
  weak: "bg-rose-100 text-rose-800",
};

export default function UcasPersonalStatement() {
  const [course, setCourse] = useState("");
  const [universityType, setUniversityType] = useState<"typical" | "competitive">("typical");
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [result, setResult] = useState<any>(null);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [limitReached, setLimitReached] = useState<string | null>(null);

  const total = answers.q1.length + answers.q2.length + answers.q3.length;
  const remaining = UCAS_TOTAL_CHAR_LIMIT - total;

  // The device id the free review and the purchase are both tied to.
  const [anonFp] = useState(getAnonFingerprint);

  // Coming back from checkout: the webhook has already unlocked the review.
  const paidReturn = typeof window !== "undefined"
    && new URLSearchParams(window.location.search).get("payment") === "success";
  const paidReviewQ = trpc.essay.anonymousReport.useQuery(
    { fingerprint: anonFp, kind: "ucas" },
    { enabled: paidReturn && !result, refetchInterval: (d: any) => (d?.unlocked ? false : 4000) }
  );
  useEffect(() => {
    if (paidReviewQ.data?.unlocked && !result) {
      setResult(paidReviewQ.data.result);
      setLimitReached(null);
      toast.success("Payment confirmed. Your full review is open below.");
    }
  }, [paidReviewQ.data, result]);

  // Two re-checks of the same statement, included with the purchase.
  const [rechecksLeft, setRechecksLeftState] = useState<number | null>(null);
  const setRechecksLeft = setRechecksLeftState;
  const unlockedQ = trpc.essay.anonymousReport.useQuery({ fingerprint: anonFp, kind: "ucas" }, { enabled: !paidReturn });
  const isUnlocked = unlockedQ.data?.unlocked === true || paidReviewQ.data?.unlocked === true;
  // Show the review that was paid for when the reader comes back. Without this
  // the page said "your full review is unlocked on this device" and then showed
  // an empty form, and the only way to see it again was to spend a re-check.
  useEffect(() => {
    if (unlockedQ.data?.unlocked && !result) setResult((unlockedQ.data as any).result);
  }, [unlockedQ.data, result]);
  const serverRechecks = (unlockedQ.data as any)?.rerunsLeft ?? (paidReviewQ.data as any)?.rerunsLeft ?? null;
  const effectiveRechecks = rechecksLeft ?? serverRechecks;
  const recheck = trpc.essay.rerunAnonymous.useMutation({
    onSuccess: (d: any) => {
      setResult(d.result);
      setRechecksLeft(d.rerunsLeft);
      toast.success(`Re-check complete. ${d.rerunsLeft} free re-check(s) left for this statement.`);
    },
    onError: (e: any) => toast.error(e.message || "Re-check unavailable"),
  });

  const { isAuthenticated } = useAuth();
  const creditsQ = trpc.dashboard.credits.useQuery(undefined, { enabled: isAuthenticated });
  const hasCredit = (creditsQ.data?.essayCredits ?? 0) > 0;
  // Credits bought without an account live on the device, and this page could not
  // see them: a guest who had paid was told the review costs $9.99.
  const deviceCreditsQ = trpc.essay.deviceCredits.useQuery(
    { fingerprint: anonFp },
    { enabled: !isAuthenticated }
  );
  const deviceCredits = isAuthenticated ? 0 : (deviceCreditsQ.data?.credits ?? 0);
  const canPayHere = hasCredit || deviceCredits > 0;

  const review = trpc.essay.analyzeUcasAnonymous.useMutation({
    onSuccess: (data: any) => setResult(data.result),
    onError: (err: any) => {
      const msg = err?.message || "Review failed";
      if (/free review/i.test(msg)) setLimitReached(msg);
      else toast.error(msg);
    },
  });

  // A free review is one per device, so submitting a draft UCAS would reject outright is the
  // easiest way to waste it. Block it and say exactly what is wrong.
  const blockers = useMemo(() => {
    const out: string[] = [];
    if (course.trim().length < 2) out.push("Tell us which course you are applying for.");
    UCAS_QUESTIONS.forEach((q, i) => {
      const len = (answers as any)[q.id].length;
      if (len === 0) out.push(`Question ${i + 1} is empty.`);
      else if (len < UCAS_MIN_CHARS_PER_ANSWER)
        out.push(`Question ${i + 1} is ${len} characters; UCAS requires at least ${UCAS_MIN_CHARS_PER_ANSWER}.`);
    });
    if (total > UCAS_TOTAL_CHAR_LIMIT)
      out.push(`Your answers are ${total - UCAS_TOTAL_CHAR_LIMIT} characters over the ${UCAS_TOTAL_CHAR_LIMIT} limit.`);
    return out;
  }, [course, answers, total]);

  const canSubmit = blockers.length === 0 && !review.isPending;

  return (
    <div className="container max-w-3xl mx-auto py-10 px-4 space-y-6">
      <SEOHead
        title="UCAS Personal Statement Checker: New Three-Question Format 2026 | IBLens"
        description="Check your UCAS personal statement against the format used from 2026 entry: three questions, 4,000 characters, 350 minimum per answer. Evidence-based feedback on each answer from an admissions-tutor perspective. Free preview, no account."
        canonical="/ucas-personal-statement"
      />

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">UCAS 2026 format</p>
        <h1 style={SERIF} className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          UCAS Personal Statement Checker
        </h1>
        <p className="text-muted-foreground">
          From 2026 entry the personal statement is three separate questions sharing one 4,000-character
          budget, with a 350-character minimum per answer. Paste your draft answers and get a read on
          each one: what a tutor would credit, what they would look for and not find, and what to fix
          first. No score, UCAS publishes no mark scheme, and inventing one would not help you.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground leading-relaxed">
        <strong className="text-foreground">Before you paste anything.</strong> UCAS is explicit that
        submitting text generated by an AI tool as your own can be treated as cheating, and submitted
        statements are checked for similarity against previously submitted work. This tool gives you
        feedback on your own writing and deliberately never hands you sentences to copy. We do not
        publish your statement, do not train models on it, and do not feed it to any similarity
        database. Do not post your statement anywhere public either, that is what puts it into
        similarity checks. <Link href="/resources/academic-integrity" className="underline">How to use AI feedback safely</Link>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="course">Course you are applying for</Label>
              <Input
                id="course"
                placeholder="e.g. Economics, Medicine, History"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Where you are applying</Label>
              <Select value={universityType} onValueChange={(v) => setUniversityType(v as any)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="typical">A typical applicant pool</SelectItem>
                  <SelectItem value="competitive">Highly competitive (Oxbridge, Medicine, LSE…)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {UCAS_QUESTIONS.map((q, i) => {
            const val = (answers as any)[q.id] as string;
            const short = val.length > 0 && val.length < UCAS_MIN_CHARS_PER_ANSWER;
            return (
              <div key={q.id} className="space-y-2">
                <Label htmlFor={q.id}>
                  Question {i + 1}: {q.question}
                </Label>
                <p className="text-xs text-muted-foreground">{q.looksFor}</p>
                <Textarea
                  id={q.id}
                  rows={6}
                  placeholder="Paste your answer…"
                  value={val}
                  onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                />
                <p className={`text-xs ${short ? "text-rose-600" : "text-muted-foreground"}`}>
                  {val.length} characters
                  {short && ` · UCAS requires at least ${UCAS_MIN_CHARS_PER_ANSWER}`}
                </p>
              </div>
            );
          })}

          <div className={`text-sm rounded-lg p-3 ${remaining < 0 ? "bg-rose-50 text-rose-800" : "bg-muted/50"}`}>
            <strong>{total}</strong> of {UCAS_TOTAL_CHAR_LIMIT} characters used
            {remaining >= 0 ? ` · ${remaining} left` : ` · ${Math.abs(remaining)} over the limit`}
          </div>

          {limitReached && (
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-3">
              <p className="text-sm"><strong className="text-foreground">{limitReached}</strong></p>
              <p className="text-xs text-muted-foreground">
                A full review covers all three answers, the issues across the statement as a whole and a
                ranked revision list, plus two free re-checks of this statement within 14 days.
              </p>
              <Button size="sm" onClick={() => setPurchaseOpen(true)}>Unlock a full review, $9.99</Button>
            </div>
          )}

          {blockers.length > 0 && (total > 0 || course.length > 0) && (
            <ul className="text-xs text-amber-700 space-y-1">
              {blockers.map((b, i) => (
                <li key={i} className="flex gap-2"><AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />{b}</li>
              ))}
            </ul>
          )}

          {isUnlocked && (
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm mb-3">
              <strong>Your full review is unlocked on this device.</strong> Revise the answers above and re-check them.
              Two re-checks are included for 14 days and cost nothing.
            </div>
          )}

          <Button
            size="lg"
            className="w-full"
            disabled={blockers.length > 0 || review.isPending || recheck.isPending}
            onClick={() => {
              // Re-checks belong to the review that was bought. Once they are gone,
              // a new statement is a new review, not a dead button.
              if (isUnlocked && (effectiveRechecks === null || effectiveRechecks > 0)) {
                recheck.mutate({ fingerprint: anonFp, answers });
                return;
              }
              if (isUnlocked) {
                review.mutate({
                  course: course.trim(), universityType,
                  q1: answers.q1, q2: answers.q2, q3: answers.q3,
                  clientFingerprint: anonFp,
                  spendCredit: hasCredit,
                  spendDeviceCredit: !hasCredit && deviceCredits > 0,
                });
                return;
              }
              review.mutate({
                course: course.trim(),
                universityType,
                q1: answers.q1,
                q2: answers.q2,
                q3: answers.q3,
                clientFingerprint: anonFp,
                // Only when the button says so, and it says so only when there is
                // a credit to spend.
                spendCredit: hasCredit,
                spendDeviceCredit: !hasCredit && deviceCredits > 0,
              });
            }}
          >
            {review.isPending || recheck.isPending ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Reading your statement…</>
            ) : isUnlocked && effectiveRechecks === 0 ? (
              "Review a new statement (1 credit)"
            ) : isUnlocked ? (
              `Re-check my statement (free${effectiveRechecks !== null ? `, ${effectiveRechecks} left` : ""})`
            ) : canPayHere ? (
              `Review my statement in full (1 ${hasCredit ? "credit" : "paid report"})`
            ) : (
              "Review my statement, free"
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardContent className="pt-6 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                {isUnlocked || result.answers ? "Full review" : "Free preview"}
              </p>
              <h2 style={SERIF} className="text-2xl font-bold mb-2">{result.verdict}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.verdict_reason}</p>
            </div>

            {(result.mechanics || result._mechanics) && (
              <div className="rounded-lg border p-4 space-y-2">
                <p className="text-sm font-semibold">Against the UCAS limits</p>
                {(result.mechanics || result._mechanics).perAnswer.map((a: any) => (
                  <div key={a.id} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{a.id.toUpperCase()}</span>
                    <span className={a.meetsMinimum ? "" : "text-rose-600 font-medium"}>
                      {a.chars} characters · {a.shareOfTotal}% of what you have written
                      {!a.meetsMinimum && ` · below the ${UCAS_MIN_CHARS_PER_ANSWER} minimum`}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between text-sm border-t pt-2">
                  <span className="text-muted-foreground">Total</span>
                  <span>{(result.mechanics || result._mechanics).totalChars} of {UCAS_TOTAL_CHAR_LIMIT}</span>
                </div>
                {(result.mechanics || result._mechanics).problems?.map((p: string, i: number) => (
                  <p key={i} className="text-xs text-amber-700 flex gap-2"><AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />{p}</p>
                ))}
                {(result.mechanics || result._mechanics).problems?.length === 0 && (
                  <p className="text-xs text-emerald-700 flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />Lengths are within the UCAS rules.</p>
                )}
              </div>
            )}

            {result.sample_answer && (
              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">
                    {result.sample_answer.id?.toUpperCase()}, your weakest answer, in full
                  </p>
                  <Badge className={STATUS_STYLE[result.sample_answer.status] || ""}>{result.sample_answer.status}</Badge>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">What works</p>
                  <p className="text-sm leading-relaxed">{result.sample_answer.working}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">What a tutor would miss here</p>
                  <p className="text-sm leading-relaxed">{result.sample_answer.missing}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Fix this first</p>
                  <p className="text-sm leading-relaxed">{result.sample_answer.fix}</p>
                </div>
              </div>
            )}

            {result.answers?.length > 0 && (
              <div className="space-y-4">
                {result.answers.map((a: any) => (
                  <div key={a.id} className="rounded-lg border p-4 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">
                        {a.id?.toUpperCase()}: {UCAS_QUESTIONS.find((q) => q.id === a.id)?.question.slice(0, 70) || "Answer"}
                      </p>
                      <Badge className={STATUS_STYLE[a.status] || ""}>{a.status}</Badge>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">What works</p>
                      <p className="text-sm leading-relaxed">{a.working}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">What a tutor cannot find</p>
                      <p className="text-sm leading-relaxed">{a.missing}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Change this first</p>
                      <p className="text-sm leading-relaxed">{a.fix}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {result.statement_level?.length > 0 && (
              <div className="rounded-lg border p-4 space-y-3">
                <p className="text-sm font-semibold">Across the statement as a whole</p>
                {result.statement_level.map((issue: any, i: number) => (
                  <div key={i}>
                    <p className="text-sm font-medium">{issue.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{issue.description}</p>
                  </div>
                ))}
              </div>
            )}

            {result.subject_fit && (
              <div className="rounded-lg border p-4">
                <p className="text-sm font-semibold mb-1">Does this read as an application for {result._course || course}?</p>
                <p className="text-sm leading-relaxed">{result.subject_fit}</p>
              </div>
            )}

            {result.next_steps?.length > 0 && (
              <div className="rounded-lg border p-4">
                <p className="text-sm font-semibold mb-2">Revision list, most valuable first</p>
                <ol className="space-y-2 list-decimal pl-5">
                  {result.next_steps.map((step: string, i: number) => (
                    <li key={i} className="text-sm leading-relaxed">{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {!result.answers && (
            <div className="rounded-lg bg-muted/40 p-4 space-y-2">
              <p className="text-sm font-semibold">In the full review</p>
              <ul className="space-y-1.5">
                {result.other_answers?.map((a: any) => (
                  <li key={a.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    {a.id?.toUpperCase()} in full, currently rated <strong className="font-medium">{a.status}</strong>
                  </li>
                ))}
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  {result.statement_level_count} issue(s) across the statement as a whole
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-3.5 h-3.5 shrink-0" />How convincingly this reads as an application for {result.course}
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-3.5 h-3.5 shrink-0" />Your ranked revision list
                </li>
              </ul>
              <div className="pt-3 space-y-2">
                <Button className="w-full sm:w-auto" onClick={() => setPurchaseOpen(true)}>
                  Unlock the full review, $9.99
                </Button>
                <p className="text-xs text-muted-foreground">
                  Includes two free re-checks of this statement within 14 days, so you can revise and see
                  whether the changes landed. No subscription. <Link href="/pricing" className="underline">Pricing</Link>
                </p>
              </div>
            </div>
            )}

            <p className="text-xs text-muted-foreground border-t pt-4">
              IBLens gives you feedback on writing that is yours. UCAS is explicit that submitting text generated
              by an AI tool as your own can be treated as cheating, and submitted statements are checked for
              similarity against previously submitted work. Never paste our wording into your application, and do
              not post your statement online. See <Link href="/resources/academic-integrity" className="underline">our academic integrity guide</Link>.
            </p>
          </CardContent>
        </Card>
      )}
      <PurchaseModal open={purchaseOpen} onOpenChange={setPurchaseOpen} sku="ESSAY_SINGLE" />
    </div>
  );
}
