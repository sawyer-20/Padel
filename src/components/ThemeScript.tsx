import { DEFAULT_THEME_PREFERENCE, THEME_STORAGE_KEY } from "@/lib/theme/theme";

// Corre antes do primeiro paint, ainda no <head>. Sem isto, quem escolheu tema escuro
// veria um flash branco em cada carregamento, porque o React só hidrata depois.
// É intencionalmente pequeno e sem dependências — é código que bloqueia a renderização.
const script = `
(function () {
  try {
    var stored = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    var pref = stored === "light" || stored === "dark" || stored === "system"
      ? stored
      : ${JSON.stringify(DEFAULT_THEME_PREFERENCE)};
    var dark = pref === "dark" ||
      (pref === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {
    // localStorage bloqueado (modo privado, cookies desativados): fica no tema claro.
  }
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
