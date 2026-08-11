# Padel Hub — análise de quem joga

Revisão do conteúdo e da proposta do sítio (`https://padel-ten-ivory.vercel.app`) do ponto de vista de um jogador amador português: alguém que joga há anos, treina, arbitra torneios de clube e passa quatro horas por semana dentro de um campo em Portugal.

**Método.** Li o relatório `docs/revisao/regras-fip-pt.md` antes de escrever uma linha e não repito o que lá está — o confronto regulamentar está feito e está bem feito. Esta análise ocupa-se do que esse relatório não podia cobrir: o que o conteúdo faz (ou não faz) por quem joga. Percorri as 19 regras, as 8 situações, as 10 dicas, os 10 termos e as 12 perguntas frequentes em `src/lib/*/content/pt.ts`, e as páginas publicadas em PT.

**Nota importante:** as regras foram corrigidas contra a FIP; as **situações, dicas, glossário e FAQ não foram**. Boa parte dos erros abaixo está exatamente aí — no conteúdo que ficou para trás quando as regras avançaram.

---

## Veredicto em três linhas

1. O conteúdo de regras está agora bom o suficiente para se discutir em campo — é a única parte do sítio de que eu me lembraria numa discussão.
2. O resto ("Treino", glossário, FAQ) é conteúdo de primeira aula: verdadeiro, arrumado, e sem uma única coisa que um jogador com seis meses de padel não saiba já.
3. À pergunta "porque voltaria eu cá", a resposta honesta hoje é: **duas ou três vezes por ano, quando houver uma discussão de regras que ninguém saiba resolver.** Não é um hábito. É um marcador de favoritos que se abre em emergência.

---

## A. Erros

Coisas factualmente mal, com a correção. Ordenadas por gravidade.

### A1. A FAQ contradiz a regra corrigida sobre sair do campo — e dá a resposta errada

`src/lib/faq/content/pt.ts`, `ball-out-of-court`:

> **"A bola pode sair do campo e o ponto continuar?"**
> *"Pode. Se a bola sair do recinto depois de ressaltar no teu campo, tens o direito de sair pela abertura lateral, jogá-la de fora e devolvê-la para dentro — desde que ela não tenha saltado uma segunda vez no chão."*

A regra `out-of-court-play` foi corrigida e diz agora o contrário para metade dos casos:

> *"**Por cima da parede de fundo**: o ponto está perdido. Não há nada a ir buscar, mesmo que o campo tenha zona de segurança."*

A FAQ não foi atualizada. Quem chega pela FAQ — que é a porta de entrada declarada em `faq.ts`: *"a FAQ é a porta de entrada, não o destino"* — recebe a resposta errada, e é precisamente a saída por cima do fundo que acontece a cada dois jogos, porque é o resultado normal de um remate a que se responde com um globo curto.

**Correção:** a resposta da FAQ tem de distinguir lateral/porta de parede de fundo, tal como a regra faz. Enquanto forem duas respostas diferentes no mesmo sítio, a credibilidade de ambas cai a zero.

**Nota adicional na mesma resposta:** *"Em campos totalmente fechados, a bola que sai é ponto ganho para quem a mandou."* O critério do regulamento não é o campo ser "totalmente fechado", é o jogo exterior estar ou não autorizado (zona de segurança). Há campos com aberturas e sem zona de segurança utilizável. Como está, manda o leitor decidir por inspeção visual do campo em vez de pelo regulamento da prova.

### A2. A comparação com a bola de ténis foi removida da regra e ficou na FAQ

O relatório FIP (B2) mandou retirar "mais leve" por não haver fonte. A regra `the-ball` foi limpa e apresenta só os valores. Mas a FAQ `padel-balls` manteve a comparação inteira:

> *"A bola de padel tem menos pressão interna, o que lhe dá um ressalto mais baixo e um jogo mais controlado"* e *"Jogar com bolas de ténis num campo de padel torna o jogo demasiado rápido e imprevisível."*

