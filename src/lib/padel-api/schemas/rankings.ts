import { z } from "zod";
import { paginatedResponseSchema } from "./pagination";

// Schema confirmado contra a resposta real de GET /rankings?category=men|women
// (a documentação pública não expunha isto a scraping estático — validado à mão).
const MaskedValueSchema = z.union([z.number(), z.literal("hidden_free_plan")]);

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

// Dado escondido pelo plano gratuito da fonte (ver §6.1 do PROJECT.md) — nunca inventamos
// um valor plausível, marcamos explicitamente como mascarado para a UI avisar o utilizador.
export type MaskedNumber = { value: number | null; masked: boolean };

function normalizeMaskedValue(raw: number | "hidden_free_plan"): MaskedNumber {
  return raw === "hidden_free_plan" ? { value: null, masked: true } : { value: raw, masked: false };
}

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
