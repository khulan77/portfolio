"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { useMediaQuery } from "../lib/media";
import { E, T } from "../lib/motion";
import { homeProjects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

/**
 * The whole body of work, run past the viewport sideways while the section is
 * pinned. Scroll velocity leans the cards, so the speed of your own scrolling
 * is visible in the layout.
 *
 * Touch and reduced-motion visitors get the same cards as an ordinary
 * snap-scrolling row — the spectacle is never the only way to reach the work.
 */
export default function WorkTrack() {
  const wrapper = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  const coarse = useMediaQuery("(pointer: coarse)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const pinned = !coarse && !reduced;

  useGSAP(
    () => {
      const el = track.current;
      const barEl = bar.current;
      // `pinned` is false under prefers-reduced-motion and on coarse pointers,
      // so this whole block is the no-preference branch already.
      if (!pinned || !el || !barEl) return;

      const cards = gsap.utils.toArray<HTMLElement>(".track-card", el);
      const skewTo = gsap.quickTo(cards, "skewX", {
        duration: T.base,
        ease: E.out,
      });
      const distance = () => Math.max(el.scrollWidth - window.innerWidth + 80, 0);

      gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // lean into the direction of travel, then settle back to upright
            skewTo(gsap.utils.clamp(-10, 10, self.getVelocity() / -220));
            barEl.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
    },
    { scope: wrapper, dependencies: [pinned] },
  );

  return (
    <div ref={wrapper} className="relative overflow-hidden py-10">
      <div
        ref={track}
        className={`flex gap-4 px-5 md:gap-6 md:px-10 ${
          pinned ? "w-max" : "snap-x snap-mandatory overflow-x-auto pb-4"
        }`}
      >
        {/* an opening plate, so the run starts with a statement */}
        <div className="hidden w-[26vw] shrink-0 flex-col justify-end pb-6 lg:flex">
          <span className="display text-[5vw] leading-none">
            ALL
            <br />
            <span className="outline-type">WORK</span>
          </span>
          <span className="label mt-6">
            Scroll to run
          </span>
        </div>

        {homeProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 58vw, 34vw"
            className="track-card w-[82vw] shrink-0 snap-center sm:w-[58vw] lg:w-[40vw] xl:w-[34vw]"
          />
        ))}

        <div className="hidden w-[22vw] shrink-0 flex-col justify-center lg:flex">
          <Link href="#contact" className="group">
            <span className="display text-[3vw] leading-none">
              LET&apos;S
              <br />
              BUILD<span className="text-signal">.</span>
            </span>
            <span className="label mt-5 flex items-center gap-2 group-hover:text-signal">
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </div>

      {pinned && (
        <div className="mx-5 mt-8 h-px bg-line md:mx-10" aria-hidden>
          <div ref={bar} className="h-px origin-left scale-x-0 bg-signal" />
        </div>
      )}
    </div>
  );
}
