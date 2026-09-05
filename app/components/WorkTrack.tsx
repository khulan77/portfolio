"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import BrowserFrame from "./BrowserFrame";
import ProjectShot from "./ProjectShot";
import { useSpotlight } from "../lib/use-spotlight";
import { useMediaQuery } from "../lib/media";
import { homeProjects, type Project } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

function TrackCard({ project, index }: { project: Project; index: number }) {
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className="track-card spotlight w-[82vw] shrink-0 snap-center sm:w-[58vw] lg:w-[40vw] xl:w-[34vw]"
    >
      <Link
        href={`/work/${project.slug}`}
        className="group flex h-full flex-col border border-line bg-bg-2"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <span className="display text-2xl leading-none">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="label">
            {project.team === "team" ? "Team" : "Solo"} · {project.year}
          </span>
        </div>

        <div className="p-4">
          <BrowserFrame url={project.liveUrl} compact>
            <ProjectShot
              project={project}
              sizes="(max-width: 640px) 82vw, (max-width: 1024px) 58vw, 34vw"
            />
          </BrowserFrame>
        </div>

        <div className="flex flex-1 flex-col px-5 pb-5">
          <h3 className="display text-2xl leading-tight md:text-3xl">
            {project.title}
          </h3>
          <p className="mono mt-3 text-[11px] leading-relaxed text-ink-2">
            {project.tagline}
          </p>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((tech) => (
              <li key={tech} className="label border border-line px-2 py-0.5">
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
            <span className="label transition-colors group-hover:text-signal">
              Read case study
            </span>
            <ArrowUpRight className="h-4 w-4 text-ink-3 transition-all group-hover:translate-x-0.5 group-hover:text-signal" />
          </div>
        </div>
      </Link>
    </div>
  );
}

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
      if (!pinned || !el || !barEl) return;

      const cards = gsap.utils.toArray<HTMLElement>(".track-card", el);
      const skewTo = gsap.quickTo(cards, "skewX", {
        duration: 0.5,
        ease: "power3",
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
            {homeProjects.length} projects · scroll to run
          </span>
        </div>

        {homeProjects.map((project, i) => (
          <TrackCard key={project.slug} project={project} index={i} />
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
