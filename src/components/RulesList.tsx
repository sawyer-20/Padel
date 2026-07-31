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
        <Link href={`/rules/${item.slug}`} className="underline">
          {item.title}
        </Link>
      )}
    />
  );
}
