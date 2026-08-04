import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

const LOCALE_LABELS: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
};

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations("common");

  const explore = [
    { href: "/rankings", label: t("nav.rankings") },
    { href: "/players", label: t("footer.players") },
    { href: "/tournaments", label: t("nav.tournaments") },
    { href: "/news", label: t("nav.news") },
  ];

  const learn = [
    { href: "/faq", label: t("footer.faq") },
    { href: "/rules", label: t("nav.rules") },
    { href: "/rules/situations", label: t("footer.situations") },
    { href: "/training/tips", label: t("footer.tips") },
    { href: "/training/glossary", label: t("footer.glossary") },
  ];

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-base font-semibold tracking-tight">{t("appName")}</p>
          <p className="mt-2 max-w-xs text-sm text-ink-muted">{t("footer.tagline")}</p>
        </div>

        <nav aria-label={t("footer.explore")}>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
            {t("footer.explore")}
          </h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-muted no-underline hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("footer.learn")}>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
            {t("footer.learn")}
          </h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {learn.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-muted no-underline hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Ligações reais (<a href>) para cada idioma: o seletor no topo é um <select>
            controlado por JavaScript, que nenhum motor de pesquisa segue. */}
        <nav aria-label={t("footer.language")}>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
            {t("footer.language")}
          </h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {locales.map((loc) => (
              <li key={loc}>
                <a
                  href={`/${loc}`}
                  hrefLang={loc}
                  aria-current={loc === locale ? "true" : undefined}
                  className={
                    loc === locale
                      ? "font-semibold text-ink no-underline"
                      : "text-ink-muted no-underline hover:text-ink"
                  }
                >
                  {LOCALE_LABELS[loc]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs leading-relaxed text-ink-faint sm:px-6">
          {t("footer.dataSource")}
        </p>
      </div>
    </footer>
  );
}
