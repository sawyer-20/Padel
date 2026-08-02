/**
 * Configuração canónica do sítio.
 *
 * O URL público tem de ser absoluto para que `metadataBase` resolva canonical,
 * hreflang e OpenGraph. Em produção vem de NEXT_PUBLIC_SITE_URL (definido na
 * Vercel); localmente cai no domínio de produção para que o output do build
 * seja igual ao que vai ser servido.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://padel-ten-ivory.vercel.app"
).replace(/\/+$/, "");

export const siteName = "Padel Hub";
