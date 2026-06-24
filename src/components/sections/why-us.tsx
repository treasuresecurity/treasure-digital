import { getTranslations } from "next-intl/server";
import type { LucideIcon } from "lucide-react";
import { reasons } from "@/lib/why-us";

export async function WhyUs() {
  const t = await getTranslations("whyUs");

  return (
    <section className="border-y border-border bg-surface/30">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:py-28">
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

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
          {reasons.map((reason) => (
            <ReasonCard
              key={reason.key}
              icon={reason.icon}
              title={t(`items.${reason.key}.title`)}
              description={t(`items.${reason.key}.description`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonCard({
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
