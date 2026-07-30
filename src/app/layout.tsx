import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { StateProbe } from "@/components/StateProbe";
import "./globals.css";

export const metadata: Metadata = {
  title: "Padel Hub",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const t = await getTranslations("common");

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 p-8">
            <header className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">{t("appName")}</h1>
              <LocaleSwitcher />
            </header>
            <section className="rounded-lg border border-neutral-200 p-6 dark:border-neutral-800">
              {children}
              <StateProbe />
            </section>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
