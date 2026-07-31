import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/routing";
import { situations } from "@/lib/situations/situations";
import { situationContentByLocale } from "@/lib/situations/content";

describe("paridade de conteúdo das situações", () => {
  for (const situation of situations) {
    for (const locale of locales) {
      it(`"${situation.slug}" tem pergunta e resposta em "${locale}"`, () => {
        const content = situationContentByLocale[locale][situation.slug];

        expect(content, `falta conteúdo para ${situation.slug}/${locale}`).toBeDefined();
        expect(content?.question.trim().length ?? 0).toBeGreaterThan(0);
        expect(content?.answerMd.trim().length ?? 0).toBeGreaterThan(0);
      });
    }
  }
});
