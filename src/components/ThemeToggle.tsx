"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_THEME_PREFERENCE,
  THEME_PREFERENCES,
  THEME_STORAGE_KEY,
  isThemePreference,
  resolveTheme,
  type ThemePreference,
} from "@/lib/theme/theme";

function applyTheme(preference: ThemePreference) {
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", resolveTheme(preference, systemPrefersDark) === "dark");
}

export function ThemeToggle({ labels }: { labels: Record<ThemePreference, string> }) {
  const [preference, setPreference] = useState<ThemePreference>(DEFAULT_THEME_PREFERENCE);

  // Só depois de montar é que podemos ler o localStorage — no servidor ele não existe.
  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemePreference(stored)) setPreference(stored);
  }, []);

  // Com "sistema" escolhido, seguir o SO se ele mudar enquanto a página está aberta.
  useEffect(() => {
    if (preference !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [preference]);

  function onSelect(next: ThemePreference) {
    setPreference(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
    applyTheme(next);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {THEME_PREFERENCES.map((option) => {
        const selected = preference === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(option)}
            className={
              selected
                ? "rounded border border-neutral-900 bg-neutral-900 px-3 py-1 text-sm text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
                : "rounded border border-neutral-300 px-3 py-1 text-sm dark:border-neutral-700"
            }
          >
            {labels[option]}
          </button>
        );
      })}
    </div>
  );
}
