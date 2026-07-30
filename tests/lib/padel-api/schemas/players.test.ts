import { describe, expect, it } from "vitest";
import { parsePlayer } from "@/lib/padel-api/schemas/players";

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
