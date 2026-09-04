"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "./Magnetic";
import Mark from "./Mark";
import { activeSocials, brand, links } from "../data/profile";

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ index }: { index: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".contact-line > span", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.09,
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="contact"
      className="relative mx-auto max-w-[88rem] px-5 pt-24 md:px-10 md:pt-32"
    >
      <div className="label flex items-center justify-between border-t border-line pt-6">
        <span>
          <span className="text-signal">{index}</span>
          <span className="mx-2 opacity-40">/</span>Contact
        </span>
        <span className="hidden sm:block">Open for new work</span>
      </div>

      <h2 className="display hero-type mt-12">
        <span className="contact-line block overflow-hidden">
          <span className="block">LET&apos;S BUILD</span>
        </span>
        <span className="contact-line block overflow-hidden">
          <span className="block">
            SOMETHING<span className="text-signal">.</span>
          </span>
        </span>
      </h2>

      <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-12">
        <p className="text-base leading-relaxed text-ink-2 md:col-span-5">
          Санаа, асуудал, эсвэл хагас дуусаад зогсчихсон төсөл байна уу —
          бичээрэй. Юу барих ёстойг хамтдаа тодорхойлж, би барьж өгнө.
        </p>

        <div className="flex flex-wrap items-start gap-3 md:col-span-4">
          <Magnetic>
            <a href={links.emailHref} className="btn btn-signal group">
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a href={links.phoneHref} className="btn btn-line">
              {links.phone}
            </a>
          </Magnetic>
        </div>

        <dl className="space-y-4 md:col-span-3">
          <div>
            <dt className="label">Email</dt>
            <dd className="mono mt-1 text-xs">
              <a href={links.emailHref} className="transition-colors hover:text-signal">
                {links.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="label">Elsewhere</dt>
            <dd className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
              {activeSocials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="mono text-xs transition-colors hover:text-signal"
                >
                  {social.label}
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      <footer className="mt-24 flex flex-col gap-6 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
        <a href="#top" className="group flex items-center gap-3">
          <Mark className="h-6 w-6 text-ink" />
          <span className="label text-ink-2">{brand.role}</span>
        </a>
        <div className="label flex items-center gap-6">
          <span>© {new Date().getFullYear()}</span>
          <a href="#top" className="transition-colors hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </footer>
    </section>
  );
}
