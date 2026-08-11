# O Padel Hub visto por quem faz produto de dados desportivos

Avaliação do https://padel-ten-ivory.vercel.app contra o padrão dos sítios de
dados desportivos que geram hábito — o Sofascore, que as pessoas abrem todos os
dias, e o Transfermarkt, onde as pessoas ficam uma hora sem dar por isso. Nem um
nem outro é sorte: são um conjunto pequeno de mecanismos repetíveis, e quase
todos são independentes do desporto.

O que fiz antes de escrever, para se saber o peso de cada afirmação:

- **Li o código, não só o ecrã.** Toda a afirmação sobre "a API já devolve X"
  está verificada em `src/lib/padel-api/schemas/` e em
  `src/lib/data-sources/padel-api-source.ts`. Onde digo que um campo existe e não
  está a ser usado, o campo está no schema.
- **Confirmei o catálogo de endpoints** contra `https://padelapi.org/docs/llms.txt`
  e o texto integral da documentação, e os planos contra a página de preços.
- **Não consegui testar a API.** Não tenho como fazer pedidos autenticados nesta
  sessão. Por isso separei sempre "verificado no código" de "documentado, por
  confirmar", e a §8 lista exatamente os cinco pedidos que é preciso fazer à mão
  antes de se construir seja o que for em cima deles. Este projeto já descobriu
  três vezes que a documentação pública não bate certo com a resposta real; não
  vou ser eu a partir desse princípio.

---

## 1. O que o sítio já é

Não é um esboço. Há oito ecrãs, cinco idiomas com paridade real, dados vivos com
degradação por secção, cache com as cadências certas, e um cuidado de desenho
acima da média do sector — o disco de pódio na tabela de rankings, o painel de
números grandes na ficha de jogador, o retrato a 1024 px usado ao tamanho que
merece. A camada de dados está mais bem construída do que a de muitos produtos
pagos: schemas validados, valores mascarados marcados como tal em vez de
inventados, páginas em série para não apanhar 429.

O problema não é qualidade de execução. É **categoria**. Neste momento o sítio é
um *agregador*: mostra o que a fonte diz, com bom gosto. Um destino é outra
coisa — é um sítio onde há sempre uma pergunta a seguir. É essa a distância que
esta análise mede.

---

## 2. Os mecanismos

Legenda de esforço: **P** = uma sessão ou menos · **M** = duas a quatro sessões ·
**G** = mais do que isso, ou depende de dados que ainda não temos.

