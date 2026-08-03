import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { marked } from "marked";
import type { Locale } from "@/i18n/routing";
import { situations, getSituationContent } from "@/lib/situations/get-situation";
import { needsReviewNotice } from "@/lib/rules/get-rule";
import { SituationsList } from "@/components/SituationsList";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, type FaqEntry } from "@/lib/seo/schema";
import { stripMarkdown } from "@/lib/seo/excerpt";
import { staticPageMetadata, type LocaleParams } from "@/lib/seo/page-metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata(locale, "situations", "/rules/situations");
}

export default async function SituationsPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("rules");
  const tCommon = await getTranslations("common");

  const faqEntries: FaqEntry[] = [];

  const items: {
    slug: string;
    question: string;
    answerHtml: string;
    needsReview: boolean;
    fipArticleRef: string;
    relatedRuleSlug: string | null;
  }[] = [];

  for (const situation of situations) {
    const content = getSituationContent(situation.slug, locale);
    if (content) {
      items.push({
        slug: situation.slug,
        question: content.question,
        answerHtml: marked.parse(content.answerMd) as string,
        needsReview: needsReviewNotice(content.status),
        fipArticleRef: situation.fipArticleRef,
        relatedRuleSlug: situation.relatedRuleSlug,
      });

      faqEntries.push({
        question: content.question,
        answer: stripMarkdown(content.answerMd),
      });
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: tCommon("nav.home"), path: "/" },
          { label: tCommon("nav.rules"), path: "/rules" },
          { label: t("situations.title") },
        ]}
      />

      {/* Um FAQPage a sério: cada situação é literalmente uma pergunta com
          resposta, visível na página. */}
      <JsonLd data={faqSchema(faqEntries)} />

      <PageHeader title={t("situations.title")} />

      <SituationsList
        items={items}
        searchPlaceholder={t("situations.searchPlaceholder")}
        emptyLabel={t("situations.empty")}
        pendingReviewNotice={t("pendingReviewNotice")}
        officialSourceLabel={t("officialSource")}
        relatedRuleLabel={t("situations.relatedRule")}
      />
    </div>
  );
}
