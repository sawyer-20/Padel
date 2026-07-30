import { z } from "zod";
import { paginatedResponseSchema } from "./pagination";

// Schema confirmado contra a resposta real de GET /tournaments/{id}/matches (validado à
// mão com um token real — a doc pública não expõe o schema exato a scraping estático).
const MatchPlayerSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
});

const MatchScoreSetSchema = z.object({
  team_1: z.string(),
  team_2: z.string(),
});

const MatchSchema = z.object({
  id: z.union([z.number(), z.string()]),
  category: z.string(),
  round: z.number().nullable().optional(),
  round_name: z.string(),
  status: z.string(),
  played_at: z.string().nullable().optional(),
  score: z.array(MatchScoreSetSchema).nullable().optional(),
  winner: z.enum(["team_1", "team_2"]).nullable().optional(),
  players: z.object({
    team_1: z.array(MatchPlayerSchema),
    team_2: z.array(MatchPlayerSchema),
  }),
});

export const MatchesResponseSchema = paginatedResponseSchema(MatchSchema);

export type MatchSummary = {
  id: string;
  category: string;
  round: number | null;
  roundName: string;
  status: string;
  playedAt: string | null;
  score: { team1: string; team2: string }[];
  winner: "team_1" | "team_2" | null;
  team1: string[];
  team2: string[];
};

export function parseMatchesResponse(json: unknown): MatchSummary[] {
  const parsed = MatchesResponseSchema.parse(json);
  return parsed.data.map((item) => ({
    id: String(item.id),
    category: item.category,
    round: item.round ?? null,
    roundName: item.round_name,
    status: item.status,
    playedAt: item.played_at ?? null,
    score: (item.score ?? []).map((set) => ({ team1: set.team_1, team2: set.team_2 })),
    winner: item.winner ?? null,
    team1: item.players.team_1.map((p) => p.name),
    team2: item.players.team_2.map((p) => p.name),
  }));
}
