import { z } from "zod";
import { paginatedResponseSchema } from "./pagination";
import { MaskedValueSchema, normalizeMaskedValue, type MaskedNumber } from "./masked-value";

// Schema confirmado contra GET /players/{id}/pairs com um token real.
// Só o par atual traz `points`; os antigos vêm a null — daí o campo ser opcional
// e a interface não os apresentar como se fosse um vazio por preencher.
const PairPlayerSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  photo_url: z.string().nullable().optional(),
  nationality: z.string().nullable().optional(),
});

const PairSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  category: z.string(),
  status: z.string(),
  points: MaskedValueSchema.nullable().optional(),
  first_match_at: z.string().nullable().optional(),
  last_match_at: z.string().nullable().optional(),
  players: z.array(PairPlayerSchema),
});

export const PairsResponseSchema = paginatedResponseSchema(PairSchema);

export type PlayerPair = {
  id: string;
  /** Nome da dupla como o circuito a designa, ex. "Araujo/Ortega". */
  name: string;
  /** "current" enquanto a dupla se mantém; "former" quando já se separaram. */
  status: string;
  points: MaskedNumber;
  firstMatchAt: string | null;
  lastMatchAt: string | null;
  partner: { id: string; name: string; photoUrl: string | null } | null;
};

/**
 * Converte a resposta em duplas já centradas num jogador.
 *
 * `players` traz os dois membros; quem consulta a ficha quer ver o *outro*.
 * Resolver isto aqui evita que cada componente tenha de saber de quem é a
 * página que está a desenhar.
 */
export function parsePairsResponse(json: unknown, forPlayerId: string): PlayerPair[] {
  return PairsResponseSchema.parse(json).data.map((pair) => {
    const other = pair.players.find((player) => String(player.id) !== forPlayerId);

    return {
      id: String(pair.id),
      name: pair.name,
      status: pair.status,
      points: pair.points == null ? { value: null, masked: false } : normalizeMaskedValue(pair.points),
      firstMatchAt: pair.first_match_at ?? null,
      lastMatchAt: pair.last_match_at ?? null,
      partner: other ? { id: String(other.id), name: other.name, photoUrl: other.photo_url ?? null } : null,
    };
  });
}

/**
 * Dupla atual primeiro, depois as antigas da mais recente para a mais antiga.
 *
 * A API já devolve por ordem, mas não o promete; e a dupla atual em segundo
 * lugar seria o primeiro erro que alguém do meio notaria.
 */
export function sortPairs(pairs: PlayerPair[]): PlayerPair[] {
  return [...pairs].sort((a, b) => {
    if (a.status === "current" && b.status !== "current") return -1;
    if (b.status === "current" && a.status !== "current") return 1;
    return (b.lastMatchAt ?? "").localeCompare(a.lastMatchAt ?? "");
  });
}
