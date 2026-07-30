import { z } from "zod";

// Nomes de campos por confirmar contra a resposta real da API assim que houver um token
// (a documentação pública não expõe o schema exato de /rankings a scraping estático).
const MaskedValueSchema = z.union([z.number(), z.literal("hidden_free_plan")]);

const RankingPlayerSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  country: z.string().nullable().optional(),
});

const RankingItemSchema = z.object({
  position: MaskedValueSchema,
  points: MaskedValueSchema,
  player: RankingPlayerSchema,
  category: z.string().optional(),
});

const PaginationLinksSchema = z.object({
  first: z.string().nullable(),
  last: z.string().nullable(),
  prev: z.string().nullable(),
  next: z.string().nullable(),
});

const PaginationMetaSchema = z.object({
  current_page: z.number(),
  last_page: z.number(),
  per_page: z.number(),
  total: z.number(),
});

export const RankingsResponseSchema = z.object({
  data: z.array(RankingItemSchema),
  links: PaginationLinksSchema,
  meta: PaginationMetaSchema,
});

// Dado escondido pelo plano gratuito da fonte (ver §6.1 do PROJECT.md) — nunca inventamos
// um valor plausível, marcamos explicitamente como mascarado para a UI avisar o utilizador.
export type MaskedNumber = { value: number | null; masked: boolean };

function normalizeMaskedValue(raw: number | "hidden_free_plan"): MaskedNumber {
  return raw === "hidden_free_plan" ? { value: null, masked: true } : { value: raw, masked: false };
}

export type RankingEntry = {
  position: MaskedNumber;
  points: MaskedNumber;
  player: { id: string; name: string; country: string | null };
  category: string | null;
};

export function parseRankingsResponse(json: unknown): RankingEntry[] {
  const parsed = RankingsResponseSchema.parse(json);
  return parsed.data.map((item) => ({
    position: normalizeMaskedValue(item.position),
    points: normalizeMaskedValue(item.points),
    player: {
      id: String(item.player.id),
      name: item.player.name,
      country: item.player.country ?? null,
    },
    category: item.category ?? null,
  }));
}
