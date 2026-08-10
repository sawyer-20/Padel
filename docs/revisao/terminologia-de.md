# Revisão de terminologia — alemão (`de`)

**Âmbito:** os 10 termos canónicos de `src/lib/glossary/glossary.ts` + `src/lib/glossary/content/de.ts`, procurados em todo o restante conteúdo alemão (`rules`, `situations`, `tips`, `faq`). Verifiquei também 8 conceitos técnicos recorrentes que não estão no glossário mas que se comportam como terminologia.

**Ficheiros lidos (corpus completo em alemão — confirmei que não há mais nenhum):**

- `C:\Users\anlgsantos\OneDrive\Projects\Padel\src\lib\glossary\content\de.ts`
- `C:\Users\anlgsantos\OneDrive\Projects\Padel\src\lib\rules\content\de.ts`
- `C:\Users\anlgsantos\OneDrive\Projects\Padel\src\lib\situations\content\de.ts`
- `C:\Users\anlgsantos\OneDrive\Projects\Padel\src\lib\tips\content\de.ts`
- `C:\Users\anlgsantos\OneDrive\Projects\Padel\src\lib\faq\content\de.ts`

**Resultado:** 9 achados — **6 de confiança alta**, **3 de confiança média**, 0 de confiança baixa.

**Nota estrutural, e é a mais útil de todas:** os 10 termos canónicos do glossário estão limpos. Nenhum dos empréstimos espanhóis (bandeja, víbora, chiquita) tem variantes, traduções alemãs inventadas ou acentuação instável. O problema está todo na camada abaixo — o vocabulário de infraestrutura (campo, vedação, ressalto, devolução), que nunca foi fixado. E não está espalhado ao acaso: **o ficheiro `faq/content/de.ts` é uma ilha terminológica**. Usa `Court`, `Gitter`, `Umzäunung`, `Tie-Break` e `Aufsprung` onde os outros três ficheiros usam `Platz`, `Maschendraht`, `Tiebreak` e `Aufspringen`. Foi visivelmente escrito noutra passagem. Isso torna a correção barata: 5 dos 9 achados resolvem-se num único ficheiro.

---

## Achado 1 — `Platz` vs. `Court`: o campo tem dois nomes

**Confiança: alta**

**Ficheiros:** `rules/content/de.ts` (`court-dimensions`, `out-of-court-play`) vs. `faq/content/de.ts` (`how-many-players`, `padel-vs-tennis`, `need-tennis-experience`, `walls-in-play`, `ball-out-of-court`, `padel-balls`)

**Como está — lado `Platz`:**

> "Ein Padelplatz ist ein Rechteck von **10 Metern Breite und 20 Metern Länge**"
> — *Um campo de padel é um retângulo de 10 metros de largura e 20 metros de comprimento*

> "Spiel außerhalb des Platzes: die Regel, die Padel einzigartig macht"
> — *Jogo fora do campo: a regra que torna o padel único*

**Como está — lado `Court`:**

> "**Der Court ist geschlossen und kleiner**, und gespielt wird immer im Doppel."
> — *O campo é fechado e mais pequeno, e joga-se sempre em pares.*

> "Mit Tennisbällen auf einem Padelcourt wird das Spiel zu schnell und unberechenbar."
> — *Com bolas de ténis num campo de padel, o jogo torna-se demasiado rápido e imprevisível.*

> "Darf der Ball den Court verlassen und der Punkt weitergehen?"
> — *Pode a bola sair do campo e o ponto continuar?*

**Contagem:** `Court` aparece 9 vezes, todas no FAQ (incluindo o composto `Padelcourt`). `Platz` no sentido de campo aparece ~15 vezes, todas em `rules`, `situations` e `tips`. Zero sobreposição — nenhum ficheiro usa os dois.

**Porquê é problema:** o objeto central do desporto tem dois nomes consoante a secção do site em que o utilizador está, e `rules/court-dimensions` (`Padelplatz`) e `faq/padel-balls` (`Padelcourt`) chegam a formar um par mínimo que qualquer leitor nota.

**Correção sugerida:** normalizar em `Platz` (maioria de 3 ficheiros contra 1, e é a palavra que o texto legal alemão usa). No FAQ: `Der Court` → `Der Platz`; `Padelcourt` → `Padelplatz`; `Einzel-Courts` → `Einzel-Plätze`; `Auf vollständig geschlossenen Courts` → `Auf vollständig geschlossenen Plätzen`; `Darf der Ball den Court verlassen` → `Darf der Ball den Platz verlassen`.

