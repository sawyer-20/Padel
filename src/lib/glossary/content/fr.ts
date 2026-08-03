import type { GlossaryContent } from "../types";

// Contenu original, rédigé à partir de connaissances générales et établies sur le padel
// (jamais copié de blogs ni de chaînes existantes — voir PROJECT.md §3/§4).
// Statut "machine" : pas encore relu par une personne connaissant le padel.
export const fr: Record<string, GlossaryContent> = {
  bandeja: {
    term: "Bandeja",
    status: "machine",
    definitionMd:
      "La bandeja est un coup de défense/contrôle joué au-dessus de la tête, généralement pour répondre à un lob adverse. Plutôt que de tenter un smash puissant, tu frappes la balle avec un geste plus doux et contrôlé, en gardant ta position au filet au lieu de reculer. C'est l'un des coups les plus caractéristiques du padel, sans équivalent direct au tennis.",
  },
  vibora: {
    term: "Víbora",
    status: "machine",
    definitionMd:
      "La víbora est une variante plus agressive de la bandeja : au lieu d'un geste contrôlé, tu donnes à la balle un effet latéral (coupé), avec plus de vitesse et une trajectoire plus basse et difficile à renvoyer. Le nom signifie « serpent » en espagnol, à cause du mouvement latéral du bras.",
  },
  chiquita: {
    term: "Chiquita",
    status: "machine",
    definitionMd:
      "La chiquita est un coup doux et bas, joué délibérément aux pieds de l'adversaire quand il est près du filet. Cela l'oblige à faire une volée défensive de bas en haut, ce qui te donne le temps de te rapprocher du filet avec l'avantage.",
  },
  globo: {
    term: "Lob",
    status: "machine",
    definitionMd:
      "Le lob est un coup haut et profond, joué par-dessus des adversaires postés au filet, pour les forcer à reculer ou pour te laisser (à toi et ton partenaire) le temps de rejoindre le filet. C'est probablement le coup tactique le plus utilisé au padel : mal exécuté, il offre une bandeja facile à l'adversaire ; bien exécuté, il inverse la dynamique du point.",
  },
  remate: {
    term: "Smash (remate)",
    status: "machine",
    definitionMd:
      "Le smash est le coup d'attaque au-dessus de la tête, frappé fort pour tenter de conclure le point. Contrairement au tennis, au padel il termine rarement le point du premier coup : la balle rebondit sur les murs et revient en jeu. La décision qui compte n'est pas comment smasher, mais quand — souvent la bandeja ou la víbora valent mieux, parce qu'elles te laissent au filet au lieu de te repousser en fond de court.",
  },
  bajada: {
    term: "Bajada",
    status: "machine",
    definitionMd:
      "La bajada est le coup joué sur une balle après son rebond sur le mur du fond de ton côté, frappée de haut en bas, à plat et avec du rythme. C'est la réponse offensive à un smash ou à un lob passé au-dessus de toi : au lieu de renvoyer un nouveau lob défensif, tu profites du rebond du mur pour reprendre l'initiative. À ne pas confondre avec le smash — la bajada se définit par le mur, pas par la puissance.",
  },
  "salida-de-pared": {
    term: "Salida de pared",
    status: "machine",
    definitionMd:
      "C'est la technique pour renvoyer une balle qui arrive directement du mur latéral ou du fond, sans se laisser surprendre. Plutôt que de chercher à attaquer, l'objectif habituel est un renvoi contrôlé et haut, pour se repositionner dans l'échange.",
  },
  "net-positioning": {
    term: "Position au filet",
    status: "machine",
    definitionMd:
      "Au padel, le filet est la position dominante : qui l'occupe a plus d'options d'attaque et réduit les angles de l'adversaire. Une bonne position signifie rester près du filet sans laisser d'espaces vides derrière soi, ni se désynchroniser de son partenaire, afin de couvrir le court ensemble.",
  },
  contrapared: {
    term: "Contrapared",
    status: "machine",
    definitionMd:
      "Sur une contrapared, tu frappes volontairement la balle contre un mur de ton propre camp, pour qu'elle repasse au-dessus du filet et retombe côté adverse. C'est un coup de dernier recours : on l'utilise quand la balle t'a déjà dépassé et qu'il n'y a plus moyen de la jouer directement par-dessus le filet. Il gagne rarement le point — il t'y maintient.",
  },
  manos: {
    term: "Manos (toucher)",
    status: "machine",
    definitionMd:
      "Manos, c'est le toucher : la capacité à contrôler la balle par la sensibilité plutôt que par la force — amortir une balle rapide, poser une chiquita dans les pieds de l'adversaire, changer le rythme du point. On dit d'un joueur qu'il a de bonnes mains quand il règle ces balles avec douceur et précision. Au padel, cela compte plus que la puissance.",
  },
};
