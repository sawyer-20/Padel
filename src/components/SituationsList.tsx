"use client";

import { Link } from "@/i18n/navigation";
import { SearchableList } from "./SearchableList";

type SituationListItem = {
  slug: string;
  question: string;
  answerHtml: string;
  needsReview: boolean;
  fipArticleRef: string;
  relatedRuleSlug: string | null;
};

export function SituationsList({
  items,
  searchPlaceholder,
  emptyLabel,
  pendingReviewNotice,
  officialSourceLabel,
  relatedRuleLabel,
}: {
  items: SituationListItem[];
  searchPlaceholder: string;
  emptyLabel: string;
  pendingReviewNotice: string;
  officialSourceLabel: string;
  relatedRuleLabel: string;
}) {
  return (
    <SearchableList
      items={items}
      getSearchText={(item) => item.question}
      searchPlaceholder={searchPlaceholder}
      emptyLabel={emptyLabel}
      renderItem={(item) => (
        <div className="rounded border border-neutral-200 p-4 dark:border-neutral-800">
          <p className="font-medium">{item.question}</p>

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
            dangerouslySetInnerHTML={{ __html: item.answerHtml }}
          />

          <p className="mt-2 text-xs text-neutral-500">
            {officialSourceLabel}: {item.fipArticleRef}
            {item.relatedRuleSlug && (
              <>
                {" · "}
                <Link href={`/rules/${item.relatedRuleSlug}`} className="underline">
                  {relatedRuleLabel}
                </Link>
              </>
            )}
          </p>
        </div>
      )}
    />
  );
}
