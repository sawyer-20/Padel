import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getHomeData } from "@/lib/home/get-home-data";
import type { RankingEntry } from "@/lib/padel-api/schemas";
import { staticPageMetadata, type LocaleParams } from "@/lib/seo/page-metadata";
import { PageHeader } from "@/components/PageHeader";
import { Badge, Panel, SectionHeading, SectionNotice } from "@/components/ui";

// Dados vivos — nunca pré-gerados no build (mesmo padrão de Rankings/Torneios/Notícias).
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  // absoluteTitle: o título da entrada já contém a marca, não deve levar sufixo.
  return staticPageMetadata(locale, "home", "/", { absoluteTitle: true });
}

function SeeAll({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-sm font-medium text-accent no-underline hover:underline">
      {label}
    </Link>
  );
}

function RankingColumn({
  heading,
  entries,
  maskedLabel,
}: {
  heading: string;
  entries: RankingEntry[];
  maskedLabel: string;
}) {
  return (
    <Panel className="overflow-hidden">
      <h3 className="border-b border-line px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink-faint">
        {heading}
      </h3>
      <ol className="divide-y divide-line">
        {entries.map((entry, index) => (
          <li key={entry.playerId} className="flex items-center gap-3 px-4 py-2.5 text-sm">
            <span
              className={`w-6 shrink-0 text-right tabular-nums ${
                index === 0 ? "font-semibold text-accent" : "text-ink-faint"
              }`}
            >
              {entry.ranking.masked ? maskedLabel : entry.ranking.value}
            </span>
            <Link
              href={`/players/${entry.playerId}`}
              className="min-w-0 flex-1 truncate text-ink no-underline hover:text-accent"
            >
              {entry.name}
            </Link>
            <span className="shrink-0 tabular-nums text-ink-muted">
              {entry.points.masked ? maskedLabel : entry.points.value}
            </span>
          </li>
        ))}
      </ol>
    </Panel>
  );
}

export default async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const tCommon = await getTranslations("common");
  const t = await getTranslations("common.home");
  const tRankings = await getTranslations("rankings");
  const tTournaments = await getTranslations("tournaments");

  const data = await getHomeData();
  const dateFormatter = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" });
  const newsDateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });

  const today = new Date().toISOString().slice(0, 10);
  const tournament = data.nextTournament;
  const isOngoing =
    tournament !== null && tournament.startDate <= today && today <= tournament.endDate;

  return (
    <div className="flex flex-col gap-10">
      <PageHeader title={tCommon("appName")} lead={t("intro")} />

      <section>
        <SectionHeading
          title={t("nextTournament")}
          action={<SeeAll href="/tournaments" label={t("seeAll")} />}
        />

        {data.tournamentFailed && <SectionNotice>{t("sectionUnavailable")}</SectionNotice>}

        {!data.tournamentFailed && !tournament && <SectionNotice>{t("noTournament")}</SectionNotice>}

        {tournament && (
          <Panel className="p-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <Link
                href={`/tournaments/${tournament.id}`}
                className="text-lg font-semibold tracking-tight text-ink no-underline hover:text-accent"
              >
                {tournament.name}
              </Link>
              <Badge tone={isOngoing ? "live" : "accent"}>
                {tTournaments(isOngoing ? "status.ongoing" : "status.upcoming")}
              </Badge>
            </div>
            <p className="mt-1.5 text-sm text-ink-muted">
              {[tournament.location, tournament.country].filter(Boolean).join(", ")}
              {" · "}
              <time dateTime={tournament.startDate}>
                {dateFormatter.format(new Date(tournament.startDate))}
              </time>
              {" – "}
              <time dateTime={tournament.endDate}>
                {dateFormatter.format(new Date(tournament.endDate))}
              </time>
            </p>
          </Panel>
        )}
      </section>

      <section>
        <SectionHeading
          title={t("topRankings")}
          action={<SeeAll href="/rankings" label={t("seeAll")} />}
        />

        {data.rankingsFailed && <SectionNotice>{t("sectionUnavailable")}</SectionNotice>}

        {!data.rankingsFailed && (
          <div className="grid gap-4 sm:grid-cols-2">
            {data.topMen.length > 0 && (
              <RankingColumn
                heading={t("men")}
                entries={data.topMen}
                maskedLabel={tRankings("maskedValue")}
              />
            )}
            {data.topWomen.length > 0 && (
              <RankingColumn
                heading={t("women")}
                entries={data.topWomen}
                maskedLabel={tRankings("maskedValue")}
              />
            )}
          </div>
        )}
      </section>

      <section>
        <SectionHeading title={t("latestNews")} action={<SeeAll href="/news" label={t("seeAll")} />} />

        {data.newsFailed && <SectionNotice>{t("sectionUnavailable")}</SectionNotice>}

        {!data.newsFailed && (
          <Panel className="divide-y divide-line overflow-hidden">
            {data.news.map((item) => (
              <article key={item.id} className="p-4">
                <h3 className="text-sm font-medium leading-snug">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink no-underline hover:text-accent"
                  >
                    {item.title}
                  </a>
                </h3>
                <p className="mt-1 text-xs text-ink-faint">
                  {item.sourceName}
                  {item.publishedAt && (
                    <>
                      {" · "}
                      <time dateTime={item.publishedAt}>
                        {newsDateFormatter.format(new Date(item.publishedAt))}
                      </time>
                    </>
                  )}
                </p>
              </article>
            ))}
          </Panel>
        )}
      </section>
    </div>
  );
}
