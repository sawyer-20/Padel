import type { SituationContent } from "../types";

// Contenu original (jamais copié du règlement officiel) — voir PROJECT.md §1.2/§6.2.
// Statut "machine" : pas encore relu par une personne connaissant le padel.
export const fr: Record<string, SituationContent> = {
  "wall-bounce-still-in-play": {
    question: "La balle a touché le mur de mon côté après avoir rebondi au sol — puis-je encore la renvoyer ?",
    status: "machine",
    answerMd:
      "Oui. Au padel, une fois que la balle a rebondi au sol de ton côté, elle reste en jeu même si elle touche ensuite un mur ou le grillage métallique qui entoure le court — les murs font partie de la zone de jeu, tout comme le sol. Ce qui met fin à l'échange, c'est un **deuxième** rebond au sol avant que tu ne la renvoies.",
  },
  "net-touch-on-serve": {
    question: "Le service a touché le filet et est quand même tombé dans le bon carré — est-ce une faute ?",
    status: "machine",
    answerMd:
      "Non, à condition que la balle ne touche pas le grillage métallique avant le deuxième rebond. Si elle touche le filet ou les poteaux, retombe dans le bon carré et en reste là, le service est simplement rejoué, sans pénalité pour le serveur. Mais si, après être tombée dans le carré, elle va toucher le grillage métallique avant de rebondir une seconde fois, c'est une faute — et non un service à rejouer.",
  },
  "ball-out-over-end-wall": {
    question: "Après avoir correctement rebondi de mon côté, la balle est sortie par-dessus le mur du fond — le point est-il déjà décidé ?",
    status: "machine",
    answerMd:
      "Oui, il est décidé : tu as perdu le point. La sortie **par-dessus le mur du fond** est justement le cas où le règlement n'autorise pas le jeu extérieur, même si le court dispose d'une zone de sécurité — il n'y a rien à aller chercher.\n\nC'est différent si la balle sort **par le côté ou par l'ouverture** : là, sur un court avec zone de sécurité, c'est **toi** qui peux sortir en courant et la renvoyer depuis l'extérieur, parce que la balle a rebondi de ton côté et que le renvoi t'appartient. Cet échange s'arrête si la balle rebondit une deuxième fois ou touche quelque chose d'étranger au court.",
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
      "Oui. Le service doit rebondir dans le carré de service adverse, du bon côté (les lignes comptent comme bonnes). S'il tombe en dehors, c'est une faute. Si c'était le premier service, tu as droit à un second ; si c'était déjà le second, tu perds le point.",
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
  "smash-out-of-court": {
    question:
      "J'ai smashé, la balle a rebondi dans leur court et elle est sortie de l'enceinte — le point est-il pour moi ?",
    status: "machine",
    answerMd:
      "Presque toujours oui, mais pas pour la raison qu'on avance d'habitude. Ce qui tranche, ce n'est pas la puissance du smash : c'est **par où la balle est sortie** et si le court dispose d'une zone de sécurité.\n\n- **Sortie par-dessus le mur du fond** — le point est à toi, à chaque fois. Le règlement n'autorise pas le jeu extérieur de ce côté, même sur un court entouré d'espace libre.\n- **Sortie par le côté ou par l'ouverture, sur un court avec zone de sécurité** — l'échange continue. L'adversaire peut sortir en courant, la jouer de l'extérieur et la remettre, tant qu'elle n'a pas rebondi une deuxième fois ni touché quoi que ce soit d'étranger au court. C'est le coup le plus spectaculaire du padel.\n- **Sortie par le côté ou par l'ouverture, sur un court sans zone de sécurité** — le point est à toi. Et comme l'immense majorité des courts de club n'a pas cet espace libre, c'est là que finissent presque toutes ces discussions.\n\nRetiens la distinction qui compte : ton smash était un renvoi valable dans tous les cas. Ce qui change, c'est de savoir si l'adversaire a un moyen d'y répondre.",
  },
};
