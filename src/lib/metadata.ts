import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site";

export function buildAlternates(path: string) {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, absoluteUrl(path, locale)]),
  ) as Record<string, string>;

  languages["x-default"] = absoluteUrl(path, routing.defaultLocale);

  return { languages };
}
