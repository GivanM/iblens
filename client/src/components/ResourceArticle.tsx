import { Children, isValidElement } from "react";
import { Link } from "wouter";
import { SEOHead } from "./SEOHead";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMarkingCta } from "@/hooks/useMarkingCta";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

interface ResourceArticleProps {
  title: string;
  description: string;
  canonical: string;
  datePublished: string;
  dateModified: string;
  children: React.ReactNode;
}

/** The page's own name: the title before any " | IBLens" suffix or ": subtitle". */
function shortTitle(title: string): string {
  return title.split(" | ")[0].split(": ")[0];
}

// Names that keep their capitals when a Title Case page title becomes a sentence-case heading.
const KEEP_CAPS = new Set(["IB", "IA", "IAs", "EE", "EEs", "TOK", "IBLens", "AI", "HL", "SL", "UCAS", "RPF", "RPPF", "OPCVL", "DP", "Extended", "Internal", "Assessment", "Biology", "Chemistry", "Physics", "Economics", "History", "Psychology", "English", "Maths", "Math", "Mathematics", "Business", "Management", "Computer", "Science", "Visual", "Arts", "Music", "Film", "Diploma"]);
function sentenceCase(name: string): string {
  const words = name.split(" ");
  return words.map((w, i) => {
    const bare = w.replace(/[^A-Za-z]/g, "");
    if (i === 0 || KEEP_CAPS.has(bare) || (bare === "Essay" && words[i - 1] === "Extended") || /[A-Z].*[A-Z]/.test(w) || /\d/.test(w)) return w;
    return w.charAt(0).toLowerCase() + w.slice(1);
  }).join(" ");
}

export function ResourceArticle({
  title,
  description,
  canonical,
  datePublished,
  dateModified,
  children,
}: ResourceArticleProps) {
  // Seventeen articles never had a heading of their own; the crawler copy gave them
  // one and the page did not. Supply it here unless the article brings its own.
  const hasOwnHeading = Children.toArray(children).some((c) => isValidElement(c) && c.type === "h1");
  const { previewUsed, paidLabel, paidLeft } = useMarkingCta();
  const name = shortTitle(title);
  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical={canonical}
        ogType="article"
        article={{
          author: "IBLens",
          datePublished,
          dateModified,
        }}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name, url: canonical },
        ]}
      />
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 py-16">
          {/* Breadcrumb nav */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-10">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {sentenceCase(name)}
            </span>
          </nav>

          {/* Article content */}
          <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 [&_h1]:font-serif [&_h2]:font-serif [&_h3]:font-serif">
            {!hasOwnHeading && <h1>{sentenceCase(name)}</h1>}
            {children}
          </article>

          {/* CTA section */}
          <div className="mt-16 p-8 rounded-xl border border-border bg-card text-center">
            <h2 style={SERIF} className="text-2xl font-bold text-foreground mb-3">
              Ready to get specific feedback on your essay?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm leading-relaxed">
              {previewUsed
                ? `Paste your IA, TOK work or Extended Essay, once your teacher or EE supervisor has agreed to outside feedback, and get the full report, with the estimated mark, in about a minute: ${paidLeft > 0 ? "it uses one of your paid reports" : "$9.99"}.`
                : `Paste your IA, TOK work or Extended Essay, once your teacher or EE supervisor has agreed to outside feedback, and see how it reads against the published criteria in about a minute. The first preview is free: ${/\/resources\/(tok-|sample-reports)/.test(canonical) ? 'for TOK work, the band, the start of the explanation and the top risks' : 'a range of totals, usually your weakest criterion, and the top risks'}. The full report, with the estimated mark, is $9.99.`}
            </p>
            <Link href="/essay">
              <Button size="lg">
                {previewUsed ? paidLabel : "Get a free preview"}
              </Button>
            </Link>
          </div>

          {/* Back to resources */}
          <div className="mt-8 flex items-center gap-2">
            <Link href="/resources" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to all resources
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
