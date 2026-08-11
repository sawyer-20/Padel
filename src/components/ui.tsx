import type { ReactNode } from "react";

/**
 * Primitivas partilhadas. Existem para que uma tabela de rankings e uma lista de
 * torneios tenham a mesma moldura, o mesmo espaçamento e o mesmo contraste sem
 * que cada página volte a inventá-los à mão.
 */

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-line bg-surface ${className}`}>{children}</div>
  );
}

export function SectionHeading({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-baseline justify-between gap-4">
      {/*
        Título de secção a sério, e não mais um rótulo cinzento.

        Isto era `text-sm ... text-ink-faint`: exatamente o mesmo tratamento que
        "Idioma" no rodapé e que o cabeçalho da coluna "Pos." de uma tabela. Com
        79% do texto do sítio a 12 ou 14 px, e um único estilo de título abaixo
        do H1 usado em toda a parte, não havia degrau entre os rótulos e o H1 —
        e é a ausência desse degrau que faz uma página parecer lisa.

        Barlow Condensed em caixa alta a 24 px, na cor da tinta e não na do
        rótulo: fica um nível claramente abaixo do H1 e claramente acima das
        legendas, que é o lugar que faltava na escala.
      */}
      <h2 className="font-display text-2xl font-bold uppercase leading-none tracking-tight text-ink">
        {title}
      </h2>
      {action}
    </div>
  );
}

const BADGE_TONES = {
  accent: "bg-accent-soft text-accent",
  // Amarelo da bola, cheio. É o único sítio do site que usa esta cor, e é isso
  // que faz "a decorrer" saltar à vista sem precisar de animação nenhuma.
  live: "bg-live text-live-ink",
  neutral: "bg-raised text-ink-muted",
} as const;

export type BadgeTone = keyof typeof BADGE_TONES;

export function Badge({ tone = "neutral", children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded px-2 py-0.5 text-xs font-medium ${BADGE_TONES[tone]}`}
    >
      {children}
    </span>
  );
}

/** Aviso de secção que falhou, sem derrubar o resto da página. */
export function SectionNotice({ children }: { children: ReactNode }) {
  return (
    <p role="status" className="rounded-lg border border-dashed border-line px-4 py-6 text-sm text-ink-muted">
      {children}
    </p>
  );
}
