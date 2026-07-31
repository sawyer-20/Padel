import type { Locale } from "@/i18n/routing";
import { ruleContentByLocale } from "./content";
import { getRuleMeta, rules } from "./rules";
import type { RuleContent, RuleMeta } from "./types";

export { rules, getRuleMeta };

export function getRuleContent(slug: string, locale: Locale): RuleContent | null {
  return ruleContentByLocale[locale][slug] ?? null;
}

export function getRule(slug: string, locale: Locale): { meta: RuleMeta; content: RuleContent } | null {
  const meta = getRuleMeta(slug);
  const content = getRuleContent(slug, locale);
  if (!meta || !content) return null;
  return { meta, content };
}

// Requisito do PROJECT.md §5.1/§9: conteúdo "machine"/"draft" tem de mostrar aviso de
// revisão pendente. Só "reviewed" fica sem aviso.
export function needsReviewNotice(status: RuleContent["status"]): boolean {
  return status !== "reviewed";
}
