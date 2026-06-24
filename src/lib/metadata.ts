import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site";

export function isPreviewDeployment() {
  return process.env.VERCEL_ENV === "preview";
}

export function previewRobots(): Metadata["robots"] | undefined {
  if (!isPreviewDeployment()) return undefined;
  return { index: false, follow: false };
}

export function buildAlternates(path: string) {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, absoluteUrl(path, locale)]),
  ) as Record<string, string>;

  languages["x-default"] = absoluteUrl(path, routing.defaultLocale);

  return { languages };
}

/** Canonical + hreflang + optional preview noindex for indexable pages. */
export function buildPageMetadata({
  path,
  locale,
  title,
  description,
}: {
  path: string;
  locale: string;
  title: string;
  description: string;
}): Metadata {
  const alternates = buildAlternates(path);

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: absoluteUrl(path, locale),
      languages: alternates.languages,
    },
    robots: previewRobots(),
  };
}
