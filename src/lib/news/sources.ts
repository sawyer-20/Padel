// Fontes de notícias por RSS. Todas verificadas à mão: servem RSS válido, estão ativas,
// e não bloqueiam acesso automatizado (§6.3 do PROJECT.md exige fontes que permitam
// sindicação — fontes que respondem 403 a pedidos automáticos ficam deliberadamente de fora).
export type NewsSource = {
  id: string;
  name: string;
  feedUrl: string;
  homepage: string;
  language: string;
};

export const newsSources: NewsSource[] = [
  {
    id: "fip",
    name: "International Padel Federation",
    feedUrl: "https://www.padelfip.com/news/feed/",
    homepage: "https://www.padelfip.com/news/",
    language: "en",
  },
  {
    id: "the-bandeja",
    name: "The Bandeja",
    feedUrl: "https://thebandeja.com/feed/",
    homepage: "https://thebandeja.com/",
    language: "en",
  },
  {
    id: "padelstar",
    name: "Padelstar",
    feedUrl: "https://www.padelstar.es/feed/",
    homepage: "https://www.padelstar.es/",
    language: "es",
  },
  {
    id: "padelspain",
    name: "PadelSpain",
    feedUrl: "https://www.padelspain.net/feed/",
    homepage: "https://www.padelspain.net/",
    language: "es",
  },
  {
    id: "actu-padel",
    name: "Actu Padel",
    feedUrl: "https://actu-padel.com/feed/",
    homepage: "https://actu-padel.com/",
    language: "fr",
  },
];

// Idiomas efetivamente cobertos pelas fontes acima. Não há (ainda) fonte em pt nem de —
// ver nota no plano da Fase 3: é uma lacuna de conteúdo, não técnica.
export const availableNewsLanguages = [...new Set(newsSources.map((s) => s.language))].sort();
