export type SearchDocType = "rule" | "situation" | "term" | "tip" | "faq";

export type SearchDoc = {
  id: string;
  type: SearchDocType;
  title: string;
  /** Texto simples, já sem Markdown. */
  body: string;
  /** Caminho sem prefixo de idioma. */
  href: string;
};

export type SearchResult = {
  doc: SearchDoc;
  score: number;
  /** Excerto do corpo à volta da primeira ocorrência, para dar contexto. */
  snippet: string;
};
