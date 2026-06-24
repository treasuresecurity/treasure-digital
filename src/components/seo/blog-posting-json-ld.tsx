import { BUSINESS } from "@/lib/business";
import { getSiteUrl } from "@/lib/site";

export function BlogPostingJsonLd({
  title,
  description,
  url,
  publishedAt,
  imageUrl,
}: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  imageUrl?: string;
}) {
  const siteUrl = getSiteUrl();
  const orgId = `${siteUrl}/#organization`;
  const founderId = `${siteUrl}/#founder`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    dateModified: publishedAt,
    inLanguage: url.includes("/en/") ? "en" : "bg",
    author: {
      "@type": "Person",
      "@id": founderId,
      name: BUSINESS.founderName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      "@id": orgId,
      name: BUSINESS.displayName,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo-dark.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(imageUrl ? { image: [imageUrl] } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** @deprecated use BlogPostingJsonLd */
export const ArticleJsonLd = BlogPostingJsonLd;