Duas coisas. Primeiro, o mesmo problema de fonte que levou à correção da regra continua aqui por resolver. Segundo, e como jogador: **a segunda frase não é verdade na prática.** Toda a gente já treinou com bolas de ténis num campo de padel quando acabaram as boas, e joga-se perfeitamente — a diferença sente-se, não desmonta o jogo. Uma afirmação exagerada sobre uma coisa que qualquer jogador já experimentou é exatamente o tipo de frase que faz o leitor desconfiar de tudo o resto.

**Correção:** alinhar com a regra. Dar os números da FIP e dizer o que se sente em campo (a bola de padel tem menos pressão e envelhece depressa — perde o salto ao fim de um jogo e meio, que é a razão real por que se trocam bolas), sem inventar uma diferença de categoria que não existe.

### A3. "jogar sem ele custa o ponto" — o cordão

FAQ `first-equipment`:

> *"Confirma só que traz **cordão de pulso**: é o único item que o regulamento torna obrigatório, e jogar sem ele custa o ponto."*

Não custa. O que custa o ponto é largar a pá durante o ponto ou o cordão partir-se — que é o que a própria regra `point-lost` do sítio diz: *"Deixas cair a pá ou o cordão de segurança parte-se durante o ponto."* Jogar sem cordão é incumprimento de material, que um árbitro manda corrigir; não é ponto perdido a cada jogada.

**Correção:** "o regulamento exige cordão preso ao pulso; se a pá te fugir da mão durante um ponto, perdes o ponto."

### A4. A inferência sobre as pás é um non sequitur

FAQ `choosing-first-racket`:

> *"As dimensões máximas estão fixadas no regulamento oficial, por isso nenhuma pá à venda te dá vantagem ilegal — a diferença está toda na forma, no peso e no material."*

O "por isso" não se sustenta. Existirem limites no regulamento não implica que tudo o que está à venda os respeite — vendem-se pás não homologadas, e em prova federada a homologação é o que conta, não o catálogo da loja. **Correção:** dizer que em competição só se usam pás conformes com o regulamento e que a loja não é garantia disso, em vez de tranquilizar com uma dedução errada.

### A5. Etimologia inventada na víbora

Glossário, `vibora`:

> *"O nome vem de \"cobra\" em espanhol, por causa do movimento lateral do braço."*

Não faz sentido em nenhum dos dois sentidos. "Víbora" é palavra portuguesa e espanhola, com o mesmo significado nas duas — não "vem de cobra em espanhol"; não há tradução a acontecer. E a explicação pelo "movimento lateral do braço" é uma racionalização: quem joga associa o nome ao som e à forma como a bola morde e foge depois do ressalto, não à mecânica do braço.

**Correção:** cortar a frase inteira. Uma etimologia não verificável não acrescenta nada e é o género de detalhe que denuncia texto gerado. O que falta na entrada é útil e verificável: a víbora define-se pelo **ponto de impacto** (mais à frente e mais ao lado da cabeça do que a bandeja) e pelo efeito cortado que faz a bola sair depois de bater na parede lateral. Isso é o que um jogador precisa de saber para a distinguir.

### A6. "torna o padel única"

Título da regra `out-of-court-play`:

> *"Jogar fora do campo: a regra que torna o padel **única**"*

"Padel" é masculino em português. É "torna o padel único". Está num **título de regra**, que é a linha mais vista da página. Erro de concordância num título é, para um dirigente ou para um jogador, o sinal mais barato de que ninguém do meio leu aquilo.

### A7. Erros de dados que qualquer português vê ao segundo de leitura

Não são erros de conteúdo editorial, mas custam o mesmo em credibilidade:

- **"Sofia Araujo"** — é **Araújo**. É a melhor jogadora portuguesa de sempre e o nome aparece sem acento na página inicial, na secção que se chama "Padel em Portugal".
- **"FIP Silver Guimaraes"** — **Guimarães**.

O `PROJECT.md` §5.3 diz que dados externos *"não se traduzem; normalizam-se"*. Restituir acentos a nomes e cidades portuguesas é exatamente normalizar. Uma tabela de exceções com trinta entradas resolve isto e é a diferença entre "site estrangeiro sobre padel" e "site português sobre padel".

