"use client";

import { Link } from "@/i18n/navigation";
import { SearchableList } from "./SearchableList";

type TipListItem = {
  slug: string;
  title: string;
  bodyHtml: string;
  needsReview: boolean;
  category: string;
  relatedTermSlug: string | null;
};

export function TipsList({
  items,
  categoryLabels,
  searchPlaceholder,
  emptyLabel,
  pendingReviewNotice,
  relatedTermLabel,
}: {
  items: TipListItem[];
  categoryLabels: Record<string, string>;
  searchPlaceholder: string;
  emptyLabel: string;
  pendingReviewNotice: string;
  relatedTermLabel: string;
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
        <div className="rounded border border-neutral-200 p-4 dark:border-neutral-800">
          <p className="font-medium">{item.title}</p>

          {item.needsReview && (
            <p
              role="status"
              className="mt-2 rounded border border-amber-300 bg-amber-50 p-2 text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200"
            >
              {pendingReviewNotice}
            </p>
          )}

          <div
            className="mt-2 text-sm [&_p]:my-1 [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: item.bodyHtml }}
          />

          {item.relatedTermSlug && (
            <p className="mt-2 text-xs">
              <Link href="/training/glossary" className="underline">
                {relatedTermLabel}
              </Link>
            </p>
          )}
        </div>
      )}
    />
  );
}
