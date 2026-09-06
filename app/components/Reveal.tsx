"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  E,
  REVEAL_FROM,
  REVEAL_START,
  T,
  armReveal,
  clearReveal,
} from "../lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger the direct children instead of moving the block as one. */
  stagger?: boolean;
};

/**
 * The only entrance on the site.
 *
 * Everything is inside a `gsap.matchMedia()` query, so a visitor who has asked
 * their system for less motion gets no tween created at all. That is why the
 * animation is written with `gsap.from` rather than `fromTo` or a CSS starting
 * state: with no tween, the markup is already in its final state and nothing
 * is left stranded at `opacity: 0`.
 *
 * A staggered list is handed to `ScrollTrigger.batch`, which watches the whole
 * group with one observer and animates whatever entered together — rather than
 * building a separate ScrollTrigger for every row.
 */
export default function Reveal({
  children,
  className = "",
  stagger = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (stagger) {
          const items = Array.from(el.children);
          if (!items.length) return;

          ScrollTrigger.batch(items, {
            start: REVEAL_START,
            once: true,
            onEnter: (batch) => {
              armReveal(batch);
              gsap.from(batch, {
                ...REVEAL_FROM,
                duration: T.base,
                ease: E.out,
                stagger: T.stagger,
                onComplete: () => clearReveal(batch),
              });
            },
          });
          return;
        }

        armReveal(el);
        gsap.from(el, {
          ...REVEAL_FROM,
          duration: T.base,
          ease: E.out,
          scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
          onComplete: () => clearReveal(el),
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [stagger] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