**Ressalva honesta:** há um argumento a favor de `Court`. O autor do FAQ parece ter fugido a `Platz` porque a palavra está sobrecarregada — no mesmo ficheiro usa-a duas vezes noutros sentidos: `"dafür ist im Padel kein Platz"` (*para isso não há espaço no padel*) e `"ihr Platz in der nationalen Rangliste"` (*o seu lugar no ranking nacional*). A escolha pode ter sido deliberada. Mas tem de ser uma escolha só, aplicada aos quatro ficheiros — não uma por ficheiro.

---

## Achado 2 — `Ballwechsel` significa duas coisas diferentes no mesmo corpus

**Confiança: alta**

**Ficheiros:** `rules/content/de.ts` (`change-of-balls`) vs. `rules/content/de.ts` (`out-of-court-play`, `court-dimensions`, `times`), `glossary/content/de.ts` (`remate`, `manos`), `faq/content/de.ts` (`padel-vs-tennis`, `which-side`), `tips/content/de.ts` (`points-are-won-by-patience`)

**Sentido A — rali (7 ocorrências):**

> "einige der spektakulärsten Ballwechsel im Padel"
> — *alguns dos ralis mais espetaculares do padel*

> "das Tempo eines Ballwechsels ändern"
> — *mudar o ritmo de um rali*

> "wer den Ballwechsel am Leben hält"
> — *quem mantém o rali vivo*

**Sentido B — troca de bolas (2 ocorrências, ambas em `change-of-balls`):**

> "Ballwechsel während des Turniers"  *(título da entrada)*
> — *Troca de bolas durante o torneio* — mas lido à letra, e é assim que um leitor o lê: **Rali durante o torneio**

> "und die Ballwechsel-Regelung, falls vorhanden"
> — *e o regime de troca de bolas, se existir* — à letra: *o regime de ralis*

**Termo canónico:** nenhum dos dois está no glossário, mas o sentido "rali" está estabelecido por sete usos concordantes em quatro ficheiros, incluindo duas entradas do próprio glossário (`remate`, `manos`).

**Porquê é problema:** é o único caso no corpus de um termo já fixado pelo uso a ser reciclado com outro sentido — e o título de uma entrada de regras é o pior sítio possível para isso, porque aparece sozinho numa lista, sem contexto que desambigue.

**Correção sugerida:** em `change-of-balls`, título `"Ballwechsel während des Turniers"` → `"Wechsel der Bälle während des Turniers"`; corpo `"die Ballwechsel-Regelung, falls vorhanden"` → `"die Regelung zum Wechsel der Bälle, falls vorhanden"`. Deixar `Ballwechsel` a significar exclusivamente rali.

---

## Achado 3 — `Return` usado com sentido diferente do que o próprio corpus lhe dá

**Confiança: alta**

**Ficheiros:** `rules/content/de.ts` (`correct-return`, `point-won`, `return-of-serve`, `choice-of-sides`), `situations/content/de.ts` (`ball-touches-player`)

**Sentido estabelecido — devolução do serviço:**

> "War es beim Return eines Aufschlags, geht der Punkt automatisch an den Aufschläger."
> — *Se foi na devolução de um serviço, o ponto vai automaticamente para quem serviu.*

> "Zuerst aufschlagen oder returnieren (dann wählt das andere Team die Seite)."
> — *Servir ou devolver primeiro (depois a outra equipa escolhe o lado).*

**Sentido divergente — qualquer bola devolvida:**

> "Was als gültiger Return zählt"  *(título de `correct-return`)*
> — *O que conta como Return válido*

> "Ein Return ist in Situationen gültig, die Padel-Einsteiger manchmal überraschen, etwa: Der Ball trifft zuerst die Wand auf deiner eigenen Seite und fliegt erst danach zum gegnerischen Platz."
> — *Um Return é válido em situações que por vezes surpreendem quem começa no padel, por exemplo: a bola bate primeiro na parede do teu próprio lado e só depois voa para o campo adversário.*

> "Neben einem verfehlten Return des Gegners"
> — *Além de um Return falhado do adversário*

**Contraste interno:** o glossário, para o mesmo conceito, usa outra palavra — `salida-de-pared`: `"ist das übliche Ziel eine kontrollierte, hohe Rückgabe"` (*o objetivo habitual é uma devolução controlada e alta*).

**Porquê é problema:** em alemão, `Return` é especificamente a devolução do serviço — o próprio corpus o confirma em `choice-of-sides` e `ball-touches-player`, e a formulação defensiva `"Return eines Aufschlags"` mostra que o autor já sentiu a ambiguidade. Usá-lo em `correct-return` para uma bola que ressaltou da parede a meio do rali diz ao leitor que a regra é sobre o serviço, quando não é.

