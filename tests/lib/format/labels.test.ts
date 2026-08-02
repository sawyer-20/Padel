import { describe, expect, it } from "vitest";
import { formatCountry, formatTournamentLevel } from "@/lib/format/labels";

describe("formatTournamentLevel", () => {
  it("traduz os valores conhecidos da API para o nome do circuito", () => {
    expect(formatTournamentLevel("fip_silver")).toBe("FIP Silver");
    expect(formatTournamentLevel("p1")).toBe("P1");
    expect(formatTournamentLevel("major")).toBe("Major");
    expect(formatTournamentLevel("fip_other")).toBe("FIP");
  });

  it("apresenta categorias desconhecidas em vez de as esconder", () => {
    // A API acrescenta categorias sem aviso; a tabela não pode ficar com um vazio.
    expect(formatTournamentLevel("fip_diamond")).toBe("FIP Diamond");
    expect(formatTournamentLevel("world_championship")).toBe("World Championship");
  });
});

describe("formatCountry", () => {
  it("expande o código ISO no idioma pedido", () => {
    expect(formatCountry("pt", "ZA")).toBe("África do Sul");
    expect(formatCountry("en", "PT")).toBe("Portugal");
    expect(formatCountry("de", "FR")).toBe("Frankreich");
  });

  it("aceita o código em minúsculas", () => {
    expect(formatCountry("en", "gb")).toBe("United Kingdom");
  });

  it("devolve o valor original quando não é um código de país", () => {
    expect(formatCountry("pt", "Puerto Cabello")).toBe("Puerto Cabello");
  });

  it("devolve null quando não há país", () => {
    expect(formatCountry("pt", null)).toBeNull();
  });
});
