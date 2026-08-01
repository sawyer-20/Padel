import type { TournamentSummary } from "@/lib/padel-api/schemas";

/**
 * Escolhe o torneio a destacar no Início.
 *
 * Prefere um torneio a decorrer hoje; se não houver nenhum, escolhe o próximo a começar.
 * Torneios já terminados são ignorados. Devolve null quando não há nada a destacar.
 *
 * `today` é passado como parâmetro (formato "YYYY-MM-DD") em vez de lido aqui dentro,
 * para a função ser pura e testável sem depender do relógio.
 */
export function pickNextTournament(
  tournaments: TournamentSummary[],
  today: string,
): TournamentSummary | null {
  const ongoing = tournaments
    .filter((t) => t.startDate <= today && today <= t.endDate)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  if (ongoing[0]) return ongoing[0];

  const upcoming = tournaments
    .filter((t) => t.startDate > today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  return upcoming[0] ?? null;
}
