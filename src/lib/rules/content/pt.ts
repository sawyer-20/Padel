import type { RuleContent } from "../types";

// Conteúdo original (nunca copiado do regulamento oficial) — ver §1.2 e §6.2 do PROJECT.md.
// Estado "machine": ainda não revisto por ninguém com conhecimento de padel.
export const pt: Record<string, RuleContent> = {
  scoring: {
    title: "Como se conta um jogo, um set e uma partida",
    status: "machine",
    bodyMd: `O padel conta pontos da mesma forma que o ténis: o primeiro ponto vale 15, o segundo 30, o terceiro 40, e o quarto ganha o jogo — desde que a diferença seja de pelo menos dois pontos.

Se as duas equipas chegarem a 40-40, chama-se **iguais** (deuce). A partir daí há duas formas de decidir o jogo, e cada torneio escolhe uma no regulamento:

- **Vantagem clássica**: quem ganha o ponto seguinte fica em vantagem; se ganhar outra vez, fecha o jogo, se perder volta-se a iguais.
- **Ponto de ouro (golden point)**: em vez de vantagens sucessivas, joga-se um único ponto decisivo. Quem o ganha, ganha o jogo. É o formato mais usado hoje em dia no padel profissional, porque torna a duração dos jogos mais previsível.

Uma equipa ganha um **set** ao chegar a 6 jogos, com pelo menos 2 de diferença. Se o resultado chegar a 6-6, joga-se um **tie-break** (desempate por pontos, não por jogos) até 7 pontos, com 2 de vantagem.

Uma **partida** ganha-se ao vencer 2 dos 3 sets.`,
  },
  "the-serve": {
    title: "O serviço: como se começa cada ponto",
    status: "machine",
    bodyMd: `Ao contrário do ténis, o serviço no padel é sempre feito por baixo.

Regras principais:

- Quem serve tem de ter pelo menos um pé atrás da linha de serviço, sem a pisar nem ultrapassar a linha central imaginária.
- A bola tem de ser lançada ao chão e batida abaixo da linha da cintura, com pelo menos um pé em contacto com o chão no momento do impacto.
- A bola tem de atravessar a rede na diagonal e cair dentro do quadrado de serviço do adversário, do lado oposto.
- Cada equipa tem direito a duas tentativas por ponto (primeiro e segundo serviço) — se ambas falharem, o ponto é perdido.
- O lado de onde se serve alterna a cada ponto: primeiro serve-se para a esquerda do adversário, depois para a direita, e assim sucessivamente.`,
  },
  "let-and-net-serve": {
    title: "\"Let\" e serviço na rede: quando um serviço se repete",
    status: "machine",
    bodyMd: `Nem todo o serviço que corre mal é uma falta — em certas situações, o ponto simplesmente repete-se, sem penalização para quem serviu.

- **Serviço na rede**: se a bola tocar na rede ou nos postes e, mesmo assim, cair dentro do quadrado de serviço correto, o serviço não conta como falta — repete-se.
- **"Let" (repetição)**: se o adversário não estava pronto para receber, ou se algo alheio ao jogo interrompe o ponto (por exemplo, uma bola de outro campo a entrar em jogo), o ponto repete-se do zero.

Se a repetição acontecer no primeiro serviço, quem serve mantém direito às duas tentativas. Se acontecer no segundo serviço, só se repete essa segunda tentativa.`,
  },
  "out-of-court-play": {
    title: "Jogar fora do campo: a regra que torna o padel único",
    status: "machine",
    bodyMd: `Uma das características mais distintivas do padel é que, em campos preparados para isso, os jogadores podem sair do recinto fechado para ir buscar a bola.

Depois de a bola bater no chão do teu lado, tu (ou o teu par) podem sair pela abertura lateral do campo e devolvê-la de fora, desde que a bola ainda esteja em jogo e o campo tenha uma "zona de segurança" à volta (espaço mínimo sem obstáculos) que permita fazê-lo com segurança.

Não é permitido em todos os campos — depende de haver espaço e aberturas suficientes à volta. Quando é permitido, é uma das jogadas mais espetaculares do padel: ver um jogador sair a correr do campo, devolver a bola por cima da rede e voltar a entrar em jogo.`,
  },
  "court-dimensions": {
    title: "Dimensões do campo",
    status: "machine",
    bodyMd: `O campo de padel é um retângulo com **10 metros de largura por 20 metros de comprimento** (medidas interiores), dividido ao meio por uma rede.

- A rede tem 88 cm de altura no centro, subindo até 92 cm junto aos postes laterais.
- As linhas de serviço ficam a 6,95 metros da rede, de cada lado.
- O campo é totalmente fechado — parte em parede (vidro ou material sólido) e parte em rede metálica, com uma altura total de cerca de 4 metros nos topos.
- A altura livre mínima acima do campo é de 6 metros (recomendam-se 8 metros em instalações novas), sem obstáculos como focos de luz.

Estas medidas garantem que o ressalto da bola nas paredes seja previsível — é essa previsibilidade que permite as trocas de bola contra o vidro que são típicas do padel.`,
  },
  "the-ball": {
    title: "A bola",
    status: "machine",
    bodyMd: `A bola de padel parece-se com a de ténis mas é ligeiramente mais pequena, mais leve e com menos pressão interna — para se adaptar ao facto de o jogo se desenrolar num campo fechado, com muitos ressaltos em paredes.

- Diâmetro entre 6,35 e 6,77 cm.
- Peso entre 56,0 e 59,4 gramas.
- Uma bola nova, largada de 2,54 metros de altura sobre uma superfície dura, deve ressaltar entre 135 e 145 cm.
- Em altitudes acima de 1000 metros, é permitido usar bolas com um ressalto mais baixo (entre 121,92 e 135 cm), porque o ar mais rarefeito faz a bola saltar mais.`,
  },
  "the-racket": {
    title: "A pá",
    status: "machine",
    bodyMd: `A pá de padel não tem cordas — é uma superfície sólida e perfurada, bem diferente de uma raquete de ténis.

- Comprimento total (cabeça + punho) até 45,5 cm.
- Largura máxima de 26 cm e espessura máxima de 38 mm.
- A superfície de impacto é perfurada por furos circulares, normalmente entre 9 e 13 mm de diâmetro na zona central.
- É obrigatório o uso de um cordão de segurança preso ao punho e à volta do pulso — serve para evitar que a pá seja projetada durante o jogo.
- Não pode ter qualquer dispositivo eletrónico visível ou sonoro que comunique informação ao jogador durante o jogo.`,
  },
  times: {
    title: "Tempos e pausas durante a partida",
    status: "machine",
    bodyMd: `O padel tem limites de tempo definidos para manter o ritmo do jogo:

- **Entre pontos**: no máximo 20 segundos.
- **Ao mudar de lado**: até 90 segundos (exceto depois do primeiro jogo de cada set e durante o tie-break, em que não há pausa).
- **No fim de cada set**: até 120 segundos.
- **Antes de começar**: é obrigatório um peloteo de aquecimento de 3 minutos entre as equipas.

Se uma equipa não estiver pronta a jogar 10 minutos depois da hora oficial de início, pode perder o jogo por "walkover" (W.O.), salvo casos de força maior.

Em caso de lesão tratável, cada jogador tem direito a uma pausa médica de 3 minutos, que pode repetir-se nas duas mudanças de lado seguintes, sempre dentro do tempo regulamentar.`,
  },
  "player-positions": {
    title: "Posição dos jogadores em campo",
    status: "machine",
    bodyMd: `Em cada ponto, uma equipa tem um jogador a servir e o outro a acompanhar; a equipa adversária tem um jogador a receber (colocado na diagonal de quem serve) e o outro a acompanhar.

O jogador que recebe pode posicionar-se em qualquer parte do seu lado do campo — não é obrigado a ficar dentro do quadrado de serviço. O mesmo vale para os dois parceiros que não estão diretamente envolvidos no serviço: podem estar onde quiserem, do seu lado da rede.`,
  },
  "choice-of-sides": {
    title: "Sorteio: quem serve primeiro e de que lado",
    status: "machine",
    bodyMd: `Antes de a partida começar, decide-se ao acaso (normalmente por sorteio ou moeda ao ar) quem escolhe primeiro. A equipa que ganha o sorteio pode escolher entre três opções:

- Servir ou receber primeiro (nesse caso, a outra equipa escolhe o lado do campo).
- Escolher o lado do campo para o primeiro jogo (a outra equipa escolhe se serve ou recebe).
- Pedir aos adversários para escolherem primeiro.

Depois de decidido, ambas as equipas informam a arbitragem de quem serve e quem recebe primeiro.`,
  },
  "changes-of-sides": {
    title: "Troca de lados do campo",
    status: "machine",
    bodyMd: `As equipas trocam de lado do campo depois do 1º, do 3º, e de cada jogo ímpar seguinte dentro de um set (ou seja, sempre que a soma dos jogos jogados no set for ímpar).

No tie-break, a troca de lado acontece a cada 6 pontos.

Se as equipas se esquecerem de trocar, corrige-se assim que o erro for detetado, seguindo depois a ordem correta — os pontos já ganhos até aí mantêm-se válidos.`,
  },
  "serve-fault": {
    title: "Quando o serviço é falta",
    status: "machine",
    bodyMd: `O serviço é considerado falta em situações como:

- Não cumprir as regras de posição, altura de impacto ou trajetória descritas em "O serviço".
- O jogador falhar completamente a bola ao tentar servi-la.
- A bola cair fora do quadrado de serviço do adversário (as linhas contam como boas).
- A bola tocar em quem serve, no seu parceiro, ou em algo que estejam a usar ou a transportar.
- A bola bater no quadrado de serviço certo mas depois tocar na rede metálica antes do segundo ressalto.

Tal como em qualquer serviço, há sempre direito a uma segunda tentativa antes de se perder o ponto.`,
  },
  "return-of-serve": {
    title: "Como se recebe o serviço",
    status: "machine",
    bodyMd: `Quem recebe tem de esperar que a bola bata dentro do seu quadrado de serviço e devolvê-la antes do segundo ressalto no chão.

No primeiro jogo de cada set, a equipa que recebe decide qual dos dois jogadores recebe primeiro — essa ordem mantém-se durante todo o set (só pode mudar no início do set seguinte). Se a ordem for trocada por engano a meio de um jogo, continua-se assim até ao fim desse jogo ou tie-break, voltando depois à ordem inicial.

Se a bola tocar num dos jogadores que recebe (ou na respetiva pá) antes de ressaltar, o ponto é automaticamente da equipa que serviu.`,
  },
  interference: {
    title: "Interferência entre jogadores",
    status: "machine",
    bodyMd: `Interferência é quando um jogador — de forma deliberada ou involuntária — atrapalha o adversário a executar um golpe.

- Se for **deliberada**, o ponto vai automaticamente para a equipa adversária.
- Se for **involuntária**, repete-se o ponto ("let").
- Se a mesma equipa causar uma segunda interferência involuntária, perde o ponto em disputa.`,
  },
  "ball-in-play": {
    title: "Quando é que a bola está \"em jogo\"",
    status: "machine",
    bodyMd: `A bola está em jogo desde o momento em que um serviço válido é executado até se decidir o ponto (por "let" ou por um resultado claro).

Um detalhe importante: depois de a bola ressaltar do teu lado do campo, ela continua em jogo mesmo que toque numa parede, na rede metálica, na rede central ou nos postes — todos estes elementos fazem parte da área de jogo, tal como o chão. Só se perde o ponto se a bola ressaltar uma segunda vez antes de a devolveres.`,
  },
  "point-lost": {
    title: "Formas mais comuns de perder um ponto",
    status: "machine",
    bodyMd: `O regulamento lista muitas situações específicas, mas as mais comuns no dia a dia são:

- A bola ressalta duas vezes no teu lado antes de a devolveres.
- Tu, a tua pá, ou algo que estejas a usar toca na rede, nos postes, no cabo de tensão ou no campo do adversário enquanto a bola está em jogo.
- Depois de bateres na bola, ela toca na rede metálica ou no chão do teu próprio lado, em vez de ir para o campo do adversário.
- Bates na bola duas vezes seguidas (contacto duplo).
- A bola toca em ti, no teu parceiro, ou em algo que estejam a usar, depois de teres tentado devolvê-la.
- Serves e falhas duas vezes seguidas.
- Deixas cair a pá ou o cordão de segurança parte-se durante o ponto.

Esta lista não é exaustiva — para o texto completo, consulta o regulamento oficial.`,
  },
  "correct-return": {
    title: "O que conta como devolução válida",
    status: "machine",
    bodyMd: `Uma devolução é válida em situações que por vezes surpreendem quem começa a jogar padel, como:

- A bola bate primeiro na parede do teu próprio lado e só depois segue para o campo do adversário.
- A bola toca na rede ou nos postes e ainda assim cai corretamente no campo adversário.
- Depois de bater corretamente no campo do adversário, a bola sai do campo, bate no teto, nas luzes ou noutro elemento alheio ao jogo — a jogada continua válida.
- A bola bate no canto exato onde a parede encontra o chão.

Em todos estes casos, a jogada continua e o adversário tem de devolver a bola antes do segundo ressalto.`,
  },
  "point-won": {
    title: "Formas menos óbvias de ganhar um ponto",
    status: "machine",
    bodyMd: `Para além de o adversário falhar a devolução, há duas situações específicas do padel em que se ganha o ponto de forma imediata:

- A bola, depois de ressaltar corretamente no campo do adversário, sai por um buraco da rede metálica ou fica presa nele.
- A bola fica presa na superfície plana no topo da parede, depois de ressaltar corretamente no campo do adversário.`,
  },
  "change-of-balls": {
    title: "Troca de bolas durante o torneio",
    status: "machine",
    bodyMd: `Antes de cada competição, a organização tem de anunciar com antecedência: a marca e tipo de bolas, quantas serão usadas por jogo (normalmente 2 ou 3), e a política de troca (se existir).

Quando há troca programada, costuma acontecer:

- Depois de um número ímpar de jogos combinado antecipadamente.
- No início de cada set.
- Nunca logo no início de um tie-break — nesse caso, a troca passa para o início do segundo jogo do set seguinte.

Se uma bola se perder ou danificar a meio de uma partida, é substituída de imediato — o jogo nunca continua com menos bolas do que o combinado.`,
  },
};
