"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Scene3D from "./Scene3D";
import Magnetic from "./Magnetic";
import { brand, links } from "../data/profile";
import { metrics } from "../data/projects";

const FACTS = [
  { k: "Shipped", v: `${metrics.shipped} projects` },
  { k: "AI in production", v: `${metrics.withAi} of them` },
  { k: "Stack", v: "Next.js · TS · Postgres" },
  { k: "Working", v: "EN / MN" },
];

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
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-status", { opacity: 0, y: 14, duration: 0.7 })
        .from(
          ".hero-line > span",
          { yPercent: 115, duration: 1.1, stagger: 0.1 },
          "-=0.35",
        )
        .from(".hero-lead", { opacity: 0, y: 20, duration: 0.8 }, "-=0.65")
        .from(
          ".hero-cta > *",
          { opacity: 0, y: 16, duration: 0.6, stagger: 0.09 },
          "-=0.5",
        )
        .from(
          ".hero-fact",
          { opacity: 0, y: 14, duration: 0.6, stagger: 0.07 },
          "-=0.4",
        );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-8 pt-32 md:px-10"
    >
      <Scene3D />
      <div
        className="blueprint fade-mask-y pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      />

      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-[88rem]">
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
          <span className="display hero-type block">
            <span className="hero-line block overflow-hidden">
              <span className="block">SOFTWARE</span>
            </span>
            <span className="hero-line block overflow-hidden">
              <span className="block">
                ENGINEER<span className="text-signal">.</span>
              </span>
            </span>
          </span>
          <span className="hero-line mt-6 block overflow-hidden">
            <span className="mono block text-sm tracking-[0.14em] text-ink-2 uppercase md:text-base">
              Full-Stack <span className="text-signal">×</span> AI Product Builder{" "}
              <span className="text-signal">×</span> Creative Developer
            </span>
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

      <div className="mx-auto mt-10 flex w-full max-w-[88rem] items-center justify-between">
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
