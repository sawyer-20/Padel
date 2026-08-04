import { describe, expect, it } from "vitest";
import { parseRankingsResponse } from "@/lib/padel-api/schemas/rankings";

function buildResponse(dataOverride: unknown[]) {
  return {
    data: dataOverride,
    links: { first: null, last: null, prev: null, next: null },
    meta: { current_page: 1, last_page: 1, per_page: 20, total: dataOverride.length },
  };
}

describe("parseRankingsResponse", () => {
  it("normaliza uma resposta válida (formato confirmado contra a API real)", () => {
    const response = buildResponse([
      {
        id: 66,
        name: "Agustin Tapia",
        category: "men",
        nationality: "AR",
        ranking: 1,
        points: 21266,
        points_diff: -712,
        ranking_diff: -2,
        date: "2026-07-27",
      },
    ]);

    const result = parseRankingsResponse(response);

    expect(result).toEqual([
      {
        playerId: "66",
        name: "Agustin Tapia",
        nationality: "AR",
        ranking: { value: 1, masked: false },
        points: { value: 21266, masked: false },
        pointsDiff: { value: -712, masked: false },
        // Negativo = subiu duas posições. Convenção determinada contra a API
        // real; ver a nota em schemas/rankings.ts.
        rankingDiff: { value: -2, masked: false },
        category: "men",
      },
    ]);
  });

  it("aceita uma resposta sem points_diff sem rebentar", () => {
    // A API nem sempre devolve o campo; a tabela mostra o valor sem variação.
    const result = parseRankingsResponse(
      buildResponse([{ id: 1, name: "Sem variação", category: "men", ranking: 1, points: 100 }]),
    );

    expect(result[0]?.pointsDiff).toEqual({ value: null, masked: false });
    expect(result[0]?.rankingDiff).toEqual({ value: null, masked: false });
  });

  it("marca valores 'hidden_free_plan' como mascarados em vez de os esconder ou inventar um valor", () => {
    const response = buildResponse([
      {
        id: 7,
        name: "João Costa",
        category: "men",
        nationality: null,
        ranking: "hidden_free_plan",
        points: "hidden_free_plan",
      },
    ]);

    const result = parseRankingsResponse(response);

    expect(result[0]?.ranking).toEqual({ value: null, masked: true });
    expect(result[0]?.points).toEqual({ value: null, masked: true });
  });

  it("falha explicitamente quando a resposta não corresponde ao schema", () => {
    expect(() => parseRankingsResponse({ nonsense: true })).toThrow();
  });
});
