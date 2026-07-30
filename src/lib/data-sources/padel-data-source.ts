import type { RankingEntry, TournamentSummary } from "@/lib/padel-api/schemas";

export type RankingsCategory = "men" | "women";

// Interface abstrata (§6.1 do PROJECT.md): permite trocar a implementação (ex: fonte com
// live scores num plano pago) sem tocar nas páginas que a consomem.
export interface PadelDataSource {
  getRankings(params: { category: RankingsCategory }): Promise<RankingEntry[]>;
  getTournaments(params: { fromDate: string }): Promise<TournamentSummary[]>;
}