**Correção sugerida:** reservar `Return` para a devolução do serviço. Em `correct-return`: título → `"Was als gültiger Rückschlag zählt"`; corpo → `"Ein Rückschlag ist in Situationen gültig..."`. Em `point-won`: `"Neben einem verfehlten Rückschlag des Gegners"`.

---

## Achado 4 — a vedação tem três nomes

**Confiança: alta**

**Ficheiros:** `rules/content/de.ts` (`court-dimensions`, `serve-fault`, `ball-in-play`, `point-lost`, `point-won`), `situations/content/de.ts` (`wall-bounce-still-in-play`) vs. `faq/content/de.ts` (`walls-in-play`, `ball-out-of-court`)

**Como está:**

> "teils durch Wände (Glas oder festes Material), teils durch Maschendraht"
> — *em parte por paredes (vidro ou material sólido), em parte por rede metálica*

> "Der Ball springt korrekt im gegnerischen Feld auf und fliegt danach durch ein Loch im Maschendraht hinaus"
> — *A bola ressalta corretamente no campo adversário e depois sai por um buraco na rede metálica*

> "darf der Ball das Glas, das Gitter oder beides berühren"
> — *a bola pode tocar no vidro, na grade ou em ambos*

> "Verlässt der Ball nach dem Aufsprung auf deiner Seite die Umzäunung"
> — *Se a bola, depois de ressaltar do teu lado, sair da vedação*

**Contagem:** `Maschendraht` 6 vezes (rules + situations); `Gitter` 1 vez, `Umzäunung` 1 vez (ambas no FAQ).

**Porquê é problema:** a vedação é elemento de regra — determina se o ponto continua ou não — e um leitor que aprendeu `Maschendraht` nas regras não reconhece `Gitter` no FAQ como a mesma coisa.

**Correção sugerida:** normalizar em `Maschendraht`. No FAQ: `"das Glas, das Gitter oder beides"` → `"das Glas, den Maschendraht oder beides"`; `"die Umzäunung"` → `"den Platz"` (aqui `Umzäunung` está a significar o recinto todo, não só a rede — ver Achado 1).

---

## Achado 5 — o ressalto na parede tem cinco formulações

**Confiança: alta**

**Ficheiros:** `glossary/content/de.ts` (`bajada`), `rules/content/de.ts` (`court-dimensions`, `the-ball`), `tips/content/de.ts` (`let-the-wall-work`), `faq/content/de.ts` (`walls-in-play`)

**Como está:**

> "nutzt du den Wandabpraller, um dem Gegner die Initiative zu nehmen"
> — *aproveitas o ressalto da parede para tirar a iniciativa ao adversário*

> "Diese Maße sorgen für einen vorhersehbaren Ballabsprung von den Wänden"
> — *Estas medidas garantem um ressalto previsível da bola nas paredes*

> "passend zu einem Spiel, das in einem umschlossenen Platz mit vielen Wandabsprüngen stattfindet"
> — *adequado a um jogo que decorre num campo fechado com muitos ressaltos nas paredes*

> "Begleite den Ball, warte den Absprung ab und spiel ihn in Ruhe zurück."
> — *Acompanha a bola, espera pelo ressalto e devolve-a com calma.*

> "Auf diesen Abpraller zu warten, statt vor ihm wegzulaufen"
> — *Esperar por este ressalto, em vez de fugir dele*

**Termo canónico:** o glossário fixa-o implicitamente em `bajada` — `Wandabpraller` — mas nenhuma entrada do glossário o define, o que é a raiz do problema.

**Porquê é problema:** cinco palavras (`Wandabpraller`, `Ballabsprung`, `Wandabsprung`, `Absprung`, `Abpraller`) para o conceito que distingue o padel de todos os outros desportos de raquete — e duas delas (`Absprung`, `Ballabsprung`) colidem com o ressalto no chão (ver Achado 6).

**Correção sugerida:** fixar `Wandabpraller` (substantivo) e `von der Wand abprallen` (verbo), e criar entrada de glossário. Substituições: `"einen vorhersehbaren Ballabsprung von den Wänden"` → `"einen vorhersehbaren Abprall von den Wänden"`; `"mit vielen Wandabsprüngen"` → `"mit vielen Wandabprallern"`; `"warte den Absprung ab"` → `"warte den Wandabpraller ab"`; `"Auf diesen Abpraller zu warten"` → `"Auf diesen Wandabpraller zu warten"`.

---

