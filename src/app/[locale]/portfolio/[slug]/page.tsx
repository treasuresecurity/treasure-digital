import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  getAllCaseSlugs,
  getCaseBySlug,
} from "@/lib/portfolio";
import { buttonVariants } from "@/components/ui/button";
import { PortfolioGallery } from "@/components/sections/portfolio-gallery";
import { cn } from "@/lib/utils";
import { buildPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return getAllCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) return {};

  const t = await getTranslations({ locale, namespace: "caseStudies" });
  return buildPageMetadata({
    path: `/portfolio/${slug}`,
    locale,
    title: t(`items.${item.key}.title`),
    description: t(`items.${item.key}.summary`),
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const item = getCaseBySlug(slug);
  if (!item) notFound();

  const t = await getTranslations("caseStudies");
  const tp = await getTranslations("portfolioPage");
  const highlights = t.raw(`items.${item.key}.highlights`) as string[];
  const galleryCaptions = item.gallery
    ? (t.raw(`items.${item.key}.gallery`) as string[])
    : null;

  return (
    <main id="main" className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-24">
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-2 text-small font-medium text-text-muted transition-colors hover:text-text"
      >
        <ArrowLeft className="h-4 w-4" />
        {tp("backToPortfolio")}
      </Link>

      <article className="mt-8">
        <header className="flex flex-col gap-6 border-b border-border pb-10">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-small text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t(`items.${item.key}.category`)}
          </span>

          <h1 className="measure text-balance font-display text-h1 font-bold tracking-tight">
            {t(`items.${item.key}.title`)}
          </h1>

          <p className="measure text-body text-text-muted">
            {t(`items.${item.key}.summary`)}
          </p>

          <div className="inline-flex w-fit flex-col rounded-2xl border border-border bg-surface px-6 py-4">
            <span className="text-small font-medium uppercase tracking-wider text-text-muted">
              {t("labels.result")}
            </span>
            <span className="font-display text-h2 font-bold text-primary">
              {t(`items.${item.key}.resultValue`)}
            </span>
            <span className="text-body text-text-muted">
              {t(`items.${item.key}.resultLabel`)}
            </span>
          </div>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="flex flex-col gap-8 lg:col-span-2">
            <CaseBlock
              label={t("labels.problem")}
              content={t(`items.${item.key}.problem`)}
            />
            <CaseBlock
              label={t("labels.solution")}
              content={t(`items.${item.key}.solution`)}
              muted
            />
            <CaseBlock
              label={t("labels.result")}
              content={t(`items.${item.key}.resultDetail`)}
            />

            {item.gallery && galleryCaptions && (
              <PortfolioGallery
                title={tp("galleryTitle")}
                images={item.gallery}
                captions={galleryCaptions}
              />
            )}
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="font-display text-h3 font-bold tracking-tight">
                {tp("highlightsTitle")}
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {highlights.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-body text-text-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/kontakti"
              className={cn(buttonVariants({ size: "lg" }), "w-full")}
            >
              {tp("cta")}
            </Link>
          </aside>
        </div>
      </article>
    </main>
  );
}

function CaseBlock({
  label,
  content,
  muted,
}: {
  label: string;
  content: string;
  muted?: boolean;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-small font-medium uppercase tracking-wider text-text-muted">
        {label}
      </h2>
      <p
        className={cn(
          "measure text-body",
          muted ? "text-text-muted" : "text-text",
        )}
      >
        {content}
      </p>
    </section>
  );
}
