import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { marked } from "marked";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { situations, getSituationContent } from "@/lib/situations/get-situation";
import { needsReviewNotice } from "@/lib/rules/get-rule";
import { SituationsList } from "@/components/SituationsList";
import { PageHeader } from "@/components/PageHeader";
import { staticPageMetadata, type LocaleParams } from "@/lib/seo/page-metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata(locale, "situations", "/rules/situations");
}

export default async function SituationsPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("rules");

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
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/rules"
        className="mb-4 inline-block text-sm text-ink-muted no-underline hover:text-accent"
      >
        ← {t("backToIndex")}
      </Link>

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
