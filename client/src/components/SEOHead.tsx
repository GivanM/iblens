import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
  ogImage?: string;
  article?: {
    author: string;
    datePublished: string;
    dateModified: string;
  };
  breadcrumbs?: Array<{ name: string; url: string }>;
  jsonLd?: object | object[];
}

const DEFAULT_OG_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663456034410/fPpXrWUtmpLttw7Fz9wKLE/og-image-CS5C2Vq6Jk92bXNFNMwCXg.png";

export function SEOHead({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  article,
  breadcrumbs,
  jsonLd,
}: SEOHeadProps) {
  const fullCanonical = canonical.startsWith("http")
    ? canonical
    : `https://iblens.com${canonical}`;

  const jsonLdArray: object[] = [];

  // BreadcrumbList
  if (breadcrumbs && breadcrumbs.length > 0) {
    jsonLdArray.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.url.startsWith("http")
          ? crumb.url
          : `https://iblens.com${crumb.url}`,
      })),
    });
  }

  // Article schema
  if (article) {
    jsonLdArray.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: description,
      author: {
        "@type": "Organization",
        name: article.author,
      },
      publisher: {
        "@type": "Organization",
        name: "IBLens",
        url: "https://iblens.com",
      },
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": fullCanonical,
      },
      image: ogImage,
    });
  }

  // Additional JSON-LD
  if (jsonLd) {
    if (Array.isArray(jsonLd)) {
      jsonLdArray.push(...jsonLd);
    } else {
      jsonLdArray.push(jsonLd);
    }
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="IBLens" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD */}
      {jsonLdArray.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
