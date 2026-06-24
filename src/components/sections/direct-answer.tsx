import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Concise, citable summary block for AEO / AI answer engines. */
export function DirectAnswerBlock({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-label={title}
      className={cn(
        "rounded-2xl border border-border bg-surface/50 p-6 sm:p-8",
        className,
      )}
    >
      <h2 className="text-small font-medium uppercase tracking-wider text-text-muted">
        {title}
      </h2>
      <p className="measure mt-3 text-body text-text">{children}</p>
    </section>
  );
}
