import type { LucideIcon } from "lucide-react";
import { TrendingUp, Layers, Gauge, Handshake } from "lucide-react";

// Differentiators for the "why us" section (master-plan §6).
// `key` maps into the "whyUs.items" message namespace.
export interface Reason {
  key: "results" | "fullFunnel" | "performance" | "partnership";
  icon: LucideIcon;
}

export const reasons: Reason[] = [
  { key: "results", icon: TrendingUp },
  { key: "fullFunnel", icon: Layers },
  { key: "performance", icon: Gauge },
  { key: "partnership", icon: Handshake },
];
