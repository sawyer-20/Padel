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
    <div className="mb-3 flex items-baseline justify-between gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-faint">{title}</h2>
      {action}
    </div>
  );
}

const BADGE_TONES = {
  accent: "bg-accent-soft text-accent",
  live: "bg-live-soft text-live",
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
