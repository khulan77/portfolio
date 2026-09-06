"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * A two-part cursor: a dot that sits exactly on the pointer, and a ring that
 * lags behind it.
 *
 * The colours come from whichever act the pointer is over. Before this the
 * cursor was a direct child of <body> and read `--ink` from `:root` — chalk's
 * ink — which painted a #16150f dot onto #14130f for the whole of Act II, so
 * across Work, About, Stack and Process there was no visible cursor at all.
 * The layer now carries the act's own class and inherits that act's complete
 * palette, rather than keeping a second set of cursor colours in step by hand.
 *
 * `mouseover` fires whenever the pointer crosses into a different element, so
 * it is the only place hover state is computed — one handler, recomputed from
 * scratch, instead of an enter/leave pair that can fall out of sync.
 */

/** Anything the pointer can act on. `[data-cursor]` opts an element in. */
const INTERACTIVE = "a, button, [data-cursor]";

/** How hard the ring chases the dot. */
const LAG = 0.18;

/** Scrolling moves the page under a still pointer no faster than this needs. */
const ACT_RECHECK_MS = 80;

export default function Cursor() {
  const layerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // A drawn cursor replaces the real one, so it is only ever built where
    // there is a real one to replace.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const layer = layerRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!layer || !dot || !ring || !label) return;

    // Asked for less motion, the ring stops trailing and sits on the pointer.
    const lag = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 1
      : LAG;

    document.body.classList.add("has-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;

    /* Centred on the point rather than offset by half of a hardcoded size —
       the ring changes size on hover, and a fixed offset drifts when it does. */
    const place = (el: HTMLElement, px: number, py: number) => {
      el.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%)`;
    };

    const setAct = (node: Element | null) => {
      const dark = !!node?.closest(".act-dark");
      layer.classList.toggle("act-dark", dark);
      layer.classList.toggle("act-light", !dark);
    };

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      place(dot, x, y);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest) return;

      setAct(target);

      const hit = target.closest<HTMLElement>(INTERACTIVE);
      ring.classList.toggle("is-hover", !!hit);

      // A word only where the destination is not already obvious from the
      // thing being hovered — an empty one leaves the plain ring.
      const text = hit?.dataset.cursorLabel ?? "";
      if (text) label.textContent = text;
      ring.classList.toggle("is-label", !!text);
    };

    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");
    const onEnterWindow = () => layer.classList.remove("is-out");
    const onLeaveWindow = () => layer.classList.add("is-out");

    let lastScrollY = window.scrollY;
    let lastCheck = 0;

    const tick = () => {
      ringX += (x - ringX) * lag;
      ringY += (y - ringY) * lag;
      place(ring, ringX, ringY);

      /*
       * The pointer also changes act by standing still while the page scrolls
       * past it, and `mouseover` never fires for that. So while the page is
       * moving, the act is re-read from the point under the cursor — a hit
       * test a dozen times a second, not sixty.
       */
      const scrollY = window.scrollY;
      if (scrollY === lastScrollY) return;
      const now = performance.now();
      if (now - lastCheck < ACT_RECHECK_MS) return;
      lastScrollY = scrollY;
      lastCheck = now;
      setAct(document.elementFromPoint(x, y));
    };

    // The page already runs one loop, through Lenis and GSAP. This joins it
    // rather than starting a second requestAnimationFrame of its own.
    gsap.ticker.add(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseenter", onEnterWindow);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseenter", onEnterWindow);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={layerRef} className="cursor-layer act-light" aria-hidden>
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
