"use client";

import Link from "next/link";
import { ArrowUpRight, Trophy } from "lucide-react";
import BrowserFrame from "./BrowserFrame";
import ProjectShot from "./ProjectShot";
import { useSpotlight } from "../lib/use-spotlight";
import type { Project } from "../data/projects";

/**
 * One project, as a card.
 *
 * It carries no width and no position of its own, so the same card can stand
 * in a column or in a row — it was written twice for those two layouts once,
 * and the copies had already begun to drift.
 */

/** The host alone; the scheme and path carry no meaning for a reader. */
function hostOf(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/*
 * The card opens the running site itself rather than a write-up about it. A
 * client system behind a login has nothing to open, so it renders as a plain
 * container — a dead link would be worse than no link.
 */
function CardShell({
  href,
  children,
}: {
  href: string | null;
  children: React.ReactNode;
}) {
  const className = "group flex h-full flex-col border border-line bg-bg-2";
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <div className={className}>{children}</div>
  );
}

export default function ProjectCard({
  project,
  sizes,
  className = "",
}: {
  project: Project;
  sizes: string;
  className?: string;
}) {
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={`spotlight ${className}`}
    >
      <CardShell href={project.liveUrl}>
        {/* The card's position in the run told the reader nothing, so the big
            number is gone. Year and team are separated by the layout rather
            than by an interpunct. */}
        <div className="flex items-baseline justify-between border-b border-line px-5 py-3">
          <span className="mono text-sm text-ink">{project.year}</span>
          <span className="label">
            {project.team === "team" ? "With a team" : "Solo"}
          </span>
        </div>

        <div className="p-4">
          <BrowserFrame url={project.liveUrl} label={project.access} compact>
            <ProjectShot project={project} sizes={sizes} />
          </BrowserFrame>
        </div>

        <div className="flex flex-1 flex-col px-5 pb-5">
          <h3 className="display text-2xl leading-tight md:text-3xl">
            {project.title}
          </h3>
          <p className="mono mt-3 text-[11px] leading-relaxed text-ink-2">
            {project.tagline}
          </p>

          {project.award && (
            <span className="mt-4 inline-flex w-fit items-center gap-2 border border-[color:var(--signal-line)] px-3 py-1.5">
              <Trophy className="h-3 w-3 text-signal" />
              <span className="label text-signal">{project.award}</span>
            </span>
          )}

          {/* Technology names are data, so they are set in mono — and left
              unboxed, because the box was drawing a border around a word. */}
          <ul className="mono mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-3">
            {project.technologies.slice(0, 5).map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>

          {project.liveUrl && (
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
              <span className="mono truncate text-xs text-ink-3 transition-colors group-hover:text-signal">
                {hostOf(project.liveUrl)}
              </span>
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 shrink-0 text-ink-3 transition-all group-hover:translate-x-0.5 group-hover:text-signal"
              />
            </div>
          )}
        </div>
      </CardShell>

      {/*
        Outside the card's own anchor — a link cannot be nested inside another
        link, and the write-up is a different destination from the live site.
      */}
      <Link
        href={`/work/${project.slug}`}
        className="label mt-3 inline-block transition-colors hover:text-ink"
      >
        Дэлгэрэнгүй
      </Link>
    </div>
  );
}
