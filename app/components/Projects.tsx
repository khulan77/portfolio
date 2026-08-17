"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Trophy } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import SectionHeading from "./SectionHeading";
import GithubIcon from "./GithubIcon";
import { useSpotlight } from "./SpotlightCard";
import { links, projects, type Project } from "../data";

/** Long Mongolian write-ups need a disclosure instead of a wall of text. */
const LONG_DESCRIPTION = 320;

function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const { ref, onPointerMove } = useSpotlight<HTMLElement>();
  const [expanded, setExpanded] = useState(false);
  const isLong = project.description.length > LONG_DESCRIPTION;

  const host = useMemo(() => {
    try {
      return new URL(project.live).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  }, [project.live]);

  return (
    <motion.article
      ref={ref}
      onPointerMove={onPointerMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`spotlight group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-bg-soft shadow-[var(--shadow-sm)] transition-shadow duration-500 hover:shadow-[var(--shadow-lg)] ${
        featured ? "md:flex-row md:items-center" : ""
      }`}
    >
      {/* Screenshot, presented as a little browser window */}
      <div className={`relative p-3 ${featured ? "md:w-3/5 md:p-4" : ""}`}>
        <div className="overflow-hidden rounded-xl border border-border bg-bg shadow-[var(--shadow-sm)]">
          <div className="flex items-center gap-1.5 border-b border-border bg-surface px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-amber-400/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            <span className="mx-auto max-w-[65%] truncate rounded-md bg-bg-soft px-2 py-0.5 text-[10px] text-faint">
              {host}
            </span>
          </div>
          <div className="relative aspect-16/10 w-full overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.title} төслийн дэлгэцийн зураг`}
              fill
              sizes={
                featured
                  ? "(max-width: 768px) 100vw, 60vw"
                  : "(max-width: 768px) 100vw, 45vw"
              }
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </div>
        </div>

        {project.award && (
          <span className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/15 px-3 py-1 text-[11px] font-semibold text-amber-700 backdrop-blur-sm dark:text-amber-300">
            <Trophy className="h-3 w-3" /> {project.award}
          </span>
        )}
      </div>

      <div className={`flex flex-1 flex-col p-6 pt-3 md:p-7 ${featured ? "md:pt-7" : ""}`}>
        <div className="flex items-center gap-3 text-xs">
          <span className="font-display font-bold tabular-nums text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-6 bg-border" />
          <span className="font-display text-faint">{project.year}</span>
        </div>

        <h3 className="font-display mt-3 text-lg font-bold leading-snug transition-colors group-hover:text-accent md:text-xl">
          {project.title}
        </h3>

        <p
          className={`mt-3 text-sm leading-relaxed text-muted ${
            expanded ? "" : "line-clamp-4"
          }`}
        >
          {project.description}
        </p>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-2 self-start text-xs font-semibold text-accent transition-opacity hover:opacity-70"
          >
            {expanded ? "Хураах" : "Дэлгэрэнгүй унших"}
          </button>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, featured ? 99 : 6).map((t) => (
            <li
              key={t}
              className="rounded-md border border-border bg-accent-soft px-2 py-0.5 text-[11px] text-muted"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-5 border-t border-border pt-4 text-sm font-medium">
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-text transition-colors hover:text-accent"
          >
            Live үзэх
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            <span className="sr-only">— {project.title}</span>
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
          >
            <GithubIcon className="h-4 w-4" /> Code
            <span className="sr-only">— {project.title}</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

/** A column of cards that drifts vertically as the section scrolls — the
 *  gentle "flowing" motion, without hijacking the scroll. */
function ParallaxColumn({
  children,
  y,
}: {
  children: React.ReactNode;
  y: MotionValue<number>;
}) {
  return (
    <motion.div style={{ y }} className="flex flex-col gap-6 md:gap-8">
      {children}
    </motion.div>
  );
}

export default function Projects() {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });

  // opposing, subtle drifts give a flowing feel while staying readable
  const leftY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-32, 32]);

  const [featured, ...rest] = projects;
  const left = rest.filter((_, i) => i % 2 === 0);
  const right = rest.filter((_, i) => i % 2 === 1);

  return (
    <section
      ref={section}
      id="projects"
      className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32"
    >
      <SectionHeading
        index="03"
        kicker={`${projects.length} төсөл`}
        title="Хийж гүйцэтгэсэн төслүүд"
      />

      {/* Featured */}
      <div className="mb-6 md:mb-8">
        <ProjectCard project={featured} index={0} featured />
      </div>

      {/* Flowing two-column grid */}
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        <ParallaxColumn y={leftY}>
          {left.map((p) => (
            <ProjectCard key={p.title} project={p} index={projects.indexOf(p)} />
          ))}
        </ParallaxColumn>
        <ParallaxColumn y={rightY}>
          {right.map((p) => (
            <ProjectCard key={p.title} project={p} index={projects.indexOf(p)} />
          ))}
        </ParallaxColumn>
      </div>

      <div className="mt-14 flex justify-center">
        <a
          href={links.github}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost"
        >
          <GithubIcon className="h-4 w-4" /> Бүх repo-г GitHub дээр үзэх
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