| # | Mecanismo | Quem o usa bem | Dá para fazer aqui? | O que é preciso | Esforço |
|---|---|---|---|---|---|
| 1 | **Toda a entidade é um link** — nenhum nome no ecrã é texto morto | Transfermarkt. É o mecanismo dele, não uma prenda | **Sim, e é o buraco maior** | `parseMatchesResponse` recebe os ids dos jogadores (`MatchPlayerSchema` tem `id`) e **deita-os fora**. Guardar o id ao lado do nome e ligar | **P** |
| 2 | **Página de jogador como hub** — tudo o que toca no atleta parte dali | Ambos | **Parcialmente já** | Existe ficha com foto, lado, mão, idade, Elo, duplas com datas, 10 jogos. Falta: adversários clicáveis (#1), próximo torneio, ligação ao ranking do país | **P** |
| 3 | **Confronto direto (H2H)** | Sofascore — é dos separadores mais clicados que há | **Sim, provavelmente no plano gratuito** | `POST /matches/headtohead`. A documentação não lhe põe cadeado. Já existe pesquisa de jogadores para escolher os dois. **Ver §8.1** | **M** |
| 4 | **Comparação lado a lado de dois atletas** | Transfermarkt | **Sim, hoje, sem endpoint novo** | Já temos rank, pontos, **Elo**, idade, altura, lado, mão, naturalidade, duplas. Duas fichas em colunas | **P** |
| 5 | **Probabilidade de vitória** | Sofascore (com modelo próprio) | **Sim — e é a coisa mais invulgar que esta API dá** | `POST /matches/simulate` devolve favorito e probabilidade a partir do Elo. Sem cadeado documentado. **Ver §8.2** | **M** |
| 6 | **Trajetória de carreira** (o gráfico que faz voltar) | Transfermarkt, com o valor de mercado ao longo do tempo | **Não no plano gratuito** | `GET /players/{id}/rankings` existe, mas no gratuito só o instantâneo mais recente é visível; os anteriores vêm `hidden_free_plan`. **Requer Plus, 19 €/mês** | M (depois de pago) |
| 7 | **Quadro de torneio desenhado** (chaveira, não lista) | Sofascore | **Sim, hoje** | Os dados estão todos: `round` conta *para baixo* até à final, `round_name`, resultado por set, vencedor. É trabalho de apresentação, zero de dados | **M** |
| 8 | **Tabelas ordenáveis por qualquer coluna** | Transfermarkt, obsessivamente | **Sim, hoje** | `RankingsTable` filtra por texto mas **não ordena por nada**. Ordenar por pontos, variação, país, idade | **P** |
| 9 | **"Quem joga hoje"** — a razão nº 1 para abrir a app de manhã | Sofascore. É a app inteira | **Sim, mas sem o ao vivo** | `GET /matches` com filtro de datas. Dá calendário e resultado *quando a API atualizar*, nunca ao minuto. **Ver §8.3** | **M** |
| 10 | **Resultado ao vivo, ponto a ponto** | Sofascore | **Não** | Só no Pro, 49 €/mês, com WebSocket. E meio ao vivo é pior do que nenhum | G |
| 11 | **Movimentos da semana** — quem subiu, quem caiu | Transfermarkt e Sofascore, em blocos editoriais | **Sim, hoje, com zero pedidos extra** | `ranking_diff` e `points_diff` **já vêm em cada linha do ranking** e já estão parseados. Falta é dar-lhes uma página | **P** |
| 12 | **Recordes e extremos** ("o mais novo no top 50") | Transfermarkt vive disto | **Sim, hoje** | Idade, altura, mão, lado e nacionalidade estão todos em `PlayerProfile`. É aritmética sobre uma lista que já se lê | **P** |
| 13 | **Distância até ao objetivo** ("faltam 240 pontos para o top 10") | Ambos, em contexto de classificação | **Sim, hoje** | Diferença entre linhas da mesma tabela. Não precisa de nada | **P** |
| 14 | **Lente nacional** — "os nossos no circuito" | Sofascore, com seleção de país à entrada | **Sim, e já está meio feita** | `/players?country=PT` existe e funciona. Falta transformá-la de grelha em *acompanhamento*: variação semanal, próximo torneio de cada um | **P** |
| 15 | **História da dupla** (quando se juntaram, quanto duraram) | Transfermarkt, com o historial de clubes | **Sim, hoje** | `pairs` devolve `first_match_at` e `last_match_at`. Já estão no ecrã como datas soltas; falta lê-las como cronologia | **P** |
| 16 | **Palmarés do torneio** (todos os vencedores, edição a edição) | Transfermarkt | **Provavelmente não no gratuito** | `GET /tournaments/{id}/editions` existe e não tem cadeado, mas os vencedores de edições com mais de 6 meses caem na janela mascarada. **Ver §8.4.** Se assim for, **requer Plus** | M (depois de pago) |
| 17 | **Vídeo / destaques** | Sofascore, como isco de permanência | **Talvez, por confirmar** | `GET /tournaments/{id}/videos` está documentado sem cadeado. Nunca foi tocado neste projeto. **Ver §8.5** | M |
| 18 | **Estatística de jogo** (winners, erros, % de primeiro serviço) | Sofascore | **Não** | `GET /players/{id}/stats` e as estatísticas de jogo são **Pro, 49 €/mês** | G |
| 19 | **Efemérides** (aniversários, "há um ano que jogam juntos") | Transfermarkt, em blocos laterais | **Sim, hoje** | `birthdate` no jogador, `first_match_at` na dupla | **P** |
| 20 | **Ranking nacional federativo** | O que faz um sítio ser diário para o amador | **Não, e nenhum plano resolve** | A FPP/FFT/DPV não estão nesta API nem em nenhuma. Ver §9 | — |
| 21 | **Clubes, campos, ligas amadoras** | Playtomic (e é não-objetivo declarado) | **Não** | Não existe na fonte | — |
| 22 | **Perfil seguido / favoritos** | Sofascore. É o que transforma visita em hábito | **Sim, hoje, sem servidor** | `localStorage`, como já se faz com o tema. "Os meus jogadores" no topo da entrada | **M** |

**Contagem honesta: 13 dos 22 mecanismos são construíveis já, com os dados que
esta API dá no plano gratuito.** Isso é muito. O problema deste sítio não é falta
de dados — é que os dados que tem estão a ser mostrados uma vez cada um, em vez
de trabalhados.

---

## 3. Como é que se faz de uma tabela de números uma notícia

Este é o problema central do produto e merece ser tratado à parte, porque é onde
o sítio hoje falha por inteiro. Um ranking é uma lista ordenada de 100 nomes com
um número ao lado. Ninguém volta a uma lista ordenada. Volta-se a uma *história*.

Os sítios bons fazem seis coisas, e cinco delas não custam um pedido a mais:

**a) A variação é a notícia; o valor absoluto não é.** Que o Tapia tenha 12 340
pontos não diz nada a ninguém — não há escala mental para esse número. Que tenha
ganho 800 numa semana e esteja agora a 100 do primeiro lugar, isso lê-se. O sítio
**já tem** os dois deltas na mão (`points_diff`, `ranking_diff`, parseados em
`schemas/rankings.ts`) e usa-os como um triângulo de 10 px dentro de uma célula.
Está a gastar a matéria-prima da notícia como decoração de tabela.

