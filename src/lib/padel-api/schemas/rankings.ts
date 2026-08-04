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
  points_diff: MaskedValueSchema.nullable().optional(),
  /**
   * Variação da posição desde a atualização anterior.
   *
   * A convenção não está documentada, por isso foi determinada contra a API
   * real: em 123 jogadores com variação em posição e em pontos, 86% tinham
   * sinais OPOSTOS — quem ganhou pontos tem `ranking_diff` negativo. Ou seja,
   * o campo é `posição_atual − posição_anterior`, e um valor negativo
   * significa que se subiu (o número da posição baixou).
   *
   * Os 14% restantes são o esperado: dá para ganhar pontos e ainda assim ser
   * ultrapassado por quem ganhou mais.
   */
  ranking_diff: MaskedValueSchema.nullable().optional(),
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
  /** Positivo = desceu; negativo = subiu. Ver a nota no schema. */
  rankingDiff: MaskedNumber;
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
    rankingDiff:
      item.ranking_diff == null ? { value: null, masked: false } : normalizeMaskedValue(item.ranking_diff),
    category: item.category,
  }));
}
