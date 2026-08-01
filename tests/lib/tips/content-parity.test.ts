import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/routing";
import { tips } from "@/lib/tips/tips";
import { tipContentByLocale } from "@/lib/tips/content";
import { glossary } from "@/lib/glossary/glossary";

describe("paridade de conteúdo das dicas", () => {
  for (const tip of tips) {
    for (const locale of locales) {
      it(`"${tip.slug}" tem título e corpo em "${locale}"`, () => {
        const content = tipContentByLocale[locale][tip.slug];

        expect(content, `falta conteúdo para ${tip.slug}/${locale}`).toBeDefined();
        expect(content?.title.trim().length ?? 0).toBeGreaterThan(0);
        expect(content?.bodyMd.trim().length ?? 0).toBeGreaterThan(0);
      });
    }
  }
});

describe("ligações entre dicas e glossário", () => {
  it("todo o relatedTermSlug aponta para um termo que existe mesmo", () => {
    const knownTerms = new Set(glossary.map((term) => term.slug));

    for (const tip of tips) {
      if (tip.relatedTermSlug) {
        expect(knownTerms, `dica "${tip.slug}" aponta para um termo inexistente`).toContain(
          tip.relatedTermSlug,
        );
      }
    }
  });
});
