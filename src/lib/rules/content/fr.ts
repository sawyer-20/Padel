import type { RuleContent } from "../types";

// Contenu original (jamais copié du règlement officiel) — voir PROJECT.md §1.2/§6.2.
// Statut "machine" : pas encore relu par une personne connaissant le padel.
export const fr: Record<string, RuleContent> = {
  scoring: {
    title: "Comment compter un jeu, un set et un match",
    status: "machine",
    bodyMd: `Le padel compte les points comme au tennis : le premier point vaut 15, le deuxième 30, le troisième 40, et le quatrième remporte le jeu — à condition d'avoir au moins deux points d'avance.

Si les deux équipes atteignent 40-40, on parle d'**égalité** (deuce). À partir de là, le règlement prévoit trois façons de décider du jeu, et chaque tournoi choisit la sienne :

- **Avantage classique** : l'équipe qui remporte le point suivant prend l'avantage ; si elle gagne encore, elle remporte le jeu, sinon on revient à l'égalité.
- **Point étoile** : on joue avec avantages jusqu'à revenir à l'égalité pour la troisième fois ; le point suivant décide alors du jeu.
- **Point en or (golden point)** : au lieu d'avantages successifs, un seul point décisif est joué. L'équipe qui le remporte gagne le jeu. C'est le format le plus utilisé aujourd'hui en padel professionnel, car il rend la durée des jeux plus prévisible.

Sur le point décisif — en or comme étoile — deux règles font beaucoup discuter sur le court :

- C'est l'**équipe qui relance** qui choisit de quel côté elle va recevoir, mais les deux joueurs **ne peuvent pas échanger leurs positions** pour le faire.
- En épreuve mixte, celui qui relance le point décisif doit être **du même sexe que le serveur**.

Une équipe remporte un **set** en atteignant 6 jeux, avec au moins 2 d'avance. En cas d'égalité à 6-6, un **tie-break** est joué (un décompte de points, pas de jeux) jusqu'à 7 points, avec 2 points d'avance.

Le format le plus courant pour un **match** est de remporter 2 sets sur 3, mais le règlement admet des variantes qu'une épreuve peut adopter : des sets courts en 4 jeux, un tie-break ordinaire à la place du troisième set, ou un **super tie-break en 10 points** en guise de troisième set — ce dernier est aujourd'hui courant en compétition amateur.`,
  },
  "the-serve": {
    title: "Le service : comment débute chaque point",
    status: "machine",
    bodyMd: `Contrairement au tennis, le service au padel se frappe toujours par en dessous.

Règles principales :

- Le serveur doit garder au moins un pied derrière la ligne de service, dans l'espace compris entre le prolongement imaginaire de la ligne centrale et le mur latéral — et il doit y rester jusqu'à ce que le service soit frappé.
- La balle doit rebondir au sol avant d'être frappée, et ce rebond doit avoir lieu à l'intérieur du carré depuis lequel il sert. La balle ne peut franchir ni la ligne de service ni la ligne centrale avant l'impact.
- L'impact doit se faire **à hauteur de taille ou en dessous**, avec au moins un pied en contact avec le sol à cet instant.
- La balle doit traverser le filet en diagonale et atterrir dans le carré de service adverse, du côté opposé.
- Chaque équipe dispose de deux tentatives par point (premier et second service) — si les deux échouent, le point est perdu.
- Le premier service de chaque jeu se joue depuis le côté droit du court du serveur, et le côté alterne à chaque point.`,
  },
  "let-and-net-serve": {
    title: "« Let » et service filet : quand un service est rejoué",
    status: "machine",
    bodyMd: `Un service qui se passe mal n'est pas forcément une faute — dans certaines situations, le point est simplement rejoué, sans pénalité pour le serveur.

**Service filet.** Si la balle touche le filet ou les poteaux et atterrit malgré tout dans le bon carré de service, le service est rejoué — **mais seulement si elle ne touche pas le grillage métallique avant le deuxième rebond**. Si elle le touche, c'est une faute, et non un service à rejouer. C'est une distinction qui se tranche sur le court toutes les semaines et que beaucoup de joueurs ignorent.

Le service est également rejoué si la balle, après avoir touché le filet ou les poteaux, atteint le relanceur ou un élément qu'il porte sur lui.

**« Let » de point.** Le point est intégralement rejoué si le relanceur n'était pas prêt, si un élément étranger au jeu entre sur le court (une balle venue d'un autre court, par exemple), ou si un imprévu indépendant des joueurs interrompt le jeu.

Deux conditions pratiques prennent souvent les joueurs au dépourvu : le « let » doit être demandé **immédiatement** — celui qui continue à jouer perd le droit de le réclamer — et la décision appartient à l'arbitre, qui peut refuser la demande et donner le point pour perdu s'il la juge abusive.

Si le point est rejoué sur le premier service, le serveur conserve ses deux tentatives. Si c'est sur le second service, seule cette seconde tentative est rejouée.`,
  },
  "out-of-court-play": {
    title: "Jouer hors du court : la règle qui rend le padel unique",
    status: "machine",
    bodyMd: `L'une des particularités les plus marquantes du padel est que, sur les courts prévus à cet effet, les joueurs peuvent sortir de l'enceinte fermée pour aller chercher la balle. Mais le jeu extérieur n'est pas permis dans toutes les directions, et c'est là que presque tout le monde se trompe.

Une fois que la balle a correctement rebondi au sol de ton côté, la suite dépend de **par où** elle sort :

- **Par-dessus le mur du fond** : le point est perdu. Il n'y a rien à aller chercher, même si le court dispose d'une zone de sécurité.
- **Par le côté ou par l'ouverture** : là, oui, toi (ou ton partenaire) pouvez sortir de l'enceinte et la renvoyer depuis l'extérieur — à condition que le court dispose d'une « zone de sécurité » autour de lui (un espace minimal sans obstacle) permettant de le faire en toute sécurité. L'échange s'arrête dès que la balle rebondit une deuxième fois ou touche quoi que ce soit d'étranger au court.

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
    bodyMd: `La balle de padel ressemble à une balle de tennis, mais elle est légèrement plus petite et moins gonflée — adaptée à un jeu qui se déroule dans un court fermé, avec de nombreux rebonds contre les murs.

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
- La surface de frappe est perforée de trous cylindriques, en nombre libre. Dans la **zone centrale**, chaque trou doit mesurer entre 9 et 13 mm. Sur une bande allant jusqu'à 4 cm depuis le bord, les trous peuvent être plus grands ou d'une autre forme, jusqu'à 20 mm au maximum.
- Un cordon de sécurité fixé au manche et porté autour du poignet est obligatoire — il empêche la raquette d'être projetée pendant le jeu.
- Elle ne peut comporter aucun dispositif visible ou sonore communiquant des informations au joueur pendant le jeu.`,
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

**Assistance médicale.** En cas de blessure soignable, chaque joueur a droit à une pause médicale de 3 minutes. La limite est ce qui échappe le plus souvent : l'assistance ne peut être accordée qu'**une seule fois par joueur et par affection soignable**, et elle n'est pas transférable au partenaire.

Deux situations se distinguent de la blessure ordinaire : en cas d'accident étranger au jeu — un malaise, une réaction allergique, un vertige, une crise respiratoire — l'arbitre peut accorder jusqu'à 15 minutes ; et dans une circonstance inhabituelle, comme une chute involontaire ou une balle qui frappe un joueur, jusqu'à 5 minutes peuvent être données pour récupérer.

*Note sur le tie-break* : le règlement contient deux dispositions qui ne s'accordent pas — l'une dit que pendant le tie-break le jeu est continu et qu'il n'y a pas de pause au changement de côté, l'autre accorde 20 secondes pour ce changement. En pratique, ce sont les 20 secondes qui s'appliquent.`,
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

Si les équipes oublient de changer de côté, l'erreur est corrigée dès qu'elle est remarquée, en reprenant ensuite le bon ordre — les points déjà gagnés restent valables. Une conséquence pratique est à retenir : si l'erreur n'est remarquée qu'après une première faute de service, le serveur ne dispose plus que de son second service.`,
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
- La balle atterrit dans le bon carré de service et sort directement par l'ouverture, sur un court sans zone de sécurité et donc sans jeu extérieur autorisé.

Une faute sur le premier service donne droit à un second. Deux fautes de suite font perdre le point — et il existe des cas où le serveur ne dispose que d'un seul service au départ, par exemple quand une erreur de changement de côté est corrigée tardivement.`,
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

Un détail important : une fois que la balle a rebondi de ton côté du court, elle reste en jeu même si elle touche ensuite un mur, le grillage métallique, le filet ou les poteaux — tous ces éléments font partie de la zone de jeu, au même titre que le sol.

C'est le deuxième rebond au sol qui met fin à l'échange. Mais ce n'est pas la seule façon de perdre le point pendant que la balle est en jeu : voir « Les façons les plus courantes de perdre un point » pour les autres.`,
  },
  "point-lost": {
    title: "Les façons les plus courantes de perdre un point",
    status: "machine",
    bodyMd: `Le règlement recense de nombreux cas précis, mais les plus courants au quotidien sont :

- La balle rebondit deux fois de ton côté avant que tu ne la renvoies.
- Toi, ta raquette, ou un élément que tu portes touche le filet, les poteaux, le câble de tension ou le court adverse pendant que la balle est en jeu.
- Après avoir frappé la balle, elle touche le grillage métallique ou le sol de ton propre côté, au lieu d'aller vers le court adverse.
- Tu frappes la balle deux fois de suite (double frappe).
- Les deux joueurs d'une même équipe frappent la balle, en même temps ou l'un après l'autre — un seul a le droit de la jouer. **Attention** : il n'y a pas double frappe quand les deux tentent de frapper, que l'un touche la balle et que l'autre touche la raquette de son partenaire.
- La balle en jeu te touche, toi, ton partenaire, ou un élément que vous portez — que tu aies tenté de la renvoyer ou non, et même si elle allait de toute façon sortir du court.
- Tu commets deux fautes de service consécutives.
- Tu laisses tomber ta raquette, ou ton cordon de sécurité se rompt, pendant le point.

Cette liste n'est pas exhaustive — consulte le règlement officiel pour le texte complet.`,
  },
  "correct-return": {
    title: "Ce qui compte comme un retour valable",
    status: "machine",
    bodyMd: `Un retour est valable dans des situations qui surprennent parfois les débutants au padel.

Dans les cas suivants, la balle reste dans l'enceinte et l'échange continue — l'adversaire doit la renvoyer avant son deuxième rebond :

- La balle rebondit au sol de ton côté, revient de ton propre mur, et c'est *là* que tu la frappes — pour l'envoyer dans le court adverse. Attention à l'ordre : **le sol d'abord, le mur ensuite**. Tu ne peux pas envoyer la balle contre ton mur pour lui faire passer le filet ; ça, c'est du squash, pas du padel.
- La balle touche le filet ou les poteaux et atterrit quand même correctement dans le court adverse.
- La balle atterrit exactement dans l'angle où le mur rejoint le sol.

Il existe un cas différent, et souvent mal jugé : la balle rebondit correctement dans le court adverse, puis sort de l'enceinte et touche le plafond, les lumières ou un autre élément étranger au jeu. **Ton retour était valable** — mais cela ne veut pas dire que l'échange continue. La suite dépend de savoir si le court autorise le jeu hors de l'enceinte, et par où la balle est sortie ; voir « Jouer hors du court » et « Les façons les plus courantes de perdre un point ».`,
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

- Après un nombre impair de jeux convenu à l'avance. Pour ce décompte, l'échauffement compte pour **deux jeux** et le tie-break pour **un**.
- Au début de chaque set.
- Jamais juste au début d'un tie-break — dans ce cas, le changement est reporté au début du deuxième jeu du set suivant.

Si une balle est perdue ou endommagée en cours de match, elle est remplacée dès que possible, et le critère dépend de l'ancienneté du dernier changement : pendant les **deux premiers jeux** qui suivent un changement, on remet une balle neuve ; ensuite, une balle usagée d'usure comparable, pour ne favoriser personne.

Le jeu ne peut pas se poursuivre avec **une seule balle** disponible. Avec deux, dans un match qui en prévoit trois, on continue normalement.`,
  },
};
