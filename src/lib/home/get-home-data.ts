import { padelApiSource } from "@/lib/data-sources/padel-api-source";
import { fetchNews } from "@/lib/news/fetch-news";
import type { NewsItem } from "@/lib/news/schemas";
import type { PlayerProfile, RankingEntry, TournamentSummary } from "@/lib/padel-api/schemas";
import { pickNextTournament } from "./pick-next-tournament";
import { pickHomeCountryPlayers } from "./pick-home-country-players";

const TOP_RANKING_COUNT = 5;
const NEWS_COUNT = 3;
/**
 * Quantos de cada categoria entram na montra de retratos.
 *
 * Quatro, porque o padel joga-se a pares: quatro atletas são duas duplas, e a
 * grelha passa a ler-se como pares em vez de uma fila de nomes cortada a meio.
 * Dá também uma linha inteira por categoria em ecrã largo.
 */
const WORLD_TOP_COUNT = 4;
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
    /** Torneios do país dentro da janela do calendário. */
    tournamentCount: number;
    failed: boolean;
  };
  /** Torneios na janela do calendário, para o cabeçalho dizer o tamanho da cobertura. */
  tournamentCount: number;
  /**
   * Os primeiros do ranking mundial, com ficha completa.
   *
   * O ranking só devolve nome, posição e pontos — a fotografia vive na ficha de
   * cada jogador. Daí o pedido extra por atleta: é o preço de mostrar rostos em
   * vez de uma lista de nomes.
   */
  worldTop: PlayerProfile[];
};

/** Espera entre pedidos, e antes de repetir um que falhou. */
const REQUEST_SPACING_MS = 120;
const RETRY_DELAY_MS = 500;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fichas completas a partir de uma lista de ids, em série e com uma repetição.
 *
 * Em série porque a Padel API responde 429 a pedidos simultâneos. **Com
 * repetição** porque a primeira versão não a tinha e o resultado apareceu em
 * produção: dos oito pedidos, três falharam, e como cada falha era engolida em
 * silêncio a montra ficou com quatro homens e uma mulher. Uma degradação que
 * deixa passar um resultado enviesado é pior do que um erro — o erro vê-se.
 *
 * O espaçamento entre pedidos existe pela mesma razão: oito chamadas seguidas,
 * somadas às dos rankings e dos torneios, esbarravam no limite por minuto.
 * Custa cerca de um segundo, e só na primeira visita de cada seis horas.
 */
async function fetchProfilesInSeries(ids: string[]): Promise<PlayerProfile[]> {
  const profiles: PlayerProfile[] = [];

  for (const [index, id] of ids.entries()) {
    if (index > 0) await wait(REQUEST_SPACING_MS);

    try {
      profiles.push(await padelApiSource.getPlayer(id));
      continue;
    } catch (error) {
      console.error(`Início: falha ao carregar a ficha do jogador ${id}, a repetir:`, error);
    }

    await wait(RETRY_DELAY_MS);
    try {
      profiles.push(await padelApiSource.getPlayer(id));
    } catch (error) {
      console.error(`Início: ficha do jogador ${id} indisponível após repetição:`, error);
    }
  }

  return profiles;
}

/**
 * Corta a montra ao mesmo número de atletas por categoria.
 *
 * Se uma das categorias não vier completa, as duas encolhem para o tamanho da
 * mais pequena. Preferimos uma montra mais curta e equilibrada a uma cheia e
 * torta: quatro homens ao lado de uma mulher não se lê como uma falha de rede,
 * lê-se como uma escolha editorial — e não é.
 */
/**
 * Alterna os ids das duas categorias: um deles, uma delas, um deles...
 *
 * A ordem dos pedidos decide a forma da degradação, e isto apareceu em
 * produção. Pedindo primeiro os quatro homens e só depois as quatro mulheres,
 * um limite de débito atingido a meio derruba **sempre** as jogadoras — e como
 * a montra encolhe ao tamanho da categoria mais pequena, zero mulheres fazia
 * desaparecer a secção inteira.
 *
 * Alternados, uma falha a meio deixa três deles e duas delas, que ainda dá uma
 * dupla de cada. Uma montra mais curta é um contratempo; uma montra que
 * desaparece é uma avaria.
 */
export function interleave(men: RankingEntry[], women: RankingEntry[]): string[] {
  const ids: string[] = [];
  for (let index = 0; index < WORLD_TOP_COUNT; index += 1) {
    const man = men[index];
    const woman = women[index];
    if (man) ids.push(man.playerId);
    if (woman) ids.push(woman.playerId);
  }
  return ids;
}

export function balanceByCategory(profiles: PlayerProfile[]): PlayerProfile[] {
  const men = profiles.filter((player) => player.category === "men");
  const women = profiles.filter((player) => player.category === "women");
  const perCategory = Math.min(men.length, women.length);

  if (perCategory === 0) return [];
  return [...men.slice(0, perCategory), ...women.slice(0, perCategory)];
}

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

  // Depois do bloco do país e também em série, pela mesma razão: são seis
  // pedidos e a API não gosta de os receber ao mesmo tempo. Vêm da cache do
  // Next na esmagadora maioria das visitas.
  const worldTop = balanceByCategory(await fetchProfilesInSeries(interleave(topMen, topWomen)));

  const countryTournaments =
    tournamentsResult.status === "fulfilled"
      ? tournamentsResult.value.filter((tournament) => tournament.country === HOME_COUNTRY)
      : [];

  return {
    worldTop,
    tournamentCount:
      tournamentsResult.status === "fulfilled" ? tournamentsResult.value.length : 0,
    country: {
      // Filtrado da lista que já foi buscada — sem pedido extra à API.
      nextTournament: pickNextTournament(countryTournaments, today),
      players: countryPlayers,
      totalPlayers: totalCountryPlayers,
      tournamentCount: countryTournaments.length,
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
