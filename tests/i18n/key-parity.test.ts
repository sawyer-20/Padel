import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { locales } from "../../src/i18n/routing";
import { namespaces } from "../../src/i18n/namespaces";

type MessageTree = { [key: string]: string | MessageTree };

function flattenKeys(tree: MessageTree, prefix = ""): string[] {
  return Object.entries(tree).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof value === "string" ? [path] : flattenKeys(value, path);
  });
}

function loadMessages(locale: string, namespace: string): MessageTree {
  const raw = readFileSync(
    new URL(`../../messages/${locale}/${namespace}.json`, import.meta.url),
    "utf-8",
  );
  return JSON.parse(raw) as MessageTree;
}

describe("paridade de chaves i18n", () => {
  for (const namespace of namespaces) {
    it(`namespace "${namespace}" tem as mesmas chaves nos ${locales.length} idiomas`, () => {
      const keysByLocale = locales.map((locale) => ({
        locale,
        keys: flattenKeys(loadMessages(locale, namespace)).sort(),
      }));

      const [reference, ...rest] = keysByLocale;
      if (!reference) {
        throw new Error("Nenhum locale configurado.");
      }

      for (const { locale, keys } of rest) {
        expect(keys, `${locale}/${namespace}.json diverge de ${reference.locale}/${namespace}.json`).toEqual(
          reference.keys,
        );
      }
    });
  }
});
