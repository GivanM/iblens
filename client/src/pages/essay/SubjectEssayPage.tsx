import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { CheckCircle2, ArrowRight, FileText, Star } from "lucide-react";

export interface SubjectConfig {
  subject: string;
  slug: string;
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  heroHeadline: string;
  heroSubline: string;
  criteria: Array<{ name: string; max: number; sampleScore: number }>;
  relatedSubjects: Array<{ label: string; href: string }>;
}

function getBarColor(ratio: number): string {
  if (ratio >= 0.75) return "bg-emerald-500";
  if (ratio >= 0.5) return "bg-amber-400";
  return "bg-rose-400";
}

export default function SubjectEssayPage({ config }: { config: SubjectConfig }) {
  const totalMax = config.criteria.reduce((s, c) => s + c.max, 0);
  const totalSample = config.criteria.reduce((s, c) => s + c.sampleScore, 0);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Essay Grader", url: "/essay" },
    { name: config.subject, url: config.canonicalPath },
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
              ✓ First analysis free — no account, no credit card
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              {config.heroHeadline}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              {config.heroSubline}
            </p>
            <Button size="lg" className="text-base px-10 shadow-lg shadow-primary/25 mb-4" asChild>
              <Link href="/essay">
                <FileText className="w-4 h-4 mr-2" />
                Grade My {config.subject} Free
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground">
              No account needed · Results in 60 seconds · Official IB rubric · 7-day money-back guarantee
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
                { icon: "📋", title: "Paste your essay", desc: "Copy-paste your full text. No file upload needed, works on any device." },
                { icon: "⚡", title: "AI grades it in 60s", desc: `Scored against the official IB rubric for ${config.subject} — criterion by criterion.` },
                { icon: "🎯", title: "See what to fix", desc: "Get exact marks you're losing and a prioritised action plan to improve." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                    {icon}
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
                Sample {config.subject} score report
              </h2>
              <p className="text-muted-foreground text-sm">
                This is what criterion-level feedback looks like — for your actual essay
              </p>
            </div>

            <Card className="border-2 shadow-lg">
              <CardContent className="p-6">
                {/* Mock header */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{config.subject} · Sample</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i <= 3 ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-primary">{totalSample}</div>
                    <div className="text-xs text-muted-foreground">/ {totalMax} pts</div>
                    <div className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded mt-1">
                      {Math.round((totalSample / totalMax) * 100)}%
                    </div>
                  </div>
                </div>

                {/* Criteria rows */}
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
                    Grade your own essay to see the full breakdown + action plan
                  </p>
                  <Button size="sm" asChild>
                    <Link href="/essay">
                      Grade Mine Free <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why IBLens */}
        <section className="py-12 bg-muted/30 border-y">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-center mb-8">Why students use IBLens for {config.subject}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { text: `Scored against the official IB ${config.subject} rubric` },
                { text: "Criterion-by-criterion breakdown, not just a single score" },
                { text: "Identifies exactly which marks you're losing and why" },
                { text: "Prioritised action plan to improve before submission" },
                { text: "Free preview for every essay — no sign-up required" },
                { text: "Results in under 60 seconds, any time of day" },
              ].map(({ text }) => (
                <div key={text} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-background">
          <div className="container max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
              Ready to find out your real score?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Paste your {config.subject} text and get a full criterion-level grade report in 60 seconds. Free.
            </p>
            <Button size="lg" className="text-base px-10 shadow-lg shadow-primary/25" asChild>
              <Link href="/essay">
                Grade My {config.subject} Free <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

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
