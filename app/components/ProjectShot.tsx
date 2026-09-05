import Image from "next/image";
import type { Project } from "../data/projects";

/**
 * A client system behind a login has no screenshot to show, and inventing one
 * would misrepresent it. Rather than an empty card, a padlock or the words
 * "no demo", the frame carries an abstract of the interface — a rail and a few
 * rows, blurred, drawn only in the act's own ink — with the client's mark on
 * top. The mark is drawn through a CSS mask so it takes the page's ink colour
 * instead of the brand's own, and lifts to full ink on hover.
 */
function ClosedSystem({ project }: { project: Project }) {
  return (
    <div
      role="img"
      aria-label={`${project.title} — ${project.access ?? "closed system"}`}
      className="absolute inset-0 overflow-hidden bg-bg-3"
    >
      <div aria-hidden className="absolute inset-0 opacity-[0.13] blur-[8px]">
        <div className="absolute inset-y-6 left-6 w-[18%] rounded-sm bg-ink" />
        <div className="absolute left-[26%] right-6 top-8 h-6 rounded-sm bg-ink" />
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute left-[26%] h-4 rounded-sm bg-ink"
            style={{ top: `${28 + i * 15}%`, right: `${6 + i * 7}%` }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        {project.logo && (
          <span
            aria-hidden
            className="block h-[46%] w-[46%] bg-current text-ink-3 opacity-70 transition-all duration-500 group-hover:text-ink group-hover:opacity-100"
            style={{
              WebkitMaskImage: `url(${project.logo})`,
              maskImage: `url(${project.logo})`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function ProjectShot({
  project,
  sizes,
  eager = false,
}: {
  project: Project;
  sizes: string;
  eager?: boolean;
}) {
  if (!project.image && project.logo) return <ClosedSystem project={project} />;

  if (!project.image) {
    // A project can exist before its screenshot does. The marker is an
    // authoring signal, so it only shows while developing.
    const authoring = process.env.NODE_ENV !== "production";
    return (
      <div
        role="img"
        aria-label={`${project.title} — screenshot not available`}
        className="blueprint absolute inset-0 flex flex-col items-center justify-center gap-4 bg-bg-3 px-6 text-center"
      >
        <span className="display text-xl leading-tight md:text-2xl" aria-hidden>
          {project.title}
        </span>
        {authoring && (
          <span
            className="mono border border-dashed border-line px-2 py-1 text-[10px] text-ink-3"
            aria-hidden
          >
            [ADD SCREENSHOT]
          </span>
        )}
      </div>
    );
  }

  return (
    <Image
      src={project.image}
      alt={`${project.title} interface`}
      fill
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      className="object-cover object-top transition-transform duration-[900ms] group-hover:scale-[1.04]"
    />
  );
}
