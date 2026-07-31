import type { GlossaryTerm } from "./types";

export const glossary: GlossaryTerm[] = [
  { slug: "bandeja", category: "shots", order: 1 },
  { slug: "vibora", category: "shots", order: 2 },
  { slug: "chiquita", category: "shots", order: 3 },
  { slug: "globo", category: "shots", order: 4 },
  { slug: "bajada", category: "shots", order: 5 },
  { slug: "contrapared", category: "tactics", order: 6 },
  { slug: "salida-de-pared", category: "tactics", order: 7 },
  { slug: "net-positioning", category: "tactics", order: 8 },
  { slug: "x3", category: "tactics", order: 9 },
  { slug: "manos", category: "tactics", order: 10 },
];

export function getGlossaryTermMeta(slug: string): GlossaryTerm | null {
  return glossary.find((term) => term.slug === slug) ?? null;
}
