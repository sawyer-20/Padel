import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { padelApiSource } from "@/lib/data-sources/padel-api-source";
import type { TournamentSummary } from "@/lib/padel-api/schemas";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Badge, type BadgeTone } from "@/components/ui";
import { formatDateRange } from "@/lib/format/dates";
import { formatCountry, formatTournamentLevel } from "@/lib/format/labels";
import { staticPageMetadata, type LocaleParams } from "@/lib/seo/page-metadata";

// Nunca gerado estaticamente com dados reais no build (regra §1.1 do PROJECT.md) — o
// calendário muda e a build não deve depender de um PADEL_API_TOKEN válido.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata(locale, "tournaments", "/tournaments");
}

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

const STATUS_TONE: Record<TournamentStatus, BadgeTone> = {
  ongoing: "live",
  upcoming: "accent",
  finished: "neutral",
};

/**
 * Ordem por estado, não por data: quem chega a esta página quer saber o que está
 * a acontecer agora e o que vem a seguir. O que já terminou fica no fim, do mais
 * recente para o mais antigo.
 */
const GROUP_ORDER: TournamentStatus[] = ["ongoing", "upcoming", "finished"];

function groupByStatus(
  tournaments: TournamentSummary[],
  today: string,
): [TournamentStatus, TournamentSummary[]][] {
  const groups = new Map<TournamentStatus, TournamentSummary[]>();

  for (const tournament of tournaments) {
    const status = resolveStatus(tournament, today);
    const list = groups.get(status) ?? [];
    list.push(tournament);
    groups.set(status, list);
  }

  for (const [status, list] of groups) {
    list.sort((a, b) =>
      status === "finished"
        ? b.startDate.localeCompare(a.startDate)
        : a.startDate.localeCompare(b.startDate),
    );
  }

  return GROUP_ORDER.filter((status) => (groups.get(status)?.length ?? 0) > 0).map((status) => [
    status,
    groups.get(status) as TournamentSummary[],
  ]);
}

export default async function TournamentsPage() {
  const locale = await getLocale();
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

  const groups = tournaments ? groupByStatus(tournaments, today) : [];

  return (
    <div>
      <PageHeader title={t("title")} />

      {errored && <p role="alert">{t("error")}</p>}

      {!errored && tournaments !== null && tournaments.length === 0 && <p>{t("empty")}</p>}

      <div className="flex flex-col gap-8">
        {groups.map(([status, list]) => (
          <section key={status}>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ink-faint">
              {t(`status.${status}`)}
              <span className="font-normal normal-case tracking-normal">({list.length})</span>
            </h2>

            <div className="overflow-x-auto rounded-lg border border-line bg-surface">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line">
                    <th
                      scope="col"
                      className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink-faint"
                    >
                      {t("columns.name")}
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink-faint"
                    >
                      {t("columns.location")}
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink-faint"
                    >
                      {t("columns.level")}
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink-faint"
                    >
                      {t("columns.dates")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {list.map((tournament) => (
                    <tr key={tournament.id} className="hover:bg-raised">
                      <td className="px-4 py-2.5">
                        <Link
                          href={`/tournaments/${tournament.id}`}
                          className="font-medium text-ink no-underline hover:text-accent"
                        >
                          {tournament.name}
                        </Link>
                        {status === "ongoing" && (
                          <span className="ml-2 align-middle">
                            <Badge tone={STATUS_TONE.ongoing}>{t("status.ongoing")}</Badge>
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-ink-muted">
                        {[tournament.location, formatCountry(locale, tournament.country)]
                          .filter(Boolean)
                          .join(", ") || "—"}
                      </td>
                      <td className="px-4 py-2.5 text-ink-muted">
                        {formatTournamentLevel(tournament.level)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2.5 text-ink-muted">
                        {formatDateRange(locale, tournament.startDate, tournament.endDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
