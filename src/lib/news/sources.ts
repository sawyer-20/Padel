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
    // A primeira fonte em português, e a única institucional: é a federação a
    // falar por si. Publica pouco — 4 artigos em 2026, 12 em 2025 — e por isso
    // não enche a página, mas quando publica é o comunicado oficial.
    //
    // Acesso legítimo, ao contrário da plataforma de rankings da própria FPP
    // (tour.tiesports.com): este robots.txt só protege /wp-admin/, não invoca
    // reserva de direitos e não bloqueia agentes automáticos.
    id: "fpp",
    name: "Federação Portuguesa de Padel",
    feedUrl: "https://fppadel.pt/feed/",
    homepage: "https://fppadel.pt/",
    language: "pt",
  },
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

// Idiomas efetivamente cobertos pelas fontes acima. Falta alemão: não se
// encontrou nenhum feed em de que responda a pedidos automáticos.
export const availableNewsLanguages = [...new Set(newsSources.map((s) => s.language))].sort();
