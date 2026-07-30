"use client";

import { useParams } from "next/navigation";
import { defaultLocale, locales, type Locale } from "@/i18n/routing";

function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export function useCurrentLocale(): Locale {
  const params = useParams();
  return isLocale(params.locale) ? params.locale : defaultLocale;
}
