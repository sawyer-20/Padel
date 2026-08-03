import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { rules } from "@/lib/rules/rules";
import { alternateLanguageUrls, absoluteUrl } from "@/lib/seo/metadata";

/**
 * Caminhos sem prefixo de idioma. Cada um entra no sitemap uma vez por idioma,
 * com o bloco de alternates a declarar as outras quatro versões.
 *
 * As fichas de jogador e de torneio ficam de fora de propósito: dependem da
 * Padel API e não podem ser enumeradas no build sem um token válido (regra
 * §1.1 do PROJECT.md). Continuam a ser descobertas pelas ligações internas.
 */
const STATIC_PATHS = [
  "/",
  "/rankings",
  "/tournaments",
  "/faq",
  "/rules",
  "/rules/situations",
  "/training",
  "/training/tips",
  "/training/glossary",
  "/news",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = [...STATIC_PATHS, ...rules.map((rule) => `/rules/${rule.slug}`)];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified,
      alternates: { languages: alternateLanguageUrls(path) },
    })),
  );
}
