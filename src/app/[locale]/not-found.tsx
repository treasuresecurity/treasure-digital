import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots: { index: false, follow: true },
  };
}

export default async function NotFoundPage() {
  const t = await getTranslations("notFound");

  return (
    <main
      id="main"
      className="mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col items-start justify-center gap-6 px-6 py-24"
    >
      <p className="text-small font-medium uppercase tracking-wider text-text-muted">
        404
      </p>
      <h1 className="measure font-display text-h1 font-bold tracking-tight">
        {t("title")}
      </h1>
      <p className="measure text-body text-text-muted">{t("description")}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          {t("homeCta")}
        </Link>
        <Link
          href="/uslugi"
          className={buttonVariants({ variant: "secondary", size: "lg" })}
        >
          {t("servicesCta")}
        </Link>
      </div>
    </main>
  );
}
