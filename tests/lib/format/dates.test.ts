import { describe, expect, it } from "vitest";
import { formatDateRange, parseIsoDate } from "@/lib/format/dates";

describe("parseIsoDate", () => {
  it("interpreta a data na hora local, não em UTC", () => {
    const date = parseIsoDate("2026-08-02");

    // Se fosse `new Date("2026-08-02")`, num fuso a oeste de Greenwich isto
    // daria 1 em vez de 2.
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(7);
    expect(date.getDate()).toBe(2);
  });
});

describe("formatDateRange", () => {
  it("colapsa as partes comuns dentro do mesmo mês", () => {
    const result = formatDateRange("pt", "2026-08-02", "2026-08-05");

    expect(result).toContain("2");
    expect(result).toContain("5");
    expect(result).toContain("2026");
  });

  it("mantém os dois anos quando o intervalo atravessa o ano", () => {
    const result = formatDateRange("en", "2026-12-30", "2027-01-02");

    expect(result).toContain("2026");
    expect(result).toContain("2027");
  });

  it("devolve só a data inicial quando o fim é anterior ao início", () => {
    const result = formatDateRange("pt", "2026-08-05", "2026-08-02");

    expect(result).toContain("5");
    expect(result).not.toContain("–");
  });
});
