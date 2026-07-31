"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";

type RuleListItem = {
  slug: string;
  title: string;
  category: string;
};

export function RulesList({
  items,
  categoryLabels,
  searchPlaceholder,
  emptyLabel,
}: {
  items: RuleListItem[];
  categoryLabels: Record<string, string>;
  searchPlaceholder: string;
  emptyLabel: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => item.title.toLowerCase().includes(q));
  }, [items, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, RuleListItem[]>();
    for (const item of filtered) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    return [...map.entries()];
  }, [filtered]);

  return (
    <div className="flex flex-col gap-4">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={searchPlaceholder}
        className="rounded border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
      />

      {grouped.length === 0 && <p className="text-sm text-neutral-500">{emptyLabel}</p>}

      {grouped.map(([category, categoryItems]) => (
        <section key={category}>
          <h3 className="mb-2 text-sm font-semibold uppercase text-neutral-500">
            {categoryLabels[category] ?? category}
          </h3>
          <ul className="flex flex-col gap-1">
            {categoryItems.map((item) => (
              <li key={item.slug}>
                <Link href={`/rules/${item.slug}`} className="underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
