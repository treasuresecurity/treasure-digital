import type { LucideIcon } from "lucide-react";
import {
  MessageSquare,
  Lightbulb,
  Hammer,
  Rocket,
  TrendingUp,
} from "lucide-react";

// Homepage process steps (master-plan §6 — "Как го правим").
// `key` maps into the "process.steps" message namespace.
export interface ProcessStep {
  key: "discover" | "plan" | "build" | "launch" | "grow";
  icon: LucideIcon;
  step: number;
}

export const processSteps: ProcessStep[] = [
  { key: "discover", icon: MessageSquare, step: 1 },
  { key: "plan", icon: Lightbulb, step: 2 },
  { key: "build", icon: Hammer, step: 3 },
  { key: "launch", icon: Rocket, step: 4 },
  { key: "grow", icon: TrendingUp, step: 5 },
];
