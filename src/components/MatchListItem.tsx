import type { MatchSummary } from "@/lib/padel-api/schemas";

export function MatchListItem({ match }: { match: MatchSummary }) {
  return (
    <li className="rounded-lg border border-line bg-surface p-3 text-sm">
      <div className={match.winner === "team_1" ? "font-semibold" : ""}>{match.team1.join(" / ")}</div>
      <div className={match.winner === "team_2" ? "font-semibold" : ""}>{match.team2.join(" / ")}</div>
      {match.score.length > 0 && (
        <div className="mt-1 text-ink-faint">
          {match.score.map((set) => `${set.team1}-${set.team2}`).join(", ")}
        </div>
      )}
    </li>
  );
}