### A8. "121 no circuito" não é verdade no sentido em que se lê

A página inicial anuncia a secção "Padel em Portugal" e a chave `home.countryPlayers` diz **"{total} no circuito"** — 121 para Portugal. Mas a lista inclui jogadores em **#3243 com 0 pontos**. Ter registo na FIP não é estar no circuito. Um jogador português abre aquilo à espera de encontrar os nomes que conhece e encontra uma lista de 77 homens onde o primeiro está em #83.

Não é dado inventado — é rotulagem enganadora de dado verdadeiro, que é uma coisa que a Federação sabe distinguir melhor do que ninguém, porque é ela que gere o ranking a sério.

**Correção:** ou "121 com registo FIP", ou cortar a lista nos jogadores com pontos, ou separar visualmente "com ranking" de "com registo". Qualquer das três é honesta; a atual não é.

---

## B. Lacunas

Por ordem de quanto se perde sem elas.

### B1. As duas discussões que acontecem mesmo em campo não estão aqui

Se eu tivesse de escolher **duas** coisas para acrescentar ao sítio, eram estas, e nenhuma está em lado nenhum das 19 regras, das 8 situações ou das 12 perguntas:

**(a) Depois do serviço, as linhas do chão não decidem nada.** No padel, as linhas só existem para o serviço. Fora disso, a bola está boa em qualquer ponto do chão do campo adversário — não há "fora" no chão. Isto é o primeiro reflexo errado que toda a gente traz do ténis, gera discussão em todos os jogos de principiantes, e o sítio nunca o diz. Diz apenas, dentro do serviço, *"as linhas contam como boas"*, o que é o assunto oposto.

**(b) O remate que sai do campo.** A jogada mais discutida do padel amador português: remato, a bola ressalta no campo deles e sai por cima da vedação. Ponto de quem? Um jogador diz "saiu por 3" ou "saiu por 4". Não há uma linha sobre isto no sítio. Pior: a regra `point-won` chama-se **"Formas menos óbvias de ganhar um ponto"** e o que lá está é:

> *"A bola, depois de ressaltar corretamente no campo do adversário, sai por um buraco da rede metálica ou fica presa nele."*
> *"A bola fica presa na superfície plana no topo da parede."*

São dois casos que eu vi acontecer, ao todo, talvez três vezes na vida. A forma menos óbvia — e mais frequente — de ganhar um ponto no padel é tirar a bola do campo, e não está lá. **É a inversão exata do que interessa a quem joga: o sítio documenta a raridade e omite o quotidiano.**

### B2. A bola no teto — e a maioria dos campos em Portugal são cobertos

De novembro a março joga-se sob cobertura em quase todo o país. A bola bate na chapa, na estrutura, na luminária, no aquecedor. É semanal. O sítio não tem uma situação sobre isto e a única menção está enterrada dentro de `correct-return`, num parágrafo que remete para duas outras páginas:

> *"quando a bola ressalta corretamente no campo do adversário e só depois sai do recinto, batendo no teto, nas luzes ou noutro elemento alheio ao jogo."*

Falta o caso muito mais comum: a bola bate no teto **antes** de chegar ao campo adversário. E falta dizer que muitos clubes têm regra de casa própria ("bola no teto repete-se") diferente do regulamento — informação honesta, verificável, e que resolve a discussão real, que raramente é sobre a FIP e quase sempre sobre o que vale naquele clube.

### B3. Nada sobre conduta, penalizações e arbitragem

O relatório FIP já assinalou (§F) que a secção *"Etiquette and Conduct Norms"* não tem cobertura nenhuma. Como quem arbitra torneios de clube, sublinho: **é a parte que mais me faz falta e a única que ninguém tem em português decente.** Aviso, ponto de penalização, jogo de penalização, desqualificação; abuso de bola; abuso de material; linguagem. Numa prova amadora é onde tudo acontece e onde toda a gente discute com o árbitro sem saber o que está a discutir.

