"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Mail, Phone, ArrowDown, Sparkles } from "lucide-react";
import Scene3D from "./Scene3D";
import Magnetic from "./Magnetic";
import Counter from "./Counter";
import { links, stats } from "../data";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-badge", { opacity: 0, y: 20, duration: 0.8 })
        .from(
          ".hero-eyebrow p",
          { yPercent: 120, opacity: 0, duration: 0.8 },
          "-=0.4"
        )
        .from(
          ".hero-line span",
          { yPercent: 120, opacity: 0, duration: 1, stagger: 0.12 },
          "-=0.5"
        )
        .from(".hero-sub", { opacity: 0, y: 24, duration: 0.9 }, "-=0.5")
        .from(
          ".hero-cta > *",
          { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 },
          "-=0.5"
        )
        .from(
          ".hero-stat",
          { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 },
          "-=0.4"
        )
        .from(".hero-scroll", { opacity: 0, duration: 0.8 }, "-=0.3");
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-28 text-center md:px-8"
    >
      <Scene3D />

      {/* Availability badge */}
      <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-cyan backdrop-blur-sm">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
        </span>
        Шинэ төсөл, хамтын ажиллагаанд нээлттэй
      </div>

      {/* Name — kept modest, as an eyebrow */}
      <div className="hero-eyebrow mt-8 overflow-hidden">
        <p className="font-display text-sm uppercase tracking-[0.35em] text-muted md:text-base">
          Намайг{" "}
          <span className="text-text">Хулан</span> гэдэг
        </p>
      </div>

      {/* Headline — the role is the focal point */}
      <h1 className="fluid-hero font-display mt-4 font-bold">
        <span className="hero-line block overflow-hidden">
          <span className="block text-text/90">Full-Stack</span>
        </span>
        <span className="hero-line block overflow-hidden">
          <span className="block text-shine">Engineer</span>
        </span>
      </h1>

      <p className="hero-sub mx-auto mt-8 max-w-2xl text-balance text-base leading-relaxed text-muted md:text-lg">
        <span className="text-text">Pinecone Academy</span>-ийг Software Engineer
        мэргэжлээр төгссөн. Санааг гаргахаас эхлээд өгөгдлийн сан, бүх кодлол,
        deploy хүртэлх{" "}
        <span className="text-accent-gradient font-semibold">Full-Stack</span>{" "}
        бүтцийг бүрэн бие даан бүтээдэг.
      </p>

      {/* Contact + CTA */}
      <div className="hero-cta mt-9 flex flex-col items-center gap-4 sm:flex-row">
        <Magnetic>
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet to-cyan px-7 py-3.5 text-sm font-semibold text-[#05060a] shadow-[0_8px_40px_-8px_rgba(139,116,255,0.6)] transition-shadow hover:shadow-[0_8px_50px_-4px_rgba(52,224,232,0.55)]"
          >
            Миний бүтээлүүд
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </Magnetic>
        <Magnetic strength={0.3}>
          <a
            href={links.primaryEmail}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-7 py-3.5 text-sm font-semibold text-text transition-all hover:border-white/25 hover:bg-white/10"
          >
            <Mail className="h-4 w-4" /> Холбоо барих
          </a>
        </Magnetic>
      </div>

      <div className="hero-cta mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
        <a
          href={links.primaryEmail}
          className="flex items-center gap-1.5 transition-colors hover:text-cyan"
        >
          <Mail className="h-3.5 w-3.5 text-cyan" /> {links.displayEmail1}
        </a>
        <a
          href={links.phone}
          className="flex items-center gap-1.5 transition-colors hover:text-cyan"
        >
          <Phone className="h-3.5 w-3.5 text-cyan" /> {links.phoneDisplay}
        </a>
      </div>

      {/* Stats */}
      <div className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="hero-stat glass rounded-2xl px-3 py-5"
          >
            <div className="font-display text-3xl font-bold text-accent-gradient md:text-4xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-[11px] leading-tight text-muted md:text-xs">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-faint">
        <Sparkles className="h-3.5 w-3.5" />
        <div className="h-9 w-5 rounded-full border border-border p-1">
          <div className="h-1.5 w-full animate-bounce rounded-full bg-cyan" />
        </div>
      </div>
    </section>
  );
}
