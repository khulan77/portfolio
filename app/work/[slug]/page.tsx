import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Trophy } from "lucide-react";
import BrowserFrame from "../../components/BrowserFrame";
import ProjectShot from "../../components/ProjectShot";
import Mark from "../../components/Mark";
import Reveal from "../../components/Reveal";
import { CATEGORY_LABELS, getProject, projects } from "../../data/projects";
import { brand } from "../../data/profile";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${brand.positioning}`,
      description: project.tagline,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

/** A missing outcome must read as missing, never as a claim. */
function Field({ label, value }: { label: string; value: string }) {
  const isPlaceholder = value.startsWith("[ADD");
  return (
    <div className="grid gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-8">
      <h2 className="label md:col-span-3">{label}</h2>
      <p
        className={`text-base leading-relaxed md:col-span-9 ${
          isPlaceholder
            ? "mono border border-dashed border-line px-3 py-2 text-xs text-ink-3"
            : "text-ink-2"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-xl">
        <div className="shell flex items-center justify-between py-4">
          <Link href="/" className="group flex items-center gap-3" aria-label="Home">
            <Mark className="h-7 w-7 text-ink" />
            <span className="label hidden text-ink-2 sm:block">Full-Stack × AI</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/#work" className="label inline-flex items-center gap-2 hover:text-ink">
              <ArrowLeft className="h-3.5 w-3.5" /> All work
            </Link>
          </div>
        </div>
      </header>

      <main id="main" className="shell pt-32 md:pt-40">
        <article>
          {/* Named columns rather than facts strung on interpuncts. The
              project's position in the list was decoration and is gone. */}
          <dl className="grid grid-cols-2 gap-x-5 gap-y-6 border-t border-line pt-6 sm:grid-cols-3">
            <div>
              <dt className="label">Year</dt>
              <dd className="mono mt-1.5 text-sm text-ink">{project.year}</dd>
            </div>
            <div>
              <dt className="label">Built</dt>
              <dd className="mt-1.5 text-sm text-ink">
                {project.team === "team" ? "With a team" : "Solo"}
              </dd>
            </div>
            <div>
              <dt className="label">Focus</dt>
              <dd className="mt-1.5 text-sm text-ink">
                {project.categories.map((c) => CATEGORY_LABELS[c]).join(", ")}
              </dd>
            </div>
          </dl>

          <h1 className="display mt-8 text-5xl md:text-8xl">{project.title}</h1>
          <p className="mono mt-6 max-w-2xl text-sm text-ink-2">{project.tagline}</p>

          {project.award && (
            <span className="mt-8 inline-flex items-center gap-2 border border-[color:var(--signal-line)] px-3 py-1.5">
              <Trophy className="h-3 w-3 text-signal" />
              <span className="label text-signal">{project.award}</span>
            </span>
          )}

          <div className="mt-12 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-signal group"
              >
                Live demo
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-line"
              >
                Source
              </a>
            )}
            {project.access && (
              <span className="border border-line px-4 py-3 text-sm text-ink-2">
                {project.access}
              </span>
            )}
          </div>

          <Reveal className="mt-16">
            <BrowserFrame url={project.liveUrl} label={project.access} compact>
              <ProjectShot project={project} sizes="100vw" eager />
            </BrowserFrame>
          </Reveal>

          <div className="mt-20 border-t border-line">
            <Field label="Problem" value={project.problem} />
            <Field label="Idea" value={project.idea} />
            <Field label="Solution" value={project.solution} />
            <Field label="My role" value={project.role} />
            <Field label="Technical challenge" value={project.challenge} />
            <Field label="How I solved it" value={project.approach} />
            <Field label="Outcome" value={project.outcome} />

            <div className="grid gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-8">
              <h2 className="label md:col-span-3">Technology</h2>
              <ul className="flex flex-wrap gap-2 md:col-span-9">
                {project.technologies.map((tech) => (
                  <li key={tech} className="label border border-line px-2.5 py-1">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            href={`/work/${next.slug}`}
            className="group mt-20 flex flex-col gap-4 border-t border-line py-12 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <span className="label">Next project</span>
              <span className="display mt-3 block text-3xl transition-transform duration-500 group-hover:translate-x-2 md:text-6xl">
                {next.title}
              </span>
            </div>
            <ArrowUpRight className="h-8 w-8 text-ink-3 transition-colors group-hover:text-signal" />
          </Link>
        </article>
      </main>
    </>
  );
}
