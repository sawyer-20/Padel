import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { fetchNews } from "@/lib/news/fetch-news";
import { availableNewsLanguages } from "@/lib/news/sources";
import { NewsList } from "@/components/NewsList";

// Dados vivos — nunca pré-gerados no build (mesmo padrão de Rankings/Torneios).
export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("news");

  const { items, failedSourceIds } = await fetchNews();
  const allSourcesFailed = items.length === 0 && failedSourceIds.length > 0;

  if (allSourcesFailed) {
    return <p role="alert">{t("error")}</p>;
  }

  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
  const languageNames = new Intl.DisplayNames([locale], { type: "language" });

  const listItems = items.map((item) => ({
    id: item.id,
    title: item.title,
    url: item.url,
    sourceName: item.sourceName,
    sourceLanguage: item.sourceLanguage,
    formattedDate: item.publishedAt ? dateFormatter.format(new Date(item.publishedAt)) : null,
    isForeignLanguage: item.sourceLanguage !== locale,
  }));

  const languageLabels = Object.fromEntries(
    availableNewsLanguages.map((lang) => [lang, languageNames.of(lang) ?? lang.toUpperCase()]),
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-medium">{t("title")}</h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{t("intro")}</p>

      {failedSourceIds.length > 0 && (
        <p role="status" className="text-xs text-neutral-500">
          {t("partialError")}
        </p>
      )}

      <NewsList
        items={listItems}
        languages={availableNewsLanguages}
        languageLabels={languageLabels}
        filterLabel={t("filterLabel")}
        filterAllLabel={t("filterAll")}
        emptyLabel={t("empty")}
        foreignLanguageLabel={t("originalInOtherLanguage")}
      />
    </div>
  );
}
