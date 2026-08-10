# Revisão de exatidão regulamentar — regras FIP (conteúdo PT)

## Estado da verificação

**Fonte oficial obtida: sim.**

- URL usado: `https://www.padelfip.com/wp-content/uploads/2025/12/FIP_Rules-of-Padel.pdf` (o valor de `FIP_OFFICIAL_PDF_URL` em `src/lib/rules/rules.ts`).
- Versão confirmada na capa do documento: **"RULES OF PADEL — INTERNATIONAL PADEL FEDERATION — Review of application 01.01.2026"**. Corresponde ao `FIP_VERSION = "2026-01-01"` declarado no código. Sem divergência.
- Nota de método: o `WebFetch` descarregou o PDF mas o resumidor recusou devolver o texto. O PDF ficou gravado em disco e o texto foi extraído localmente a partir dos fluxos de conteúdo do próprio ficheiro. **Todas as citações do regulamento abaixo vêm desse texto extraído, nenhuma vem de memória.** Onde o regulamento não cobre o assunto, está dito explicitamente.

- Regras verificadas: **19 de 19** (`src/lib/rules/content/pt.ts`).
- Achados: **17** — 6 graves (contradição), 3 de afirmação não sustentada ou referência errada, 8 de omissão material.
- Regras sem qualquer achado: **5** — `player-positions`, `choice-of-sides`, `return-of-serve`, `interference`, `point-won`.
- Reprodução literal do regulamento: **nenhuma detetada.**

Nenhum ficheiro de conteúdo foi alterado e nenhum campo `status` foi tocado.

---

## A. Achados graves — o nosso texto contradiz o regulamento

### A1. `correct-return` — a jogada NÃO continua sempre

- `fipArticleRef` declarado: **Rule 14** (correto)
- O nosso texto: *"Depois de bater corretamente no campo do adversário, a bola sai do campo, bate no teto, nas luzes ou noutro elemento alheio ao jogo — a jogada continua válida."* e, a fechar, *"Em todos estes casos, a jogada continua e o adversário tem de devolver a bola antes do segundo ressalto."*
- O regulamento, Rule 14.1.d: *"As a result of the direction and force with which the ball is hit, it bounces in the opponent's court and then goes out of court, hits the ceiling, the lights or any other object not related to the court."*
- **Veredicto: contradiz.** A Regra 14 diz que a devolução foi *correta* — não que a jogada prossegue. Se a bola saiu do campo e bateu no teto, o adversário não tem como a devolver: em campo sem jogo exterior autorizado o ponto está ganho por quem bateu (Rule 13.d), e em campo com jogo exterior autorizado aplica-se a Rule 13.e. A frase "em todos estes casos... o adversário tem de devolver a bola antes do segundo ressalto" é falsa precisamente para a alínea que é a mais espetacular e a mais perguntada.
- **Correção sugerida:** separar os casos. Nas alíneas em que a bola fica dentro do recinto (parede do próprio lado, rede/postes, canto parede-chão), a jogada prossegue e o adversário tem de devolver antes do segundo ressalto. No caso em que a bola sai do campo depois de ressaltar corretamente, a devolução conta como válida e o ponto resolve-se pelas regras de ponto perdido e de jogo fora do campo — não há devolução possível dentro do recinto.
- **Confiança: alta.**

### A2. `let-and-net-serve` — o serviço que toca na rede nem sempre se repete

- `fipArticleRef` declarado: **Rule 9** (correto para esta alínea)
- O nosso texto: *"**Serviço na rede**: se a bola tocar na rede ou nos postes e, mesmo assim, cair dentro do quadrado de serviço correto, o serviço não conta como falta — repete-se."*
- O regulamento, Rule 9.1.a: *"The ball served touches the net or the supporting posts and then lands in the receiver's service box, **as long as it does not touch the metallic fence before the second bounce**."*
- **Veredicto: omissão de exceção que inverte a resposta.** Se a bola toca na rede, cai no quadrado certo e depois bate na rede metálica antes do segundo ressalto, **não** é "net" — é falta (a Rule 7.1.e trata precisamente essa sequência sem toque na rede, e a Rule 9.1.a impõe a mesma condição ao serviço que roçou a rede). Como está, o nosso texto diz a um jogador para repetir um serviço que é falta. É uma situação corrente em campo.
- **Correção sugerida:** acrescentar a condição — o serviço que toca na rede ou nos postes só se repete se, depois de cair no quadrado certo, não tocar na rede metálica antes do segundo ressalto; se tocar, é falta. Acrescentar também a Rule 9.1.b: se a bola, depois de tocar na rede ou nos postes, acertar num jogador ou em algo que ele use, também é "net".
- **Confiança: alta.**

