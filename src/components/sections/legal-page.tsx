import { getTranslations } from "next-intl/server";
import type { LegalPage } from "@/lib/legal";

interface LegalSection {
  title: string;
  paragraphs: string[];
}

export async function LegalPageContent({ pageKey }: { pageKey: LegalPage["key"] }) {
  const t = await getTranslations(`legalPages.items.${pageKey}`);
  const tc = await getTranslations("legalPages");
  const sections = t.raw("sections") as LegalSection[];

  return (
    <>
      <header className="measure flex flex-col gap-4 border-b border-border pb-10">
        <span className="inline-flex w-fit items-center gap-2 text-small font-medium uppercase tracking-wider text-text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {t("eyebrow")}
        </span>
        <h1 className="text-balance font-display text-h1 font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-small text-text-muted">
          {tc("lastUpdatedLabel")}: {t("lastUpdated")}
        </p>
      </header>

      <div className="measure mt-10 flex flex-col gap-10">
        {sections.map((section) => (
          <section key={section.title} className="flex flex-col gap-3">
            <h2 className="font-display text-h3 font-bold tracking-tight">
              {section.title}
            </h2>
            <div className="flex flex-col gap-3">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-body text-text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
