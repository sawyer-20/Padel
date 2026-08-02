/**
 * Descodifica referências de caracteres HTML deixadas nos títulos dos feeds.
 *
 * Porque é preciso: vários feeds escapam duas vezes. O título sai da origem como
 * `&amp;#8216;Chingalan&amp;#8217;`; o parser de XML descodifica o `&amp;` e
 * entrega-nos `&#8216;Chingalan&#8217;`, que é o que estava a chegar ao ecrã,
 * tal e qual. Falta esta segunda passagem, ao nível do HTML.
 *
 * Uma única passagem, de propósito: `&amp;lt;` deve ficar em `&lt;` e não
 * continuar a descodificar até `<`. Os títulos são renderizados como texto pelo
 * React, por isso o resultado nunca é interpretado como marcação.
 */

const NAMED: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  laquo: "«",
  raquo: "»",
  bull: "•",
  middot: "·",
  deg: "°",
  euro: "€",
  trade: "™",
  reg: "®",
  copy: "©",
};

function fromCodePoint(code: number): string | null {
  // Surrogates isolados e valores fora do intervalo Unicode partem String.fromCodePoint.
  if (!Number.isFinite(code) || code <= 0 || code > 0x10ffff) return null;
  if (code >= 0xd800 && code <= 0xdfff) return null;
  return String.fromCodePoint(code);
}

export function decodeHtmlEntities(text: string): string {
  return text.replace(/&(#[Xx][0-9A-Fa-f]+|#\d+|[A-Za-z][A-Za-z0-9]*);/g, (match, body: string) => {
    if (body.startsWith("#")) {
      const isHex = body[1] === "x" || body[1] === "X";
      const code = Number.parseInt(isHex ? body.slice(2) : body.slice(1), isHex ? 16 : 10);
      return fromCodePoint(code) ?? match;
    }

    // Entidade nomeada desconhecida fica como está: melhor mostrar `&sect;` do que
    // adivinhar mal e trocar o sentido de um título.
    return NAMED[body.toLowerCase()] ?? match;
  });
}
