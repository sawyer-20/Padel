import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { rules } from "@/lib/rules/rules";
import { getRuleContent } from "@/lib/rules/get-rule";
import { RulesList } from "@/components/RulesList";
import { PageHeader } from "@/components/PageHeader";
import { staticPageMetadata, type LocaleParams } from "@/lib/seo/page-metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata(locale, "rules", "/rules");
}

export default async function RulesPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("rules");
  const tCommon = await getTranslations("common");

  const items: { slug: string; title: string; category: string }[] = [];
  for (const rule of rules) {
    const content = getRuleContent(rule.slug, locale);
    if (content) {
      items.push({ slug: rule.slug, title: content.title, category: rule.category });
    }
  }

  const categoryLabels: Record<string, string> = {
    scoring: t("categories.scoring"),
    play: t("categories.play"),
    equipment: t("categories.equipment"),
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title={t("title")}
        actions={
          <div className="flex flex-wrap gap-2">
            <Link
              href="/rules/situations"
              className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink no-underline hover:border-line-strong"
            >
              {t("situations.title")}
            </Link>
            {/* Quem chega às Regras com uma dúvida de principiante encontra
                resposta mais depressa na FAQ do que a percorrer 19 artigos. */}
            <Link
              href="/faq"
              className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink no-underline hover:border-line-strong"
            >
              {tCommon("footer.faq")}
            </Link>
          </div>
        }
      />
      <RulesList
        items={items}
        categoryLabels={categoryLabels}
        searchPlaceholder={t("searchPlaceholder")}
        emptyLabel={t("empty")}
      />
    </div>
  );
}