E falta o irmão pobre disto: **quem arbitra quando não há árbitro.** Em 99% dos jogos não há. Quem canta a bola, o que se faz na dúvida, quem decide o "let". O regulamento pressupõe cadeira de árbitro; o jogador amador nunca a tem. Um sítio que se diz "a casa do padel" e nunca aborda o auto-arbitragem está a escrever para um jogo que quase ninguém joga.

### B4. O glossário não fala a língua do balneário

Dez termos, oito dos quais são golpes. Falta metade do vocabulário que se usa numa tarde:

**Golpes que faltam e se usam a toda a hora:** **voleio** (o golpe mais jogado no padel, e não está no glossário), **dejada** (a deixadinha, que decide pontos todas as semanas), **rulo/kick**, **dupla parede**, **bandeja de esquerda**, **remate por 3 / por 4** (ver B1b), **contra-pé**.

**A conversa sobre "x3":** o briefing pede "x3" e ele não está. E há aqui um serviço a prestar que nenhum outro sítio presta: **"x3" usa-se em Portugal em dois sentidos** — o remate que tira a bola do campo ("saiu por 3") e a bola que se joga depois de bater em duas paredes. Um glossário que assumisse essa ambiguidade e a arrumasse seria a única página em português onde ela está resolvida. Isso é conteúdo defensável — precisamente o que o `PROJECT.md` §3 diz querer do glossário.

**O vocabulário de como o padel amador se organiza — ausente por completo:** **americano**, **mexicano**, **non-stop**, **escalada/ladder**, **nível (3.0, 3.5, 4.0…)**, **sobregrip**. Um jogador português vê "non-stop" no cartaz do clube e "nível 3.5" no perfil do Playtomic todas as semanas. Nenhum dos dois tem explicação decente em português em lado nenhum. Isto é uma lacuna barata de fechar e é a única do glossário que ninguém preencheu antes.

**Termos com problema de identidade:**

- `globo` tem slug `globo` e termo **"Lob"** — mas as dicas dizem *"Quando te **globam**, não recues a correr"* e *"O **globo** é uma arma"*. O sítio usa as duas palavras em páginas diferentes. O `PROJECT.md` §5.5 diz que o glossário existe exatamente para isto não acontecer, e acontece já em português, que é a língua de casa. (Sobre o mérito da decisão: contesto o comentário no código que diz *"'Lob' é o que se diz em Portugal"*. Diz-se tanto "lob" como "globo", e "globo" domina em quem aprendeu com treinadores espanhóis, que são muitos. As duas entram; o que não pode é o sítio escolher uma no glossário e a outra nas dicas.)
- `manos` mantém a forma espanhola — **"Manos (toque)"** — enquanto `globo` foi despido dela. Em Portugal diz-se "tem boas mãos". Ou se assume o espanhol como língua franca do padel (defensável) ou se traduz (defensável); alternar entre as duas na mesma página de dez entradas não é.

### B5. "Treino" não tem um único exercício nem um único desenho

A secção chama-se **"Treino"**. O `PROJECT.md` §3 Fase 4 promete *"Biblioteca de exercícios"* e *"Planos de treino por nível"*. O que está publicado são dez aforismos e dez definições. Nenhum tem séries, repetições, número de bolas, progressão, critério de sucesso, nem sequer nível-alvo.

E não há **um único diagrama de campo em todo o sítio.** Táctica de padel sem desenho é quase inútil: a dica *"Cruza por defeito; a paralela é uma decisão"* diz-se num SVG melhor do que em cinco linhas, e o mesmo vale para *"Movam-se os dois como um bloco"*, para a lateral-versus-fundo do jogo exterior, e para o quadrado de serviço. São desenhos originais, sem custo de licença nem de fonte de dados. É a lacuna com melhor relação entre esforço e ganho de todo o sítio.

