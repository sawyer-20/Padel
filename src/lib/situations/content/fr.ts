import type { SituationContent } from "../types";

// Contenu original (jamais copié du règlement officiel) — voir PROJECT.md §1.2/§6.2.
// Statut "machine" : pas encore relu par une personne connaissant le padel.
export const fr: Record<string, SituationContent> = {
  "wall-bounce-still-in-play": {
    question: "La balle a touché le mur de mon côté après avoir rebondi au sol — puis-je encore la renvoyer ?",
    status: "machine",
    answerMd:
      "Oui. Au padel, une fois que la balle a rebondi de ton côté, elle reste en jeu même si elle touche ensuite un mur ou le grillage métallique qui entoure le court — les murs font partie de la zone de jeu, tout comme le sol. Tu ne perds le point que si la balle rebondit une **deuxième fois** avant que tu ne la renvoies.",
  },
  "net-touch-on-serve": {
    question: "Le service a touché le filet et est quand même tombé dans le bon carré — est-ce une faute ?",
    status: "machine",
    answerMd:
      "Non. Si la balle touche le filet ou les poteaux pendant le service et atterrit malgré tout dans le bon carré de service, ce n'est pas une faute — le service est simplement rejoué, sans pénalité pour le serveur.",
  },
  "ball-out-over-end-wall": {
    question: "Après avoir correctement rebondi de mon côté, la balle est sortie par-dessus le mur du fond — le point est-il déjà décidé ?",
    status: "machine",
    answerMd:
      "Pas forcément. Si le court dispose d'une zone de sécurité et autorise le jeu hors du court, l'adversaire peut encore aller chercher la balle dehors et la renvoyer. Le point n'est décidé que si la balle sort d'un côté où le jeu hors du court n'est pas autorisé, ou si, une fois dehors, elle rebondit une deuxième fois ou touche quelque chose d'étranger au jeu.",
  },
  "return-from-outside-court": {
    question: "Un joueur est sorti du court pour renvoyer la balle et y est parvenu — le point est-il valable ?",
    status: "machine",
    answerMd:
      "Oui, à condition que le court autorise le jeu hors du court (voir « Jouer hors du court »). C'est l'une des règles les plus caractéristiques du padel : avec assez d'espace et une ouverture, les joueurs peuvent sortir par le côté, renvoyer la balle, puis revenir en jeu.",
  },
  "ball-touches-player": {
    question: "La balle m'a touché avant que je puisse la renvoyer — est-ce que je perds toujours le point ?",
    status: "machine",
    answerMd:
      "Cela dépend du moment. Si c'était en réceptionnant un service, le point revient automatiquement au serveur. Pendant le jeu normal (hors service), celui qui est touché par la balle perd toujours le point, même si la balle était déjà en train de sortir du court.",
  },
  "serve-lands-outside-box": {
    question: "Le service est tombé en dehors du bon carré — est-ce une faute ?",
    status: "machine",
    answerMd:
      "Oui. Le service doit rebondir dans le carré de service adverse, du bon côté (les lignes comptent comme bonnes). S'il tombe en dehors, c'est une faute — et comme pour tout service, une seconde tentative est possible avant de perdre le point.",
  },
  "double-hit": {
    question: "J'ai touché la balle deux fois de suite sans le vouloir — que se passe-t-il ?",
    status: "machine",
    answerMd:
      "Tu perds le point — c'est considéré comme une « double frappe ». Il y a une exception : si toi et ton partenaire allez tous les deux vers la balle en même temps et que l'un touche la balle pendant qu'elle touche aussi la raquette du partenaire, cela ne compte pas comme une double frappe.",
  },
  "ball-splits": {
    question: "La balle s'est fendue en plein point — que se passe-t-il ?",
    status: "machine",
    answerMd:
      "Le point est rejoué intégralement (« let »), sans pénalité pour aucune des deux équipes. C'est aussi le cas si un élément extérieur au jeu interrompt le point de façon inattendue.",
  },
};
