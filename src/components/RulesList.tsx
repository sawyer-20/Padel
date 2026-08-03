"use client";

import { Link } from "@/i18n/navigation";
import { SearchableList } from "./SearchableList";

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
  return (
    <SearchableList
      items={items}
      getSearchText={(item) => item.title}
      getGroupKey={(item) => item.category}
      groupLabels={categoryLabels}
      searchPlaceholder={searchPlaceholder}
      emptyLabel={emptyLabel}
      renderItem={(item) => (
        <Link
          href={`/rules/${item.slug}`}
          className="block rounded-lg border border-line bg-surface px-4 py-3 text-ink no-underline transition-colors hover:border-accent hover:text-accent"
        >
          {item.title}
        </Link>
      )}
    />
  );
}
