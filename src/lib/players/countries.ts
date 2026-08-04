/**
 * Países com jogadores no circuito, verificados contra a API real.
 *
 * Contagens em 2026-08-03: ES 659, AR 209, IT 160, FR 122, PT 121, GB 80,
 * BR 48, SE 47, NL 39, DE 13. Não é uma lista exaustiva — é uma lista curta de
 * opções que sabemos que devolvem alguém, para o seletor não ter entradas mortas.
 */
export const PLAYER_COUNTRIES = ["PT", "ES", "AR", "IT", "FR", "GB", "BR", "SE", "NL", "DE"] as const;

/** Portugal por omissão: é o mercado que este portal serve primeiro. */
export const DEFAULT_PLAYER_COUNTRY = "PT";

export function isPlayerCountry(value: string | undefined): value is (typeof PLAYER_COUNTRIES)[number] {
  return typeof value === "string" && (PLAYER_COUNTRIES as readonly string[]).includes(value);
}