### A3. `out-of-court-play` — falta a exceção da parede de fundo

- `fipArticleRef` declarado: **Rule 16** (correto, mas insuficiente — ver B3)
- O nosso texto: *"Depois de a bola bater no chão do teu lado, tu (ou o teu par) podem sair pela abertura lateral do campo e devolvê-la de fora, desde que a bola ainda esteja em jogo..."*
- O regulamento, Rule 13.e: *"Authorized out-of-court play. When the ball, after bouncing correctly, goes out of court **over the end wall**. If it goes over the sidewall or through the door the point is lost when the ball bounces for a second time or touches any element not related to the court."*
- **Veredicto: omissão de exceção que muda a resposta num caso real.** Mesmo em campo com jogo exterior autorizado, se a bola sai por cima da **parede de fundo**, o ponto está perdido — não há nada a ir buscar. Só a saída pelo lado ou pela porta permite a jogada exterior, e mesmo essa acaba ao segundo ressalto ou ao primeiro contacto com algo alheio ao campo. O nosso texto apresenta a saída do campo como possibilidade geral.
- **Correção sugerida:** distinguir explicitamente saída pela lateral/porta (jogada possível, com limite do segundo ressalto e do contacto com elementos alheios ao campo) de saída por cima do fundo (ponto perdido de imediato).
- **Confiança: alta.**

### A4. `change-of-balls` — o limite é uma bola, não "menos do que o combinado"

- `fipArticleRef` declarado: **Rule 17** (correto)
- O nosso texto: *"Se uma bola se perder ou danificar a meio de uma partida, é substituída de imediato — o jogo nunca continua com menos bolas do que o combinado."*
- O regulamento, Rule 17.1.e: *"...play will not continue with **only one (1) ball** available to the players, and the Chair Umpire will provide the players with replacement balls of the same type."*
- **Veredicto: contradiz.** O regulamento proíbe continuar com **uma** bola. Se o jogo é a três bolas e se perde uma, continuar com duas é regulamentar. A nossa formulação inventa uma exigência que o regulamento não faz.
- **Correção sugerida:** dizer que a bola perdida ou danificada é substituída logo que possível e que o jogo não pode prosseguir com apenas uma bola disponível.
- **Confiança: alta.**

### A5. `the-serve` — a bola pode ser batida *à* altura da cintura

- `fipArticleRef` declarado: **Rule 6** (correto)
- O nosso texto: *"A bola tem de ser lançada ao chão e batida **abaixo** da linha da cintura, com pelo menos um pé em contacto com o chão no momento do impacto."*
- O regulamento, Rule 6.4: *"The height of the ball being served must be **at or below** the waist level at the moment of hitting it, and the player must have at least one foot in contact with the ground."*
- **Veredicto: contradiz (por excesso de restrição).** "At or below" inclui a altura da cintura. O nosso texto exclui-a. É exatamente o ponto em que um árbitro decide entre falta e serviço válido.
- **Correção sugerida:** "batida à altura da cintura ou abaixo dela".
- **Confiança: alta.**

### A6. `ball-in-play` — o "só" é falso

- `fipArticleRef` declarado: **Rule 12** (correto)
- O nosso texto: *"**Só** se perde o ponto se a bola ressaltar uma segunda vez antes de a devolveres."*
- O regulamento, Rule 13 (Point Lost), lista dezoito alíneas de a) a r), entre elas 13.l: *"If a player hits the ball and it touches the metallic fence, any part of the ground on their own side of the court..."* e 13.a: *"...touches the net, net posts, the tension cable or any part of the opponent's court while the ball is in play."*
- **Veredicto: contradiz.** Depois de a bola ressaltar do nosso lado há muitas outras formas de perder o ponto além do segundo ressalto — a nossa própria regra `point-lost` lista-as. A palavra "só" torna a frase falsa e contradiz outro conteúdo do sítio.
- **Correção sugerida:** substituir por algo como "o segundo ressalto no chão é o que termina a jogada — o toque nas paredes ou na rede metálica antes disso não a interrompe" e remeter para a regra de ponto perdido para as restantes situações.
- **Confiança: alta.**

