import type {
  MatchSummary,
  PlayerPair,
  PlayerProfile,
  RankingEntry,
  TournamentDetail,
  TournamentSummary,
} from "@/lib/padel-api/schemas";

export type RankingsCategory = "men" | "women";

// Interface abstrata (§6.1 do PROJECT.md): permite trocar a implementação (ex: fonte com
// live scores num plano pago) sem tocar nas páginas que a consomem.
export interface PadelDataSource {
  getRankings(params: { category: RankingsCategory }): Promise<RankingEntry[]>;
  getTournaments(params: { fromDate: string }): Promise<TournamentSummary[]>;
  getTournament(id: string): Promise<TournamentDetail>;
  getTournamentMatches(id: string): Promise<MatchSummary[]>;
  getPlayer(id: string): Promise<PlayerProfile>;
  getPlayerMatches(id: string): Promise<MatchSummary[]>;
  /** Duplas que o jogador formou, atual primeiro. */
  getPlayerPairs(id: string): Promise<PlayerPair[]>;
  /**
   * Jogadores de uma nacionalidade, do melhor ranking para o pior.
   * `total` é quantos existem; `players` é quantos foram lidos.
   */
  getPlayersByCountry(params: {
    country: string;
    /** Quantas páginas de 50 ler. O Início só precisa da primeira. */
    maxPages?: number;
  }): Promise<{ players: PlayerProfile[]; total: number }>;
}
