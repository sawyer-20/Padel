import type { RuleContent } from "../types";

// Conteúdo original (nunca copiado do regulamento oficial) — ver §1.2 e §6.2 do PROJECT.md.
// Estado "machine": ainda não revisto por ninguém com conhecimento de padel.
export const pt: Record<string, RuleContent> = {
  scoring: {
    title: "Como se conta um jogo, um set e uma partida",
    status: "machine",
    bodyMd: `O padel conta pontos da mesma forma que o ténis: o primeiro ponto vale 15, o segundo 30, o terceiro 40, e o quarto ganha o jogo — desde que a diferença seja de pelo menos dois pontos.

Se as duas equipas chegarem a 40-40, chama-se **iguais** (deuce). A partir daí o regulamento prevê três formas de decidir o jogo, e cada torneio escolhe uma:

- **Vantagem clássica**: quem ganha o ponto seguinte fica em vantagem; se ganhar outra vez, fecha o jogo, se perder volta-se a iguais.
- **Ponto estrela**: joga-se com vantagens até se chegar a iguais pela terceira vez; aí, o ponto seguinte decide o jogo.
- **Ponto de ouro (golden point)**: em vez de vantagens sucessivas, joga-se um único ponto decisivo. Quem o ganha, ganha o jogo. É o formato mais usado hoje em dia no padel profissional, porque torna a duração dos jogos mais previsível.

No ponto decisivo — seja de ouro ou estrela — há duas regras que geram muita discussão em campo:

- É a **dupla que recebe** que escolhe de que lado vai receber, mas os dois jogadores **não podem trocar de posição** entre si para o fazer.
- Em provas mistas, quem recebe o ponto decisivo tem de ser **do mesmo sexo de quem serve**.

Uma equipa ganha um **set** ao chegar a 6 jogos, com pelo menos 2 de diferença. Se o resultado chegar a 6-6, joga-se um **tie-break** (desempate por pontos, não por jogos) até 7 pontos, com 2 de vantagem.

O formato mais comum de **partida** é ganhar 2 dos 3 sets, mas o regulamento admite alternativas que uma prova pode adotar: sets curtos de 4 jogos, um tie-break normal a substituir o terceiro set, ou um **super tie-break de 10 pontos** no lugar do terceiro set — este último é hoje corrente em competição amadora.`,
  },
  "the-serve": {
    title: "O serviço: como se começa cada ponto",
    status: "machine",
    bodyMd: `Ao contrário do ténis, o serviço no padel é sempre feito por baixo.

Regras principais:

- Quem serve tem de ter pelo menos um pé atrás da linha de serviço, no espaço entre o prolongamento imaginário da linha central e a parede lateral — e tem de se manter aí até o serviço estar feito.
- A bola tem de ressaltar no chão antes de ser batida, e esse ressalto tem de acontecer dentro do quadrado a partir do qual se está a servir. A bola não pode passar a linha de serviço nem a linha central antes do impacto.
- O impacto tem de acontecer **à altura da cintura ou abaixo dela**, com pelo menos um pé em contacto com o chão nesse momento.
- A bola tem de atravessar a rede na diagonal e cair dentro do quadrado de serviço do adversário, do lado oposto.
- Cada equipa tem direito a duas tentativas por ponto (primeiro e segundo serviço) — se ambas falharem, o ponto é perdido.
- O primeiro serviço de cada jogo faz-se do lado direito do campo de quem serve, e o lado alterna a cada ponto.`,
  },
  "let-and-net-serve": {
    title: "\"Let\" e serviço na rede: quando um serviço se repete",
    status: "machine",
    bodyMd: `Nem todo o serviço que corre mal é uma falta — em certas situações, o ponto simplesmente repete-se, sem penalização para quem serviu.

**Serviço na rede.** Se a bola tocar na rede ou nos postes e ainda assim cair dentro do quadrado de serviço correto, repete-se — **mas só se não tocar na rede metálica antes do segundo ressalto**. Se tocar, é falta, e não repetição. É uma distinção que se decide em campo todas as semanas e que muita gente desconhece.

Também se repete o serviço se a bola, depois de tocar na rede ou nos postes, acertar em quem recebe ou em algo que ele traga consigo.

**"Let" de ponto.** O ponto repete-se do zero quando quem recebe não estava pronto, quando entra no campo algo que não faz parte do jogo (uma bola de outro campo, por exemplo), ou quando qualquer imprevisto alheio aos jogadores interrompe a partida.

Duas condições práticas que costumam apanhar as pessoas desprevenidas: o "let" tem de ser pedido **de imediato** — quem continua a jogar perde o direito de o reclamar — e a decisão é do árbitro, que pode recusar o pedido e dar o ponto por perdido se o considerar indevido.

Se a repetição acontecer no primeiro serviço, quem serve mantém direito às duas tentativas. Se acontecer no segundo serviço, só se repete essa segunda tentativa.`,
  },
  "out-of-court-play": {
    title: "Jogar fora do campo: a regra que torna o padel única",
    status: "machine",
    bodyMd: `Uma das características mais distintivas do padel é que, em campos preparados para isso, os jogadores podem sair do recinto fechado para ir buscar a bola. Mas a jogada não é permitida em todas as direções, e é aí que quase toda a gente se engana.

Depois de a bola ressaltar corretamente no chão do teu lado, o que acontece a seguir depende de **por onde** ela sai:

- **Por cima da parede de fundo**: o ponto está perdido. Não há nada a ir buscar, mesmo que o campo tenha zona de segurança.
- **Pela lateral ou pela porta**: aí sim, tu (ou o teu par) podem sair do recinto e devolvê-la de fora — desde que o campo tenha uma "zona de segurança" à volta que o permita fazer com segurança. A jogada acaba assim que a bola ressalte uma segunda vez ou toque em qualquer coisa alheia ao campo.

Nem todos os campos o permitem: depende de haver espaço e aberturas suficientes à volta. Quando é possível, é uma das jogadas mais espetaculares do padel — ver um jogador sair a correr do campo, devolver a bola por cima da rede e voltar a entrar em jogo.`,
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
    bodyMd: `A bola de padel parece-se com a de ténis, mas tem especificações próprias — adaptadas a um jogo que decorre num campo fechado, com muitos ressaltos em paredes.

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
- A superfície de impacto é perfurada por furos cilíndricos, em número livre. Na **zona central** cada furo tem de medir entre 9 e 13 mm. Numa faixa de até 4 cm a contar da borda, os furos podem ser maiores ou ter outra forma, até um máximo de 20 mm.
- É obrigatório o uso de um cordão de segurança preso ao punho e à volta do pulso — serve para evitar que a pá seja projetada durante o jogo.
- Não pode ter qualquer dispositivo visível ou sonoro que comunique informação ao jogador durante o jogo.`,
  },
  times: {
    title: "Tempos e pausas durante a partida",
    status: "machine",
    bodyMd: `O padel tem limites de tempo definidos para manter o ritmo do jogo:

- **Entre pontos**: no máximo 20 segundos.
- **Ao mudar de lado**: até 90 segundos (exceto depois do primeiro jogo de cada set e durante o tie-break, em que o jogo é contínuo).
- **No fim de cada set**: até 120 segundos.
- **Antes de começar**: é obrigatório um peloteo de aquecimento de 3 minutos entre as equipas.

Se uma equipa não estiver pronta a jogar 10 minutos depois da hora oficial de início, pode perder o jogo por "walkover" (W.O.), salvo casos de força maior.

**Assistência médica.** Em caso de lesão tratável, cada jogador tem direito a uma pausa médica de 3 minutos. O limite é o que costuma escapar: a assistência só pode ser dada **uma vez a cada jogador e por cada condição tratável**, e não é transferível para o parceiro.

Há ainda duas situações distintas da lesão comum: se acontecer um acidente que não decorre do jogo — um desmaio, uma reação alérgica, uma tontura, uma crise respiratória — o árbitro pode conceder até 15 minutos; e numa circunstância invulgar, como uma queda involuntária ou uma bola que acerta num jogador, podem ser dados até 5 minutos para recuperar.

*Nota sobre o tie-break*: o regulamento tem duas disposições que não encaixam uma na outra — uma diz que durante o tie-break o jogo é contínuo e não há pausa na troca de lados, outra concede 20 segundos para essa troca. Na prática seguem-se os 20 segundos.`,
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

Se as equipas se esquecerem de trocar, corrige-se assim que o erro for detetado, seguindo depois a ordem correta — os pontos já ganhos até aí mantêm-se válidos. Há uma consequência prática a reter: se o erro só se der por ele depois de um primeiro serviço falhado, quem serve fica apenas com o segundo serviço.`,
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
- A bola bater no quadrado de serviço certo e sair diretamente pela porta, num campo sem zona de segurança e portanto sem jogo exterior autorizado.

Uma falta no primeiro serviço dá direito a um segundo. Duas faltas seguidas perdem o ponto — e há casos em que o servidor tem apenas um serviço à partida, como quando se corrige tardiamente um erro de troca de lados.`,
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

Um detalhe importante: depois de a bola ressaltar do teu lado do campo, ela continua em jogo mesmo que toque numa parede, na rede metálica, na rede central ou nos postes — todos estes elementos fazem parte da área de jogo, tal como o chão.

O segundo ressalto no chão é o que termina a jogada. Mas não é a única forma de perder o ponto enquanto a bola está em jogo: consulta "Formas mais comuns de perder um ponto" para as restantes.`,
  },
  "point-lost": {
    title: "Formas mais comuns de perder um ponto",
    status: "machine",
    bodyMd: `O regulamento lista muitas situações específicas, mas as mais comuns no dia a dia são:

- A bola ressalta duas vezes no teu lado antes de a devolveres.
- Tu, a tua pá, ou algo que estejas a usar toca na rede, nos postes, no cabo de tensão ou no campo do adversário enquanto a bola está em jogo.
- Depois de bateres na bola, ela toca na rede metálica ou no chão do teu próprio lado, em vez de ir para o campo do adversário.
- Bates na bola duas vezes seguidas (contacto duplo).
- Os dois jogadores da mesma equipa batem na bola, ao mesmo tempo ou um a seguir ao outro — só um pode jogá-la. **Atenção**: não conta como duplo toque o caso em que ambos tentam bater, um acerta na bola e o outro acerta na pá do companheiro.
- A bola em jogo toca em ti, no teu parceiro, ou em algo que estejam a usar — tenhas tentado devolvê-la ou não, e mesmo que ela já fosse a sair do campo.
- Serves e falhas duas vezes seguidas.
- Deixas cair a pá ou o cordão de segurança parte-se durante o ponto.

Esta lista não é exaustiva — para o texto completo, consulta o regulamento oficial.`,
  },
  "correct-return": {
    title: "O que conta como devolução válida",
    status: "machine",
    bodyMd: `Uma devolução é válida em situações que por vezes surpreendem quem começa a jogar padel.

Nestes casos a bola fica dentro do recinto e a jogada prossegue — o adversário tem de a devolver antes do segundo ressalto:

- A bola ressalta no chão do teu lado, bate na tua própria parede, e é aí que lhe bates — mandando-a para o campo do adversário. Repara na ordem: **chão primeiro, parede depois**. Não podes mandar a bola contra a tua parede para a fazer passar a rede; isso é squash, não padel.
- A bola toca na rede ou nos postes e ainda assim cai corretamente no campo adversário.
- A bola bate no canto exato onde a parede encontra o chão.

Há ainda um caso diferente, e que costuma ser mal contado: quando a bola ressalta corretamente no campo do adversário e só depois sai do recinto, batendo no teto, nas luzes ou noutro elemento alheio ao jogo. **A tua devolução foi válida** — mas isso não significa que a jogada continue. O que acontece a seguir depende de o campo permitir ou não jogo fora do recinto, e por onde a bola saiu; vê "Jogar fora do campo" e "Formas mais comuns de perder um ponto".`,
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

- Depois de um número ímpar de jogos combinado antecipadamente. Para esta contagem, o aquecimento conta como **dois jogos** e o tie-break como **um**.
- No início de cada set.
- Nunca logo no início de um tie-break — nesse caso, a troca passa para o início do segundo jogo do set seguinte.

Se uma bola se perder ou danificar a meio de uma partida, é substituída logo que possível, e o critério depende de há quanto tempo houve troca: nos **dois primeiros jogos** após uma troca repõe-se com uma bola nova; a partir daí, com uma bola usada de desgaste semelhante, para não dar vantagem a ninguém.

O jogo não pode prosseguir com **apenas uma bola** disponível. Com duas, num jogo de três, continua-se normalmente.`,
  },
};
