import Link from "next/link";
import { defaultLocale } from "@/i18n/routing";

/**
 * Rede de segurança para endereços que nem sequer têm um idioma válido
 * (`/xx/rankings`, por exemplo). O 404 com marca e navegação é o de
 * `[locale]/not-found.tsx`; este vive acima do segmento de idioma, por isso
 * não tem cabeçalho nem traduções — não há locale para escolher uma.
 *
 * Fica deliberadamente mínimo: uma frase nas duas línguas mais prováveis e uma
 * porta para dentro do sítio.
 */
export default function GlobalNotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-6xl font-bold tracking-tight text-accent">404</p>
      <p className="mt-4 text-lg font-medium">Página não encontrada</p>
      <p lang="en" className="mt-1 text-ink-muted">
        Page not found
      </p>
      <Link
        href={`/${defaultLocale}`}
        className="mt-8 rounded-lg bg-accent px-5 py-2.5 font-medium text-accent-ink no-underline"
      >
        Padel Hub
      </Link>
    </div>
  );
}
