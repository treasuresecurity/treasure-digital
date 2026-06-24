import { getTranslations } from "next-intl/server";
import type { LucideIcon } from "lucide-react";
import { processSteps } from "@/lib/process";

export async function Process() {
  const t = await getTranslations("process");

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

        <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {processSteps.map((step, index) => (
            <ProcessStepCard
              key={step.key}
              step={step.step}
              icon={step.icon}
              title={t(`steps.${step.key}.title`)}
              description={t(`steps.${step.key}.description`)}
              isLast={index === processSteps.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProcessStepCard({
  step,
  icon: Icon,
  title,
  description,
  isLast,
}: {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
  isLast: boolean;
}) {
  const stepLabel = String(step).padStart(2, "0");

  return (
    <li className="relative flex flex-col">
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-1/2 top-8 hidden h-px w-[calc(100%+1.5rem)] bg-border lg:block"
        />
      )}

      <div className="relative flex h-full flex-col gap-4 rounded-2xl border border-border bg-bg p-6 transition-colors duration-300 ease-brand hover:border-primary/30">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-small font-medium uppercase tracking-wider text-text-muted">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {stepLabel}
          </span>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-primary">
            <Icon className="h-5 w-5" />
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display text-h3 font-bold tracking-tight">{title}</h3>
          <p className="text-body text-text-muted">{description}</p>
        </div>
      </div>
    </li>
  );
}
