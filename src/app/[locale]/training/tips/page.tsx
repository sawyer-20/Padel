import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { marked } from "marked";
import type { Locale } from "@/i18n/routing";
import { tips, getTipContent } from "@/lib/tips/get-tip";
import { needsReviewNotice } from "@/lib/rules/get-rule";
import { TipsList } from "@/components/TipsList";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { staticPageMetadata, type LocaleParams } from "@/lib/seo/page-metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata(locale, "tips", "/training/tips");
}

export default async function TipsPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("training");
  const tCommon = await getTranslations("common");

  const items: {
    slug: string;
    title: string;
    bodyHtml: string;
    needsReview: boolean;
    category: string;
    relatedTermSlug: string | null;
  }[] = [];

  for (const tip of tips) {
    const content = getTipContent(tip.slug, locale);
    if (content) {
      items.push({
        slug: tip.slug,
        title: content.title,
        bodyHtml: marked.parse(content.bodyMd) as string,
        needsReview: needsReviewNotice(content.status),
        category: tip.category,
        relatedTermSlug: tip.relatedTermSlug,
      });
    }
  }

  const categoryLabels: Record<string, string> = {
    positioning: t("tips.categories.positioning"),
    "shot-choice": t("tips.categories.shotChoice"),
    teamwork: t("tips.categories.teamwork"),
    mindset: t("tips.categories.mindset"),
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: tCommon("nav.home"), path: "/" },
          { label: tCommon("nav.training"), path: "/training" },
          { label: t("tips.title") },
        ]}
      />

      <PageHeader title={t("tips.title")} lead={t("tips.intro")} />

      <TipsList
        items={items}
        categoryLabels={categoryLabels}
        searchPlaceholder={t("tips.searchPlaceholder")}
        emptyLabel={t("tips.empty")}
        pendingReviewNotice={t("pendingReviewNotice")}
        relatedTermLabel={t("tips.relatedTerm")}
      />
    </div>
  );
}
