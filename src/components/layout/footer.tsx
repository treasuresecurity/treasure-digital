import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/layout/logo";
import { NapBlock } from "@/components/layout/nap-block";
import { navItems } from "@/lib/nav";

const legalLinks = [
  { key: "privacy" as const, href: "/pravna-informatsia/poveritelnost" },
  { key: "terms" as const, href: "/pravna-informatsia/uslovia" },
  { key: "cookies" as const, href: "/pravna-informatsia/biskvitki" },
];

export async function Footer() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Logo label={tc("siteName")} />
            <p className="measure text-small text-text-muted">{t("tagline")}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-small font-medium uppercase tracking-wider text-text-muted">
              {t("navigation")}
            </h3>
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-body text-text-muted transition-colors hover:text-text"
                  >
                    {tn(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-small font-medium uppercase tracking-wider text-text-muted">
              {t("legal")}
            </h3>
            <ul className="flex flex-col gap-2">
              {legalLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-body text-text-muted transition-colors hover:text-text"
                  >
                    {t(`legalLinks.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-small font-medium uppercase tracking-wider text-text-muted">
              {t("contact")}
            </h3>
            <NapBlock />
            <Link
              href="/kontakti"
              className="text-small font-medium text-primary transition-colors hover:text-brand-blue-600"
            >
              {t("contactCta")}
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-8 text-small text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {tc("siteName")}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
