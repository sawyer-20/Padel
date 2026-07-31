import type { SituationContent } from "../types";

// Conteúdo original (nunca copiado do regulamento oficial) — ver §1.2 e §6.2 do PROJECT.md.
// Estado "machine": ainda não revisto por ninguém com conhecimento de padel.
export const pt: Record<string, SituationContent> = {
  "wall-bounce-still-in-play": {
    question: "A bola bateu na parede do meu lado depois de saltar no chão — ainda a posso devolver?",
    status: "machine",
    answerMd:
      "Sim. No padel, depois de a bola saltar no teu campo, ela pode continuar em jogo mesmo que bata numa parede ou na rede metálica à volta do campo — as paredes fazem parte da área de jogo, tal como o chão. Só perdes o ponto se a bola saltar uma **segunda vez** antes de a devolveres.",
  },
  "net-touch-on-serve": {
    question: "O serviço tocou na rede e mesmo assim caiu no quadrado certo — é falta?",
    status: "machine",
    answerMd:
      "Não. Se a bola tocar na rede ou nos postes durante o serviço e ainda assim cair dentro do quadrado de serviço correto, não conta como falta — o serviço repete-se, sem penalização para quem serviu.",
  },
  "ball-out-over-end-wall": {
    question: "Depois de bater corretamente no meu campo, a bola saiu por cima da parede do fundo — o ponto já está decidido?",
    status: "machine",
    answerMd:
      'Não necessariamente. Se o campo tiver zona de segurança e permitir jogo fora do campo, o adversário ainda pode ir buscar a bola lá fora e devolvê-la. O ponto só fica decidido se a bola sair por um lado sem jogo fora do campo autorizado, ou se, depois de sair, saltar uma segunda vez ou tocar em algo alheio ao jogo.',
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
      "Sim. O serviço tem de saltar dentro do quadrado de serviço do adversário, do lado correto (as linhas contam como válidas). Se saltar fora, é falta — e, como em qualquer serviço, há direito a uma segunda tentativa antes de perder o ponto.",
  },
  "double-hit": {
    question: "Bati na bola duas vezes seguidas sem querer — o que acontece?",
    status: "machine",
    answerMd:
      'Perdes o ponto — é considerado "contacto duplo". Há uma exceção: se tu e o teu parceiro tentarem devolver a bola ao mesmo tempo e um bater na bola e o outro na raqueta do companheiro, isso não conta como contacto duplo.',
  },
  "ball-splits": {
    question: "A bola partiu-se a meio do ponto — o que se faz?",
    status: "machine",
    answerMd:
      'O ponto repete-se do zero ("let"), sem penalização para nenhuma das equipas. O mesmo acontece se algo alheio ao jogo interromper o ponto de forma inesperada.',
  },
};
