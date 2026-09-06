"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { E, T, armReveal, clearReveal } from "../lib/motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Scene3D from "./Scene3D";
import Magnetic from "./Magnetic";
import { brand, links } from "../data/profile";
import { metrics } from "../data/projects";

/**
 * Two, not four. "Stack" and "Working" were repeated in full further down the
 * page — the Stack section lists all 37, About states the working languages —
 * so in the hero they were filling a corner rather than telling anyone
 * anything. Both numbers are counted from the data, never typed.
 */
const FACTS = [
  { k: "Shipped", v: `${metrics.shipped} projects` },
  { k: "AI in production", v: `${metrics.withAi} of them` },
];

/**
 * The headline is set as SVG so both lines can be locked to the same measure.
 * In HTML they were sized from each line's own natural width, which left them
 * ragged on the right; textLength pins each line to the viewBox instead, so
 * the two words form one hard rectangle.
 *
 * Numbers come from the font: Alumni Sans has a cap height of 0.591em, and the
 * viewBox is the natural width of the wider line at font-size 1000.
 */
const HEAD = {
  /*
   * Halfway between the two natural widths — SOFTWARE 3241, ENGINEER 2810.
   * Pinning both to the wider one stretched ENGINEER by 15% and it came out
   * visibly heavier than the line above it; splitting the difference squeezes
   * one by 6.6% and opens the other by 7.7%, so the two lines carry the same
   * apparent weight and read as a single block.
   */
  width: 3026,
  cap: 591,
  /** 0.84em of leading — the two lines read as one block, not two words. */
  lead: 840,
} as const;

/**
 * Two readings of the line under the headline. The giant type already says
 * "software engineer", so repeating the discipline underneath is close to
 * saying it twice; the alternative spends the line on the one fact nothing
 * else on the page carries.
 */
const SUBLINE = {
  positioning: brand.positioning,
  proof: `Нэг нь захиалагчийн production дээр ажиллаж байна.`,
} as const;

const HERO_SUBLINE = SUBLINE.positioning;

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
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-8 pt-32"
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
        <h1 className="mt-8">
          <span className="hero-line block overflow-hidden">
            <svg
              viewBox={`0 0 ${HEAD.width} ${HEAD.cap + HEAD.lead}`}
              className="block w-full fill-current text-ink"
              role="img"
              aria-label="Software Engineer"
            >
              {[
                { word: "SOFTWARE", y: HEAD.cap },
                { word: "ENGINEER", y: HEAD.cap + HEAD.lead },
              ].map(({ word, y: baseline }) => (
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
            </svg>
          </span>

          <span className="mt-6 block text-base text-ink-2 md:text-lg">
            {HERO_SUBLINE}
          </span>
        </h1>

        <div className="mt-12 grid gap-10 border-t border-line pt-8 md:grid-cols-12">
          <div className="hero-lead md:col-span-5">
            <p className="display text-xl leading-tight md:text-2xl">
              From idea to system<span className="text-signal">.</span>
            </p>
            <p className="mt-4 text-balance text-[0.9375rem] leading-relaxed text-ink-2">
              {brand.statementMn} Судалгаанаас эхлээд интерфейс, API, өгөгдлийн
              сан, AI давхарга, эцэст нь production хүртэлх бүх шатыг би өөрөө
              хөтөлнө.
            </p>
          </div>

          <div className="hero-cta flex flex-wrap items-start gap-3 md:col-span-4">
            <Magnetic>
              <a href="#work" className="btn btn-signal group">
                View my work
                <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a href="#contact" className="btn btn-line group">
                Let&apos;s build something
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
          </div>

          {/* machine-readable facts — every number is counted, never claimed */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 md:col-span-3">
            {FACTS.map((fact) => (
              <div key={fact.k} className="hero-fact">
                <dt className="label">{fact.k}</dt>
                <dd className="mono mt-1 text-xs text-ink">{fact.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>

      <div className="shell mt-10 flex items-center justify-between">
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
