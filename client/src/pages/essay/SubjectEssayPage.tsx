import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { CheckCircle2, ArrowRight, FileText, Clock, ListOrdered } from "lucide-react";
import { usePreviewUsed } from "@/hooks/usePreviewUsed";

export interface SubjectConfig {
  subject: string;
  slug: string;
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  heroHeadline: string;
  heroSubline: string;
  /**
   * Where the page's buttons send the student. It preselects the task and subject in the
   * analyzer: a plain /essay link opened the form on Business Management, so a Biology IA
   * submitted without changing the dropdown was marked against the wrong criteria.
   */
  analyzerHref: string;
  /**
   * Replaces "a mark for every criterion" where a criterion depends on something beyond
   * the main paste, so the page does not promise a mark the report cannot give.
   */
  criteriaCaveat?: string;
  /** The official word limit as a phrase ("3,000-word"), when the task has one. */
  wordLimit?: string;
  /** The analyzer holds a May 2027 criteria set for this task as well as the current one. */
  sessionAware?: boolean;
  criteria: Array<{ name: string; max: number; sampleScore: number }>;
  /** Which criteria the sample shows, where the syllabus changes between sessions. */
  sampleCaption?: string;
  relatedSubjects: Array<{ label: string; href: string }>;
  /** Guides for this subject, rendered under the criteria. Added with the interlinking pass. */
  relatedResources?: Array<{ label: string; href: string }>;
  /**
   * What the criteria ask for, the mistakes they penalise, and questions students ask.
   * This used to live only in a separate crawler copy of the page; it is rendered here so
   * readers and crawlers get the same text.
   */
  guide: {
    rubricHeading: string;
    rubricIntro?: string[];
    rubricItems: Array<{ title: string; text: string }>;
    rubricNote?: string[];
    mistakesHeading: string;
    mistakes: Array<{ title: string; text: string }>;
    faq: Array<{ q: string; a: string }>;
  };
}

function getBarColor(ratio: number): string {
  if (ratio >= 0.75) return "bg-emerald-500";
  if (ratio >= 0.5) return "bg-amber-400";
  return "bg-rose-400";
}

