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
        <div className="rounded-lg border border-line bg-surface p-4">
          {/* h2: esta lista não tem grupos, por isso os itens vêm logo abaixo do h1. */}
          <h2 className="font-medium">{item.question}</h2>

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
            dangerouslySetInnerHTML={{ __html: item.answerHtml }}
          />

          <p className="mt-2 text-xs text-ink-faint">
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
