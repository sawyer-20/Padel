import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { padelApiSource } from "@/lib/data-sources/padel-api-source";
import type { PlayerProfile } from "@/lib/padel-api/schemas";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { formatCountry } from "@/lib/format/labels";
import { DEFAULT_PLAYER_COUNTRY, PLAYER_COUNTRIES, isPlayerCountry } from "@/lib/players/countries";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { LocaleParams } from "@/lib/seo/page-metadata";

// Dados vivos — nunca pré-gerados no build (regra §1.1 do PROJECT.md).
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
  searchParams,
}: LocaleParams & { searchParams: Promise<{ country?: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { country: raw } = await searchParams;
  const country = isPlayerCountry(raw) ? raw : DEFAULT_PLAYER_COUNTRY;
  const t = await getTranslations({ locale, namespace: "seo" });
  const countryName = formatCountry(locale, country) ?? country;

  return buildPageMetadata({
    locale: locale as Locale,
    // Canonical sempre em /players: as variantes por país são vistas filtradas
    // do mesmo conteúdo, não páginas independentes.
    path: "/players",
    title: t("players.title", { country: countryName }),
    description: t("players.description", { country: countryName }),
  });
}

/** Quantos rostos entram no destaque, no máximo. */
const FEATURED_COUNT = 6;

/**
 * Cartão com retrato, para o destaque.
 *
 * Só é usado com atletas que **têm** fotografia. A primeira versão desta página
 * punha os 121 jogadores em cartões destes, e o resultado em produção foram 112
 * quadrados cinzentos vazios: das 121 fichas portuguesas, só 9 trazem retrato.
 * Cartão com retrato serve para uma mão-cheia de rostos, não para uma lista.
 */
function FeaturedPlayer({ player, maskedLabel }: { player: PlayerProfile; maskedLabel: string }) {
  return (
    <li>
      <Link
        href={`/players/${player.id}`}
        className="group block overflow-hidden rounded-lg border border-line bg-surface no-underline transition-colors hover:border-accent"
      >
        <div className="relative aspect-square bg-raised">
          {player.photoUrl && (
            <Image
              src={player.photoUrl}
              alt=""
              fill
              sizes="(min-width: 640px) 16vw, 45vw"
              className="object-cover"
            />
          )}
          <span className="absolute left-2 top-2 rounded bg-ground/85 px-1.5 py-0.5 font-mono text-[0.65rem] text-accent">
            {player.ranking.masked ? maskedLabel : `#${player.ranking.value}`}
          </span>
        </div>
        <div className="p-2.5">
          <span className="block truncate font-display text-sm font-bold uppercase leading-tight tracking-tight text-ink transition-colors group-hover:text-accent">
            {player.name}
          </span>
        </div>
      </Link>
    </li>
  );
}

/**
 * Linha de tabela, para a lista completa.
 *
 * 121 registos sempre pediram uma tabela. Densa de propósito: quem percorre um
 * ranking quer comparar posições e pontos de relance, não olhar para retratos.
 */
function PlayerRow({ player, maskedLabel }: { player: PlayerProfile; maskedLabel: string }) {
  return (
    <tr className="border-b border-line last:border-b-0 hover:bg-raised">
      <td className="w-14 py-2 pl-3 pr-2 text-right font-mono text-xs text-ink-muted">
        {player.ranking.masked ? maskedLabel : player.ranking.value}
      </td>
      <td className="py-2 pr-2">
        <Link
          href={`/players/${player.id}`}
          className="font-medium text-ink no-underline hover:text-accent"
        >
          {player.name}
        </Link>
      </td>
      <td className="w-24 py-2 pr-3 text-right font-mono text-xs tabular-nums text-ink-muted">
        {player.points.masked ? maskedLabel : player.points.value}
      </td>
    </tr>
  );
}

export default async function PlayersByCountryPage({
  searchParams,
}: {
  searchParams: Promise<{ country?: string }>;
}) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("rankings");
  const tCommon = await getTranslations("common");
  const { country: raw } = await searchParams;
  const country = isPlayerCountry(raw) ? raw : DEFAULT_PLAYER_COUNTRY;
  const countryName = formatCountry(locale, country) ?? country;

  let players: PlayerProfile[] = [];
  let total = 0;
  let errored = false;

  try {
    const result = await padelApiSource.getPlayersByCountry({ country });
    players = result.players;
    total = result.total;
  } catch (error) {
    console.error("Falha ao carregar jogadores por país:", error);
    errored = true;
  }

  // Separados por categoria: um #8 feminino e um #8 masculino são posições em
  // rankings diferentes, e misturá-los numa lista ordenada seria enganador.
  const men = players.filter((player) => player.category === "men");
  const women = players.filter((player) => player.category === "women");

  // Só entram no destaque os que têm mesmo retrato, e desses os mais bem
  // classificados. Um cartão sem fotografia é um quadrado cinzento — vale menos
  // do que uma linha de tabela.
  const featured = players
    .filter((player) => player.photoUrl !== null && !player.ranking.masked)
    .sort((a, b) => (a.ranking.value ?? Infinity) - (b.ranking.value ?? Infinity))
    .slice(0, FEATURED_COUNT);

  return (
    <div className="mx-auto max-w-5xl">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: tCommon("nav.home"), path: "/" },
          { label: tCommon("nav.rankings"), path: "/rankings" },
          { label: t("byCountry.breadcrumb") },
        ]}
      />

      <PageHeader
        title={t("byCountry.title", { country: countryName })}
        lead={t("byCountry.intro")}
      />

      <nav aria-label={t("byCountry.selectLabel")} className="mb-6 flex flex-wrap gap-1.5">
        {PLAYER_COUNTRIES.map((code) => (
          <Link
            key={code}
            href={`/players?country=${code}`}
            scroll={false}
            aria-current={code === country ? "page" : undefined}
            className={`rounded-md border px-2.5 py-1 text-sm no-underline ${
              code === country
                ? "border-accent bg-accent font-medium text-accent-ink"
                : "border-line text-ink-muted hover:border-line-strong hover:text-ink"
            }`}
          >
            {formatCountry(locale, code) ?? code}
          </Link>
        ))}
      </nav>

      {errored && <p role="alert">{t("error")}</p>}

      {!errored && players.length === 0 && <p className="text-ink-muted">{t("empty")}</p>}

      {!errored && players.length > 0 && (
        <>
          <p className="mb-4 text-sm text-ink-faint">
            {t("byCountry.showing", { shown: players.length, total })}
          </p>

          {/* Destaque: só quem tem retrato, e os mais bem classificados desses.
              Dos 121 portugueses apenas 9 trazem fotografia, por isso o destaque
              é uma mão-cheia — e a lista completa vive na tabela abaixo. */}
          {featured.length > 0 && (
            <section className="mb-8">
              <h2 className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">
                <span className="shrink-0">{t("byCountry.featured")}</span>
                <span aria-hidden="true" className="h-px flex-1 bg-line" />
              </h2>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-6">
                {featured.map((player) => (
                  <FeaturedPlayer key={player.id} player={player} maskedLabel={t("maskedValue")} />
                ))}
              </ul>
            </section>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { heading: t("men"), list: men },
              { heading: t("women"), list: women },
            ]
              .filter((group) => group.list.length > 0)
              .map((group) => (
                <section key={group.heading}>
                  <h2 className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">
                    <span className="shrink-0">{group.heading}</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-line" />
                  </h2>
                  <div className="overflow-hidden rounded-lg border border-line bg-surface">
                    <table className="w-full text-sm">
                      <caption className="sr-only">
                        {t("byCountry.title", { country: countryName })} — {group.heading}
                      </caption>
                      <tbody>
                        {group.list.map((player) => (
                          <PlayerRow
                            key={player.id}
                            player={player}
                            maskedLabel={t("maskedValue")}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
