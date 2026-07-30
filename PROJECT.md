# PROMPT DE ARRANQUE — App de Padel Multilíngue

> **Como usar:** guarda este ficheiro como `PROJECT.md` na raiz do repositório e abre o Claude Code nessa pasta. A primeira instrução deve ser: *"Lê o PROJECT.md. Não escrevas código ainda. Apresenta um plano de execução da Fase 0 e faz-me as perguntas que faltam."*

---

## 1. Papel e regras de trabalho

És o engenheiro principal deste projeto. Trabalhas comigo (product owner) de forma iterativa.

**Regras não negociáveis:**

1. **Nunca inventes dados desportivos.** Rankings, resultados, calendários e regras vêm sempre de uma fonte identificada. Se a fonte não responder, a UI mostra estado de erro — nunca um valor plausível gerado.
2. **Nunca inventes conteúdo de regras.** As regras do jogo derivam exclusivamente do documento oficial da FIP (ver §6). Se uma pergunta não estiver coberta pelo documento, a resposta é "não coberto pelo regulamento".
3. **Plano antes de código.** Em qualquer tarefa com mais de dois ficheiros, apresenta plano e espera aprovação.
4. **Commits pequenos e atómicos**, com mensagem em inglês, convenção Conventional Commits.
5. **Sem dependências supérfluas.** Cada nova biblioteca tem de ser justificada em uma linha.
6. **TypeScript estrito.** `strict: true`, sem `any` sem comentário a justificar.
7. Quando tiveres dúvida sobre âmbito, **pergunta em vez de assumir**.

---

## 2. O produto

Uma aplicação web (PWA, depois mobile nativo) que funciona como **casa do padel para quem não fala espanhol**.

**Tese do produto:** o ecossistema de conteúdo de padel é esmagadoramente espanhol. Jogadores em Portugal, França, Alemanha, Países Baixos e Escandinávia — os mercados de maior crescimento — consomem conteúdo traduzido mal, tarde, ou não consomem. A cunha competitiva é **paridade real de idioma**, não mais uma app de resultados.

**Idiomas (paridade total, não "inglês + traduções automáticas"):**
`pt-PT` · `en` · `es` · `fr` · `de`

**Não-objetivos explícitos (v1):**
- Reservas de campos (é o negócio da Playtomic; não competir).
- Rede social / feed de utilizadores.
- Vídeo próprio ou streaming.
- Loja / e-commerce de material.

---

## 3. Âmbito faseado

O âmbito completo ("tudo sobre padel") não é construível de uma vez. Executa por fases, cada uma com valor autónomo.

### Fase 0 — Fundação (1 sessão)
- Repo, TypeScript, linting, CI mínima.
- Esqueleto i18n com as 5 línguas e router por locale.
- Página de teste que prova que a troca de idioma funciona end-to-end.
- **Critério de conclusão:** `/pt/`, `/en/`, `/es/`, `/fr/`, `/de/` renderizam e trocam sem recarregar estado.

### Fase 1 — Circuito profissional (núcleo de valor)
- Rankings masculinos e femininos.
- Calendário de torneios (passados, a decorrer, futuros).
- Quadros e resultados por torneio.
- Fichas de jogador com histórico e head-to-head.
- **Fonte:** Padel API (§6.1).
- **Critério de conclusão:** dados reais, cache funcional, degradação graciosa quando a API falha.

### Fase 2 — Regras
- Regulamento FIP navegável e pesquisável, reescrito em linguagem clara nas 5 línguas.
- Resolvedor de situações ("a bola bateu na grade depois do ressalto — ponto de quem?").
- Referência técnica: dimensões do campo, especificações de bola e pá.
- **Critério de conclusão:** cada resposta liga ao artigo correspondente do regulamento oficial.

### Fase 3 — Notícias
- Agregador de fontes por RSS/feeds licenciados. **Título + resumo próprio de duas frases + link para a fonte.** Nunca o artigo completo.
- Filtro por idioma da fonte, com indicação clara de quando o original não está na língua do utilizador.
- **Critério de conclusão:** zero reprodução de texto de terceiros; atribuição visível em todos os itens.

