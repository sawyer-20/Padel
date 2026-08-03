import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { padelApiSource } from "@/lib/data-sources/padel-api-source";
import type { RankingsCategory } from "@/lib/data-sources/padel-data-source";
import type { RankingEntry } from "@/lib/padel-api/schemas";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/PageHeader";
import { RankingsTable, type RankingRow } from "@/components/RankingsTable";
import { formatCountry } from "@/lib/format/labels";
import { staticPageMetadata, type LocaleParams } from "@/lib/seo/page-metadata";

// Nunca gerado estaticamente com dados reais no build (regra §1.1 do PROJECT.md) — os
// rankings mudam e a build não deve depender de um PADEL_API_TOKEN válido.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata(locale, "rankings", "/rankings");
}

function isCategory(value: string | undefined): value is RankingsCategory {
  return value === "men" || value === "women";
}

export default async function RankingsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const locale = await getLocale();
  const t = await getTranslations("rankings");
  const { category: rawCategory } = await searchParams;
  const category: RankingsCategory = isCategory(rawCategory) ? rawCategory : "men";

  let entries: RankingEntry[] | null = null;
  let errored = false;

  try {
    entries = await padelApiSource.getRankings({ category });
  } catch (error) {
    console.error("Falha ao carregar rankings:", error);
    errored = true;
  }

  const hasMaskedValues =
    entries?.some((entry) => entry.ranking.masked || entry.points.masked) ?? false;

  // A formatação (máscara, país) acontece aqui e não no componente de cliente,
  // para que a pesquisa filtre exatamente o texto que está visível.
  const rows: RankingRow[] = (entries ?? []).map((entry) => ({
    playerId: entry.playerId,
    name: entry.name,
    country: formatCountry(locale, entry.nationality),
    position: entry.ranking.masked ? t("maskedValue") : String(entry.ranking.value),
    points: entry.points.masked ? t("maskedValue") : String(entry.points.value),
    positionNumber: entry.ranking.masked ? null : entry.ranking.value,
  }));

  return (
    <div>
      <PageHeader
        title={t("title")}
        actions={
          <nav
            className="flex rounded-md border border-line p-0.5"
            aria-label={t("categoryToggleLabel")}
          >
            {(["men", "women"] as const).map((option) => (
              // Link (e não <a>) para que trocar de categoria seja uma navegação
              // suave: sem recarregar a página nem perder a posição no scroll.
              <Link
                key={option}
                href={`/rankings?category=${option}`}
                scroll={false}
                aria-current={category === option ? "page" : undefined}
                className={`rounded px-3 py-1.5 text-sm no-underline ${
                  category === option
                    ? "bg-accent font-medium text-accent-ink"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {t(option)}
              </Link>
            ))}
          </nav>
        }
      />

      {errored && <p role="alert">{t("error")}</p>}

      {!errored && rows.length === 0 && <p>{t("empty")}</p>}

      {!errored && rows.length > 0 && (
        <RankingsTable
          // key por categoria: sem isto, a navegação suave entre masculino e
          // feminino mantém a mesma instância do componente e o texto que estava
          // na caixa de pesquisa continua a filtrar a lista nova — o ranking
          // aparece vazio e parece avariado.
          key={category}
          rows={rows}
          labels={{
            position: t("columns.position"),
            player: t("columns.player"),
            country: t("columns.country"),
            points: t("columns.points"),
            searchLabel: t("search.label"),
            searchPlaceholder: t("search.placeholder"),
            noResults: t.raw("search.noResults"),
            count: t.raw("search.count"),
          }}
        />
      )}

      {!errored && hasMaskedValues && (
        <p className="mt-3 text-xs text-ink-faint">{t("maskedNotice")}</p>
      )}
    </div>
  );
}
