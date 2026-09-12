import { useState, useMemo } from "react";
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
import {
  UCAS_QUESTIONS,
  UCAS_TOTAL_CHAR_LIMIT,
  UCAS_MIN_CHARS_PER_ANSWER,
} from "@shared/ucas";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

function getFingerprint(): string {
  const KEY = "iblens_fp";
  let v = localStorage.getItem(KEY);
  if (!v) {
    v = crypto.randomUUID();
    localStorage.setItem(KEY, v);
  }
  return v;
}

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

  const total = answers.q1.length + answers.q2.length + answers.q3.length;
  const remaining = UCAS_TOTAL_CHAR_LIMIT - total;

  const review = trpc.essay.analyzeUcasAnonymous.useMutation({
    onSuccess: (data: any) => setResult(data.result),
    onError: (err: any) => toast.error(err.message || "Review failed"),
  });

  const canSubmit = useMemo(
    () => course.trim().length >= 2 && total >= 200 && !review.isPending,
    [course, total, review.isPending],
  );

  return (
    <div className="container max-w-3xl mx-auto py-10 px-4 space-y-6">
      <SEOHead
        title="UCAS Personal Statement Checker — New Three-Question Format | IBLens"
        description="Check your UCAS personal statement against the format used from 2026 entry: three questions, 4,000 characters, 350 minimum each. Evidence-based feedback on each answer, free preview."
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
          first. No score — UCAS publishes no mark scheme, and inventing one would not help you.
        </p>
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
                  {short && ` — UCAS requires at least ${UCAS_MIN_CHARS_PER_ANSWER}`}
                </p>
              </div>
            );
          })}

          <div className={`text-sm rounded-lg p-3 ${remaining < 0 ? "bg-rose-50 text-rose-800" : "bg-muted/50"}`}>
            <strong>{total}</strong> of {UCAS_TOTAL_CHAR_LIMIT} characters used
            {remaining >= 0 ? ` · ${remaining} left` : ` · ${Math.abs(remaining)} over the limit`}
          </div>

          <Button
            size="lg"
            className="w-full"
            disabled={!canSubmit}
            onClick={() =>
              review.mutate({
                course: course.trim(),
                universityType,
                q1: answers.q1,
                q2: answers.q2,
                q3: answers.q3,
                clientFingerprint: getFingerprint(),
              })
            }
          >
            {review.isPending ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Reading your statement…</>) : "Review my statement — free"}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardContent className="pt-6 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Free preview</p>
              <h2 style={SERIF} className="text-2xl font-bold mb-2">{result.verdict}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.verdict_reason}</p>
            </div>

            {result.mechanics && (
              <div className="rounded-lg border p-4 space-y-2">
                <p className="text-sm font-semibold">Against the UCAS limits</p>
                {result.mechanics.perAnswer.map((a: any) => (
                  <div key={a.id} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{a.id.toUpperCase()}</span>
                    <span className={a.meetsMinimum ? "" : "text-rose-600 font-medium"}>
                      {a.chars} characters · {a.shareOfTotal}%
                      {!a.meetsMinimum && ` · below the ${UCAS_MIN_CHARS_PER_ANSWER} minimum`}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between text-sm border-t pt-2">
                  <span className="text-muted-foreground">Total</span>
                  <span>{result.mechanics.totalChars} of {UCAS_TOTAL_CHAR_LIMIT}</span>
                </div>
                {result.mechanics.problems?.map((p: string, i: number) => (
                  <p key={i} className="text-xs text-amber-700 flex gap-2"><AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />{p}</p>
                ))}
                {result.mechanics.problems?.length === 0 && (
                  <p className="text-xs text-emerald-700 flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />Lengths are within the UCAS rules.</p>
                )}
              </div>
            )}

            {result.sample_answer && (
              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">
                    {result.sample_answer.id?.toUpperCase()} — your weakest answer, in full
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

            <div className="rounded-lg bg-muted/40 p-4 space-y-2">
              <p className="text-sm font-semibold">In the full review</p>
              <ul className="space-y-1.5">
                {result.other_answers?.map((a: any) => (
                  <li key={a.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    {a.id?.toUpperCase()} in full — currently rated <strong className="font-medium">{a.status}</strong>
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
              <p className="text-xs text-muted-foreground pt-2">
                The full review is $9.99 and includes two free re-checks of this statement within 14 days,
                so you can revise and see whether the changes landed. <Link href="/pricing" className="underline">Pricing</Link>
              </p>
            </div>

            <p className="text-xs text-muted-foreground border-t pt-4">
              IBLens gives you feedback on writing that is yours. UCAS is explicit that submitting text generated
              by an AI tool as your own can be treated as cheating, and submitted statements are checked for
              similarity against previously submitted work. Never paste our wording into your application, and do
              not post your statement online. See <Link href="/resources/academic-integrity" className="underline">our academic integrity guide</Link>.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
