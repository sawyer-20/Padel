import type { Locale } from "@/i18n/routing";
import type { RuleContent } from "../types";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { pt } from "./pt";

export const ruleContentByLocale: Record<Locale, Record<string, RuleContent>> = {
  pt,
  en,
  es,
  fr,
  de,
};
