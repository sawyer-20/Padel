import { describe, expect, it } from "vitest";
import { isThemePreference, resolveTheme } from "@/lib/theme/theme";

describe("resolveTheme", () => {
  it("respeita uma escolha explícita, contra a preferência do sistema", () => {
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });

  it('com "sistema", segue o que o SO indica', () => {
    expect(resolveTheme("system", true)).toBe("dark");
    expect(resolveTheme("system", false)).toBe("light");
  });
});

describe("isThemePreference", () => {
  it("aceita as três preferências válidas", () => {
    expect(isThemePreference("light")).toBe(true);
    expect(isThemePreference("dark")).toBe(true);
    expect(isThemePreference("system")).toBe(true);
  });

  it("rejeita lixo vindo do localStorage", () => {
    expect(isThemePreference(null)).toBe(false);
    expect(isThemePreference("")).toBe(false);
    expect(isThemePreference("DARK")).toBe(false);
    expect(isThemePreference(1)).toBe(false);
  });
});
