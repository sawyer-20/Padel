import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function TrainingPage() {
  const t = await getTranslations("training");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-medium">{t("title")}</h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{t("intro")}</p>
      <Link href="/training/glossary" className="text-sm underline">
        {t("glossary.title")}
      </Link>
    </div>
  );
}
