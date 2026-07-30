import { defineRouting } from "next-intl/routing";

export const locales = ["pt", "en", "es", "fr", "de"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  // "/" redireciona sempre para o locale por defeito (pt), sem deteção via Accept-Language.
  localeDetection: false,
});
