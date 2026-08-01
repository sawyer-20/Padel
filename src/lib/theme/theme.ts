export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_PREFERENCES: ThemePreference[] = ["system", "light", "dark"];
export const DEFAULT_THEME_PREFERENCE: ThemePreference = "system";
export const THEME_STORAGE_KEY = "padel-hub-theme";

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

/**
 * Traduz a preferência guardada no tema efetivamente aplicado.
 *
 * Função pura (recebe o que o sistema prefere em vez de o ir consultar) para os casos
 * de fronteira serem testáveis sem browser.
 */
export function resolveTheme(preference: ThemePreference, systemPrefersDark: boolean): ResolvedTheme {
  if (preference === "light") return "light";
  if (preference === "dark") return "dark";
  return systemPrefersDark ? "dark" : "light";
}
