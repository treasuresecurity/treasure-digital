import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  getAllServiceSlugs,
  getServiceBySlug,
  type ServiceKey,
} from "@/lib/services";
import { ServiceCover, ServiceCta } from "@/components/sections/service-page";
import { ServiceJsonLd } from "@/components/seo/service-json-ld";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const t = await getTranslations({ locale, namespace: "servicePages" });
  return {
    title: t(`items.${service.key}.metaTitle`),
    description: t(`items.${service.key}.metaDescription`),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const t = await getTranslations("servicePages");
  const tc = await getTranslations("common");
  const key = service.key as ServiceKey;

  const includes = t.raw(`items.${key}.includes`) as string[];
  const faq = t.raw(`items.${key}.faq`) as { question: string; answer: string }[];

  const title = t(`items.${key}.title`);
  const subtitle = t(`items.${key}.subtitle`);
  const baseUrl = absoluteUrl(`/uslugi/${slug}`, locale);

  return (
    <main id="main" className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-24">
      <ServiceJsonLd
        name={title}
        description={subtitle}
        url={baseUrl}
        faq={faq}
      />

      <nav aria-label="Breadcrumb" className="mb-6 text-small text-text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/uslugi" className="transition-colors hover:text-text">
              {t("breadcrumbServices")}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-text">{title}</li>
        </ol>
      </nav>

      <ServiceCover
        eyebrow={t("eyebrow")}
        title={title}
        subtitle={subtitle}
      />

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="flex flex-col gap-10 lg:col-span-2">
          <section className="flex flex-col gap-4">
            <h2 className="font-display text-h2 font-bold tracking-tight">
              {t("outcomeTitle")}
            </h2>
            <p className="measure text-body text-text-muted">
              {t(`items.${key}.outcome`)}
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-display text-h2 font-bold tracking-tight">
              {t("includesTitle")}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-body text-text-muted"
                >
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {t.has(`items.${key}.caseStudy`) && (
            <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h2 className="font-display text-h3 font-bold tracking-tight">
                {t("caseStudyTitle")}
              </h2>
              <p className="mt-3 measure text-body text-text-muted">
                {t(`items.${key}.caseStudy`)}
              </p>
            </section>
          )}

          <section className="flex flex-col gap-6">
            <h2 className="font-display text-h2 font-bold tracking-tight">
              {t("faqTitle")}
            </h2>
            <dl className="flex flex-col gap-4">
              {faq.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl border border-border bg-surface p-6"
                >
                  <dt className="font-display text-h3 font-bold tracking-tight">
                    {item.question}
                  </dt>
                  <dd className="mt-2 text-body text-text-muted">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="sticky top-24 rounded-2xl border border-border bg-surface p-6">
            <p className="font-display text-h3 font-bold tracking-tight">
              {t("sidebarTitle")}
            </p>
            <p className="mt-2 text-body text-text-muted">
              {t("sidebarText")}
            </p>
            <Link
              href="/kontakti"
              className="mt-6 flex h-12 w-full items-center justify-center rounded-btn bg-primary text-body font-medium text-primary-foreground transition-all duration-200 ease-brand hover:-translate-y-0.5 hover:bg-brand-blue-600 hover:shadow-glow"
            >
              {tc("cta")}
            </Link>
          </div>
        </aside>
      </div>

      <div className="mt-16">
        <ServiceCta
          title={t(`items.${key}.ctaTitle`)}
          buttonLabel={tc("cta")}
        />
      </div>
    </main>
  );
}
