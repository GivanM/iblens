import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SERIF = { fontFamily: "'Funnel Display', 'Funnel Sans', system-ui, sans-serif", letterSpacing: "-0.015em" };

/**
 * University Strategy was taken off sale in July 2026 after an audit found incorrect university
 * deadlines and entry requirements in it. The page is kept because it is indexed, but everything
 * that could mislead an applicant, the sample report with invented admission percentages, the
 * timeline with wrong deadlines, and the purchase button, has been removed rather than hidden
 * behind a banner.
 */
export default function UniversityStrategy() {
  return (
    <div className="container max-w-2xl mx-auto py-16 px-4">
      <SEOHead
        title="IB University Strategy: No Longer Offered | IBLens"
        description="This part of IBLens is no longer offered. We withdrew it rather than sell university guidance we cannot keep current. IBLens still marks IB coursework, with a free preview first."
        canonical="/university"
      />

      <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Withdrawn</p>
      <h1 style={SERIF} className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
        We no longer sell the University Strategy report
      </h1>

      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          We withdrew it in July 2026. An audit of our own product found university deadlines and
          entry requirements that were out of date or simply wrong, the kind of detail an applicant
          acts on without double-checking, and the kind of mistake that costs someone a place.
        </p>
        <p>
          Keeping it accurate would mean re-verifying requirements for every course at every
          university, every cycle. We are not able to promise that, so we would rather not take money
          for it than publish advice we cannot stand behind. Our free admissions guides stay online
          because they explain how IB points and offers work in general, and they send you to each
          university's own pages for the requirements that change.
        </p>
        <p className="text-foreground font-medium">
          What we do instead is the part that does not go stale: reading your own writing against
          the criteria it will actually be judged by.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        <Card>
          <CardContent className="pt-6 space-y-3">
            <h2 className="font-semibold">Applying through UCAS?</h2>
            <p className="text-sm text-muted-foreground">
              From 2026 entry the personal statement is three separate questions. We review each answer
              from an admissions-tutor perspective, and the first review is a free preview.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/ucas-personal-statement">Check my statement <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-3">
            <h2 className="font-semibold">Still writing IB coursework?</h2>
            <p className="text-sm text-muted-foreground">
              IA, Extended Essay, TOK essay and exhibition, marked against the published criteria for
              your session, including the May 2027 rubrics.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/essay">Check my coursework <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground mt-8">
        For official entry requirements and deadlines, use the university's own course pages and{" "}
        <a href="https://www.ucas.com" target="_blank" rel="noopener noreferrer" className="underline">UCAS</a>.
        Those are the only sources that stay current.
      </p>
    </div>
  );
}
