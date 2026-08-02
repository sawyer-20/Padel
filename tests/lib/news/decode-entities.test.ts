import { describe, expect, it } from "vitest";
import { decodeHtmlEntities } from "@/lib/news/decode-entities";

describe("decodeHtmlEntities", () => {
  it("descodifica o caso real que aparecia no ecrã", () => {
    // Título vindo do feed do Padelstar, depois do parser de XML já ter feito a
    // primeira passagem sobre o &amp;.
    expect(decodeHtmlEntities("Títulos para Brea-Triay y los &#8216;Chingalan&#8217;")).toBe(
      "Títulos para Brea-Triay y los ‘Chingalan’",
    );
  });

  it("descodifica referências hexadecimais", () => {
    expect(decodeHtmlEntities("caf&#xE9; &#x2014; padel")).toBe("café — padel");
  });

  it("descodifica as entidades nomeadas comuns", () => {
    expect(decodeHtmlEntities("Set &amp; match &ndash; 6&#8211;4")).toBe("Set & match – 6–4");
  });

  it("deixa intactas as entidades nomeadas que não conhece", () => {
    expect(decodeHtmlEntities("Artigo &sect; 12")).toBe("Artigo &sect; 12");
  });

  it("faz uma única passagem, sem descodificar o resultado outra vez", () => {
    expect(decodeHtmlEntities("&amp;lt;script&amp;gt;")).toBe("&lt;script&gt;");
  });

  it("ignora referências numéricas inválidas", () => {
    expect(decodeHtmlEntities("&#0; &#1114112; &#xD800;")).toBe("&#0; &#1114112; &#xD800;");
  });

  it("não mexe em texto sem entidades", () => {
    expect(decodeHtmlEntities("Pretoria P1 2026")).toBe("Pretoria P1 2026");
  });
});
