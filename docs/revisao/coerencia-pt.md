# Revisão de coerência interna — conteúdo em português

Âmbito: `src/lib/rules/content/pt.ts` (19 regras), `src/lib/situations/content/pt.ts` (8 situações),
`src/lib/tips/content/pt.ts` (10 dicas), `src/lib/faq/content/pt.ts` (12 perguntas).
Nenhum ficheiro de conteúdo foi alterado. Nenhum campo `status` foi tocado.

## Resumo

- **15 assuntos agrupados**: pontuação e formato de jogo; execução do serviço; faltas de serviço;
  repetições ("let") e serviço na rede; receção do serviço; paredes e bola em jogo; grade (rede
  metálica); jogo fora do campo; bola que toca no jogador; contacto duplo e interferência; a pá e o
  material do jogador; a bola (características e troca); campo, posições e trocas de lado; tempos e
  pausas; táctica de posicionamento e escolha de golpe.
- **7 achados.**

| Gravidade | N.º | Achados |
| --- | --- | --- |
| Contradição directa | 4 | 1, 3, 5, 6 |
| Resposta incompleta que induz em erro | 1 | 2 |
| Dica que contraria uma regra | 1 | 4 |
| Ligação em falta | 1 | 7 |

| Confiança | N.º | Achados |
| --- | --- | --- |
| Alta | 3 | 1, 2, 5 |
| Média | 4 | 3, 4, 6, 7 |
| Baixa | 0 | — |

Os assuntos que se revelaram coerentes entre domínios e onde não há nada a fazer: serviço na rede /
"let"; a grade como parte da área de jogo; características da bola; contacto duplo; tempos, pausas e
trocas de lado; posições dos jogadores; táctica de rede, globo e bandeja.

---

## Achado 1 — Quem tem o direito de sair do campo para ir buscar a bola

**Gravidade:** contradição directa · **Confiança:** alta

**Sítios:**
- Situação `ball-out-over-end-wall`
- Regra `out-of-court-play`
- FAQ `ball-out-of-court`

**Citações:**
- Situação: *"Se o campo tiver zona de segurança e permitir jogo fora do campo, o adversário ainda pode
  ir buscar a bola lá fora e devolvê-la."* (a pergunta é *"Depois de bater corretamente no meu campo,
  a bola saiu por cima da parede do fundo"*)
- Regra: *"Depois de a bola bater no chão do teu lado, tu (ou o teu par) podem sair pela abertura
  lateral do campo e devolvê-la de fora"*
- FAQ: *"Se a bola sair do recinto depois de ressaltar no teu campo, tens o direito de sair pela
  abertura lateral, jogá-la de fora e devolvê-la para dentro"*

**Em que se contradizem:** a situação atribui ao adversário o direito de ir buscar a bola que ressaltou
no *meu* campo, enquanto a regra e a FAQ atribuem esse direito a quem tem a bola do seu lado.

**O que me parece correto:** a regra e a FAQ. A bola ressaltou no meu campo, portanto sou eu que tenho
de a devolver — o adversário já jogou o seu golpe. A situação inverteu os papéis e, como está escrita,
diz ao leitor que pode ficar parado a ver o ponto que é ele que tem de salvar. É o achado mais grave
do conjunto porque a situação é exatamente o sítio onde alguém vai procurar a resposta em jogo.

**Nota adicional sobre o mesmo assunto:** a regra exige duas condições cumulativas — abertura lateral
*e* zona de segurança (*"desde que ... o campo tenha uma «zona de segurança» à volta"*) — mas a FAQ
menciona só uma: *"só é possível onde existem aberturas laterais"*. Divergência menor, mas na mesma
família.

**Ligação em falta relacionada:** `situations.ts` tem `relatedRuleSlug: null` para
`ball-out-over-end-wall`, apesar de a situação ser inteiramente sobre `out-of-court-play`. Se estivesse
ligada, a contradição acima teria sido visível a quem escreveu.

---

## Achado 2 — "Há sempre direito a uma segunda tentativa"

**Gravidade:** resposta incompleta que induz em erro · **Confiança:** alta

**Sítios:**
- Regra `serve-fault`
- Situação `serve-lands-outside-box`
- Regra `the-serve` e regra `point-lost`

**Citações:**
- `serve-fault`: *"Tal como em qualquer serviço, há sempre direito a uma segunda tentativa antes de se
  perder o ponto."*
