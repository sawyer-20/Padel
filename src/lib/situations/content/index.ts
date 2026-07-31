import type { Locale } from "@/i18n/routing";
import type { SituationContent } from "../types";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { pt } from "./pt";

export const situationContentByLocale: Record<Locale, Record<string, SituationContent>> = {
  pt,
  en,
  es,
  fr,
  de,
};
