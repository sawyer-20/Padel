import { padelApiSource } from "@/lib/data-sources/padel-api-source";
import { fetchNews } from "@/lib/news/fetch-news";
import type { NewsItem } from "@/lib/news/schemas";
import type { PlayerProfile, RankingEntry, TournamentSummary } from "@/lib/padel-api/schemas";
import { pickNextTournament } from "./pick-next-tournament";
import { pickHomeCountryPlayers } from "./pick-home-country-players";

const TOP_RANKING_COUNT = 5;
const NEWS_COUNT = 3;
const TOURNAMENT_WINDOW_DAYS_BACK = 30;
const HOME_COUNTRY_PLAYER_COUNT = 6;

/**
 * O país que o Início destaca.
 *
 * Fixo em Portugal, e não deduzido do idioma: este é um portal de padel
 * português que fala cinco línguas, não cinco portais. Quem lê em alemão vê
 * "Padel em Portugal", que é o que o sítio é.
 */
export const HOME_COUNTRY = "PT";

export type HomeData = {
  nextTournament: TournamentSummary | null;
  tournamentFailed: boolean;
  topMen: RankingEntry[];
  topWomen: RankingEntry[];
  rankingsFailed: boolean;
  news: NewsItem[];
  newsFailed: boolean;
  /** Bloco do país da casa: o que se passa em Portugal e quem lá joga. */
  country: {
    nextTournament: TournamentSummary | null;
    players: PlayerProfile[];
    totalPlayers: number;
    failed: boolean;
  };
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

  // Depois do lote e não dentro dele: a Padel API devolve 429 quando lhe caem
  // vários pedidos em cima ao mesmo tempo, e o bloco do país é o menos
  // importante da página — não vale a pena arriscar derrubar os outros três.
  // Só a primeira página: aqui bastam meia dúzia de nomes.
  let countryPlayers: PlayerProfile[] = [];
  let totalCountryPlayers = 0;
  let countryFailed = false;

  try {
    const result = await padelApiSource.getPlayersByCountry({ country: HOME_COUNTRY, maxPages: 1 });
    countryPlayers = pickHomeCountryPlayers(result.players, HOME_COUNTRY_PLAYER_COUNT);
    totalCountryPlayers = result.total;
  } catch (error) {
    console.error("Início: falha nos jogadores do país:", error);
    countryFailed = true;
  }

  const countryTournaments =
    tournamentsResult.status === "fulfilled"
      ? tournamentsResult.value.filter((tournament) => tournament.country === HOME_COUNTRY)
      : [];

  return {
    country: {
      // Filtrado da lista que já foi buscada — sem pedido extra à API.
      nextTournament: pickNextTournament(countryTournaments, today),
      players: countryPlayers,
      totalPlayers: totalCountryPlayers,
      failed: countryFailed && tournamentsResult.status === "rejected",
    },
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
