export const namespaces = [
  "common",
  "rankings",
  "tournaments",
  "rules",
  "news",
  "training",
] as const;

export type Namespace = (typeof namespaces)[number];
