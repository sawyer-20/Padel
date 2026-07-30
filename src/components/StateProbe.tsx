"use client";

import { useState } from "react";
import { useCurrentLocale } from "./useCurrentLocale";
import { shellMessages } from "./shell-messages";

export function StateProbe() {
  const locale = useCurrentLocale();
  const t = shellMessages[locale].phase0;
  const [count, setCount] = useState(0);

  return (
    <div className="mt-4 flex items-center gap-3 text-sm">
      <span>{t.counterLabel}:</span>
      <span data-testid="state-probe-count" className="font-mono text-base">
        {count}
      </span>
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="rounded bg-neutral-900 px-3 py-1 text-white dark:bg-neutral-100 dark:text-neutral-900"
      >
        {t.increment}
      </button>
    </div>
  );
}
