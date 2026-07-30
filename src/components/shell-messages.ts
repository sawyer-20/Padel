import de from "../../messages/de/common.json";
import en from "../../messages/en/common.json";
import es from "../../messages/es/common.json";
import fr from "../../messages/fr/common.json";
import pt from "../../messages/pt/common.json";
import type { Locale } from "@/i18n/routing";

// Componentes fora do segmento [locale] (ex: StateProbe, LocaleSwitcher) persistem entre
// trocas de idioma e por isso não recebem novas props do NextIntlClientProvider nessa troca.
// Lêem as mensagens diretamente daqui, reativamente, a partir do locale na URL.
export const shellMessages: Record<Locale, typeof pt> = { pt, en, es, fr, de };
