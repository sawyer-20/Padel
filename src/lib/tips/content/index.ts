import type { Locale } from "@/i18n/routing";
import type { TipContent } from "../types";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { pt } from "./pt";

export const tipContentByLocale: Record<Locale, Record<string, TipContent>> = {
  pt,
  en,
  es,
  fr,
  de,
};