Sobre as dicas em si, o diagnóstico é mais duro do que a qualidade delas sugere: **as dez estão certas e as dez são de primeira aula.** Sobe à rede, não recues, movam-se juntos, deixa a parede trabalhar, joga aos pés, o lob é uma arma, cruza, fala com o par, cobre o meio, tem paciência. Um jogador com seis meses sabe as dez. Não há nada para quem já joga: quando **não** subir, como sair de uma parede de fundo alta, para onde jogar a bandeja consoante o adversário, o que fazer contra uma dupla de dois canhotos, como se joga um ponto de ouro. O sítio tem exatamente zero conteúdo acima do nível de iniciação — e a maior parte de quem procura conteúdo de padel online já passou desse nível.

### B6. A Federação Portuguesa de Padel não existe neste sítio

Se o objetivo é parceria com a FPP, é notável que a FPP apareça em dois links dentro de duas respostas de FAQ e mais nada. O que falta e é conteúdo — não dados:

- **Licença federativa:** para que serve, quem precisa dela, o que inclui (seguro), como se tira. É a pergunta número um de quem quer passar de jogar às terças para jogar torneios.
- **Escalões e categorias** das provas federadas.
- **Como funciona subir de categoria.**
- **Que o regulamento nacional existe.** O sítio apresenta as regras da FIP como se fossem o universo. Em Portugal joga-se sob o regulamento da FPP, que adota a FIP e acrescenta o seu. Não referir isso é, para um dirigente, dizer-lhe que a casa dele não conta.

Nada disto exige dados que não existem. É texto original sobre matéria pública.

### B7. Não há forma de corrigir nada

Todas as páginas de conteúdo exibem *"Este conteúdo foi escrito automaticamente e ainda não foi revisto por um especialista em padel."* — e não há um único link para reportar um erro, sugerir um termo ou oferecer revisão.

Isto é um desperdício grande. Existe em Portugal uma comunidade de treinadores e árbitros que corrigiria este conteúdo de graça, pelo gosto de o ver bem feito, se lhe dessem um botão. Um sítio que admite estar por rever e não pede ajuda está a assumir o custo da admissão sem receber o benefício.

### B8. O corpo

Zero conteúdo sobre lesões, aquecimento e prevenção. Epicondilite, ombro, gémeo, costas — o padel amador português está cheio disto e a informação disponível é um caos de vídeos espanhóis. Não é urgente como B1, mas é uma das poucas áreas em que um sítio de conteúdo pode ser genuinamente melhor do que o Instagram, porque exige texto e não vídeo.

### B9. O que está lá e é dispensável

Para dar contexto ao que falta, o que ocupa espaço sem servir ninguém:

- **`change-of-balls`** é a regra mais longa e detalhada do sítio — contagem do aquecimento como dois jogos, reposição por desgaste semelhante, proibição de continuar com uma bola. É irrepreensível e é para árbitros de prova FIP. O amador leva um tubo de casa. Comparar o espaço que isto ocupa com a inexistência de "as linhas não contam" mede bem o desalinhamento editorial.
- **`point-won`** — ver B1b.
- **`choice-of-sides`** — o sorteio de três opções. Ninguém faz isto num jogo de clube.
- **Duplicação entre situações e FAQ:** de 8 situações, 3 respondem à mesma pergunta que uma FAQ (paredes em jogo, bola fora do campo, serviço fora do quadrado), com texto quase paralelo. Num conjunto de 20 itens, gastar 3 em repetição é caro.
- **Frases de enchimento** que um jogador salta: *"Estas medidas garantem que o ressalto da bola nas paredes seja previsível"*, *"até se decidir o ponto (por \"let\" ou por **um resultado claro**)"* — "um resultado claro" não quer dizer nada.

### B10. O que está explicado só para quem já sabe

