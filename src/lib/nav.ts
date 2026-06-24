// Primary navigation. Hrefs use Latin-transliteration slugs (master-plan §5).
// `key` maps to a string in the "nav" message namespace.
export const navItems = [
  { key: "services", href: "/uslugi" },
  { key: "portfolio", href: "/portfolio" },
  { key: "about", href: "/za-nas" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/kontakti" },
] as const;

export type NavItem = (typeof navItems)[number];
