import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PortfolioCover } from "@/components/layout/portfolio-cover";
import { portfolioCases } from "@/lib/portfolio";
import { buildPageMetadata } from "@/lib/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolioPage" });
  return buildPageMetadata({
    path: "/portfolio",
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("portfolioPage");
  const tc = await getTranslations("caseStudies");
  const tn = await getTranslations("nav");

  return (
    <main id="main" className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-24">
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: tn("home"), path: "" },
          { name: tn("portfolio"), path: "/portfolio" },
        ]}
      />
      <header className="measure flex flex-col gap-4">
        <span className="inline-flex items-center gap-2 text-small font-medium uppercase tracking-wider text-text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {t("eyebrow")}
        </span>
        <h1 className="text-balance font-display text-h1 font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-body text-text-muted">{t("subtitle")}</p>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {portfolioCases.map((item) => (
          <Link
            key={item.key}
            href={`/portfolio/${item.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 ease-brand hover:-translate-y-1"
          >
            <PortfolioCover
              image={item.image}
              imageAlt={tc(`items.${item.key}.title`)}
              category={tc(`items.${item.key}.category`)}
              resultValue={tc(`items.${item.key}.resultValue`)}
              resultLabel={tc(`items.${item.key}.resultLabel`)}
              className="min-h-44 border-b border-border"
            />

            <div className="flex flex-1 flex-col gap-4 p-6">
              <h2 className="font-display text-h3 font-bold tracking-tight">
                {tc(`items.${item.key}.title`)}
              </h2>
              <p className="line-clamp-3 text-body text-text-muted">
                {tc(`items.${item.key}.summary`)}
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-small font-medium text-primary">
                {tc("readCase")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
