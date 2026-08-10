# Correções aplicadas ao português — a propagar aos restantes idiomas

Origem: `regras-fip-pt.md` (confronto com o regulamento oficial da FIP,
versão 01.01.2026) e `coerencia-pt.md` (contradições internas).

O português já foi corrigido e é a referência. Este ficheiro lista **a
substância** de cada correção, para que cada idioma a aplique na sua própria
voz.

## Regra essencial: não traduzir

O conteúdo é escrito de raiz em cada idioma, não traduzido — é isso que lhe dá
naturalidade. O que se transporta é o **facto**, não a frase. Se um idioma já
dizia a coisa certa nalgum ponto, deixa-se em paz.

E o campo `status` **não muda**: fica em `"machine"`. Corrigir um erro não é o
mesmo que ter sido revisto por uma pessoa.

---

## Regras (`src/lib/rules/content/<idioma>.ts`)

1. **`the-serve`** — o impacto é **à altura da cintura ou abaixo** ("at or
   below"), não estritamente abaixo. É exatamente onde o árbitro decide.
   Acrescentar: o servidor tem de estar entre o prolongamento da linha central
   e a parede lateral; tem de se manter aí até o serviço estar feito; o
   ressalto prévio tem de ocorrer dentro do quadrado correspondente; o
   primeiro serviço do jogo faz-se do lado direito.

2. **`let-and-net-serve`** — o serviço que toca na rede e cai no quadrado
   certo só se repete **se não tocar na rede metálica antes do segundo
   ressalto**; se tocar, é falta. Acrescentar que também se repete se a bola,
   depois de tocar na rede ou nos postes, acertar em quem recebe ou em algo
   que ele traga. Acrescentar as duas condições do "let" de ponto: tem de ser
   pedido **de imediato** (quem continua a jogar perde o direito) e o árbitro
   pode recusá-lo e dar o ponto por perdido.

3. **`out-of-court-play`** — distinguir por onde a bola sai. **Por cima da
   parede de fundo**: ponto perdido, mesmo com zona de segurança. **Pela
   lateral ou pela porta**: jogada exterior possível, e acaba ao segundo
   ressalto ou ao tocar em algo alheio ao campo.

4. **`the-ball`** — remover a afirmação de que a bola de padel é **mais leve**
   que a de ténis. O regulamento da FIP não faz essa comparação e não há
   segunda fonte. Os quatro valores numéricos estão certos e ficam.

5. **`the-racket`** — na zona central os furos **têm de** medir 9–13 mm (não
   "normalmente"). Acrescentar a exceção real: numa faixa até 4 cm da borda
   podem ser maiores ou de outra forma, até 20 mm. Remover "eletrónico" de
   "dispositivo visível ou sonoro" — o regulamento não restringe a eletrónicos.

6. **`times`** — acrescentar que a assistência médica só é dada **uma vez por
   jogador e por condição tratável**, e não é transferível para o parceiro.
   Acrescentar: acidente não decorrente do jogo (desmaio, reação alérgica,
   tontura, crise respiratória) até 15 minutos; circunstância invulgar (queda
   involuntária, bola que acerta num jogador) até 5 minutos. Acrescentar a
   nota de que o regulamento se contradiz quanto ao tie-break — uma disposição
   diz jogo contínuo, outra concede 20 segundos; na prática seguem-se os 20.

7. **`changes-of-sides`** — acrescentar a consequência prática: se o erro de
   troca só se descobre depois de um primeiro serviço falhado, quem serve fica
   apenas com o segundo serviço.

8. **`serve-fault`** — acrescentar a alínea em falta: a bola bate no quadrado
   certo e sai diretamente pela porta, num campo sem zona de segurança e
   portanto sem jogo exterior autorizado. E **remover o "sempre"**: uma falta
   no primeiro serviço dá direito a um segundo, duas seguidas perdem o ponto,
   e há casos em que o servidor só tem um serviço à partida.

9. **`ball-in-play`** — remover o **"só"**. O segundo ressalto termina a
   jogada, mas não é a única forma de perder o ponto enquanto a bola está em
   jogo. Remeter para a regra de ponto perdido.

10. **`point-lost`** — acrescentar: os dois jogadores da mesma equipa baterem
    na bola, em simultâneo ou seguidos, perde o ponto — só um a pode jogar.
    Com a nota de que **não** conta como duplo toque quando ambos tentam, um
    acerta na bola e o outro acerta na pá do companheiro.

11. **`correct-return`** — separar os casos, porque a afirmação de fecho era
    falsa. Onde a bola fica dentro do recinto (parede do próprio lado,
    rede/postes, canto parede-chão) a jogada prossegue e o adversário tem de
    devolver antes do segundo ressalto. Onde a bola sai do recinto e bate no
    teto, nas luzes ou noutro elemento alheio, **a devolução foi válida mas a
    jogada não continua** — o desfecho decide-se pelas regras de jogo exterior
    e de ponto perdido.

12. **`change-of-balls`** — o jogo não pode prosseguir com **apenas uma** bola
    (não "menos do que o combinado": com duas, num jogo de três, continua-se).
    Acrescentar que, para a contagem de jogos, o aquecimento conta como **dois
    jogos** e o tie-break como **um**. Acrescentar a reposição por desgaste:
    nos dois primeiros jogos após uma troca repõe-se com bola nova, depois com
    bola usada de desgaste semelhante.

13. **`scoring`** — acrescentar a terceira opção de contagem (**ponto
    estrela**: vantagens até se chegar a iguais pela terceira vez).
    Acrescentar as regras de receção do ponto decisivo: a dupla que recebe
    escolhe o lado mas os dois jogadores **não trocam de posição** entre si; em
    provas mistas quem recebe é do **mesmo sexo** de quem serve. Suavizar a
    afirmação categórica sobre "2 de 3 sets", mencionando as alternativas
    previstas: sets curtos de 4 jogos, tie-break a substituir o terceiro set, e
    **super tie-break de 10 pontos**.

---

## Situações (`src/lib/situations/content/<idioma>.ts`)

14. **`ball-out-over-end-wall`** — os papéis estavam trocados. Saída por cima
    da parede de fundo é **ponto perdido**. E quando a bola sai pela lateral,
    quem sai a buscá-la é **quem a recebeu do seu lado**, não o adversário.

15. **`net-touch-on-serve`** — acrescentar a condição da rede metálica (ver 2).

16. **`serve-lands-outside-box`** — remover o "sempre" da segunda tentativa.

17. **`wall-bounce-still-in-play`** — trocar "só perdes o ponto se…" por "o
    que termina a jogada é…".

---

## FAQ (`src/lib/faq/content/<idioma>.ts`)

18. **`scoring`** — dizia que a pontuação é igual à do ténis. Acrescentar o
    **ponto de ouro** no 40-40, que é o formato do circuito profissional que
    este próprio sítio mostra no calendário e nos rankings.

19. **`padel-vs-tennis`** — corrigir "as regras de pontuação são as mesmas": a
    contagem é quase igual, mas o 40-40 muda.

---

## Dicas (`src/lib/tips/content/<idioma>.ts`)

20. **`let-the-wall-work`** — acrescentar a ressalva que falta: isto só se
    aplica **depois** de a bola saltar no chão do teu lado. Se vier direta à
    parede sem tocar no chão, é ponto do adversário. Sem isto, a dica aconselha
    algo que perde o ponto.

---

## Só para alemão

21. **`tips/own-the-net`** — "der den Gegner zum **Aufsetzen** zwingt" está
    errado: `aufsetzen` é a bola a assentar no chão. Os outros quatro idiomas
    dizem "obrigar o adversário **a levantar** a bola", que é o que justifica a
    subida à rede. Usar a formulação que o próprio alemão já usa bem em
    `play-at-their-feet` ("von unten nach oben zurückzuspielen").

22. **`situations/double-hit`** — o alemão descreve a exceção ao contacto duplo
    com **um** interveniente; o regulamento (Rule 13.o) tem **dois**: ambos
    tentam bater, um acerta na bola e o outro acerta na pá do companheiro.
    Corrigir para a formulação do regulamento.

23. **Terminologia** — ver `terminologia-de.md`. O essencial:
    - **`Platz` vs `Court`**: o FAQ usa `Court`/`Padelcourt` (10 ocorrências)
      contra `Platz` em todo o resto do corpus (31). Uniformizar no FAQ para
      `Platz`, que é a forma maioritária e a do glossário.
    - **`Ballwechsel`** está firmado como "rali" em sete usos, incluindo duas
      entradas do glossário. O título de `rules/change-of-balls` usa-o para
      "troca de bolas" — e um título aparece sozinho numa lista, sem contexto.
      Reformular esse título (por exemplo, `Ballwechsel` → `Balltausch`).
    - **`Return`** significa devolução do serviço em `choice-of-sides` e
      `situations/ball-touches-player`, mas em `rules/correct-return` passa a
      significar qualquer bola devolvida. Desambiguar.
    - Restantes achados do FAQ (`Gitter`/`Umzäunung`, `Tie-Break`,
      `aufkommen`/`Aufsprung`) — uniformizar segundo o relatório.
