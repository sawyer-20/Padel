import { XMLParser } from "fast-xml-parser";
import type { NewsSource } from "./sources";
import { decodeHtmlEntities } from "./decode-entities";

export type NewsItem = {
  id: string;
  title: string;
  url: string;
  publishedAt: string | null;
  sourceId: string;
  sourceName: string;
  sourceLanguage: string;
  // Resumo próprio, escrito por humano (§3 do PROJECT.md). Fica sempre null enquanto não
  // houver processo editorial — nunca é preenchido com a <description> do feed, que é
  // texto de terceiros (critério de conclusão: "zero reprodução de texto de terceiros").
  summary: string | null;
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  // Mantém o texto tal como vem, mas só lemos title/link/pubDate/guid abaixo.
  trimValues: true,
});

function asText(value: unknown): string | null {
  if (typeof value === "string") return value.trim() || null;
  if (typeof value === "number") return String(value);
  // <title><![CDATA[...]]></title> e afins vêm como objeto com "#text".
  if (value && typeof value === "object" && "#text" in value) {
    return asText((value as Record<string, unknown>)["#text"]);
  }
  return null;
}

function asArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null) return [];
  return [value];
}

function toIsoDate(raw: string | null): string | null {
  if (!raw) return null;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

/**
 * Converte um feed RSS/Atom em NewsItem[].
 *
 * Lê apenas title, link, pubDate e guid. Nunca toca em <description> nem em
 * <content:encoded> — é aqui, na camada de parsing, que se garante que nenhum texto
 * de terceiros entra na aplicação.
 */
export function parseFeed(xml: string, source: NewsSource): NewsItem[] {
  const parsed = parser.parse(xml) as Record<string, unknown>;

  const channel = (parsed.rss as Record<string, unknown> | undefined)?.channel as
    | Record<string, unknown>
    | undefined;
  const atomFeed = parsed.feed as Record<string, unknown> | undefined;

  const rawItems = channel ? asArray(channel.item) : asArray(atomFeed?.entry);

  const items: NewsItem[] = [];

  for (const raw of rawItems) {
    if (!raw || typeof raw !== "object") continue;
    const entry = raw as Record<string, unknown>;

    // Segunda passagem de descodificação: vários feeds escapam duas vezes e o
    // parser de XML só desfaz a primeira. Ver decode-entities.ts.
    const rawTitle = asText(entry.title);
    const title = rawTitle === null ? null : decodeHtmlEntities(rawTitle);

    // Atom usa <link href="...">; RSS usa <link>texto</link>.
    let url = asText(entry.link);
    if (!url && entry.link && typeof entry.link === "object") {
      const linkObj = asArray(entry.link)[0] as Record<string, unknown> | undefined;
      url = typeof linkObj?.["@_href"] === "string" ? linkObj["@_href"] : null;
    }

    // Alguns feeds servem <link> vazio mas um guid que é mesmo um URL utilizável.
    if (!url) {
      const guid = asText(entry.guid);
      if (guid?.startsWith("http")) url = guid;
    }

    // Sem título ou sem URL não há como atribuir a notícia à fonte — descarta-se.
    if (!title || !url) continue;

    const publishedAt = toIsoDate(asText(entry.pubDate) ?? asText(entry.published) ?? asText(entry.updated));

    items.push({
      id: `${source.id}:${url}`,
      title,
      url,
      publishedAt,
      sourceId: source.id,
      sourceName: source.name,
      sourceLanguage: source.language,
      summary: null,
    });
  }

  return items;
}

export function sortByPublishedAtDesc(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => {
    if (!a.publishedAt && !b.publishedAt) return 0;
    if (!a.publishedAt) return 1;
    if (!b.publishedAt) return -1;
    return b.publishedAt.localeCompare(a.publishedAt);
  });
}
