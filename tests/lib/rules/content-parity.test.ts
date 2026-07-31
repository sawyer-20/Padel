import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/routing";
import { rules } from "@/lib/rules/rules";
import { ruleContentByLocale } from "@/lib/rules/content";

describe("paridade de conteúdo das regras", () => {
  for (const rule of rules) {
    for (const locale of locales) {
      it(`"${rule.slug}" tem título e corpo em "${locale}"`, () => {
        const content = ruleContentByLocale[locale][rule.slug];

        expect(content, `falta conteúdo para ${rule.slug}/${locale}`).toBeDefined();
        expect(content?.title.trim().length ?? 0).toBeGreaterThan(0);
        expect(content?.bodyMd.trim().length ?? 0).toBeGreaterThan(0);
      });
    }
  }
});
