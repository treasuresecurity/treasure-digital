import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { CaseStudies } from "@/components/sections/case-studies";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { buildPageMetadata } from "@/lib/metadata";

const CtaBand = dynamic(
  () => import("@/components/sections/cta-band").then((mod) => mod.CtaBand),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "homePage" });

  return buildPageMetadata({
    path: "",
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      <Hero />
      <Services />
      <WhyUs />
      <CaseStudies />
      <Process />
      <Testimonials />
      <CtaBand />
    </main>
  );
}
