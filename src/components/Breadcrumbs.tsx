import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema, type BreadcrumbItem } from "@/lib/seo/schema";

/**
 * Trilho de navegação visível + o BreadcrumbList correspondente.
 *
 * Os dois andam sempre juntos de propósito: declarar um trilho estruturado que
 * o utilizador não vê é spam de dados estruturados. Substitui as ligações
 * "← voltar" soltas, que diziam de onde se vinha mas não onde se está.
 */
export function Breadcrumbs({ locale, items }: { locale: Locale; items: BreadcrumbItem[] }) {
  const last = items.length - 1;

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-ink-muted">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" className="text-ink-faint">
                  /
                </span>
              )}
              {item.path && index !== last ? (
                <Link href={item.path} className="no-underline hover:text-accent">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={index === last ? "page" : undefined} className="text-ink">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <JsonLd data={breadcrumbSchema(locale, items)} />
    </>
  );
}