---

## B. Afirmação não sustentada pelo artigo citado / referência errada

### B1. `let-and-net-serve` — metade do texto vem da Regra 10, não da Regra 9

- `fipArticleRef` declarado: **Rule 9**
- O nosso texto: *"**\"Let\" (repetição)**: se o adversário não estava pronto para receber, **ou se algo alheio ao jogo interrompe o ponto (por exemplo, uma bola de outro campo a entrar em jogo)**, o ponto repete-se do zero."*
- O regulamento: a primeira metade é Rule 9.2.a (*"The ball served when the receiver is not ready"*). A segunda metade é **Rule 10 — "REPETITION OR 'LET' POINT"**, 1.b: *"Any element not part of the game invades the court area."* e 1.c: *"In general, any interruption to the match due to unexpected situations unconnected to the players."*
- **Veredicto: não sustentada pelo artigo citado.** A afirmação está certa; a referência é que não a cobre.
- **Correção sugerida:** ou restringir esta regra ao serviço (Regra 9) e criar uma regra separada para o "let" de ponto (Regra 10), ou passar o `fipArticleRef` para "Rule 9 & Rule 10". A primeira opção é melhor, porque a Regra 10 traz duas condições práticas que não estão em lado nenhum do sítio: o jogador tem de pedir o "let" **de imediato** (se continua a jogar perde o direito) e é o árbitro que decide, podendo dar o ponto por perdido se o pedido for indevido.
- **Confiança: alta.**

### B2. `the-ball` — a comparação com a bola de ténis não é sustentada

- `fipArticleRef` declarado: **The Ball** (correto)
- O nosso texto: *"A bola de padel parece-se com a de ténis mas é ligeiramente mais pequena, **mais leve** e com menos pressão interna..."*
- O regulamento, secção "The Ball": *"Its diameter should measure between 6.35 and 6.77 cm and its weight between 56.0 y 59.4 grams."* O documento da FIP **não faz qualquer comparação com o ténis** em nenhum ponto.
- **Veredicto: não sustentada.** A afirmação sobre o peso é a mais arriscada: 56,0–59,4 g é o intervalo declarado pela FIP e é um intervalo que, tanto quanto se sabe, coincide com o do ténis — não posso confirmá-lo com esta fonte, e por isso não o afirmo. O que posso afirmar é que **o artigo citado não sustenta "mais leve"**.
- **Correção sugerida:** ou remover a comparação e apresentar apenas os valores da FIP, ou manter a comparação com uma segunda fonte citada (regulamento ITF). Enquanto não houver essa fonte, remover "mais leve".
- **Confiança: alta** quanto à não sustentação pelo artigo citado; **baixa** quanto ao valor de facto da comparação, que esta fonte não permite decidir.

### B3. `court-dimensions` — o `fipArticleRef` cobre uma fração do texto

- `fipArticleRef` declarado: **"The Court — Dimensions"**
- Os números do nosso texto estão **todos corretos**, mas três das cinco afirmações não vêm de "Dimensions":
  - Altura da rede (88 cm ao centro, 92 cm nos extremos) → secção **NET**, ponto 1 (*"0.88 high at the center, rising to 0.92 meters at the ends"*).
  - Campo fechado, parede + rede metálica, 4 metros nos topos → secções **ENCLOSURES / ENDS** (*"A total height of 4 meters the first 3 m of which is wall... and the last 1 meter is metallic fence"*).
  - Largura, comprimento, linhas de serviço a 6,95 m e altura livre de 6 m (8 m recomendados) → **DIMENSIONS**, corretos.
- **Veredicto: referência errada (por defeito).** Um dirigente que abra "Dimensions" à procura da altura da rede não a encontra.
- **Correção sugerida:** `fipArticleRef: "The Court — Dimensions, Net, Enclosures & Ends"`.
- **Confiança: alta.**

---

## C. Omissões materiais

### C1. `scoring` — o ponto de ouro tem regras de receção que não dizemos

