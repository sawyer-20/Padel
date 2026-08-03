import type { Locale } from "@/i18n/routing";
import type { FaqContent } from "../types";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { pt } from "./pt";

export const faqContentByLocale: Record<Locale, Record<string, FaqContent>> = {
  pt,
  en,
  es,
  fr,
  de,
};
