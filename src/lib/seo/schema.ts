import type { Locale } from "@/i18n/routing";
import { siteName, siteUrl } from "./site";
import { absoluteUrl } from "./metadata";

/**
 * Construtores de Schema.org.
 *
 * Regra que atravessa este ficheiro: nada é declarado sem estar visível na
 * página. Marcação estruturada que descreve coisas que o utilizador não vê é
 * spam de dados estruturados, e é penalizada como tal.
 */

export type BreadcrumbItem = { label: string; path?: string };

export function breadcrumbSchema(locale: Locale, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      // O último degrau é a página atual e não leva `item`, conforme a
      // especificação do Google.
      ...(item.path ? { item: absoluteUrl(locale, item.path) } : {}),
    })),
  };
}

export function websiteSchema(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: absoluteUrl(locale, "/"),
    description,
    inLanguage: locale,
    publisher: { "@type": "Organization", name: siteName, url: siteUrl },
  };
}

export function articleSchema({
  locale,
  path,
  headline,
  description,
}: {
  locale: Locale;
  path: string;
  headline: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    inLanguage: locale,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(locale, path) },
    publisher: { "@type": "Organization", name: siteName, url: siteUrl },
    // Sem `author` nem `datePublished`: não temos autor identificado nem data
    // de publicação real, e inventá-los para agradar ao validador seria mentir.
  };
}

export type FaqEntry = { question: string; answer: string };

export function faqSchema(entries: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

export type GlossaryEntry = { term: string; definition: string };

export function definedTermSetSchema(locale: Locale, name: string, entries: GlossaryEntry[]) {
  const id = absoluteUrl(locale, "/training/glossary");

  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": id,
    name,
    inLanguage: locale,
    hasDefinedTerm: entries.map((entry) => ({
      "@type": "DefinedTerm",
      name: entry.term,
      description: entry.definition,
      inDefinedTermSet: id,
    })),
  };
}

export function sportsEventSchema({
  locale,
  path,
  name,
  startDate,
  endDate,
  location,
  country,
}: {
  locale: Locale;
  path: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string | null;
  country: string | null;
}) {
  const place =
    location || country
      ? {
          "@type": "Place",
          name: [location, country].filter(Boolean).join(", "),
          ...(country ? { address: { "@type": "PostalAddress", addressCountry: country } } : {}),
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name,
    startDate,
    endDate,
    sport: "Padel",
    url: absoluteUrl(locale, path),
    ...(place ? { location: place } : {}),
  };
}
