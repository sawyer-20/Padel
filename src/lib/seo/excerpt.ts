/**
 * Converte um corpo em Markdown em texto simples.
 *
 * Serve dois consumidores: a meta description das fichas de regra e o texto das
 * respostas no FAQPage das situações de jogo — o Schema.org espera texto, não
 * marcação.
 */
export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}[-*+]\s+/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Resumo de texto simples para a meta description.
 *
 * Preferimos isto a uma descrição genérica por página porque o texto real da
 * regra é único — e uma descrição repetida em 19 páginas não ajuda ninguém a
 * perceber, na lista de resultados, qual delas responde à pergunta.
 *
 * Corta sempre numa fronteira de palavra: cortar a meio de uma palavra é o
 * detalhe que denuncia texto gerado por máquina.
 */
export function excerptFromMarkdown(markdown: string, maxLength = 155): string {
  const text = stripMarkdown(markdown);

  if (text.length <= maxLength) return text;

  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.]$/, "")}…`;
}