## Achado 6 — o segundo ressalto no chão, o conceito mais crítico das regras, tem três formulações

**Confiança: média**

**Ficheiros:** `rules/content/de.ts` (`return-of-serve`, `serve-fault`, `ball-in-play`, `correct-return`), `situations/content/de.ts` vs. `faq/content/de.ts` (`walls-in-play`, `ball-out-of-court`)

**Como está:**

> "ihn vor dem zweiten Aufspringen zurückspielen"
> — *devolvê-la antes do segundo ressalto*

> "Du verlierst den Punkt nur, wenn der Ball ein **zweites Mal** aufspringt, bevor du ihn zurückspielst."
> — *Só perdes o ponto se a bola ressaltar uma segunda vez antes de a devolveres.*

> "bleibt im Spiel, bis er ein zweites Mal auf dem Boden aufkommt"
> — *mantém-se em jogo até cair uma segunda vez no chão*

> "solange er nicht ein zweites Mal auf dem Boden aufgekommen ist"
> — *desde que não tenha caído uma segunda vez no chão*

> "Nach diesem ersten Aufsprung darf der Ball das Glas ... berühren"
> — *Depois deste primeiro ressalto, a bola pode tocar no vidro...*

**Porquê é problema:** `aufspringen` (regras, situações) e `aufkommen`/`Aufsprung` (FAQ) são a mesma regra dita de duas maneiras; e `Aufsprung` fica a um caráter de `Absprung`, que em `rules/the-ball` significa a altura de ressalto homologada da bola (`"mit niedrigerem Absprung"` — *com ressalto mais baixo*).

**Correção sugerida:** regra simples de três vias — `aufspringen` / `das Aufspringen` para o ressalto no chão em jogo; `abprallen` / `Wandabpraller` para a parede; `Absprung(höhe)` **só** para a especificação da bola em `the-ball` e `padel-balls`, onde é o termo técnico correto. No FAQ: `"bis er ein zweites Mal auf dem Boden aufkommt"` → `"bis er ein zweites Mal aufspringt"`; `"Nach diesem ersten Aufsprung"` → `"Nach diesem ersten Aufspringen"`.

**Confiança média porque:** `aufkommen` não está errado, só é uma segunda maneira de dizer o mesmo. O risco é de dispersão, não de erro.

---

## Achado 7 — `Salida de pared` está no glossário mas nunca é usado no conteúdo que o ensina

**Confiança: média**

**Ficheiros:** `glossary/content/de.ts` (`salida-de-pared`) vs. `tips/content/de.ts` (`let-the-wall-work`), `faq/content/de.ts` (`walls-in-play`)

**Termo canónico:**

> `term: "Salida de pared"` — "Die Technik, einen Ball zurückzuspielen, der direkt von der Seiten- oder Rückwand kommt, ohne sich überraschen zu lassen."
> — *A técnica de devolver uma bola que vem diretamente da parede lateral ou de fundo, sem se deixar surpreender.*

**Onde o conceito aparece sem o termo:**

> "Anfänger stürzen sich aus Tennisreflex auf den Ball, bevor er die Wand erreicht. Dabei ist die Wand dein Verbündeter ... Begleite den Ball, warte den Absprung ab und spiel ihn in Ruhe zurück."
> — *Os principiantes atiram-se à bola por reflexo de ténis, antes de ela chegar à parede. Mas a parede é a tua aliada ... Acompanha a bola, espera pelo ressalto e devolve-a com calma.*

> "Auf diesen Abpraller zu warten, statt vor ihm wegzulaufen, ist der sichtbarste Unterschied zwischen jemandem, der gestern angefangen hat, und jemandem, der seit ein paar Monaten spielt."
> — *Esperar por este ressalto, em vez de fugir dele, é a diferença mais visível entre quem começou ontem e quem joga há uns meses.*

**Porquê é problema:** o produto já faz isto bem com os outros empréstimos — `tips/play-at-their-feet` fecha com `"Das ist das Prinzip der **Chiquita**"` e `tips/dont-back-up-on-lobs` com `"die richtige Antwort eine **Bandeja**"`. `salida de pared` é a exceção: a dica que ensina exatamente esta técnica nunca a nomeia. Um termo canónico que o leitor nunca encontra fora do glossário é um termo que o próximo redator vai reinventar em alemão.

**Correção sugerida:** fechar `let-the-wall-work` com a mesma construção dos outros: `"Das ist die **Salida de pared**."` Nota secundária: `contrapared`, `bajada` e `vibora` também nunca aparecem fora do glossário, mas nesses casos nenhum conteúdo ensina o gesto — não é o mesmo problema.

---

