import { getTranslations } from "next-intl/server";
import { padelApiSource } from "@/lib/data-sources/padel-api-source";
import type { TournamentSummary } from "@/lib/padel-api/schemas";

// Nunca gerado estaticamente com dados reais no build (regra §1.1 do PROJECT.md) — o
// calendário muda e a build não deve depender de um PADEL_API_TOKEN válido.
export const dynamic = "force-dynamic";

const WINDOW_DAYS_BACK = 60;

function formatDateParam(date: Date): string {
  return date.toISOString().slice(0, 10);
}

type TournamentStatus = "finished" | "ongoing" | "upcoming";

function resolveStatus(tournament: TournamentSummary, today: string): TournamentStatus {
  if (tournament.status === "finished") return "finished";
  if (tournament.startDate <= today && today <= tournament.endDate) return "ongoing";
  return "upcoming";
}

export default async function TournamentsPage() {
  const t = await getTranslations("tournaments");
  const now = new Date();
  const fromDate = formatDateParam(new Date(now.getTime() - WINDOW_DAYS_BACK * 24 * 60 * 60 * 1000));
  const today = formatDateParam(now);

  let tournaments: TournamentSummary[] | null = null;
  let errored = false;

  try {
    tournaments = await padelApiSource.getTournaments({ fromDate });
  } catch (error) {
    console.error("Falha ao carregar torneios:", error);
    errored = true;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-medium">{t("title")}</h2>

      {errored && <p role="alert">{t("error")}</p>}

      {!errored && tournaments !== null && tournaments.length === 0 && <p>{t("empty")}</p>}

      {!errored && tournaments !== null && tournaments.length > 0 && (
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <th className="py-2 font-medium">{t("columns.name")}</th>
              <th className="py-2 font-medium">{t("columns.location")}</th>
              <th className="py-2 font-medium">{t("columns.level")}</th>
              <th className="py-2 font-medium">{t("columns.dates")}</th>
              <th className="py-2 font-medium">{t("columns.status")}</th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map((tournament) => (
              <tr key={tournament.id} className="border-b border-neutral-100 dark:border-neutral-900">
                <td className="py-2">{tournament.name}</td>
                <td className="py-2">
                  {[tournament.location, tournament.country].filter(Boolean).join(", ") || "—"}
                </td>
                <td className="py-2">{tournament.level}</td>
                <td className="py-2">
                  {tournament.startDate} – {tournament.endDate}
                </td>
                <td className="py-2">{t(`status.${resolveStatus(tournament, today)}`)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
