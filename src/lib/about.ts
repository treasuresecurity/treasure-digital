import type { LucideIcon } from "lucide-react";
import { Target, Sparkles, Eye, Handshake } from "lucide-react";

// About-page value pillars. `key` maps into "aboutPage.values" messages.
export interface AboutValue {
  key: "outcome" | "craft" | "transparency" | "partnership";
  icon: LucideIcon;
}

export const aboutValues: AboutValue[] = [
  { key: "outcome", icon: Target },
  { key: "craft", icon: Sparkles },
  { key: "transparency", icon: Eye },
  { key: "partnership", icon: Handshake },
];
