"use client";

import { useEffect, useId, useRef } from "react";
import { gsap } from "gsap";

/**
 * The headline, set as SVG so both lines can be locked to one measure, and
 * displaced by a turbulence field while the pointer is over it.
 *
 * The field is driven by pointer *speed*, not pointer position. Position makes
 * the letters lean toward the cursor, which reads as a rigid object being
 * pushed; speed makes them yield while you move and settle when you stop,
 * which is what reads as liquid.
 *
 * An SVG filter repaints its whole region every frame, so the filter attribute
 * is attached only while there is something to see and removed the moment the
 * displacement falls below a visible amount. A still page runs no filter at
 * all.
 */

/** Natural widths measured from the running page, at font-size 1000. */
const HEAD = {
  /*
   * Halfway between the two natural widths — SOFTWARE 3241, ENGINEER 2810.
   * Pinning both to the wider one stretched ENGINEER by 15% and it came out
   * visibly heavier than the line above it; splitting the difference squeezes
   * one by 6.6% and opens the other by 7.7%, so the two lines carry the same
   * apparent weight and read as a single block.
   */
  width: 3026,
  /** Alumni Sans, from the font's own OS/2 table. */
  cap: 591,
  /** 0.84em of leading — the two lines read as one block, not two words. */
  lead: 840,
} as const;

const LINES = [
  { word: "SOFTWARE", baseline: HEAD.cap },
  { word: "ENGINEER", baseline: HEAD.cap + HEAD.lead },
] as const;

/**
 * Displacement in user units at full tilt. The viewBox is 3026 wide, so this
 * is roughly a 5% swell — enough that the letters visibly give way, while a
 * hard flick of the mouse still leaves the words readable.
 */
const MAX_SCALE = 210;
/**
 * What the field is worth the moment the pointer is over the words at all.
 * Amplitude alone was not the problem — a still field only bulges the letters.
 * A surface that is already moving before you push it is what reads as water.
 * Held below the point where the O of SOFTWARE starts to read as a U.
 */
const IDLE_SWELL = 56;
/** Below this the distortion is invisible, so the filter comes off entirely. */
const OFF_SCALE = 0.12;
/** How fast the field settles once the pointer stops moving. */
const DECAY = 0.93;
/** How quickly the visible amount chases the target. */
const EASE = 0.18;

export default function HeroHeadline() {
  const rawId = useId();
  // useId returns a value containing colons, which are not usable in url(#…)
  const filterId = `warp-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const mapRef = useRef<SVGFEDisplacementMapElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const group = groupRef.current;
    const map = mapRef.current;
    const turb = turbRef.current;
    if (!svg || !group || !map || !turb) return;

    // No hover, a coarse pointer, or less motion asked for: no listeners, no
    // ticker callback, nothing to tear down. The headline just sits there.
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const lessMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canHover.matches || lessMotion.matches) return;

    let lastX = 0;
    let lastY = 0;
    let lastT = 0;
    let target = 0;
    let current = 0;
    let over = false;
    let attached = false;

    const onMove = (event: PointerEvent) => {
      const now = event.timeStamp;
      const dt = Math.max(now - lastT, 1);
      const dist = Math.hypot(event.clientX - lastX, event.clientY - lastY);
      lastX = event.clientX;
      lastY = event.clientY;
      lastT = now;
      if (!over) return;
      // px per ms on top of the resting swell
      target = Math.min(IDLE_SWELL + (dist / dt) * 105, MAX_SCALE);
    };

    const onEnter = () => {
      over = true;
      target = IDLE_SWELL;
    };
    const onLeave = () => {
      over = false;
      target = 0;
    };

    const tick = () => {
      // While the pointer is over the words the surface never fully settles;
      // it only falls back to its resting swell.
      target = over ? Math.max(target * DECAY, IDLE_SWELL) : target * DECAY;
      current += (target - current) * EASE;

      if (current < OFF_SCALE) {
        if (attached) {
          group.removeAttribute("filter");
          attached = false;
        }
        return;
      }
      if (!attached) {
        group.setAttribute("filter", `url(#${filterId})`);
        attached = true;
      }
      // The field itself churns, slowly, so the distortion flows instead of
      // sitting still and merely growing. One full cycle takes about ten
      // seconds — far slower than anything that enters the page.
      const t = performance.now() / 1000;
      const fx = 0.0008 + Math.sin(t * 0.62) * 0.00028;
      const fy = 0.0019 + Math.cos(t * 0.44) * 0.00075;
      turb.setAttribute("baseFrequency", `${fx.toFixed(5)} ${fy.toFixed(5)}`);

      // written straight to the attribute — React state at 60fps would be
      // a render per frame for a number nothing else reads
      map.setAttribute("scale", current.toFixed(2));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    svg.addEventListener("pointerenter", onEnter);
    svg.addEventListener("pointerleave", onLeave);
    // The page already runs one loop, through Lenis and GSAP. This joins it
    // rather than starting a second requestAnimationFrame of its own.
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      svg.removeEventListener("pointerenter", onEnter);
      svg.removeEventListener("pointerleave", onLeave);
      gsap.ticker.remove(tick);
      group.removeAttribute("filter");
    };
  }, [filterId]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${HEAD.width} ${HEAD.cap + HEAD.lead}`}
      className="block w-full fill-current text-ink"
      role="img"
      aria-label="Software Engineer"
    >
      <defs>
        <filter
          id={filterId}
          x="-8%"
          y="-14%"
          width="116%"
          height="128%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            ref={turbRef}
            type="fractalNoise"
            baseFrequency="0.0008 0.0019"
            numOctaves={1}
            seed={4}
            result="noise"
          />
          <feDisplacementMap
            ref={mapRef}
            in="SourceGraphic"
            in2="noise"
            scale={0}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      <g ref={groupRef}>
        {LINES.map(({ word, baseline }) => (
          <text
            key={word}
            x={0}
            y={baseline}
            textLength={HEAD.width}
            lengthAdjust="spacingAndGlyphs"
            className="display"
            fontSize={1000}
          >
            {word}
          </text>
        ))}
      </g>
    </svg>
  );
}
