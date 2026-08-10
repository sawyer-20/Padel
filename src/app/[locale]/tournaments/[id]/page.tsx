import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { padelApiSource } from "@/lib/data-sources/padel-api-source";
import type { MatchSummary, TournamentDetail } from "@/lib/padel-api/schemas";
import { MatchListItem } from "@/components/MatchListItem";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { formatDateRange } from "@/lib/format/dates";
import { formatCountry, formatTournamentLevel } from "@/lib/format/labels";
import { Badge } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { sportsEventSchema } from "@/lib/seo/schema";

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
    name = (await padelApiSource.getTournament(id)).name;
  } catch {
    // A API pode falhar; nesse caso a página mostra o erro e os metadados
    // caem no título genérico em vez de rebentarem o pedido inteiro.
  }

  if (!name) {
    return buildPageMetadata({
      locale: locale as Locale,
      path: `/tournaments/${id}`,
      title: t("tournaments.title"),
      description: t("tournaments.description"),
    });
  }

  return buildPageMetadata({
    locale: locale as Locale,
    path: `/tournaments/${id}`,
    title: name,
    description: t("tournamentDetail.description", { name }),
  });
}

type Category = "men" | "women";

function isCategory(value: string | undefined): value is Category {
  return value === "men" || value === "women";
}

function groupByRound(matches: MatchSummary[]): [string, MatchSummary[]][] {
  const sorted = [...matches].sort((a, b) => (a.round ?? 0) - (b.round ?? 0));
  const rounds = new Map<string, MatchSummary[]>();
  for (const match of sorted) {
    const list = rounds.get(match.roundName) ?? [];
    list.push(match);
    rounds.set(match.roundName, list);
  }
  return [...rounds.entries()];
}

export default async function TournamentDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { id } = await params;
  const { category: rawCategory } = await searchParams;
  const category: Category = isCategory(rawCategory) ? rawCategory : "men";
  const locale = await getLocale();
  const t = await getTranslations("tournaments");
  const tCommon = await getTranslations("common");
  // O rótulo de adversário em falta vive no namespace de rankings, junto ao
  // resto do vocabulário de jogos, e é partilhado com a ficha de jogador.
  const tRankings = await getTranslations("rankings");

  let tournament: TournamentDetail | null = null;
  let matches: MatchSummary[] = [];
  let errored = false;

  try {
    [tournament, matches] = await Promise.all([
      padelApiSource.getTournament(id),
      padelApiSource.getTournamentMatches(id),
    ]);
  } catch (error) {
    console.error("Falha ao carregar ficha de torneio:", error);
    errored = true;
  }

  if (errored || !tournament) {
    return <p role="alert">{t("error")}</p>;
  }

  const today = new Date().toISOString().slice(0, 10);
  const isOngoing =
    tournament.status !== "finished" &&
    tournament.startDate <= today &&
    today <= tournament.endDate;

  const categoryMatches = matches.filter((match) => match.category === category);
  const rounds = groupByRound(categoryMatches);
  const winners = tournament.winners[category];

  return (
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs
        locale={locale as Locale}
        items={[
          { label: tCommon("nav.home"), path: "/" },
          { label: tCommon("nav.tournaments"), path: "/tournaments" },
          { label: tournament.name },
        ]}
      />

      <JsonLd
        data={sportsEventSchema({
          locale: locale as Locale,
          path: `/tournaments/${id}`,
          name: tournament.name,
          startDate: tournament.startDate,
          endDate: tournament.endDate,
          location: tournament.location,
          country: tournament.country,
        })}
      />

      <div className="court-panel mb-6 rounded-xl border border-line p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge tone="neutral">{formatTournamentLevel(tournament.level)}</Badge>
          {isOngoing && <Badge tone="live">{t("status.ongoing")}</Badge>}
        </div>

        <h1 className="text-3xl font-bold uppercase leading-none tracking-tight text-balance sm:text-4xl">
          {tournament.name}
        </h1>

        <p className="mt-3 text-ink-muted">
          {[tournament.location, formatCountry(locale, tournament.country)]
            .filter(Boolean)
            .join(", ") || "—"}{" "}
          · {formatDateRange(locale, tournament.startDate, tournament.endDate)}
        </p>

        {tournament.prizeAmount !== null && (
          <p className="mt-1 text-sm text-ink-muted">
            {t("detail.prize")}: {tournament.prizeAmount} {tournament.prizeCurrency}
          </p>
        )}

        {/* Os vencedores são o desfecho da prova: merecem o tamanho de um
            resultado, não o de uma nota de rodapé. */}
        {tournament.status === "finished" && winners.length > 0 && (
          <div className="mt-5 border-t border-line pt-4">
            <p className="text-xs uppercase tracking-wider text-ink-faint">{t("detail.winners")}</p>
            <p className="mt-1 font-display text-2xl font-bold uppercase tracking-tight text-accent">
              {winners.join(" / ")}
            </p>
          </div>
        )}
      </div>

      <nav
        className="mb-5 flex w-fit rounded-md border border-line p-0.5"
        aria-label={t("categoryToggleLabel")}
      >
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

      {rounds.length === 0 && <p className="text-ink-muted">{t("detail.noMatches")}</p>}

      <div className="flex flex-col gap-6">
        {rounds.map(([roundName, roundMatches]) => (
          <section key={roundName}>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-ink-faint">
              {roundName}
            </h2>
            <ul className="flex flex-col gap-2">
              {roundMatches.map((match) => (
                <MatchListItem
                  key={match.id}
                  match={match}
                  locale={locale}
                  unknownOpponentLabel={tRankings("player.unknownOpponent")}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
