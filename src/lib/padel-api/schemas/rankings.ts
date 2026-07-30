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
  date: z.string().optional(),
});

export const RankingsResponseSchema = paginatedResponseSchema(RankingItemSchema);

export type RankingEntry = {
  playerId: string;
  name: string;
  nationality: string | null;
  ranking: MaskedNumber;
  points: MaskedNumber;
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
    category: item.category,
  }));
}