- `correct-return`: *"A bola bate no canto exato onde a parede encontra o chão."* Está lá porque está no regulamento. Não diz o que fazer com isso. Quem já jogou sabe que aquilo é a "bola no ângulo", que sai rasteira e quase não se apanha; quem não jogou lê a frase e não fica a saber nada.
- `interference`: *"Interferência é quando um jogador — de forma deliberada ou involuntária — atrapalha o adversário a executar um golpe."* Três alíneas, zero exemplos. Os casos reais são concretos e conhecidos: gritar durante o ponto do adversário, o parceiro tapar a visão, alguém pedir a bola alto. Sem um exemplo, a regra não se consegue aplicar.
- `player-positions`: *"uma equipa tem um jogador a servir e o outro a acompanhar"*. "A acompanhar" não é português de padel. E a regra descreve o que é evidente, sem tocar no que interessa — que a colocação do parceiro do servidor é uma decisão táctica, não uma formalidade.
- `ball-in-play` remete para outra página para dizer o que interessa: *"consulta \"Formas mais comuns de perder um ponto\" para as restantes."* Correto tecnicamente, mau para quem está com o telemóvel na mão a meio de uma discussão em campo. Numa discussão, dois cliques é o mesmo que nada.

---

## C. Linguagem

Onde soa a quem não joga.

### C1. "rede metálica" ao lado de "rede"

O caso mais grave, porque torna o texto inutilizável no momento em que é preciso. De `ball-in-play`:

> *"ela continua em jogo mesmo que toque numa parede, na **rede metálica**, na **rede central** ou nos postes"*

Duas coisas completamente diferentes chamadas "rede" na mesma frase. Nenhum jogador diz isto. Em campo diz-se **grade** (ou vedação, ou malha) para a de metal e **rede** para a do meio, e ninguém se engana. A escolha de "rede metálica" é tradução literal de *metallic fence* e aparece por todo o sítio — nas regras, nas situações, no resolvedor. É o marcador mais visível de "isto foi escrito a partir de um documento, não de um campo".

### C2. "peloteo"

`times`: *"é obrigatório um **peloteo** de aquecimento de 3 minutos"*. É a palavra espanhola. Em Portugal diz-se "aquecimento", "bater umas bolas", ou "peloteio". Ver a forma espanhola crua no meio de um texto português é a definição de conteúdo traduzido à pressa.

### C3. "contacto duplo"

`point-lost` e a situação `double-hit`: *"Bates na bola duas vezes seguidas (**contacto duplo**)"*, *"é considerado \"contacto duplo\""*. Diz-se **duplo toque** ou **dois toques**. "Contacto duplo" é decalque de *doble contacto*.

### C4. "jogos", "partida" e "game"

O sítio usa "jogo" para *game* e "partida" para *match*:

> *"Uma equipa ganha um **set** ao chegar a 6 **jogos**"* / *"O formato mais comum de **partida** é ganhar 2 dos 3 sets"*

Em campo, em Portugal, diz-se **"game"** para o game e **"jogo"** ou **"encontro"** para o encontro inteiro. "Partida" soa a locução brasileira ou a tradução do espanhol. E "6 jogos" para dizer "6 games", num sítio que noutra linha usa "jogo" para o encontro, cria uma ambiguidade permanente. Não há uma resposta única boa aqui — a FPP usa a nomenclatura formal — mas tem de haver **uma** decisão, escrita no glossário, aplicada em todo o lado. Neste momento não há.

### C5. Onde a língua está certa

Justiça: as dicas estão escritas em registo bom. *"Cá atrás só consegues defender; lá à frente consegues atacar e fechar ângulos"*, *"Pensa na dupla como se estivessem ligados por uma corda de dois ou três metros"*, *"Um \"minha!\" dito a tempo evita metade dos pontos perdidos entre os dois"* — isto é linguagem de treinador, e é bem-vinda. O problema das dicas é o nível do conteúdo (B5), não a voz.

E a nota de tie-break em `times` — *"o regulamento tem duas disposições que não encaixam uma na outra... Na prática seguem-se os 20 segundos"* — é **a melhor frase do sítio inteiro**. É a única linha que prova que alguém abriu o documento a sério, comparou artigos e teve a coragem de dizer que o regulamento está mal. Está em itálico, no fim, como rodapé. Devia estar em destaque: é exatamente o tipo de coisa que faz um árbitro voltar a um sítio.

---

