"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// The 3D scene is heavy and browser-only, so load it lazily with no SSR.
const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10">
      <div
        className="absolute left-1/2 top-1/2 h-[40vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background: "radial-gradient(circle, var(--accent-soft), transparent 65%)",
        }}
      />
    </div>
  ),
});

export default function Scene3D() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    // Stop rendering the WebGL scene once the hero leaves the viewport —
    // frees the GPU for the rest of the page (projects, scroll animations).
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0 -z-10" aria-hidden>
      <Hero3D active={active} />
    </div>
  );
}