### Fase 4 — Treino e táctica
- Biblioteca de exercícios (bandeja, víbora, saída de parede, x3, posicionamento).
- Planos de treino por nível.
- Glossário técnico multilíngue — este é o ativo mais defensável do produto, porque a terminologia do padel em francês e alemão está pouco fixada.
- **Nota:** conteúdo original obrigatório. Não copiar de blogues nem de canais existentes.

---

## 4. Stack

Escolhas orientadas a custo operacional próximo de zero até haver tração.

| Camada | Escolha | Porquê |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | SSR/ISR para SEO multilíngue, que é metade da estratégia de aquisição |
| Estilos | Tailwind CSS | Velocidade de iteração |
| i18n | `next-intl` | Routing por locale + mensagens tipadas |
| Base de dados | Postgres (Supabase, plano gratuito) | Cache de dados da API, conteúdo editorial, traduções |
| ORM | Drizzle | Migrações versionadas, tipagem forte |
| Cache/ISR | Vercel + revalidação por tag | Manter o consumo da API dentro do plano gratuito |
| Deploy | Vercel (hobby) | Custo zero inicial |
| Mobile | PWA na v1; Expo só se houver tração | Não duplicar esforço cedo |

**Antipadrões a evitar:**
- Chamar a API externa diretamente do cliente (expõe a chave e queima quota).
- Traduzir strings em runtime com um LLM (custo variável e não determinístico).
- Guardar traduções em JSON gigantes num único ficheiro por idioma — partir por namespace.

---

## 5. Arquitetura i18n

Este é o ponto onde a maioria dos projetos multilíngues degrada. Requisitos:

1. **Namespaces por domínio:** `common`, `rankings`, `tournaments`, `rules`, `news`, `training`.
2. **Chaves tipadas.** A build falha se faltar uma chave em qualquer idioma.
3. **Três categorias de conteúdo, tratadas de forma diferente:**
   - *UI strings* — ficheiros de mensagens, traduzidos uma vez.
   - *Conteúdo editorial* (regras, treino) — tabelas na BD com coluna `locale`, versionado, com estado `draft | machine | reviewed`. A UI marca visivelmente conteúdo que ainda não foi revisto por humano.
   - *Dados externos* (nomes de jogadores, torneios) — não se traduzem; normalizam-se.
4. **Formatação local:** datas, números e fusos via `Intl`, nunca formatação manual.
5. **Terminologia:** um único ficheiro `glossary.ts` com o termo canónico de cada conceito nas 5 línguas. Todo o conteúdo novo usa-o. Sem isto, "bandeja" aparecerá traduzido de três maneiras diferentes em alemão.

---

## 6. Fontes de dados

### 6.1 Dados do circuito profissional — Padel API
- Site: `https://padelapi.org` · Documentação: `https://padelapi.org/docs`
- Cobre Premier Padel (FIP) — Major, P1, P2, Finals — torneios FIP Platinum/Gold/Silver/Bronze, e o arquivo histórico do World Padel Tour.
- REST com autenticação por token, mais servidor MCP.
- **Plano gratuito:** 50 000 pedidos/mês, sem cartão. Inclui torneios, jogadores, calendários, rankings atuais e resultados dos últimos 6 meses. Histórico mais antigo devolve valor mascarado.
- **Planos pagos:** Plus €19/mês (histórico completo, limites superiores), Pro €49/mês (resultados ao vivo, ponto a ponto, estatísticas de jogo, WebSocket), Business €169/mês.

**Implicação de âmbito:** resultados ao vivo só existem a partir de €49/mês. **A v1 não promete tempo real.** Constrói a camada de dados com uma interface abstrata (`PadelDataSource`) para que o live seja ligado mais tarde sem refazer nada.