**b) A data torna o número um acontecimento.** `RankingItemSchema` tem um campo
`date` que é lido pelo Zod e **não é levado para `RankingEntry`**. Ninguém que
chega à página de rankings sabe se aquilo é de hoje ou de março. Um cabeçalho
"Ranking de 11 de agosto · próxima atualização segunda-feira" faz duas coisas de
uma vez: dá confiança e cria o compromisso de voltar. Custa um campo.

**c) O limiar dá consequência.** "9.º, 4 820 pontos" é um facto. "9.º — a 240
pontos do top 8, que dá acesso direto ao quadro principal" é uma situação. A
segunda frase sai de subtrair duas linhas da mesma tabela. É o mecanismo mais
barato que existe para transformar posição em tensão, e o sítio não o usa
nenhuma vez.

**d) O rosto ancora o número.** As fotografias vêm a 1024×1024 e o sítio já
percebeu isto — a entrada e a página de Jogadores usam-nas bem. A tabela de
rankings, que é a página mais visitada de qualquer portal destes, não mostra uma
única cara em 100 linhas.

**e) Ordenar por pergunta, não por posição.** Cada ordenação alternativa da mesma
tabela é uma manchete: quem mais subiu esta semana; os cinco mais novos no top
100; quantos canhotos há no top 50 (`hand` está no perfil); que país tem mais
gente no top 200. São todos derivados de dados que a página já carregou.

**f) A comparação com os pares.** Sem histórico não se pode dizer "o melhor
português de sempre". Pode dizer-se "o melhor português neste momento, e o
segundo está 400 lugares atrás" — que já é uma frase com forma de notícia, e sai
de `/players?nationality=PT&sort_by=ranking`, que o sítio já chama.

O que **não** se consegue sem pagar: qualquer frase que comece por "pela primeira
vez desde", "o melhor registo dele desde", "recuperou o lugar que tinha em". Todas
elas precisam de histórico — **Plus, 19 €/mês**. É bom saber-se exatamente o que
esse dinheiro compra: compra o *tempo verbal composto*. Sem ele, o sítio só sabe
falar no presente.

---

## 4. Que páginas geram retorno recorrente

Por ordem de retorno por unidade de esforço. Isto é a lista de construção.

1. **A semana no ranking** (`/rankings/movimentos`). A única página deste sítio
   que tem uma cadência natural: o ranking FIP atualiza semanalmente, e uma
   página que diz "esta semana subiram estes, caíram estes, e entrou este no top
   100" é uma consulta obrigatória a cada segunda-feira. Dados: já os temos
   todos, zero pedidos novos. É a melhor relação valor/esforço do projeto
   inteiro.
