import { describe, expect, it } from "vitest";
import { parseRankingsResponse } from "../../../src/lib/padel-api/schemas";

function buildResponse(dataOverride: unknown[]) {
  return {
    data: dataOverride,
    links: { first: null, last: null, prev: null, next: null },
    meta: { current_page: 1, last_page: 1, per_page: 20, total: dataOverride.length },
  };
}

describe("parseRankingsResponse", () => {
  it("normaliza uma resposta válida", () => {
    const response = buildResponse([
      {
        position: 1,
        points: 5000,
        player: { id: 42, name: "Ana Silva", country: "PT" },
        category: "men",
      },
    ]);

    const result = parseRankingsResponse(response);

    expect(result).toEqual([
      {
        position: { value: 1, masked: false },
        points: { value: 5000, masked: false },
        player: { id: "42", name: "Ana Silva", country: "PT" },
        category: "men",
      },
    ]);
  });

  it("marca valores 'hidden_free_plan' como mascarados em vez de os esconder ou inventar um valor", () => {
    const response = buildResponse([
      {
        position: "hidden_free_plan",
        points: "hidden_free_plan",
        player: { id: 7, name: "João Costa", country: null },
      },
    ]);

    const result = parseRankingsResponse(response);

    expect(result[0]?.position).toEqual({ value: null, masked: true });
    expect(result[0]?.points).toEqual({ value: null, masked: true });
  });

  it("falha explicitamente quando a resposta não corresponde ao schema", () => {
    expect(() => parseRankingsResponse({ nonsense: true })).toThrow();
  });
});
