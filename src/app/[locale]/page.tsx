import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("common.phase0");

  return (
    <>
      <h2 className="text-lg font-medium">{t("title")}</h2>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">{t("description")}</p>
    </>
  );
}
