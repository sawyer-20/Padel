import { getTranslations } from "next-intl/server";
import { padelApiSource } from "@/lib/data-sources/padel-api-source";
import type { MatchSummary, TournamentDetail } from "@/lib/padel-api/schemas";

// Nunca gerado estaticamente com dados reais no build (regra §1.1 do PROJECT.md).
export const dynamic = "force-dynamic";

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
  const t = await getTranslations("tournaments");

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

  const categoryMatches = matches.filter((match) => match.category === category);
  const rounds = groupByRound(categoryMatches);
  const winners = tournament.winners[category];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-medium">{tournament.name}</h2>
        <p className="text-sm text-neutral-500">
          {[tournament.location, tournament.country].filter(Boolean).join(", ") || "—"} ·{" "}
          {tournament.startDate} – {tournament.endDate}
        </p>
        {tournament.prizeAmount !== null && (
          <p className="text-sm text-neutral-500">
            {t("detail.prize")}: {tournament.prizeAmount} {tournament.prizeCurrency}
          </p>
        )}
        {tournament.status === "finished" && winners.length > 0 && (
          <p className="text-sm font-medium">
            {t("detail.winners")}: {winners.join(" / ")}
          </p>
        )}
      </div>

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

      {rounds.length === 0 && <p>{t("detail.noMatches")}</p>}

      {rounds.map(([roundName, roundMatches]) => (
        <section key={roundName}>
          <h3 className="mb-2 text-sm font-semibold uppercase text-neutral-500">{roundName}</h3>
          <ul className="flex flex-col gap-2">
            {roundMatches.map((match) => (
              <li key={match.id} className="rounded border border-neutral-200 p-3 text-sm dark:border-neutral-800">
                <div className={match.winner === "team_1" ? "font-semibold" : ""}>{match.team1.join(" / ")}</div>
                <div className={match.winner === "team_2" ? "font-semibold" : ""}>{match.team2.join(" / ")}</div>
                {match.score.length > 0 && (
                  <div className="mt-1 text-neutral-500">
                    {match.score.map((set) => `${set.team1}-${set.team2}`).join(", ")}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
