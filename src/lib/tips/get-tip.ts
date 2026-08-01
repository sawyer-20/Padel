import type { Locale } from "@/i18n/routing";
import { tipContentByLocale } from "./content";
import { getTipMeta, tips } from "./tips";
import type { Tip, TipContent } from "./types";

export { tips, getTipMeta };

export function getTipContent(slug: string, locale: Locale): TipContent | null {
  return tipContentByLocale[locale][slug] ?? null;
}

export function getTip(slug: string, locale: Locale): { meta: Tip; content: TipContent } | null {
  const meta = getTipMeta(slug);
  const content = getTipContent(slug, locale);
  if (!meta || !content) return null;
  return { meta, content };
}
