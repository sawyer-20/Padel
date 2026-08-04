import type { SearchDoc, SearchResult } from "./types";

/**
 * Retira acentos e passa a minúsculas.
 *
 * Sem isto, procurar "vibora" não encontrava "Víbora" e procurar "situacoes"
 * não encontrava "situações" — que é exatamente como as pessoas escrevem numa
 * caixa de pesquisa, sobretudo no telemóvel.
 */
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function tokenize(query: string): string[] {
  return normalize(query)
    .split(/[^\p{Letter}\p{Number}]+/u)
    .filter((token) => token.length > 1);
}

const TITLE_SCORE = 12;
const BODY_SCORE = 3;

/**
 * Só corresponde a partir do **início** de uma palavra.
 *
 * Procurar por qualquer pedaço de texto parece mais generoso e é muito pior:
 * "rede" encontrava "parede" e devolvia 43 dos 57 documentos, e "lob"
 * encontrava "globo" por acidente. Uma pesquisa que devolve três quartos do
 * site não responde a nada.
 *
 * O prefixo continua a funcionar — "bande" encontra "bandeja" — que é o que
 * uma pessoa espera enquanto escreve.
 *
 * \b é uma fronteira ASCII, mas o texto chega aqui já sem diacríticos (mesmo o
 * "ç" fica "c"), por isso é fiável.
 */
function scoreToken(token: string, title: string, body: string): number {
  const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const atWordStart = new RegExp(`\\b${escaped}`, "u");

  if (atWordStart.test(title)) return TITLE_SCORE;
  if (atWordStart.test(body)) return BODY_SCORE;
  return 0;
}

function buildSnippet(body: string, normalizedBody: string, token: string, length = 150): string {
  const index = normalizedBody.indexOf(token);
  if (index === -1) return body.slice(0, length).trim();

  // Recua até ao início de uma palavra para o excerto não começar a meio.
  const start = Math.max(0, index - Math.floor(length / 3));
  const adjustedStart = start === 0 ? 0 : body.indexOf(" ", start) + 1;
  const slice = body.slice(adjustedStart, adjustedStart + length).trim();

  const prefix = adjustedStart > 0 ? "…" : "";
  const suffix = adjustedStart + length < body.length ? "…" : "";
  return `${prefix}${slice}${suffix}`;
}

/**
 * Pesquisa em conjunção: um documento só entra se contiver **todos** os termos
 * escritos. Procurar "regra parede" não deve devolver tudo o que fala de regras
 * mais tudo o que fala de paredes.
 */
export function search(docs: SearchDoc[], query: string, limit = 30): SearchResult[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const results: SearchResult[] = [];

  for (const doc of docs) {
    const title = normalize(doc.title);
    const body = normalize(doc.body);

    let score = 0;
    let matchedAll = true;

    for (const token of tokens) {
      const tokenScore = scoreToken(token, title, body);
      if (tokenScore === 0) {
        matchedAll = false;
        break;
      }
      score += tokenScore;
    }

    if (!matchedAll) continue;

    results.push({
      doc,
      score,
      snippet: buildSnippet(doc.body, body, tokens[0] as string),
    });
  }

  return results
    .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title))
    .slice(0, limit);
}
