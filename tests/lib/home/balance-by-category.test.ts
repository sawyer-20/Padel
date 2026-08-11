import { describe, expect, it } from "vitest";
import type { PlayerProfile } from "@/lib/padel-api/schemas";
import type { RankingEntry } from "@/lib/padel-api/schemas";
import { balanceByCategory, interleave } from "@/lib/home/get-home-data";

function entry(playerId: string): RankingEntry {
  return {
    playerId,
    name: `Atleta ${playerId}`,
    nationality: "ES",
    ranking: { value: 1, masked: false },
    points: { value: 1000, masked: false },
    pointsDiff: { value: null, masked: false },
    rankingDiff: { value: null, masked: false },
    category: "men",
  } satisfies RankingEntry;
}

function player(id: string, category: "men" | "women"): PlayerProfile {
  return {
    id,
    name: `Atleta ${id}`,
    nationality: "ES",
    category,
    ranking: { value: Number(id), masked: false },
    points: { value: 1000, masked: false },
    photoUrl: null,
    age: null,
    birthplace: null,
    side: null,
    hand: null,
    elo: { value: null, masked: false },
    shortName: null,
    height: null,
    birthdate: null,
  } satisfies PlayerProfile;
}

describe("interleave", () => {
  it("alterna as duas categorias, para uma falha a meio não levar só uma delas", () => {
    const homens = [entry("m1"), entry("m2"), entry("m3"), entry("m4")];
    const mulheres = [entry("f1"), entry("f2"), entry("f3"), entry("f4")];

    expect(interleave(homens, mulheres)).toEqual([
      "m1",
      "f1",
      "m2",
      "f2",
      "m3",
      "f3",
      "m4",
      "f4",
    ]);
  });

  it("cortar aos cinco primeiros deixa três deles e duas delas — uma dupla de cada", () => {
    const homens = [entry("m1"), entry("m2"), entry("m3"), entry("m4")];
    const mulheres = [entry("f1"), entry("f2"), entry("f3"), entry("f4")];

    const conseguidos = interleave(homens, mulheres).slice(0, 5);

    expect(conseguidos.filter((id) => id.startsWith("m"))).toHaveLength(3);
    expect(conseguidos.filter((id) => id.startsWith("f"))).toHaveLength(2);
  });

  it("aguenta uma categoria mais curta do que a outra", () => {
    expect(interleave([entry("m1"), entry("m2")], [entry("f1")])).toEqual(["m1", "f1", "m2"]);
  });
});

describe("balanceByCategory", () => {
  it("mantém tudo quando as duas categorias vêm completas", () => {
    const entrada = [player("1", "men"), player("2", "men"), player("3", "women"), player("4", "women")];

    expect(balanceByCategory(entrada)).toHaveLength(4);
  });

  it("encolhe as duas ao tamanho da mais pequena", () => {
    // O caso real que apareceu em produção: quatro homens e uma mulher.
    const entrada = [
      player("1", "men"),
      player("2", "men"),
      player("3", "men"),
      player("4", "men"),
      player("5", "women"),
    ];

    const saida = balanceByCategory(entrada);

    expect(saida).toHaveLength(2);
    expect(saida.filter((p) => p.category === "men")).toHaveLength(1);
    expect(saida.filter((p) => p.category === "women")).toHaveLength(1);
  });

  it("devolve lista vazia quando falta uma categoria por inteiro", () => {
    // Melhor não mostrar montra nenhuma do que mostrar só um dos rankings.
    expect(balanceByCategory([player("1", "men"), player("2", "men")])).toEqual([]);
  });

  it("preserva a ordem do ranking dentro de cada categoria", () => {
    const entrada = [player("1", "men"), player("2", "men"), player("8", "women"), player("9", "women")];

    expect(balanceByCategory(entrada).map((p) => p.id)).toEqual(["1", "2", "8", "9"]);
  });
});
