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
        className="rounded border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
      />

      {filtered.length === 0 && <p className="text-sm text-neutral-500">{emptyLabel}</p>}

      {groups.map(([groupKey, groupItems]) => (
        <section key={groupKey}>
          {getGroupKey && groupLabels && (
            <h3 className="mb-2 text-sm font-semibold uppercase text-neutral-500">
              {groupLabels[groupKey] ?? groupKey}
            </h3>
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
