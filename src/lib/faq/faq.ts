import type { FaqMeta } from "./types";

/**
 * As perguntas que alguém faz antes de jogar padel pela primeira vez, ou nas
 * primeiras semanas.
 *
 * Cada uma aponta, sempre que faz sentido, para a regra oficial que a responde
 * em detalhe e para o termo do glossário que a resposta menciona — a FAQ é a
 * porta de entrada, não o destino.
 */
export const faq: FaqMeta[] = [
  {
    slug: "how-many-players",
    category: "basics",
    order: 1,
    relatedRuleSlug: "player-positions",
    relatedTermSlug: null,
  },
  {
    slug: "padel-vs-tennis",
    category: "basics",
    order: 2,
    relatedRuleSlug: "court-dimensions",
    relatedTermSlug: null,
  },
  {
    slug: "need-tennis-experience",
    category: "basics",
    order: 3,
    relatedRuleSlug: null,
    relatedTermSlug: "bandeja",
  },
  {
    slug: "which-side",
    category: "basics",
    order: 4,
    relatedRuleSlug: "choice-of-sides",
    relatedTermSlug: "net-positioning",
  },
  {
    slug: "scoring",
    category: "rules",
    order: 5,
    relatedRuleSlug: "scoring",
    relatedTermSlug: null,
  },
  {
    slug: "walls-in-play",
    category: "rules",
    order: 6,
    relatedRuleSlug: "ball-in-play",
    relatedTermSlug: "salida-de-pared",
  },
  {
    slug: "ball-out-of-court",
    category: "rules",
    order: 7,
    relatedRuleSlug: "out-of-court-play",
    relatedTermSlug: null,
  },
  {
    slug: "first-equipment",
    category: "equipment",
    order: 8,
    relatedRuleSlug: null,
    relatedTermSlug: null,
  },
  {
    slug: "choosing-first-racket",
    category: "equipment",
    order: 9,
    relatedRuleSlug: "the-racket",
    relatedTermSlug: null,
  },
  {
    slug: "padel-balls",
    category: "equipment",
    order: 10,
    relatedRuleSlug: "the-ball",
    relatedTermSlug: null,
  },
  // As duas perguntas que este site não consegue responder com dados próprios.
  // Em vez de as ignorar, dizem honestamente onde a resposta vive — que é o que
  // serve quem procura, e a única coisa legítima que podemos fazer com dados de
  // terceiros que não nos autorizam a reproduzi-los.
  {
    slug: "national-ranking",
    category: "portugal",
    order: 11,
    relatedRuleSlug: null,
    relatedTermSlug: null,
  },
  {
    slug: "amateur-tournaments",
    category: "portugal",
    order: 12,
    relatedRuleSlug: null,
    relatedTermSlug: null,
  },
];

export function getFaqMeta(slug: string): FaqMeta | null {
  return faq.find((entry) => entry.slug === slug) ?? null;
}
