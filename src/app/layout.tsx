import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Barlow_Condensed } from "next/font/google";
import { ThemeScript } from "@/components/ThemeScript";
import { siteName, siteUrl } from "@/lib/seo/site";
import "./globals.css";

/**
 * Uma só face de display, para títulos e números.
 *
 * Condensada porque é a linguagem dos painéis de resultados: nomes compridos e
 * números grandes têm de caber lado a lado sem partir a linha. O corpo de texto
 * continua na pilha do sistema — é instantânea, não gasta um pedido, e para
 * parágrafos não se ganha nada em trocá-la.
 *
 * `display: swap` para o texto aparecer já na fonte do sistema em vez de ficar
 * invisível à espera do ficheiro.
 */
const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-display-face",
});

const BODY_STACK =
  'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';

export const metadata: Metadata = {
  // Base absoluta: sem isto, os canonical e og:url relativos de cada página
  // não resolvem e o Next avisa no build.
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
};

/**
 * Só o documento e o provider de traduções.
 *
 * O cabeçalho, a navegação e o rodapé vivem em [locale]/layout.tsx, que
 * re-renderiza a cada troca de idioma — aqui em cima o texto ficaria preso ao
 * idioma da primeira visita (é o mesmo motivo documentado em shell-messages.ts).
 */
export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  return (
    // suppressHydrationWarning: o ThemeScript altera a classe de <html> antes da
    // hidratação, por isso o servidor e o cliente divergem aqui de propósito.
    <html
      lang={locale}
      suppressHydrationWarning
      className={display.variable}
      style={{ ["--font-body" as string]: BODY_STACK }}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
