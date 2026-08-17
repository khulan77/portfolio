"use client";

import { useCallback, useRef, type ReactNode } from "react";

/**
 * Writes the pointer position into `--mx`/`--my` on the element so the
 * `.spotlight` rim in globals.css can follow the cursor. Setting a custom
 * property is far cheaper than re-rendering, so this never touches state.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onPointerMove = useCallback((event: React.PointerEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

  return { ref, onPointerMove };
}

/** Ready-made spotlight surface for the plain (server-rendered) cards. */
export default function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();

  return (
    <div ref={ref} onPointerMove={onPointerMove} className={`spotlight ${className}`}>
      {children}
    </div>
  );
}
