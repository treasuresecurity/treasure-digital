import { getSiteUrl } from "@/lib/site";

export function ArticleJsonLd({
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

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    author: {
      "@type": "Organization",
      name: "Treasure Digital",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Treasure Digital",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo-dark.png`,
      },
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
