import { cn } from "@/lib/utils";
import type { BlogHeading } from "@/lib/blog/types";

const MIN_HEADINGS = 3;

export function BlogTableOfContents({
  headings,
  label,
  className,
  sticky = false,
}: {
  headings: BlogHeading[];
  label: string;
  className?: string;
  sticky?: boolean;
}) {
  if (headings.length < MIN_HEADINGS) return null;

  const list = (
    <ul className="flex flex-col gap-2">
      {headings.map((heading) => (
        <li
          key={heading.id}
          className={cn(heading.level === 3 && "pl-4")}
        >
          <a
            href={`#${heading.id}`}
            className="text-small text-text-muted transition-colors duration-200 ease-brand hover:text-primary"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );

  if (sticky) {
    return (
      <nav
        aria-label={label}
        className={cn(
          "sticky top-24 rounded-2xl border border-border bg-surface p-5",
          className,
        )}
      >
        <p className="mb-4 text-small font-semibold uppercase tracking-wider text-text-muted">
          {label}
        </p>
        {list}
      </nav>
    );
  }

  return (
    <details
      className={cn(
        "group rounded-2xl border border-border bg-surface",
        className,
      )}
    >
      <summary className="cursor-pointer list-none px-5 py-4 text-small font-semibold uppercase tracking-wider text-text-muted [&::-webkit-details-marker]:hidden">
        {label}
      </summary>
      <div className="border-t border-border px-5 pb-5 pt-4">{list}</div>
    </details>
  );
}
