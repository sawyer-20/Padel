import { describe, expect, it } from "vitest";
import { parsePlayer, parsePlayersResponse } from "@/lib/padel-api/schemas/players";

describe("parsePlayer", () => {
  it("normaliza a resposta de GET /players/{id} (objeto direto, sem envelope)", () => {
    const response = {
      id: 66,
      name: "Agustin Tapia",
      short_name: "Tapia",
      photo_url: "https://storage.googleapis.com/fantasypadeltour/player-api/agustin-tapia.webp",
      category: "men",
      nationality: "AR",
      hand: "right",
      side: "backhand",
      ranking: 1,
      points: 21266,
      elo: 1904,
      height: 175,
      birthplace: "Catamarca",
      birthdate: "1999-08-13",
      age: 26,
    };

    const result = parsePlayer(response);

    expect(result).toEqual({
      id: "66",
      name: "Agustin Tapia",
      shortName: "Tapia",
      photoUrl: "https://storage.googleapis.com/fantasypadeltour/player-api/agustin-tapia.webp",
      category: "men",
      nationality: "AR",
      hand: "right",
      side: "backhand",
      ranking: { value: 1, masked: false },
      points: { value: 21266, masked: false },
      elo: { value: 1904, masked: false },
      height: 175,
      birthplace: "Catamarca",
      birthdate: "1999-08-13",
      age: 26,
    });
  });

  it("marca ranking/points 'hidden_free_plan' como mascarados", () => {
    const result = parsePlayer({
      id: 7,
      name: "Jogador Novo",
      category: "women",
      ranking: "hidden_free_plan",
      points: "hidden_free_plan",
    });

    expect(result.ranking).toEqual({ value: null, masked: true });
    expect(result.points).toEqual({ value: null, masked: true });
  });

  it("aceita ranking/points/nacionalidade em falta sem rebentar", () => {
    const result = parsePlayer({
      id: 8,
      name: "Sem Ranking",
      category: "men",
    });

    expect(result.ranking).toEqual({ value: null, masked: false });
    expect(result.points).toEqual({ value: null, masked: false });
    expect(result.nationality).toBeNull();
  });

  it("falha explicitamente quando a resposta não corresponde ao schema", () => {
    expect(() => parsePlayer({ nonsense: true })).toThrow();
  });
});

describe("parsePlayersResponse", () => {
  const page = {
    data: [
      { id: 411, name: "Sofia Araujo", category: "women", nationality: "PT", ranking: 8, points: 6799 },
      { id: 900, name: "Nuno Deus", category: "men", nationality: "PT", ranking: 85, points: 1234 },
    ],
    links: { first: null, last: null, prev: null, next: null },
    meta: { current_page: 1, last_page: 3, per_page: 50, total: 121 },
  };

  it("devolve os jogadores da página", () => {
    const { players } = parsePlayersResponse(page);

    expect(players).toHaveLength(2);
    expect(players[0]?.name).toBe("Sofia Araujo");
    expect(players[0]?.ranking).toEqual({ value: 8, masked: false });
  });

  it("devolve o total, que não é o tamanho da página", () => {
    // Espanha tem 659 jogadores e nós lemos 150 — sem o total, a página diria
    // "150 jogadores" e estaria a mentir.
    const { players, total } = parsePlayersResponse(page);

    expect(players.length).toBe(2);
    expect(total).toBe(121);
  });
});
