/**
 * Um campo de padel visto de cima, à escala.
 *
 * As proporções são as do regulamento e as mesmas que a regra "Dimensões do
 * campo" já publica: 20 m de comprimento por 10 m de largura, rede a meio, e as
 * linhas de serviço a 6,95 m da rede de cada lado. A caixa de vista está em
 * decímetros (200 × 100) para os 6,95 m caberem em números inteiros.
 *
 * Desenhado e não fotografado de propósito: uma fotografia de banco de imagens
 * seria enchimento, e esta forma — o retângulo fechado com a rede a meio — é das
 * mais reconhecíveis do desporto. Além disso escala sem perder nitidez, muda de
 * cor com o tema e não pesa nada.
 */
export function PadelCourt({
  className = "",
  showNetLabel,
}: {
  className?: string;
  /** Rótulo acessível. Sem ele, o desenho é puramente decorativo. */
  showNetLabel?: string;
}) {
  const decorative = !showNetLabel;

  return (
    <svg
      viewBox="0 0 200 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative || undefined}
      aria-label={showNetLabel}
    >
      {/* Perímetro: o vidro e a rede metálica que fecham o recinto. */}
      <rect x="1" y="1" width="198" height="98" strokeWidth="2" />

      {/* Linhas de serviço, a 6,95 m da rede de cada lado. */}
      <line x1="30.5" y1="1" x2="30.5" y2="99" strokeWidth="1" />
      <line x1="169.5" y1="1" x2="169.5" y2="99" strokeWidth="1" />

      {/* Linha central de serviço: divide as duas áreas de serviço e vai de uma
          linha de serviço à outra, passando por baixo da rede. */}
      <line x1="30.5" y1="50" x2="169.5" y2="50" strokeWidth="1" />

      {/* A rede, a meio. Tracejada para se distinguir das linhas pintadas no
          chão — é o único elemento que não está no piso. */}
      <line x1="100" y1="1" x2="100" y2="99" strokeWidth="2" strokeDasharray="3 3" />
    </svg>
  );
}
