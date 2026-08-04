import { describe, expect, it } from "vitest";
import { parsePairsResponse, sortPairs } from "@/lib/padel-api/schemas/pairs";

function pair(overrides: Record<string, unknown>) {
  return {
    id: "411-422",
    name: "Araujo/Ortega",
    category: "women",
    status: "current",
    points: 12718,
    first_match_at: "2024-07-03",
    last_match_at: "2026-08-05",
    players: [
      { id: 411, name: "Sofia Araujo", photo_url: "https://exemplo/sofia.webp", nationality: "PT" },
      { id: 422, name: "Marta Ortega Gallego", photo_url: null, nationality: "ES" },
    ],
    ...overrides,
  };
}

function response(items: unknown[]) {
  return {
    data: items,
    links: { first: null, last: null, prev: null, next: null },
    meta: { current_page: 1, last_page: 1, per_page: 50, total: items.length },
  };
}

describe("parsePairsResponse", () => {
  it("resolve o parceiro como o OUTRO jogador da dupla", () => {
    const [result] = parsePairsResponse(response([pair({})]), "411");

    expect(result?.partner?.id).toBe("422");
    expect(result?.partner?.name).toBe("Marta Ortega Gallego");
  });

  it("resolve o parceiro certo quando se vê a ficha do outro membro", () => {
    const [result] = parsePairsResponse(response([pair({})]), "422");

    expect(result?.partner?.name).toBe("Sofia Araujo");
  });

  it("aceita duplas antigas sem pontos", () => {
    // Verificado contra a API: só a dupla atual traz `points`; as antigas vêm a null.
    const [result] = parsePairsResponse(
      response([pair({ status: "former", points: null })]),
      "411",
    );

    expect(result?.points).toEqual({ value: null, masked: false });
    expect(result?.status).toBe("former");
  });

  it("não inventa parceiro quando a dupla vem com um só jogador", () => {
    const [result] = parsePairsResponse(
      response([pair({ players: [{ id: 411, name: "Sofia Araujo" }] })]),
      "411",
    );

    expect(result?.partner).toBeNull();
  });
});

describe("sortPairs", () => {
  it("põe a dupla atual em primeiro e as antigas da mais recente para a mais antiga", () => {
    const pairs = parsePairsResponse(
      response([
        pair({ id: "a", status: "former", last_match_at: "2023-12-10", points: null }),
        pair({ id: "b", status: "former", last_match_at: "2025-12-13", points: null }),
        pair({ id: "c", status: "current", last_match_at: "2026-08-05" }),
      ]),
      "411",
    );

    expect(sortPairs(pairs).map((p) => p.id)).toEqual(["c", "b", "a"]);
  });
});
