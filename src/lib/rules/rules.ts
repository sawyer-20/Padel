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
  { slug: "times", category: "play", fipArticleRef: "Rule 2", fipVersion: FIP_VERSION, order: 8 },
  { slug: "player-positions", category: "play", fipArticleRef: "Rule 3", fipVersion: FIP_VERSION, order: 9 },
  { slug: "choice-of-sides", category: "play", fipArticleRef: "Rule 4", fipVersion: FIP_VERSION, order: 10 },
  { slug: "changes-of-sides", category: "play", fipArticleRef: "Rule 5", fipVersion: FIP_VERSION, order: 11 },
  { slug: "serve-fault", category: "play", fipArticleRef: "Rule 7", fipVersion: FIP_VERSION, order: 12 },
  { slug: "return-of-serve", category: "play", fipArticleRef: "Rule 8", fipVersion: FIP_VERSION, order: 13 },
  { slug: "interference", category: "play", fipArticleRef: "Rule 11", fipVersion: FIP_VERSION, order: 14 },
  { slug: "ball-in-play", category: "play", fipArticleRef: "Rule 12", fipVersion: FIP_VERSION, order: 15 },
  { slug: "point-lost", category: "play", fipArticleRef: "Rule 13", fipVersion: FIP_VERSION, order: 16 },
  { slug: "correct-return", category: "play", fipArticleRef: "Rule 14", fipVersion: FIP_VERSION, order: 17 },
  { slug: "point-won", category: "play", fipArticleRef: "Rule 15", fipVersion: FIP_VERSION, order: 18 },
  { slug: "change-of-balls", category: "equipment", fipArticleRef: "Rule 17", fipVersion: FIP_VERSION, order: 19 },
];

export function getRuleMeta(slug: string): RuleMeta | null {
  return rules.find((rule) => rule.slug === slug) ?? null;
}
