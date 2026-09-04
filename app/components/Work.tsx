"use client";

import Link from "next/link";
import { ArrowUpRight, Trophy } from "lucide-react";
import SectionHead from "./SectionHead";
import BrowserFrame from "./BrowserFrame";
import ProjectShot from "./ProjectShot";
import WorkTrack from "./WorkTrack";
import { useSpotlight } from "../lib/use-spotlight";
import { featuredProject, projects, type Project } from "../data/projects";

function TeamBadge({ team }: { team: Project["team"] }) {
  return (
    <span className="label" title="Honest labelling of who built it">
      {team === "team" ? "Team project" : "Built solo"}
    </span>
  );
}

function FeaturedCase({ project }: { project: Project }) {
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className="spotlight group border border-line bg-bg-2"
    >
      <div className="grid md:grid-cols-2">
        <div className="p-4 md:p-6">
          <BrowserFrame url={project.liveUrl}>
            <ProjectShot
              project={project}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </BrowserFrame>
        </div>

        <div className="flex flex-col justify-center gap-6 border-t border-line p-6 md:border-l md:border-t-0 md:p-10">
          <div className="label flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-signal">Featured case study</span>
            <span className="opacity-40">/</span>
            <span>{project.year}</span>
            <span className="opacity-40">/</span>
            <TeamBadge team={project.team} />
          </div>

          <div>
            <h3 className="display text-3xl md:text-4xl">{project.title}</h3>
            <p className="mono mt-3 text-xs text-ink-2">{project.tagline}</p>
          </div>

          {project.award && (
            <span className="inline-flex w-fit items-center gap-2 border border-[color:var(--signal-line)] px-3 py-1.5">
              <Trophy className="h-3 w-3 text-signal" />
              <span className="label text-signal">{project.award}</span>
            </span>
          )}

          <dl className="space-y-4 border-t border-line pt-5">
            <div>
              <dt className="label">Problem</dt>
              <dd className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-ink-2">
                {project.problem}
              </dd>
            </div>
            <div>
              <dt className="label">Outcome</dt>
              <dd className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-2">
                {project.outcome.startsWith("[ADD")
                  ? "Хэмжигдэхүйц үр дүн бүртгэгдээгүй."
                  : project.outcome}
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-5">
            <Link
              href={`/work/${project.slug}`}
              className="label group/link inline-flex items-center gap-1.5 text-ink"
            >
              Read case study
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
            </Link>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="label transition-colors hover:text-ink"
            >
              Live
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="label transition-colors hover:text-ink"
            >
              Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Work({ index }: { index: string }) {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <SectionHead
          index={index}
          name="Selected work"
          title="Асуудлаас эхэлж, ажиллаж байгаа системээр төгссөн төслүүд."
          meta={`${projects.length} projects`}
        />

        <div className="mt-14">
          <FeaturedCase project={featuredProject} />
        </div>
      </div>

      {/* the run */}
      <WorkTrack />
    </section>
  );
}
