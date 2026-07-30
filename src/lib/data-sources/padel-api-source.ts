import { padelApiFetch } from "@/lib/padel-api/client";
import { parseRankingsResponse, parseTournamentsResponse } from "@/lib/padel-api/schemas";
import type { PadelDataSource, RankingsCategory } from "./padel-data-source";

// 6h de cache, conforme §6.1 do PROJECT.md ("rankings 6h").
const RANKINGS_REVALIDATE_SECONDS = 60 * 60 * 6;
// 24h de cache, conforme §6.1 do PROJECT.md ("calendário 24h").
const TOURNAMENTS_REVALIDATE_SECONDS = 60 * 60 * 24;

// Valores confirmados contra a API real (ver PadelHub session notes).
const CATEGORY_PARAM: Record<RankingsCategory, string> = {
  men: "men",
  women: "women",
};

export const padelApiSource: PadelDataSource = {
  async getRankings({ category }) {
    const json = await padelApiFetch(`/rankings?category=${CATEGORY_PARAM[category]}`, {
      next: { revalidate: RANKINGS_REVALIDATE_SECONDS, tags: ["padel:rankings"] },
    });
    return parseRankingsResponse(json);
  },

  async getTournaments({ fromDate }) {
    // per_page maior para a janela de 60 dias incluir torneios a decorrer/futuros, não só
    // os primeiros (mais antigos) da ordenação ascendente por data.
    const json = await padelApiFetch(
      `/tournaments?after_date=${fromDate}&sort_by=start_date&order_by=asc&per_page=50`,
      { next: { revalidate: TOURNAMENTS_REVALIDATE_SECONDS, tags: ["padel:tournaments"] } },
    );
    return parseTournamentsResponse(json);
  },
};
