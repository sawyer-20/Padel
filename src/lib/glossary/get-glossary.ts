import type { Locale } from "@/i18n/routing";
import { glossaryContentByLocale } from "./content";
import { getGlossaryTermMeta, glossary } from "./glossary";
import type { GlossaryContent, GlossaryTerm } from "./types";

export { glossary, getGlossaryTermMeta };

export function getGlossaryContent(slug: string, locale: Locale): GlossaryContent | null {
  return glossaryContentByLocale[locale][slug] ?? null;
}

export function getGlossaryEntry(
  slug: string,
  locale: Locale,
): { meta: GlossaryTerm; content: GlossaryContent } | null {
  const meta = getGlossaryTermMeta(slug);
  const content = getGlossaryContent(slug, locale);
  if (!meta || !content) return null;
  return { meta, content };
}
