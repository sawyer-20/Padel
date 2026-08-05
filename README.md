# Padel Hub

Aplicação web multilíngue sobre padel: rankings e torneios do circuito profissional, regulamento FIP explicado em linguagem clara, conteúdo de treino e agregação de notícias — com **paridade total em cinco idiomas**.

[![CI](https://github.com/sawyer-20/Padel/actions/workflows/ci.yml/badge.svg)](https://github.com/sawyer-20/Padel/actions/workflows/ci.yml)

🌐 **Demo:** https://padel-ten-ivory.vercel.app

---

## Porquê

O ecossistema de conteúdo de padel é esmagadoramente espanhol. Jogadores em Portugal, França, Alemanha e Escandinávia — os mercados de maior crescimento — consomem conteúdo traduzido mal, tarde, ou não consomem de todo. A cunha competitiva deste projeto é **paridade real de idioma**, não mais uma app de resultados.

**Idiomas:** `pt-PT` (por defeito) · `en` · `es` · `fr` · `de`

O contexto completo do produto, âmbito faseado e regras de trabalho está em [`PROJECT.md`](./PROJECT.md).

---

## Funcionalidades

### Circuito profissional (dados da Padel API)
- **Rankings** masculinos e femininos, com pódio destacado e pesquisa por nome ou país
- **Torneios** — lista por data, filtro por país, ficha com quadro e resultados
- **Jogadores** — perfil, ranking, últimos jogos e duplas formadas
- **Início** — próximo torneio, topo dos rankings e jogadores nacionais

### Regras (conteúdo editorial próprio)
- 19 regras derivadas do regulamento oficial da FIP, cada uma com `fipArticleRef` e `fipVersion` para auditoria
- **Resolvedor de situações** — 8 casos de jogo do género *"a bola bateu na grade depois do ressalto — ponto de quem?"*
- Diagrama de campo em SVG à escala real (`PadelCourt`), usado na regra das dimensões
- Texto original, com ligação ao PDF oficial para o texto normativo (o regulamento nunca é reproduzido literalmente)

### Treino
- 10 dicas tácticas por categoria (posicionamento, escolha de pancada, equipa, atitude)
- Glossário técnico com 10 termos (`bandeja`, `víbora`, `chiquita`, `salida de pared`, …) nos cinco idiomas — o ativo mais defensável do produto, porque a terminologia do padel em francês e alemão está pouco fixada

### Notícias
- Agregação de 6 feeds RSS (FPP, FIP, The Bandeja, Padelstar, PadelSpain, Actu Padel), em `pt`, `en`, `es` e `fr`
- Título, data, fonte e ligação ao original — **nunca o artigo completo**
- Ainda sem fonte em alemão: não se encontrou nenhum feed em `de` que responda a pedidos automatizados

### Transversal
- Pesquisa sobre todo o conteúdo editorial, por idioma
- Tema claro/escuro/sistema, sem *flash* no arranque (`ThemeScript`)
- SEO: `canonical`, `hreflang` para os cinco locales, OpenGraph, JSON-LD, `robots.txt` e `sitemap.xml` gerados

---

## Stack

| Camada | Escolha |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Linguagem | TypeScript em modo estrito (`strict`, `noUncheckedIndexedAccess`) |
| Estilos | Tailwind CSS 4 (via `@tailwindcss/postcss`) |
| i18n | `next-intl` 4 — routing por locale + mensagens por namespace |
| Validação | Zod 4 em todas as respostas da API externa |
| RSS / Markdown | `fast-xml-parser` · `marked` |
| Testes | Vitest |
| Gestor de pacotes | pnpm 11.18.0 (Node ≥ 20) |
| Deploy | Vercel |

Não há base de dados. Todo o conteúdo editorial vive em módulos TypeScript versionados (`src/lib/*/content/<locale>.ts`), e os dados do circuito vêm da API externa com cache do Next.

---

## Arranque rápido

```bash
git clone https://github.com/sawyer-20/Padel.git
cd Padel
pnpm install

cp .env.example .env.local
# preencher PADEL_API_TOKEN

pnpm dev
```

Abrir http://localhost:3000 — redirecciona para `/pt`.

O token obtém-se em https://padelapi.org/user/api-tokens (plano gratuito, sem cartão).

---

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `PADEL_API_TOKEN` | Sim | Token da Padel API. Lido **apenas em código de servidor** (`src/lib/padel-api/client.ts`); nunca chega ao cliente. |
| `NEXT_PUBLIC_SITE_URL` | Não | URL público do sítio, sem barra final. Usado em `canonical`, `hreflang`, OpenGraph, `robots.txt` e `sitemap.xml`. Se ficar vazio, cai no domínio da Vercel. |

Sem `PADEL_API_TOKEN` a aplicação arranca, mas as páginas que dependem da API falham explicitamente com `PadelApiError` — por desenho, nunca com valores plausíveis inventados.

---

## Scripts

| Comando | Efeito |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm start` | Servir o build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Vitest (23 ficheiros de teste) |

---

## Estrutura

```
messages/<locale>/          Strings de UI, 8 namespaces por idioma
src/
  app/[locale]/             Rotas (início, rankings, torneios, jogadores,
                            regras, treino, notícias, pesquisa, definições, FAQ)
  app/robots.ts             robots.txt
  app/sitemap.ts            sitemap.xml com todos os locales
  components/               UI partilhada (tabelas, listas, cabeçalho, tema)
  i18n/                     routing, namespaces, config de pedido
  lib/
    padel-api/              Cliente HTTP + esquemas Zod (rankings, torneios,
                            jogadores, jogos, duplas, paginação)
    data-sources/           Interface PadelDataSource + implementação sobre a API
    rules/ situations/      Conteúdo editorial: metadados + content/<locale>.ts
    tips/ glossary/ faq/
    news/                   Fontes RSS, fetch, parsing, descodificação de entidades
    search/                 Índice e pesquisa sobre o conteúdo editorial
    seo/                    metadata, JSON-LD, excertos, config do sítio
    theme/ format/          Tema e formatação (datas e rótulos via Intl)
  middleware.ts             Middleware de locale do next-intl
tests/                      Vitest — espelha a estrutura de src/lib
```

---

## Como funcionam os dados

### Padel API

Toda a comunicação passa por código de servidor. As respostas são validadas por Zod: **se o contrato não valida, falha de forma explícita** em vez de degradar em silêncio.

Cache por tag do Next (`src/lib/data-sources/padel-api-source.ts`), dimensionada para manter o consumo dentro do plano gratuito:

| Recurso | Revalidação |
|---|---|
| Rankings, jogadores, duplas | 6 h |
| Torneios e ficha de torneio | 24 h |
| Jogos de torneio a decorrer | 1 h |
| Jogos de torneio encerrado | Indefinida (`revalidate: false`) |
| Feeds de notícias | 1 h |

A API também impõe limites que a camada de dados respeita: `per_page` máximo de 50, e `429` em pedidos paralelos — por isso a paginação é feita em série (`fetchPagesInSeries`).

O plano gratuito não inclui resultados ao vivo — por isso a v1 **não promete tempo real**. A camada de dados é uma interface abstrata (`PadelDataSource`) precisamente para que uma fonte com *live scores* possa ser ligada mais tarde sem tocar nas páginas.

### Notícias

Só feeds RSS/Atom de fontes que permitam sindicação e não bloqueiem acesso automatizado — verificadas à mão em `src/lib/news/sources.ts`, com a justificação de cada uma em comentário. Sem scraping.

---

## Internacionalização

Onde a maioria dos projetos multilíngues degrada. Regras aplicadas:

1. **Namespaces por domínio** — `common`, `rankings`, `tournaments`, `rules`, `news`, `training`, `faq`, `seo`.
2. **Paridade garantida por teste** — `tests/i18n/key-parity.test.ts` falha se faltar uma chave em qualquer idioma; há testes equivalentes de paridade para regras, situações, dicas, glossário e FAQ.
3. **Três categorias de conteúdo, tratadas de forma diferente:**
   - *UI strings* → `messages/<locale>/<ns>.json`
   - *Conteúdo editorial* → `src/lib/<domínio>/content/<locale>.ts`, escrito de raiz em cada idioma
   - *Dados externos* (nomes de jogadores e torneios) → não se traduzem, normalizam-se
4. **Formatação via `Intl`** — datas e números nunca formatados à mão.
5. **Glossário canónico** — todo o conteúdo novo usa o termo fixado, para `bandeja` não aparecer traduzido de três maneiras diferentes em alemão.

`localeDetection` está desligado: `/` redirecciona sempre para `/pt`.

---

## CI

O workflow ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) corre em cada *push* e *pull request* para `master`:

`lint` → `typecheck` → `test` → `build` → **verificação de que `PADEL_API_TOKEN` não aparece no bundle do cliente** (`grep` sobre `.next/static`, falha a build se encontrar).

---

## Princípios não negociáveis

Herdados de [`PROJECT.md`](./PROJECT.md) e aplicados no código:

- **Nunca inventar dados desportivos.** Se a fonte não responde, a UI mostra erro — nunca um valor plausível gerado.
- **Nunca inventar conteúdo de regras.** O que não está no regulamento da FIP não tem resposta afirmativa.
- **Nunca reproduzir texto de terceiros.** Regras explicadas por palavras próprias; notícias com título, atribuição e link.
- **Chave de API fora do cliente.** Garantido por verificação automática na CI.

## Fora de âmbito (v1)

Reservas de campo (é o negócio da Playtomic), rede social, vídeo próprio e e-commerce de material.

---

## Licença

Ainda não definida. O `package.json` está marcado como `private`, pelo que o repositório não se destina a publicação em registo de pacotes.
