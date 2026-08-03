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
        <div id={item.slug} className="scroll-mt-28 rounded-lg border border-line bg-surface p-4">
          <h3 className="font-medium">{item.term}</h3>

          {item.needsReview && (
            <p
              role="status"
              className="mt-2 rounded border border-line-strong bg-raised p-2 text-xs text-ink-muted"
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
