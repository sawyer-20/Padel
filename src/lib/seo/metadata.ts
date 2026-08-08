import type { Metadata } from "next";
import { defaultLocale, locales, type Locale } from "@/i18n/routing";
import { siteName, siteUrl } from "./site";

/**
 * Locales no formato que o OpenGraph exige (language_TERRITORY), que não é o
 * mesmo dos segmentos de URL.
 */
const OG_LOCALES: Record<Locale, string> = {
  pt: "pt_PT",
  en: "en_GB",
  es: "es_ES",
  fr: "fr_FR",
  de: "de_DE",
};

/** `/rankings` + `pt` → `/pt/rankings`; `/` + `pt` → `/pt`. */
export function localizedPath(locale: Locale, path: string): string {
  const suffix = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${suffix}`;
}

export function absoluteUrl(locale: Locale, path: string): string {
  return `${siteUrl}${localizedPath(locale, path)}`;
}

/**
 * Mapa hreflang completo para um caminho: as cinco versões mais o x-default.
 *
 * Sem isto, as cinco traduções da mesma página competem entre si nos
 * resultados de pesquisa em vez de se reforçarem.
 */
export function alternateLanguages(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = localizedPath(locale, path);
  }
  languages["x-default"] = localizedPath(defaultLocale, path);
  return languages;
}

/**
 * Igual à anterior mas com URLs absolutos.
 *
 * O `metadataBase` só resolve caminhos relativos nas tags do <head>. No
 * sitemap.xml não há base nenhuma, e a especificação exige URLs completos —
 * um href relativo ali é simplesmente ignorado pelos motores de pesquisa.
 */
export function alternateLanguageUrls(path: string): Record<string, string> {
  return Object.fromEntries(
    Object.entries(alternateLanguages(path)).map(([key, value]) => [key, `${siteUrl}${value}`]),
  );
}

export type PageMetadataInput = {
  locale: Locale;
  /** Caminho sem prefixo de idioma, começado por "/". */
  path: string;
  title: string;
  description: string;
  /** true na página inicial: o título já contém a marca, não deve ser sufixado. */
  absoluteTitle?: boolean;
  /** Páginas utilitárias (definições) ficam fora do índice. */
  noIndex?: boolean;
};

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
  noIndex = false,
}: PageMetadataInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: localizedPath(locale, path),
      languages: alternateLanguages(path),
    },
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url: localizedPath(locale, path),
      locale: OG_LOCALES[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
      // Tem de ser declarada aqui, apesar de existir um ficheiro
      // `[locale]/opengraph-image.tsx`: o Next injeta a imagem por convenção no
      // segmento onde o ficheiro está, mas um `openGraph` definido numa página
      // filha SUBSTITUI o do pai por inteiro em vez de o completar — e todas as
      // nossas páginas definem um. Sem esta linha, o cartão de partilha ficava
      // vazio em todo o sítio menos na raiz de cada idioma.
      images: [
        {
          url: `${siteUrl}/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
