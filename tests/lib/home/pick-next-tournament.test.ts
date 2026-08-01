import { describe, expect, it } from "vitest";
import { pickNextTournament } from "@/lib/home/pick-next-tournament";
import type { TournamentSummary } from "@/lib/padel-api/schemas";

function tournament(overrides: Partial<TournamentSummary> & { id: string }): TournamentSummary {
  return {
    name: `Torneio ${overrides.id}`,
    location: "Lisboa",
    country: "PT",
    level: "fip_silver",
    status: "pending",
    startDate: "2026-08-01",
    endDate: "2026-08-07",
    ...overrides,
  };
}

const TODAY = "2026-07-31";

describe("pickNextTournament", () => {
  it("prefere um torneio a decorrer sobre um que ainda vai começar", () => {
    const ongoing = tournament({ id: "ongoing", startDate: "2026-07-27", endDate: "2026-08-02" });
    const upcoming = tournament({ id: "upcoming", startDate: "2026-08-03", endDate: "2026-08-09" });

    expect(pickNextTournament([upcoming, ongoing], TODAY)?.id).toBe("ongoing");
  });

  it("inclui torneios que começam ou acabam exatamente hoje", () => {
    const startsToday = tournament({ id: "starts", startDate: TODAY, endDate: "2026-08-05" });
    const endsToday = tournament({ id: "ends", startDate: "2026-07-25", endDate: TODAY });

    expect(pickNextTournament([startsToday], TODAY)?.id).toBe("starts");
    expect(pickNextTournament([endsToday], TODAY)?.id).toBe("ends");
  });

  it("escolhe o que começa mais cedo quando nenhum está a decorrer", () => {
    const later = tournament({ id: "later", startDate: "2026-09-01", endDate: "2026-09-07" });
    const sooner = tournament({ id: "sooner", startDate: "2026-08-10", endDate: "2026-08-16" });

    expect(pickNextTournament([later, sooner], TODAY)?.id).toBe("sooner");
  });

  it("ignora torneios já terminados", () => {
    const finished = tournament({ id: "finished", startDate: "2026-07-01", endDate: "2026-07-07" });

    expect(pickNextTournament([finished], TODAY)).toBeNull();
  });

  it("devolve null quando não há torneios", () => {
    expect(pickNextTournament([], TODAY)).toBeNull();
  });
});
