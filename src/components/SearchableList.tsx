"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";

export function SearchableList<T extends { slug: string }>({
  items,
  getSearchText,
  renderItem,
  getGroupKey,
  groupLabels,
  searchPlaceholder,
  emptyLabel,
}: {
  items: T[];
  getSearchText: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  getGroupKey?: (item: T) => string;
  groupLabels?: Record<string, string>;
  searchPlaceholder: string;
  emptyLabel: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => getSearchText(item).toLowerCase().includes(q));
  }, [items, query, getSearchText]);

  const groups = useMemo(() => {
    if (!getGroupKey) return [["__all__", filtered]] as [string, T[]][];
    const map = new Map<string, T[]>();
    for (const item of filtered) {
      const key = getGroupKey(item);
      const list = map.get(key) ?? [];
      list.push(item);
      map.set(key, list);
    }
    return [...map.entries()];
  }, [filtered, getGroupKey]);

  return (
    <div className="flex flex-col gap-4">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={searchPlaceholder}
        className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-faint"
      />

      {filtered.length === 0 && <p className="text-sm text-ink-faint">{emptyLabel}</p>}

      {groups.map(([groupKey, groupItems]) => (
        <section key={groupKey}>
          {/* h2 e não h3: o título da página é o h1, por isso um h3 aqui saltava
              um nível — e deixava os títulos dos itens sem um nível livre por
              baixo para se encaixarem. */}
          {/* O rótulo com um traço a atravessar o resto da largura: separa as
              secções sem lhes acrescentar peso, e dá à lista o aspeto de um
              índice em vez de rótulos a flutuar sobre cartões. */}
          {getGroupKey && groupLabels && (
            <h2 className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">
              <span className="shrink-0">{groupLabels[groupKey] ?? groupKey}</span>
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
            </h2>
          )}
          <ul className="flex flex-col gap-2">
            {groupItems.map((item) => (
              <li key={item.slug}>{renderItem(item)}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
