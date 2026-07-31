import type { Locale } from "@/i18n/routing";
import { situationContentByLocale } from "./content";
import { getSituationMeta, situations } from "./situations";
import type { Situation, SituationContent } from "./types";

export { situations, getSituationMeta };

export function getSituationContent(slug: string, locale: Locale): SituationContent | null {
  return situationContentByLocale[locale][slug] ?? null;
}

export function getSituation(slug: string, locale: Locale): { meta: Situation; content: SituationContent } | null {
  const meta = getSituationMeta(slug);
  const content = getSituationContent(slug, locale);
  if (!meta || !content) return null;
  return { meta, content };
}
