import type { Locale } from "@/i18n/routing";
import type { GlossaryContent } from "../types";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { pt } from "./pt";

export const glossaryContentByLocale: Record<Locale, Record<string, GlossaryContent>> = {
  pt,
  en,
  es,
  fr,
  de,
};
