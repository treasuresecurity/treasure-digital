import { SITE_EMAIL, SITE_PHONE_E164 } from "@/lib/contact";
import { getSiteUrl } from "@/lib/site";

export function OrganizationJsonLd() {
  const siteUrl = getSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Treasure Digital",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo-dark.png`,
        },
        email: SITE_EMAIL,
        telephone: SITE_PHONE_E164,
        description:
          "Digital agency for web development, apps and advertising — building products that bring customers.",
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        name: "Treasure Digital",
        url: siteUrl,
        image: `${siteUrl}/logo-dark.png`,
        email: SITE_EMAIL,
        telephone: SITE_PHONE_E164,
        address: {
          "@type": "PostalAddress",
          addressCountry: "BG",
        },
        areaServed: ["BG", "International"],
        priceRange: "€€",
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
