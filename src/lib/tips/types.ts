import type { RuleStatus } from "@/lib/rules/types";

export type TipCategory = "positioning" | "shot-choice" | "teamwork" | "mindset";

export type Tip = {
  slug: string;
  category: TipCategory;
  order: number;
  // Conceito do glossário relacionado, quando existe — liga a dica prática à definição.
  relatedTermSlug: string | null;
};

export type TipContent = {
  title: string;
  bodyMd: string;
  status: RuleStatus;
};
