"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { E, T, armReveal, clearReveal } from "../lib/motion";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroHeadline from "./HeroHeadline";
import Seal from "./Seal";
import Scene3D from "./Scene3D";
import { brand, links } from "../data/profile";


/**
 * What the work is made of. This replaces the positioning line that used to
 * sit here, which repeated in words what the headline already says in type.
 */
const TRIO = ["INTERFACE", "SYSTEMS", "AI"] as const;

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
        const lines = gsap.utils.toArray<HTMLElement>(".hero-line > svg");
        armReveal(lines);
        gsap.from(lines, {
          yPercent: 108,
          duration: T.slow,
          ease: E.out,
          stagger: T.stagger,
          onComplete: () => clearReveal(lines),
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-6 pt-36"
    >
      <Scene3D />
      <div
        className="blueprint fade-mask-y pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      />

      <motion.div style={{ y, opacity }} className="shell">
        {/* status */}
        <div className="hero-status label flex items-center gap-3 text-ink-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-signal" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
          </span>
          Available for new work
          <span className="ml-auto hidden md:block">{brand.school}</span>
        </div>

        {/* The title is the message — everything else supports it. */}
        <h1 className="mt-6">
          <span className="hero-line block overflow-hidden">
            <HeroHeadline />
          </span>

          {/*
            The second word is deliberately small and still against the first.
            13.5cqi of the column, times ENGINEER's own width of 2.81em, puts
            it at about 38% of the measure — a counterweight, not a second
            headline.
          */}
          <span className="hero-line mt-1 block overflow-hidden text-center">
            <span className="display block text-ink [font-size:13.5cqi] [line-height:0.9]">
              ENGINEER
            </span>
          </span>
        </h1>

        {/*
          Three words for the three things the work is made of. The dots are
          structural here, holding a row apart — not the "A · B · C" meta line
          that got deleted everywhere else on the site.
        */}
        <div className="label mt-5 flex items-center justify-center gap-4 text-ink-2 sm:gap-8">
          {TRIO.map((word, i) => (
            <span key={word} className="flex items-center gap-4 sm:gap-8">
              {i > 0 && (
                <span aria-hidden className="h-1 w-1 rounded-full bg-ink-3" />
              )}
              {word}
            </span>
          ))}
        </div>

        {/*
          The paragraph, the two buttons and the four statistics all used to
          sit here, under a headline that already fills the screen. They were
          competing with it. What is left is the type, where the reader is, and
          one way to act — the seal.
        */}
        <div className="mt-8 flex items-end justify-between gap-8 border-t border-line pt-5">
          <div className="flex flex-col gap-1">
            <span className="label">Улаанбаатар</span>
            <span className="label">Алсын зайд нээлттэй</span>
          </div>

          <Seal className="h-24 w-24 shrink-0 md:h-32 md:w-32" />
        </div>
      </motion.div>

      <div className="shell mt-6 flex items-center justify-between">
        <span className="label">Scroll</span>
        <a
          href={links.emailHref}
          className="label transition-colors hover:text-ink"
        >
          {links.email}
        </a>
      </div>
    </section>
  );
}
