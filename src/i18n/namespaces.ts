export const namespaces = [
  "common",
  "rankings",
  "tournaments",
  "rules",
  "news",
  "training",
  "faq",
  "seo",
] as const;

export type Namespace = (typeof namespaces)[number];
