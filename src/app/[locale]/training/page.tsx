import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function TrainingPage() {
  const t = await getTranslations("training");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-medium">{t("title")}</h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{t("intro")}</p>
      <nav className="flex flex-col gap-2 text-sm">
        <Link href="/training/tips" className="underline">
          {t("tips.title")}
        </Link>
        <Link href="/training/glossary" className="underline">
          {t("glossary.title")}
        </Link>
      </nav>
    </div>
  );
}
