import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { rules } from "@/lib/rules/rules";
import { getRuleContent } from "@/lib/rules/get-rule";
import { RulesList } from "@/components/RulesList";

export default async function RulesPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("rules");

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
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-medium">{t("title")}</h2>
      <Link href="/rules/situations" className="text-sm underline">
        {t("situations.title")}
      </Link>
      <RulesList
        items={items}
        categoryLabels={categoryLabels}
        searchPlaceholder={t("searchPlaceholder")}
        emptyLabel={t("empty")}
      />
    </div>
  );
}