- **Rule 1** (referência correta)
- O nosso texto: *"**Ponto de ouro (golden point)**: em vez de vantagens sucessivas, joga-se um único ponto decisivo. Quem o ganha, ganha o jogo."*
- O regulamento, Rule 1, Option 3, ponto 2: *"The receiving pair will choose whether to receive the service on the right or the left side of the court. The receiving pair cannot change positions to receive the deciding point."* E ponto 3: *"In mixed matches, in the deciding point the player receiving will be the same sex as the server."*
- **Veredicto: omissão material.** Quem recebe o ponto de ouro, e de que lado, é das discussões mais frequentes em campo e em prova federada. Dizemos que se joga um ponto decisivo e ficamos por aí.
- **Correção sugerida:** acrescentar que, no ponto decisivo, a dupla que recebe escolhe de que lado recebe, sem trocar de posições entre si, e que em provas mistas quem recebe tem de ser do mesmo sexo de quem serve.
- **Confiança: alta.**
- Duas notas adicionais sobre a mesma regra:
  - O regulamento tem **três** opções de contagem, não duas: Option 1 (Advantage), **Option 2 (Star Point)** — três "deuces" com duas vantagens antes do ponto decisivo — e Option 3 (Golden Point). Omitimos a Option 2 inteira. *Confiança: alta; gravidade: média.*
  - A Regra 1 inclui ainda "ALTERNATIVE SCORE METHODS": set curto de 4 jogos, tie-break final de 7 pontos a substituir o terceiro set, e **super tie-break de 10 pontos** a substituir o terceiro set. A nossa afirmação categórica *"Uma partida ganha-se ao vencer 2 dos 3 sets"* ignora-os, e o super tie-break é hoje comuníssimo em prova amadora. *Confiança: alta; gravidade: média.*
  - **Onde o regulamento é defeituoso:** a Option 3, ponto 2, termina com *"The pair that wins the point wins the match."* — evidente lapso, já que a Option 2 diz *"wins the game"* para a situação equivalente. O nosso texto ("ganha o jogo") faz a leitura sensata. Não é achado contra nós; fica registado para quem discutir o assunto.

### C2. `times` — falta o limite de uma assistência médica por lesão

- **Rule 2** (referência correta)
- O nosso texto: *"Em caso de lesão tratável, cada jogador tem direito a uma pausa médica de 3 minutos, que pode repetir-se nas duas mudanças de lado seguintes, sempre dentro do tempo regulamentar."*
- O regulamento, Rule 2.15: *"Medical attention will only be given once to each player and for each treatable medical condition. It is not possible to leave a medical attention to the companion."*
- **Veredicto: omissão material.** Sem isto, o nosso texto sugere que a pausa médica se pode ir pedindo. O limite — uma vez por jogador e por condição, e não transferível para o parceiro — é o que impede o abuso e é o que um árbitro aplica.
- **Correção sugerida:** acrescentar a frase do limite.
- **Confiança: alta.**
- Também omitidos, da versão 2026: Rule 2.16 (acidente não decorrente do jogo — desmaio, reação alérgica, tontura, crise respiratória — o árbitro pode conceder até **15 minutos**) e Rule 2.17 (circunstância invulgar, como queda involuntária ou bola que acerta num jogador — até **5 minutos** para recuperar). São novidades desta revisão e valem a pena. *Confiança: alta; gravidade: média.*
- **Ambiguidade genuína do regulamento (não é erro nosso):** o nosso texto diz que durante o tie-break não há pausa na troca de lados, seguindo a Rule 2.5 (*"After the first game of each set and during a tie-break, play will be continuous and the players will change ends without a rest period"*). Mas a Rule 2.10 do mesmo artigo diz *"20 seconds will be granted for changes of side in a 'tie break'."* **O regulamento contradiz-se e não resolve o caso.** Sugestão: manter a nossa formulação, mas assinalar ao leitor que o regulamento tem as duas disposições e que na prática se seguem os 20 segundos da Rule 2.10. *Confiança: baixa* — não é possível decidir com esta fonte.

### C3. `changes-of-sides` — falta a consequência sobre o serviço

- **Rule 5** (referência correta)
- O nosso texto: *"Se as equipas se esquecerem de trocar, corrige-se assim que o erro for detetado, seguindo depois a ordem correta — os pontos já ganhos até aí mantêm-se válidos."*
- O regulamento, Rule 5.3, frase final: *"In the case that the mistake is discovered after a faulty first serve is taken, the server only has one serve remaining."*
- **Veredicto: omissão material.** Falta a única consequência prática da regra: se o erro só se descobre depois de um primeiro serviço falhado, quem serve fica com um serviço apenas.
- **Correção sugerida:** acrescentar essa frase, por palavras próprias.
- **Confiança: alta.**

