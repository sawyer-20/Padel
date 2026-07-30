import { afterEach, describe, expect, it, vi } from "vitest";
import { padelApiSource } from "../../../src/lib/data-sources/padel-api-source";

const originalFetch = global.fetch;
const originalToken = process.env.PADEL_API_TOKEN;

afterEach(() => {
  global.fetch = originalFetch;
  process.env.PADEL_API_TOKEN = originalToken;
  vi.restoreAllMocks();
});

describe("padelApiSource.getRankings", () => {
  it("devolve entradas normalizadas quando a API responde com sucesso", async () => {
    process.env.PADEL_API_TOKEN = "test-token";
    global.fetch = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          data: [{ id: 1, name: "A", nationality: "ES", category: "men", ranking: 1, points: 100 }],
          links: { first: null, last: null, prev: null, next: null },
          meta: { current_page: 1, last_page: 1, per_page: 20, total: 1 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );

    const entries = await padelApiSource.getRankings({ category: "men" });

    expect(entries).toHaveLength(1);
    expect(entries[0]?.name).toBe("A");
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/rankings?category=men"),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: "Bearer test-token" }),
      }),
    );
  });

  it("falha explicitamente (nunca com dados inventados) quando o token está em falta", async () => {
    delete process.env.PADEL_API_TOKEN;
    global.fetch = vi.fn();

    await expect(padelApiSource.getRankings({ category: "men" })).rejects.toThrow();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("falha explicitamente quando a API responde com erro HTTP", async () => {
    process.env.PADEL_API_TOKEN = "test-token";
    global.fetch = vi.fn().mockResolvedValue(new Response("", { status: 500 }));

    await expect(padelApiSource.getRankings({ category: "women" })).rejects.toThrow();
  });
});

describe("padelApiSource.getTournaments", () => {
  it("devolve torneios normalizados quando a API responde com sucesso", async () => {
    process.env.PADEL_API_TOKEN = "test-token";
    global.fetch = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          data: [
            {
              id: 822,
              name: "FIP Silver Mimosa Open Porto",
              location: "Oporto",
              country: "PT",
              level: "fip_silver",
              status: "finished",
              start_date: "2026-07-22",
              end_date: "2026-07-26",
            },
          ],
          links: { first: null, last: null, prev: null, next: null },
          meta: { current_page: 1, last_page: 1, per_page: 20, total: 1 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );

    const tournaments = await padelApiSource.getTournaments({ fromDate: "2026-05-01" });

    expect(tournaments).toHaveLength(1);
    expect(tournaments[0]?.name).toBe("FIP Silver Mimosa Open Porto");
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/tournaments?after_date=2026-05-01"),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: "Bearer test-token" }),
      }),
    );
  });

  it("falha explicitamente quando a API responde com erro HTTP", async () => {
    process.env.PADEL_API_TOKEN = "test-token";
    global.fetch = vi.fn().mockResolvedValue(new Response("", { status: 500 }));

    await expect(padelApiSource.getTournaments({ fromDate: "2026-05-01" })).rejects.toThrow();
  });
});

describe("padelApiSource.getTournament", () => {
  it("devolve o detalhe do torneio normalizado", async () => {
    process.env.PADEL_API_TOKEN = "test-token";
    global.fetch = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          id: 822,
          name: "FIP Silver Mimosa Open Porto",
          location: "Oporto",
          country: "PT",
          level: "fip_silver",
          status: "finished",
          start_date: "2026-07-22",
          end_date: "2026-07-26",
          venue: { name: "Stadium", address: "..." },
          prize: { amount: 30000, currency: "EUR" },
          winners: { men: [], women: [] },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );

    const tournament = await padelApiSource.getTournament("822");

    expect(tournament.name).toBe("FIP Silver Mimosa Open Porto");
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/tournaments/822"), expect.anything());
  });
});

