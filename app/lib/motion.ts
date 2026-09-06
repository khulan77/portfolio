/**
 * Every duration and every ease on the site comes from here.
 *
 * The point is not tidiness. Timings written inline drift apart — the page
 * had twenty of them, no two agreed, and nothing on screen felt like it
 * belonged to the same system. Below 0.25s a movement reads as a glitch;
 * above 1.4s it reads as broken.
 */
export const T = {
  /** hover and small state changes */
  fast: 0.35,
  /** the standard reveal */
  base: 0.7,
  /** the hero, and anything physically large */
  slow: 1.1,
  /** between neighbours in a list — never more than this */
  stagger: 0.07,
} as const;

export const E = {
  /** things arriving */
  out: "power3.out",
  /** state changes and loops */
  soft: "power2.inOut",
  /** decisive movement — nav, overlays */
  snap: "expo.out",
} as const;

/**
 * The same three curves for framer-motion, which cannot read GSAP's ease
 * strings. Kept beside E so the two libraries stay one system rather than two.
 */
export const EASE = {
  out: [0.22, 1, 0.36, 1],
  soft: [0.65, 0, 0.35, 1],
  snap: [0.76, 0, 0.24, 1],
} as const;

/**
 * The one signature on the site: blur-lift. Everything that enters does this
 * and nothing does anything else, because a page where each element has its
 * own entrance is noise rather than a system.
 *
 * `filter` is expensive — it repaints the element's whole area every frame —
 * so callers must clear it the moment the tween finishes. `clearReveal` does
 * that, and drops `will-change` with it.
 */
export const REVEAL_FROM = {
  opacity: 0,
  y: 28,
  filter: "blur(14px)",
} as const;

export const REVEAL_START = "top 82%";

export function armReveal(targets: Element | Element[]) {
  const list = Array.isArray(targets) ? targets : [targets];
  for (const el of list) {
    (el as HTMLElement).style.willChange = "transform, opacity, filter";
  }
}

export function clearReveal(targets: Element | Element[]) {
  const list = Array.isArray(targets) ? targets : [targets];
  for (const el of list) {
    const style = (el as HTMLElement).style;
    style.willChange = "";
    style.filter = "";
  }
}
