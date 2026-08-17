"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import Scene3D from "./Scene3D";
import Magnetic from "./Magnetic";
import Counter from "./Counter";
import { links, profile, stats } from "../data";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  // The hero drifts up and dissolves as the reader scrolls past it, so the
  // 3D scene behind is what hands over to the next section.
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-badge", { opacity: 0, y: 20, duration: 0.8 })
        .from(".hero-name", { opacity: 0, y: 16, duration: 0.7 }, "-=0.45")
        .from(
          ".hero-line span",
          { yPercent: 120, opacity: 0, duration: 1, stagger: 0.12 },
          "-=0.4",
        )
        .from(".hero-sub", { opacity: 0, y: 24, duration: 0.9 }, "-=0.5")
        .from(
          ".hero-cta > *",
          { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 },
          "-=0.5",
        )
        .from(
          ".hero-stat",
          { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 },
          "-=0.4",
        )
        .from(".hero-scroll", { opacity: 0, duration: 0.8 }, "-=0.3");
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-32 text-center md:px-8"
    >
      <Scene3D />
      <div
        className="line-grid pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="flex w-full flex-col items-center"
      >
        {/* Availability */}
        <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium tracking-wide text-accent-2 backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-2" />
          </span>
          Шинэ төсөл, хамтын ажиллагаанд нээлттэй
        </div>

        {/* Name sits above the role so the page introduces a person first */}
        <p className="hero-name eyebrow mt-9 text-muted">{profile.name}</p>

        <h1 className="fluid-hero font-display mt-3 font-bold">
          <span className="hero-line block overflow-hidden">
            <span className="block">Full-Stack</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="block text-shine">Engineer</span>
          </span>
        </h1>

        <p className="hero-sub mx-auto mt-8 max-w-xl text-balance text-base leading-relaxed text-muted md:text-lg">
          <span className="font-medium text-text">{profile.school}</span>-ийг
          Software Engineer мэргэжлээр төгссөн. Санааг гаргахаас эхлээд
          өгөгдлийн сан, бүх кодлол, deploy хүртэлх{" "}
          <span className="text-accent-gradient font-semibold">Full-Stack</span>{" "}
          бүтцийг бүрэн бие даан бүтээдэг.
        </p>

        <div className="hero-cta mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Magnetic>
            <a href="#projects" className="btn btn-primary group">
              Миний бүтээлүүд
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a href={links.primaryEmail} className="btn btn-ghost">
              <Mail className="h-4 w-4" /> Холбоо барих
            </a>
          </Magnetic>
        </div>

        {/* Stats */}
        <dl className="mt-16 grid w-full max-w-2xl grid-cols-3 divide-x divide-border overflow-hidden rounded-2xl border border-border bg-surface backdrop-blur-sm">
          {stats.map((s) => (
            <div key={s.label} className="hero-stat px-3 py-5">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="font-display text-3xl font-bold text-accent-gradient md:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
                <span className="mt-1.5 block text-[11px] leading-tight text-muted md:text-xs">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>

      {/* Scroll cue */}
      <div
        className="hero-scroll pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-faint"
        aria-hidden
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Доош</span>
        <div className="h-9 w-5 rounded-full border border-border p-1">
          <div className="h-1.5 w-full animate-bounce rounded-full bg-accent" />
        </div>
      </div>
    </section>
  );
}
