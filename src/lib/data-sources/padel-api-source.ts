import { padelApiFetch } from "@/lib/padel-api/client";
import { parseRankingsResponse } from "@/lib/padel-api/schemas";
import type { PadelDataSource, RankingsCategory } from "./padel-data-source";

// 6h de cache, conforme §6.1 do PROJECT.md ("rankings 6h").
const RANKINGS_REVALIDATE_SECONDS = 60 * 60 * 6;

// Valores do parâmetro "category" por confirmar contra a API real (ver nota em schemas.ts).
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
};
