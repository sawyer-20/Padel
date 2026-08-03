import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { marked } from "marked";
import type { Locale } from "@/i18n/routing";
import { glossary, getGlossaryContent } from "@/lib/glossary/get-glossary";
import { needsReviewNotice } from "@/lib/rules/get-rule";
import { GlossaryList } from "@/components/GlossaryList";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { definedTermSetSchema, type GlossaryEntry } from "@/lib/seo/schema";
import { stripMarkdown } from "@/lib/seo/excerpt";
import { staticPageMetadata, type LocaleParams } from "@/lib/seo/page-metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata(locale, "glossary", "/training/glossary");
}

export default async function GlossaryPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("training");
  const tCommon = await getTranslations("common");

  const terms: GlossaryEntry[] = [];

  const items: {
    slug: string;
    term: string;
    definitionHtml: string;
    needsReview: boolean;
    category: string;
  }[] = [];

  for (const entry of glossary) {
    const content = getGlossaryContent(entry.slug, locale);
    if (content) {
      items.push({
        slug: entry.slug,
        term: content.term,
        definitionHtml: marked.parse(content.definitionMd) as string,
        needsReview: needsReviewNotice(content.status),
        category: entry.category,
      });

      terms.push({ term: content.term, definition: stripMarkdown(content.definitionMd) });
    }
  }

  const categoryLabels: Record<string, string> = {
    shots: t("glossary.categories.shots"),
    tactics: t("glossary.categories.tactics"),
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: tCommon("nav.home"), path: "/" },
          { label: tCommon("nav.training"), path: "/training" },
          { label: t("glossary.title") },
        ]}
      />

      <JsonLd data={definedTermSetSchema(locale, t("glossary.title"), terms)} />

      <PageHeader title={t("glossary.title")} lead={t("glossary.intro")} />

      <GlossaryList
        items={items}
        categoryLabels={categoryLabels}
        searchPlaceholder={t("glossary.searchPlaceholder")}
        emptyLabel={t("glossary.empty")}
        pendingReviewNotice={t("pendingReviewNotice")}
      />
    </div>
  );
}
