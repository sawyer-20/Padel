import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/PageHeader";
import { staticPageMetadata, type LocaleParams } from "@/lib/seo/page-metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata(locale, "training", "/training");
}

export default async function TrainingPage() {
  const t = await getTranslations("training");

  const sections = [
    { href: "/training/tips", title: t("tips.title"), description: t("tips.intro") },
    { href: "/training/glossary", title: t("glossary.title"), description: t("glossary.intro") },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title={t("title")} lead={t("intro")} />

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group rounded-lg border border-line bg-surface p-5 no-underline transition-colors hover:border-accent"
          >
            <h2 className="font-semibold tracking-tight text-ink group-hover:text-accent">
              {section.title}
            </h2>
            <p className="mt-1.5 text-sm text-ink-muted">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
