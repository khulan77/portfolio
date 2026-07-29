"use client";

import { Mail, Phone, ArrowUpRight } from "lucide-react";
import GithubIcon from "./GithubIcon";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Magnetic from "./Magnetic";
import { links } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".contact-big span", {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="contact"
      className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40"
    >
      <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-16 text-center md:px-12 md:py-24">
        {/* glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,116,255,0.35),transparent_65%)] blur-2xl" />

        <p className="relative text-xs font-medium uppercase tracking-[0.25em] text-cyan">
          Хамтдаа ажиллах уу?
        </p>

        <h2 className="contact-big font-display relative mt-6 text-4xl font-bold leading-[0.95] tracking-tight md:text-7xl">
          <span className="block overflow-hidden">
            <span className="block text-gradient">Санаагаа</span>
          </span>
          <span className="block overflow-hidden">
            <span className="block">бодит болгоцгооё.</span>
          </span>
        </h2>

        <p className="relative mx-auto mt-6 max-w-lg text-balance text-muted">
          Хамтран ажиллах байгууллага, сонирхолтой төсөл байвал холбогдоход
          хэзээд нээлттэй. ✨
        </p>

        <div className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Magnetic>
            <a
              href={links.primaryEmail}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet to-cyan px-8 py-4 text-sm font-semibold text-[#05060a] shadow-[0_8px_40px_-8px_rgba(139,116,255,0.6)]"
            >
              <Mail className="h-4 w-4" /> Имэйл бичих
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-8 py-4 text-sm font-semibold text-text transition-all hover:border-white/25 hover:bg-white/10"
            >
              <GithubIcon className="h-4 w-4" /> GitHub үзэх
            </a>
          </Magnetic>
        </div>

        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted">
          <a href={links.primaryEmail} className="flex items-center gap-2 hover:text-cyan">
            <Mail className="h-4 w-4 text-cyan" /> {links.displayEmail1}
          </a>
          <a href={links.phone} className="flex items-center gap-2 hover:text-cyan">
            <Phone className="h-4 w-4 text-cyan" /> {links.phoneDisplay}
          </a>
        </div>
      </div>

      {/* footer bar */}
      <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-faint sm:flex-row">
        <p>© {new Date().getFullYear()}  Full-Stack Engineer</p>
        <div className="flex items-center gap-5">
          <a href={links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-text">
            GitHub <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a href={links.primaryEmail} className="hover:text-text">
            Email
          </a>
          <a href="#top" className="hover:text-text">
            Дээш ↑
          </a>
        </div>
      </footer>
    </section>
  );
}
