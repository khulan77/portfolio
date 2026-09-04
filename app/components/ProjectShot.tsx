import Image from "next/image";
import type { Project } from "../data/projects";

/**
 * A project can exist before its screenshot does. Rather than shipping a
 * broken image, a missing shot renders as an obvious, deliberate placeholder
 * that disappears the moment the file is dropped into /public.
 */
export default function ProjectShot({
  project,
  sizes,
  eager = false,
}: {
  project: Project;
  sizes: string;
  eager?: boolean;
}) {
  if (!project.image) {
    return (
      <div className="blueprint absolute inset-0 flex flex-col items-center justify-center gap-4 bg-bg-3 px-6 text-center">
        <span className="display text-xl leading-tight md:text-2xl">
          {project.title}
        </span>
        <span className="mono border border-dashed border-line px-2 py-1 text-[10px] text-ink-3">
          [ADD SCREENSHOT]
        </span>
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
