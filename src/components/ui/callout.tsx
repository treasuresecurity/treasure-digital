import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Callout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <aside
      className={cn(
        "not-prose my-8 rounded-2xl border border-border border-l-4 border-l-primary bg-surface px-5 py-4",
      )}
    >
      {title ? (
        <p className="mb-2 text-small font-semibold uppercase tracking-wider text-text-muted">
          {title}
        </p>
      ) : null}
      <div className="text-body text-text [&>p:last-child]:mb-0 [&>p]:mb-3">
        {children}
      </div>
    </aside>
  );
}
