import { BUSINESS } from "@/lib/business";
import { getSiteUrl } from "@/lib/site";
import type { ServiceKey } from "@/lib/services";

interface FaqItem {
  question: string;
  answer: string;
}

const SERVICE_TYPES: Record<ServiceKey, string> = {
  app: "Web Application Development",
  web: "Website Design and Development",
  marketing: "Digital Marketing",
  eshop: "E-commerce Development",
  seo: "Search Engine Optimization",
  googleAds: "Google Ads Management",
  metaAds: "Meta Ads Management",
  social: "Social Media Management",
};

export function ServiceJsonLd({
  serviceKey,
  name,
  description,
  url,
  faq,
}: {
  serviceKey: ServiceKey;
  name: string;
  description: string;
  url: string;
  faq: FaqItem[];
}) {
  const siteUrl = getSiteUrl();
  const orgId = `${siteUrl}/#organization`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType: SERVICE_TYPES[serviceKey],
    areaServed: BUSINESS.areaServed.map((place) => ({
      "@type": "Place",
      name: place,
    })),
    provider: {
      "@type": "Organization",
      "@id": orgId,
      name: BUSINESS.displayName,
      url: siteUrl,
    },
  };

  const faqSchema =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}

export type { ServiceKey };
