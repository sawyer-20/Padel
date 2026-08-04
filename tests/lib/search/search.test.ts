import { describe, expect, it } from "vitest";
import { normalize, search, tokenize } from "@/lib/search/search";
import { buildSearchIndex } from "@/lib/search/build-index";
import { locales } from "@/i18n/routing";
import type { SearchDoc } from "@/lib/search/types";

const docs: SearchDoc[] = [
  {
    id: "term:vibora",
    type: "term",
    title: "Víbora",
    body: "Variante mais agressiva da bandeja, com efeito lateral e trajetória rasteira.",
    href: "/training/glossary#vibora",
  },
  {
    id: "rule:scoring",
    type: "rule",
    title: "Como se conta um jogo",
    body: "O padel conta pontos como o ténis: 15, 30, 40 e jogo.",
    href: "/rules/scoring",
  },
  {
    id: "faq:walls",
    type: "faq",
    title: "Posso jogar a bola depois de bater na parede?",
    body: "Sim, desde que a bola tenha ressaltado primeiro no chão do teu campo.",
    href: "/faq#walls",
  },
];

describe("normalize", () => {
  it("retira acentos e passa a minúsculas", () => {
    expect(normalize("Víbora")).toBe("vibora");
    expect(normalize("SITUAÇÕES")).toBe("situacoes");
    expect(normalize("Häufige")).toBe("haufige");
  });
});

describe("tokenize", () => {
  it("parte por pontuação e descarta letras soltas", () => {
    expect(tokenize("bola, parede!")).toEqual(["bola", "parede"]);
    expect(tokenize("a bola")).toEqual(["bola"]);
  });

  it("devolve vazio para uma pesquisa sem conteúdo", () => {
    expect(tokenize("   ")).toEqual([]);
    expect(tokenize("!!")).toEqual([]);
  });
});

describe("search", () => {
  it("encontra apesar dos acentos em falta", () => {
    // É assim que se escreve numa caixa de pesquisa, sobretudo no telemóvel.
    const results = search(docs, "vibora");

    expect(results).toHaveLength(1);
    expect(results[0]?.doc.id).toBe("term:vibora");
  });

  it("dá mais peso a uma correspondência no título do que no corpo", () => {
    const results = search(docs, "bola");

    // "bola" está no título de uma e só no corpo da outra.
    expect(results[0]?.doc.id).toBe("faq:walls");
  });

  it("exige todos os termos, não qualquer um", () => {
    // "parede" só existe na FAQ; "jogo" existe na regra. Nenhum documento tem os dois.
    expect(search(docs, "parede jogo")).toHaveLength(0);
    expect(search(docs, "bola parede")).toHaveLength(1);
  });

  it("não corresponde a meio de uma palavra", () => {
    // "parede" contém "rede", e "globo" contém "lob". Antes disto, procurar
    // "rede" devolvia 43 dos 57 documentos do site.
    expect(search(docs, "rede")).toHaveLength(0);
    expect(search(docs, "arede")).toHaveLength(0);
  });

  it("corresponde a partir do início de uma palavra", () => {
    // É o que uma pessoa espera enquanto ainda está a escrever.
    const results = search(docs, "vibo");

    expect(results).toHaveLength(1);
    expect(results[0]?.doc.id).toBe("term:vibora");
  });

  it("devolve vazio para uma pesquisa vazia", () => {
    expect(search(docs, "")).toEqual([]);
    expect(search(docs, "  ")).toEqual([]);
  });

  it("inclui um excerto com o termo procurado", () => {
    const [result] = search(docs, "ressaltado");

    expect(result?.snippet.toLowerCase()).toContain("ressaltado");
  });

  it("respeita o limite pedido", () => {
    expect(search(docs, "a bola de padel", 1).length).toBeLessThanOrEqual(1);
  });
});

describe("buildSearchIndex", () => {
  for (const locale of locales) {
    it(`constrói um índice não vazio para "${locale}"`, () => {
      const index = buildSearchIndex(locale);

      expect(index.length).toBeGreaterThan(50);
      // Todos os tipos de conteúdo têm de estar representados — se um módulo
      // deixar de ser indexado, o conteúdo desaparece da pesquisa em silêncio.
      const types = new Set(index.map((doc) => doc.type));
      expect([...types].sort()).toEqual(["faq", "rule", "situation", "term", "tip"]);
      expect(index.every((doc) => doc.title.length > 0 && doc.body.length > 0)).toBe(true);
    });
  }
});
