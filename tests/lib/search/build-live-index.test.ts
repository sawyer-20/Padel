import { describe, expect, it, vi, beforeEach } from "vitest";
import type { RankingEntry, TournamentSummary } from "@/lib/padel-api/schemas";

const getRankings = vi.fn();
const getTournaments = vi.fn();

vi.mock("@/lib/data-sources/padel-api-source", () => ({
  padelApiSource: {
    getRankings: (...args: unknown[]) => getRankings(...args),
    getTournaments: (...args: unknown[]) => getTournaments(...args),
  },
}));

const { buildLiveSearchIndex } = await import("@/lib/search/build-live-index");

function player(overrides: Partial<RankingEntry> = {}): RankingEntry {
  return {
    playerId: "1",
    name: "Sofia Araújo",
    nationality: "PT",
    ranking: { value: 8, masked: false },
    points: { value: 6799, masked: false },
    pointsDiff: { value: null, masked: false },
    rankingDiff: { value: null, masked: false },
    category: "women",
    ...overrides,
  };
}

function tournament(overrides: Partial<TournamentSummary> = {}): TournamentSummary {
  return {
    id: "77",
    name: "FIP Silver Lisboa",
    location: "Lisboa",
    country: "PT",
    level: "fip_silver",
    status: "upcoming",
    startDate: "2026-09-07",
    endDate: "2026-09-13",
    ...overrides,
  };
}

beforeEach(() => {
  getRankings.mockReset();
  getTournaments.mockReset();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("buildLiveSearchIndex", () => {
  it("transforma jogadores em documentos que apontam para a ficha", async () => {
    getRankings.mockResolvedValueOnce([player({ playerId: "9", name: "Nuno Deus", ranking: { value: 85, masked: false } })]);
    getRankings.mockResolvedValueOnce([]);
    getTournaments.mockResolvedValue([]);

    const docs = await buildLiveSearchIndex("pt");

    expect(docs).toHaveLength(1);
    expect(docs[0]).toMatchObject({
      id: "player:9",
      type: "player",
      title: "Nuno Deus",
      href: "/players/9",
    });
  });

  it("põe o país por extenso e a posição no corpo, para «Portugal» encontrar portugueses", async () => {
    getRankings.mockResolvedValueOnce([]);
    getRankings.mockResolvedValueOnce([player()]);
    getTournaments.mockResolvedValue([]);

    const [doc] = await buildLiveSearchIndex("pt");

    expect(doc?.body).toBe("Portugal · #8");
  });

  it("omite a posição quando vem mascarada, em vez de escrever «#null»", async () => {
    getRankings.mockResolvedValueOnce([player({ ranking: { value: null, masked: true } })]);
    getRankings.mockResolvedValueOnce([]);
    getTournaments.mockResolvedValue([]);

    const [doc] = await buildLiveSearchIndex("pt");

    expect(doc?.body).toBe("Portugal");
  });

  it("não repete um jogador que apareça nos dois rankings", async () => {
    getRankings.mockResolvedValueOnce([player({ playerId: "5" })]);
    getRankings.mockResolvedValueOnce([player({ playerId: "5" })]);
    getTournaments.mockResolvedValue([]);

    const docs = await buildLiveSearchIndex("pt");

    expect(docs).toHaveLength(1);
  });

  it("transforma torneios em documentos com local e país", async () => {
    getRankings.mockResolvedValue([]);
    getTournaments.mockResolvedValue([tournament()]);

    const docs = await buildLiveSearchIndex("pt");

    expect(docs).toContainEqual({
      id: "tournament:77",
      type: "tournament",
      title: "FIP Silver Lisboa",
      body: "Lisboa · Portugal",
      href: "/tournaments/77",
    });
  });

  it("devolve os torneios mesmo quando os rankings falham", async () => {
    getRankings.mockRejectedValue(new Error("429"));
    getTournaments.mockResolvedValue([tournament()]);

    const docs = await buildLiveSearchIndex("pt");

    expect(docs).toHaveLength(1);
    expect(docs[0]?.type).toBe("tournament");
  });

  it("devolve uma lista vazia — e não um erro — quando a API inteira falha", async () => {
    getRankings.mockRejectedValue(new Error("em baixo"));
    getTournaments.mockRejectedValue(new Error("em baixo"));

    await expect(buildLiveSearchIndex("pt")).resolves.toEqual([]);
  });
});
