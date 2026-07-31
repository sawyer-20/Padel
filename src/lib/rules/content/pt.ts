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
};
