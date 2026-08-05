"use client";

import { useMemo, useState, useId } from "react";
import { Link } from "@/i18n/navigation";

/**
 * Uma linha já formatada pelo servidor.
 *
 * A máscara de valores e os nomes de país são resolvidos antes de chegarem
 * aqui: assim o filtro compara exatamente o texto que está no ecrã, e a lógica
 * de `hidden_free_plan` não precisa de ser enviada para o browser.
 */
export type RankingRow = {
  playerId: string;
  name: string;
  country: string | null;
  position: string;
  points: string;
  /** Posição numérica quando conhecida — só para destacar o pódio. */
  positionNumber: number | null;
  /** Pontos ganhos ou perdidos desde a atualização anterior. */
  pointsDiff: number | null;
  /** Posições subidas (>0) ou descidas (<0) desde a atualização anterior. */
  positionsGained: number | null;
};

export type RankingsTableLabels = {
  position: string;
  player: string;
  country: string;
  points: string;
  searchLabel: string;
  searchPlaceholder: string;
  /** Contém {query}. */
  noResults: string;
  /** Contém {shown} e {total}. */
  count: string;
  /**
   * Singular e plural em separado, cada um com {n}.
   *
   * O componente não pode usar `useTranslations` (ver a nota acima), por isso
   * não tem acesso ao ICU do next-intl para resolver o plural. Os cinco idiomas
   * suportados distinguem apenas "um" de "vários", e é isso que se passa aqui.
   */
  movedUpOne: string;
  movedUpOther: string;
  movedDownOne: string;
  movedDownOther: string;
};

/**
 * Os textos chegam como props em vez de virem de `useTranslations`.
 *
 * O NextIntlClientProvider vive no root layout, acima do segmento [locale], e
 * esse layout não re-renderiza numa troca de idioma — as mensagens do lado do
 * cliente ficariam presas ao idioma da primeira visita (o mesmo problema
 * documentado em shell-messages.ts). É também o padrão que os outros
 * componentes de lista já seguem.
 */
function interpolate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

/**
 * Classes do disco do pódio, ou null para as restantes posições.
 *
 * Os rankings de padel têm empates — Tapia e Coello estão os dois em 1.º —, por
 * isso o pódio sai da posição e nunca da ordem da linha.
 */
function podiumTone(position: number | null): string | null {
  if (position === 1) return "border border-gold bg-gold-soft text-gold";
  if (position === 2) return "border border-silver bg-silver-soft text-silver";
  if (position === 3) return "border border-bronze bg-bronze-soft text-bronze";
  return null;
}

function pickMovementLabel(labels: RankingsTableLabels, positionsGained: number): string {
  const single = Math.abs(positionsGained) === 1;
  if (positionsGained > 0) return single ? labels.movedUpOne : labels.movedUpOther;
  return single ? labels.movedDownOne : labels.movedDownOther;
}

export function RankingsTable({ rows, labels }: { rows: RankingRow[]; labels: RankingsTableLabels }) {
  const [query, setQuery] = useState("");
  const inputId = useId();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (row) => row.name.toLowerCase().includes(q) || (row.country?.toLowerCase().includes(q) ?? false),
    );
  }, [rows, query]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="min-w-0 flex-1 sm:max-w-xs">
          <label htmlFor={inputId} className="sr-only">
            {labels.searchLabel}
          </label>
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-faint"
          />
        </div>
        {/* aria-live: quem usa leitor de ecrã ouve o resultado do filtro sem ter
            de percorrer a tabela toda a cada tecla. */}
        <p aria-live="polite" className="text-sm tabular-nums text-ink-faint">
          {interpolate(labels.count, {
            shown: String(filtered.length),
            total: String(rows.length),
          })}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line px-4 py-8 text-center text-sm text-ink-muted">
          {interpolate(labels.noResults, { query: query.trim() })}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-line bg-surface">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th
                  scope="col"
                  className="w-16 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink-faint"
                >
                  {labels.position}
                </th>
                <th
                  scope="col"
                  className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink-faint"
                >
                  {labels.player}
                </th>
                <th
                  scope="col"
                  className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink-faint"
                >
                  {labels.country}
                </th>
                <th
                  scope="col"
                  className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-ink-faint"
                >
                  {labels.points}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((row) => {
                const podium = row.positionNumber !== null && row.positionNumber <= 3;
                return (
                  <tr key={row.playerId} className="hover:bg-raised">
                    <td className="px-4 py-2.5 tabular-nums">
                      {/* Ouro, prata e bronze num disco. É a convenção mais
                          universal do desporto e lê-se sem legenda nenhuma —
                          muito mais depressa do que um número a negrito. */}
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          podiumTone(row.positionNumber) ?? "text-ink-muted"
                        }`}
                      >
                        {row.position}
                      </span>
                      {row.positionsGained !== null && row.positionsGained !== 0 && (
                        // A seta é decorativa; o texto que a acompanha, lido só
                        // por leitores de ecrã, diz quantas posições e para onde.
                        <span
                          className={`ml-1 text-xs ${
                            row.positionsGained > 0 ? "text-accent" : "text-down"
                          }`}
                        >
                          <span aria-hidden="true">{row.positionsGained > 0 ? "▲" : "▼"}</span>
                          <span className="sr-only">
                            {interpolate(
                              pickMovementLabel(labels, row.positionsGained),
                              { n: String(Math.abs(row.positionsGained)) },
                            )}
                          </span>
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      <Link
                        href={`/players/${row.playerId}`}
                        className={`text-ink no-underline hover:text-accent ${
                          podium ? "font-semibold" : "font-medium"
                        }`}
                      >
                        {row.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2.5 text-ink-muted">{row.country ?? "—"}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">
                      <span className="font-medium">{row.points}</span>
                      {row.pointsDiff !== null && row.pointsDiff !== 0 && (
                        // Sinal e cor, não só cor: quem não distingue vermelho de
                        // verde continua a ler o "+" ou o "−".
                        <span
                          className={`ml-2 text-xs ${
                            row.pointsDiff > 0 ? "text-accent" : "text-down"
                          }`}
                        >
                          {row.pointsDiff > 0 ? "+" : "−"}
                          {Math.abs(row.pointsDiff)}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
