import { absoluteUrl } from "@/lib/site";

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function BreadcrumbJsonLd({
  items,
  locale = "bg",
}: {
  items: BreadcrumbItem[];
  locale?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, locale),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
