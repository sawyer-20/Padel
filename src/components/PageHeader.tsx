import type { ReactNode } from "react";

/**
 * O H1 de cada página.
 *
 * Antes o único H1 do sítio era a marca no topo, repetida nas 13 páginas, e o
 * título real de cada uma era um H2 — o que dizia a um motor de pesquisa que
 * todas as páginas tratam do mesmo assunto.
 */
export function PageHeader({
  title,
  lead,
  actions,
}: {
  title: string;
  lead?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
      <div className="min-w-0">
        {/* Uma face condensada ocupa menos largura e por isso lê-se mais pequena
            à mesma medida — daí subir um degrau na escala em vez de manter o
            tamanho anterior. */}
        <h1 className="text-3xl font-bold uppercase tracking-tight text-balance sm:text-4xl">
          {title}
        </h1>
        {lead && <p className="mt-2 max-w-prose text-ink-muted">{lead}</p>}
      </div>
      {actions}
    </div>
  );
}
