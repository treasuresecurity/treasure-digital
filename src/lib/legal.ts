// Legal pages (GDPR — master-plan §5 / footer links).
// `key` maps into the "legalPages.items" message namespace.
export interface LegalPage {
  key: "privacy" | "terms" | "cookies";
  slug: string;
}

export const legalPages: LegalPage[] = [
  { key: "privacy", slug: "poveritelnost" },
  { key: "terms", slug: "uslovia" },
  { key: "cookies", slug: "biskvitki" },
];

export function getLegalBySlug(slug: string) {
  return legalPages.find((page) => page.slug === slug);
}

export function getAllLegalSlugs() {
  return legalPages.map((page) => page.slug);
}
