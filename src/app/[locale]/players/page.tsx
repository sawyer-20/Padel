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

function PlayerRow({ player, maskedLabel }: { player: PlayerProfile; maskedLabel: string }) {
  const position = player.ranking.masked ? maskedLabel : player.ranking.value;

  return (
    <li>
      <Link
        href={`/players/${player.id}`}
        className="flex items-center gap-3 border-b border-line px-4 py-2.5 text-sm no-underline last:border-b-0 hover:bg-raised"
      >
        <span className="w-10 shrink-0 text-right font-medium tabular-nums text-ink-muted">
          {position ?? "—"}
        </span>
        {player.photoUrl ? (
          <Image
            src={player.photoUrl}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="h-8 w-8 shrink-0 rounded-full bg-raised" aria-hidden="true" />
        )}
        <span className="min-w-0 flex-1 truncate font-medium text-ink">{player.name}</span>
        <span className="shrink-0 tabular-nums text-ink-muted">
          {player.points.masked ? maskedLabel : player.points.value}
        </span>
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
    <div className="mx-auto max-w-3xl">
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

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { heading: t("men"), list: men },
              { heading: t("women"), list: women },
            ]
              .filter((group) => group.list.length > 0)
              .map((group) => (
                <section
                  key={group.heading}
                  className="overflow-hidden rounded-lg border border-line bg-surface"
                >
                  <h2 className="border-b border-line px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink-faint">
                    {group.heading}
                  </h2>
                  <ul>
                    {group.list.map((player) => (
                      <PlayerRow key={player.id} player={player} maskedLabel={t("maskedValue")} />
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
