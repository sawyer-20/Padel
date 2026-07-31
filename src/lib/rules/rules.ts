import type { RuleMeta } from "./types";

// Versão do regulamento oficial usada como referência para todo o conteúdo abaixo.
export const FIP_VERSION = "2026-01-01";
export const FIP_OFFICIAL_PDF_URL = "https://www.padelfip.com/wp-content/uploads/2025/12/FIP_Rules-of-Padel.pdf";

export const rules: RuleMeta[] = [
  { slug: "scoring", category: "scoring", fipArticleRef: "Rule 1", fipVersion: FIP_VERSION, order: 1 },
  { slug: "the-serve", category: "play", fipArticleRef: "Rule 6", fipVersion: FIP_VERSION, order: 2 },
  { slug: "let-and-net-serve", category: "play", fipArticleRef: "Rule 9", fipVersion: FIP_VERSION, order: 3 },
  {
    slug: "out-of-court-play",
    category: "play",
    fipArticleRef: "Rule 16",
    fipVersion: FIP_VERSION,
    order: 4,
  },
  {
    slug: "court-dimensions",
    category: "equipment",
    fipArticleRef: "The Court — Dimensions",
    fipVersion: FIP_VERSION,
    order: 5,
  },
  { slug: "the-ball", category: "equipment", fipArticleRef: "The Ball", fipVersion: FIP_VERSION, order: 6 },
  {
    slug: "the-racket",
    category: "equipment",
    fipArticleRef: "The Padel Racket",
    fipVersion: FIP_VERSION,
    order: 7,
  },
];

export function getRuleMeta(slug: string): RuleMeta | null {
  return rules.find((rule) => rule.slug === slug) ?? null;
}