## D. Diferenciação — porque voltaria eu cá

A pergunta a sério, respondida a sério.

**Tenho o Playtomic** para reservar campo, ver o meu nível e encontrar jogo aberto. **Tenho o padelteams** para inscrições em torneios de clube. **Tenho o Instagram** para o Premier Padel, para os vídeos de pontos, para saber que a Sofia Araújo ganhou, e para os cartazes dos americanos do meu clube. **Tenho o YouTube** para técnica, em espanhol, que percebo.

Do que o Padel Hub tem hoje:

- **Rankings e torneios do circuito internacional** — pior do que o que já tenho. Sem resultados ao vivo (assumidamente, §6.1 do `PROJECT.md`), sem vídeo, sem comentário, sem quadros que se percebam de relance. O Instagram do Premier Padel dá-me isto mais depressa, com imagem, e antes.
- **Cinco idiomas com paridade real** — a cunha declarada do produto. Para mim vale **zero**. Eu só quero português. O argumento multilíngue é para o investidor, não para o utilizador.
- **Notícias** — três títulos com link para a fonte. Se eu quero notícias, vou à fonte. Isto é um passo intermédio que não acrescenta nada.
- **Jogadores portugueses** — a ideia certa, mal servida. Uma lista de 121 nomes ordenada por pontos, muitos deles com zero, não é uma razão para voltar.
- **Regras, situações e FAQ** — **a única coisa que este sítio tem e os outros não.** Regras do padel em português corrigido, com o artigo da FIP e a versão do regulamento identificados, pesquisáveis, em linguagem que se lê. Isso não existe em português em mais lado nenhum. A FPP publica um PDF; um PDF não se pesquisa no telemóvel a meio de uma discussão com quatro pessoas em pé no campo.

**Portanto, a resposta honesta: volto cá quando houver uma discussão de regras que ninguém do grupo saiba resolver.** Duas, três vezes por ano. E mesmo essas duas ou três vezes só resultam se as duas coisas que mais se discutem estiverem lá — o remate que sai do campo e as linhas não contarem — e neste momento **não estão** (B1).

Isto não é um veredicto de que o sítio não serve. É um veredicto de que serve para uma coisa e finge servir para sete.

### O que mudaria a resposta

Três coisas, todas construíveis com o que já existe. Nenhuma exige dados nacionais nem copiar seja o que for.

**1. Ser o sítio que ganha as discussões em campo.**
Fechar B1 (linhas, remate para fora), B2 (teto) e B3 (conduta e auto-arbitragem). Transformar o *"Resolvedor de situações"* naquilo que o nome promete — hoje são 8 perguntas fixas numa lista, o que não é um resolvedor; é uma FAQ com outro nome. Um resolvedor a sério são três perguntas encadeadas: *onde bateu primeiro? → depois? → quem tocou?* → resposta com o artigo. Toda a informação para o construir já está no sítio. Feito isto, ganha-se uma frase que se diz no balneário e que é a única forma real de crescimento: **"há um site que resolve isto — está em português e diz o artigo."**

**2. "Os portugueses neste torneio."**
O único uso dos dados internacionais que o Instagram não faz de forma sistemática. O sítio já tem jogadores por país e já tem jogos por torneio; cruzar as duas coisas é trabalho de front-end, não de fonte de dados. "Neste FIP Silver de Guimarães jogam estes 6 portugueses; próximo jogo às 14h; resultado da 1.ª ronda." Isso responde à única pergunta sobre o circuito que um jogador português faz de facto, e responde-a melhor do que qualquer alternativa que ele tenha hoje. Com um aviso por email ou push quando um português entra em campo, passa a ser hábito em vez de visita.

**3. O glossário do padel amador português.**
Não mais golpes — esses estão em vídeo em todo o lado, e em vídeo explicam-se melhor. O que não existe em lado nenhum é o vocabulário de como isto funciona cá: americano, mexicano, non-stop, escalada, nível 3.5, licença, escalão, "por 3". Fechar B4 e B6. É a única categoria de conteúdo em que este sítio pode ser, com trabalho honesto e sem uma única fonte nova, **o melhor recurso em português que existe.** É também a que se alinha exatamente com o argumento da parceria com a Federação.

