import { parseFeed, sortByPublishedAtDesc, type NewsItem } from "./schemas";
import { newsSources, type NewsSource } from "./sources";

// 1h — o §6.1 do PROJECT.md não define cadência para notícias; 1h é adequado a este tipo
// de conteúdo sem queimar pedidos desnecessários às fontes.
const NEWS_REVALIDATE_SECONDS = 60 * 60;

export type NewsFetchResult = {
  items: NewsItem[];
  failedSourceIds: string[];
};

async function fetchSource(source: NewsSource): Promise<NewsItem[]> {
  const response = await fetch(source.feedUrl, {
    headers: { Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml" },
    next: { revalidate: NEWS_REVALIDATE_SECONDS, tags: ["news:feeds", `news:${source.id}`] },
  });

  if (!response.ok) {
    throw new Error(`Feed ${source.id} respondeu ${response.status}`);
  }

  return parseFeed(await response.text(), source);
}

/**
 * Busca todas as fontes em paralelo.
 *
 * Degradação graciosa: uma fonte que falhe não derruba as outras — com 5 feeds externos,
 * é garantido que alguma vai falhar mais cedo ou mais tarde. A página mostra o que
 * conseguiu obter e avisa que a lista está incompleta.
 */
export async function fetchNews(sources: NewsSource[] = newsSources): Promise<NewsFetchResult> {
  const results = await Promise.allSettled(sources.map((source) => fetchSource(source)));

  const items: NewsItem[] = [];
  const failedSourceIds: string[] = [];

  results.forEach((result, index) => {
    const source = sources[index];
    if (!source) return;

    if (result.status === "fulfilled") {
      items.push(...result.value);
    } else {
      console.error(`Falha ao carregar feed "${source.id}":`, result.reason);
      failedSourceIds.push(source.id);
    }
  });

  return { items: sortByPublishedAtDesc(items), failedSourceIds };
}
