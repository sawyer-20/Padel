import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui";
import { buildSearchIndex } from "@/lib/search/build-index";
import { search } from "@/lib/search/search";
import type { SearchDocType } from "@/lib/search/types";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { LocaleParams } from "@/lib/seo/page-metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return buildPageMetadata({
    locale: locale as Locale,
    path: "/search",
    title: t("search.title"),
    description: t("search.metaDescription"),
    // Páginas de resultados não pertencem ao índice de um motor de pesquisa:
    // são infinitas e não têm conteúdo próprio.
    noIndex: true,
  });
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("common");
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  const results = query ? search(buildSearchIndex(locale), query) : [];

  const typeLabels: Record<SearchDocType, string> = {
    rule: t("search.types.rule"),
    situation: t("search.types.situation"),
    term: t("search.types.term"),
    tip: t("search.types.tip"),
    faq: t("search.types.faq"),
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title={t("search.title")} />

      {/* Repetida aqui, e não só no cabeçalho, para se poder corrigir a pesquisa
          sem ter de voltar ao topo da página. Form simples: funciona sem
          JavaScript e o resultado fica num URL que se pode partilhar. */}
      <form action={`/${locale}/search`} method="get" className="mb-6" role="search">
        <label htmlFor="search-page-input" className="sr-only">
          {t("search.label")}
        </label>
        <div className="flex gap-2">
          <input
            id="search-page-input"
            type="search"
            name="q"
            defaultValue={query}
            placeholder={t("search.placeholder")}
            autoFocus
            className="min-w-0 flex-1 rounded-md border border-line bg-surface px-3 py-2 text-ink placeholder:text-ink-faint"
          />
          <button
            type="submit"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-ink"
          >
            {t("search.submit")}
          </button>
        </div>
      </form>

      {!query && <p className="text-ink-muted">{t("search.noQuery")}</p>}

      {query && results.length === 0 && (
        <div className="rounded-lg border border-dashed border-line px-4 py-8 text-center">
          <p className="text-ink-muted">{t("search.noResults", { query })}</p>
          <p className="mt-3 text-sm">
            <Link href="/faq" className="text-accent no-underline hover:underline">
              {t("search.tryFaq")}
            </Link>
          </p>
        </div>
      )}

      {query && results.length > 0 && (
        <>
          <p aria-live="polite" className="mb-4 text-sm text-ink-faint">
            {t("search.resultCount", { count: results.length, query })}
          </p>

          <ul className="flex flex-col gap-3">
            {results.map((result) => (
              <li key={result.doc.id}>
                <Link
                  href={result.doc.href}
                  className="block rounded-lg border border-line bg-surface p-4 no-underline transition-colors hover:border-accent"
                >
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-medium text-ink">{result.doc.title}</span>
                    <Badge>{typeLabels[result.doc.type]}</Badge>
                  </div>
                  <p className="mt-1.5 text-sm text-ink-muted">{result.snippet}</p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
