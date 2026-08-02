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
        <div className="rounded-lg border border-line bg-surface p-4">
          <p className="font-medium">{item.title}</p>

          {item.needsReview && (
            <p
              role="status"
              className="mt-2 rounded border border-line-strong bg-raised p-2 text-xs text-ink-muted"
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
