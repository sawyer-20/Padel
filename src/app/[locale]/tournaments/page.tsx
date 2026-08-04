import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { padelApiSource } from "@/lib/data-sources/padel-api-source";
import type { TournamentSummary } from "@/lib/padel-api/schemas";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Badge, type BadgeTone } from "@/components/ui";
import { formatDateRange } from "@/lib/format/dates";
import { formatCountry, formatTournamentLevel } from "@/lib/format/labels";
import { HOME_COUNTRY } from "@/lib/home/get-home-data";
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

/**
 * Países presentes na lista, ordenados por número de torneios, com Portugal
 * sempre à frente.
 *
 * Derivado dos dados e não de uma lista fixa: um país sem torneios este mês não
 * deve aparecer como filtro que devolve zero.
 */
function countriesInList(tournaments: TournamentSummary[]): { code: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const tournament of tournaments) {
    if (!tournament.country) continue;
    counts.set(tournament.country, (counts.get(tournament.country) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => {
      if (a.code === HOME_COUNTRY) return -1;
      if (b.code === HOME_COUNTRY) return 1;
      return b.count - a.count || a.code.localeCompare(b.code);
    });
}

export default async function TournamentsPage({
  searchParams,
}: {
  searchParams: Promise<{ country?: string }>;
}) {
  const locale = await getLocale();
  const t = await getTranslations("tournaments");
  const { country: selectedCountry } = await searchParams;
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

  const all = tournaments ?? [];
  const countries = countriesInList(all);
  const isKnownCountry = countries.some((c) => c.code === selectedCountry);
  const visible = isKnownCountry ? all.filter((tour) => tour.country === selectedCountry) : all;
  const groups = groupByStatus(visible, today);

  return (
    <div>
      <PageHeader title={t("title")} />

      {countries.length > 1 && (
        <nav aria-label={t("countryFilterLabel")} className="mb-6 flex flex-wrap gap-1.5">
          <Link
            href="/tournaments"
            scroll={false}
            aria-current={isKnownCountry ? undefined : "page"}
            className={`rounded-md border px-2.5 py-1 text-sm no-underline ${
              isKnownCountry
                ? "border-line text-ink-muted hover:border-line-strong hover:text-ink"
                : "border-accent bg-accent font-medium text-accent-ink"
            }`}
          >
            {t("allCountries", { count: all.length })}
          </Link>
          {countries.map(({ code, count }) => (
            <Link
              key={code}
              href={`/tournaments?country=${code}`}
              scroll={false}
              aria-current={selectedCountry === code ? "page" : undefined}
              className={`rounded-md border px-2.5 py-1 text-sm no-underline ${
                selectedCountry === code
                  ? "border-accent bg-accent font-medium text-accent-ink"
                  : "border-line text-ink-muted hover:border-line-strong hover:text-ink"
              }`}
            >
              {formatCountry(locale, code) ?? code}{" "}
              <span className="tabular-nums opacity-70">{count}</span>
            </Link>
          ))}
        </nav>
      )}

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