2. **Os portugueses no circuito** (evolução de `/players?country=PT`). O único
   "nós" que este conjunto de dados permite. Não é a página com mais tráfego, é a
   página com mais *afeto* — e é o que distingue este sítio de um espelho da API.
3. **Ficha de jogador com tudo ligado.** É o destino de todos os cliques dos dois
   pontos anteriores. Se ela for um beco sem saída, o resto não compõe sessão.
4. **Confronto direto e comparação.** É o que se procura no Google e é o que se
   partilha numa conversa de balneário. Gera entradas novas, não só regressos.
5. **Quadro de torneio desenhado.** Retorno concentrado nas semanas de prova, mas
   nesses dias é a página que se abre três vezes.
6. **"Jogos de hoje".** Potencialmente a nº 1 de todas — é literalmente o modelo
   do Sofascore — mas neste plano é um calendário com resultados atrasados. Vale
   a pena, desde que não se prometa o que não se entrega.

---

## 5. O que já cá está e não está a ser explorado

Achados concretos, todos verificados no código:

- **Os ids dos adversários são deitados fora.** `src/lib/padel-api/schemas/matches.ts`
  parseia `players.team_1[].id` e depois o mapeamento guarda só
  `item.players.team_1.map((p) => p.name)`. Consequência visível em
  `src/components/MatchListItem.tsx`: cada linha de jogo mostra até quatro nomes
  em texto morto. Numa ficha de jogador com 10 jogos são **até 30 ligações por
  página que existem nos dados e não existem no ecrã**. É a correção mais barata
  e com maior efeito estrutural de toda esta análise.
- **`date` do ranking é lido e descartado.** `RankingItemSchema` tem-no,
  `RankingEntry` não. Ver §3b.
- **`elo` está na ficha e não vai a lado nenhum.** Aparece como um número solto
  ao lado dos pontos, sem explicação do que é nem comparação com ninguém. O Elo é
  a única métrica desta API que compara jogadores *independentemente* do calendário
  que fizeram — e é o combustível do `/matches/simulate`. Está a ser tratado como
  terceiro número de um painel.
- **A tabela de rankings não ordena.** `RankingsTable` tem filtro de texto, não
  tem ordenação por coluna nenhuma.
- **`prize` do torneio está no schema e no ecrã em bruto** (`{amount} {currency}`,
  sem `Intl.NumberFormat`, ao contrário do resto do sítio que formata tudo com
  `Intl`).
- **A pesquisa já indexa jogadores e torneios** (`build-live-index.ts`) — ou seja,
  o seletor de jogadores que o H2H precisa **já existe**. A nota antiga de que o
  head-to-head estava adiado "por falta de uma UI de pesquisa" está desatualizada.
- **`height` e `birthplace` são lidos e nunca mostrados** fora da linha de
  identidade.
- **A janela de torneios é de 60 dias para trás e nada para a frente** além do que
  a API devolver por omissão. Não há noção de *época*, apesar de existirem
  endpoints `/seasons`.

---

## 6. As três coisas

Se só se fizerem três, são estas. Todas no plano gratuito, todas com dados
verificados, e a ordem importa porque a segunda e a terceira dependem da primeira.

### Primeira — ligar tudo a tudo, começando pelos adversários

**Porquê esta:** porque é a diferença entre um sítio e uma base de dados com CSS.
O Transfermarkt não retém pessoas por ter dados melhores; retém por nunca haver
um beco sem saída. Aqui, alguém que chegue à ficha da Sofia Araujo lê 10 jogos,
vê 30 nomes de adversárias, e não pode clicar em nenhum. A sessão acaba ali. Os
ids já vêm na resposta — a correção é guardar um campo em vez de o deitar fora, e
depois espalhá-la: adversários, parceiras, vencedores do torneio (que também são
texto morto em `tournaments/[id]/page.tsx`), naturalidade que leva ao país.

