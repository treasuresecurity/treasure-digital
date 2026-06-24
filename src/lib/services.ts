import type { LucideIcon } from "lucide-react";
import {
  Smartphone,
  Code2,
  Megaphone,
  ShoppingCart,
  Search,
  MousePointerClick,
  Share2,
  Users,
} from "lucide-react";

export type ServiceKey =
  | "app"
  | "web"
  | "marketing"
  | "eshop"
  | "seo"
  | "googleAds"
  | "metaAds"
  | "social";

export interface Service {
  key: ServiceKey;
  slug: string;
  href: string;
  icon: LucideIcon;
  /** Shown in the priority group on the services hub */
  priority?: boolean;
  /** Large bento card on the homepage (app only) */
  featured?: boolean;
}

export const allServices: Service[] = [
  {
    key: "app",
    slug: "prilozhenia",
    href: "/uslugi/prilozhenia",
    icon: Smartphone,
    priority: true,
    featured: true,
  },
  {
    key: "web",
    slug: "web-razrabotka",
    href: "/uslugi/web-razrabotka",
    icon: Code2,
    priority: true,
  },
  {
    key: "marketing",
    slug: "digitalen-marketing",
    href: "/uslugi/digitalen-marketing",
    icon: Megaphone,
    priority: true,
  },
  {
    key: "eshop",
    slug: "onlain-magazin",
    href: "/uslugi/onlain-magazin",
    icon: ShoppingCart,
  },
  { key: "seo", slug: "seo", href: "/uslugi/seo", icon: Search },
  {
    key: "googleAds",
    slug: "google-ads",
    href: "/uslugi/google-ads",
    icon: MousePointerClick,
  },
  {
    key: "metaAds",
    slug: "facebook-reklama",
    href: "/uslugi/facebook-reklama",
    icon: Share2,
  },
  {
    key: "social",
    slug: "sotsialni-mrezhi",
    href: "/uslugi/sotsialni-mrezhi",
    icon: Users,
  },
];

/** @deprecated use allServices.filter(s => s.priority) */
export const moneyServices = allServices.filter((s) => s.priority);

export function getServiceBySlug(slug: string) {
  return allServices.find((s) => s.slug === slug);
}

export function getAllServiceSlugs() {
  return allServices.map((s) => s.slug);
}
