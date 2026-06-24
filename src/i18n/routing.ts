import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["bg", "en"],
  defaultLocale: "bg",
  // Bulgarian served at "/", English at "/en/"
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
