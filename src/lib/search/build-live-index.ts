import type { Locale } from "@/i18n/routing";
import { padelApiSource } from "@/lib/data-sources/padel-api-source";
import { formatCountry } from "@/lib/format/labels";
import type { SearchDoc } from "./types";

/** Mesma janela do Início: torneios que começaram há pouco continuam a interessar. */
const TOURNAMENT_WINDOW_DAYS_BACK = 30;

/**
 * Jogadores e torneios, para a pesquisa.
 *
 * Separado do índice editorial de propósito. Este falha quando a Padel API
 * falha; o outro nunca falha. Quem pesquisa "bandeja" tem de continuar a
 * encontrar a definição mesmo com a API em baixo, por isso as duas metades do
 * índice são construídas e degradam de forma independente — aqui um erro
 * devolve menos resultados, nunca uma página de erro.
 *
 * Os pedidos são feitos em série porque a API responde 429 a pedidos paralelos.
 * Custa pouco: as respostas vêm da cache do Next quase sempre.
 */
export async function buildLiveSearchIndex(locale: Locale): Promise<SearchDoc[]> {
  const docs: SearchDoc[] = [];
  const seenPlayers = new Set<string>();

  for (const category of ["men", "women"] as const) {
    try {
      const entries = await padelApiSource.getRankings({ category });
      for (const entry of entries) {
        if (seenPlayers.has(entry.playerId)) continue;
        seenPlayers.add(entry.playerId);

        const country = entry.nationality ? formatCountry(locale, entry.nationality) : null;
        // O corpo é o que torna a pesquisa útil para além do nome: procurar
        // "Portugal" passa a devolver os atletas portugueses.
        const position = entry.ranking.masked ? null : entry.ranking.value;

        docs.push({
          id: `player:${entry.playerId}`,
          type: "player",
          title: entry.name,
          body: [country, position === null ? null : `#${position}`].filter(Boolean).join(" · "),
          href: `/players/${entry.playerId}`,
        });
      }
    } catch (error) {
      console.error(`Pesquisa: falha ao indexar o ranking ${category}:`, error);
    }
  }

  try {
    const fromDate = new Date(Date.now() - TOURNAMENT_WINDOW_DAYS_BACK * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    const tournaments = await padelApiSource.getTournaments({ fromDate });

    for (const tournament of tournaments) {
      const country = tournament.country ? formatCountry(locale, tournament.country) : null;
      docs.push({
        id: `tournament:${tournament.id}`,
        type: "tournament",
        title: tournament.name,
        body: [tournament.location, country].filter(Boolean).join(" · "),
        href: `/tournaments/${tournament.id}`,
      });
    }
  } catch (error) {
    console.error("Pesquisa: falha ao indexar torneios:", error);
  }

  return docs;
}
