"use client";

import { useMemo, useState } from "react";

type NewsListItem = {
  id: string;
  title: string;
  url: string;
  sourceName: string;
  sourceLanguage: string;
  formattedDate: string | null;
  isForeignLanguage: boolean;
};

export function NewsList({
  items,
  languages,
  languageLabels,
  filterLabel,
  filterAllLabel,
  emptyLabel,
  foreignLanguageLabel,
}: {
  items: NewsListItem[];
  languages: string[];
  languageLabels: Record<string, string>;
  filterLabel: string;
  filterAllLabel: string;
  emptyLabel: string;
  foreignLanguageLabel: string;
}) {
  const [language, setLanguage] = useState<string>("all");

  const filtered = useMemo(
    () => (language === "all" ? items : items.filter((item) => item.sourceLanguage === language)),
    [items, language],
  );

  return (
    <div className="flex flex-col gap-4">
      <label className="flex items-center gap-2 text-sm">
        <span>{filterLabel}</span>
        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          className="rounded-md border border-line bg-surface px-2 py-1.5 text-ink"
        >
          <option value="all">{filterAllLabel}</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {languageLabels[lang] ?? lang.toUpperCase()}
            </option>
          ))}
        </select>
      </label>

      {filtered.length === 0 && <p className="text-sm text-ink-faint">{emptyLabel}</p>}

      <ul className="flex flex-col gap-3">
        {filtered.map((item) => (
          <li
            key={item.id}
            className="rounded-lg border border-line bg-surface p-4 text-sm"
          >
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline"
            >
              {item.title}
            </a>
            <p className="mt-2 text-xs text-ink-faint">
              {item.sourceName}
              {item.formattedDate && <> · {item.formattedDate}</>}
              {" · "}
              <span className="uppercase">{item.sourceLanguage}</span>
              {item.isForeignLanguage && (
                <> · <span className="italic">{foreignLanguageLabel}</span></>
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
