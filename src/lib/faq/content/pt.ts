import type { FaqContent } from "../types";

// Conteúdo original, escrito com base em conhecimento geral e estabelecido de padel
// (não copiado de blogues nem canais existentes — ver §3/§4 do PROJECT.md).
// Estado "machine": ainda não revisto por ninguém com conhecimento de padel.
export const pt: Record<string, FaqContent> = {
  "how-many-players": {
    question: "Quantas pessoas são precisas para jogar padel?",
    status: "machine",
    answerMd:
      "Quatro: o padel joga-se a pares, dois de cada lado da rede. Existem campos de singulares, mais estreitos, mas o jogo de competição e o regulamento oficial são de pares.\n\nÉ por isso que quase tudo no padel acaba por ser uma questão de coordenação: onde está o teu parceiro, quem cobre o meio, quem sobe à rede. Num campo fechado e pequeno, dois jogadores desalinhados deixam buracos que o adversário encontra depressa.",
  },
  "padel-vs-tennis": {
    question: "Em que é que o padel é diferente do ténis?",
    status: "machine",
    answerMd:
      "A contagem dos pontos é quase a mesma — muda o 40-40, onde o padel profissional joga um ponto de ouro em vez de vantagens. Quase tudo o resto é diferente:\n\n- **As paredes fazem parte do jogo.** A bola pode ressaltar no vidro e continuar viva — no ténis seria ponto perdido.\n- **O campo é fechado e mais pequeno**, e joga-se sempre a pares.\n- **O serviço é por baixo**, com um ressalto no chão antes de bater na bola. Não há aces a 200 km/h.\n- **A pá é rígida e sem cordas**, perfurada e mais curta do que uma raquete.\n\nO resultado prático: os pontos duram mais e ganham-se com posição e paciência, não com potência.",
  },
  "need-tennis-experience": {
    question: "Preciso de saber jogar ténis para começar padel?",
    status: "machine",
    answerMd:
      "Não. O padel é dos desportos de raquete mais fáceis de começar: o campo é pequeno, a pá é curta e as paredes dão-te uma segunda oportunidade em bolas que noutro desporto já estavam perdidas.\n\nVir do ténis ajuda a ler a bola, mas traz dois hábitos que atrapalham: **movimentos de braço demasiado longos** — no padel não há espaço para eles — e **recuar quando a bola vai alta**, em vez de a esperar junto à rede e responder com uma bandeja. Quem nunca jogou ténis não tem esses hábitos para desfazer.",
  },
  "which-side": {
    question: "Devo jogar do lado direito ou do lado esquerdo?",
    status: "machine",
    answerMd:
      "É uma convenção, não uma regra — podes jogar de qualquer lado. Na prática, as duplas costumam repartir assim:\n\n- **Direita:** quem dá continuidade ao ponto, com jogo regular e poucos erros.\n- **Esquerda:** quem fecha os pontos, porque muitas bolas altas caem para esse lado e é de lá que costumam sair os remates.\n\nSe estás a começar, joga dos dois. Só depois de umas semanas é que vais perceber de que lado te sentes mais útil — e essa resposta muda conforme o parceiro com quem jogas.",
  },
  scoring: {
    question: "Como se conta o resultado no padel?",
    status: "machine",
    answerMd:
      "Como no ténis, com uma diferença importante. Cada ponto vale 15, 30, 40 e jogo. Os jogos formam sets: ganha o set quem chegar a seis jogos com dois de vantagem, e aos 6-6 joga-se um tie-break. As partidas são normalmente à melhor de três sets.\n\nO que muda é o 40-40. O ténis joga vantagens até alguém abrir dois pontos; o padel profissional joga hoje quase sempre o **ponto de ouro** — um único ponto decisivo, e quem o ganha ganha o jogo. Se estiveres a ver um torneio do circuito e o jogo terminar de repente num 40-40, foi isto que aconteceu.\n\nA regra completa, com o artigo oficial da FIP, está na secção de Regras.",
  },
  "walls-in-play": {
    question: "Posso jogar a bola depois de ela bater na parede?",
    status: "machine",
    answerMd:
      "Sim — desde que a bola tenha ressaltado primeiro no chão do teu campo. A ordem é essa e não pode ser trocada: **chão e depois parede**. Se a bola bater diretamente na tua parede sem tocar no chão, o ponto é do adversário.\n\nDepois do ressalto no chão, a bola pode bater no vidro, na rede metálica, ou em ambos, e continua em jogo até saltar uma segunda vez no chão. Aprender a esperar por esse ressalto em vez de fugir dele é a diferença mais visível entre quem começou ontem e quem já joga há uns meses.",
  },
  "ball-out-of-court": {
    question: "A bola pode sair do campo e o ponto continuar?",
    status: "machine",
    answerMd:
      "Pode, mas depende de **por onde** ela sai — e é aqui que quase toda a gente se engana.\n\nSe sair **pela lateral ou pela porta** depois de ressaltar no teu campo, tens o direito de sair do recinto, jogá-la de fora e devolvê-la para dentro, desde que não tenha saltado uma segunda vez no chão nem tocado em nada alheio ao campo.\n\nSe sair **por cima da parede de fundo**, o ponto está perdido. O regulamento não autoriza jogo exterior nesse caso, mesmo que o campo tenha zona de segurança.\n\nE nada disto é possível em campos totalmente fechados: aí, a bola que sai é ponto ganho para quem a mandou.",
  },
  "first-equipment": {
    question: "Que material preciso para a primeira aula?",
    status: "machine",
    answerMd:
      "Menos do que se pensa:\n\n- **Pá** — a maioria dos clubes empresta ou aluga nas primeiras vezes. Não compres antes de perceber se gostas. Confirma só que traz **cordão de pulso**: o regulamento exige-o, e se ele se partir a meio de um ponto — ou se a pá te fugir da mão — perdes esse ponto.\n- **Bolas** — normalmente incluídas na aula.\n- **Sapatilhas** — as de ténis ou de padel servem; o que interessa é a sola com aderência lateral. Sapatilhas de corrida são a escolha errada, porque a sola é feita para ir em frente e o padel é feito de travagens de lado.\n- **Roupa desportiva confortável** e água.\n\nA ordem certa das compras é sapatilhas primeiro, pá depois.",
  },
  "choosing-first-racket": {
    question: "Como escolho a minha primeira pá?",
    status: "machine",
    answerMd:
      "Para começar, procura uma pá **redonda**. A forma determina onde fica o ponto ideal de impacto:\n\n- **Redonda** — ponto ideal ao centro e maior, perdoa impactos descentrados. É a forma indicada para quem começa.\n- **Lágrima** — equilíbrio entre controlo e potência.\n- **Diamante** — ponto ideal alto e pequeno, dá mais potência mas castiga qualquer imprecisão. Não é uma pá para as primeiras semanas.\n\nProcura também uma pá mais leve e com núcleo macio: cansa menos o braço e é mais confortável no impacto. As dimensões e os materiais estão fixados no regulamento oficial, mas isso não quer dizer que tudo o que está à venda esteja conforme: em competição federada só se pode usar material homologado. Para aulas e jogos entre amigos não te preocupes com isso — quando começares a inscrever-te em provas, confirma antes de comprar.",
  },
  "padel-balls": {
    question: "As bolas de padel são iguais às de ténis?",
    status: "machine",
    answerMd:
      "Parecem iguais e não são a mesma coisa. O regulamento da FIP define os valores da bola de padel: diâmetro entre 6,35 e 6,77 cm, peso entre 56,0 e 59,4 gramas, e um ressalto entre 135 e 145 cm quando largada de 2,54 metros sobre superfície dura.\n\nNa prática, quem joga nota a diferença sobretudo no ressalto e na duração: uma bola de padel perde pressão depressa, e uma bola morta muda o jogo mais do que se imagina. Em altitude acima dos 1000 metros o regulamento admite bolas com ressalto mais baixo, porque o ar mais rarefeito as faz saltar mais.",
  },
  "national-ranking": {
    question: "Onde vejo o ranking nacional português?",
    status: "machine",
    answerMd:
      "O ranking nacional é da Federação Portuguesa de Padel e vive na plataforma que a federação usa para gerir competições. Chegas lá pela [página de rankings da FPP](https://fppadel.pt/rankings/).\n\n**Aqui não o reproduzimos**, e a razão é concreta: essa plataforma reserva expressamente os direitos sobre os seus dados ao abrigo do artigo 4.º da diretiva europeia sobre prospeção de textos e dados. É uma recusa escrita, e respeitamo-la.\n\nO que encontras neste site é o ranking do circuito profissional internacional (FIP) — outra coisa. Um jogador português aparece nessa lista pela posição mundial, que não é a mesma que a posição no ranking nacional.",
  },
  "amateur-tournaments": {
    question: "Onde encontro torneios amadores em Portugal?",
    status: "machine",
    answerMd:
      "Não estão neste site, e vale a pena explicar porquê.\n\nO calendário que aqui vês é o do circuito profissional internacional, incluindo as provas que se realizam em Portugal. Os torneios de clube correm noutros sítios:\n\n- **[PadelTeams](https://padelteams.pt)** — a plataforma onde muitos clubes portugueses gerem e publicam as suas competições.\n- **[Torneios da FPP](https://fppadel.pt/sobre-a-federacao/torneios/)** — as provas federadas.\n- **As redes sociais dos clubes**, onde muitos torneios são anunciados e mais nada.\n\nNão copiamos esses calendários para aqui porque quem os aloja não o autoriza. Mandamos-te para eles, que é o que nos parece justo — e poupa-te a procurar às cegas.",
  },
};
