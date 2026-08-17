import { Layers, Database, Terminal, Palette } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
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
      <SectionHeading index="02" kicker="Toolkit" title="Технологийн ур чадвар" />

      <Reveal className="grid gap-4 sm:grid-cols-2" stagger>
        {skills.map((group) => (
          <SpotlightCard
            key={group.id}
            className="group rounded-3xl border border-border bg-bg-soft p-6 shadow-[var(--shadow-sm)] transition-transform duration-300 hover:-translate-y-1 md:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface text-accent transition-colors group-hover:text-accent-2">
                {ICONS[group.id]}
              </span>
              <h3 className="font-display text-lg font-semibold md:text-xl">
                {group.title}
              </h3>
              <span className="font-display ml-auto text-xs text-faint tabular-nums">
                {String(group.items.length).padStart(2, "0")}
              </span>
            </div>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-text"
                >
                  {item}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        ))}
      </Reveal>
    </section>
  );
}
