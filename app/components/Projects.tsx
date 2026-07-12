"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import SectionHeading from "./SectionHeading";
import GithubIcon from "./GithubIcon";
import { projects, type Project } from "../data";

function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`card-glow group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-bg-soft ${
        featured ? "md:flex-row" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "md:w-3/5" : ""}`}>
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes={
              featured
                ? "(max-width: 768px) 100vw, 60vw"
                : "(max-width: 768px) 100vw, 45vw"
            }
            className="object-cover object-top opacity-90 transition-all duration-700 group-hover:scale-[1.05] group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-soft via-transparent to-transparent" />
          <span className="absolute left-4 top-3 font-display text-5xl font-bold text-white/10">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute right-4 top-4 rounded-full border border-border bg-black/40 px-2.5 py-1 font-display text-[11px] text-cyan backdrop-blur-sm">
            {project.year}
          </span>
          {project.award && (
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur-sm">
              🏆 {project.award}
            </span>
          )}
        </div>
      </div>

      <div
        className={`flex flex-1 flex-col p-6 md:p-7 ${
          featured ? "md:justify-center" : ""
        }`}
      >
        <h3 className="font-display text-lg font-bold leading-snug transition-colors group-hover:text-cyan md:text-xl">
          {project.title}
        </h3>
        <p
          className={`mt-3 text-sm leading-relaxed text-muted ${
            featured ? "" : "line-clamp-4"
          }`}
        >
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, featured ? 99 : 6).map((t) => (
            <span
              key={t}
              className="rounded-md border border-violet/15 bg-violet/5 px-2 py-0.5 text-[11px] text-violet/90"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-5 border-t border-border pt-4 text-sm font-medium">
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-text transition-colors hover:text-cyan"
          >
            Live <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
          >
            <GithubIcon className="h-4 w-4" /> Code
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
  const leftY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

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
        index="02"
        kicker={`${projects.length} Projects`}
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
    </section>
  );
}
