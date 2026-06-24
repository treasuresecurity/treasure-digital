import { INFINITY_MARK_PATH, INFINITY_MARK_VIEWBOX } from "@/components/ui/infinity-mark-path";
import { cn } from "@/lib/utils";

/** Static infinity mark — zero JS, used as LCP-friendly fallback before motion loads. */
export function InfinityMarkFallback({ className }: { className?: string }) {
  return (
    <svg
      viewBox={INFINITY_MARK_VIEWBOX}
      fill="none"
      className={cn(className)}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="td-infinity-static" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" style={{ stopColor: "var(--brand-blue)" }} />
          <stop offset="45%" style={{ stopColor: "var(--brand-blue-300)" }} />
          <stop offset="100%" style={{ stopColor: "var(--brand-amber)" }} />
        </linearGradient>
      </defs>
      <path
        d={INFINITY_MARK_PATH}
        stroke="url(#td-infinity-static)"
        strokeWidth={11}
        strokeLinecap="round"
      />
    </svg>
  );
}
