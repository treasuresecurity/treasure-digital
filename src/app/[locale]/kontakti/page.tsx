import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm, ContactChannels } from "@/components/sections/contact-form";
import { SITE_EMAIL, SITE_MAILTO } from "@/lib/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");

  return (
    <main id="main" className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-24">
      <header className="measure flex flex-col gap-4">
        <span className="inline-flex items-center gap-2 text-small font-medium uppercase tracking-wider text-text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {t("eyebrow")}
        </span>
        <h1 className="text-balance font-display text-h1 font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-body text-text-muted">{t("subtitle")}</p>
        <p className="text-body font-medium text-text">{t("promise")}</p>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <h2 className="font-display text-h3 font-bold tracking-tight">
            {t("formTitle")}
          </h2>
          <ContactForm />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="font-display text-h3 font-bold tracking-tight">
            {t("channelsTitle")}
          </h2>
          <p className="text-body text-text-muted">{t("channelsSubtitle")}</p>
          <ContactChannels />
          <p className="text-small text-text-muted">
            {t("emailNote")}{" "}
            <a
              href={SITE_MAILTO}
              className="text-primary transition-colors hover:text-brand-blue-600"
            >
              {SITE_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
