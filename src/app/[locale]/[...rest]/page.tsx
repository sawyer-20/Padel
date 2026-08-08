import { notFound } from "next/navigation";

/**
 * Apanha qualquer endereço dentro de um idioma que não corresponda a uma rota
 * real — `/pt/isto-nao-existe` — e força-o a passar por aqui.
 *
 * Sem esta rota, o Next resolve o caminho acima do segmento `[locale]` e
 * renderiza o 404 global, sem cabeçalho e sem tradução. É por isto que existe:
 * o `[locale]/not-found.tsx` só é usado quando alguém chama `notFound()` de
 * dentro do segmento, e é exatamente o que se faz aqui.
 */
export default function CatchAllNotFound() {
  notFound();
}
