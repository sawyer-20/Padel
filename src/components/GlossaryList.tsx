"use client";

import { SearchableList } from "./SearchableList";

type GlossaryListItem = {
  slug: string;
  term: string;
  definitionHtml: string;
  needsReview: boolean;
  category: string;
};

export function GlossaryList({
  items,
  categoryLabels,
  searchPlaceholder,
  emptyLabel,
  pendingReviewNotice,
}: {
  items: GlossaryListItem[];
  categoryLabels: Record<string, string>;
  searchPlaceholder: string;
  emptyLabel: string;
  pendingReviewNotice: string;
}) {
  return (
    <SearchableList
      items={items}
      getSearchText={(item) => item.term}
      getGroupKey={(item) => item.category}
      groupLabels={categoryLabels}
      searchPlaceholder={searchPlaceholder}
      emptyLabel={emptyLabel}
      renderItem={(item) => (
        <div className="rounded border border-neutral-200 p-4 dark:border-neutral-800">
          <p className="font-medium">{item.term}</p>

          {item.needsReview && (
            <p
              role="status"
              className="mt-2 rounded border border-amber-300 bg-amber-50 p-2 text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200"
            >
              {pendingReviewNotice}
            </p>
          )}

          <div
            className="mt-2 text-sm [&_p]:my-1"
            dangerouslySetInnerHTML={{ __html: item.definitionHtml }}
          />
        </div>
      )}
    />
  );
}
