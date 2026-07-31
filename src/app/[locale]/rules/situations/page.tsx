import { getLocale, getTranslations } from "next-intl/server";
import { marked } from "marked";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { situations, getSituationContent } from "@/lib/situations/get-situation";
import { needsReviewNotice } from "@/lib/rules/get-rule";
import { SituationsList } from "@/components/SituationsList";

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
    <div className="flex flex-col gap-4">
      <Link href="/rules" className="text-sm underline">
        {t("backToIndex")}
      </Link>

      <h2 className="text-lg font-medium">{t("situations.title")}</h2>

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