**Regras de integração:**
- Toda a comunicação com a API passa por rotas de servidor. A chave vive em `.env`, nunca no cliente.
- Cache agressiva: rankings 6h, calendário 24h, resultados de torneios encerrados indefinidamente.
- Camada de repositório com contratos validados por Zod. Se a resposta não valida, falha explicitamente.

### 6.2 Regras — FIP
- Documento oficial: `https://www.padelfip.com/wp-content/uploads/2025/12/FIP_Reglas-del-Padel.pdf`
- Confirma sempre no site da FIP se existe versão mais recente antes de fixar conteúdo. O regulamento é revisto periodicamente.
- **Não reproduzir o texto literal do regulamento.** Escrever explicações originais e ligar ao PDF oficial para o texto normativo.
- Cada entrada de regra guarda `fip_article_ref` e `fip_version`, para ser possível auditar e atualizar quando a FIP revê o documento.

### 6.3 Notícias
- Apenas feeds RSS/Atom de fontes que permitam sindicação, ou APIs licenciadas.
- Armazenar título, data, fonte, URL e imagem de destaque quando o feed a fornecer.
- Resumo escrito de raiz, máximo duas frases. Nunca colar parágrafos da fonte.
- **Não fazer scraping de sites de notícias.** Risco legal desproporcionado face ao valor.

---

## 7. Modelo de dados (esboço inicial)

```
players        (id, fip_id, name, country, hand, side, birth_date, ...)
tournaments    (id, external_id, name, category, city, country, start, end, surface)
draws          (id, tournament_id, gender, stage)
matches        (id, draw_id, round, team_a, team_b, score_json, winner, played_at)
rankings       (id, player_id, gender, position, points, snapshot_date)

rules          (id, slug, fip_article_ref, fip_version, order)
rule_contents  (id, rule_id, locale, title, body_md, status, reviewed_by, updated_at)

drills         (id, slug, level, category, duration_min, video_url)
drill_contents (id, drill_id, locale, title, body_md, status)

news_items     (id, source_id, url, published_at, image_url, lang)
news_contents  (id, news_item_id, locale, headline, summary, status)

glossary       (id, concept_key, pt, en, es, fr, de, notes)
```

Padrão: **entidade + tabela de conteúdo por locale**. Não replicar entidades por idioma.

---

## 8. Ecrãs (v1)

1. **Início** — próximo torneio, top 5 de cada ranking, 3 notícias.
2. **Rankings** — masculino/feminino, evolução de posição, filtro por país.
3. **Torneios** — lista por ano, ficha com quadro e resultados.
4. **Jogador** — perfil, ranking atual, últimos resultados, head-to-head.
5. **Regras** — índice navegável, pesquisa, resolvedor de situações.
6. **Treino** — biblioteca filtrável por nível e categoria.
7. **Notícias** — lista agregada com atribuição.
8. **Definições** — idioma, tema, unidades.

Requisitos transversais: acessibilidade AA, funcional offline para regras e treino (conteúdo estático em cache), tempo até primeiro conteúdo abaixo de 2s em 4G.

---

## 9. Critérios de qualidade

- Testes unitários na camada de dados e nas funções de pontuação/formatação.
- Um teste que percorre todos os namespaces e confirma paridade de chaves nos 5 idiomas.
- Um teste que confirma que nenhum conteúdo com `status = 'machine'` aparece sem o aviso de revisão pendente.
- Lighthouse acima de 90 em Performance, Acessibilidade e SEO nas páginas principais.
- Sem chaves de API no bundle do cliente — verificação automática na CI.

---

## 10. Primeira tarefa

Não escrevas código ainda.

1. Lê este documento por inteiro.
2. Consulta a documentação da Padel API e confirma quais dos endpoints necessários à Fase 1 estão disponíveis no plano gratuito.
3. Devolve:
   - Plano de execução da Fase 0, ficheiro a ficheiro.
   - Lista de decisões que dependem de mim.
   - Lista de riscos que identificaste e que este documento não cobre.
