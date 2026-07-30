import { z } from "zod";
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
});

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
};

export function parsePlayer(json: unknown): PlayerProfile {
  const item = PlayerSchema.parse(json);
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
  };
}
