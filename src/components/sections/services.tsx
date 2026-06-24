import { getTranslations } from "next-intl/server";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { moneyServices } from "@/lib/services";
import { cn } from "@/lib/utils";

export async function Services() {
  const t = await getTranslations("services");

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:py-28">
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

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
        {moneyServices.map((service) => (
          <ServiceCard
            key={service.key}
            href={service.href}
            icon={service.icon}
            title={t(`items.${service.key}.title`)}
            description={t(`items.${service.key}.description`)}
            features={
              service.featured
                ? (t.raw(`items.${service.key}.features`) as string[])
                : undefined
            }
            learnMore={t("learnMore")}
            featured={service.featured}
          />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  href,
  icon: Icon,
  title,
  description,
  features,
  learnMore,
  featured,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
  learnMore: string;
  featured?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 ease-brand hover:-translate-y-1 sm:p-8",
        featured && "sm:col-span-2 lg:row-span-2 lg:justify-between",
      )}
    >
      {/* faint gradient edge on hover (master-plan §2.6) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl p-px opacity-0 transition-opacity duration-300 [background:var(--gradient-brand)] group-hover:opacity-60"
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="flex flex-col gap-5">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-primary transition-colors group-hover:border-primary/50">
          <Icon className="h-6 w-6" />
        </span>

        <div className="flex flex-col gap-2">
          <h3
            className={cn(
              "font-display font-bold tracking-tight",
              featured ? "text-h2" : "text-h3",
            )}
          >
            {title}
          </h3>
          <p className="text-body text-text-muted">{description}</p>
        </div>

        {features && (
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-small text-text-muted"
              >
                <Check className="h-4 w-4 shrink-0 text-accent" />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-2 flex justify-end">
        <span className="inline-flex items-center gap-1.5 text-small font-medium text-primary">
          {learnMore}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