describe("padelApiSource.getTournamentMatches", () => {
  function mockTournamentAndMatches(tournamentStatus: string) {
    return vi.fn(async (url: RequestInfo | URL) => {
      if (String(url).includes("/matches")) {
        return new Response(
          JSON.stringify({
            data: [
              {
                id: 1,
                category: "men",
                round: 1,
                round_name: "Final",
                status: "finished",
                played_at: "2026-07-26",
                score: [{ team_1: "6", team_2: "4" }],
                winner: "team_1",
                players: { team_1: [{ id: 1, name: "A" }], team_2: [{ id: 2, name: "B" }] },
              },
            ],
            links: { first: null, last: null, prev: null, next: null },
            meta: { current_page: 1, last_page: 1, per_page: 100, total: 1 },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }
      return new Response(
        JSON.stringify({
          id: 822,
          name: "T",
          location: "L",
          country: "PT",
          level: "fip_silver",
          status: tournamentStatus,
          start_date: "2026-07-22",
          end_date: "2026-07-26",
          venue: null,
          prize: null,
          winners: null,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    });
  }

  it("usa cache indefinido quando o torneio já terminou (§6.1 do PROJECT.md)", async () => {
    process.env.PADEL_API_TOKEN = "test-token";
    global.fetch = mockTournamentAndMatches("finished");

    const matches = await padelApiSource.getTournamentMatches("822");

    expect(matches).toHaveLength(1);
    const matchesCall = (global.fetch as ReturnType<typeof vi.fn>).mock.calls.find(([url]) =>
      String(url).includes("/matches"),
    );
    expect(matchesCall?.[1]).toEqual(expect.objectContaining({ next: expect.objectContaining({ revalidate: false }) }));
  });

  it("usa cache de 1h quando o torneio ainda não terminou", async () => {
    process.env.PADEL_API_TOKEN = "test-token";
    global.fetch = mockTournamentAndMatches("pending");

    await padelApiSource.getTournamentMatches("822");

    const matchesCall = (global.fetch as ReturnType<typeof vi.fn>).mock.calls.find(([url]) =>
      String(url).includes("/matches"),
    );
    expect(matchesCall?.[1]).toEqual(expect.objectContaining({ next: expect.objectContaining({ revalidate: 3600 }) }));
  });

  it("falha explicitamente quando os jogos respondem com erro HTTP", async () => {
    process.env.PADEL_API_TOKEN = "test-token";
    global.fetch = vi.fn(async (url: RequestInfo | URL) => {
      if (String(url).includes("/matches")) {
        return new Response("", { status: 500 });
      }
      return new Response(
        JSON.stringify({
          id: 822,
          name: "T",
          location: "L",
          country: "PT",
          level: "fip_silver",
          status: "finished",
          start_date: "2026-07-22",
          end_date: "2026-07-26",
          venue: null,
          prize: null,
          winners: null,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    });

    await expect(padelApiSource.getTournamentMatches("822")).rejects.toThrow();
  });
});

describe("padelApiSource.getPlayer", () => {
  it("devolve o perfil do jogador normalizado", async () => {
    process.env.PADEL_API_TOKEN = "test-token";
    global.fetch = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          id: 66,
          name: "Agustin Tapia",
          category: "men",
          nationality: "AR",
          ranking: 1,
          points: 21266,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );

    const player = await padelApiSource.getPlayer("66");

    expect(player.name).toBe("Agustin Tapia");
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/players/66"), expect.anything());
  });

  it("falha explicitamente quando a API responde com erro HTTP", async () => {
    process.env.PADEL_API_TOKEN = "test-token";
    global.fetch = vi.fn().mockResolvedValue(new Response("", { status: 500 }));

    await expect(padelApiSource.getPlayer("66")).rejects.toThrow();
  });
});

describe("padelApiSource.getPlayerMatches", () => {
  it("devolve os jogos recentes normalizados", async () => {
    process.env.PADEL_API_TOKEN = "test-token";
    global.fetch = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          data: [
            {
              id: 1,
              category: "men",
              round: 1,
              round_name: "Round of 16",
              status: "live",
              played_at: "2026-07-30",
              score: null,
              winner: null,
              players: { team_1: [{ id: 65, name: "Arturo Coello" }], team_2: [{ id: 101, name: "Edu Alonso" }] },
            },
          ],
          links: { first: null, last: null, prev: null, next: null },
          meta: { current_page: 1, last_page: 1, per_page: 10, total: 1 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );

    const matches = await padelApiSource.getPlayerMatches("66");

    expect(matches).toHaveLength(1);
    expect(matches[0]?.score).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/players/66/matches?sort_by=played_at&order_by=desc"),
      expect.anything(),
    );
  });

  it("falha explicitamente quando a API responde com erro HTTP", async () => {
    process.env.PADEL_API_TOKEN = "test-token";
    global.fetch = vi.fn().mockResolvedValue(new Response("", { status: 500 }));

    await expect(padelApiSource.getPlayerMatches("66")).rejects.toThrow();
  });
});
