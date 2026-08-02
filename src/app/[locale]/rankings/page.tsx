import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { padelApiSource } from "@/lib/data-sources/padel-api-source";
import type { RankingsCategory } from "@/lib/data-sources/padel-data-source";
import type { RankingEntry } from "@/lib/padel-api/schemas";
import { Link } from "@/i18n/navigation";
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{t("title")}</h2>
        <nav className="flex gap-3 text-sm" aria-label={t("categoryToggleLabel")}>
          <a href="?category=men" className={category === "men" ? "font-semibold underline" : "text-neutral-500"}>
            {t("men")}
          </a>
          <a
            href="?category=women"
            className={category === "women" ? "font-semibold underline" : "text-neutral-500"}
          >
            {t("women")}
          </a>
        </nav>
      </div>

      {errored && <p role="alert">{t("error")}</p>}

      {!errored && entries !== null && entries.length === 0 && <p>{t("empty")}</p>}

      {!errored && entries !== null && entries.length > 0 && (
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <th className="py-2 font-medium">{t("columns.position")}</th>
              <th className="py-2 font-medium">{t("columns.player")}</th>
              <th className="py-2 font-medium">{t("columns.country")}</th>
              <th className="py-2 font-medium">{t("columns.points")}</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.playerId} className="border-b border-neutral-100 dark:border-neutral-900">
                <td className="py-2">{entry.ranking.masked ? t("maskedValue") : entry.ranking.value}</td>
                <td className="py-2">
                  <Link href={`/players/${entry.playerId}`} className="underline">
                    {entry.name}
                  </Link>
                </td>
                <td className="py-2">{entry.nationality ?? "—"}</td>
                <td className="py-2">{entry.points.masked ? t("maskedValue") : entry.points.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!errored && hasMaskedValues && <p className="text-xs text-neutral-500">{t("maskedNotice")}</p>}
    </div>
  );
}
