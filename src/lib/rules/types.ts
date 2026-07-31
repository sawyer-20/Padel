export type RuleStatus = "draft" | "machine" | "reviewed";

export type RuleCategory = "scoring" | "play" | "equipment";

export type RuleMeta = {
  slug: string;
  category: RuleCategory;
  fipArticleRef: string;
  fipVersion: string;
  order: number;
};

export type RuleContent = {
  title: string;
  bodyMd: string;
  status: RuleStatus;
};
