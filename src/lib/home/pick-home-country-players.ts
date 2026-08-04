import type { PlayerProfile } from "@/lib/padel-api/schemas";

/**
 * Escolhe os jogadores do país a destacar no Início: os melhores de cada
 * quadro, alternando entre feminino e masculino.
 *
 * Alternar em vez de concatenar é deliberado. Em Portugal a melhor classificada
 * está muito acima do melhor classificado (8.ª contra 85.º); uma lista ordenada
 * só por posição encheria o bloco de mulheres e outro país encheria de homens.
 * Alternando, os dois quadros aparecem sempre.
 *
 * Pura e sem relógio, para ser testável.
 */
export function pickHomeCountryPlayers(players: PlayerProfile[], limit: number): PlayerProfile[] {
  const byRanking = (a: PlayerProfile, b: PlayerProfile) =>
    (a.ranking.value ?? Number.MAX_SAFE_INTEGER) - (b.ranking.value ?? Number.MAX_SAFE_INTEGER);

  const women = players.filter((p) => p.category === "women").sort(byRanking);
  const men = players.filter((p) => p.category === "men").sort(byRanking);

  const picked: PlayerProfile[] = [];
  for (let index = 0; picked.length < limit; index += 1) {
    const next = [women[index], men[index]].filter(Boolean) as PlayerProfile[];
    if (next.length === 0) break;
    picked.push(...next.slice(0, limit - picked.length));
  }

  return picked;
}
