import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { marked } from "marked";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getRule, needsReviewNotice, rules } from "@/lib/rules/get-rule";
import { FIP_OFFICIAL_PDF_URL } from "@/lib/rules/rules";

// Conteúdo estático (não depende da Padel API) — pode ser pré-gerado no build.
export function generateStaticParams() {
  return rules.map((rule) => ({ slug: rule.slug }));
}

export default async function RuleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("rules");

  const rule = getRule(slug, locale);
  if (!rule) {
    notFound();
  }

  const bodyHtml = marked.parse(rule.content.bodyMd) as string;

  return (
    <div className="flex flex-col gap-4">
      <Link href="/rules" className="text-sm underline">
        {t("backToIndex")}
      </Link>

      <h2 className="text-lg font-medium">{rule.content.title}</h2>

      {needsReviewNotice(rule.content.status) && (
        <p
          role="status"
          className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200"
        >
          {t("pendingReviewNotice")}
        </p>
      )}

      <div
        className="[&_p]:my-2 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />

      <p className="text-sm text-neutral-500">
        {t("officialSource")}: {rule.meta.fipArticleRef} —{" "}
        <a href={FIP_OFFICIAL_PDF_URL} target="_blank" rel="noreferrer" className="underline">
          {t("viewOfficialPdf")}
        </a>
      </p>
    </div>
  );
}
