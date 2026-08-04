import type { GlossaryContent } from "../types";

// Conteúdo original, escrito com base em conhecimento geral e estabelecido de padel
// (não copiado de blogues nem canais existentes — ver §3/§4 do PROJECT.md).
// Estado "machine": ainda não revisto por ninguém com conhecimento de padel.
export const pt: Record<string, GlossaryContent> = {
  bandeja: {
    term: "Bandeja",
    status: "machine",
    definitionMd:
      "A bandeja é um golpe de defesa/controlo executado por cima da cabeça, normalmente para responder a um globo do adversário. Em vez de tentares um remate com força, jogas a bola com um gesto mais suave e controlado, mantendo a tua posição perto da rede em vez de recuares. É um dos golpes mais característicos do padel — sem equivalente direto no ténis.",
  },
  vibora: {
    term: "Víbora",
    status: "machine",
    definitionMd:
      'A víbora é uma variante mais agressiva da bandeja: em vez de um gesto controlado, dás à bola um efeito lateral (cortado), com mais velocidade e uma trajetória mais rasteira e difícil de devolver. O nome vem de "cobra" em espanhol, por causa do movimento lateral do braço.',
  },
  chiquita: {
    term: "Chiquita",
    status: "machine",
    definitionMd:
      "A chiquita é um golpe suave e baixo, jogado propositadamente aos pés do adversário quando ele está perto da rede. Obriga-o a devolver a bola de baixo para cima (voleio defensivo), o que te dá tempo para te aproximares da rede em vantagem.",
  },
  globo: {
    // Os dois nomes no título: em Portugal ouvem-se ambos, e quem procurar por
    // qualquer um deles tem de chegar aqui.
    term: "Globo (lob)",
    status: "machine",
    definitionMd:
      "O globo (lob) é um golpe alto e profundo, jogado por cima dos adversários que estão junto à rede, para os obrigar a recuar ou para tu (ou o teu par) ganharem tempo de chegar à rede. É provavelmente o golpe tático mais usado no padel — mal executado, dá uma bandeja fácil ao adversário; bem executado, muda a dinâmica do ponto.",
  },
  remate: {
    term: "Remate",
    status: "machine",
    definitionMd:
      "O remate é o golpe de ataque por cima da cabeça, batido com força para tentar fechar o ponto. Ao contrário do ténis, no padel raramente termina o ponto à primeira: a bola ressalta nas paredes e volta ao jogo. A decisão que interessa não é como rematar, é quando — muitas vezes a bandeja ou a víbora valem mais, porque te deixam na rede em vez de te empurrarem para trás.",
  },
  bajada: {
    term: "Bajada",
    status: "machine",
    definitionMd:
      "A bajada é o golpe que jogas à bola depois de ela ressaltar na parede de fundo do teu campo, batendo-a de cima para baixo, rasteira e com ritmo. É a resposta agressiva a um remate ou a um globo que te passou por cima: em vez de devolveres mais um globo defensivo, aproveitas o ressalto da parede para tirar a iniciativa ao adversário. Não confundir com o remate — a bajada define-se pela parede, não pela força.",
  },
  "salida-de-pared": {
    term: "Saída de parede",
    status: "machine",
    definitionMd:
      "É a técnica de devolver uma bola que vem diretamente da parede lateral ou de fundo, sem te deixares apanhar de surpresa. Em vez de tentares atacar, o objetivo normal é devolver a bola de forma controlada e alta, para recuperar a posição no jogo.",
  },
  "net-positioning": {
    term: "Posicionamento na rede",
    status: "machine",
    definitionMd:
      "No padel, a rede é a posição dominante — quem está lá tem mais opções de ataque e reduz os ângulos do adversário. Um bom posicionamento significa ficar próximo da rede sem deixar espaços vazios atrás de ti nem te desalinhares do teu par, para cobrirem o campo em conjunto.",
  },
  contrapared: {
    term: "Contraparede",
    status: "machine",
    definitionMd:
      "Na contraparede bates propositadamente a bola contra uma parede do teu próprio campo, para que ela passe por cima da rede e caia do lado adversário. É um recurso de emergência: usa-se quando a bola já te passou e não há forma de a jogar diretamente por cima da rede. Raramente ganha o ponto — mantém-te nele.",
  },
  manos: {
    term: "Manos (toque)",
    status: "machine",
    definitionMd:
      "Manos é o toque: a capacidade de controlar a bola com sensibilidade em vez de força — amortecer uma bola rápida, pousar uma chiquita nos pés do adversário, mudar o ritmo do ponto. Diz-se que um jogador tem boas mãos quando resolve estas bolas com suavidade e precisão. No padel, conta mais do que potência.",
  },
};
