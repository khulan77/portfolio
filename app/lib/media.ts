"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media queries as an external store rather than effect-driven state — the
 * component reads the live value on every render and re-renders only when the
 * query actually flips.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    // On the server nothing matches; the first client render corrects it.
    () => false,
  );
}
