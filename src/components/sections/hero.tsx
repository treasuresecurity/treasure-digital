import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DirectAnswerBlock } from "@/components/sections/direct-answer";
import { buttonVariants } from "@/components/ui/button";
import { InfinityMarkFallback } from "@/components/ui/infinity-mark-fallback";

const InfinityMark = dynamic(
  () =>
    import("@/components/ui/infinity-mark").then((mod) => mod.InfinityMark),
  {
    loading: () => (
      <InfinityMarkFallback className="h-auto w-full max-w-md" />
    ),
  },
);

export async function Hero() {
  const t = await getTranslations("hero");
  const th = await getTranslations("homePage");

  const stats = [
    { value: t("stats.projects"), label: t("stats.projectsLabel") },
    { value: t("stats.clients"), label: t("stats.clientsLabel") },
    { value: t("stats.experience"), label: t("stats.experienceLabel") },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* decorative background — non-interactive */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute -top-1/3 right-0 h-[55rem] w-[55rem] translate-x-1/4 rounded-full opacity-20 blur-3xl [background:var(--gradient-brand)]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-small text-text-muted">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {t("badge")}
          </span>

          <h1 className="measure text-balance font-display text-display-xl font-bold tracking-tight">
            {t("headline")}
          </h1>

          <p className="measure text-body text-text-muted">{t("subheadline")}</p>

          <DirectAnswerBlock title={th("summaryTitle")} className="w-full">
            {th("aeoSummary")}
          </DirectAnswerBlock>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/kontakti" className={buttonVariants({ size: "lg" })}>
              {t("primaryCta")}
            </Link>
            <Link
              href="/portfolio"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              {t("secondaryCta")}
            </Link>
          </div>

          <dl className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-border pt-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="font-display text-h3 font-bold text-text">
                  {stat.value}
                </dt>
                <dd className="text-small text-text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex items-center justify-center">
          <InfinityMark className="h-auto w-full max-w-md" />
        </div>
      </div>
    </section>
  );
}
