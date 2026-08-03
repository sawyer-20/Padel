/**
 * Bloco de dados estruturados Schema.org.
 *
 * O `<` é escapado antes de entrar no script: um título vindo da API que
 * contivesse "</script>" fecharia o bloco e o resto seria interpretado como
 * marcação. JSON.stringify sozinho não protege disto.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
