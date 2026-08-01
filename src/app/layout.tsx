import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ThemeScript } from "@/components/ThemeScript";
import "./globals.css";

export const metadata: Metadata = {
  title: "Padel Hub",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const t = await getTranslations("common");

  return (
    // suppressHydrationWarning: o ThemeScript altera a classe de <html> antes da
    // hidratação, por isso o servidor e o cliente divergem aqui de propósito.
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <NextIntlClientProvider>
          <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 p-8">
            <header className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">{t("appName")}</h1>
              <LocaleSwitcher />
            </header>
            <section className="rounded-lg border border-neutral-200 p-6 dark:border-neutral-800">
              {children}
            </section>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
