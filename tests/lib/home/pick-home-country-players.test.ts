import { describe, expect, it } from "vitest";
import { pickHomeCountryPlayers } from "@/lib/home/pick-home-country-players";
import type { PlayerProfile } from "@/lib/padel-api/schemas";

function player(name: string, category: string, ranking: number | null): PlayerProfile {
  return {
    id: name,
    name,
    shortName: null,
    photoUrl: null,
    category,
    nationality: "PT",
    hand: null,
    side: null,
    ranking: { value: ranking, masked: false },
    points: { value: null, masked: false },
    elo: { value: null, masked: false },
    height: null,
    birthplace: null,
    birthdate: null,
    age: null,
  };
}

describe("pickHomeCountryPlayers", () => {
  it("alterna entre feminino e masculino em vez de ordenar só por posição", () => {
    // Números reais de Portugal: a melhor classificada está muito acima do melhor
    // classificado. Ordenar só por posição encheria o bloco de mulheres.
    const players = [
      player("Sofia", "women", 8),
      player("Ana", "women", 60),
      player("Catarina", "women", 112),
      player("Nuno", "men", 85),
      player("Miguel", "men", 101),
      player("Pedro", "men", 124),
    ];

    expect(pickHomeCountryPlayers(players, 4).map((p) => p.name)).toEqual([
      "Sofia",
      "Nuno",
      "Ana",
      "Miguel",
    ]);
  });

  it("respeita o limite mesmo quando é ímpar", () => {
    const players = [
      player("Sofia", "women", 8),
      player("Ana", "women", 60),
      player("Nuno", "men", 85),
    ];

    expect(pickHomeCountryPlayers(players, 3).map((p) => p.name)).toEqual(["Sofia", "Nuno", "Ana"]);
  });

  it("aguenta um quadro vazio sem entrar em ciclo infinito", () => {
    const players = [player("Nuno", "men", 85), player("Miguel", "men", 101)];

    expect(pickHomeCountryPlayers(players, 6).map((p) => p.name)).toEqual(["Nuno", "Miguel"]);
  });

  it("põe quem tem posição mascarada no fim, não no início", () => {
    const players = [player("Sem posição", "men", null), player("Nuno", "men", 85)];

    expect(pickHomeCountryPlayers(players, 2).map((p) => p.name)).toEqual(["Nuno", "Sem posição"]);
  });

  it("devolve vazio quando não há jogadores", () => {
    expect(pickHomeCountryPlayers([], 6)).toEqual([]);
  });
});
