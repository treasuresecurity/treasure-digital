import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PortfolioCover } from "@/components/layout/portfolio-cover";
import { featuredCases } from "@/lib/portfolio";

export async function CaseStudies() {
  const t = await getTranslations("caseStudies");
  const [featured, ...rest] = featuredCases;

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:py-28">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <header className="measure flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 text-small font-medium uppercase tracking-wider text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t("eyebrow")}
          </span>
          <h2 className="text-balance font-display text-h2 font-bold tracking-tight">
            {t("title")}
          </h2>
          <p className="text-body text-text-muted">{t("subtitle")}</p>
        </header>

        <Link
          href="/portfolio"
          className="inline-flex shrink-0 items-center gap-1.5 text-small font-medium text-primary transition-colors hover:text-brand-blue-600"
        >
          {t("viewAll")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-12 flex flex-col gap-4">
        <FeaturedCaseCard
          href={`/portfolio/${featured.slug}`}
          image={featured.image}
          imageAlt={t(`items.${featured.key}.coverAlt`)}
          category={t(`items.${featured.key}.category`)}
          title={t(`items.${featured.key}.title`)}
          problem={t(`items.${featured.key}.problem`)}
          solution={t(`items.${featured.key}.solution`)}
          resultValue={t(`items.${featured.key}.resultValue`)}
          resultLabel={t(`items.${featured.key}.resultLabel`)}
          problemLabel={t("labels.problem")}
          solutionLabel={t("labels.solution")}
          readCase={t("readCase")}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {rest.map((item) => (
            <CompactCaseCard
              key={item.key}
              href={`/portfolio/${item.slug}`}
              image={item.image}
              imageAlt={t(`items.${item.key}.coverAlt`)}
              category={t(`items.${item.key}.category`)}
              title={t(`items.${item.key}.title`)}
              problem={t(`items.${item.key}.problem`)}
              resultValue={t(`items.${item.key}.resultValue`)}
              resultLabel={t(`items.${item.key}.resultLabel`)}
              readCase={t("readCase")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCaseCard({
  href,
  image,
  imageAlt,
  category,
  title,
  problem,
  solution,
  resultValue,
  resultLabel,
  problemLabel,
  solutionLabel,
  readCase,
}: {
  href: string;
  image?: string;
  imageAlt: string;
  category: string;
  title: string;
  problem: string;
  solution: string;
  resultValue: string;
  resultLabel: string;
  problemLabel: string;
  solutionLabel: string;
  readCase: string;
}) {
  return (
    <Link
      href={href}
      className="group grid overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 ease-brand hover:-translate-y-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
    >
      <PortfolioCover
        image={image}
        imageAlt={imageAlt}
        category={category}
        resultValue={resultValue}
        resultLabel={resultLabel}
        priority
        className="min-h-52 border-b border-border lg:min-h-0 lg:border-b-0 lg:border-r"
      />

      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <h3 className="font-display text-h2 font-bold tracking-tight">{title}</h3>

        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <dt className="text-small font-medium uppercase tracking-wider text-text-muted">
              {problemLabel}
            </dt>
            <dd className="text-body text-text">{problem}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-small font-medium uppercase tracking-wider text-text-muted">
              {solutionLabel}
            </dt>
            <dd className="text-body text-text-muted">{solution}</dd>
          </div>
        </dl>

        <span className="mt-auto inline-flex items-center gap-1.5 text-small font-medium text-primary">
          {readCase}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function CompactCaseCard({
  href,
  image,
  imageAlt,
  category,
  title,
  problem,
  resultValue,
  resultLabel,
  readCase,
}: {
  href: string;
  image?: string;
  imageAlt: string;
  category: string;
  title: string;
  problem: string;
  resultValue: string;
  resultLabel: string;
  readCase: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 ease-brand hover:-translate-y-1"
    >
      <PortfolioCover
        image={image}
        imageAlt={imageAlt}
        category={category}
        resultValue={resultValue}
        resultLabel={resultLabel}
        className="min-h-44 border-b border-border"
      />

      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="font-display text-h3 font-bold tracking-tight">{title}</h3>
        <p className="line-clamp-3 text-body text-text-muted">{problem}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-small font-medium text-primary">
          {readCase}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
