import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { marked } from "marked";
import type { Locale } from "@/i18n/routing";
import { faq, getFaqContent } from "@/lib/faq/get-faq";
import { needsReviewNotice } from "@/lib/rules/get-rule";
import { FaqList } from "@/components/FaqList";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, type FaqEntry } from "@/lib/seo/schema";
import { stripMarkdown } from "@/lib/seo/excerpt";
import { staticPageMetadata, type LocaleParams } from "@/lib/seo/page-metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata(locale, "faq", "/faq");
}

export default async function FaqPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("faq");
  const tCommon = await getTranslations("common");
  // O aviso de revisão pendente é o mesmo texto das Regras — reaproveitado em vez
  // de duplicado em mais cinco ficheiros de tradução.
  const tRules = await getTranslations("rules");

  const items: {
    slug: string;
    question: string;
    answerHtml: string;
    needsReview: boolean;
    category: string;
    relatedRuleSlug: string | null;
    relatedTermSlug: string | null;
  }[] = [];

  const schemaEntries: FaqEntry[] = [];

  for (const entry of faq) {
    const content = getFaqContent(entry.slug, locale);
    if (!content) continue;

    items.push({
      slug: entry.slug,
      question: content.question,
      answerHtml: marked.parse(content.answerMd) as string,
      needsReview: needsReviewNotice(content.status),
      category: entry.category,
      relatedRuleSlug: entry.relatedRuleSlug,
      relatedTermSlug: entry.relatedTermSlug,
    });

    schemaEntries.push({
      question: content.question,
      answer: stripMarkdown(content.answerMd),
    });
  }

  const categoryLabels: Record<string, string> = {
    basics: t("categories.basics"),
    rules: t("categories.rules"),
    equipment: t("categories.equipment"),
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs
        locale={locale}
        items={[{ label: tCommon("nav.home"), path: "/" }, { label: t("title") }]}
      />

      <JsonLd data={faqSchema(schemaEntries)} />

      <PageHeader title={t("title")} lead={t("intro")} />

      <FaqList
        items={items}
        categoryLabels={categoryLabels}
        searchPlaceholder={t("searchPlaceholder")}
        emptyLabel={t("empty")}
        pendingReviewNotice={tRules("pendingReviewNotice")}
        relatedRuleLabel={t("relatedRule")}
        relatedTermLabel={t("relatedTerm")}
      />
    </div>
  );
}
