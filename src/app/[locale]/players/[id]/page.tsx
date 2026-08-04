import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { padelApiSource } from "@/lib/data-sources/padel-api-source";
import type { MatchSummary, PlayerProfile } from "@/lib/padel-api/schemas";
import { MatchListItem, type MatchTournamentInfo } from "@/components/MatchListItem";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { formatCountry } from "@/lib/format/labels";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { formatDate, formatDateRange } from "@/lib/format/dates";
import type { PlayerPair } from "@/lib/padel-api/schemas";

// Nunca gerado estaticamente com dados reais no build (regra §1.1 do PROJECT.md).
export const dynamic = "force-dynamic";

// A resposta de /players/{id}/matches só traz o id do torneio (via connections.tournament),
// não o nome — é preciso um pedido por torneio distinto para o mostrar. allSettled: um
// torneio que falhe a carregar não deve tirar a data/resultado dos restantes.
async function getTournamentsById(ids: string[]): Promise<Map<string, MatchTournamentInfo>> {
  const results = await Promise.allSettled(ids.map((tournamentId) => padelApiSource.getTournament(tournamentId)));
  const map = new Map<string, MatchTournamentInfo>();
  results.forEach((result, index) => {
    const tournamentId = ids[index];
    if (tournamentId !== undefined && result.status === "fulfilled") {
      map.set(tournamentId, { id: tournamentId, name: result.value.name });
    }
  });
  return map;
}

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
  const tCommon = await getTranslations("common");

  let player: PlayerProfile | null = null;
  let matches: MatchSummary[] = [];
  let pairs: PlayerPair[] = [];
  let tournamentsById = new Map<string, MatchTournamentInfo>();
  let errored = false;

  try {
    [player, matches] = await Promise.all([padelApiSource.getPlayer(id), padelApiSource.getPlayerMatches(id)]);
    const uniqueTournamentIds = [
      ...new Set(matches.map((match) => match.tournamentId).filter((tid): tid is string => tid !== null)),
    ];
    tournamentsById = await getTournamentsById(uniqueTournamentIds);
  } catch (error) {
    console.error("Falha ao carregar ficha de jogador:", error);
    errored = true;
  }

  if (errored || !player) {
    return <p role="alert">{t("player.error")}</p>;
  }

  // Depois do lote principal e em separado: as duplas são um extra e a API
  // devolve 429 quando lhe caem vários pedidos ao mesmo tempo. Se falharem, a
  // ficha continua a mostrar tudo o resto.
  try {
    pairs = await padelApiSource.getPlayerPairs(id);
  } catch (error) {
    console.error("Falha ao carregar as duplas do jogador:", error);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs
        locale={locale as Locale}
        items={[
          { label: tCommon("nav.home"), path: "/" },
          { label: tCommon("nav.rankings"), path: "/rankings" },
          { label: player.name },
        ]}
      />

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

      {pairs.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-faint">
            {t("player.partners")}
          </h2>

          <ul className="overflow-hidden rounded-lg border border-line bg-surface">
            {pairs.map((pair) => {
              const current = pair.status === "current";
              const period =
                pair.firstMatchAt && pair.lastMatchAt
                  ? current
                    ? t("player.partnerSince", { date: formatDate(locale, pair.firstMatchAt) })
                    : formatDateRange(locale, pair.firstMatchAt, pair.lastMatchAt)
                  : null;

              return (
                <li
                  key={pair.id}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-line px-4 py-3 text-sm last:border-b-0"
                >
                  {pair.partner ? (
                    <Link
                      href={`/players/${pair.partner.id}`}
                      className="font-medium text-ink no-underline hover:text-accent"
                    >
                      {pair.partner.name}
                    </Link>
                  ) : (
                    <span className="font-medium text-ink">{pair.name}</span>
                  )}

                  {current && <Badge tone="accent">{t("player.partnerCurrent")}</Badge>}

                  {period && <span className="text-ink-muted">{period}</span>}

                  {/* Só o par atual traz pontos; nos antigos a API devolve null.
                      Mostrar uma coluna vazia em 7 de 8 linhas seria pior do que
                      não mostrar nada. */}
                  {!pair.points.masked && pair.points.value !== null && (
                    <span className="ml-auto tabular-nums text-ink-muted">
                      {t("player.partnerPoints", { points: pair.points.value })}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-faint">
          {t("player.recentMatches")}
        </h2>
        {matches.length === 0 ? (
          <p className="text-ink-muted">{t("player.noMatches")}</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {matches.map((match) => (
              <MatchListItem
                key={match.id}
                match={match}
                locale={locale}
                tournament={match.tournamentId ? (tournamentsById.get(match.tournamentId) ?? null) : null}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
