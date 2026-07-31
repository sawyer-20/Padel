import type { RuleContent } from "../types";

// Contenu original (jamais copié du règlement officiel) — voir PROJECT.md §1.2/§6.2.
// Statut "machine" : pas encore relu par une personne connaissant le padel.
export const fr: Record<string, RuleContent> = {
  scoring: {
    title: "Comment compter un jeu, un set et un match",
    status: "machine",
    bodyMd: `Le padel compte les points comme au tennis : le premier point vaut 15, le deuxième 30, le troisième 40, et le quatrième remporte le jeu — à condition d'avoir au moins deux points d'avance.

Si les deux équipes atteignent 40-40, on parle d'**égalité** (deuce). À partir de là, deux formats existent pour décider du jeu, chaque tournoi choisissant le sien :

- **Avantage classique** : l'équipe qui remporte le point suivant prend l'avantage ; si elle gagne encore, elle remporte le jeu, sinon on revient à l'égalité.
- **Point en or (golden point)** : au lieu d'avantages successifs, un seul point décisif est joué. L'équipe qui le remporte gagne le jeu. C'est le format le plus utilisé aujourd'hui en padel professionnel, car il rend la durée des jeux plus prévisible.

Une équipe remporte un **set** en atteignant 6 jeux, avec au moins 2 d'avance. En cas d'égalité à 6-6, un **tie-break** est joué (un décompte de points, pas de jeux) jusqu'à 7 points, avec 2 points d'avance.

Un **match** se gagne en remportant 2 sets sur 3.`,
  },
  "the-serve": {
    title: "Le service : comment débute chaque point",
    status: "machine",
    bodyMd: `Contrairement au tennis, le service au padel se frappe toujours par en dessous.

Règles principales :

- Le serveur doit garder au moins un pied derrière la ligne de service, sans la toucher ni franchir la ligne centrale imaginaire.
- La balle doit rebondir au sol puis être frappée en dessous de la taille, avec au moins un pied en contact avec le sol au moment de l'impact.
- La balle doit traverser le filet en diagonale et atterrir dans le carré de service adverse, du côté opposé.
- Chaque équipe dispose de deux tentatives par point (premier et second service) — si les deux échouent, le point est perdu.
- Le côté du service alterne à chaque point : d'abord vers la gauche de l'adversaire, puis vers sa droite, et ainsi de suite.`,
  },
  "let-and-net-serve": {
    title: "« Let » et service filet : quand un service est rejoué",
    status: "machine",
    bodyMd: `Un service qui se passe mal n'est pas forcément une faute — dans certaines situations, le point est simplement rejoué, sans pénalité pour le serveur.

- **Service filet** : si la balle touche le filet ou les poteaux et atterrit malgré tout dans le bon carré de service, ce n'est pas une faute — le service est rejoué.
- **« Let » (rejoué)** : si le relanceur n'était pas prêt, ou qu'un élément extérieur au jeu interrompt le point (par exemple une balle venue d'un autre court), le point est intégralement rejoué.

Si le point est rejoué sur le premier service, le serveur conserve ses deux tentatives. Si c'est sur le second service, seule cette seconde tentative est rejouée.`,
  },
  "out-of-court-play": {
    title: "Jouer hors du court : la règle qui rend le padel unique",
    status: "machine",
    bodyMd: `L'une des particularités les plus marquantes du padel est que, sur les courts prévus à cet effet, les joueurs peuvent sortir de l'enceinte fermée pour aller chercher la balle.

Une fois que la balle a rebondi de ton côté, toi (ou ton partenaire) pouvez sortir par l'ouverture latérale du court et la renvoyer depuis l'extérieur, à condition que la balle soit toujours en jeu et que le court dispose d'une « zone de sécurité » autour de lui (un espace minimal sans obstacle) permettant de le faire en toute sécurité.

Ce n'est pas autorisé sur tous les courts — cela dépend de l'espace et des ouvertures disponibles autour. Quand c'est le cas, cela donne certains des points les plus spectaculaires du padel : un joueur qui sprinte hors du court, renvoie la balle par-dessus le filet, puis revient en jeu.`,
  },
  "court-dimensions": {
    title: "Dimensions du court",
    status: "machine",
    bodyMd: `Le court de padel est un rectangle de **10 mètres de large sur 20 mètres de long** (mesures intérieures), divisé en deux par un filet.

- Le filet mesure 88 cm de hauteur au centre, montant jusqu'à 92 cm au niveau des poteaux latéraux.
- Les lignes de service se trouvent à 6,95 mètres du filet, de chaque côté.
- Le court est entièrement fermé — en partie par des murs (verre ou matériau solide), en partie par un grillage métallique, pour une hauteur totale d'environ 4 mètres aux extrémités.
- La hauteur libre minimale au-dessus du court est de 6 mètres (8 mètres recommandés pour les nouvelles installations), sans obstacle comme des projecteurs.

Ces dimensions garantissent un rebond prévisible de la balle sur les murs — c'est cette prévisibilité qui rend possibles les échanges caractéristiques du padel contre les parois vitrées.`,
  },
  "the-ball": {
    title: "La balle",
    status: "machine",
    bodyMd: `La balle de padel ressemble à une balle de tennis, mais elle est légèrement plus petite, plus légère et moins gonflée — adaptée à un jeu qui se déroule dans un court fermé, avec de nombreux rebonds contre les murs.

- Diamètre compris entre 6,35 et 6,77 cm.
- Poids compris entre 56,0 et 59,4 grammes.
- Une balle neuve, lâchée d'une hauteur de 2,54 mètres sur une surface dure, doit rebondir entre 135 et 145 cm.
- Au-dessus de 1000 mètres d'altitude, des balles à rebond plus faible (entre 121,92 et 135 cm) peuvent être utilisées, l'air plus raréfié faisant rebondir la balle davantage.`,
  },
  "the-racket": {
    title: "La raquette",
    status: "machine",
    bodyMd: `La raquette de padel n'a pas de cordage — c'est une surface pleine et perforée, bien différente d'une raquette de tennis.

- Longueur totale (tête et manche) jusqu'à 45,5 cm.
- Largeur maximale de 26 cm et épaisseur maximale de 38 mm.
- La surface de frappe est perforée de trous circulaires, généralement entre 9 et 13 mm de diamètre dans la zone centrale.
- Un cordon de sécurité fixé au manche et porté autour du poignet est obligatoire — il empêche la raquette d'être projetée pendant le jeu.
- Elle ne peut comporter aucun dispositif électronique visible ou sonore communiquant des informations au joueur pendant le jeu.`,
  },
};
