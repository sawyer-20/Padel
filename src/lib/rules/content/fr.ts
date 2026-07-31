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
  times: {
    title: "Temps et pauses pendant le match",
    status: "machine",
    bodyMd: `Le padel fixe des limites de temps précises pour garder le rythme du jeu :

- **Entre les points** : 20 secondes maximum.
- **En changeant de côté** : jusqu'à 90 secondes (sauf après le premier jeu de chaque set et pendant le tie-break, où il n'y a pas de pause).
- **À la fin de chaque set** : jusqu'à 120 secondes.
- **Avant de commencer** : un échauffement de 3 minutes entre les deux équipes est obligatoire.

Si une équipe n'est pas prête à jouer 10 minutes après l'heure officielle de début, elle peut perdre le match par forfait (« walkover »), sauf cas de force majeure.

En cas de blessure soignable, chaque joueur a droit à une pause médicale de 3 minutes, qui peut être répétée aux deux changements de côté suivants, toujours dans le temps réglementaire.`,
  },
  "player-positions": {
    title: "Position des joueurs sur le court",
    status: "machine",
    bodyMd: `Sur chaque point, une équipe a un joueur au service et son partenaire qui l'accompagne ; l'équipe adverse a un relanceur (placé en diagonale du serveur) et son partenaire qui l'accompagne.

Le relanceur peut se placer n'importe où de son côté du court — il n'est pas obligé de rester dans le carré de service. C'est aussi le cas des deux partenaires non directement impliqués dans le service : ils peuvent se placer où ils le souhaitent, de leur côté du filet.`,
  },
  "choice-of-sides": {
    title: "Le tirage au sort : qui sert en premier et de quel côté",
    status: "machine",
    bodyMd: `Avant le début du match, un tirage au sort (pile ou face, en général) détermine qui choisit en premier. L'équipe qui gagne le tirage peut choisir parmi trois options :

- Servir ou relancer en premier (l'autre équipe choisit alors le côté).
- Choisir le côté du court pour le premier jeu (l'autre équipe choisit alors de servir ou de relancer).
- Demander aux adversaires de choisir en premier.

Une fois la décision prise, les deux équipes indiquent à l'arbitre qui sert et qui relance en premier.`,
  },
  "changes-of-sides": {
    title: "Changement de côté",
    status: "machine",
    bodyMd: `Les équipes changent de côté après le 1er, le 3e, et chaque jeu impair suivant au sein d'un set (c'est-à-dire chaque fois que le total de jeux joués dans le set est impair).

Pendant le tie-break, le changement de côté a lieu tous les 6 points.

Si les équipes oublient de changer de côté, l'erreur est corrigée dès qu'elle est remarquée, en reprenant ensuite le bon ordre — les points déjà gagnés restent valables.`,
  },
  "serve-fault": {
    title: "Quand un service est une faute",
    status: "machine",
    bodyMd: `Un service est considéré comme une faute dans des situations telles que :

- Le non-respect des règles de position, de hauteur de frappe ou de trajectoire décrites dans « Le service ».
- Le serveur manque complètement la balle en essayant de la servir.
- La balle tombe en dehors du carré de service adverse (les lignes comptent comme bonnes).
- La balle touche le serveur, son partenaire, ou un élément qu'ils portent ou transportent.
- La balle atterrit dans le bon carré de service mais touche ensuite le grillage métallique avant le deuxième rebond.

Comme pour tout service, une seconde tentative est toujours possible avant de perdre le point.`,
  },
  "return-of-serve": {
    title: "Comment le service est réceptionné",
    status: "machine",
    bodyMd: `Le relanceur doit laisser la balle rebondir dans son carré de service et la renvoyer avant le deuxième rebond.

Lors du premier jeu de chaque set, l'équipe qui relance décide quel joueur relance en premier — cet ordre reste fixe pendant tout le set (il ne peut changer qu'au début du set suivant). Si l'ordre est inversé par erreur en cours de jeu, on continue ainsi jusqu'à la fin de ce jeu ou de ce tie-break, avant de revenir à l'ordre initial.

Si la balle touche l'un des relanceurs (ou sa raquette) avant de rebondir, le point revient automatiquement à l'équipe au service.`,
  },
  interference: {
    title: "Interférence entre joueurs",
    status: "machine",
    bodyMd: `Il y a interférence quand un joueur — volontairement ou non — gêne un adversaire dans l'exécution d'un coup.

- Si c'est **volontaire**, le point revient automatiquement à l'équipe adverse.
- Si c'est **involontaire**, le point est rejoué (« let »).
- Si la même équipe cause une deuxième interférence involontaire, elle perd le point en jeu.`,
  },
  "ball-in-play": {
    title: "Quand la balle est « en jeu »",
    status: "machine",
    bodyMd: `La balle est en jeu à partir du moment où un service valable est frappé, jusqu'à ce que le point soit décidé (par un « let » ou un résultat clair).

Un détail important : une fois que la balle a rebondi de ton côté du court, elle reste en jeu même si elle touche ensuite un mur, le grillage métallique, le filet ou les poteaux — tous ces éléments font partie de la zone de jeu, au même titre que le sol. Tu ne perds le point que si la balle rebondit une deuxième fois avant que tu ne la renvoies.`,
  },
  "point-lost": {
    title: "Les façons les plus courantes de perdre un point",
    status: "machine",
    bodyMd: `Le règlement recense de nombreux cas précis, mais les plus courants au quotidien sont :

- La balle rebondit deux fois de ton côté avant que tu ne la renvoies.
- Toi, ta raquette, ou un élément que tu portes touche le filet, les poteaux, le câble de tension ou le court adverse pendant que la balle est en jeu.
- Après avoir frappé la balle, elle touche le grillage métallique ou le sol de ton propre côté, au lieu d'aller vers le court adverse.
- Tu frappes la balle deux fois de suite (double frappe).
- La balle te touche, toi, ton partenaire, ou un élément que vous portez, après avoir tenté de la renvoyer.
- Tu commets deux fautes de service consécutives.
- Tu laisses tomber ta raquette, ou ton cordon de sécurité se rompt, pendant le point.

Cette liste n'est pas exhaustive — consulte le règlement officiel pour le texte complet.`,
  },
  "correct-return": {
    title: "Ce qui compte comme un retour valable",
    status: "machine",
    bodyMd: `Un retour est valable dans des situations qui surprennent parfois les débutants au padel, comme :

- La balle touche d'abord le mur de ton propre côté, puis part vers le court adverse.
- La balle touche le filet ou les poteaux et atterrit quand même correctement dans le court adverse.
- Après avoir correctement rebondi dans le court adverse, la balle sort, touche le plafond, les lumières ou un autre élément étranger au jeu — le point reste en cours.
- La balle atterrit exactement dans l'angle où le mur rejoint le sol.

Dans tous ces cas, le jeu continue et l'adversaire doit renvoyer la balle avant son deuxième rebond.`,
  },
  "point-won": {
    title: "Des façons moins évidentes de gagner un point",
    status: "machine",
    bodyMd: `Au-delà du cas où l'adversaire manque son retour, il existe deux situations propres au padel où le point est gagné directement :

- Après avoir correctement rebondi dans le court adverse, la balle sort par un trou du grillage métallique ou y reste coincée.
- La balle reste coincée sur la surface plane au sommet du mur, après avoir correctement rebondi dans le court adverse.`,
  },
  "change-of-balls": {
    title: "Changement de balles pendant le tournoi",
    status: "machine",
    bodyMd: `Avant chaque compétition, les organisateurs doivent annoncer à l'avance : la marque et le type de balles, le nombre utilisé par match (généralement 2 ou 3), et la politique de changement, le cas échéant.

Quand un changement est prévu, il a généralement lieu :

- Après un nombre impair de jeux convenu à l'avance.
- Au début de chaque set.
- Jamais juste au début d'un tie-break — dans ce cas, le changement est reporté au début du deuxième jeu du set suivant.

Si une balle est perdue ou endommagée en cours de match, elle est remplacée immédiatement — le jeu ne continue jamais avec moins de balles que prévu.`,
  },
};
