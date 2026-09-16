import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { UCAS_QUESTIONS, UCAS_TOTAL_CHAR_LIMIT, UCAS_MIN_CHARS_PER_ANSWER } from "@shared/ucas";

const SERIF = { fontFamily: "'Funnel Display', 'Funnel Sans', system-ui, sans-serif", letterSpacing: "-0.015em" };

const STATUS_STYLE: Record<string, string> = {
  strong: "bg-emerald-100 text-emerald-800",
  adequate: "bg-amber-100 text-amber-800",
  weak: "bg-rose-100 text-rose-800",
};

/**
 * One UCAS review, preview or full. The UCAS page and the saved report in the
 * dashboard both render it, so a review bought from an account reads the same in
 * both places instead of collapsing to its verdict line.
 */
export function UcasReview({ result, course, isUnlocked, onBuy, buyLabel, buyPending }: {
  result: any;
  course?: string;
  isUnlocked: boolean;
  /** Offered only where buying is possible; the dashboard copy is always a full review. */
  onBuy?: () => void;
  /** "Unlock the full review, $9.99", or the paid-report wording when one is already owned. */
  buyLabel?: string;
  buyPending?: boolean;
}) {
  const mechanics = result.mechanics || result._mechanics;
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardContent className="pt-6 space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
            {isUnlocked || result.answers ? "Full review" : "Free preview"}
          </p>
          <h2 style={SERIF} className="text-2xl font-bold mb-2">{result.verdict}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{result.verdict_reason}</p>
        </div>

        {mechanics && (
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-semibold">Against the UCAS limits</p>
            {mechanics.perAnswer.map((a: any) => (
              <div key={a.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">{a.id.toUpperCase()}</span>
                <span className={`text-right ${a.meetsMinimum ? "" : "text-rose-600 font-medium"}`}>
                  {a.chars} characters · {a.shareOfTotal}% of what you have written
                  {!a.meetsMinimum && ` · below the ${UCAS_MIN_CHARS_PER_ANSWER} minimum`}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between text-sm border-t pt-2">
              <span className="text-muted-foreground">Total</span>
              <span>{Number(mechanics.totalChars).toLocaleString("en-GB")} of {UCAS_TOTAL_CHAR_LIMIT.toLocaleString("en-GB")}</span>
            </div>
            {mechanics.problems?.map((p: string, i: number) => (
              <p key={i} className="text-xs text-amber-700 flex gap-2"><AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />{p}</p>
            ))}
            {mechanics.problems?.length === 0 && (
              <p className="text-xs text-emerald-700 flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />Lengths are within the UCAS rules.</p>
            )}
            {mechanics.advice?.map((p: string, i: number) => (
              <p key={`a${i}`} className="text-xs text-muted-foreground flex gap-2"><Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />{p}</p>
            ))}
          </div>
        )}

        {result.sample_answer && (
          <div className="rounded-lg border p-4 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold">
                {result.sample_answer.id?.toUpperCase()}, your weakest answer, in full
              </p>
              <Badge className={STATUS_STYLE[result.sample_answer.status] || ""}>{result.sample_answer.status}</Badge>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">What works</p>
              <p className="text-sm leading-relaxed whitespace-pre-line">{result.sample_answer.working}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">What is missing</p>
              <p className="text-sm leading-relaxed whitespace-pre-line">{result.sample_answer.missing}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Change this first</p>
              <p className="text-sm leading-relaxed whitespace-pre-line">{result.sample_answer.fix}</p>
            </div>
          </div>
        )}

        {result.answers?.length > 0 && (
          <div className="space-y-4">
            {result.answers.map((a: any) => (
              <div key={a.id} className="rounded-lg border p-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold">
                    {a.id?.toUpperCase()}: {UCAS_QUESTIONS.find((q) => q.id === a.id)?.question || "Answer"}
                  </p>
                  <Badge className={`flex-shrink-0 ${STATUS_STYLE[a.status] || ""}`}>{a.status}</Badge>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">What works</p>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{a.working}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">What is missing</p>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{a.missing}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Change this first</p>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{a.fix}</p>
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
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{issue.description}</p>
              </div>
            ))}
          </div>
        )}

        {result.subject_fit && (
          <div className="rounded-lg border p-4">
            <p className="text-sm font-semibold mb-1">Does this read as an application for {result._course || course || "your course"}?</p>
            <p className="text-sm leading-relaxed whitespace-pre-line">{result.subject_fit}</p>
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
                {result.statement_level_count} {result.statement_level_count === 1 ? "issue" : "issues"} across the statement as a whole
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-3.5 h-3.5 shrink-0" />How convincingly this reads as an application for {result.course || course || "your course"}
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-3.5 h-3.5 shrink-0" />Your ranked revision list
              </li>
            </ul>
            {onBuy && (
              <div className="pt-3 space-y-2">
                <Button className="w-full sm:w-auto min-h-11 h-auto whitespace-normal" onClick={onBuy} disabled={buyPending}>
                  {buyPending ? "Unlocking…" : buyLabel || "Unlock the full review, $9.99"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  Includes two free re-checks of revised versions of this statement within 14 days of the review
                  opening, so you can see whether the changes landed. No subscription. <Link href="/pricing" className="underline">Pricing</Link>
                </p>
              </div>
            )}
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
  );
}
