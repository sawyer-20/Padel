import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { ThemePreference } from "@/lib/theme/theme";
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
    <div className="flex flex-col gap-8">
      <h2 className="text-lg font-medium">{t("title")}</h2>

      <section className="flex flex-col gap-2">
        <h3 className="font-medium">{t("language.title")}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{t("language.description")}</p>
        <LocaleSwitcher />
      </section>

      <section className="flex flex-col gap-2">
        <h3 className="font-medium">{t("theme.title")}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{t("theme.description")}</p>
        <ThemeToggle labels={themeLabels} />
      </section>

      <section className="flex flex-col gap-2">
        <h3 className="font-medium">{t("units.title")}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{t("units.notAvailable")}</p>
      </section>
    </div>
  );
}
