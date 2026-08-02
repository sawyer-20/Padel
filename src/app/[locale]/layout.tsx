import type { ReactNode } from "react";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { SiteHeader, type NavItem } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations("common");

  const navItems: NavItem[] = [
    { href: "/", label: t("nav.home") },
    { href: "/rankings", label: t("nav.rankings") },
    { href: "/tournaments", label: t("nav.tournaments") },
    { href: "/rules", label: t("nav.rules") },
    { href: "/training", label: t("nav.training") },
    { href: "/news", label: t("nav.news") },
    { href: "/settings", label: t("nav.settings") },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Primeiro elemento focável da página: quem navega por teclado salta as
          sete ligações da navegação em vez de as percorrer em cada página. */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
      >
        {t("skipToContent")}
      </a>

      <SiteHeader locale={locale} brand={t("appName")} items={navItems} navLabel={t("nav.label")} />

      <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 pb-16 sm:px-6">
        {children}
      </main>

      <SiteFooter locale={locale as Locale} />
    </div>
  );
}
