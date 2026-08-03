import type { Locale } from "@/i18n/routing";
import { faqContentByLocale } from "./content";
import { faq, getFaqMeta } from "./faq";
import type { FaqContent, FaqMeta } from "./types";

export { faq, getFaqMeta };

export function getFaqContent(slug: string, locale: Locale): FaqContent | null {
  return faqContentByLocale[locale][slug] ?? null;
}

export function getFaqEntry(
  slug: string,
  locale: Locale,
): { meta: FaqMeta; content: FaqContent } | null {
  const meta = getFaqMeta(slug);
  const content = getFaqContent(slug, locale);
  if (!meta || !content) return null;
  return { meta, content };
}
