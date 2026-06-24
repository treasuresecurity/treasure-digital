import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ServiceKey } from "@/lib/services";
import {
  blogToServices,
  getPortfolioCaseKeyForService,
  getPortfolioSlugForService,
  portfolioToServices,
  serviceToBlog,
} from "@/lib/internal-links";
import { allServices } from "@/lib/services";
import { getPostMetaBySlug } from "@/lib/blog/posts";

export async function ServiceRelatedLinks({
  serviceKey,
  locale,
}: {
  serviceKey: ServiceKey;
  locale: string;
}) {
  const t = await getTranslations("internalLinks");
  const tc = await getTranslations("caseStudies");

  const portfolioSlug = getPortfolioSlugForService(serviceKey);
  const portfolioCaseKey = getPortfolioCaseKeyForService(serviceKey);
  const blogSlugs = serviceToBlog[serviceKey] ?? [];
  const blogPosts = blogSlugs
    .map((slug) => getPostMetaBySlug(slug, locale))
    .filter(Boolean);

  if (!portfolioSlug && blogPosts.length === 0) return null;

  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-border bg-surface/50 p-6 sm:p-8">
      <h2 className="font-display text-h3 font-bold tracking-tight">
        {t("relatedTitle")}
      </h2>

      <ul className="flex flex-col gap-4">
        {portfolioSlug && portfolioCaseKey && (
          <li>
            <p className="text-small font-medium uppercase tracking-wider text-text-muted">
              {t("caseStudyLabel")}
            </p>
            <Link
              href={`/portfolio/${portfolioSlug}`}
              className="group mt-1 inline-flex items-center gap-2 text-body font-medium text-primary transition-colors hover:text-brand-blue-600"
            >
              {tc(`items.${portfolioCaseKey}.title`)}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5" />
            </Link>
          </li>
        )}

        {blogPosts.length > 0 && (
          <li>
            <p className="text-small font-medium uppercase tracking-wider text-text-muted">
              {t("articlesLabel")}
            </p>
            <ul className="mt-2 flex flex-col gap-2">
              {blogPosts.map((post) =>
                post ? (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group inline-flex items-center gap-2 text-body text-primary transition-colors hover:text-brand-blue-600"
                    >
                      {post.title}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </li>
        )}
      </ul>
    </section>
  );
}

export async function PortfolioRelatedServices({
  caseKey,
}: {
  caseKey: "finpro" | "webShop" | "sussi";
}) {
  const serviceKeys = portfolioToServices[caseKey];
  const t = await getTranslations("internalLinks");
  const ts = await getTranslations("servicePages");

  if (serviceKeys.length === 0) return null;

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6">
      <h2 className="font-display text-h3 font-bold tracking-tight">
        {t("servicesTitle")}
      </h2>
      <ul className="flex flex-col gap-2">
        {serviceKeys.map((key) => {
          const service = allServices.find((s) => s.key === key);
          if (!service) return null;
          return (
            <li key={key}>
              <Link
                href={service.href}
                className="group inline-flex items-center gap-1.5 text-body text-primary transition-colors hover:text-brand-blue-600"
              >
                {ts(`items.${key}.title`)}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export async function BlogRelatedLinks({ slug }: { slug: string }) {
  const serviceKeys = blogToServices[slug];
  const t = await getTranslations("internalLinks");
  const ts = await getTranslations("servicePages");

  if (!serviceKeys?.length) return null;

  return (
    <section className="mt-12 flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <h2 className="font-display text-h3 font-bold tracking-tight">
        {t("servicesTitle")}
      </h2>
      <ul className="flex flex-col gap-2">
        {serviceKeys.map((key) => {
          const service = allServices.find((s) => s.key === key);
          if (!service) return null;
          return (
            <li key={key}>
              <Link
                href={service.href}
                className="group inline-flex items-center gap-1.5 text-body text-primary transition-colors hover:text-brand-blue-600"
              >
                {ts(`items.${key}.title`)}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
