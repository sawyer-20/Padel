import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/routing";
import { faq } from "@/lib/faq/faq";
import { faqContentByLocale } from "@/lib/faq/content";
import { rules } from "@/lib/rules/rules";
import { glossary } from "@/lib/glossary/glossary";

describe("paridade de conteúdo das FAQ", () => {
  for (const entry of faq) {
    for (const locale of locales) {
      it(`"${entry.slug}" tem pergunta e resposta em "${locale}"`, () => {
        const content = faqContentByLocale[locale][entry.slug];

        expect(content, `falta conteúdo para ${entry.slug}/${locale}`).toBeDefined();
        expect(content?.question.trim().length ?? 0).toBeGreaterThan(0);
        expect(content?.answerMd.trim().length ?? 0).toBeGreaterThan(0);
      });
    }
  }
});

describe("ligações internas das FAQ", () => {
  // Uma ligação interna partida leva a um 404 e é invisível no build. Estes dois
  // testes são a única coisa que impede um slug mal escrito de chegar a produção.
  const ruleSlugs = new Set(rules.map((rule) => rule.slug));
  const termSlugs = new Set(glossary.map((term) => term.slug));

  for (const entry of faq) {
    if (entry.relatedRuleSlug) {
      it(`"${entry.slug}" aponta para uma regra que existe`, () => {
        expect(ruleSlugs.has(entry.relatedRuleSlug as string)).toBe(true);
      });
    }

    if (entry.relatedTermSlug) {
      it(`"${entry.slug}" aponta para um termo do glossário que existe`, () => {
        expect(termSlugs.has(entry.relatedTermSlug as string)).toBe(true);
      });
    }
  }
});