- `serve-lands-outside-box`: *"e, como em qualquer serviço, há direito a uma segunda tentativa antes de
  perder o ponto"*
- `the-serve`: *"Cada equipa tem direito a duas tentativas por ponto (primeiro e segundo serviço) — se
  ambas falharem, o ponto é perdido."*
- `point-lost`: *"Serves e falhas duas vezes seguidas."*

**Em que se contradizem:** o "sempre" e o "qualquer serviço" dizem ao leitor que uma falta nunca custa
o ponto de imediato, quando a falta no segundo serviço custa — é a dupla falta, que os outros dois
textos descrevem.

**O que me parece correto:** `the-serve` e `point-lost`. A frase das outras duas entradas só é
verdadeira para o primeiro serviço; falta-lhe a condição. Quem lê apenas a situação (que é o formato
consultado em campo) fica convencido de que tem sempre mais uma bola.

---

## Achado 3 — Bola batida contra a própria parede

**Gravidade:** contradição directa · **Confiança:** média

**Sítios:**
- Regra `correct-return`
- FAQ `walls-in-play`

**Citações:**
- `correct-return`: *"A bola bate primeiro na parede do teu próprio lado e só depois segue para o campo
  do adversário."*
- `walls-in-play`: *"A ordem é essa e não pode ser trocada: **chão e depois parede**. Se a bola bater
  diretamente na tua parede sem tocar no chão, o ponto é do adversário."*

**Em que se contradizem:** a regra apresenta como devolução válida uma trajetória parede → campo
adversário sem mencionar o ressalto obrigatório no chão, enquanto a FAQ afirma que a ordem chão-parede
não pode ser trocada.

**O que me parece correto:** a FAQ. O toque na parede que mantém a bola viva acontece *antes* do meu
golpe, não depois — o padel não é squash, não posso mandar a bola contra a minha parede para a fazer
passar a rede. A regra está a descrever a coisa certa com uma redação que se lê ao contrário: falta
dizer que a bola ressalta no chão, bate na minha parede, e só então eu lhe bato. Confiança média porque
é possível que a intenção fosse essa e o problema seja apenas de redação — mas o leitor não tem como
saber.

---

## Achado 4 — A dica da parede não diz que o chão vem primeiro

**Gravidade:** dica que contraria uma regra · **Confiança:** média

**Sítios:**
- Dica `let-the-wall-work`
- FAQ `walls-in-play` (e regra `ball-in-play`)

**Citações:**
- Dica: *"Quem começa tende a atirar-se à bola antes de ela bater na parede, por reflexo do ténis. Mas a
  parede é tua aliada: muitas bolas que parecem impossíveis voltam ao campo com um ressalto
  perfeitamente jogável. Acompanha a bola, espera o ressalto e devolve com calma."*
- FAQ: *"Se a bola bater diretamente na tua parede sem tocar no chão, o ponto é do adversário."*

**Em que se contradizem:** a dica aconselha, sem qualquer condição, a não se atirar à bola e a esperar
pela parede; a regra diz que numa bola que vai direta à parede sem ressaltar no chão, esperar é perder
o ponto — nesse caso é obrigatório jogá-la de voleio.

**O que me parece correto:** a regra e a FAQ. A dica é boa e o conselho é o certo na maioria dos casos,
mas está enunciada em absoluto e dirigida precisamente a principiantes, que são os que não sabem
distinguir os dois casos. Bastaria uma condição: esperar pela parede só depois de a bola ter ressaltado
no chão.

**Nota estrutural:** o tipo `TipContent`/`Tip` não tem campo `relatedRuleSlug` (só `relatedTermSlug`),
por isso nenhuma dica pode apontar para a regra que a limita. É a única fronteira entre domínios sem
ligação possível no modelo de dados.

---

## Achado 5 — O ponto de ouro desaparece na FAQ

**Gravidade:** contradição directa · **Confiança:** alta

**Sítios:**
- FAQ `scoring` e FAQ `padel-vs-tennis`
- Regra `scoring`

**Citações:**
- FAQ `scoring`: *"Exatamente como no ténis. Cada ponto vale 15, 30, 40 e jogo, com dois pontos de
  diferença a partir do 40-40."*
- FAQ `padel-vs-tennis`: *"As regras de pontuação são as mesmas."*
- Regra `scoring`: *"**Ponto de ouro (golden point)**: em vez de vantagens sucessivas, joga-se um único
  ponto decisivo. Quem o ganha, ganha o jogo. É o formato mais usado hoje em dia no padel
  profissional"*

