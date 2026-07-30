import type { MatchSummary } from "@/lib/padel-api/schemas";

export function MatchListItem({ match }: { match: MatchSummary }) {
  return (
    <li className="rounded border border-neutral-200 p-3 text-sm dark:border-neutral-800">
      <div className={match.winner === "team_1" ? "font-semibold" : ""}>{match.team1.join(" / ")}</div>
      <div className={match.winner === "team_2" ? "font-semibold" : ""}>{match.team2.join(" / ")}</div>
      {match.score.length > 0 && (
        <div className="mt-1 text-neutral-500">
          {match.score.map((set) => `${set.team1}-${set.team2}`).join(", ")}
        </div>
      )}
    </li>
  );
}
