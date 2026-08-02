/**
 * A Padel API devolve valores de máquina — `fip_silver`, `p1`, `ZA` — e até aqui
 * estavam a chegar assim à tabela. Nenhum destes é uma palavra que se diga em voz
 * alta sobre um torneio.
 */

const KNOWN_LEVELS: Record<string, string> = {
  major: "Major",
  p1: "P1",
  p2: "P2",
  fip_platinum: "FIP Platinum",
  fip_gold: "FIP Gold",
  fip_silver: "FIP Silver",
  fip_bronze: "FIP Bronze",
  fip_rise: "FIP Rise",
  fip_promotion: "FIP Promotion",
  fip_other: "FIP",
};

/**
 * Categoria do torneio como aparece nos cartazes.
 *
 * Nomes próprios do circuito, por isso não são traduzidos: um "FIP Silver" é um
 * FIP Silver em qualquer dos cinco idiomas. Valores desconhecidos são
 * apresentados o melhor possível em vez de desaparecerem — a API acrescenta
 * categorias novas sem aviso.
 */
export function formatTournamentLevel(level: string): string {
  const known = KNOWN_LEVELS[level.toLowerCase()];
  if (known) return known;

  return level
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((word) =>
      word.toLowerCase() === "fip" ? "FIP" : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join(" ");
}

/**
 * Código ISO de país pelo nome no idioma do utilizador: "ZA" → "África do Sul".
 *
 * Devolve o próprio código quando não é um código válido de duas letras, porque
 * a API também usa este campo para valores livres.
 */
export function formatCountry(locale: string, code: string | null): string | null {
  if (!code) return null;
  if (!/^[A-Za-z]{2}$/.test(code)) return code;

  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(code.toUpperCase()) ?? code;
  } catch {
    return code;
  }
}
