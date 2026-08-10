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

/**
 * Cartão de atleta, com a fotografia no tamanho que ela merece.
 *
 * As fotografias da API são quadradas de 1024 px e estavam a aparecer a 32 px.
 * Esta é a página onde vive o destaque por país, por isso é aqui que os rostos
 * têm de se ver. Mesmo cartão da montra da entrada — um só desenho para as
 * duas, em vez de dois parecidos.
 */
function PlayerCard({ player, maskedLabel }: { player: PlayerProfile; maskedLabel: string }) {
  const position = player.ranking.masked ? maskedLabel : `#${player.ranking.value}`;

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
              sizes="(min-width: 1024px) 16vw, (min-width: 640px) 24vw, 45vw"
              className="object-cover"
            />
          )}
          <span className="absolute left-2 top-2 rounded bg-ground/85 px-1.5 py-0.5 font-mono text-[0.65rem] text-accent">
            {position}
          </span>
        </div>
        <div className="p-2.5">
          <span className="block truncate font-display text-sm font-bold uppercase leading-tight tracking-tight text-ink transition-colors group-hover:text-accent">
            {player.name}
          </span>
          <span className="mt-0.5 block font-mono text-xs text-ink-faint">
            {player.points.masked ? maskedLabel : `${player.points.value} pts`}
          </span>
        </div>
      </Link>
    </li>
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

          {/* Empilhados e não lado a lado: com retratos, duas colunas de cartões
              a dividir a largura deixavam cada rosto do tamanho de um selo. */}
          <div className="flex flex-col gap-8">
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
                  <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                    {group.list.map((player) => (
                      <PlayerCard key={player.id} player={player} maskedLabel={t("maskedValue")} />
                    ))}
                  </ul>
                </section>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
