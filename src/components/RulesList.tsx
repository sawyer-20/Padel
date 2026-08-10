"use client";

import { Link } from "@/i18n/navigation";
import { SearchableList } from "./SearchableList";

type RuleListItem = {
  slug: string;
  title: string;
  category: string;
  fipArticleRef: string;
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
      // O artigo entra na pesquisa: quem sabe que procura a "Rule 9" escreve
      // isso, e não o título português da regra.
      getSearchText={(item) => `${item.title} ${item.fipArticleRef}`}
      getGroupKey={(item) => item.category}
      groupLabels={categoryLabels}
      searchPlaceholder={searchPlaceholder}
      emptyLabel={emptyLabel}
      renderItem={(item) => (
        <Link
          href={`/rules/${item.slug}`}
          className="group flex items-center gap-4 rounded-lg border border-line bg-surface px-4 py-3 no-underline transition-colors hover:border-accent"
        >
          {/* Referência primeiro, título depois: a coluna à esquerda alinha os
              19 artigos e faz a lista ler-se como um índice de regulamento, não
              como uma pilha de cartões iguais.

              Truncada e com `title`: as referências vão de "Rule 1" a "The
              Court — Dimensions, Net, Enclosures & Ends", e sem corte a coluna
              deixava de alinhar. Escondida no telemóvel, onde 96 px roubados ao
              título custavam mais do que valiam. */}
          <span
            title={item.fipArticleRef}
            className="hidden w-32 shrink-0 truncate font-mono text-xs uppercase tracking-wide text-ink-faint sm:block"
          >
            {item.fipArticleRef}
          </span>
          <span className="min-w-0 flex-1 font-medium text-ink transition-colors group-hover:text-accent">
            {item.title}
          </span>
          <span
            aria-hidden="true"
            className="shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
          >
            →
          </span>
        </Link>
      )}
    />
  );
}
