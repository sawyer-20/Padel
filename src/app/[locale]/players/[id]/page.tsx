import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { padelApiSource } from "@/lib/data-sources/padel-api-source";
import type { MatchSummary, PlayerProfile } from "@/lib/padel-api/schemas";
import { MatchListItem } from "@/components/MatchListItem";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { formatCountry } from "@/lib/format/labels";

// Nunca gerado estaticamente com dados reais no build (regra §1.1 do PROJECT.md).
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  let name: string | null = null;
  try {
    name = (await padelApiSource.getPlayer(id)).name;
  } catch {
    // Ver nota igual na ficha de torneio: metadados degradam, página não rebenta.
  }

  if (!name) {
    return buildPageMetadata({
      locale: locale as Locale,
      path: `/players/${id}`,
      title: t("rankings.title"),
      description: t("rankings.description"),
    });
  }

  return buildPageMetadata({
    locale: locale as Locale,
    path: `/players/${id}`,
    title: name,
    description: t("playerDetail.description", { name }),
  });
}

export default async function PlayerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const locale = await getLocale();
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
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex flex-wrap items-center gap-5 rounded-lg border border-line bg-surface p-5">
        {player.photoUrl ? (
          <Image
            src={player.photoUrl}
            alt=""
            width={88}
            height={88}
            priority
            className="h-22 w-22 rounded-full object-cover"
          />
        ) : (
          <div className="h-22 w-22 rounded-full bg-raised" aria-hidden="true" />
        )}
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight">{player.name}</h1>
          <p className="mt-0.5 text-sm text-ink-muted">
            {[formatCountry(locale, player.nationality), player.hand, player.side]
              .filter(Boolean)
              .join(" · ") || "—"}
          </p>
          <dl className="mt-3 flex gap-6 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink-faint">
                {t("columns.position")}
              </dt>
              <dd className="text-lg font-semibold tabular-nums">
                {player.ranking.masked ? t("maskedValue") : player.ranking.value}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink-faint">
                {t("columns.points")}
              </dt>
              <dd className="text-lg font-semibold tabular-nums">
                {player.points.masked ? t("maskedValue") : player.points.value}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-faint">
          {t("player.recentMatches")}
        </h2>
        {matches.length === 0 ? (
          <p className="text-ink-muted">{t("player.noMatches")}</p>
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
