"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { E, T } from "../lib/motion";

/**
 * The way in. A greeting in her own language turns over into English — the
 * same roll the destinations in the bar do, so the first thing the site shows
 * is a move it repeats — and then the panel lifts off the page.
 *
 * It is deliberately short and deliberately rare. The preloader this replaces
 * was removed for holding up the first paint, so this one:
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
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      mark("running");

      if (shouldSkip()) {
        setGone(true);
        announce();
        return;
      }

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = previousOverflow;
          setGone(true);
          announce();
        },
      });

      // The second word waits one line below the mask. Set here rather than in
      // CSS so GSAP owns the transform outright and nothing fights it.
      gsap.set(".intro-en", { yPercent: 100 });

      /*
       * Positions on the timeline, derived rather than typed: the greeting
       * turns over before it has finished settling, and the panel starts
       * lifting as the turn ends. The whole thing is over in about 1.5s: this
       * replaces a preloader that was cut for holding up the first paint, so
       * it has to be a greeting, not a wait.
       */
      const TURN_AT = T.base * 0.6;
      const LIFT_AT = TURN_AT + T.fast;

      tl.from(".intro-greeting", {
        opacity: 0,
        y: 28,
        filter: "blur(14px)",
        duration: T.base,
        ease: E.out,
      })
        .to(
          ".intro-mn",
          { yPercent: -100, duration: T.fast, ease: E.out },
          TURN_AT,
        )
        .to(
          ".intro-en",
          { yPercent: 0, duration: T.fast, ease: E.out },
          TURN_AT,
        )
        .to(
          root.current,
          { yPercent: -100, duration: T.base, ease: E.snap },
          LIFT_AT,
        );

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
      className="act-light fixed inset-0 z-[60] grid place-items-center"
    >
      {/* One line tall, with the English waiting just under the edge of it.
          leading is a little over 1 so the descender of "у" is not clipped. */}
      <div className="intro-greeting relative overflow-hidden text-[clamp(2.5rem,9vw,7rem)] leading-[1.12]">
        <span className="display intro-mn block text-ink">Сайн уу</span>
        <span className="display intro-en absolute inset-0 block text-ink">
          Hello
        </span>
      </div>
    </div>
  );
}
