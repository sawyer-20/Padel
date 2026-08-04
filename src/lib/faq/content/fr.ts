import type { FaqContent } from "../types";

// Contenu original, écrit à partir de connaissances générales et établies du padel
// (jamais copié de blogs ni de chaînes existantes — voir PROJECT.md §3/§4).
// Statut « machine » : pas encore relu par quelqu'un qui connaît le padel.
export const fr: Record<string, FaqContent> = {
  "how-many-players": {
    question: "Combien de personnes faut-il pour jouer au padel ?",
    status: "machine",
    answerMd:
      "Quatre : le padel se joue en double, deux de chaque côté du filet. Il existe des terrains de simple, plus étroits, mais le jeu de compétition et le règlement officiel sont en double.\n\nC'est pour cela que presque tout au padel finit par être une question de coordination : où est ton partenaire, qui couvre le milieu, qui monte au filet. Sur un terrain fermé et petit, deux joueurs désaccordés laissent des trous que l'adversaire trouve vite.",
  },
  "padel-vs-tennis": {
    question: "En quoi le padel est-il différent du tennis ?",
    status: "machine",
    answerMd:
      "Le décompte des points est identique. Presque tout le reste change :\n\n- **Les murs font partie du jeu.** La balle peut rebondir sur la vitre et rester vivante — au tennis, ce serait un point perdu.\n- **Le terrain est fermé et plus petit**, et on joue toujours en double.\n- **Le service se fait par en dessous**, en faisant rebondir la balle au sol avant de la frapper. Pas d'aces à 200 km/h.\n- **La raquette est rigide et sans cordage**, perforée et plus courte qu'une raquette de tennis.\n\nRésultat concret : les points durent plus longtemps et se gagnent par le placement et la patience, pas par la puissance.",
  },
  "need-tennis-experience": {
    question: "Faut-il savoir jouer au tennis pour débuter le padel ?",
    status: "machine",
    answerMd:
      "Non. Le padel est l'un des sports de raquette les plus faciles à commencer : le terrain est petit, la raquette est courte et les murs offrent une deuxième chance sur des balles qui seraient déjà perdues ailleurs.\n\nVenir du tennis aide à lire la balle, mais apporte deux habitudes gênantes : **des mouvements de bras beaucoup trop longs** — il n'y a pas la place au padel — et **reculer quand la balle monte**, au lieu de l'attendre près du filet et de répondre par une bandeja. Qui n'a jamais joué au tennis n'a aucune de ces habitudes à défaire.",
  },
  "which-side": {
    question: "Dois-je jouer côté droit ou côté gauche ?",
    status: "machine",
    answerMd:
      "C'est une convention, pas une règle — tu peux jouer des deux côtés. En pratique, les paires se répartissent souvent ainsi :\n\n- **Droite :** celui qui fait vivre le point, avec un jeu régulier et peu de fautes.\n- **Gauche :** celui qui conclut, parce que beaucoup de balles hautes tombent de ce côté et que les smashes en partent le plus souvent.\n\nSi tu débutes, joue des deux côtés. Ce n'est qu'après quelques semaines que tu sauras où tu es le plus utile — et la réponse change selon le partenaire.",
  },
  scoring: {
    question: "Comment compte-t-on les points au padel ?",
    status: "machine",
    answerMd:
      "Exactement comme au tennis. Les points vont 15, 30, 40 et jeu, avec deux points d'écart à partir de 40-40. Les jeux forment des sets : on gagne le set en atteignant six jeux avec deux d'avance, et à 6-6 on joue un tie-break. Les matchs se disputent normalement au meilleur des trois sets.\n\nLa règle complète, avec l'article officiel de la FIP, se trouve dans la section Règles.",
  },
  "walls-in-play": {
    question: "Puis-je jouer la balle après qu'elle a touché le mur ?",
    status: "machine",
    answerMd:
      "Oui — à condition que la balle ait d'abord rebondi au sol de ton côté. L'ordre compte et ne peut pas être inversé : **sol puis mur**. Si la balle frappe ton mur directement sans toucher le sol, le point est pour l'adversaire.\n\nAprès ce premier rebond, la balle peut toucher la vitre, le grillage, ou les deux, et reste en jeu jusqu'à un second rebond au sol. Apprendre à attendre ce rebond au lieu de le fuir est la différence la plus visible entre quelqu'un qui a commencé hier et quelqu'un qui joue depuis quelques mois.",
  },
  "ball-out-of-court": {
    question: "La balle peut-elle sortir du terrain et le point continuer ?",
    status: "machine",
    answerMd:
      "Oui. Si la balle sort de l'enceinte après avoir rebondi dans ton camp, tu as le droit de sortir par l'ouverture latérale, de la jouer depuis l'extérieur et de la renvoyer à l'intérieur — tant qu'elle n'a pas rebondi une seconde fois au sol.\n\nC'est l'un des moments les plus spectaculaires du padel, et cela dépend du terrain : ce n'est possible que là où il existe des ouvertures latérales. Sur les terrains entièrement fermés, une balle qui sort est un point gagné pour celui qui l'a frappée.",
  },
  "first-equipment": {
    question: "De quel matériel ai-je besoin pour mon premier cours ?",
    status: "machine",
    answerMd:
      "Moins qu'on ne le croit :\n\n- **Une raquette** — la plupart des clubs en prêtent ou en louent les premières fois. N'achète pas avant de savoir si le sport te plaît.\n- **Des balles** — généralement incluses dans le cours.\n- **Des chaussures** — celles de tennis ou de padel conviennent ; ce qui compte, c'est une semelle avec de l'accroche latérale. Les chaussures de running sont le mauvais choix, car leur semelle est faite pour aller devant, alors que le padel est fait de freinages latéraux.\n- **Une tenue de sport confortable** et de l'eau.\n\nLe bon ordre d'achat : les chaussures d'abord, la raquette ensuite.",
  },
  "choosing-first-racket": {
    question: "Comment choisir ma première raquette ?",
    status: "machine",
    answerMd:
      "Pour commencer, cherche une raquette **ronde**. La forme détermine où se situe la zone de frappe idéale :\n\n- **Ronde** — zone idéale au centre et plus grande, elle pardonne les frappes décentrées. C'est la forme conseillée aux débutants.\n- **Goutte d'eau** — un équilibre entre contrôle et puissance.\n- **Diamant** — zone idéale haute et petite, plus de puissance mais elle punit la moindre imprécision. Ce n'est pas une raquette pour les premières semaines.\n\nCherche aussi une raquette plus légère, à noyau souple : elle fatigue moins le bras et est plus confortable à l'impact. Les dimensions maximales sont fixées par le règlement officiel, donc aucune raquette en vente ne donne un avantage illégal — la différence tient à la forme, au poids et aux matériaux.",
  },
  "padel-balls": {
    question: "Les balles de padel sont-elles identiques à celles de tennis ?",
    status: "machine",
    answerMd:
      "Elles se ressemblent, mais non. La balle de padel a une pression interne plus faible, ce qui lui donne un rebond plus bas et un jeu plus contrôlé — indispensable sur un petit terrain où elle rebondit en plus sur les murs.\n\nJouer avec des balles de tennis sur un terrain de padel rend le jeu trop rapide et imprévisible. Les tolérances de poids, de diamètre et de rebond sont définies dans le règlement officiel.",
  },
  "national-ranking": {
    question: "Où voir le classement national portugais ?",
    status: "machine",
    answerMd:
      "Le classement national appartient à la Fédération portugaise de padel et se trouve sur la plateforme qu'elle utilise pour gérer ses compétitions. On y accède depuis la [page des classements de la FPP](https://fppadel.pt/rankings/).\n\n**Nous ne le reproduisons pas ici**, pour une raison précise : cette plateforme réserve expressément les droits sur ses données au titre de l'article 4 de la directive européenne sur la fouille de textes et de données. C'est un refus écrit, et nous le respectons.\n\nCe que tu trouves sur ce site, c'est le classement du circuit professionnel international (FIP) — autre chose. Un joueur portugais y figure par sa position mondiale, qui n'est pas sa position au classement national.",
  },
  "amateur-tournaments": {
    question: "Où trouver les tournois amateurs au Portugal ?",
    status: "machine",
    answerMd:
      "Pas sur ce site, et il vaut la peine d'expliquer pourquoi.\n\nLe calendrier présenté ici est celui du circuit professionnel international, y compris les épreuves disputées au Portugal. Les tournois de club se jouent ailleurs :\n\n- **[PadelTeams](https://padelteams.pt)** — la plateforme utilisée par de nombreux clubs portugais pour gérer et publier leurs compétitions.\n- **[Tournois de la FPP](https://fppadel.pt/sobre-a-federacao/torneios/)** — les épreuves fédérales.\n- **Les réseaux sociaux des clubs**, où beaucoup de tournois sont annoncés et nulle part ailleurs.\n\nNous ne copions pas ces calendriers ici parce que ceux qui les hébergent ne l'autorisent pas. Nous t'y envoyons, ce qui nous paraît juste — et t'évite de chercher à l'aveugle.",
  },
};
