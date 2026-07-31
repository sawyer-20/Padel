import type { RuleStatus } from "@/lib/rules/types";

export type Situation = {
  slug: string;
  relatedRuleSlug: string | null;
  fipArticleRef: string;
  fipVersion: string;
  order: number;
};

export type SituationContent = {
  question: string;
  answerMd: string;
  status: RuleStatus;
};
