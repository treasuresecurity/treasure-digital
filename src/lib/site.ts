import { routing } from "@/i18n/routing";
import { getAllCaseSlugs } from "@/lib/portfolio";
import { getAllLegalSlugs } from "@/lib/legal";
import { getAllServiceSlugs } from "@/lib/services";

export function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://treasuredigital.bg";
  return url.replace(/\/$/, "");
}

/** Path for a locale with next-intl `localePrefix: "as-needed"`. */
export function localizedPath(path: string, locale: string) {
  const normalized = path === "" || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;

  if (locale === routing.defaultLocale) {
    return normalized || "/";
  }

  return normalized ? `/${locale}${normalized}` : `/${locale}`;
}

export function absoluteUrl(path: string, locale: string) {
  const siteUrl = getSiteUrl();
  const localized = localizedPath(path, locale);
  return localized === "/" ? siteUrl : `${siteUrl}${localized}`;
}

/** Static marketing paths (excluding dynamic slugs). */
export const staticPaths = [
  "",
  "/uslugi",
  "/portfolio",
  "/za-nas",
  "/blog",
  "/kontakti",
] as const;

export function getAllSitemapPaths() {
  const servicePaths = getAllServiceSlugs().map((slug) => `/uslugi/${slug}`);
  const portfolioPaths = getAllCaseSlugs().map((slug) => `/portfolio/${slug}`);
  const legalPaths = getAllLegalSlugs().map(
    (slug) => `/pravna-informatsia/${slug}`,
  );

  return [...staticPaths, ...servicePaths, ...portfolioPaths, ...legalPaths];
}
