import { describe, expect, it } from "vitest";
import { parseFeed, sortByPublishedAtDesc } from "@/lib/news/schemas";
import type { NewsSource } from "@/lib/news/sources";

const source: NewsSource = {
  id: "test",
  name: "Test Source",
  feedUrl: "https://example.test/feed/",
  homepage: "https://example.test/",
  language: "fr",
};

// Estrutura copiada da forma dos feeds reais (CDATA, description com HTML, item sem link).
const SECRET_DESCRIPTION = "TEXTO DE TERCEIROS QUE NUNCA DEVE APARECER NA APP";

const RSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Test Source</title>
    <language>fr-FR</language>
    <item>
      <title>Notícia mais antiga</title>
      <link>https://example.test/antiga/</link>
      <pubDate>Mon, 28 Jul 2026 10:00:00 +0000</pubDate>
      <description><![CDATA[<p>${SECRET_DESCRIPTION}</p>]]></description>
    </item>
    <item>
      <title><![CDATA[Notícia mais recente]]></title>
      <link>https://example.test/recente/</link>
      <pubDate>Thu, 31 Jul 2026 11:58:25 +0000</pubDate>
      <description><![CDATA[${SECRET_DESCRIPTION}]]></description>
      <content:encoded><![CDATA[${SECRET_DESCRIPTION}]]></content:encoded>
    </item>
    <item>
      <title>Item sem link nenhum</title>
      <link></link>
      <pubDate>Wed, 30 Jul 2026 09:00:00 +0000</pubDate>
    </item>
  </channel>
</rss>`;

describe("parseFeed", () => {
  it("extrai título, url e data dos itens válidos", () => {
    const items = parseFeed(RSS, source);

    expect(items).toHaveLength(2);
    expect(items.map((i) => i.title)).toEqual(["Notícia mais antiga", "Notícia mais recente"]);
    expect(items[0]?.url).toBe("https://example.test/antiga/");
    expect(items[0]?.publishedAt).toBe("2026-07-28T10:00:00.000Z");
  });

  it("anexa a informação da fonte a cada item", () => {
    const items = parseFeed(RSS, source);

    expect(items[0]?.sourceId).toBe("test");
    expect(items[0]?.sourceName).toBe("Test Source");
    expect(items[0]?.sourceLanguage).toBe("fr");
  });

  it("descarta itens sem link utilizável (caso real de feeds com <link> vazio)", () => {
    const items = parseFeed(RSS, source);

    expect(items.some((i) => i.title === "Item sem link nenhum")).toBe(false);
  });

  it("nunca reproduz texto de terceiros — critério de conclusão da Fase 3", () => {
    const items = parseFeed(RSS, source);

    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      // Nenhum campo do item pode conter texto vindo de <description>/<content:encoded>.
      expect(JSON.stringify(item)).not.toContain(SECRET_DESCRIPTION);
      expect(item.summary).toBeNull();
    }
  });

  it("aceita um feed Atom (link como atributo href)", () => {
    const atom = `<?xml version="1.0" encoding="utf-8"?>
      <feed xmlns="http://www.w3.org/2005/Atom">
        <entry>
          <title>Entrada Atom</title>
          <link href="https://example.test/atom/" />
          <updated>2026-07-31T08:00:00Z</updated>
        </entry>
      </feed>`;

    const items = parseFeed(atom, source);

    expect(items).toHaveLength(1);
    expect(items[0]?.url).toBe("https://example.test/atom/");
  });

  it("devolve lista vazia para XML sem itens em vez de rebentar", () => {
    expect(parseFeed("<rss><channel></channel></rss>", source)).toEqual([]);
  });
});

describe("sortByPublishedAtDesc", () => {
  it("ordena da notícia mais recente para a mais antiga", () => {
    const sorted = sortByPublishedAtDesc(parseFeed(RSS, source));

    expect(sorted.map((i) => i.title)).toEqual(["Notícia mais recente", "Notícia mais antiga"]);
  });

  it("empurra itens sem data para o fim", () => {
    const sorted = sortByPublishedAtDesc([
      { ...base(), id: "a", title: "sem data", publishedAt: null },
      { ...base(), id: "b", title: "com data", publishedAt: "2026-07-01T00:00:00.000Z" },
    ]);

    expect(sorted.map((i) => i.title)).toEqual(["com data", "sem data"]);
  });
});

function base() {
  return {
    id: "x",
    title: "x",
    url: "https://example.test/x",
    publishedAt: null,
    sourceId: "test",
    sourceName: "Test Source",
    sourceLanguage: "fr",
    summary: null,
  };
}
