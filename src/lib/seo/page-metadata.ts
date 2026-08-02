import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "./metadata";

/** Todas as páginas vivem sob [locale], por isso recebem sempre este parâmetro. */
export type LocaleParams = { params: Promise<{ locale: string }> };

/**
 * Metadados de uma página cujo título e descrição são fixos e vivem no
 * namespace `seo`. As páginas com título dinâmico (torneio, jogador, regra)
 * chamam buildPageMetadata diretamente.
 */
export async function staticPageMetadata(
  localeParam: string,
  key: string,
  path: string,
  options: { absoluteTitle?: boolean; noIndex?: boolean } = {},
): Promise<Metadata> {
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: "seo" });

  return buildPageMetadata({
    locale,
    path,
    title: t(`${key}.title`),
    description: t(`${key}.description`),
    ...options,
  });
}
