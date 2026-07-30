import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { padelApiSource } from "@/lib/data-sources/padel-api-source";
import type { MatchSummary, PlayerProfile } from "@/lib/padel-api/schemas";
import { MatchListItem } from "@/components/MatchListItem";

// Nunca gerado estaticamente com dados reais no build (regra §1.1 do PROJECT.md).
export const dynamic = "force-dynamic";

export default async function PlayerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await getTranslations("rankings");

  let player: PlayerProfile | null = null;
  let matches: MatchSummary[] = [];
  let errored = false;

  try {
    [player, matches] = await Promise.all([padelApiSource.getPlayer(id), padelApiSource.getPlayerMatches(id)]);
  } catch (error) {
    console.error("Falha ao carregar ficha de jogador:", error);
    errored = true;
  }

  if (errored || !player) {
    return <p role="alert">{t("player.error")}</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        {player.photoUrl ? (
          <Image
            src={player.photoUrl}
            alt={player.name}
            width={80}
            height={80}
            priority
            className="rounded-full object-cover"
          />
        ) : (
          <div className="h-20 w-20 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        )}
        <div>
          <h2 className="text-lg font-medium">{player.name}</h2>
          <p className="text-sm text-neutral-500">
            {[player.nationality, player.hand, player.side].filter(Boolean).join(" · ") || "—"}
          </p>
          <p className="text-sm">
            {t("columns.position")}: {player.ranking.masked ? t("maskedValue") : player.ranking.value} ·{" "}
            {t("columns.points")}: {player.points.masked ? t("maskedValue") : player.points.value}
          </p>
        </div>
      </div>

      <section>
        <h3 className="mb-2 text-sm font-semibold uppercase text-neutral-500">{t("player.recentMatches")}</h3>
        {matches.length === 0 ? (
          <p>{t("player.noMatches")}</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {matches.map((match) => (
              <MatchListItem key={match.id} match={match} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
