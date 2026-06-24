import { BUSINESS } from "@/lib/business";
import { getSiteUrl } from "@/lib/site";

interface PortfolioImage {
  src: string;
  width: number;
  height: number;
}

export function PortfolioJsonLd({
  name,
  description,
  url,
  category,
  images,
  imageAlts,
}: {
  name: string;
  description: string;
  url: string;
  category: string;
  images: PortfolioImage[];
  imageAlts: string[];
}) {
  const siteUrl = getSiteUrl();
  const orgId = `${siteUrl}/#organization`;

  const imageObjects = images.map((image, index) => ({
    "@type": "ImageObject",
    url: `${siteUrl}${image.src}`,
    width: image.width,
    height: image.height,
    caption: imageAlts[index] ?? name,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    url,
    genre: category,
    creator: {
      "@type": "Organization",
      "@id": orgId,
      name: BUSINESS.displayName,
      url: siteUrl,
    },
    ...(imageObjects.length > 0
      ? {
          image: imageObjects,
          thumbnailUrl: imageObjects[0].url,
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