É a única recomendação desta lista que é quase gratuita e que **multiplica o valor
de tudo o que se construir a seguir**. Feita esta, cada página nova que se
acrescenta ganha entradas a partir de todas as outras. Não feita, cada página nova
é uma ilha.

**Esforço: pequeno.** Um campo no parser, um componente, uma passagem pelas
páginas.

### Segunda — "A semana no ranking": a página que dá a cadência

**Porquê esta:** porque este sítio não tem, neste momento, **uma única razão para
se voltar amanhã**. Regras, glossário e dicas consultam-se uma vez. Rankings e
calendário mudam, mas a página não diz *que* mudou — o utilizador teria de
comparar de cabeça com o que viu na semana passada. Um sítio de desporto sem
cadência não é um destino, é uma referência.

O ranking FIP atualiza semanalmente e a API **já manda a variação em cada linha**.
Com esses dois deltas e a data faz-se uma página que responde às perguntas que as
pessoas realmente fazem: quem subiu mais, quem caiu mais, quem entrou no top 100,
quem está mais perto de passar alguém, e — na versão portuguesa — como se mexeram
os portugueses. Cada uma dessas listas é uma manchete gerada de dados, não de
opinião, e portanto não viola a regra de nunca inventar.

Isto é também a resposta direta ao "como é que se faz de números uma notícia": não
se faz escrevendo texto por cima da tabela, faz-se **escolhendo que corte da tabela
se mostra**.

**Esforço: pequeno a médio.** Zero pedidos novos à API — os dados já estão no
mesmo payload dos rankings.

### Terceira — Confronto direto e comparação, com a probabilidade do Elo

**Porquê esta:** porque é o único mecanismo desta lista que traz gente **de fora**.
"X vs Y" é uma pesquisa que as pessoas fazem no Google e é o formato que se
partilha numa conversa. As duas primeiras recomendações melhoram a sessão de quem
já cá está; esta faz chegar quem não conhece o sítio, em cinco idiomas, num nicho
em que quase todo o conteúdo é espanhol.

E tem um remate que nenhum sítio de padel em português tem: `POST /matches/simulate`
devolve o favorito e uma probabilidade calculados do Elo. Uma página que diga "esta
dupla ganha em 58% das simulações" é conteúdo original, defensável e derivado de
dados da fonte — não é opinião nem é invenção. É o tipo de coisa que se cita.

**A ressalva que tem de ser respeitada:** no plano gratuito só há jogos dos últimos
6 meses. Um H2H que diga "2–1" quando o registo de carreira é outro é pior do que
não ter H2H nenhum. A página tem de dizer, sem ambiguidade, **"confrontos nos
últimos 6 meses"** — e é aqui que o Plus se paga a si próprio mais tarde, porque
transformar essa etiqueta em "carreira" é o upgrade mais visível que 19 €/mês
compra.

**Esforço: médio.** Depende de confirmar §8.1 e §8.2 contra a API real. Se um dos
dois endpoints estiver fechado no gratuito, a comparação lado a lado (mecanismo 4)
faz-se na mesma sem endpoint nenhum, com os dados que já se leem.

---

## 7. Vale o dinheiro?

**Plus, 19 €/mês — sim, mas não já.** Compra o histórico completo: gráfico de
evolução de ranking por jogador (mecanismo 6), H2H de carreira em vez de 6 meses
(3), palmarés dos torneios (16), e o tempo verbal composto que a §3 descreve. Tudo
isto **aprofunda páginas que as pessoas já visitam** — não cria a visita. Gastar
19 € num sítio onde os adversários ainda são texto morto é comprar profundidade
para uma sessão que acaba ao segundo clique. Faça-se primeiro as três coisas da
§6; o Plus é o passo seguinte óbvio e nessa altura o dinheiro rende.

**Pro, 49 €/mês — não.** Compra o ao vivo e as estatísticas de jogo. O ao vivo é o
motor do Sofascore, mas exige WebSocket, tratamento de estado em tempo real, e uma
promessa que não se pode falhar — se o resultado ficar preso três minutos, perde-se
mais confiança do que se ganhou. É um produto diferente, não uma funcionalidade a
mais. E as estatísticas de jogo, sozinhas, servem um público que este sítio ainda
não tem.

