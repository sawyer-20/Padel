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
