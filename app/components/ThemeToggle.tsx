"use client";

import { useCallback, useEffect, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, readTheme, THEME_KEY } from "../lib/theme";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

/**
 * Icons swap in pure CSS off `[data-theme]`, so the button renders identically
 * on the server and the client — no hydration mismatch, no icon flicker.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const button = useRef<HTMLButtonElement>(null);

  // Follow the OS while the visitor has not made an explicit choice.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(THEME_KEY);
      } catch {
        /* ignore */
      }
      if (stored === "light" || stored === "dark") return;
      applyTheme(media.matches ? "dark" : "light", false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    const next = readTheme() === "dark" ? "light" : "dark";
    const doc = document as ViewTransitionDocument;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduced) {
      document.documentElement.classList.add("theme-switching");
      applyTheme(next);
      window.setTimeout(
        () => document.documentElement.classList.remove("theme-switching"),
        60,
      );
      return;
    }

    const rect = button.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : 0;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = doc.startViewTransition(() => applyTheme(next));
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }, []);

  return (
    <button
      ref={button}
      type="button"
      onClick={toggle}
      aria-label="Toggle light / dark"
      title="Toggle light / dark"
      className={`inline-flex h-9 w-9 items-center justify-center border border-line text-ink-3 transition-colors hover:border-line-strong hover:text-ink ${className}`}
    >
      <Sun className="hidden h-3.5 w-3.5 dark:block" />
      <Moon className="block h-3.5 w-3.5 dark:hidden" />
    </button>
  );
}
