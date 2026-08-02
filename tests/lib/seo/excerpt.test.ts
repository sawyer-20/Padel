import { describe, expect, it } from "vitest";
import { excerptFromMarkdown } from "@/lib/seo/excerpt";

describe("excerptFromMarkdown", () => {
  it("remove a sintaxe de Markdown e deixa só texto", () => {
    const md = "## Título\n\nO **serviço** faz-se por _baixo_ da cintura.\n\n- Primeiro ponto\n- Segundo ponto";

    expect(excerptFromMarkdown(md)).toBe(
      "Título O serviço faz-se por baixo da cintura. Primeiro ponto Segundo ponto",
    );
  });

  it("substitui uma ligação pelo seu texto", () => {
    expect(excerptFromMarkdown("Ver o [regulamento oficial](https://exemplo.pt/pdf) da FIP.")).toBe(
      "Ver o regulamento oficial da FIP.",
    );
  });

  it("devolve o texto inteiro quando cabe no limite", () => {
    expect(excerptFromMarkdown("Texto curto.", 155)).toBe("Texto curto.");
  });

  it("corta numa fronteira de palavra e acrescenta reticências", () => {
    const result = excerptFromMarkdown("palavra ".repeat(40), 30);

    expect(result.endsWith("…")).toBe(true);
    expect(result.length).toBeLessThanOrEqual(31);
    // Nunca corta a meio de uma palavra.
    expect(result.slice(0, -1).trim().endsWith("palavra")).toBe(true);
  });

  it("não deixa pontuação pendurada antes das reticências", () => {
    expect(excerptFromMarkdown("Um dois três, quatro cinco seis", 14)).toBe("Um dois três…");
  });
});
