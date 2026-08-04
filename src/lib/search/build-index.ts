import type { Locale } from "@/i18n/routing";
import { rules } from "@/lib/rules/rules";
import { getRuleContent } from "@/lib/rules/get-rule";
import { situations, getSituationContent } from "@/lib/situations/get-situation";
import { glossary, getGlossaryContent } from "@/lib/glossary/get-glossary";
import { tips, getTipContent } from "@/lib/tips/get-tip";
import { faq, getFaqContent } from "@/lib/faq/get-faq";
import { stripMarkdown } from "@/lib/seo/excerpt";
import type { SearchDoc } from "./types";

/**
 * Índice de pesquisa sobre todo o conteúdo editorial de um idioma.
 *
 * É construído a partir dos mesmos módulos que alimentam as páginas, por isso
 * não há nada que possa ficar dessincronizado: uma regra nova entra na pesquisa
 * no momento em que entra no site.
 *
 * Fica de fora tudo o que vem da Padel API. Jogadores e torneios mudam a toda a
 * hora e uma pesquisa que dependesse deles falharia sempre que a API falhasse —
 * as duas coisas têm de continuar independentes.
 */
export function buildSearchIndex(locale: Locale): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const rule of rules) {
    const content = getRuleContent(rule.slug, locale);
    if (!content) continue;
    docs.push({
      id: `rule:${rule.slug}`,
      type: "rule",
      title: content.title,
      body: stripMarkdown(content.bodyMd),
      href: `/rules/${rule.slug}`,
    });
  }

  for (const situation of situations) {
    const content = getSituationContent(situation.slug, locale);
    if (!content) continue;
    docs.push({
      id: `situation:${situation.slug}`,
      type: "situation",
      title: content.question,
      body: stripMarkdown(content.answerMd),
      href: `/rules/situations#${situation.slug}`,
    });
  }

  for (const term of glossary) {
    const content = getGlossaryContent(term.slug, locale);
    if (!content) continue;
    docs.push({
      id: `term:${term.slug}`,
      type: "term",
      title: content.term,
      body: stripMarkdown(content.definitionMd),
      href: `/training/glossary#${term.slug}`,
    });
  }

  for (const tip of tips) {
    const content = getTipContent(tip.slug, locale);
    if (!content) continue;
    docs.push({
      id: `tip:${tip.slug}`,
      type: "tip",
      title: content.title,
      body: stripMarkdown(content.bodyMd),
      href: `/training/tips#${tip.slug}`,
    });
  }

  for (const entry of faq) {
    const content = getFaqContent(entry.slug, locale);
    if (!content) continue;
    docs.push({
      id: `faq:${entry.slug}`,
      type: "faq",
      title: content.question,
      body: stripMarkdown(content.answerMd),
      href: `/faq#${entry.slug}`,
    });
  }

  return docs;
}
