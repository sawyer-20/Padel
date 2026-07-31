import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchNews } from "@/lib/news/fetch-news";
import type { NewsSource } from "@/lib/news/sources";

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  vi.restoreAllMocks();
});

const sourceA: NewsSource = {
  id: "a",
  name: "Source A",
  feedUrl: "https://a.test/feed/",
  homepage: "https://a.test/",
  language: "en",
};

const sourceB: NewsSource = {
  id: "b",
  name: "Source B",
  feedUrl: "https://b.test/feed/",
  homepage: "https://b.test/",
  language: "es",
};

function rssWith(title: string, url: string, pubDate: string) {
  return `<?xml version="1.0"?><rss version="2.0"><channel><item>
    <title>${title}</title><link>${url}</link><pubDate>${pubDate}</pubDate>
  </item></channel></rss>`;
}

describe("fetchNews", () => {
  it("junta e ordena itens de todas as fontes quando todas respondem", async () => {
    global.fetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("a.test")) {
        return new Response(rssWith("Antiga de A", "https://a.test/1", "Mon, 28 Jul 2026 10:00:00 +0000"), {
          status: 200,
        });
      }
      return new Response(rssWith("Recente de B", "https://b.test/1", "Thu, 31 Jul 2026 10:00:00 +0000"), {
        status: 200,
      });
    }) as typeof fetch;

    const result = await fetchNews([sourceA, sourceB]);

    expect(result.failedSourceIds).toEqual([]);
    expect(result.items.map((i) => i.title)).toEqual(["Recente de B", "Antiga de A"]);
  });

  it("degradação graciosa: uma fonte a falhar não derruba as outras", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).includes("a.test")) {
        return new Response("", { status: 500 });
      }
      return new Response(rssWith("Notícia de B", "https://b.test/1", "Thu, 31 Jul 2026 10:00:00 +0000"), {
        status: 200,
      });
    }) as typeof fetch;

    const result = await fetchNews([sourceA, sourceB]);

    expect(result.failedSourceIds).toEqual(["a"]);
    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.sourceId).toBe("b");
  });

  it("assinala todas as fontes como falhadas quando nenhuma responde", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = vi.fn(async () => {
      throw new Error("rede indisponível");
    }) as unknown as typeof fetch;

    const result = await fetchNews([sourceA, sourceB]);

    expect(result.items).toEqual([]);
    expect(result.failedSourceIds).toEqual(["a", "b"]);
  });

  it("pede os feeds com cache de 1h e tags de revalidação", async () => {
    global.fetch = vi.fn(
      async () => new Response(rssWith("X", "https://a.test/1", "Thu, 31 Jul 2026 10:00:00 +0000"), { status: 200 }),
    ) as typeof fetch;

    await fetchNews([sourceA]);

    expect(global.fetch).toHaveBeenCalledWith(
      sourceA.feedUrl,
      expect.objectContaining({
        next: expect.objectContaining({ revalidate: 3600, tags: ["news:feeds", "news:a"] }),
      }),
    );
  });
});