## Achado 8 — `Cross` e `longline` fora do glossário, e com grafia instável

**Confiança: média**

**Ficheiro:** `tips/content/de.ts` (`cross-by-default`)

**Como está:**

> "Cross als Standard; longline ist eine Entscheidung"  *(título)*
> — *Cruzado por defeito; paralela é uma decisão*

> "Der Cross-Ball läuft über die Diagonale, den längsten Bereich des Platzes ... Longline ist riskanter und lässt deine eigene Seite offen."
> — *A bola cruzada percorre a diagonal, a zona mais longa do campo ... A paralela é mais arriscada e deixa o teu lado aberto.*

**Porquê é problema:** são os dois únicos termos de direção de pancada em todo o corpus alemão, sustentam uma dica inteira, e não estão no glossário — a categoria `tactics` só tem `net-positioning` e `manos`. Além disso `longline` aparece minúsculo no título e `Longline` maiúsculo no corpo da mesma entrada, o que num produto cujo argumento é o glossário se lê como descuido.

**Correção sugerida:** duas entradas de glossário em `tactics` (`cross`, `longline`) e uniformizar a maiúscula — `Longline` nos dois sítios, por ser substantivo em alemão.

---

## Achado 9 — `Tiebreak` vs. `Tie-Break`

**Confiança: alta**

**Ficheiros:** `rules/content/de.ts` (`scoring`, `times`, `changes-of-sides`, `return-of-serve`, `change-of-balls`) vs. `faq/content/de.ts` (`scoring`)

**Como está:**

> "Steht es 6:6, wird ein **Tiebreak** gespielt (ein Punkte-, kein Spielevorteil) bis 7 Punkte"
> — *Se estiver 6:6, joga-se um tiebreak (vantagem de pontos, não de jogos) até 7 pontos*

> "bei 6-6 folgt ein Tie-Break"
> — *a 6-6 segue-se um tie-break*

**Contagem:** `Tiebreak` 5 vezes em `rules`; `Tie-Break` 1 vez no FAQ.

**Porquê é problema:** as duas entradas dizem a mesma regra e estão a uma navegação de distância uma da outra — é o sítio onde a discrepância é mais provável de ser vista.

**Correção sugerida:** `Tie-Break` → `Tiebreak` no FAQ. Achado de baixa gravidade, mas de custo de correção praticamente nulo.

---

## O que está consistente (verificado, sem achados)

Os **10 termos canónicos do glossário passam todos**. Em detalhe:

| Termo | Ocorrências fora do glossário | Estado |
|---|---|---|
| `bandeja` → **Bandeja** | 3 (`tips/dont-back-up-on-lobs`, `faq/need-tennis-experience`, + glossário `globo`) | Sempre feminino (`die/eine Bandeja`), nunca traduzido, nunca com variante |
| `vibora` → **Víbora** | 1 (glossário `remate`) | Acento sempre presente |
| `chiquita` → **Chiquita** | 2 (`tips/play-at-their-feet`, glossário `manos`) | Género e grafia estáveis |
| `remate` → **Schmetterball** | 6 (`tips` ×3, `faq/which-side`, glossário `bajada` ×2) | **Zero ocorrências de `Smash`** — notável, porque é a atração óbvia vinda do alemão do ténis |
| `globo` → **Lob** | 8 | Nunca `Globo`, nunca `Mondball` |
| `bajada`, `contrapared`, `salida-de-pared` | 0 | Sem variantes porque não são usados (ver Achado 7) |
| `net-positioning` → **Netzposition** | 0 diretas; conceito em `tips/own-the-net` e `tips/move-as-a-block` sem termo concorrente | Sem conflito |
| `manos` → **Manos (Gefühl)** | 0 | Sem variantes |

Vocabulário de infraestrutura que também está estável: `Aufschlagfeld`, `Aufschläger`, `Rückschläger`, `Sicherheitszone`, `Sicherheitsschlaufe`, `Einstand (Deuce)`, `Golden Point`, e a tríade `Spiel` / `Satz` / `Match` (jogo / set / partida), que é usada corretamente e sem oscilação nos quatro ficheiros.

---

## Nota fora de âmbito

Um único apontamento que não é terminologia mas gramática, registado porque afeta um termo técnico: em `glossary/content/de.ts`, entrada `chiquita`, lê-se `"zwingt ihn zu einer defensiven Volley von unten nach oben"` (*obriga-o a uma volley defensiva de baixo para cima*). Em alemão `Volley` é masculino — `zu einem defensiven Volley`. Ocorrência única, sem variantes concorrentes; não é achado de terminologia.