---

## E. O que um dirigente federativo notaria

Vejo cinco motivos para um dirigente desconfiar. Estão por ordem de gravidade.

**1. O aviso.** Todas as páginas de regras exibem: *"Este conteúdo foi escrito automaticamente e ainda não foi revisto por um especialista em padel."* É a decisão editorial certa e é honesta. Também é, tal como está, **incompatível com uma parceria**. Nenhuma federação associa o seu nome a uma explicação automática e não revista das regras da sua modalidade. Isto tem de estar resolvido — com revisão humana identificada — **antes** de se pedir a reunião, não como promessa dentro dela.

**2. O regulamento dele não é mencionado.** O sítio apresenta a FIP como se fosse a totalidade. Em Portugal joga-se sob o regulamento da FPP, que adota a FIP e acrescenta o seu (provas, escalões, licenças, disciplina). Um dirigente abre 19 regras, procura a sua casa e não a encontra. É a primeira coisa que ele nota e é a mais fácil de corrigir.

**3. Os acentos e a rotulagem.** "Sofia Araujo" e "Guimaraes" numa secção chamada "Padel em Portugal" (A7); "121 no circuito" a incluir jogadores em #3243 com 0 pontos (A8). Uma federação vive de ranking e de registo — sabe exatamente a diferença entre "tem registo" e "está no circuito", e sabê-la é o mínimo para lhe merecer confiança com dados.

**4. Não há responsável.** Não há "Quem somos", não há política editorial, não há contacto, não há política de correção. Um dirigente que pondere associar-se pergunta primeiro **a quem**. Neste momento não há resposta na página.

**5. O tom da resposta sobre o ranking nacional.** A FAQ `national-ranking` diz:

> *"**Aqui não o reproduzimos**, e a razão é concreta: essa plataforma reserva expressamente os direitos sobre os seus dados ao abrigo do artigo 4.º da diretiva europeia sobre prospeção de textos e dados. **É uma recusa escrita, e respeitamo-la.**"*

Duas leituras opostas, e ambas ocorrerão. A boa: é a página mais respeitável do sítio — alguém verificou os direitos, encontrou uma reserva expressa, cumpriu-a e explicou-o publicamente. Isso é um argumento de parceria melhor do que qualquer apresentação. A má: *"É uma recusa escrita"* dá ao dirigente a sensação de estar a ser exposto, num sítio público, por uma decisão da sua plataforma. **Sugestão:** manter a substância inteira (é o ativo), retirar a caracterização adversarial. "O ranking nacional é da FPP e vive na plataforma da federação — é lá que o vês. Não o reproduzimos aqui porque os dados são deles." A mesma verdade, sem o dedo apontado.

---

## F. Se fosse eu a decidir a ordem

1. **Fechar as contradições internas** (A1, A2). O sítio a dar duas respostas diferentes à mesma pergunta é pior do que o sítio não responder.
2. **Acrescentar as linhas e o remate para fora** (B1). Duas peças de conteúdo. É o que separa "útil numa discussão" de "quase útil numa discussão".
3. **Corrigir "torna o padel única", "rede metálica"→grade, "peloteo", "contacto duplo"** (A6, C1–C3). Uma tarde de trabalho. Elimina os quatro sinais mais visíveis de que ninguém do meio leu isto.
4. **Acentos nos nomes portugueses e rotulagem honesta da lista de jogadores** (A7, A8).
5. **Um botão de "encontraste um erro?"** (B7). A comunidade corrige isto de graça se lhe derem por onde.
6. **"Os portugueses neste torneio"** (D2). É a única funcionalidade que pode criar hábito com os dados que já existem.
7. **Conduta, penalizações e auto-arbitragem** (B3), e o vocabulário do padel amador português (B4, B6). É aqui que o sítio deixa de ser uma tradução de um regulamento e passa a ser conteúdo que só existe cá.
