import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function ServiceCover({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-12 sm:px-10 sm:py-16",
        className,
      )}
    >
      {/* blue→amber edge gradient (master-plan §3.3) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1 [background:var(--gradient-brand)]"
      />
      <div className="measure flex flex-col gap-4">
        <span className="inline-flex items-center gap-2 text-small font-medium uppercase tracking-wider text-text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {eyebrow}
        </span>
        <h1 className="text-balance font-display text-h1 font-bold tracking-tight">
          {title}
        </h1>
        <p className="text-body text-text-muted">{subtitle}</p>
      </div>
    </header>
  );
}

export function ServiceCta({
  title,
  buttonLabel,
}: {
  title: string;
  buttonLabel: string;
}) {
  return (
    <section className="rounded-2xl border border-border bg-surface/50 px-6 py-10 sm:px-10">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="measure font-display text-h3 font-bold tracking-tight">
          {title}
        </p>
        <Link
          href="/kontakti"
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-btn bg-primary px-7 text-body font-medium text-primary-foreground transition-all duration-200 ease-brand hover:-translate-y-0.5 hover:bg-brand-blue-600 hover:shadow-glow"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
