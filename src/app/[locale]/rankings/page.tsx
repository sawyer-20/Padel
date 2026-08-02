import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { padelApiSource } from "@/lib/data-sources/padel-api-source";
import type { RankingsCategory } from "@/lib/data-sources/padel-data-source";
import type { RankingEntry } from "@/lib/padel-api/schemas";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/PageHeader";
import { formatCountry } from "@/lib/format/labels";
import { staticPageMetadata, type LocaleParams } from "@/lib/seo/page-metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata(locale, "rankings", "/rankings");
}

// Nunca gerado estaticamente com dados reais no build (regra §1.1 do PROJECT.md) — os
// rankings mudam e a build não deve depender de um PADEL_API_TOKEN válido.
export const dynamic = "force-dynamic";

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

  const hasMaskedValues = entries?.some((entry) => entry.ranking.masked || entry.points.masked) ?? false;

  return (
    <div>
      <PageHeader
        title={t("title")}
        actions={
          <nav className="flex rounded-md border border-line p-0.5" aria-label={t("categoryToggleLabel")}>
            {(["men", "women"] as const).map((option) => (
              <a
                key={option}
                href={`?category=${option}`}
                aria-current={category === option ? "page" : undefined}
                className={`rounded px-3 py-1.5 text-sm no-underline ${
                  category === option
                    ? "bg-accent font-medium text-accent-ink"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {t(option)}
              </a>
            ))}
          </nav>
        }
      />

      {errored && <p role="alert">{t("error")}</p>}

      {!errored && entries !== null && entries.length === 0 && <p>{t("empty")}</p>}

      {!errored && entries !== null && entries.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-line bg-surface">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  {t("columns.position")}
                </th>
                <th scope="col" className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  {t("columns.player")}
                </th>
                <th scope="col" className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  {t("columns.country")}
                </th>
                <th scope="col" className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  {t("columns.points")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {entries.map((entry) => (
                <tr key={entry.playerId} className="hover:bg-raised">
                  <td className="px-4 py-2.5 font-medium text-ink-muted">
                    {entry.ranking.masked ? t("maskedValue") : entry.ranking.value}
                  </td>
                  <td className="px-4 py-2.5">
                    <Link
                      href={`/players/${entry.playerId}`}
                      className="font-medium text-ink no-underline hover:text-accent"
                    >
                      {entry.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-ink-muted">
                    {formatCountry(locale, entry.nationality) ?? "—"}
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium">
                    {entry.points.masked ? t("maskedValue") : entry.points.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!errored && hasMaskedValues && (
        <p className="mt-3 text-xs text-ink-faint">{t("maskedNotice")}</p>
      )}
    </div>
  );
}
