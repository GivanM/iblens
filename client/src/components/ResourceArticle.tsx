import { Link } from "wouter";
import { SEOHead } from "./SEOHead";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceArticleProps {
  title: string;
  description: string;
  canonical: string;
  datePublished: string;
  dateModified: string;
  children: React.ReactNode;
}

export function ResourceArticle({
  title,
  description,
  canonical,
  datePublished,
  dateModified,
  children,
}: ResourceArticleProps) {
  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical={canonical}
        ogType="article"
        article={{
          author: "IBLens Team",
          datePublished,
          dateModified,
        }}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name: title.split(" | ")[0].split(" — ")[0], url: canonical },
        ]}
      />
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Breadcrumb nav */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {title.split(" | ")[0].split(" — ")[0]}
            </span>
          </nav>

          {/* Article content */}
          <article className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
            {children}
          </article>

          {/* CTA section */}
          <div className="mt-16 p-8 bg-blue-50 rounded-2xl border border-blue-100 text-center">
            <FileText className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Ready to get specific feedback on your essay?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Upload your IA, EE, or TOK essay and get criterion-by-criterion analysis with a predicted score in 60 seconds. First analysis free.
            </p>
            <Link href="/essay">
              <Button size="lg" className="shadow-md">
                Try IBLens Free →
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
