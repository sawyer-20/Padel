import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/routing";
import { glossary } from "@/lib/glossary/glossary";
import { glossaryContentByLocale } from "@/lib/glossary/content";

describe("paridade de conteúdo do glossário", () => {
  for (const entry of glossary) {
    for (const locale of locales) {
      it(`"${entry.slug}" tem termo e definição em "${locale}"`, () => {
        const content = glossaryContentByLocale[locale][entry.slug];

        expect(content, `falta conteúdo para ${entry.slug}/${locale}`).toBeDefined();
        expect(content?.term.trim().length ?? 0).toBeGreaterThan(0);
        expect(content?.definitionMd.trim().length ?? 0).toBeGreaterThan(0);
      });
    }
  }
});
