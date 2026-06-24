import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPageContent } from "@/components/sections/legal-page";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { buildAlternates } from "@/lib/metadata";
import { getAllLegalSlugs, getLegalBySlug } from "@/lib/legal";

export function generateStaticParams() {
  return getAllLegalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = getLegalBySlug(slug);
  if (!page) return {};

  const t = await getTranslations({
    locale,
    namespace: `legalPages.items.${page.key}`,
  });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates(`/pravna-informatsia/${slug}`),
    robots: { index: true, follow: true },
  };
}

export default async function LegalDocumentPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const page = getLegalBySlug(slug);
  if (!page) notFound();

  const t = await getTranslations(`legalPages.items.${page.key}`);
  const th = await getTranslations("legalPages");
  const tn = await getTranslations("nav");

  return (
    <main id="main" className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-24">
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: tn("home"), path: "" },
          { name: th("breadcrumb"), path: "/pravna-informatsia/poveritelnost" },
          { name: t("breadcrumb"), path: `/pravna-informatsia/${slug}` },
        ]}
      />
      <LegalPageContent pageKey={page.key} />
    </main>
  );
}
