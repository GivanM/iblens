import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { ArrowRight } from "lucide-react";
import { useMarkingCta } from "@/hooks/useMarkingCta";

export interface SubjectConfig {
  subject: string;
  slug: string;
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  heroHeadline: string;
  heroSubline: string;
  /** A rule to read before pasting, shown above the hero button. */
  heroNote?: string;
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

// Highlighter colours for the criteria in the sample, the same set the home page uses.
const SWATCHES = ["#FFC27A", "#8DE8B4", "#FF9DC8", "#9CCBFF", "#FFE45C", "#D9C4FF", "#B9E4D6"];
const DISPLAY = { fontFamily: "'Funnel Display', 'Funnel Sans', system-ui, sans-serif", letterSpacing: "-0.015em" };

/** "Criterion B: Terminology" as its letter and its name; names without a letter are numbered A, B, C. */
function splitCriterion(name: string, i: number): { letter: string; label: string } {
  const m = name.match(/^Criterion\s+([A-G][12]?)\s*[:.]\s*(.+)$/i);
  return m ? { letter: m[1].toUpperCase(), label: m[2] } : { letter: String.fromCharCode(65 + i), label: name };
}

export default function SubjectEssayPage({ config }: { config: SubjectConfig }) {
  const { previewUsed, paidLeft, paidLabel, isAuthenticated } = useMarkingCta();
  const reportsLeft = `${paidLeft} paid report${paidLeft === 1 ? "" : "s"} left`;
  // The rule to read before pasting: the EE page sets its own; every other task needs the teacher's agreement.
  const heroNote = config.heroNote
    ?? `Ask your teacher first: the IB academic integrity policy asks students to abstain from receiving non-permitted assistance in the completion or editing of work, such as from friends, relatives, other students, private tutors, essay writing or copy-editing services, pre-written essay banks or file sharing websites, so check that your teacher and your school allow outside feedback on this work.${/individual oral$/i.test(config.subject) ? " Never use it on a rehearsal of the oral you will deliver." : ""}`;
  // The task name inside a sentence: "your TOK essay", not "your TOK Essay".
  const taskName = config.subject === "Extended Essay" ? config.subject : config.subject.replace(/ (Essay|Exhibition|Individual Oral)$/i, (m) => m.toLowerCase());
  // What goes into the grader: for the oral, never a rehearsal of the actual oral.
  const pasteName = /individual oral$/i.test(config.subject) ? "individual oral outline or practice transcript" : taskName;
  const totalMax = config.criteria.reduce((s, c) => s + c.max, 0);
  const totalSample = config.criteria.reduce((s, c) => s + c.sampleScore, 0);
  const holistic = config.criteria.length === 1;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Essay grader", url: "/essay" },
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
        <nav className="border-b border-border" aria-label="Breadcrumb">
          <div className="container py-3">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              </li>
              <li className="select-none" aria-hidden="true">/</li>
              <li>
                <Link href="/essay" className="hover:text-foreground transition-colors">Essay grader</Link>
              </li>
              <li className="select-none" aria-hidden="true">/</li>
              <li className="text-foreground">{config.subject}</li>
            </ol>
          </div>
        </nav>

        {/* Hero: the promise on the left, the report it produces on the right */}
        <section className="py-12 md:py-20">
          <div className="container grid gap-10 lg:grid-cols-[7fr_5fr] lg:gap-16 items-start">
            <div>
              <p className="text-sm font-medium text-primary mb-4">
                {previewUsed ? (paidLeft > 0 ? `${reportsLeft}. Each includes two re-checks.` : "Full report $9.99, no account needed, refundable within 7 days") : "One free preview per device or account, no card"}
              </p>
              <h1 style={DISPLAY} className="text-4xl md:text-5xl font-semibold leading-[1.05] mb-5 max-w-[20ch]">
                {config.heroHeadline}
              </h1>
              <p className="text-lg text-muted-foreground mb-7 max-w-[46ch] leading-relaxed">
                {previewUsed ? config.heroSubline.split(/(?<=\.)\s+/).filter((s) => !/\bfree\b/i.test(s)).join(" ") : config.heroSubline}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-7">
                <Button size="lg" className="text-base px-7 h-auto min-h-12 py-3 whitespace-normal" asChild>
                  <Link href={config.analyzerHref}>{previewUsed ? paidLabel : "Get a free preview"}</Link>
                </Button>
                <span className="text-sm text-muted-foreground">
                  {previewUsed && paidLeft > 0 ? "Back in about a minute. Uses 1 of your paid reports." : paidLeft > 0 ? "Back in about a minute. The free preview uses none of your paid reports." : "Back in about a minute. Full report $9.99, refundable within 7 days."}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary pl-4 max-w-[60ch]">{heroNote}</p>
            </div>

            <aside className="rounded-2xl bg-muted p-5 md:p-6" aria-label={`Sample ${taskName} report`}>
              <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <p className="font-semibold">{config.subject}</p>
                  <p className="text-sm text-muted-foreground">{holistic ? "Illustration with a made-up mark" : "Illustration with made-up scores"}</p>
                  {config.sampleCaption && <p className="text-xs text-muted-foreground mt-1 max-w-xs">{config.sampleCaption}</p>}
                </div>
                <p style={DISPLAY} className="text-3xl font-semibold whitespace-nowrap">{totalSample} <span className="text-base font-normal text-muted-foreground">/ {totalMax}</span></p>
              </div>
              <ul>
                {(() => {
                  const weakest = config.criteria.reduce((w, c, i) => (c.sampleScore / c.max < config.criteria[w].sampleScore / config.criteria[w].max ? i : w), 0);
                  return config.criteria.map(({ name, max, sampleScore }, i) => {
                    const { letter, label } = splitCriterion(name, i);
                    return (
                      <li key={name} className="grid grid-cols-[1.75rem_minmax(0,1fr)_auto] items-center gap-3 py-2.5 border-t border-border first:border-t-0">
                        <span className="w-7 h-7 rounded-md grid place-items-center text-sm font-semibold text-foreground" style={{ background: SWATCHES[i % SWATCHES.length] }}>{holistic ? "" : letter}</span>
                        <span className="text-sm leading-snug">
                          {label}
                          {!holistic && i === weakest && <span className="block text-xs text-primary">Costing the most in this example</span>}
                        </span>
                        <span className="text-sm font-semibold tabular-nums">{sampleScore}/{max}</span>
                      </li>
                    );
                  });
                })()}
              </ul>
              <p className="text-sm text-muted-foreground mt-4 pt-4 border-t border-border">
                {previewUsed ? (paidLeft > 0 ? (holistic ? "Your own draft: the mark, the whole explanation and the fix list, using one of your paid reports." : "Your own draft: the full breakdown and fix list, using one of your paid reports.") : (holistic ? "Your own draft: the mark, the whole explanation and the fix list for $9.99." : "Your own draft: the full breakdown and fix list for $9.99.")) : paidLeft > 0 ? (holistic ? "Your own draft: a free preview first, then the mark, the whole explanation and the fix list with one of your paid reports." : "Your own draft: a free preview first, then the full breakdown and fix list with one of your paid reports.") : (holistic ? "Your own draft: a free preview first, then the mark, the whole explanation and the fix list for $9.99." : "Your own draft: a free preview first, then the full breakdown and fix list for $9.99.")}
              </p>
            </aside>
          </div>
        </section>

        {/* How it works: three moments in order, as ruled columns */}
        <section className="border-t border-border">
          <div className="container py-10 md:py-12">
            <h2 className="sr-only">How it works</h2>
            <ol className="grid md:grid-cols-3 gap-0 md:gap-10">
              {[
                { title: "Paste your text", desc: "Copy and paste the text of your work. No file upload, and it works on any device." },
                { title: "Marked in about a minute", desc: holistic
                    ? "An AI model applies the published assessment instrument to what you pasted."
                    : `An AI model applies the published ${taskName} criteria to what you pasted.` },
                { title: "See what to fix", desc: "The marks you are losing, and the changes most likely to recover them, in order." },
              ].map(({ title, desc }) => (
                <li key={title} className="py-4 border-t border-border first:border-t-0 md:border-t-0 md:py-0">
                  <p style={DISPLAY} className="text-lg font-semibold mb-1">{title}</p>
                  <p className="text-muted-foreground">{desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-14 md:py-20 border-t border-border">
          <div className="container max-w-3xl space-y-12">
            <div>
              <h2 style={DISPLAY} className="text-3xl font-semibold mb-5">{config.guide.rubricHeading}</h2>
              {(config.guide.rubricIntro ?? []).map((p) => (
                <p key={p} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
              ))}
              <ul>
                {config.guide.rubricItems.map((it) => (
                  <li key={it.title} className="leading-relaxed py-3 border-t border-border">
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
              <h2 style={DISPLAY} className="text-3xl font-semibold mb-5">{config.guide.mistakesHeading}</h2>
              <ul>
                {config.guide.mistakes.map((it) => (
                  <li key={it.title} className="leading-relaxed py-3 border-t border-border">
                    <strong className="text-foreground">{it.title}.</strong>{" "}
                    <span className="text-muted-foreground">{it.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 style={DISPLAY} className="text-3xl font-semibold mb-5">Frequently asked questions</h2>
              <dl>
                {config.guide.faq.map((f) => (
                  <div key={f.q} className="py-4 border-t border-border">
                    <dt className="font-semibold">{f.q}</dt>
                    <dd className="text-muted-foreground leading-relaxed mt-1">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* What the report covers */}
        <section className="py-14 md:py-16 bg-muted">
          <div className="container max-w-3xl">
            <h2 style={DISPLAY} className="text-3xl font-semibold mb-6">What the {taskName} report covers</h2>
            <ul className="bg-background rounded-2xl px-5">
              {reportCovers.map((text) => (
                <li key={text} className="py-3.5 border-t border-border first:border-t-0">{text}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Fact block */}
        <section className="py-14 md:py-16">
          <div className="container max-w-3xl">
            <div>
              <h2 style={DISPLAY} className="text-2xl font-semibold mb-4">IBLens at a glance</h2>
              <ul className="space-y-3 text-muted-foreground list-disc pl-5">
                <li>Marks against the published IB criteria for each task. Where the syllabus changes in May 2027 (the Extended Essay, the Psychology IA and the Computer Science IA), it holds both sets and uses the one for your session. The Visual Arts comparative study is not set from May 2027, so it is marked only for 2026 sessions.</li>
                <li>$9.99 for a full report, which includes two re-checks of the same work within 14 days. No subscription.</li>
                <li>{previewUsed
                  ? `The free preview on this ${isAuthenticated ? "account" : "device"} has been used; a full report is $9.99, or one of your paid reports.`
                  : holistic
                    ? "The first preview is free and needs no account: the band your work falls in, the start of the explanation, and the top risks in the draft."
                    : "The first preview is free and needs no account: a range of totals that contains the estimate and, for most drafts, your weakest criterion with its feedback and the top risks in the draft."}</li>
                <li>Covers coursework in 14 subjects, the Extended Essay, the TOK essay and the TOK exhibition.</li>
                <li>The text you paste passes through our relay server to Anthropic to produce the report. IBLens never stores the text itself; the report is kept as the Privacy Policy describes.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 md:py-20 border-t border-border">
          <div className="container max-w-3xl">
            <h2 style={DISPLAY} className="text-3xl md:text-4xl font-semibold mb-4 max-w-[20ch]">
              See where your {taskName} stands before you submit it.
            </h2>
            <p className="text-muted-foreground mb-7 max-w-[56ch]">
              {previewUsed
                ? paidLeft > 0
                  ? `Paste your ${pasteName} and mark it with one of your paid reports (${reportsLeft}). Each includes two re-checks.`
                  : `Paste your ${pasteName}. The free preview ${isAuthenticated ? "on your account" : "on this device"} has been used, and a full report is $9.99 with two re-checks included.`
                : `Paste your ${pasteName} and get a free preview in about a minute. ${paidLeft > 0 ? "The full report uses one of your paid reports." : "The full report is $9.99."}`}
            </p>
            <Button size="lg" className="text-base px-7 h-auto min-h-12 py-3 whitespace-normal" asChild>
              <Link href={config.analyzerHref}>
                Check my {taskName} <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {config.relatedResources && config.relatedResources.length > 0 && (
          <section className="py-10 border-t border-border">
            <div className="container max-w-3xl">
              <h2 style={DISPLAY} className="text-xl font-semibold mb-4">
                Guides for {config.subject}
              </h2>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {config.relatedResources.map((r) => (
                  <Link key={r.href} href={r.href} className="underline underline-offset-4 decoration-border hover:decoration-primary">
                    {r.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related subjects */}
        {config.relatedSubjects.length > 0 && (
          <section className="py-10 border-t border-border">
            <div className="container max-w-3xl">
              <h2 style={DISPLAY} className="text-xl font-semibold mb-4">
                Also available for
              </h2>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {config.relatedSubjects.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="underline underline-offset-4 decoration-border hover:decoration-primary"
                  >
                    {label}
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
