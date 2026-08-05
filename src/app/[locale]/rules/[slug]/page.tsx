import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { marked } from "marked";
import type { Locale } from "@/i18n/routing";
import { getRule, needsReviewNotice, rules } from "@/lib/rules/get-rule";
import { FIP_OFFICIAL_PDF_URL } from "@/lib/rules/rules";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { excerptFromMarkdown } from "@/lib/seo/excerpt";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PadelCourt } from "@/components/PadelCourt";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema } from "@/lib/seo/schema";

// Conteúdo estático (não depende da Padel API) — pode ser pré-gerado no build.
export function generateStaticParams() {
  return rules.map((rule) => ({ slug: rule.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const rule = getRule(slug, locale as Locale);
  if (!rule) return {};

  const t = await getTranslations({ locale, namespace: "seo" });

  // A descrição sai do próprio texto da regra: é único por regra e por idioma,
  // ao contrário de uma frase de modelo repetida em 19 páginas.
  const excerpt = excerptFromMarkdown(rule.content.bodyMd);

  return buildPageMetadata({
    locale: locale as Locale,
    path: `/rules/${slug}`,
    title: rule.content.title,
    description: excerpt || t("ruleDetail.description", { title: rule.content.title }),
  });
}

export default async function RuleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("rules");
  const tCommon = await getTranslations("common");

  const rule = getRule(slug, locale);
  if (!rule) {
    notFound();
  }

  const bodyHtml = marked.parse(rule.content.bodyMd) as string;

  return (
    <article className="mx-auto max-w-2xl">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: tCommon("nav.home"), path: "/" },
          { label: tCommon("nav.rules"), path: "/rules" },
          { label: rule.content.title },
        ]}
      />

      <JsonLd
        data={articleSchema({
          locale,
          path: `/rules/${slug}`,
          headline: rule.content.title,
          description: excerptFromMarkdown(rule.content.bodyMd),
        })}
      />

      <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        {rule.content.title}
      </h1>

      {needsReviewNotice(rule.content.status) && (
        <p
          role="status"
          className="mt-4 rounded-lg border border-line-strong bg-raised p-3 text-sm text-ink-muted"
        >
          {t("pendingReviewNotice")}
        </p>
      )}

      {/* Aqui o desenho não é decoração: a regra descreve um retângulo com
          linhas em sítios precisos, e ver a planta poupa três leituras do
          texto. É a única regra que ganha alguma coisa com uma imagem. */}
      {slug === "court-dimensions" && (
        <figure className="mt-6 rounded-xl border border-line bg-surface p-5">
          <PadelCourt className="w-full text-accent" showNetLabel={t("courtDiagramLabel")} />
          <figcaption className="mt-3 text-xs text-ink-faint">
            {t("courtDiagramCaption")}
          </figcaption>
        </figure>
      )}

      <div
        className="mt-5 leading-relaxed [&_li]:my-1 [&_p]:my-3 [&_strong]:font-semibold [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />

      <p className="mt-8 border-t border-line pt-4 text-sm text-ink-faint">
        {t("officialSource")}: {rule.meta.fipArticleRef} —{" "}
        <a
          href={FIP_OFFICIAL_PDF_URL}
          target="_blank"
          rel="noreferrer"
          className="text-accent no-underline hover:underline"
        >
          {t("viewOfficialPdf")}
        </a>
      </p>
    </article>
  );
}
