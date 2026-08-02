/**
 * A Padel API devolve datas como "2026-08-02", sem hora nem fuso.
 *
 * `new Date("2026-08-02")` interpreta essa string como meia-noite UTC. Quem
 * estiver a oeste de Greenwich vê o dia anterior — um torneio que começa a 2
 * aparece a começar a 1. Por isso construímos a data a partir dos componentes,
 * que o motor interpreta na hora local.
 */
export function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
}

function isValid(date: Date): boolean {
  return !Number.isNaN(date.getTime());
}

/**
 * Intervalo de datas no formato do idioma do utilizador, com as partes comuns
 * colapsadas: "2–5 de ago. de 2026" em vez de repetir mês e ano dos dois lados.
 *
 * Nunca lança: uma linha da tabela com datas estranhas mostra o que der, mas não
 * derruba a página inteira.
 */
export function formatDateRange(locale: string, startIso: string, endIso: string): string {
  const start = parseIsoDate(startIso);
  const end = parseIsoDate(endIso);
  const formatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (!isValid(start)) return isValid(end) ? formatter.format(end) : `${startIso} – ${endIso}`;
  if (!isValid(end)) return formatter.format(start);

  // formatRange lança se o fim for anterior ao início.
  if (end < start) return formatter.format(start);

  return formatter.formatRange(start, end);
}