**Em que se contradizem:** as duas FAQ afirmam que o jogo se fecha sempre com dois pontos de diferença
a partir do 40-40 e que a pontuação é igual à do ténis; a regra diz que o formato dominante no padel
profissional decide o 40-40 num único ponto.

**O que me parece correto:** a regra. Um leitor que veja um jogo profissional depois de ler a FAQ não
percebe o que aconteceu no 40-40 — e o site tem calendário e rankings do circuito profissional, por
isso é exatamente esse o leitor. Basta uma frase na FAQ a dizer que muitos torneios usam ponto de ouro.

---

## Achado 6 — "Perde sempre o ponto" vs. "depois de teres tentado devolvê-la"

**Gravidade:** contradição directa · **Confiança:** média

**Sítios:**
- Situação `ball-touches-player`
- Regra `point-lost`

**Citações:**
- Situação: *"Numa jogada normal (fora do serviço), quem for tocado pela bola perde sempre o ponto,
  mesmo que a bola já estivesse a sair do campo."*
- Regra: *"A bola toca em ti, no teu parceiro, ou em algo que estejam a usar, depois de teres tentado
  devolvê-la."*

**Em que se contradizem:** a situação diz "sempre"; a regra condiciona a perda do ponto a o toque
acontecer *depois* de uma tentativa de devolução, o que deixa em aberto o caso mais comum — ser
atingido sem sequer ter tentado bater na bola.

**O que me parece correto:** a situação. Qualquer contacto do corpo com a bola em jogo custa o ponto,
haja ou não tentativa de devolução; a condição da regra é demasiado estreita e cria uma exceção que não
existe. Confiança média porque a lista de `point-lost` se declara não exaustiva (*"Esta lista não é
exaustiva"*) — mas o leitor que compara as duas entradas vê uma exceção onde não há.

**Ligação em falta relacionada:** `ball-touches-player` tem `relatedRuleSlug: null`, apesar de o
`fipArticleRef` já apontar para "Rule 8, 13" (`return-of-serve` e `point-lost`).

---

## Achado 7 — O cordão de segurança não aparece na FAQ do material

**Gravidade:** ligação em falta · **Confiança:** média

**Sítios:**
- FAQ `first-equipment` (com `relatedRuleSlug: null`)
- Regra `the-racket` e regra `point-lost`

**Citações:**
- FAQ: *"Menos do que se pensa: **Pá** ... **Bolas** ... **Sapatilhas** ... **Roupa desportiva
  confortável** e água."*
- `the-racket`: *"É obrigatório o uso de um cordão de segurança preso ao punho e à volta do pulso —
  serve para evitar que a pá seja projetada durante o jogo."*
- `point-lost`: *"Deixas cair a pá ou o cordão de segurança parte-se durante o ponto."*

**Em que se contradizem:** a FAQ propõe-se listar tudo o que é preciso para a primeira aula e omite o
único item de material que o regulamento torna obrigatório e cuja falha custa o ponto.

**O que me parece correto:** a FAQ não está errada, está incompleta de uma forma que interessa — é a
diferença entre chegar preparado e chegar sem o cordão. Uma linha a dizer que a pá tem de trazer cordão
de pulso, mais `relatedRuleSlug: "the-racket"`, resolve. Assinalo esta ligação e não outras porque é a
única em que a ausência tem consequência prática imediata para o leitor.

---

## Notas laterais (fora do âmbito da revisão de coerência)

Não são divergências entre domínios; ficam registadas porque foram vistas na leitura e alguém com
conhecimento de padel deve confirmá-las antes de o `status` passar a `reviewed`.

1. **Lado do primeiro serviço** — `the-serve` diz *"primeiro serve-se para a esquerda do adversário,
   depois para a direita"*. Pela convenção habitual, o primeiro serviço de cada jogo faz-se do lado
   direito de quem serve para o quadrado da direita de quem recebe. Nenhum outro domínio fala do
   assunto, por isso não há contradição interna — mas parece invertido.
2. **Terminologia** — a situação `double-hit` usa *"raqueta do companheiro"*, quando os quatro domínios
   usam sistematicamente "pá" (e a FAQ `padel-vs-tennis` chega a contrastar pá com raquete de ténis).
   Uniformizar.
