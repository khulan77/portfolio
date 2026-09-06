"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { E, T } from "../lib/motion";

/**
 * The way in. A count runs to 100, a greeting is typed under it, and the panel
 * lifts off the page to leave the hero.
 *
 * The count is paced rather than measured — there is no byte total worth
 * reporting on a static page. What it is honest about is the release: the
 * panel will not lift until the display face has loaded, because the hero's
 * headline is SVG sized to Alumni Sans' own measured width, and painting it in
 * a fallback face halves it in front of the reader. So the count is the
 * theatre and `document.fonts.ready` is the actual gate — with a cap, so a
 * font that never arrives cannot trap anyone behind this panel.
 *
 * It stays deliberately rare:
 *   - plays once per session, not on every navigation back from a case study
 *   - never plays under prefers-reduced-motion
 *   - is markup, not a spinner, so whatever it paints is real content
 *
 * The panel is rendered on the server so there is no flash of the page before
 * it appears. When it is not wanted it is removed on the first effect, and
 * because it is the same chalk as the act beneath it, that removal is invisible.
 */

const SEEN_KEY = "intro-seen";
export const INTRO_DONE = "intro:done";

/** What the caret types. */
const GREETING = "Hello";

function shouldSkip() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    // private browsing can throw on read; a replayed intro is the safe failure
    return false;
  }
}

/**
 * The rest of the page reads this rather than the event, because a skipped
 * intro announces itself during its own layout effect — before anything
 * mounted after it has had a chance to start listening.
 */
function mark(state: "running" | "done") {
  document.documentElement.dataset.intro = state;
}

function announce() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* nothing to do — the intro simply plays again next time */
  }
  mark("done");
  window.dispatchEvent(new Event(INTRO_DONE));
}

export default function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      mark("running");

      if (shouldSkip()) {
        setGone(true);
        announce();
        return;
      }

      const countEl = countRef.current;
      const barEl = barRef.current;
      const typedEl = typedRef.current;
      const caretEl = caretRef.current;
      if (!countEl || !barEl || !typedEl || !caretEl) return;

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = previousOverflow;
          setGone(true);
        },
      });

      /*
       * One tween owns both the number and the rule, so the two cannot drift
       * apart: a second tween on the same duration would still round its
       * frames independently and show 97 against a full bar.
       */
      const count = { value: 0 };
      tl.to(count, {
        value: 100,
        duration: T.slow,
        ease: E.soft,
        snap: { value: 1 },
        onUpdate: () => {
          countEl.textContent = String(count.value);
          barEl.style.transform = `scaleX(${count.value / 100})`;
        },
      });

      /*
       * Typed rather than revealed. A single tween across the string types at
       * a machine's perfectly even rate; the rest between two keystrokes is
       * what carries a hand, so each character is its own step and each step
       * is a different length.
       *
       * The rest is drawn around T.fast, the site's own hover interval, which
       * puts it between roughly a tenth and a fifth of a second — about the
       * pace of somebody typing rather than of something being played back.
       * It was scaled from T.stagger before, which is the gap between two
       * neighbours in a list, and at that rate the word arrived faster than a
       * hand could have written it.
       */
      tl.call(() => caretEl.classList.add("is-typing"), undefined, "+=" + T.fast);
      for (let i = 1; i <= GREETING.length; i++) {
        const rest = T.fast * (0.32 + Math.random() * 0.3);
        tl.call(
          () => {
            typedEl.textContent = GREETING.slice(0, i);
          },
          undefined,
          "+=" + rest,
        );
      }
      tl.call(() => caretEl.classList.remove("is-typing"));

      /*
       * The gate. `waiting` exists because the promise can settle either side
       * of the timeline reaching this point, and a pause added unconditionally
       * would strand the visitor whenever the font was already cached.
       */
      let fontsReady = false;
      let waiting = false;

      const release = () => {
        fontsReady = true;
        if (!waiting) return;
        waiting = false;
        tl.resume();
      };

      document.fonts?.ready.then(release);

      tl.call(
        () => {
          if (fontsReady) return;
          waiting = true;
          tl.pause();
          /*
           * Bounded from here rather than from mount. A cap counted from mount
           * has to be long enough to clear the whole count and the typing, so
           * whatever was left of it was dead time the reader sat through. By
           * this point the greeting itself has been on screen in the display
           * face for a second, so the face is demonstrably loaded and this is
           * a guard against a stall, not a wait anybody should ever see.
           */
          gsap.delayedCall(T.fast, release);
        },
        undefined,
        // One keystroke's worth of rest: long enough for the finished word to
        // register, short enough not to become a wait.
        "+=" + T.stagger * 2,
      );

      tl.to(root.current, {
        yPercent: -100,
        duration: T.base,
        ease: E.snap,
      });

      /*
       * The hero is told to start while the panel is still clearing it.
       *
       * Announcing on the timeline's own completion put the two movements end
       * to end — 0.7s of panel, then 1.1s of headline, and in between a beat
       * of empty hero. E.snap is expo, so by this point the panel has already
       * travelled most of its distance: the headline rises into the last of
       * it, and what the reader sees is one movement rather than a handover.
       */
      tl.call(announce, undefined, "-=" + T.base * 0.8);

      return () => {
        document.body.style.overflow = previousOverflow;
      };
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="act-light fixed inset-0 z-[60] flex flex-col"
    >
      {/* The greeting holds the middle of the screen, the way the hero's
          headline does once this panel has gone. */}
      <div className="flex flex-1 items-center justify-center px-6">
        <span className="display text-[clamp(2.5rem,9vw,7rem)] leading-[1.12] text-ink">
          <span ref={typedRef} />
          <span ref={caretRef} className="intro-caret" />
        </span>
      </div>

      {/* The count sits in the same gutter the hero's corners are pinned to,
          so the panel and the page underneath share one left edge. */}
      <div className="bleed pb-8">
        <div className="mono text-sm text-ink-2">
          <span ref={countRef}>0</span>%
        </div>
        <div className="mt-4 h-px bg-line">
          <div ref={barRef} className="h-px origin-left scale-x-0 bg-ink" />
        </div>
      </div>
    </div>
  );
}
