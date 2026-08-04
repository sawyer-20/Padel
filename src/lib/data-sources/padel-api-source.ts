import { padelApiFetch } from "@/lib/padel-api/client";
import {
  parseMatchesResponse,
  parsePlayer,
  parsePlayersResponse,
  parseRankingsResponse,
  parseTournamentDetail,
  parseTournamentsResponse,
} from "@/lib/padel-api/schemas";
import type { PadelDataSource, RankingsCategory } from "./padel-data-source";

// 6h de cache, conforme §6.1 do PROJECT.md ("rankings 6h"). Perfis e resultados recentes
// de jogador são o mesmo tipo de dado "estado atual", por isso partilham a cadência.
const RANKINGS_REVALIDATE_SECONDS = 60 * 60 * 6;
// 24h de cache, conforme §6.1 do PROJECT.md ("calendário 24h").
const TOURNAMENTS_REVALIDATE_SECONDS = 60 * 60 * 24;
// 1h para jogos de torneios ainda não terminados (não há live scores no plano gratuito).
const ONGOING_MATCHES_REVALIDATE_SECONDS = 60 * 60;

// Valores confirmados contra a API real (ver PadelHub session notes).
const CATEGORY_PARAM: Record<RankingsCategory, string> = {
  men: "men",
  women: "women",
};

// Sem `per_page` a API devolve 15 entradas — de um ranking com mais de 1300. Pedir
// 100 não serve: verificado contra a API real, 50 é o máximo que ela aceita por
// página. Duas páginas dão o top 100, que é o que se espera de um ranking, ao
// custo de dois pedidos de 6 em 6 horas.
const RANKINGS_PAGE_SIZE = 50;
const RANKINGS_PAGES = 2;
const PLAYERS_BY_COUNTRY_PAGES = 3;

/**
 * Páginas em série, nunca em paralelo.
 *
 * Três pedidos simultâneos ao mesmo endpoint devolvem 429 — verificado contra a
 * API real com `nationality=ES`, que trazia 100 dos 150 esperados. Como cada
 * página fica em cache 6 horas, o custo de as pedir em série paga-se uma vez a
 * cada 6 horas e não a cada visita.
 *
 * A primeira página é obrigatória: sem ela não há nada para mostrar e a página
 * tem de apresentar o erro em vez de uma tabela vazia, que pareceria um ranking
 * sem ninguém. As seguintes são um extra — se uma falhar, para-se ali e mostra-se
 * o que chegou, porque quem devolveu 429 vai voltar a devolver.
 */
async function fetchPagesInSeries<T>(
  pageCount: number,
  fetchPage: (page: number) => Promise<T[]>,
): Promise<T[]> {
  const items = [...(await fetchPage(1))];

  for (let page = 2; page <= pageCount; page += 1) {
    try {
      items.push(...(await fetchPage(page)));
    } catch (error) {
      console.error(`Falha ao carregar a página ${page}; a mostrar o que chegou.`, error);
      break;
    }
  }

  return items;
}

export const padelApiSource: PadelDataSource = {
  async getRankings({ category }) {
    return fetchPagesInSeries(RANKINGS_PAGES, async (page) =>
      parseRankingsResponse(
        await padelApiFetch(
          `/rankings?category=${CATEGORY_PARAM[category]}&per_page=${RANKINGS_PAGE_SIZE}&page=${page}`,
          { next: { revalidate: RANKINGS_REVALIDATE_SECONDS, tags: ["padel:rankings"] } },
        ),
      ),
    );
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

  async getTournament(id) {
    const json = await padelApiFetch(`/tournaments/${id}`, {
      next: { revalidate: TOURNAMENTS_REVALIDATE_SECONDS, tags: [`padel:tournament:${id}`] },
    });
    return parseTournamentDetail(json);
  },

  async getTournamentMatches(id) {
    const tournament = await this.getTournament(id);
    // Resultados de torneios encerrados nunca mais mudam — cache indefinido, conforme
    // §6.1 do PROJECT.md ("resultados de torneios encerrados indefinidamente").
    const next =
      tournament.status === "finished"
        ? { revalidate: false as const, tags: [`padel:tournament-matches:${id}`] }
        : { revalidate: ONGOING_MATCHES_REVALIDATE_SECONDS, tags: [`padel:tournament-matches:${id}`] };

    const json = await padelApiFetch(`/tournaments/${id}/matches?per_page=100`, { next });
    return parseMatchesResponse(json);
  },

  async getPlayer(id) {
    const json = await padelApiFetch(`/players/${id}`, {
      next: { revalidate: RANKINGS_REVALIDATE_SECONDS, tags: [`padel:player:${id}`] },
    });
    return parsePlayer(json);
  },

  async getPlayersByCountry({ country }) {
    // O total vem da primeira página e é o número real de jogadores do país;
    // `players` é só o que conseguimos ler. Portugal cabe todo em 121; Espanha
    // tem 659 e a página diz honestamente quantos está a mostrar.
    let total = 0;

    const players = await fetchPagesInSeries(PLAYERS_BY_COUNTRY_PAGES, async (page) => {
      const result = parsePlayersResponse(
        await padelApiFetch(
          `/players?nationality=${encodeURIComponent(country)}&sort_by=ranking&order_by=asc` +
            `&per_page=${RANKINGS_PAGE_SIZE}&page=${page}`,
          {
            next: {
              revalidate: RANKINGS_REVALIDATE_SECONDS,
              tags: [`padel:players-country:${country}`],
            },
          },
        ),
      );

      if (page === 1) total = result.total;
      return result.players;
    });

    return { players, total };
  },

  async getPlayerMatches(id) {
    const json = await padelApiFetch(`/players/${id}/matches?sort_by=played_at&order_by=desc&per_page=10`, {
      next: { revalidate: RANKINGS_REVALIDATE_SECONDS, tags: [`padel:player-matches:${id}`] },
    });
    return parseMatchesResponse(json);
  },
};
