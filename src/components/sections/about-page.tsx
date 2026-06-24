import { getTranslations } from "next-intl/server";
import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DirectAnswerBlock } from "@/components/sections/direct-answer";
import { NapBlock } from "@/components/layout/nap-block";
import { aboutValues } from "@/lib/about";
import { buttonVariants } from "@/components/ui/button";
import { InfinityMark } from "@/components/ui/infinity-mark";

export async function AboutPageContent() {
  const t = await getTranslations("aboutPage");
  const th = await getTranslations("hero");

  const stats = [
    { value: th("stats.projects"), label: th("stats.projectsLabel") },
    { value: th("stats.clients"), label: th("stats.clientsLabel") },
    { value: th("stats.experience"), label: th("stats.experienceLabel") },
  ];

  return (
    <>
      <header className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-1/2 right-0 h-[32rem] w-[32rem] translate-x-1/3 rounded-full opacity-15 blur-3xl [background:var(--gradient-brand)]" />
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="measure flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 text-small font-medium uppercase tracking-wider text-text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t("eyebrow")}
            </span>
            <h1 className="text-balance font-display text-h1 font-bold tracking-tight">
              {t("title")}
            </h1>
            <p className="text-body text-text-muted">{t("subtitle")}</p>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <InfinityMark className="h-40 w-40 opacity-90 sm:h-48 sm:w-48" />
          </div>
        </div>
      </header>

      <section className="mt-16 flex flex-col gap-6 border-y border-border py-16">
        <DirectAnswerBlock title={t("summaryTitle")}>
          {t("directAnswer")}
        </DirectAnswerBlock>

        <h2 className="font-display text-h2 font-bold tracking-tight">
          {t("storyTitle")}
        </h2>
        <div className="measure flex flex-col gap-4">
          <p className="text-body text-text">{t("storyP1")}</p>
          <p className="text-body text-text-muted">{t("storyP2")}</p>
        </div>
      </section>

      <section className="mt-16 flex flex-col gap-8">
        <header className="measure flex flex-col gap-3">
          <h2 className="font-display text-h2 font-bold tracking-tight">
            {t("valuesTitle")}
          </h2>
          <p className="text-body text-text-muted">{t("valuesSubtitle")}</p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {aboutValues.map((value) => (
            <ValueCard
              key={value.key}
              icon={value.icon}
              title={t(`values.${value.key}.title`)}
              description={t(`values.${value.key}.description`)}
            />
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-border bg-surface p-8 sm:p-10">
        <h2 className="font-display text-h2 font-bold tracking-tight">
          {t("statsTitle")}
        </h2>
        <dl className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="font-display text-h2 font-bold text-primary">
                {stat.value}
              </dt>
              <dd className="text-body text-text-muted">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 flex flex-col gap-6 rounded-2xl border border-border bg-surface p-8 sm:p-10">
        <h2 className="font-display text-h2 font-bold tracking-tight">
          {t("localTitle")}
        </h2>
        <p className="measure text-body text-text-muted">{t("localText")}</p>
        <NapBlock showLegalName />
        <Link href="/kontakti" className={buttonVariants({ variant: "secondary" })}>
          {t("ctaButton")}
        </Link>
      </section>

      <section className="mt-16 flex flex-col items-start gap-6 rounded-2xl border border-border bg-surface p-8 sm:p-10">
        <h2 className="font-display text-h2 font-bold tracking-tight">
          {t("ctaTitle")}
        </h2>
        <p className="measure text-body text-text-muted">{t("ctaSubtitle")}</p>
        <Link href="/kontakti" className={buttonVariants({ size: "lg" })}>
          {t("ctaButton")}
        </Link>
      </section>
    </>
  );
}

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-bg p-6 transition-colors duration-300 ease-brand hover:border-primary/30 sm:p-8">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface text-primary">
        <Icon className="h-6 w-6" />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-h3 font-bold tracking-tight">{title}</h3>
        <p className="text-body text-text-muted">{description}</p>
      </div>
    </div>
  );
}
