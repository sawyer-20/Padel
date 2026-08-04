import { z } from "zod";
import { paginatedResponseSchema } from "./pagination";
import { MaskedValueSchema, normalizeMaskedValue, type MaskedNumber } from "./masked-value";

// Schema confirmado contra a resposta real de GET /players/{id} (objeto direto, sem
// envelope data/links/meta — validado à mão com um token real).
const PlayerSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  short_name: z.string().nullable().optional(),
  photo_url: z.string().nullable().optional(),
  category: z.string(),
  nationality: z.string().nullable().optional(),
  hand: z.string().nullable().optional(),
  side: z.string().nullable().optional(),
  ranking: MaskedValueSchema.nullable().optional(),
  points: MaskedValueSchema.nullable().optional(),
  // Campos que a API já devolvia e que não estavam a ser lidos. São o que
  // transforma uma linha de tabela numa ficha de jogador.
  elo: MaskedValueSchema.nullable().optional(),
  height: z.number().nullable().optional(),
  birthplace: z.string().nullable().optional(),
  birthdate: z.string().nullable().optional(),
  age: z.number().nullable().optional(),
});

/** GET /players?... devolve a mesma forma dentro do envelope paginado. */
export const PlayersResponseSchema = paginatedResponseSchema(PlayerSchema);

export type PlayerProfile = {
  id: string;
  name: string;
  shortName: string | null;
  photoUrl: string | null;
  category: string;
  nationality: string | null;
  hand: string | null;
  side: string | null;
  ranking: MaskedNumber;
  points: MaskedNumber;
  elo: MaskedNumber;
  height: number | null;
  birthplace: string | null;
  birthdate: string | null;
  age: number | null;
};

function toProfile(item: z.infer<typeof PlayerSchema>): PlayerProfile {
  return {
    id: String(item.id),
    name: item.name,
    shortName: item.short_name ?? null,
    photoUrl: item.photo_url ?? null,
    category: item.category,
    nationality: item.nationality ?? null,
    hand: item.hand ?? null,
    side: item.side ?? null,
    ranking: item.ranking == null ? { value: null, masked: false } : normalizeMaskedValue(item.ranking),
    points: item.points == null ? { value: null, masked: false } : normalizeMaskedValue(item.points),
    elo: item.elo == null ? { value: null, masked: false } : normalizeMaskedValue(item.elo),
    height: item.height ?? null,
    birthplace: item.birthplace ?? null,
    birthdate: item.birthdate ?? null,
    age: item.age ?? null,
  };
}

export function parsePlayer(json: unknown): PlayerProfile {
  return toProfile(PlayerSchema.parse(json));
}

/**
 * Devolve também o total, e não só a página.
 *
 * Espanha tem 659 jogadores e nós lemos 150 — sem o total, a página diria "150
 * jogadores" e estaria a mentir. Portugal tem 121 e cabe todo.
 */
export function parsePlayersResponse(json: unknown): { players: PlayerProfile[]; total: number } {
  const parsed = PlayersResponseSchema.parse(json);
  return { players: parsed.data.map(toProfile), total: parsed.meta.total };
}
