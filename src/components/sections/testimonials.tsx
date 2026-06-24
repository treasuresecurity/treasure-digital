import { getTranslations } from "next-intl/server";
import { Quote } from "lucide-react";
import { testimonialKeys } from "@/lib/testimonials";

export async function Testimonials() {
  const t = await getTranslations("testimonials");

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
      </header>

      <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        {testimonialKeys.map((key) => (
          <figure
            key={key}
            className="flex h-full flex-col gap-6 rounded-2xl border border-border bg-surface p-6 sm:p-8"
          >
            <Quote className="h-8 w-8 text-accent" aria-hidden />
            <blockquote className="measure text-body text-text">
              &ldquo;{t(`items.${key}.quote`)}&rdquo;
            </blockquote>
            <figcaption className="mt-auto flex flex-col gap-1 border-t border-border pt-4">
              <cite className="not-italic font-display text-h3 font-bold text-text">
                {t(`items.${key}.name`)}
              </cite>
              <span className="text-small text-text-muted">
                {t(`items.${key}.role`)}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
