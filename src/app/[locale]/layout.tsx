import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Unbounded, Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { GoogleTagManager } from "@/components/seo/google-tag-manager";
import { CookieConsentBanner } from "@/components/layout/cookie-consent";
import { routing } from "@/i18n/routing";
import { buildAlternates } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/site";
import "../globals.css";

// Display font — bold, geometric, full Cyrillic support.
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

// Body / UI font — clean, legible in BG + EN.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Treasure Digital",
    template: "%s | Treasure Digital",
  },
  description:
    "Дигитална агенция за уеб разработка, приложения и реклама. / Digital agency for web development, apps and advertising.",
  alternates: buildAlternates(""),
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this locale.
  setRequestLocale(locale);
  const t = await getTranslations("common");

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${unbounded.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <GoogleTagManager />
        <OrganizationJsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-btn focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            >
              {t("skipToContent")}
            </a>
            <Header />
            {children}
            <Footer />
            <CookieConsentBanner />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