export default function SubjectEssayPage({ config }: { config: SubjectConfig }) {
  const previewUsed = usePreviewUsed();
  const totalMax = config.criteria.reduce((s, c) => s + c.max, 0);
  const totalSample = config.criteria.reduce((s, c) => s + c.sampleScore, 0);
  const holistic = config.criteria.length === 1;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Essay Grader", url: "/essay" },
    { name: config.subject, url: config.canonicalPath },
  ];

  const reportCovers = [
    holistic
      ? `One holistic mark out of ${totalMax}, placed in a band and explained, because that is how this task is marked`
      : config.criteriaCaveat ?? "A mark for every criterion, with the reason for each one",
    "The risks costing you the most marks, ranked, with what in the text causes them",
    "Next steps ranked by the marks they are likely to recover",
    ...(config.wordLimit
      ? [`Your words counted against the ${config.wordLimit} limit, with what the official count leaves out`]
      : []),
    config.sessionAware
      ? "The criteria for your exam session: the current set through November 2026, the new set from May 2027"
      : "Two free re-checks of a revised version of the same work, within 14 days of the full report opening",
  ];

  return (
    <>
      <SEOHead
        title={config.metaTitle}
        description={config.metaDescription}
        canonical={config.canonicalPath}
        breadcrumbs={breadcrumbs}
      />

      <main>
        {/* Breadcrumbs */}
        <nav className="border-b border-border bg-muted/30" aria-label="Breadcrumb">
          <div className="container py-2.5">
            <ol className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              </li>
              <li className="select-none">/</li>
              <li>
                <Link href="/essay" className="hover:text-foreground transition-colors">Essay Grader</Link>
              </li>
              <li className="select-none">/</li>
              <li className="text-foreground font-medium">{config.subject}</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-14 md:py-20">
          <div className="container max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-6 uppercase tracking-wide">
              {previewUsed ? "Full report $9.99 · No account needed · Refundable within 7 days" : "One free preview per device or account · No account needed · No card"}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              {config.heroHeadline}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              {config.heroSubline}
            </p>
            <Button size="lg" className="text-base px-10 shadow-lg shadow-primary/25 mb-4 h-auto min-h-11 py-3 whitespace-normal" asChild>
              <Link href={config.analyzerHref}>
                <FileText className="w-4 h-4 mr-2" />
                {previewUsed ? "Mark my work ($9.99)" : "Get a free preview"}
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground">
              No account needed · Back in about a minute · Full report $9.99, refundable within 7 days
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="py-12 bg-background border-b">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-center mb-8 text-muted-foreground uppercase tracking-wider">
              How it works
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { Icon: FileText, title: "Paste your text", desc: "Copy and paste the text of your work. No file upload, and it works on any device." },
                { Icon: Clock, title: "Marked in about a minute", desc: holistic
                    ? "An AI model applies the published assessment instrument to what you pasted."
                    : `An AI model applies the published ${config.subject} criteria to what you pasted.` },
                { Icon: ListOrdered, title: "See what to fix", desc: "The marks you are losing, and the changes most likely to recover them, in order." },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample score widget */}
        <section className="py-16 bg-background">
          <div className="container max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight mb-2">
                What the {config.subject} breakdown looks like
              </h2>
              <p className="text-muted-foreground text-sm">
                An illustration with made-up scores. Your report marks your own draft and explains every mark.
              </p>
            </div>

            <Card className="border-2 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5 pb-4 border-b">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{config.subject} · Illustration</p>
                    {config.sampleCaption && (
                      <p className="text-xs text-muted-foreground max-w-xs">{config.sampleCaption}</p>
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-primary">{totalSample}</div>
                    <div className="text-xs text-muted-foreground">/ {totalMax} marks</div>
                    <div className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded mt-1">
                      {Math.round((totalSample / totalMax) * 100)}%
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {config.criteria.map(({ name, max, sampleScore }) => {
                    const ratio = sampleScore / max;
                    return (
                      <div key={name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-medium leading-snug pr-2">{name}</span>
                          <span className="text-xs text-muted-foreground font-semibold whitespace-nowrap">
                            {sampleScore}/{max}
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${getBarColor(ratio)}`}
                            style={{ width: `${ratio * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-5 border-t flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {previewUsed ? "Your own draft: the full breakdown and fix list for $9.99" : "Your own draft: a free preview first, then the full breakdown and fix list for $9.99"}
                  </p>
                  <Button size="sm" className="min-h-11" asChild>
                    <Link href={config.analyzerHref}>
                      {previewUsed ? "Mark my work" : "Get my free preview"} <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12 bg-background border-t">
          <div className="container max-w-3xl mx-auto space-y-10">
            <div>
              <h2 className="text-2xl font-bold mb-4">{config.guide.rubricHeading}</h2>
              {(config.guide.rubricIntro ?? []).map((p) => (
                <p key={p} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
              ))}
              <ul className="space-y-3">
                {config.guide.rubricItems.map((it) => (
                  <li key={it.title} className="text-sm leading-relaxed">
                    <strong className="text-foreground">{it.title}.</strong>{" "}
                    <span className="text-muted-foreground">{it.text}</span>
                  </li>
                ))}
              </ul>
              {(config.guide.rubricNote ?? []).map((p) => (
                <p key={p} className="text-sm text-muted-foreground leading-relaxed mt-4">{p}</p>
              ))}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">{config.guide.mistakesHeading}</h2>
              <ul className="space-y-3">
                {config.guide.mistakes.map((it) => (
                  <li key={it.title} className="text-sm leading-relaxed">
                    <strong className="text-foreground">{it.title}.</strong>{" "}
                    <span className="text-muted-foreground">{it.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
              <dl className="space-y-4">
                {config.guide.faq.map((f) => (
                  <div key={f.q}>
                    <dt className="font-semibold text-sm">{f.q}</dt>
                    <dd className="text-sm text-muted-foreground leading-relaxed mt-1">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* What the report covers */}
        <section className="py-12 bg-muted/30 border-y">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-center mb-8">What the {config.subject} report covers</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {reportCovers.map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fact block */}
        <section className="py-12 bg-background">
          <div className="container max-w-3xl mx-auto">
            <div className="rounded-xl border bg-muted/30 p-6 md:p-8">
              <h2 className="text-xl font-extrabold tracking-tight mb-4">IBLens at a glance</h2>
              <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5">
                <li>Marks against the published IB criteria for each task. Where the syllabus changes in May 2027 (the Extended Essay, the Psychology IA and the Computer Science IA), it holds both sets and uses the one for your session. The Visual Arts comparative study is not set from May 2027, so it is marked only for 2026 sessions.</li>
                <li>$9.99 for a full report, which includes two re-checks of the same work within 14 days. No subscription.</li>
                <li>{holistic
                  ? "The first preview is free and needs no account: the band your work falls in, the start of the explanation, and the top risks in the draft."
                  : "The first preview is free and needs no account: your band range, your weakest criterion with its full feedback, and the top risks in the draft."}</li>
                <li>Covers coursework in 14 subjects, the Extended Essay, the TOK essay and the TOK exhibition.</li>
                <li>The text you paste passes through our relay server to Anthropic to produce the report. IBLens never stores the text itself; the report is kept as the Privacy Policy describes.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-background">
          <div className="container max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
              Ready to see where your draft stands?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              {previewUsed
                ? `Paste your ${config.subject}: the free preview on this device has been used, and a full report is $9.99 with two re-checks included.`
                : `Paste your ${config.subject} and get a free preview in about a minute. The full report is $9.99.`}
            </p>
            <Button size="lg" className="text-base px-6 sm:px-10 shadow-lg shadow-primary/25 h-auto min-h-11 py-3 whitespace-normal" asChild>
              <Link href={config.analyzerHref}>
                Check my {config.subject} <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {config.relatedResources && config.relatedResources.length > 0 && (
          <section className="py-10 border-t bg-background">
            <div className="container max-w-3xl mx-auto">
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-5">
                Guides for {config.subject}
              </h2>
              <div className="flex flex-wrap gap-3">
                {config.relatedResources.map((r) => (
                  <Link key={r.href} href={r.href} className="text-sm underline hover:no-underline">
                    {r.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related subjects */}
        {config.relatedSubjects.length > 0 && (
          <section className="py-10 border-t bg-background">
            <div className="container max-w-3xl mx-auto">
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-5">
                Also available for
              </h2>
              <div className="flex flex-wrap gap-2">
                {config.relatedSubjects.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm hover:border-primary hover:text-primary transition-colors"
                  >
                    {label} <ArrowRight className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
