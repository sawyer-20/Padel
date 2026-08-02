import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { ThemePreference } from "@/lib/theme/theme";
import { PageHeader } from "@/components/PageHeader";
import { staticPageMetadata, type LocaleParams } from "@/lib/seo/page-metadata";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  // Painel de preferências: útil para quem cá está, sem valor nos resultados de pesquisa.
  return staticPageMetadata(locale, "settings", "/settings", { noIndex: true });
}

export default async function SettingsPage() {
  // Fica em "common" (e não num namespace novo) porque são preferências da própria app,
  // não um domínio de conteúdo — mantém a lista de namespaces do PROJECT.md §5.1 intacta.
  const t = await getTranslations("common.settings");

  const themeLabels: Record<ThemePreference, string> = {
    system: t("theme.system"),
    light: t("theme.light"),
    dark: t("theme.dark"),
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title={t("title")} />

      <div className="flex flex-col gap-4">
        <section className="rounded-lg border border-line bg-surface p-5">
          <h2 className="font-semibold tracking-tight">{t("language.title")}</h2>
          <p className="mt-1 mb-3 text-sm text-ink-muted">{t("language.description")}</p>
          <LocaleSwitcher />
        </section>

        <section className="rounded-lg border border-line bg-surface p-5">
          <h2 className="font-semibold tracking-tight">{t("theme.title")}</h2>
          <p className="mt-1 mb-3 text-sm text-ink-muted">{t("theme.description")}</p>
          <ThemeToggle labels={themeLabels} />
        </section>

        <section className="rounded-lg border border-line bg-surface p-5">
          <h2 className="font-semibold tracking-tight">{t("units.title")}</h2>
          <p className="mt-1 text-sm text-ink-muted">{t("units.notAvailable")}</p>
        </section>
      </div>
    </div>
  );
}
