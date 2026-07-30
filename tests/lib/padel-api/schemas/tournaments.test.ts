import { describe, expect, it } from "vitest";
import { parseTournamentsResponse } from "@/lib/padel-api/schemas/tournaments";

function buildResponse(dataOverride: unknown[]) {
  return {
    data: dataOverride,
    links: { first: null, last: null, prev: null, next: null },
    meta: { current_page: 1, last_page: 1, per_page: 20, total: dataOverride.length },
  };
}

describe("parseTournamentsResponse", () => {
  it("normaliza uma resposta válida (formato confirmado contra a API real)", () => {
    const response = buildResponse([
      {
        id: 822,
        name: "FIP Silver Mimosa Open Porto",
        location: "Oporto",
        country: "PT",
        level: "fip_silver",
        status: "finished",
        start_date: "2026-07-22",
        end_date: "2026-07-26",
        venue: { name: "Stadium Parque Da Cidade", address: "..." },
        prize: { amount: 30000, currency: "EUR" },
        winners: { men: [], women: [] },
      },
    ]);

    const result = parseTournamentsResponse(response);

    expect(result).toEqual([
      {
        id: "822",
        name: "FIP Silver Mimosa Open Porto",
        location: "Oporto",
        country: "PT",
        level: "fip_silver",
        status: "finished",
        startDate: "2026-07-22",
        endDate: "2026-07-26",
      },
    ]);
  });

  it("aceita venue/prize/winners/location/country nulos sem falhar", () => {
    const response = buildResponse([
      {
        id: 751,
        name: "Mexico Major 2026",
        location: null,
        country: null,
        level: "major",
        status: "pending",
        start_date: "2026-11-23",
        end_date: "2026-11-29",
        venue: null,
        prize: null,
        winners: null,
      },
    ]);

    const result = parseTournamentsResponse(response);

    expect(result[0]?.location).toBeNull();
    expect(result[0]?.country).toBeNull();
  });

  it("falha explicitamente quando a resposta não corresponde ao schema", () => {
    expect(() => parseTournamentsResponse({ nonsense: true })).toThrow();
  });
});
