import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PortfolioCover } from "@/components/layout/portfolio-cover";
import { allServices } from "@/lib/services";
import { buildPageMetadata } from "@/lib/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesHub" });
  return buildPageMetadata({
    path: "/uslugi",
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ServicesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("servicesHub");
  const ts = await getTranslations("services");
  const tp = await getTranslations("servicePages");
  const tn = await getTranslations("nav");

  const priority = allServices.filter((s) => s.priority);
  const rest = allServices.filter((s) => !s.priority);

  return (
    <main id="main" className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-24">
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: tn("home"), path: "" },
          { name: tn("services"), path: "/uslugi" },
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

      <section className="mt-12">
        <h2 className="mb-6 font-display text-h3 font-bold tracking-tight">
          {t("priorityTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {priority.map((service) => (
            <ServiceHubCard
              key={service.key}
              href={service.href}
              icon={service.icon}
              title={ts(`items.${service.key}.title`)}
              description={tp(`items.${service.key}.subtitle`)}
              learnMore={ts("learnMore")}
              featured
            />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="mb-6 font-display text-h3 font-bold tracking-tight">
          {t("moreTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((service) => (
            <ServiceHubCard
              key={service.key}
              href={service.href}
              icon={service.icon}
              title={tp(`items.${service.key}.title`)}
              description={tp(`items.${service.key}.subtitle`)}
              learnMore={ts("learnMore")}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function ServiceHubCard({
  href,
  icon: Icon,
  title,
  description,
  learnMore,
  featured,
}: {
  href: string;
  title: string;
  description: string;
  learnMore: string;
  featured?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      href={href}
      className={`group flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 ease-brand hover:-translate-y-1 ${
        featured ? "md:p-8" : ""
      }`}
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-primary">
        <Icon className="h-6 w-6" />
      </span>
      <h3
        className={`font-display font-bold tracking-tight ${
          featured ? "text-h2" : "text-h3"
        }`}
      >
        {title}
      </h3>
      <p className="text-body text-text-muted">{description}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-small font-medium text-primary">
        {learnMore}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
