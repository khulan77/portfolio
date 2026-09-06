"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { E, T, armReveal, clearReveal } from "../lib/motion";
import { INTRO_DONE } from "./Intro";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroHeadline from "./HeroHeadline";
import Seal from "./Seal";
import Scene3D from "./Scene3D";
import { brand } from "../data/profile";

/**
 * What the work is made of, set as a triangle: the apex over the gap between
 * the two dots. It replaces the positioning line that used to sit here, which
 * restated in words what the type already says.
 */
const TRIAD = { apex: "CODE", left: "VISUALS", right: "EXPERIENCE" } as const;

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /*
       * One movement on load, finished inside 1.2s. The hero used to
       * choreograph five groups in sequence, which meant the reader was still
       * being animated at while trying to read. The headline lifts; nothing
       * else does.
       */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const lines = gsap.utils.toArray<HTMLElement>(".hero-line > *");
        armReveal(lines);

        /*
         * Slower than T.slow, which is where the rest of the site tops out.
         * These two words are the largest thing on the page and they are the
         * first thing anybody reads; at 1.1s they cleared their masks before
         * the eye had settled on them. 1.375s is deliberately just under the
         * 1.4s the motion system names as the point a movement starts reading
         * as broken — the ceiling, approached on purpose, and only here.
         */
        const tween = gsap.from(lines, {
          yPercent: 108,
          duration: T.slow * 1.25,
          ease: E.out,
          stagger: T.stagger,
          paused: true,
          onComplete: () => clearReveal(lines),
        });

        /*
         * Held until the intro panel has lifted. Playing underneath it would
         * spend the one movement this page gets where nobody can see it.
         */
        const state = document.documentElement.dataset.intro;
        if (state === "running") {
          window.addEventListener(INTRO_DONE, () => tween.play(), {
            once: true,
          });
        } else {
          tween.play();
        }
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <>
      {/*
        The hero holds the type and nothing else. Where the reader is, how to
        reach her and the seal all sit in their own band underneath, outside
        this frame.
      */}
      <section
        ref={root}
        id="top"
        className="relative flex min-h-[100svh] flex-col overflow-hidden pt-32 pb-8"
      >
        <Scene3D />
        <div
          className="blueprint fade-mask-y pointer-events-none absolute inset-0 -z-10"
          aria-hidden
        />

        <motion.div style={{ y, opacity }} className="bleed my-auto">
          {/*
            The headline block, inset from the display measure. It carries its
            own container, so ENGINEER — sized in cqi — scales with SOFTWARE
            and the two keep their proportion at every width. This one width is
            the whole headline's size control.
          */}
          <div className="mx-auto w-[86%] [container-type:inline-size]">
            <h1>
              <span className="hero-line block overflow-hidden">
                <HeroHeadline />
              </span>

              {/*
                The second word is deliberately small and still against the
                first: 13.5cqi of this block, times ENGINEER's own width of
                2.81em, puts it at about a third of the line above it. Both
                are measured against the same box, so they stay in proportion
                however wide the block is set.
              */}
              <span className="hero-line mt-1 block overflow-hidden text-center">
                <span className="display block text-ink [font-size:13.5cqi] [line-height:0.9]">
                  ENGINEER
                </span>
              </span>
            </h1>

            {/*
              Apex over the gap, base either side of it. Set larger than a
              label and tracked out: Alumni Sans is narrow enough that at label
              size three short words stop reading as words.
            */}
            <div className="relative mt-12 flex items-center justify-center gap-5 text-ink sm:gap-7">
              <span className="display text-xl tracking-[0.08em] sm:text-2xl">
                {TRIAD.left}
              </span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-ink-3" />
              <span aria-hidden className="w-8 sm:w-16" />
              <span aria-hidden className="h-1 w-1 rounded-full bg-ink-3" />
              <span className="display text-xl tracking-[0.08em] sm:text-2xl">
                {TRIAD.right}
              </span>

              <span className="display absolute -top-9 left-1/2 -translate-x-1/2 text-xl tracking-[0.08em] sm:text-2xl">
                {TRIAD.apex}
              </span>
            </div>
          </div>
        </motion.div>

        {/*
          The corners. Type owns the middle of the screen; everything that is
          not type is pushed to an edge — the year and name left, the way down
          in the centre, and the seal with the place under it on the right.
        */}
        <div className="bleed flex items-end justify-between gap-6">
          <span className="label whitespace-nowrap">
            © {new Date().getFullYear()} {brand.name}
          </span>

          <a
            href="#work"
            className="label group hidden flex-col items-center gap-1 transition-colors hover:text-ink sm:flex"
          >
            Scroll to explore
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-y-0.5"
            >
              ↓
            </span>
          </a>

          <div className="flex flex-col items-center gap-2">
            <Seal className="h-[4.5rem] w-[4.5rem] shrink-0 md:h-20 md:w-20" />
            {/* A corner label, so it follows the site's rule: English for
                structure, Mongolian for the narrative copy. */}
            <span className="label whitespace-nowrap">Ulaanbaatar</span>
          </div>
        </div>
      </section>

    </>
  );
}
