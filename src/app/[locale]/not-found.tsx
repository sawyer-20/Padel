import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

/**
 * O 404 do sítio.
 *
 * Sem isto, um endereço errado caía no ecrã por omissão do Next: em inglês,
 * sem navegação e sem marca — em qualquer um dos cinco idiomas. Com cinco
 * locales e slugs de conteúdo, enganos no endereço são inevitáveis.
 *
 * Oferece dois caminhos em vez de um beco: voltar à entrada, ou pesquisar.
 */
export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations("common.notFound");

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-16 text-center">
      <p className="font-display text-6xl font-bold tracking-tight text-accent">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 text-ink-muted">{t("description")}</p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-accent px-5 py-2.5 font-medium text-accent-ink no-underline"
        >
          {t("backHome")}
        </Link>
        {/* Form nativo, como no cabeçalho: funciona sem JavaScript. */}
        <form action={`/${locale}/search`} method="get" role="search" className="flex gap-2">
          <label htmlFor="notfound-search" className="sr-only">
            {t("searchLabel")}
          </label>
          <input
            id="notfound-search"
            type="search"
            name="q"
            placeholder={t("searchPlaceholder")}
            className="min-w-0 rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint"
          />
          <button
            type="submit"
            className="rounded-lg border border-line-strong px-4 py-2.5 text-sm font-medium text-ink"
          >
            {t("searchSubmit")}
          </button>
        </form>
      </div>
    </div>
  );
}