### C4. `serve-fault` — falta uma alínea e há um "sempre" a mais

- **Rule 7** (referência correta). As cinco alíneas que temos correspondem fielmente a 7.1.a–e.
- Falta a Rule 7.1.f: *"The ball bounces in the receiver's service box and bounces out of court directly through the gates of a court without a safety zone and therefore with no out-of-court play authorized."* Ou seja: em campo sem zona de segurança, o serviço que salta direto para fora pela porta é falta. *Confiança: alta.*
- Segundo ponto, o nosso fecho: *"Tal como em qualquer serviço, há **sempre** direito a uma segunda tentativa antes de se perder o ponto."* Não é sempre: não há segunda tentativa quando a falta é já no segundo serviço (Rule 13.q, *"A player serves two consecutive faults"*), nem quando a Rule 5.3 ou a Rule 6.7 deixam o servidor com um só serviço. **Veredicto: não sustentada.** *Confiança: alta.*
- **Correção sugerida:** trocar por "uma falta no primeiro serviço dá direito a um segundo; duas faltas seguidas perdem o ponto", e retirar o "sempre".

### C5. `change-of-balls` — falta como se contam os jogos e como se repõe a bola perdida

- **Rule 17** (referência correta)
- O nosso texto: *"Depois de um número ímpar de jogos combinado antecipadamente."*
- O regulamento, Rule 17.1.a, frase seguinte: *"The warm up period is counted as two games and the 'tie break' as one, for the change of balls."*
- **Veredicto: omissão material.** Sem a contagem, o número ímpar combinado é inaplicável.
- Falta também, da Rule 17.1.e: se a bola se perde **nos primeiros dois jogos** após uma troca, repõe-se com bola **nova**; se se perde depois desses dois jogos, repõe-se com bola **usada de desgaste semelhante**. E a Rule 17.1.d, sobre como se corrige uma troca de bolas que devia ter acontecido e não aconteceu.
- **Correção sugerida:** acrescentar a contagem (aquecimento = dois jogos, tie-break = um) e a regra de reposição por desgaste.
- **Confiança: alta.**

### C6. `the-racket` — "normalmente" onde o regulamento é imperativo

- **The Padel Racket** (referência correta)
- O nosso texto: *"A superfície de impacto é perfurada por furos circulares, **normalmente** entre 9 e 13 mm de diâmetro na zona central."*
- O regulamento, ponto 6: *"The hitting surface of the racket is perforated by an unlimited number of cylindrical holes each measuring between 9 and 13 mm in the center area. Around the edge in an area of no more than 4 cm (measured from the edge of the racket) the holes may have a larger diameter or a different shape with a variable length and width, not more than 20 mm..."*
- **Veredicto: não sustentada + omissão.** Não é "normalmente": na zona central é obrigatório. E o "normalmente" está a fazer o trabalho que devia ser feito pela exceção real, que omitimos — na faixa de até 4 cm da borda os furos podem ser maiores ou de outra forma, até 20 mm.
- **Correção sugerida:** "na zona central os furos têm de medir entre 9 e 13 mm; numa faixa de até 4 cm a contar da borda podem ser maiores ou de outra forma, até 20 mm".
- **Confiança: alta.**
- Nota menor na mesma regra: dizemos *"Não pode ter qualquer dispositivo **eletrónico** visível ou sonoro"*. O regulamento (ponto 10) diz *"any visible or audible device"* — sem restringir a eletrónico. A palavra "eletrónico" estreita a proibição. *Confiança: alta; gravidade: baixa.*

### C7. `the-serve` — a posição do servidor está incompleta

- **Rule 6** (referência correta)
- O nosso texto: *"Quem serve tem de ter pelo menos um pé atrás da linha de serviço, sem a pisar nem ultrapassar a linha central imaginária."*
- O regulamento, Rule 6.1: *"...must stand with one foot behind the service line, **between the imaginary prolongation of the central line of serve and the sidewall (service box)** and **must remain there until the ball has been served**."* E Rule 6.2: *"The server must bounce the ball on the ground to serve, **within the corresponding box in which they are to serve**. The ball may not cross the service line or the imaginary line until it is struck."*
- **Veredicto: omissão.** Faltam três limites: o servidor tem de estar **entre** a linha central prolongada **e a parede lateral** (não apenas do lado certo da central), tem de **manter-se** aí até o serviço estar feito, e o **ressalto prévio** tem de ocorrer dentro do quadrado correspondente. Omitimos também que o primeiro serviço do jogo se faz do lado direito do campo do servidor (Rule 6.5).
- **Correção sugerida:** completar a descrição de posição com o limite lateral, a obrigação de se manter na posição e a exigência de o ressalto ocorrer dentro do quadrado.
- **Confiança: alta.** *Gravidade: média.*

