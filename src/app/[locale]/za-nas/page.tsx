import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutPageContent } from "@/components/sections/about-page";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { buildAlternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/za-nas"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");
  const tn = await getTranslations("nav");

  return (
    <main id="main" className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-24">
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: tn("home"), path: "" },
          { name: t("breadcrumb"), path: "/za-nas" },
        ]}
      />
      <AboutPageContent />
    </main>
  );
}
