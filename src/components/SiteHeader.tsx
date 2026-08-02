"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

export type NavItem = { href: string; label: string };

/**
 * Remove o prefixo de idioma para que a comparação de rota ativa funcione
 * igual nos cinco idiomas: `/pt/rankings` e `/de/rankings` são a mesma secção.
 */
function sectionPath(pathname: string, locale: string): string {
  const prefix = `/${locale}`;
  if (pathname === prefix) return "/";
  return pathname.startsWith(`${prefix}/`) ? pathname.slice(prefix.length) : pathname;
}

function isActive(section: string, href: string): boolean {
  if (href === "/") return section === "/";
  // A ficha de uma regra mantém "Regras" ativo; por isso o prefixo, e não a igualdade.
  return section === href || section.startsWith(`${href}/`);
}

export function SiteHeader({
  locale,
  brand,
  items,
  navLabel,
}: {
  locale: string;
  brand: string;
  items: NavItem[];
  navLabel: string;
}) {
  const pathname = usePathname();
  const section = sectionPath(pathname, locale);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href={`/${locale}`}
          className="text-base font-semibold tracking-tight text-ink no-underline"
        >
          {brand}
        </Link>
        <LocaleSwitcher />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Rola na horizontal em ecrãs estreitos em vez de partir para duas linhas —
            sete secções nunca cabem lado a lado num telemóvel. */}
        <nav aria-label={navLabel} className="-mb-px flex gap-1 overflow-x-auto">
          {items.map((item) => {
            const active = isActive(section, item.href);
            return (
              <Link
                key={item.href}
                href={`/${locale}${item.href === "/" ? "" : item.href}`}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap border-b-2 px-3 py-2.5 text-sm no-underline transition-colors ${
                  active
                    ? "border-accent font-semibold text-accent"
                    : "border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
