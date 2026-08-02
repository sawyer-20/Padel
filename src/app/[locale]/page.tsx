import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getHomeData } from "@/lib/home/get-home-data";
import type { RankingEntry } from "@/lib/padel-api/schemas";
import { staticPageMetadata, type LocaleParams } from "@/lib/seo/page-metadata";

// Dados vivos — nunca pré-gerados no build (mesmo padrão de Rankings/Torneios/Notícias).
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  // absoluteTitle: o título da entrada já contém a marca, não deve levar sufixo.
  return staticPageMetadata(locale, "home", "/", { absoluteTitle: true });
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
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase text-neutral-500">{heading}</h4>
      <ol className="flex flex-col gap-1 text-sm">
        {entries.map((entry) => (
          <li key={entry.playerId} className="flex justify-between gap-2">
            <span>
              <span className="text-neutral-500">
                {entry.ranking.masked ? maskedLabel : entry.ranking.value}.
              </span>{" "}
              <Link href={`/players/${entry.playerId}`} className="underline">
                {entry.name}
              </Link>
            </span>
            <span className="text-neutral-500">
              {entry.points.masked ? maskedLabel : entry.points.value}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("common.home");
  const tRankings = await getTranslations("rankings");

  const data = await getHomeData();
  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });

  return (
    <div className="flex flex-col gap-8">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{t("intro")}</p>

      <section>
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <h3 className="font-medium">{t("nextTournament")}</h3>
          <Link href="/tournaments" className="text-xs underline">
            {t("seeAll")}
          </Link>
        </div>

        {data.tournamentFailed && <p className="text-sm text-neutral-500">{t("sectionUnavailable")}</p>}

        {!data.tournamentFailed && !data.nextTournament && (
          <p className="text-sm text-neutral-500">{t("noTournament")}</p>
        )}

        {data.nextTournament && (
          <div className="rounded border border-neutral-200 p-4 text-sm dark:border-neutral-800">
            <Link href={`/tournaments/${data.nextTournament.id}`} className="font-medium underline">
              {data.nextTournament.name}
            </Link>
            <p className="mt-1 text-xs text-neutral-500">
              {[data.nextTournament.location, data.nextTournament.country].filter(Boolean).join(", ")}
              {" · "}
              {data.nextTournament.startDate} – {data.nextTournament.endDate}
            </p>
          </div>
        )}
      </section>

      <section>
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <h3 className="font-medium">{t("topRankings")}</h3>
          <Link href="/rankings" className="text-xs underline">
            {t("seeAll")}
          </Link>
        </div>

        {data.rankingsFailed && <p className="text-sm text-neutral-500">{t("sectionUnavailable")}</p>}

        {!data.rankingsFailed && (
          <div className="grid gap-6 sm:grid-cols-2">
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
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <h3 className="font-medium">{t("latestNews")}</h3>
          <Link href="/news" className="text-xs underline">
            {t("seeAll")}
          </Link>
        </div>

        {data.newsFailed && <p className="text-sm text-neutral-500">{t("sectionUnavailable")}</p>}

        {!data.newsFailed && (
          <ul className="flex flex-col gap-3">
            {data.news.map((item) => (
              <li key={item.id} className="text-sm">
                <a href={item.url} target="_blank" rel="noreferrer" className="underline">
                  {item.title}
                </a>
                <p className="mt-1 text-xs text-neutral-500">
                  {item.sourceName}
                  {item.publishedAt && <> · {dateFormatter.format(new Date(item.publishedAt))}</>}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
