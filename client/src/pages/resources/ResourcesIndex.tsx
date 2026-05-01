import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { BookOpen, GraduationCap, FileText, BarChart3, Lightbulb, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const resources = [
  {
    slug: "/resources/ib-extended-essay-guide",
    title: "IB Extended Essay Guide",
    description: "Structure, criteria A–E, research question tips, common mistakes, and strategies for scoring an A on your 4,000-word EE.",
    icon: FileText,
    readTime: "12 min read",
  },
  {
    slug: "/resources/ib-internal-assessment-guide",
    title: "IB Internal Assessment Guide",
    description: "How IAs differ by subject, assessment criteria explained, examiner marking process, time management, and strategies for top marks.",
    icon: BookOpen,
    readTime: "11 min read",
  },
  {
    slug: "/resources/tok-essay-guide",
    title: "TOK Essay Guide",
    description: "Prescribed titles, knowledge claims and counter-claims, areas of knowledge, assessment criteria, and common errors to avoid.",
    icon: Lightbulb,
    readTime: "10 min read",
  },
  {
    slug: "/resources/ib-grade-boundaries",
    title: "IB Grade Boundaries Explained",
    description: "How the 7-point scale works, how subject scores combine, bonus points from EE/TOK, and what different total scores mean for university admissions.",
    icon: BarChart3,
    readTime: "10 min read",
  },
  {
    slug: "/resources/ib-essay-criteria-explained",
    title: "IB Essay Criteria Explained",
    description: "How criterion-based marking works, what distinguishes band 5 from band 7, how examiners apply criteria, and how to self-assess your work.",
    icon: GraduationCap,
    readTime: "11 min read",
  },
  {
    slug: "/resources/how-iblens-works",
    title: "How IBLens Works",
    description: "How AI-powered essay feedback maps to IB rubrics, what the output looks like, limitations, privacy, and comparison to tutors and peer review.",
    icon: Cpu,
    readTime: "10 min read",
  },
  {
    slug: "/resources/ib-university-admissions",
    title: "IB to University Admissions",
    description: "How UK, US, Canadian, European, and Asia-Pacific universities evaluate IB scores. Typical offers, credit policies, and strategic application decisions.",
    icon: GraduationCap,
    readTime: "11 min read",
  },
];

export default function ResourcesIndex() {
  return (
    <>
      <SEOHead
        title="IB Resources — Guides for Extended Essay, IA, TOK & University Admissions | IBLens"
        description="Free in-depth guides for IB Diploma students: Extended Essay structure, Internal Assessment criteria, TOK essay writing, grade boundaries, and university admissions strategies."
        canonical="/resources"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "IB Resources",
          description: "Free in-depth guides for IB Diploma students covering essays, assessments, scoring, and university admissions.",
          url: "https://iblens.com/resources",
          publisher: {
            "@type": "Organization",
            name: "IBLens",
            url: "https://iblens.com",
          },
        }}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
        ]}
      />
      <div className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              IB Resources
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Free, in-depth guides written for IB Diploma students. Everything you need to understand assessment criteria, maximize your scores, and navigate university admissions.
            </p>
          </div>

          {/* Resource cards grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Link key={resource.slug} href={resource.slug}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-border/60 hover:border-primary/30">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 bg-primary/10 rounded-lg shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-lg font-semibold text-foreground mb-2 leading-tight">
                            {resource.title}
                          </h2>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                            {resource.description}
                          </p>
                          <span className="text-xs text-muted-foreground/70 font-medium">
                            {resource.readTime}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              Want specific feedback on your essay? Upload it and get criterion-by-criterion analysis in 60 seconds.
            </p>
            <Link href="/essay" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
              Try IBLens Free →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
