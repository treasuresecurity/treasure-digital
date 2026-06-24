import Image from "next/image";
import { cn } from "@/lib/utils";

export function PortfolioCover({
  image,
  imageAlt,
  category,
  resultValue,
  resultLabel,
  className,
  imageClassName,
  priority = false,
}: {
  image?: string;
  imageAlt: string;
  category: string;
  resultValue: string;
  resultLabel: string;
  className?: string;
  imageClassName?: string;
  /** Set true for above-the-fold hero cards only (LCP). */
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-surface-2", className)}>
      {image ? (
        <>
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority={priority}
              loading={priority ? undefined : "lazy"}
              className={cn("object-cover object-top", imageClassName)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent" />
        </>
      ) : (
        <>
          <div className="aspect-[16/10] w-full opacity-25 [background:var(--gradient-brand)]" />
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:32px_32px]" />
        </>
      )}

      <div className="pointer-events-none absolute inset-0 flex min-h-[inherit] flex-col justify-between gap-4 p-5 sm:p-6">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-bg/80 px-3 py-1 text-small text-text-muted backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {category}
        </span>
        <div className="rounded-xl border border-border bg-bg/90 px-4 py-3 backdrop-blur-sm">
          <p className="font-display text-h3 font-bold leading-tight text-primary">
            {resultValue}
          </p>
          <p className="text-small text-text-muted">{resultLabel}</p>
        </div>
      </div>
    </div>
  );
}
