import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { BookOpen, GraduationCap, FileText, BarChart3, Lightbulb, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { sentenceCase } from "@shared/pageNames";

const resources = [
  {
    slug: "/ucas-personal-statement",
    title: "UCAS personal statement checker",
    description: "The three-question format from 2026 entry explained, plus a checker for your own answers with a free preview: character checks, what a tutor would credit, what is missing.",
    icon: FileText,
    readTime: "Tool",
  },
  {
    slug: "/resources/sample-reports",
    title: "Sample IBLens Reports",
    description: "Three TOK essays at three levels, each with its full, unedited report and a note on where we disagree with the grader.",
    icon: BarChart3,
    readTime: "Examples",
  },
  {
    slug: "/resources/academic-integrity",
    title: "AI Feedback and IB Academic Integrity",
    description: "What the IB allows, whether your teacher will know, and how to acknowledge AI feedback on IAs, the EE, orals and TOK.",
    icon: Lightbulb,
    readTime: "5 min read",
  },
  {
    slug: "/resources/ib-extended-essay-new-criteria-2027",
    title: "EE New Criteria 2027 (Marked /30)",
    description: "The May 2027 Extended Essay rubric explained: Framework, Knowledge and understanding, Analysis, Discussion and evaluation, Reflection, what changed from the 34-mark rubric, and how to check your draft.",
    icon: FileText,
    readTime: "5 min read",
  },
  {
    slug: "/resources/tok-essay-checklist",
    title: "TOK Essay Checklist",
    description: "Check your TOK essay against the official holistic instrument: the five bands out of 10, the examiner question, and the concrete checks to run before submission.",
    icon: Lightbulb,
    readTime: "4 min read",
  },
  {
    slug: "/resources/ib-rpf-extended-essay-2027",
    title: "EE RPF 2027: Reflective Statement",
    description: "The reflective statement of up to 500 words that replaces the RPPF from May 2027: how Criterion E marks it, and how to write one that evaluates what the EE taught you rather than describing a timeline.",
    icon: FileText,
    readTime: "3 min read",
  },
  {
    slug: "/resources/ib-psychology-ia-2027",
    title: "Psychology IA 2027: Research Proposal",
    description: "The new May 2027 Psychology IA explained: a research proposal marked /24, no experiment conducted, criteria, word limit, and how to check your draft.",
    icon: FileText,
    readTime: "3 min read",
  },
  {
    slug: "/resources/ib-computer-science-ia-2027",
    title: "Computer Science IA 2027 (Marked /30)",
    description: "The new CS IA criteria from May 2027: Problem specification, Planning, System overview, Development at 12 marks, Evaluation, and what changed from /34.",
    icon: Cpu,
    readTime: "3 min read",
  },
  {
    slug: "/resources/ib-extended-essay-feedback",
    title: "How to Get EE Feedback",
    description: "The feedback the IB allows on your Extended Essay: your supervisor's role, checking your own draft against the criteria, and why other help needs your supervisor's agreement.",
    icon: FileText,
    readTime: "3 min read",
  },
  {
    slug: "/resources/ib-coursework-review-tools",
    title: "AI Coursework Review Tools Compared",
    description: "IBLens, RevisionDojo, MyRevisionAgent, Clastify and generic chatbots side by side: coverage, pricing models, free tiers, May 2027 rubric support.",
    icon: BarChart3,
    readTime: "4 min read",
  },
  {
    slug: "/resources/tok-exhibition-checklist",
    title: "TOK Exhibition Checklist",
    description: "Check your exhibition commentary against the holistic instrument: one prompt, three objects with real contexts, justification and evidence.",
    icon: Lightbulb,
    readTime: "3 min read",
  },
  {
    slug: "/resources/ib-ia-feedback",
    title: "IB IA Feedback Guide",
    description: "Check your IA against the criteria without a tutor: what each subject is marked out of, where the heaviest criteria sit, and a self-check sequence for any subject.",
    icon: GraduationCap,
    readTime: "3 min read",
  },
  {
    slug: "/resources/ib-extended-essay-guide",
    title: "IB Extended Essay Guide",
    description: "Structure, the criteria for both rubrics, research question tips, the word count rules, common mistakes, and what an A-grade essay does.",
    icon: FileText,
    readTime: "8 min read",
  },
  {
    slug: "/resources/ib-ia-grader",
    title: "IB IA Grader",
    description: "How the IBLens IA grader works: the criteria it marks against in 14 subjects, what the report contains, and what it cannot do.",
    icon: BarChart3,
    readTime: "4 min read",
  },
  {
    slug: "/resources/ib-internal-assessment-guide",
    title: "IB Internal Assessment Guide",
    description: "How IAs differ by subject, how they are marked and moderated, where the weight sits in each subject, time management, and revision strategy.",
    icon: BookOpen,
    readTime: "8 min read",
  },
  {
    slug: "/resources/tok-essay-guide",
    title: "TOK Essay Guide",
    description: "Prescribed titles, claims and counter-claims, the five areas of knowledge, the holistic assessment instrument, and common errors to avoid.",
    icon: Lightbulb,
    readTime: "7 min read",
  },
  {
    slug: "/resources/ib-grade-boundaries",
    title: "IB Grade Boundaries Explained",
    description: "How the 7-point scale works, how subject grades and EE and TOK bonus points make up the Diploma score, the failing conditions, and why boundaries move.",
    icon: BarChart3,
    readTime: "5 min read",
  },
  {
    slug: "/resources/ib-essay-criteria-explained",
    title: "IB Essay Criteria Explained",
    description: "How criterion-based marking works, how examiners apply best fit, what separates good work from excellent, and how to self-assess.",
    icon: GraduationCap,
    readTime: "7 min read",
  },
  {
    slug: "/resources/how-iblens-works",
    title: "How IBLens Works",
    description: "How the grader applies the criteria, what the report looks like, what it cannot do, how your essay is handled, and how it compares to tutors and teachers.",
    icon: Cpu,
    readTime: "7 min read",
  },
  {
    slug: "/resources/ib-extended-essay-examples",
    title: "IB Extended Essay Examples",
    description: "Why full marked Extended Essays are hard to find, example research questions by subject, and what top-band essays do on each criterion.",
    icon: FileText,
    readTime: "8 min read",
  },
  {
    slug: "/resources/ib-ee-examples-by-subject",
    title: "IB EE Examples by Subject",
    description: "Research question examples in Economics, History, Biology, English, Mathematics, Psychology and Physics, with what separates a top-band essay in each.",
    icon: FileText,
    readTime: "8 min read",
  },
  {
    slug: "/resources/tok-essay-format",
    title: "IB TOK Essay Format",
    description: "The TOK essay rules and conventions: the 1,600-word limit and what counts, the prescribed title, anonymity, structure and citations.",
    icon: FileText,
    readTime: "6 min read",
  },
  {
    slug: "/resources/ib-biology-extended-essay",
    title: "IB Biology Extended Essay",
    description: "The Biology EE: choosing a research question, how the EE differs from the IA, the criteria, structure, workable topics and the reflection.",
    icon: BookOpen,
    readTime: "5 min read",
  },
  {
    slug: "/resources/ib-chemistry-extended-essay",
    title: "IB Chemistry Extended Essay",
    description: "The Chemistry EE: research question examples, the criteria, structure, workable topics such as kinetics, electrochemistry and colorimetry, and common pitfalls.",
    icon: BookOpen,
    readTime: "5 min read",
  },
  {
    slug: "/resources/ib-extended-essay-help",
    title: "IB Extended Essay Help",
    description: "Getting unstuck on the EE: narrowing the question, structuring the argument, what your supervisor can and cannot do, and why paying someone to write it fails.",
    icon: BookOpen,
    readTime: "6 min read",
  },
  {
    slug: "/resources/ib-extended-essay-word-count",
    title: "IB Extended Essay Word Count",
    description: "The official word count table: what counts towards 4,000 words and what does not, what happens if you go over, and how to cut.",
    icon: FileText,
    readTime: "5 min read",
  },
  {
    slug: "/resources/ib-math-ia-examples",
    title: "IB Math IA Examples",
    description: "Math IA topic ideas for AA and AI, what each of the five criteria rewards, a workable structure, and the mistakes that cost marks.",
    icon: BarChart3,
    readTime: "8 min read",
  },
  {
    slug: "/resources/ib-biology-ia-examples",
    title: "IB Biology IA Examples",
    description: "Biology IA investigation ideas, topics to handle carefully, how to write a real evaluation, and what top-band work does on each criterion.",
    icon: BookOpen,
    readTime: "7 min read",
  },
  {
    slug: "/resources/ib-chemistry-ia-examples",
    title: "IB Chemistry IA Examples",
    description: "Chemistry IA investigation types that work, uncertainties and data processing, the evaluation, and where marks are most often lost.",
    icon: BookOpen,
    readTime: "7 min read",
  },
  {
    slug: "/resources/ib-physics-ia-examples",
    title: "IB Physics IA Examples",
    description: "Physics IA investigation ideas, linearising data, uncertainty analysis, and how to write an evaluation that earns its marks.",
    icon: BarChart3,
    readTime: "7 min read",
  },
  {
    slug: "/resources/ib-economics-ia",
    title: "IB Economics IA Guide",
    description: "How to write the three Economics IA commentaries: choosing articles, the rubric requirements, diagrams, evaluation, and the word limit.",
    icon: BarChart3,
    readTime: "6 min read",
  },
  {
    slug: "/resources/ib-psychology-ia",
    title: "IB Psychology IA Guide",
    description: "The experimental IA through November 2026: choosing a study, group work, ethics, the inferential test, and what each criterion rewards.",
    icon: GraduationCap,
    readTime: "6 min read",
  },
  {
    slug: "/resources/ib-history-ia",
    title: "IB History IA Guide",
    description: "The historical investigation: choosing a question, evaluating sources, writing the investigation and the reflection, and the suggested word allocation.",
    icon: BookOpen,
    readTime: "6 min read",
  },
  {
    slug: "/remark",
    title: "Should you pay for an IB re-mark?",
    description: "How an enquiry upon results works, when requests close, why a grade can go down, and a check of the EE or TOK essay you submitted before you decide.",
    icon: BarChart3,
    readTime: "4 min read",
  },
  {
    slug: "/resources/ib-ia-score-predictor",
    title: "IB IA Score Estimator",
    description: "How IA marks are awarded and moderated, where marks are lost subject by subject, and how to estimate your mark before results day.",
    icon: BarChart3,
    readTime: "5 min read",
  },
  {
    slug: "/resources/ib-score-calculator",
    title: "IB Score Calculator",
    description: "How to add up your IB Diploma score from subject grades and EE and TOK bonus points, the failing conditions, and what Oxford, Cambridge and ETH publish.",
    icon: BarChart3,
    readTime: "4 min read",
  },
  {
    slug: "/resources/ib-university-admissions-strategy",
    title: "IB University Admissions Strategy",
    description: "Planning IB university applications: a balanced list, HL subjects that fit your course, application deadlines and tests, and common mistakes.",
    icon: GraduationCap,
    readTime: "4 min read",
  },
  {
    slug: "/resources/ib-university-admissions",
    title: "IB to University Admissions",
    description: "How UK, US and other university systems read the IB Diploma, and what to check on the course pages that matter to you.",
    icon: GraduationCap,
    readTime: "4 min read",
  },
];

export default function ResourcesIndex() {
  return (
    <>
      <SEOHead
        title="Free IB Study Guides: Extended Essay, IA, TOK and University Applications | IBLens"
        description="Free guides for IB Diploma students: writing the Extended Essay, Internal Assessment criteria by subject, TOK essay structure, how IB grades and bonus points work, and planning university applications."
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
              IB resources
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Free, in-depth guides for IB Diploma students: how the assessment criteria work, where marks are lost, and how to plan university applications.
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
                            {sentenceCase(resource.title)}
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
              Want specific feedback on your essay? Paste it and get feedback against the published criteria in about a minute.
            </p>
            <Link href="/essay" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
              Try IBLens →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
