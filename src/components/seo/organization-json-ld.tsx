import { BUSINESS } from "@/lib/business";
import { SITE_EMAIL, SITE_PHONE_E164 } from "@/lib/contact";
import { getSiteUrl } from "@/lib/site";

export function OrganizationJsonLd() {
  const siteUrl = getSiteUrl();
  const orgId = `${siteUrl}/#organization`;
  const localBusinessId = `${siteUrl}/#localbusiness`;
  const websiteId = `${siteUrl}/#website`;
  const founderId = `${siteUrl}/#founder`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: BUSINESS.displayName,
        legalName: BUSINESS.legalName,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo-dark.png`,
        },
        image: `${siteUrl}/logo-dark.png`,
        email: SITE_EMAIL,
        telephone: SITE_PHONE_E164,
        sameAs: [...BUSINESS.sameAs],
        founder: { "@id": founderId },
        description:
          "Digital agency for web development, apps and advertising — building products that bring customers.",
      },
      {
        "@type": "LocalBusiness",
        "@id": localBusinessId,
        name: BUSINESS.displayName,
        legalName: BUSINESS.legalName,
        url: siteUrl,
        image: `${siteUrl}/logo-dark.png`,
        email: SITE_EMAIL,
        telephone: SITE_PHONE_E164,
        address: {
          "@type": "PostalAddress",
          addressLocality: BUSINESS.addressLocality,
          addressCountry: BUSINESS.addressCountry,
        },
        areaServed: BUSINESS.areaServed.map((name) => ({
          "@type": "Place",
          name,
        })),
        priceRange: "€€",
        parentOrganization: { "@id": orgId },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: BUSINESS.displayName,
        url: siteUrl,
        inLanguage: ["bg", "en"],
        publisher: { "@id": orgId },
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: BUSINESS.founderName,
        worksFor: { "@id": orgId },
        url: siteUrl,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