**Business, 169 €/mês — irrelevante** a esta escala.

---

## 8. Os cinco pedidos a fazer antes de construir

Não tenho como os fazer nesta sessão. Cada um é um pedido com o token que está no
`.env.local`, e cada um decide se uma recomendação sobrevive. Este projeto já
apanhou três vezes a documentação a divergir da resposta real — não se constrói
por cima disto sem confirmar.

1. **`POST /matches/headtohead`** com dois ids de jogadores. Confirmar: (a) que
   não devolve 402; (b) que o `meta.total` conta os confrontos **todos** ou só os
   dos últimos 6 meses — isto muda a etiqueta da página e a honestidade do número;
   (c) a forma exata do `score`, que a documentação mostra como string
   (`"6-4 6-3"`) e o resto da API devolve como array de sets. **Bloqueia a
   recomendação 3.**
2. **`POST /matches/simulate`** com quatro ids. Confirmar que não devolve 402 e
   qual é a forma real da resposta. Se estiver fechado, cai só o remate da
   recomendação 3, não a recomendação.
3. **`GET /matches?after_date=...&before_date=...`**. Confirmar se devolve jogos
   **por disputar** (com `played_at` no futuro e `score` vazio) ou só jogos
   terminados. Decide se o mecanismo 9 é um "jogos de hoje" a sério ou apenas um
   arquivo do que já aconteceu.
4. **`GET /tournaments/{id}/editions`** num torneio recorrente. Confirmar se os
   vencedores das edições antigas vêm com nome ou `hidden_free_plan`. Decide se o
   palmarés (16) é gratuito ou se é mais uma coisa que o Plus compra.
5. **`GET /tournaments/{id}/videos`** num torneio recente. Se devolver conteúdo no
   plano gratuito, é um mecanismo de permanência que ninguém neste projeto sabia
   que existia — e que não custa pedido nenhum a mais do que os que já se fazem.

---

## 9. O veredicto céptico

A pergunta que me foi feita era se, sem dados nacionais, este sítio tem como
competir. A resposta é mais útil do que sim ou não.

**Não vai ser um sítio diário para um jogador amador português, e nenhum plano da
padelapi.org muda isso.** O Sofascore é diário porque a *tua* equipa joga hoje. O
Transfermarkt prende porque estás a discutir o *teu* clube. Este conjunto de dados
não tem nenhum "teu": não tem o ranking da FPP, não tem clubes, não tem a liga em
que o utilizador joga ao sábado, não tem o torneio de nível 3 em que ele se
inscreveu. Um jogador de Setúbal que queira saber a sua classificação nacional não
tem aqui nada. Isso não se compra por 19 € nem por 169 € — não está à venda nesta
API. Está nas federações, e essas não têm API.

**Mas o diagnóstico "não tem como competir" está errado, porque o alvo está mal
escolhido.** Este sítio não é o adversário do Playtomic nem do sítio da federação.
É a *casa em português do circuito profissional* — e nesse terreno o
concorrente real é conteúdo espanhol mal traduzido, tarde ou nenhum. Aí a
comparação não é com o Sofascore: é com não haver nada. Ver padel profissional é
um comportamento de **espetador**, não de praticante, e um espetador não precisa
de estar na base de dados para voltar. Precisa de alguém para seguir, de uma
cadência, e de uma razão para clicar mais uma vez.

As três coisas da §6 são exatamente isso: **alguém para seguir** (a lente nacional,
que já existe e só precisa de ser ligada), **uma cadência** (a semana no ranking) e
**uma razão para clicar mais uma vez** (tudo ligado a tudo, e o H2H no fim). Não
transformam este sítio num Sofascore. Transformam-no na coisa que ele pode
realmente ser, que é o sítio onde um português, um francês ou um alemão que gosta
de padel profissional vai ver o que aconteceu esta semana — e que hoje, sem elas,
não é.

O risco real deste projeto não é a API. É continuar a acrescentar secções — mais
regras, mais dicas, mais glossário — em vez de trabalhar duas vezes os dados que já
lá estão. O sítio tem mais dados por explorar do que conteúdo por escrever.
