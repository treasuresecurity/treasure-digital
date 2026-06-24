import {
  INFINITY_MARK_PATH,
  INFINITY_MARK_VIEWBOX,
} from "@/components/ui/infinity-mark-path";

export function FaviconMark({ size = 22 }: { size?: number }) {
  const height = Math.round(size * 0.64);
  return (
    <svg
      width={size}
      height={height}
      viewBox={INFINITY_MARK_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={INFINITY_MARK_PATH}
        stroke="url(#favicon-gradient)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="favicon-gradient" x1="0" y1="0" x2="200" y2="0">
          <stop offset="0%" stopColor="#0061FE" />
          <stop offset="100%" stopColor="#E8A50B" />
        </linearGradient>
      </defs>
    </svg>
  );
}
