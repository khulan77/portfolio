export const THEME_KEY = "theme";

/**
 * Runs synchronously in the document before the page paints so the correct
 * palette is on <html> from the very first frame — no white flash on a dark
 * page. Lives in its own React-free module so the server-rendered layout can
 * import it without pulling client hooks into a Server Component.
 */
export const THEME_BOOT_SCRIPT = `(function(){try{var s=localStorage.getItem("${THEME_KEY}");var t=(s==="light"||s==="dark")?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();`;
