"use client";

import { Link } from "@/i18n/navigation";
import { SearchableList } from "./SearchableList";

type FaqListItem = {
  slug: string;
  question: string;
  answerHtml: string;
  needsReview: boolean;
  category: string;
  relatedRuleSlug: string | null;
  relatedTermSlug: string | null;
};

export function FaqList({
  items,
  categoryLabels,
  searchPlaceholder,
  emptyLabel,
  pendingReviewNotice,
  relatedRuleLabel,
  relatedTermLabel,
}: {
  items: FaqListItem[];
  categoryLabels: Record<string, string>;
  searchPlaceholder: string;
  emptyLabel: string;
  pendingReviewNotice: string;
  relatedRuleLabel: string;
  relatedTermLabel: string;
}) {
  return (
    <SearchableList
      items={items}
      getSearchText={(item) => item.question}
      getGroupKey={(item) => item.category}
      groupLabels={categoryLabels}
      searchPlaceholder={searchPlaceholder}
      emptyLabel={emptyLabel}
      renderItem={(item) => (
        // As respostas ficam sempre abertas em vez de num acordeão: é o que
        // permite à pesquisa da página encontrar texto dentro delas, e é o
        // texto que o motor de pesquisa lê para o resultado enriquecido.
        <article id={item.slug} className="scroll-mt-28 rounded-lg border border-line bg-surface p-4">
          <h3 className="font-medium">{item.question}</h3>

          {item.needsReview && (
            <p
              role="status"
              className="mt-2 rounded border border-line-strong bg-raised p-2 text-xs text-ink-muted"
            >
              {pendingReviewNotice}
            </p>
          )}

          <div
            className="mt-2 text-sm leading-relaxed [&_li]:my-0.5 [&_p]:my-2 [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
            dangerouslySetInnerHTML={{ __html: item.answerHtml }}
          />

          {(item.relatedRuleSlug || item.relatedTermSlug) && (
            <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-line pt-3 text-xs">
              {item.relatedRuleSlug && (
                <Link
                  href={`/rules/${item.relatedRuleSlug}`}
                  className="text-accent no-underline hover:underline"
                >
                  {relatedRuleLabel}
                </Link>
              )}
              {item.relatedTermSlug && (
                <Link
                  href="/training/glossary"
                  className="text-accent no-underline hover:underline"
                >
                  {relatedTermLabel}
                </Link>
              )}
            </p>
          )}
        </article>
      )}
    />
  );
}
