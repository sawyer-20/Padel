import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { locales, type Locale } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Padel Hub";

// Uma por idioma, geradas no build. São cinco imagens estáticas, não trabalho
// por pedido.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * A imagem que aparece quando alguém cola o link no WhatsApp, no LinkedIn ou
 * num email.
 *
 * Existia um `twitter:card = summary_large_image` declarado e imagem nenhuma
 * por trás — ou seja, prometíamos um cartão grande e entregávamos um retângulo
 * vazio. É a primeira coisa que um parceiro vê do projeto, muitas vezes antes
 * de abrir o site.
 *
 * Desenhada com divs porque o Satori (o motor por trás do ImageResponse) não
 * renderiza SVG externo nem `radial-gradient`: o campo aqui são caixas com
 * borda, que é o que ele sabe compor.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "common" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(135deg, #0b1220 0%, #12281f 100%)",
          color: "#eaf0f8",
          fontFamily: "sans-serif",
        }}
      >
        {/* O campo, a sair pela direita — o mesmo gesto do hero do sítio. */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            right: -130,
            top: 105,
            width: 620,
            height: 420,
            border: "4px solid rgba(47, 211, 165, 0.30)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 305,
              top: 0,
              width: 4,
              height: 412,
              background: "rgba(47, 211, 165, 0.30)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 92,
              top: 0,
              width: 4,
              height: 412,
              background: "rgba(47, 211, 165, 0.18)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 518,
              top: 0,
              width: 4,
              height: 412,
              background: "rgba(47, 211, 165, 0.18)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 92,
              top: 204,
              width: 430,
              height: 4,
              background: "rgba(47, 211, 165, 0.18)",
            }}
          />
        </div>

        {/* Faixa de acento à esquerda, igual à do .court-panel. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 10,
            height: 630,
            background: "linear-gradient(to bottom, #2fd3a5, rgba(47, 211, 165, 0))",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 80px",
            maxWidth: 760,
          }}
        >
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: -3,
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            {t("appName")}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 36,
              lineHeight: 1.3,
              color: "#a5b4cc",
            }}
          >
            {t("home.intro")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