### C8. `point-lost` — falta o caso dos dois parceiros a bater

- **Rule 13** (referência correta). O nosso texto diz expressamente que a lista não é exaustiva, o que atenua muito as omissões — está bem feito.
- Ainda assim, a Rule 13.o merece entrar: *"If both players simultaneously or consecutively hit the ball, the point will be lost. The ball may only be played by one member of the team."* — com a nota do regulamento de que **não** é duplo toque quando os dois tentam bater, um acerta na bola e o outro acerta na pá do parceiro. É a dúvida mais frequente entre praticantes e o nosso item "contacto duplo" não a resolve.
- Ficam de fora, com menor urgência dada a ressalva: 13.f (bater na bola antes de ela passar a rede), 13.n (saltar a rede durante o ponto) e 13.p (bater com um pé ou parte do corpo fora do campo, salvo jogo exterior autorizado).
- **Confiança: alta.** *Gravidade: média (mitigada pela ressalva de não exaustividade).*

---

## D. Regras verificadas sem achados

Confrontadas artigo a artigo e **corretas**, com o `fipArticleRef` certo:

- **`player-positions` (Rule 3)** — a descrição das posições e a liberdade de colocação do recetor e dos dois parceiros correspondem a 3.1 e 3.2.
- **`choice-of-sides` (Rule 4)** — as três opções do sorteio e a comunicação à arbitragem correspondem a 4.1.a–c e 4.2.
- **`return-of-serve` (Rule 8)** — as cinco afirmações correspondem a 8.1–8.5, incluindo o tratamento da ordem de receção trocada por engano.
- **`interference` (Rule 11)** — deliberada, involuntária e segunda involuntária: exato.
- **`point-won` (Rule 15)** — as duas alíneas correspondem a 15.1.a e b.

Também correta na substância, apesar do problema de referência já assinalado em B3: **`court-dimensions`** — todos os valores numéricos batem certo com o regulamento (10×20 m, 6,95 m, 0,88/0,92 m, 4 m nos topos, 6 m de altura livre com 8 m sugeridos para instalações novas).

E **`the-ball`** — os quatro valores numéricos estão todos corretos (6,35–6,77 cm; 56,0–59,4 g; ressalto de 135–145 cm de 2,54 m; acima de 1000 m de altitude, ressalto entre 121,92 e 135 cm). O único problema é a comparação com o ténis (B2).

---

## E. Reprodução literal

**Não foi encontrada reprodução literal do regulamento.** Todo o conteúdo em `pt.ts` está escrito em voz explicativa própria, com exemplos e enquadramento que não existem no original.

Um risco residual a vigiar, sem gravidade neste momento: em `serve-fault`, `correct-return` e `choice-of-sides` a nossa lista segue a **ordem e a segmentação** das alíneas do regulamento quase item a item. A redação é original e não há apropriação de texto, mas se o conteúdo crescer nesse molde (uma alínea nossa por cada alínea deles, na mesma ordem) aproxima-se de uma tradução estruturada. Sugestão preventiva: agrupar por situação de jogo em vez de por alínea, sempre que possível.

---

## F. Cobertura — artigos do regulamento sem regra correspondente

Não são erros; são buracos. Registados para decisão editorial:

- **Rule 10 — "Repetition or 'Let' Point"** não tem regra própria (ver B1). Traz duas condições práticas ausentes do sítio: o "let" tem de ser pedido de imediato, e o árbitro pode negá-lo e dar o ponto por perdido.
- **Rule 1 — "Alternative Score Methods"** (set de 4 jogos, tie-break final, super tie-break de 10 pontos) — ver C1.
- **"Etiquette and Conduct Norms"** (pontualidade, indumentária, identificação, conduta e disciplina, jogo contínuo, abuso de bola/material, tabela de penalizações, desqualificação direta) — secção inteira sem cobertura. É a parte do regulamento em que os dirigentes mais reparam.
- Secções do campo sem cobertura própria: superfície do piso, acessos, iluminação, orientação.
