import type { Tip } from "./types";

export const tips: Tip[] = [
  { slug: "own-the-net", category: "positioning", order: 1, relatedTermSlug: "net-positioning" },
  { slug: "dont-back-up-on-lobs", category: "positioning", order: 2, relatedTermSlug: "bandeja" },
  { slug: "move-as-a-block", category: "positioning", order: 3, relatedTermSlug: null },
  { slug: "let-the-wall-work", category: "shot-choice", order: 4, relatedTermSlug: "salida-de-pared" },
  { slug: "play-at-their-feet", category: "shot-choice", order: 5, relatedTermSlug: "chiquita" },
  { slug: "lob-is-a-weapon", category: "shot-choice", order: 6, relatedTermSlug: "globo" },
  { slug: "cross-by-default", category: "shot-choice", order: 7, relatedTermSlug: null },
  { slug: "call-the-ball", category: "teamwork", order: 8, relatedTermSlug: null },
  { slug: "cover-the-middle", category: "teamwork", order: 9, relatedTermSlug: null },
  { slug: "points-are-won-by-patience", category: "mindset", order: 10, relatedTermSlug: null },
];

export function getTipMeta(slug: string): Tip | null {
  return tips.find((tip) => tip.slug === slug) ?? null;
}
