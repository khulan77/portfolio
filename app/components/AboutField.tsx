"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "../lib/media";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Browser-only and heavy, so it never reaches the server bundle.
const AboutLattice = dynamic(() => import("./AboutLattice"), {
  ssr: false,
  loading: () => null,
});

/**
 * Decides whether the scene exists at all, drives it from the scroll, and
 * stops it the moment it leaves the viewport.
 *
 * The gate is `(min-width: 1024px)` rather than a maximum, because
 * `useMediaQuery` answers false on the server: the field is left out of the
 * first render and added on a wide screen once the query can be read, which
 * is the safe direction. Gated the other way, every phone would paint a
 * WebGL panel and then drop it.
 *
 * Under reduced motion it is not built. The structure is an illustration of
 * the paragraph beside it, never the only place that argument is made, so
 * dropping it costs the reader nothing — the same call the hero's lattice
 * makes.
 */
export default function AboutField() {
  const wrap = useRef<HTMLDivElement>(null);
  /** 0 scattered, 1 resolved. Written by ScrollTrigger, read every frame. */
  const progress = useRef(0);
  const [visible, setVisible] = useState(false);

  const wide = useMediaQuery("(min-width: 1024px)");
  const coarse = useMediaQuery("(pointer: coarse)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = wide && !coarse && !reduced;

  useEffect(() => {
    const el = wrap.current;
    if (!el || !enabled) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled]);

  useGSAP(
    () => {
      const el = wrap.current;
      if (!el || !enabled) return;

      /*
       * The scatter resolves across the section rather than at a point in it,
       * so the reader is the one assembling it. It finishes while the panel is
       * still well inside the viewport — a structure that only completes as it
       * leaves is a structure nobody sees finished.
       */
      const tween = gsap.to(progress, {
        current: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "bottom 55%",
          scrub: 0.8,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: wrap, dependencies: [enabled] },
  );

  if (!enabled) return null;

  return (
    <div
      ref={wrap}
      /* A set height rather than a share of the row: the row is no longer
         stretched, so there is nothing left over for the field to take. */
      className="relative h-52 border-b border-line"
      aria-hidden
    >
      <AboutLattice active={visible} progress={progress} />
    </div>
  );
}
