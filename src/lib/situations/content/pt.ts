import type { SituationContent } from "../types";

// Conteúdo original (nunca copiado do regulamento oficial) — ver §1.2 e §6.2 do PROJECT.md.
// Estado "machine": ainda não revisto por ninguém com conhecimento de padel.
export const pt: Record<string, SituationContent> = {
  "wall-bounce-still-in-play": {
    question: "A bola bateu na parede do meu lado depois de saltar no chão — ainda a posso devolver?",
    status: "machine",
    answerMd:
      "Sim. No padel, depois de a bola saltar no teu campo, ela pode continuar em jogo mesmo que bata numa parede ou na rede metálica à volta do campo — as paredes fazem parte da área de jogo, tal como o chão. O que termina a jogada é a bola saltar uma **segunda vez** no chão antes de a devolveres.",
  },
  "net-touch-on-serve": {
    question: "O serviço tocou na rede e mesmo assim caiu no quadrado certo — é falta?",
    status: "machine",
    answerMd:
      "Não, desde que a bola não toque na rede metálica antes do segundo ressalto. Se tocar na rede ou nos postes, cair dentro do quadrado correto e ficar por aí, o serviço repete-se sem penalização. Mas se, depois de cair no quadrado, for bater na rede metálica antes de saltar segunda vez, aí é falta — e não repetição.",
  },
  "ball-out-over-end-wall": {
    question: "Depois de bater corretamente no meu campo, a bola saiu por cima da parede do fundo — o ponto já está decidido?",
    status: "machine",
    answerMd:
      'Sim, está decidido: perdeste o ponto. A saída **por cima da parede de fundo** é o caso em que o regulamento não autoriza jogo exterior, mesmo que o campo tenha zona de segurança — não há nada a ir buscar.\n\nÉ diferente se a bola sair **pela lateral ou pela porta**: aí sim, num campo com zona de segurança, és **tu** que podes sair a correr e devolvê-la de fora, porque a bola ressaltou do teu lado e é tua a devolução. Essa jogada acaba se a bola saltar uma segunda vez ou tocar em algo alheio ao campo.',
  },
  "return-from-outside-court": {
    question: "Um jogador saiu do campo para devolver a bola e conseguiu — o ponto é válido?",
    status: "machine",
    answerMd:
      'Sim, desde que o campo permita jogo fora do campo (ver "Jogar fora do campo"). É uma das regras mais características do padel: havendo espaço e abertura suficientes, os jogadores podem sair pela lateral, devolver a bola e voltar a entrar em jogo.',
  },
  "ball-touches-player": {
    question: "A bola tocou-me antes de eu a devolver — perco sempre o ponto?",
    status: "machine",
    answerMd:
      "Depende do momento. Se foi ao receber um serviço, o ponto é automaticamente do servidor. Numa jogada normal (fora do serviço), quem for tocado pela bola perde sempre o ponto, mesmo que a bola já estivesse a sair do campo.",
  },
  "serve-lands-outside-box": {
    question: "O serviço caiu fora do quadrado certo — é falta?",
    status: "machine",
    answerMd:
      "Sim. O serviço tem de saltar dentro do quadrado de serviço do adversário, do lado correto (as linhas contam como válidas). Se saltar fora, é falta. Se foi no primeiro serviço, tens direito a um segundo; se já era o segundo, perdes o ponto.",
  },
  "double-hit": {
    question: "Bati na bola duas vezes seguidas sem querer — o que acontece?",
    status: "machine",
    answerMd:
      'Perdes o ponto — é considerado "contacto duplo". Há uma exceção: se tu e o teu parceiro tentarem devolver a bola ao mesmo tempo e um bater na bola e o outro na pá do companheiro, isso não conta como contacto duplo.',
  },
  "ball-splits": {
    question: "A bola partiu-se a meio do ponto — o que se faz?",
    status: "machine",
    answerMd:
      'O ponto repete-se do zero ("let"), sem penalização para nenhuma das equipas. O mesmo acontece se algo alheio ao jogo interromper o ponto de forma inesperada.',
  },
};
