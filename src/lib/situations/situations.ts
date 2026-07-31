import { FIP_VERSION } from "@/lib/rules/rules";
import type { Situation } from "./types";

export const situations: Situation[] = [
  { slug: "wall-bounce-still-in-play", relatedRuleSlug: null, fipArticleRef: "Rule 12", fipVersion: FIP_VERSION, order: 1 },
  { slug: "net-touch-on-serve", relatedRuleSlug: "let-and-net-serve", fipArticleRef: "Rule 9", fipVersion: FIP_VERSION, order: 2 },
  { slug: "ball-out-over-end-wall", relatedRuleSlug: null, fipArticleRef: "Rule 13, 14", fipVersion: FIP_VERSION, order: 3 },
  {
    slug: "return-from-outside-court",
    relatedRuleSlug: "out-of-court-play",
    fipArticleRef: "Rule 16",
    fipVersion: FIP_VERSION,
    order: 4,
  },
  { slug: "ball-touches-player", relatedRuleSlug: null, fipArticleRef: "Rule 8, 13", fipVersion: FIP_VERSION, order: 5 },
  { slug: "serve-lands-outside-box", relatedRuleSlug: "the-serve", fipArticleRef: "Rule 7", fipVersion: FIP_VERSION, order: 6 },
  { slug: "double-hit", relatedRuleSlug: null, fipArticleRef: "Rule 13", fipVersion: FIP_VERSION, order: 7 },
  { slug: "ball-splits", relatedRuleSlug: null, fipArticleRef: "Rule 10", fipVersion: FIP_VERSION, order: 8 },
];

export function getSituationMeta(slug: string): Situation | null {
  return situations.find((situation) => situation.slug === slug) ?? null;
}
