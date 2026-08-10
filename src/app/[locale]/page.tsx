import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getHomeData, HOME_COUNTRY } from "@/lib/home/get-home-data";
import { formatCountry } from "@/lib/format/labels";
import type { PlayerProfile, RankingEntry } from "@/lib/padel-api/schemas";
import { staticPageMetadata, type LocaleParams } from "@/lib/seo/page-metadata";
import { Badge, Panel, SectionHeading, SectionNotice } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { websiteSchema } from "@/lib/seo/schema";

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
  const tSeo = await getTranslations("seo");

  const data = await getHomeData();
  const homeCountryName = formatCountry(locale, HOME_COUNTRY) ?? HOME_COUNTRY;
  const dateFormatter = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" });
  const newsDateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });

  const today = new Date().toISOString().slice(0, 10);
  const tournament = data.nextTournament;

  // O melhor classificado do país, para o quadro do hero. Calculado aqui e não
  // assumido da ordem da lista: `pickHomeCountryPlayers` escolhe seis nomes por
  // outros critérios, e o primeiro deles não é necessariamente o mais bem
  // classificado.
  const bestRanked = data.country.players.reduce<PlayerProfile | null>((best, player) => {
    if (player.ranking.masked || player.ranking.value === null) return best;
    if (best === null || best.ranking.value === null) return player;
    return player.ranking.value < best.ranking.value ? player : best;
  }, null);
  const isOngoing =
    tournament !== null && tournament.startDate <= today && today <= tournament.endDate;

  return (
    <div className="flex flex-col gap-10">
      <JsonLd data={websiteSchema(locale, tSeo("home.description"))} />

      {/*
        Hero: a caixa de vidro.

        O padel é o único desporto de raquete jogado dentro de uma caixa em que
        as paredes estão em jogo, e a rede parte essa caixa em duas metades. É
        essa a estrutura do bloco: duas metades e uma rede a tracejado entre
        elas, com o mesmo traço da rede no diagrama do campo. A linha não é
        ornamento — é a única divisão que existe num campo de padel.

        O que estava aqui antes eram dois números grandes em acento com rótulos
        pequenos por baixo. Informação certa, hierarquia errada: dois totais
        abstratos ocupavam o lugar de honra e a prova concreta — o que se está
        mesmo a passar em Portugal — não aparecia. Os totais continuam, agora
        numa linha de dados discreta; o destaque passa para o torneio e o
        atleta reais.

        Saiu também o campo fantasma que estava por trás do texto. Com a rede a
        fazer o trabalho de forma mais exata, o desenho inteiro era um acessório
        a mais.
      */}
      <section className="court-panel rounded-xl border border-line">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_1fr] lg:gap-0">
          <div className="lg:pr-10">
            {/* Os totais, rebaixados a legenda. Em mono porque são dados, e o
                mono é a face que este sítio usa para dados — a mesma do artigo
                da FIP no índice das Regras. */}
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-faint">
              {[
                data.country.totalPlayers > 0
                  ? t("statPlayers", { country: homeCountryName, count: data.country.totalPlayers })
                  : null,
                data.tournamentCount > 0
                  ? t("statTournaments", { count: data.tournamentCount })
                  : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>

            <h1 className="mt-4 font-display text-6xl font-bold uppercase leading-[0.85] tracking-tight text-balance sm:text-7xl">
              {tCommon("appName")}
            </h1>
            <p className="mt-4 max-w-md text-lg leading-snug text-ink-muted text-balance">
              {t("intro")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/tournaments?country=${HOME_COUNTRY}`}
                className="rounded-lg bg-accent px-5 py-2.5 font-medium text-accent-ink no-underline"
              >
                {t("ctaTournaments", { country: homeCountryName })}
              </Link>
              <Link
                href="/players"
                className="rounded-lg border border-line-strong px-5 py-2.5 font-medium text-ink no-underline hover:border-accent hover:text-accent"
              >
                {t("ctaPlayers")}
              </Link>
            </div>
          </div>

          {/* A metade de lá da rede. Só existe se houver dados verdadeiros para
              lá pôr: com a API em baixo o hero fica-se pela metade esquerda, que
              se aguenta sozinha, em vez de mostrar uma moldura vazia. */}
          {(data.country.nextTournament || bestRanked) && (
            <div className="relative lg:pl-10">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -top-4 h-px border-t-2 border-dashed border-accent/35 lg:inset-x-auto lg:left-0 lg:top-0 lg:h-full lg:w-px lg:border-l-2 lg:border-t-0"
              />

              <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
                {t("countrySection", { country: homeCountryName })}
              </h2>

              <dl className="mt-4 flex flex-col gap-4">
                {data.country.nextTournament && (
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-ink-faint">
                      {t("countryNextTournament")}
                    </dt>
                    <dd className="mt-1">
                      <Link
                        href={`/tournaments/${data.country.nextTournament.id}`}
                        className="font-display text-2xl font-bold uppercase leading-none tracking-tight text-ink no-underline hover:text-accent"
                      >
                        {data.country.nextTournament.name}
                      </Link>
                      <p className="mt-1.5 font-mono text-xs text-ink-muted">
                        {data.country.nextTournament.location}
                        {" · "}
                        <time dateTime={data.country.nextTournament.startDate}>
                          {dateFormatter.format(new Date(data.country.nextTournament.startDate))}
                        </time>
                      </p>
                    </dd>
                  </div>
                )}

                {bestRanked && (
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-ink-faint">
                      {t("boardBestRanked")}
                    </dt>
                    <dd className="mt-1 flex items-baseline gap-3">
                      <span className="font-mono text-sm text-accent">
                        #{bestRanked.ranking.value}
                      </span>
                      <Link
                        href={`/players/${bestRanked.id}`}
                        className="font-display text-2xl font-bold uppercase leading-none tracking-tight text-ink no-underline hover:text-accent"
                      >
                        {bestRanked.name}
                      </Link>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>
      </section>

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

      {/* O que se passa em Portugal, antes do ranking mundial: é o que distingue
          este sítio de qualquer portal de padel internacional. */}
      {!data.country.failed && (data.country.nextTournament || data.country.players.length > 0) && (
        <section>
          <SectionHeading
            title={t("countrySection", { country: homeCountryName })}
            action={<SeeAll href="/players" label={t("seeAll")} />}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {data.country.nextTournament && (
              <Panel className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  {t("countryNextTournament")}
                </p>
                <Link
                  href={`/tournaments/${data.country.nextTournament.id}`}
                  className="mt-1.5 block font-semibold tracking-tight text-ink no-underline hover:text-accent"
                >
                  {data.country.nextTournament.name}
                </Link>
                <p className="mt-1 text-sm text-ink-muted">
                  {data.country.nextTournament.location}
                  {" · "}
                  <time dateTime={data.country.nextTournament.startDate}>
                    {dateFormatter.format(new Date(data.country.nextTournament.startDate))}
                  </time>
                </p>
              </Panel>
            )}

            {data.country.players.length > 0 && (
              <Panel className="overflow-hidden">
                <p className="border-b border-line px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  {t("countryPlayers", { total: data.country.totalPlayers })}
                </p>
                <ul className="divide-y divide-line">
                  {data.country.players.map((player) => (
                    <li key={player.id}>
                      <Link
                        href={`/players/${player.id}`}
                        className="flex items-center gap-3 px-4 py-2 text-sm no-underline"
                      >
                        <span className="w-8 shrink-0 text-right tabular-nums text-ink-faint">
                          {player.ranking.masked ? tRankings("maskedValue") : player.ranking.value}
                        </span>
                        {/* Fotos que a API já dava e não estavam a ser usadas
                            fora da ficha individual. São rostos reais — valem
                            mais do que qualquer imagem de banco. */}
                        {player.photoUrl ? (
                          <Image
                            src={player.photoUrl}
                            alt=""
                            width={28}
                            height={28}
                            className="h-7 w-7 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <span className="h-7 w-7 shrink-0 rounded-full bg-raised" aria-hidden="true" />
                        )}
                        <span className="min-w-0 flex-1 truncate text-ink">{player.name}</span>
                        <span className="shrink-0 text-xs text-ink-faint">
                          {tRankings(player.category === "women" ? "women" : "men")}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Panel>
            )}
          </div>
        </section>
      )}

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
