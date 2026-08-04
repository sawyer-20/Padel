import type { RuleStatus } from "@/lib/rules/types";

export type FaqCategory = "basics" | "rules" | "equipment" | "portugal";

export type FaqMeta = {
  slug: string;
  category: FaqCategory;
  order: number;
  /** Regra oficial que responde à pergunta em detalhe, quando existe. */
  relatedRuleSlug: string | null;
  /** Termo do glossário mencionado na resposta, quando existe. */
  relatedTermSlug: string | null;
};

export type FaqContent = {
  question: string;
  answerMd: string;
  status: RuleStatus;
};
