# Padel Hub — porque é que parece "nu"

Revisão de UX/UI, 11 de agosto de 2026.
Objeto: <https://padel-ten-ivory.vercel.app> e o código em `src/`.

---

## 0. Estado do que está publicado

Verifiquei o sítio contra o código antes de medir seja o que for. **O que está em
produção corresponde ao que está em `src/app/[locale]/page.tsx`.** Confirmei os
três pontos que estavam em dúvida:

| Alteração recente | Publicada? | Prova |
|---|---|---|
| Hero dividido pela linha tracejada (rede) | Sim | A entrada mostra "Padel em Portugal" com próximo torneio (FIP Silver Lisboa, 7 de set.) e melhor classificado (Sofia Araujo, #8) na metade direita |
| Retratos dos atletas em grelha | Sim | Secção "Os primeiros do mundo" com 8 cartões com fotografia |
| Índice das Regras com o artigo da FIP em coluna monoespaçada | Sim | `/pt/rules` mostra "Rule 1", "Rule 6", "Rule 9 & Rule 10"… à esquerda de cada título |

Não há divergência entre código e produção. Tudo o que segue vale para as duas
coisas.

---

## 1. O diagnóstico numa frase

O sítio não está nu por falta de conteúdo. Tem **59 artigos editoriais em
português** (19 regras, 12 perguntas, 10 termos, 10 dicas, 8 situações), 100
posições de ranking por categoria, 121 jogadores portugueses e um calendário
completo de torneios.

Está nu porque **tudo isso é desenhado da mesma maneira**. Medindo:

| Medição | Valor | O que significa |
|---|---|---|
| Declarações de tamanho de letra no `src/` | 131 | — |
| … a 12 px (`text-xs`) ou 14 px (`text-sm`) | **103 (79 %)** | Quatro quintos do sítio é texto pequeno |
| Estilos de título abaixo do H1 | **1** | O mesmo rótulo cinzento em maiúsculas, repetido **23 vezes** |
| Caixas `rounded-lg border border-line bg-surface` idênticas | **19** | Um único tipo de contentor em todo o sítio |
| Raios de canto distintos | 5 (4, 6, 8, 12 px, círculo) em 62 declarações | Sem regra que ligue raio a função |
| Larguras de coluna distintas | 4 (672, 768, 1024, 1152 px) para 17 páginas | Sem regra |
| Imagens que não são retratos de atletas | **0** | Um único SVG (o campo), usado em 1 página de 19 regras |
| Cartões de jogador sem fotografia em `/pt/players` | **~110 de 121 (91 %)** | Quadrados cinzentos vazios |
| Vezes que o aviso "conteúdo não revisto" aparece (PT) | **59** | 11× só na página da FAQ |
| Tokens de cor declarados / usados em mais de 2 componentes | 24 / 14 | Metade da paleta está escrita e não se vê |

A causa não é falta de matéria. É **monotonia estrutural**: o sítio tem um só
volume, um só peso e uma só caixa, e usa-os para tudo — para o campeão do mundo
e para o rodapé.

---

## 2. Achados, por ordem de retorno

### 2.1 A grelha de Jogadores é uma parede de 110 quadrados cinzentos vazios

**Onde:** `/pt/players` (`src/app/[locale]/players/page.tsx`, linhas 46–80,
170).

**O que está mal, com números.** A página de Portugal carrega **121 jogadores
numa só página**, cada um num cartão com um retrato quadrado. Contei os que
têm mesmo fotografia: **cerca de 11**. Os outros **~110 (91 %)** caem no ramo
`{player.photoUrl && …}`, que não desenha nada — fica um `bg-raised` liso, sem
iniciais, sem ícone, sem nada. Numa grelha de 6 colunas em ecrã largo são **~19
filas de quadrados vazios**. No telemóvel (2 colunas, ~165 px de lado) são
**cerca de 12 000 px de rolagem**, quase toda ela cinzenta.

Ao mesmo tempo, a informação real desses 110 jogadores — posição e pontos — está
comprimida em 12 px por baixo de cada quadrado vazio.

**Porque importa.** Esta é a maior superfície visual do sítio inteiro e é
também a página que o dono do produto vai abrir para ver "os portugueses". O
que vê é 91 % de vazio. Nenhuma outra correção compensa isto.

**O que fazer.** Duas coisas, na ordem:

1. **Separar quem tem rosto de quem não tem.** Os ~11 com retrato ficam numa
   grelha de destaque no topo, maiores (3 ou 4 colunas, não 6). Os restantes
   ~110 passam para **uma tabela densa** — posição, nome, pontos —, que é a
   forma certa para 110 registos e ocupa cerca de um quinto da altura. Deixa
   de haver quadrados vazios porque deixa de haver quadrados.
2. **Dar um substituto ao retrato em falta**, onde ainda faça sentido mostrar
   cartão: monograma com as iniciais em Barlow Condensed sobre `bg-raised`, com
   a posição no canto como já está. Não inventa fotografia nenhuma, e um
   quadrado com "SA" lê-se; um quadrado liso não.

**Esforço:** 0,5–1 dia.

---

### 2.2 Há um único estilo de título abaixo do H1, e é o mais fraco possível

**Onde:** `src/components/ui.tsx` (`SectionHeading`), e mais 22 sítios.

**O que está mal, com números.** A combinação
`text-xs|sm font-semibold uppercase tracking-wider text-ink-faint` aparece **23
vezes** no código. É simultaneamente:

- o título de secção da entrada ("Os primeiros do mundo", "Top 5 do ranking");
- o cabeçalho de coluna das tabelas ("Pos.", "Jogador", "País", "Pontos");
- o rótulo dos números na ficha do atleta ("Posição", "Pontos", "Elo");
- o título dos blocos do rodapé ("Explorar", "Aprender", "Idioma");
- o rótulo de grupo em cinco listas (Regras, FAQ, Dicas, Glossário, Jogadores).

Ou seja: **"Os primeiros do mundo" tem exatamente o mesmo peso visual que
"Idioma" no rodapé.** E as duas coisas são cinzento-claro (`--ink-faint`,
#5d6a86 em claro) a 12 ou 14 px.

Somando: das 131 declarações de tamanho, **39 são de 12 px e 64 de 14 px**.
Nunca há `text-base` explícito. Entre os 14 px dos rótulos e os 30 px do H1
**não existe nenhum degrau**. O sítio salta de "muito pequeno e cinzento" para
"título da página" sem nada pelo meio.

**Porque importa.** Isto é a "hierarquia lisa" na sua forma mais pura, e é o que
faz uma página com conteúdo parecer uma página sem conteúdo: o olho não
encontra onde pousar, porque nada se oferece como âncora. É a segunda maior
causa da sensação de "nu", logo a seguir aos quadrados vazios.

**O que fazer.** Introduzir **um degrau que não existe** — o título de secção a
sério:

```
Barlow Condensed 700, 22–24 px, maiúsculas, cor `--ink` (não `--ink-faint`),
com a linha fina a atravessar o resto da largura que o SearchableList já usa.
```

E, ao mesmo tempo, **devolver o rótulo de 12 px maiúsculas cinzento à sua
função original**: cabeçalhos de tabela e legendas de números. Mais nada. São
duas mudanças num ficheiro (`ui.tsx`) e um passar de olhos pelos 23 sítios.

A escala completa passaria a ser de 6 degraus, toda ela já possível com o que
existe (Barlow Condensed + pilha do sistema), sem tipos novos:

| Degrau | Tamanho | Face | Uso |
|---|---|---|---|
| Display | 60/72 px | Condensed 700 caixa alta | Só a marca no hero |
| Título de página | 36/44 px | Condensed 700 caixa alta | H1 (subir dos atuais 30/36) |
| **Título de secção** | **22/24 px** | **Condensed 700 caixa alta, `--ink`** | **Novo — é o que falta** |
| Título de item | 16/18 px | Sistema 600 | Cartões, perguntas, termos |
| Corpo | 16 px | Sistema 400 | Texto corrido |
| Rótulo | 12 px | Sistema 600 caixa alta, `--ink-faint` | Só tabelas e legendas de números |

**Esforço:** 3–5 horas.

---

### 2.3 O mesmo aviso repetido 59 vezes

**Onde:** `RulesList`, `FaqList`, `TipsList`, `GlossaryList`, `SituationsList`,
`rules/[slug]`. A condição é `needsReviewNotice(status)`, que devolve `true`
para tudo o que não seja `"reviewed"` (`src/lib/rules/get-rule.ts:21`).

**O que está mal, com números.** Verifiquei os ficheiros de conteúdo:
**100 % das entradas têm `status: "machine"`**. Não há uma única entrada
revista, em nenhum dos cinco idiomas. Resultado, em português:

| Página | Entradas | Avisos idênticos na mesma página |
|---|---|---|
| FAQ | 11 | 11 |
| Glossário | 10 | 10 |
| Dicas | 10 | 10 |
| Situações | 8 | 8 |
| Regras (fichas) | 19 | 1 por ficha |
| **Total** | **58** | **58** |

Cada aviso é uma caixa `bg-raised` com borda `line-strong` de ~40 px de altura.
Na FAQ, isso é **cerca de 440 px de aviso repetido** numa página cujo conteúdo
útil são as respostas. E como o aviso está *dentro* de cada cartão, entre a
pergunta e a resposta, quebra a leitura 11 vezes.

**Porque importa.** Repetir a mesma frase 11 vezes não a torna mais honesta —
torna-a invisível e faz a página parecer um rascunho. Um aviso que aparece em
100 % dos casos não é um aviso, é uma propriedade da página.

**O que fazer.** Subir o aviso para o nível da página: **uma faixa única**, logo
abaixo do H1, a dizer que o conteúdo desta secção ainda não foi revisto. Manter
a marca por item apenas quando *nem todos* forem iguais — isto é, quando
começar a haver conteúdo revisto, aí sim um selo discreto de 12 px por entrada
faz sentido. Enquanto for 100 %, é uma faixa só.

**Esforço:** 2–3 horas. É provavelmente a melhor relação entre esforço e
limpeza visual de toda a lista.

---

### 2.4 Uma só caixa para tudo, e nada que sangre

**Onde:** todo o lado. `rounded-lg border border-line bg-surface` aparece **19
vezes** (`ui.tsx:11`, `FaqList:45`, `TipsList:39`, `GlossaryList:35`,
`SituationsList:39`, `NewsList:63`, `RulesList:37`, `RankingsTable:126`,
`MatchListItem:35`, `search:111`, `training:29`, `players:53`, `settings:31/37/43`,
`tournaments:176`, …).

**O que está mal, com números.**

- **62 declarações de raio**, em 5 valores distintos (4 px ×10, 6 px ×17,
  8 px ×28, 12 px ×4, círculo ×3), sem que o valor signifique nada: um botão de
  filtro é 6 px, um emblema é 4 px, um cartão é 8 px, e o hero é 12 px — mas o
  cartão de jogador, que é o elemento mais importante da grelha, é 8 px como
  todos os outros.
- **73 declarações de borda ou divisória**, todas `--line` a 1 px.
- **Dentro do `<main>` não há um único elemento que atinja a largura do
  ecrã.** O cabeçalho e o rodapé têm fundo de ponta a ponta; o conteúdo é
  sempre uma pilha de retângulos brancos da mesma largura, com a mesma linha de
  1 px, sobre o mesmo cinzento.
- Só **3 páginas** têm alguma superfície tratada de forma diferente: as que usam
  `.court-panel` (entrada, ficha de atleta, ficha de torneio). As outras 14 não
  têm nenhuma.

**Porque importa.** Um sítio com um só tipo de contentor não tem ritmo. O leitor
percorre 8 caixas iguais e conclui, sem pensar, que as 8 valem o mesmo — e que
não há nada especial ali.

**O que fazer.** Três intervenções, todas com o material que já existe:

1. **Uma banda de largura total por página**, para o bloco de topo. Fundo
   `--surface` de ponta a ponta (ou `.court-panel`), com o H1 e o essencial lá
   dentro, e a linha tracejada da rede a fechá-la por baixo — o mesmo traço do
   `PadelCourt` e do hero. Dá a cada página uma "abertura" em vez de um título
   solto sobre cinzento. Ganha-se contraste estrutural sem uma imagem nova.
2. **Reservar o raio de 12 px e o `.court-panel` ao bloco principal**, e usar
   8 px para tudo o resto. Dois raios, com significado, em vez de cinco sem.
3. **Deixar as tabelas encostarem à banda**, sem borda própria, quando são o
   conteúdo principal da página (Rankings, Torneios). Uma tabela dentro de uma
   caixa dentro de uma coluna é uma moldura a mais.

**Esforço:** 1–1,5 dias (o ponto 1 é o grosso).

---

### 2.5 Estados vazios e de erro: quatro tratamentos diferentes, seis deles nus

**Onde:** disperso.

**O que está mal, com números.** Contei **11 ramos de erro ou vazio** no sítio.
Estão desenhados em quatro linguagens diferentes:

| Tratamento | Onde | Quantos |
|---|---|---|
| Caixa tracejada, centrada, com saída | `SectionNotice`, `RankingsTable` sem resultados, `/search` sem resultados | 3 |
| Parágrafo com cor esbatida, sem caixa | `players/[id]` sem jogos, `tournaments/[id]` sem jogos, `SearchableList`, `NewsList`, `players` vazio | 5 |
| **`<p role="alert">` completamente sem estilo** | `news`, `rankings`, `players`, `tournaments`, `tournaments/[id]` | **5** |
| Silêncio total | Retrato em falta (`{photoUrl && …}`) | 1 (×110 ocorrências) |

Os cinco `<p role="alert">{t("error")}</p>` são o pior caso: quando a Padel API
falha, a página de Rankings fica com um título de 30 px em maiúsculas e **uma
linha de texto preto a 16 px a flutuar sobre cinzento**. Não há caixa, não há
ícone, não há botão de tentar outra vez, não há sugestão de para onde ir. Lê-se
como sítio avariado, não como dados indisponíveis. Em `/news` e
`/tournaments/[id]` é ainda mais grave: o erro **substitui a página inteira** —
sai sem `PageHeader`, sem migalhas, sem rodapé de secção.

**Porque importa.** A API é externa, tem limite de pedidos e devolve 429 sob
carga (está documentado no próprio código, em `get-home-data.ts`). Estes estados
vão aparecer a utilizadores reais. Neste momento, quando aparecem, o sítio
parece partido.

**O que fazer.**

1. Promover `SectionNotice` a componente único de estado — **um** desenho: caixa
   tracejada, `--ink-muted`, uma frase que diz o que falhou, e sempre uma saída
   (ligação para a secção acima ou botão de recarregar).
2. **Nunca substituir a página pelo erro.** O `PageHeader` e as migalhas ficam
   sempre; o erro entra no lugar do conteúdo. A ficha de atleta já faz isto bem
   (`players/[id]:110-131`) — é o padrão a copiar para as outras cinco.
3. O retrato em falta passa a ter monograma (ver 2.1).

**Esforço:** 4–6 horas.

---

### 2.6 A entrada diz duas vezes a mesma coisa, com dois pesos diferentes

**Onde:** `src/app/[locale]/page.tsx`.

**O que está mal.** A entrada tem 5 blocos. O hero (linha 123) mostra, à direita
da rede, o **próximo torneio em Portugal**. Quarenta pixéis abaixo, a primeira
secção da página (linha 211) chama-se "Próximo torneio" e mostra o **próximo
torneio mundial**, num painel branco liso. São duas afirmações do mesmo tipo, a
40 px uma da outra, em duas linguagens visuais diferentes — e a de baixo tem o
mesmo rótulo cinzento de 14 px que "Últimas notícias".

Além disso, a ordem dos blocos é: hero → 1 torneio → 8 retratos → 10 linhas de
ranking → 3 notícias. **O bloco com mais força visual da página (os 8 rostos)
está em terceiro lugar**, atrás de um painel com um único torneio dentro.

E a página **acaba** com 3 títulos de notícias a 14 px — a última impressão que
deixa é o texto mais pequeno que tem.

**Porque importa.** A entrada é onde se decide se o sítio "tem alguma coisa". A
sequência atual gasta o primeiro terço a repetir-se e só depois mostra a coisa
que impressiona.

**O que fazer.**

1. **Subir os retratos para logo abaixo do hero.** São o único material visual
   forte que existe e estão em terceiro.
2. **Fundir o "Próximo torneio" mundial no hero** ou dar-lhe o tratamento de
   painel de resultados que a ficha de torneio já tem (nome grande em Condensed,
   emblema "a decorrer" em amarelo da bola) em vez de um painel neutro.
3. **Terminar com peso**, não com o texto mais pequeno: as notícias antes do
   ranking, ou um bloco de fecho com uma chamada às Regras/FAQ — que é o
   conteúdo próprio do sítio e neste momento não é mencionado na entrada uma
   única vez. (Confirmei: as 59 peças editoriais em português, a coisa que
   distingue este sítio de um agregador, **não aparecem na página de entrada**.)

**Esforço:** 4–6 horas.

---

### 2.7 Densidade errada nos dois sentidos

**Onde:** listas editoriais e páginas de índice.

**O que está mal, com números.**

**Apertado de mais onde se lê texto corrido.** As respostas da FAQ, as dicas, as
definições do glossário e as situações são todas `text-sm` (14 px) dentro de um
cartão `p-4` numa coluna `max-w-3xl`. Contas: 768 px de coluna − 32 px de
enchimento = 736 px de linha; a 14 px na pilha do sistema dá **≈ 105 caracteres
por linha**. O intervalo confortável para texto corrido é 45–75. Está **40 %
acima do limite superior**, e a 14 px. As fichas de regra estão melhor (16 px em
`max-w-2xl` ≈ 84 caracteres) mas ainda acima.

**Ar a mais onde se pedia matéria.** A página `/pt/training` é, no total: um H1,
uma linha de introdução e **duas caixas**. Numa coluna de 768 px dentro de um
invólucro de 1152 px. É uma página inteira para dois links.

**Ar a mais nas laterais, em quase todo o lado.** Das 17 páginas, **9 usam
`max-w-3xl` (768 px)** dentro de um `<main>` de `max-w-6xl` (1152 px). Num
portátil de 1440 px, isso deixa **cerca de 33 % da largura do invólucro vazia**
de cada lado do conteúdo, sem que nada explique porquê — o cabeçalho e o rodapé
usam a largura toda, o conteúdo não. São quatro larguras distintas (672, 768,
1024, 1152) sem regra que as ligue.

**Porque importa.** A combinação "linha demasiado longa + letra demasiado
pequena + margens enormes" é exatamente a receita de uma página que parece ter
pouco conteúdo enquanto tem muito.

**O que fazer.**

1. Corpo das listas editoriais a **16 px** e coluna de leitura fixada em
   `max-w-[68ch]` (≈ 65–70 caracteres). Perde-se largura, ganha-se leitura, e o
   texto passa a parecer texto e não legenda.
2. **Duas larguras, não quatro:** 1152 px para páginas de dados (Rankings,
   Torneios, Jogadores) e ~760 px para páginas de leitura. As restantes
   alinham-se a uma das duas.
3. `/pt/training` deixa de ser uma página de dois links: passa a listar as
   **10 dicas e os 10 termos** diretamente, ou funde-se com as suas duas
   subpáginas. Uma página que só existe para encaminhar não merece um lugar na
   navegação principal.

**Esforço:** 5–7 horas.

---

### 2.8 Metade da paleta está escrita e não se vê

**Onde:** `src/app/globals.css`, linhas 53–112.

**O que está mal, com números.** Estão declarados **24 tokens de cor** (mais 24
no tema escuro). Contei as utilizações:

| Token | Onde é usado | Ocorrências |
|---|---|---|
| `--accent` e derivados | Por todo o lado (ligações, botões, filtro ativo) | ~72 |
| `--live` (amarelo da bola) | **Um só componente** (`ui.tsx:28`, emblema "a decorrer") | 2 |
| `--gold` / `--silver` / `--bronze` | **Um só componente** (`RankingsTable:71-73`) | 9 |
| `--down` | `RankingsTable` | 2 |
| `--live-soft`, `--down-soft` | **Em lado nenhum** | 0 |

A decisão de guardar o amarelo da bola para "o que está a decorrer" está certa e
não se mexe. Mas na prática **o amarelo aparece numa página, num emblema de
~60×20 px**, e as medalhas aparecem em 3 linhas de uma tabela de 100. O resto do
sítio é branco sobre cinzento com verde nas ligações.

**Porque importa.** Não é falta de cor — é que a identidade escolhida ("campo à
noite") está declarada mas quase não é exercida. O sítio não parece ter uma
paleta; parece não ter nenhuma.

**O que fazer** — sem inventar cores novas, só usando as que já lá estão:

1. **O amarelo da bola em todos os sítios onde há um "agora".** Neste momento
   só o emblema de torneio a decorrer o usa. Deviam usá-lo também: a linha do
   torneio a decorrer na tabela (fundo `--live-soft`, que está declarado e por
   estrear), o marcador de "hoje" no calendário, e o bloco do hero quando o
   torneio destacado está a decorrer.
2. **A rede tracejada como divisor recorrente.** O hero já a usa
   (`border-dashed border-accent/35`) e o `PadelCourt` também. É a marca gráfica
   mais própria que este sítio tem e aparece em 2 sítios. Devia separar secções
   em todas as páginas — custa uma classe e é imediatamente reconhecível.
3. **As medalhas do pódio na entrada**, não só na tabela grande: as colunas de
   "Top 5" da entrada distinguem o primeiro apenas por `font-semibold` +
   `text-accent`, enquanto a página de Rankings tem discos de ouro, prata e
   bronze. O mesmo dado, dois desenhos, e o pior é o que está na entrada.

**Esforço:** 4–6 horas.

---

### 2.9 Mobile: o cabeçalho come um quarto do ecrã e as tabelas fogem de lado

**Onde:** `SiteHeader.tsx`, `RankingsTable.tsx`, `tournaments/page.tsx`.

**O que está mal, com números.**

- O `<header>` é `sticky top-0` e inclui **duas linhas**: marca + pesquisa +
  seletor de idioma (~50 px), e a navegação de 8 secções que **quebra para 2 ou
  3 linhas** a 375 px (a soma das larguras dos 8 rótulos ronda os 680 px contra
  343 px de largura útil). Total: **130–170 px permanentemente fixos**, ou seja
  **20–26 % da altura de um iPhone SE**. A decisão de quebrar em vez de rolar
  está certa (está documentada no código e resolve um problema pior), mas o
  custo em ecrã pequeno não foi pago.
- **As duas tabelas principais rolam na horizontal sem qualquer pista.**
  `overflow-x-auto` sem sombra, sem esbatimento na margem, sem coluna fixa. Em
  Torneios são 4 colunas com nomes como "FIP Silver Bali Island Sports" e
  localidades — a 375 px, metade da tabela está fora do ecrã e nada o indica.
  Em Rankings, a coluna "País" empurra "Pontos" para fora, que é a coluna que as
  pessoas foram lá ver.
- Os nomes nos cartões de jogador são `truncate` a 14 px condensado em ~165 px:
  "Beatriz Gonzalez Fernandez" corta.

**O que fazer.**

1. No telemóvel, **encolher o cabeçalho ao rolar**: a linha da navegação
   desaparece depois do primeiro deslize e volta ao subir. Recupera ~80–120 px.
   Em alternativa, reduzir as 8 secções visíveis a 5 e passar Definições,
   Notícias e Treino para um "Mais".
2. **Dar pista ao scroll horizontal:** um esbatimento de 24 px na margem direita
   enquanto houver conteúdo escondido, e fixar a primeira coluna (posição/nome).
3. Abaixo de `sm`, **as tabelas deixam de ser tabelas**: cada linha passa a duas
   linhas de texto (nome + pontos por baixo, à direita a posição). É o que já
   acontece bem no `MatchListItem`.

**Esforço:** 1 dia.

---

### 2.10 A ficha de regra está fora do sistema

**Onde:** `src/app/[locale]/rules/[slug]/page.tsx`.

**O que está mal, com números.** É a única página de conteúdo que **não usa
`PageHeader`**. O seu H1 (linha 76) é `text-2xl … sm:text-3xl font-semibold`,
sem `uppercase` — enquanto o H1 das outras 10 páginas é
`text-3xl … sm:text-4xl font-bold uppercase`. Diferem em **três dimensões ao
mesmo tempo**: tamanho (24/30 contra 30/36), peso (600 contra 700) e caixa
(baixa contra alta). Estas são as **19 páginas mais numerosas do sítio**, e são
as que parecem menos do sítio.

Além disso: chega-se a uma regra, lê-se, e **não há para onde ir**. Não há
"regra anterior / seguinte" entre as 19, não há ligação de volta à FAQ
relacionada (a relação existe nos dados — `relatedRuleSlug` — mas só é usada no
sentido FAQ → Regra, nunca no inverso), e o rodapé da ficha é uma linha de
14 px cinzento com o PDF da FIP.

**Porque importa.** 19 páginas × 5 idiomas = 95 páginas com um beco sem saída
no fim. É também a maior perda de SEO interno do sítio.

**O que fazer.**

1. Passar a ficha a usar `PageHeader`, com o artigo da FIP como sobre-título em
   monoespaçado — exatamente o tratamento que o índice já tem e que ficou bem.
2. Rodapé de navegação: **regra anterior / regra seguinte**, e as perguntas da
   FAQ que apontam para esta regra (basta inverter o índice que já existe).
3. O bloco "Fonte oficial" merece ser uma caixa, não uma linha esbatida — é o
   argumento de credibilidade da página inteira.

**Esforço:** 4–6 horas.

---

### 2.11 Retratos de 1024 px mostrados a 96 px

**Onde:** `src/app/[locale]/players/[id]/page.tsx`, linha 162.

**O que está mal, com números.** A API dá retratos a **1024×1024**. Na ficha do
atleta — a página inteiramente dedicada a essa pessoa — a fotografia é mostrada
a **96×96 px em círculo**: 0,9 % dos pixéis disponíveis. Na entrada, a mesma
fotografia aparece a ~250 px. **O sítio mostra o retrato maior na montra do que
na ficha.**

**Porque importa.** É o único material fotográfico que existe e está a ser
desperdiçado justamente onde é o assunto. Não é preciso comprar nada: os pixéis
já estão lá.

**O que fazer.** Na ficha, o retrato passa a bloco: 200–260 px, quadrado (a
origem é quadrada, não corta ninguém), à esquerda do nome e dos números, dentro
do `.court-panel` que já existe. Em ecrã pequeno, empilha por cima do nome. O
painel de números (posição / pontos / Elo em Condensed a 36 px) mantém-se como
está — está bem.

**Esforço:** 2–3 horas.

---

### 2.12 O rodapé é o maior bloco de texto de peso uniforme do sítio

**Onde:** `SiteFooter.tsx`.

**O que está mal.** Quatro colunas, **14 ligações a 14 px**, todas
`text-ink-muted`, todas com o mesmo peso, sob três rótulos de 12 px iguais aos
títulos de secção do conteúdo (ver 2.2). É a maior superfície contínua de texto
uniforme de qualquer página, e está no sítio onde o leitor decide se continua.

**O que fazer.** Reduzir a duas colunas, dar `--ink` (não `--ink-muted`) às
ligações, e substituir a repetição da marca por algo que se diga uma vez: o
número de regras traduzidas e de atletas cobertos. Números concretos no rodapé
fazem um sítio parecer maior — e neste caso são verdadeiros (59 artigos, 121
atletas portugueses, 5 idiomas).

**Esforço:** 2–3 horas.

---

## 3. As três coisas

Se só houvesse tempo para três, seriam estas — pela ordem em que mudam a
perceção por hora gasta:

### 1.ª — Acabar com os 110 quadrados vazios da página de Jogadores
*(§2.1 — 0,5 a 1 dia)*

É a maior superfície do sítio e está 91 % vazia. Separar os ~11 atletas com
retrato (grelha grande, em destaque) dos ~110 sem retrato (tabela densa de
posição/nome/pontos) elimina o vazio **e** melhora a leitura dos dados, porque
110 registos querem uma tabela e nunca quiseram cartões. Nada mais nesta lista
muda tanto por tão pouco.

### 2.ª — Criar o degrau de título que falta
*(§2.2 — 3 a 5 horas)*

Um único estilo novo — título de secção a 22–24 px em Barlow Condensed, caixa
alta, cor `--ink` — aplicado nos ~10 sítios onde hoje está o rótulo cinzento de
14 px, e o rótulo de 14 px devolvido às tabelas. Hoje 79 % do texto do sítio
está a 12 ou 14 px e existe **um só** estilo de título abaixo do H1, usado 23
vezes para coisas de importância completamente diferente. Isto resolve-se num
ficheiro e é o que faz o sítio deixar de ser "liso".

### 3.ª — Uma banda de abertura em cada página, fechada pela rede tracejada
*(§2.4 — cerca de 1 dia)*

Neste momento nada dentro do `<main>` toca as margens do ecrã: são 19 caixas
brancas idênticas, com a mesma borda de 1 px e o mesmo raio de 8 px, empilhadas
sobre cinzento. Dar a cada página um bloco de topo de largura total — com o H1,
o essencial e a linha tracejada da rede a fechá-lo — cria o contraste
estrutural que falta, usa a marca gráfica que o padel já ofereceu (a rede é a
única divisão que existe num campo), e não precisa de uma única fotografia
nova.

---

## 4. O que não recomendo

Para ficar registado, e porque é a tentação óbvia perante um sítio "nu":

- **Não mudar a paleta.** O "campo à noite" está certo e coerente. O problema é
  que metade dela nunca chega a ser usada (§2.8), não que esteja errada.
- **Não acrescentar um segundo tipo de letra.** Barlow Condensed + pilha do
  sistema chegam para os seis degraus propostos. O que falta é uma **escala**,
  não uma face.
- **Não procurar fotografias de campos.** Não há licença, e o material que
  existe — 1024 px de retrato por atleta, o campo em SVG, e tipografia
  condensada — está a ser subaproveitado em três sítios diferentes (§2.1, §2.8,
  §2.11). Há mais a ganhar em usar bem o que já cá está do que em arranjar mais.
- **Não animar nada.** Nenhum dos problemas acima é de movimento.
