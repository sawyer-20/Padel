import { describe, expect, it } from "vitest";
import { parseMatchesResponse } from "@/lib/padel-api/schemas/matches";

function buildResponse(dataOverride: unknown[]) {
  return {
    data: dataOverride,
    links: { first: null, last: null, prev: null, next: null },
    meta: { current_page: 1, last_page: 1, per_page: 100, total: dataOverride.length },
  };
}

describe("parseMatchesResponse", () => {
  it("normaliza um jogo terminado (formato confirmado contra a API real)", () => {
    const response = buildResponse([
      {
        id: 11091,
        category: "men",
        round: 2,
        round_name: "Semifinals",
        status: "finished",
        played_at: "2026-07-26",
        score: [
          { team_1: "6", team_2: "4" },
          { team_1: "7", team_2: "5" },
        ],
        winner: "team_1",
        players: {
          team_1: [
            { id: 1449, name: "Ramiro Pereyra" },
            { id: 181, name: "Juan Zamora Perez" },
          ],
          team_2: [
            { id: 767, name: "Octavio Alvarez" },
            { id: 149, name: "Diego Garcia Garcia" },
          ],
        },
        connections: { tournament: "/api/tournaments/740" },
      },
    ]);

    const result = parseMatchesResponse(response);

    expect(result).toEqual([
      {
        id: "11091",
        category: "men",
        round: 2,
        roundName: "Semifinals",
        status: "finished",
        playedAt: "2026-07-26",
        score: [
          { team1: "6", team2: "4" },
          { team1: "7", team2: "5" },
        ],
        winner: "team_1",
        team1: ["Ramiro Pereyra", "Juan Zamora Perez"],
        team2: ["Octavio Alvarez", "Diego Garcia Garcia"],
        tournamentId: "740",
      },
    ]);
  });

  it("devolve tournamentId a null quando a resposta não traz connections.tournament", () => {
    const response = buildResponse([
      {
        id: 12001,
        category: "men",
        round: 1,
        round_name: "Final",
        status: "finished",
        played_at: "2026-07-26",
        score: null,
        winner: null,
        players: {
          team_1: [{ id: 1, name: "A" }],
          team_2: [{ id: 2, name: "B" }],
        },
      },
    ]);

    const result = parseMatchesResponse(response);

    expect(result[0]?.tournamentId).toBeNull();
  });

  it("aceita um jogo ainda por realizar, sem score nem vencedor", () => {
    const response = buildResponse([
      {
        id: 12000,
        category: "women",
        round: 1,
        round_name: "Quarterfinals",
        status: "pending",
        played_at: null,
        score: null,
        winner: null,
        players: {
          team_1: [{ id: 1, name: "A" }],
          team_2: [{ id: 2, name: "B" }],
        },
      },
    ]);

    const result = parseMatchesResponse(response);

    expect(result[0]?.score).toEqual([]);
    expect(result[0]?.winner).toBeNull();
  });

  it("falha explicitamente quando a resposta não corresponde ao schema", () => {
    expect(() => parseMatchesResponse({ nonsense: true })).toThrow();
  });
});
