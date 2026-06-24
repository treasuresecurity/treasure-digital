"use client";

import { motion, useReducedMotion } from "motion/react";
import { INFINITY_MARK_PATH, INFINITY_MARK_VIEWBOX } from "@/components/ui/infinity-mark-path";

export function InfinityMark({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox={INFINITY_MARK_VIEWBOX}
      fill="none"
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="td-infinity" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" style={{ stopColor: "var(--brand-blue)" }} />
          <stop offset="45%" style={{ stopColor: "var(--brand-blue-300)" }} />
          <stop offset="100%" style={{ stopColor: "var(--brand-amber)" }} />
        </linearGradient>
      </defs>
      <motion.path
        d={INFINITY_MARK_PATH}
        stroke="url(#td-infinity)"
        strokeWidth={11}
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.35 }}
        animate={
          reduce
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: [0, 1], opacity: 1 }
        }
        transition={
          reduce
            ? undefined
            : {
                duration: 3,
                ease: [0.22, 1, 0.36, 1],
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0.8,
              }
        }
      />
    </svg>
  );
}
