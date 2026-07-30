import type { ReactNode } from "react";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

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

  // Este layout re-renderiza a cada troca de idioma (ao contrário do root layout,
  // ver StateProbe/shell-messages), por isso pode usar useTranslations/Link do next-intl
  // diretamente sem ficar com texto desatualizado.
  const t = await getTranslations("common.nav");

  return (
    <>
      <nav className="flex gap-4 border-b border-neutral-200 pb-4 text-sm dark:border-neutral-800">
        <Link href="/">{t("home")}</Link>
        <Link href="/rankings">{t("rankings")}</Link>
        <Link href="/tournaments">{t("tournaments")}</Link>
      </nav>
      <div className="mt-4">{children}</div>
    </>
  );
}
