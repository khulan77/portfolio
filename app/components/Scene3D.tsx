"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "../lib/media";

// Browser-only and heavy, so it never reaches the server bundle.
const HeroLattice = dynamic(() => import("./HeroLattice"), {
  ssr: false,
  loading: () => null,
});

/**
 * Decides whether the WebGL scene should exist at all, and pauses it the
 * moment the hero leaves the viewport so the rest of the page gets the GPU.
 */
export default function Scene3D() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  const coarse = useMediaQuery("(pointer: coarse)");
  const narrow = useMediaQuery("(max-width: 640px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  // Small touch devices and reduced-motion visitors get the static fallback:
  // the lattice is atmosphere, never information, so dropping it costs nothing.
  const enabled = !reduced && !(coarse && narrow);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0 -z-10" aria-hidden>
      {enabled ? (
        <HeroLattice active={visible} count={narrow ? 80 : 140} />
      ) : (
        <div
          className="absolute left-1/2 top-1/2 h-[52vmin] w-[52vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
          style={{
            background: "radial-gradient(circle, var(--glow), transparent 68%)",
          }}
        />
      )}
    </div>
  );
}
