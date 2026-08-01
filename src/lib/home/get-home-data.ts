import { padelApiSource } from "@/lib/data-sources/padel-api-source";
import { fetchNews } from "@/lib/news/fetch-news";
import type { NewsItem } from "@/lib/news/schemas";
import type { RankingEntry, TournamentSummary } from "@/lib/padel-api/schemas";
import { pickNextTournament } from "./pick-next-tournament";

const TOP_RANKING_COUNT = 5;
const NEWS_COUNT = 3;
const TOURNAMENT_WINDOW_DAYS_BACK = 30;

export type HomeData = {
  nextTournament: TournamentSummary | null;
  tournamentFailed: boolean;
  topMen: RankingEntry[];
  topWomen: RankingEntry[];
  rankingsFailed: boolean;
  news: NewsItem[];
  newsFailed: boolean;
};

function formatDateParam(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Reúne o que o Início precisa, a partir das origens que já existem.
 *
 * Degradação por secção: o Início é a primeira coisa que alguém vê, por isso cada bloco
 * falha isoladamente — se a Padel API estiver em baixo, as notícias continuam a aparecer,
 * e vice-versa. Nunca se perde a página inteira por causa de uma origem.
 */
export async function getHomeData(): Promise<HomeData> {
  const now = new Date();
  const today = formatDateParam(now);
  const fromDate = formatDateParam(
    new Date(now.getTime() - TOURNAMENT_WINDOW_DAYS_BACK * 24 * 60 * 60 * 1000),
  );

  const [menResult, womenResult, tournamentsResult, newsResult] = await Promise.allSettled([
    padelApiSource.getRankings({ category: "men" }),
    padelApiSource.getRankings({ category: "women" }),
    padelApiSource.getTournaments({ fromDate }),
    fetchNews(),
  ]);

  if (menResult.status === "rejected") console.error("Início: falha nos rankings masculinos:", menResult.reason);
  if (womenResult.status === "rejected") console.error("Início: falha nos rankings femininos:", womenResult.reason);
  if (tournamentsResult.status === "rejected") console.error("Início: falha nos torneios:", tournamentsResult.reason);
  if (newsResult.status === "rejected") console.error("Início: falha nas notícias:", newsResult.reason);

  const topMen = menResult.status === "fulfilled" ? menResult.value.slice(0, TOP_RANKING_COUNT) : [];
  const topWomen = womenResult.status === "fulfilled" ? womenResult.value.slice(0, TOP_RANKING_COUNT) : [];

  return {
    nextTournament:
      tournamentsResult.status === "fulfilled"
        ? pickNextTournament(tournamentsResult.value, today)
        : null,
    tournamentFailed: tournamentsResult.status === "rejected",
    topMen,
    topWomen,
    rankingsFailed: menResult.status === "rejected" && womenResult.status === "rejected",
    news: newsResult.status === "fulfilled" ? newsResult.value.items.slice(0, NEWS_COUNT) : [],
    newsFailed: newsResult.status === "rejected" || (newsResult.status === "fulfilled" && newsResult.value.items.length === 0),
  };
}
