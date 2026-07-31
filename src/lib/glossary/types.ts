import type { RuleStatus } from "@/lib/rules/types";

export type GlossaryCategory = "shots" | "tactics";

export type GlossaryTerm = {
  slug: string;
  category: GlossaryCategory;
  order: number;
};

export type GlossaryContent = {
  term: string;
  definitionMd: string;
  status: RuleStatus;
};
