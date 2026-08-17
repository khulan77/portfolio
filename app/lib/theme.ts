"use client";

import { useSyncExternalStore } from "react";
import { THEME_KEY } from "./theme-script";

export type Theme = "light" | "dark";

export { THEME_KEY };

export function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function applyTheme(theme: Theme, persist = true) {
  document.documentElement.dataset.theme = theme;
  if (persist) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* private mode — the in-memory theme still works */
    }
  }
}

/* `data-theme` on <html> is the single source of truth; React subscribes to
 * it through one shared observer rather than holding a duplicate copy. */
const listeners = new Set<() => void>();
let observer: MutationObserver | null = null;

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  if (!observer) {
    observer = new MutationObserver(() => listeners.forEach((fn) => fn()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0) {
      observer?.disconnect();
      observer = null;
    }
  };
}

/**
 * Current theme, kept in sync with the `data-theme` attribute no matter who
 * changed it (toggle, OS preference, another tab). The server snapshot is
 * always "dark", so callers must not let it shape the initial markup.
 */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => "dark" as Theme);
}
