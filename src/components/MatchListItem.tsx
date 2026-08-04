import type { MatchSummary } from "@/lib/padel-api/schemas";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/format/dates";

/** Torneio da partida, já resolvido pelo servidor (nome não vem na resposta de matches). */
export type MatchTournamentInfo = { id: string; name: string };

export function MatchListItem({
  match,
  locale,
  tournament,
}: {
  match: MatchSummary;
  locale: string;
  tournament?: MatchTournamentInfo | null;
}) {
  const meta = [
    match.playedAt ? formatDate(locale, match.playedAt) : null,
    tournament ? (
      <Link key="tournament" href={`/tournaments/${tournament.id}`} className="hover:text-accent">
        {tournament.name}
      </Link>
    ) : null,
  ].filter(Boolean);

  return (
    <li className="rounded-lg border border-line bg-surface p-3 text-sm">
      <div className={match.winner === "team_1" ? "font-semibold" : ""}>{match.team1.join(" / ")}</div>
      <div className={match.winner === "team_2" ? "font-semibold" : ""}>{match.team2.join(" / ")}</div>
      {match.score.length > 0 && (
        <div className="mt-1 text-ink-faint">
          {match.score.map((set) => `${set.team1}-${set.team2}`).join(", ")}
        </div>
      )}
      {meta.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-x-1.5 text-xs text-ink-faint">
          {meta.map((part, index) => (
            <span key={index} className="flex items-center gap-x-1.5">
              {index > 0 && <span aria-hidden="true">·</span>}
              {part}
            </span>
          ))}
        </div>
      )}
    </li>
  );
}
