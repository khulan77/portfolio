import { Layers, Database, Terminal, Palette } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { skills } from "../data";

const ICONS: Record<string, React.ReactNode> = {
  frontend: <Layers className="h-5 w-5" />,
  backend: <Database className="h-5 w-5" />,
  devops: <Terminal className="h-5 w-5" />,
  design: <Palette className="h-5 w-5" />,
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <SectionHeading
        index="01"
        kicker="Toolkit"
        title="Технологийн ур чадвар"
      />

      <Reveal className="grid gap-4 sm:grid-cols-2" stagger>
        {skills.map((group) => (
          <div
            key={group.id}
            className="card-glow glass group rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1 md:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white/5 text-cyan transition-colors group-hover:text-violet">
                {ICONS[group.id]}
              </span>
              <h3 className="font-display text-lg font-semibold md:text-xl">
                {group.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-border bg-white/[0.03] px-2.5 py-1 text-xs text-muted transition-colors hover:border-cyan/40 hover:text-text"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
