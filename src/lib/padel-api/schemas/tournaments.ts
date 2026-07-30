import { z } from "zod";
import { paginatedResponseSchema } from "./pagination";

// Schema confirmado contra a resposta real de GET /tournaments (validado à mão com um
// token real — a doc pública não expõe o schema exato a scraping estático).
const TournamentSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  location: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  level: z.string(),
  status: z.string(),
  start_date: z.string(),
  end_date: z.string(),
});

export const TournamentsResponseSchema = paginatedResponseSchema(TournamentSchema);

export type TournamentSummary = {
  id: string;
  name: string;
  location: string | null;
  country: string | null;
  level: string;
  status: string;
  startDate: string;
  endDate: string;
};

export function parseTournamentsResponse(json: unknown): TournamentSummary[] {
  const parsed = TournamentsResponseSchema.parse(json);
  return parsed.data.map((item) => ({
    id: String(item.id),
    name: item.name,
    location: item.location ?? null,
    country: item.country ?? null,
    level: item.level,
    status: item.status,
    startDate: item.start_date,
    endDate: item.end_date,
  }));
}
