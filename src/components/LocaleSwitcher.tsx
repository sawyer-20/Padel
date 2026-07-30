"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { routing } from "@/i18n/routing";
import { useCurrentLocale } from "./useCurrentLocale";
import { shellMessages } from "./shell-messages";

export function LocaleSwitcher() {
  const locale = useCurrentLocale();
  const t = shellMessages[locale].languageSwitcher;
  const router = useRouter();
  // Hooks de "@/i18n/navigation" (next-intl) dependem de useLocale(), que fica desatualizado
  // em componentes persistentes fora do segmento [locale] (ver StateProbe/shell-messages).
  // Por isso usamos os hooks nativos do Next.js, que refletem sempre a URL atual.
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onChange(nextLocale: string) {
    const currentPrefix = `/${locale}`;
    const rest = pathname === currentPrefix ? "" : pathname.slice(currentPrefix.length);
    const query = searchParams.toString();
    router.replace(`/${nextLocale}${rest}${query ? `?${query}` : ""}`);
  }

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="sr-only">{t.label}</span>
      <select
        value={locale}
        onChange={(event) => onChange(event.target.value)}
        className="rounded border border-neutral-300 bg-transparent px-2 py-1 dark:border-neutral-700"
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {loc.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
