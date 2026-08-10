# Revisão de fidelidade PT → DE

Comparação entrada a entrada entre o português (`pt`, referência) e o alemão (`de`), emparelhando pelo `slug`.

Data da revisão: 2026-08-08
Ficheiros comparados:
- `src/lib/rules/content/pt.ts` ↔ `src/lib/rules/content/de.ts`
- `src/lib/situations/content/pt.ts` ↔ `src/lib/situations/content/de.ts`
- `src/lib/tips/content/pt.ts` ↔ `src/lib/tips/content/de.ts`
- `src/lib/faq/content/pt.ts` ↔ `src/lib/faq/content/de.ts`

## Resumo

**49 pares comparados**, sem qualquer `slug` a faltar ou a mais de um dos lados:

| Domínio | Pares |
| --- | --- |
| Regras (`rules`) | 19 |
| Situações (`situations`) | 8 |
| Dicas (`tips`) | 10 |
| FAQ (`faq`) | 12 |

**2 achados** (mais 2 observações menores, listadas à parte por não atingirem o limiar de achado).

Distribuição por gravidade:

| Gravidade | Nº |
| --- | --- |
| 1 — Contradição | 0 |
| 2 — Omissão material | 1 |
| 3 — Acréscimo não verificado | 0 |
| 4 — Divergência de âmbito | 1 |

Distribuição por confiança: alta 0 · média 1 · baixa 1.

**Conclusão geral:** o alemão está invulgarmente alinhado com o português. Nas 49 entradas não há uma única contradição factual: todos os números (dimensões do campo, alturas da rede, tolerâncias da bola, medidas da pá, tempos e pausas, sequência de trocas de lado) coincidem, e todas as regras dizem a mesma coisa nos dois idiomas. Apesar de o conteúdo ter sido escrito de raiz, os dois idiomas seguem a mesma estrutura de argumentos e a mesma ordem de tópicos — o risco de deriva que motivou esta revisão praticamente não se materializou neste par de idiomas.

---

## Achados

### 1. `tips` / `own-the-net` — omissão material

**Português:**
> "Sempre que tiveres uma bola que te dê tempo — um globo bom, uma bola baixa que **obrigue o adversário a levantar** — avança e assume a rede."

**Alemão:**
> "Sobald dir ein Ball Zeit verschafft — ein guter Lob, ein flacher Ball, der den **Gegner zum Aufsetzen zwingt** — rück vor und nimm das Netz."

**Tradução literal do alemão:**
> "Assim que uma bola te der tempo — um bom globo, uma bola rasteira que obrigue o adversário a *pousar/deixar saltar* — avança e assume a rede."

**Análise:** o português explica *porquê* aquela bola te dá tempo: obriga o adversário a bater de baixo para cima ("levantar"), o que produz uma bola alta e lenta enquanto tu subes. É o mesmo princípio explicado na dica `play-at-their-feet`. O alemão usa "zum Aufsetzen zwingen", e `aufsetzen` em alemão significa a bola *assentar/ressaltar no chão*, não um jogador levantar a bola. A expressão não existe com o sentido pretendido: o leitor alemão ou não percebe nada, ou percebe "obriga o adversário a deixar a bola saltar", que é outra coisa e não justifica a subida à rede.

Não há dúvida sobre qual dos dois está errado: o **alemão**. O português é coerente com o resto do conteúdo (comparar com `play-at-their-feet`, onde o alemão traduz o mesmo conceito corretamente como "von unten nach oben zurückzuspielen" — "devolver de baixo para cima").

**Confiança: média.** Alta quanto ao facto de a formulação alemã estar errada; média apenas porque a correção exata (por exemplo "der den Gegner zwingt, von unten zu spielen") é decisão de quem escreve em alemão.

---

### 2. `situations` / `double-hit` — divergência de âmbito

**Português:**
> "Há uma exceção: se tu e o teu parceiro tentarem devolver a bola ao mesmo tempo e **um bater na bola e o outro na raqueta do companheiro**, isso não conta como contacto duplo."

**Alemão:**
> "Eine Ausnahme gibt es: Gehen du und dein Partner gleichzeitig zum Ball, und **einer trifft den Ball, während er auch den Schläger des Partners berührt**, zählt das nicht als Doppelberührung."

**Tradução literal do alemão:**
> "Há uma exceção: se tu e o teu parceiro forem à bola ao mesmo tempo e **um bater na bola enquanto toca também na pá do parceiro**, isso não conta como contacto duplo."

**Análise:** as duas versões descrevem quem toca em quê de maneira diferente. Em português há dois agentes: o jogador A bate na bola, o jogador B bate na pá de A. Em alemão há um só agente: o jogador A bate na bola e é a pá dele que toca na pá de B.

Fisicamente pode ser o mesmo acontecimento visto de ângulos diferentes (duas pás chocam, a bola é tocada uma única vez), e nesse caso o jogador aprende a mesma coisa: choque de pás com um único toque na bola não é contacto duplo. Por isso não classifico isto como contradição.

Vale a pena verificar porque a formulação alemã é a que se aproxima mais da redação habitual dos regulamentos ("é golpe válido se, ao bater na bola, a pá tocar na pá do parceiro, desde que a bola seja golpeada uma só vez"). Se essa for a regra oficial, é o **português** que está formulado ao contrário e deve ser corrigido — não o alemão.

**Confiança: baixa.** Não consigo decidir sozinho se a diferença é real ou apenas duas descrições do mesmo choque. É preciso alguém que jogue e conheça o texto do regulamento.

---

## Observações menores (abaixo do limiar de achado)

Registo-as apenas para o caso de haver uma passagem de edição ao alemão; nenhuma delas altera o que o jogador fica a saber.

- **`rules` / `scoring`** — o parêntesis que explica o tie-break. PT: "um **tie-break** (desempate por pontos, não por jogos)". DE: "ein **Tiebreak** (ein Punkte-, kein Spielevorteil)", literalmente "(uma vantagem de pontos, não de jogos)". O português define o que é um tie-break; o alemão dá uma formulação truncada e pouco natural que explica menos. Perda pequena de clareza, não de facto.

- **`rules` / `change-of-balls`** — PT: "No início de **cada** set." DE: "Zu Beginn **eines** Satzes" ("no início de *um* set"). O alemão perde o quantificador. Numa lista de quando as bolas se trocam, o leitor alemão fica com uma indicação mais vaga. Diferença mínima.

## Nota fora do âmbito desta revisão

Encontrei uma tensão interna que **existe igualmente nos dois idiomas** — portanto não é um problema de fidelidade, mas fica registada porque é o tipo de coisa que uma revisão de conteúdo deve apanhar:

- `rules` / `correct-return` diz que, depois de a bola ressaltar corretamente no campo do adversário, se ela sair e bater no teto ou nas luzes, "a jogada continua válida".
- `situations` / `ball-out-over-end-wall` diz que o ponto **fica decidido** se a bola, depois de sair, "tocar em algo alheio ao jogo".

As duas entradas parecem responder de forma oposta ao mesmo caso. Vale a pena esclarecer com quem conheça o regulamento — e, quando se corrigir, corrigir nos cinco idiomas ao mesmo tempo.
