import { z } from "zod";
import { paginatedResponseSchema } from "./pagination";
import { MaskedValueSchema, normalizeMaskedValue, type MaskedNumber } from "./masked-value";

// Schema confirmado contra a resposta real de GET /rankings?category=men|women
// (a documentação pública não expunha isto a scraping estático — validado à mão).
const RankingItemSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  category: z.string(),
  nationality: z.string().nullable().optional(),
  ranking: MaskedValueSchema,
  points: MaskedValueSchema,
  // Variação de pontos desde a atualização anterior. A API também devolve
  // `ranking_diff`, que não lemos: não consegui confirmar se um +1 significa
  // "subiu uma posição" ou "desceu uma", e uma seta virada ao contrário é pior
  // do que seta nenhuma. `points_diff` não tem essa ambiguidade — negativo é
  // perder pontos.
  points_diff: MaskedValueSchema.nullable().optional(),
  date: z.string().optional(),
});

export const RankingsResponseSchema = paginatedResponseSchema(RankingItemSchema);

export type RankingEntry = {
  playerId: string;
  name: string;
  nationality: string | null;
  ranking: MaskedNumber;
  points: MaskedNumber;
  pointsDiff: MaskedNumber;
  category: string;
};

export function parseRankingsResponse(json: unknown): RankingEntry[] {
  const parsed = RankingsResponseSchema.parse(json);
  return parsed.data.map((item) => ({
    playerId: String(item.id),
    name: item.name,
    nationality: item.nationality ?? null,
    ranking: normalizeMaskedValue(item.ranking),
    points: normalizeMaskedValue(item.points),
    pointsDiff:
      item.points_diff == null ? { value: null, masked: false } : normalizeMaskedValue(item.points_diff),
    category: item.category,
  }));
}
