import { padelApiFetch } from "@/lib/padel-api/client";
import {
  parseMatchesResponse,
  parsePlayer,
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

export const padelApiSource: PadelDataSource = {
  async getRankings({ category }) {
    const requests = Array.from({ length: RANKINGS_PAGES }, (_, index) =>
      padelApiFetch(
        `/rankings?category=${CATEGORY_PARAM[category]}&per_page=${RANKINGS_PAGE_SIZE}&page=${index + 1}`,
        { next: { revalidate: RANKINGS_REVALIDATE_SECONDS, tags: ["padel:rankings"] } },
      ).then(parseRankingsResponse),
    );

    const results = await Promise.allSettled(requests);
    const [first, ...rest] = results;

    // Sem a primeira página não há ranking nenhum para mostrar — a página tem de
    // apresentar o erro em vez de uma tabela vazia.
    if (!first || first.status === "rejected") {
      throw first?.reason ?? new Error("Nenhuma página de rankings foi pedida.");
    }

    const entries = [...first.value];

    // As páginas seguintes são um extra: se falharem, mostra-se o que há em vez de
    // deitar fora um top 50 que chegou bem.
    for (const [index, result] of rest.entries()) {
      if (result.status === "fulfilled") {
        entries.push(...result.value);
      } else {
        console.error(`Falha ao carregar a página ${index + 2} dos rankings:`, result.reason);
      }
    }

    return entries;
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

  async getPlayerMatches(id) {
    const json = await padelApiFetch(`/players/${id}/matches?sort_by=played_at&order_by=desc&per_page=10`, {
      next: { revalidate: RANKINGS_REVALIDATE_SECONDS, tags: [`padel:player-matches:${id}`] },
    });
    return parseMatchesResponse(json);
  },
};
