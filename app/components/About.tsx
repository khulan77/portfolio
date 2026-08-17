import { Code2, GraduationCap, Trophy } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import { highlights, profile, timeline } from "../data";

const TIMELINE_ICONS = {
  trophy: Trophy,
  school: GraduationCap,
  code: Code2,
} as const;

export default function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32"
    >
      <SectionHeading index="01" kicker="About" title="Намайг товчхон" />

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {/* Left — the pitch */}
        <div>
          <Reveal>
            <p className="text-balance text-xl font-medium leading-relaxed md:text-2xl">
              {profile.tagline}
            </p>
          </Reveal>

          <Reveal className="mt-8 flex flex-col gap-6" stagger>
            {highlights.map((item, i) => (
              <div key={item.id} className="flex gap-4">
                <span className="font-display mt-0.5 text-sm font-bold text-accent tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Right — the track record */}
        <Reveal className="flex flex-col gap-3" stagger>
          {timeline.map((item) => {
            const Icon = TIMELINE_ICONS[item.icon];
            return (
              <SpotlightCard
                key={item.title}
                className="group flex gap-4 rounded-2xl border border-border bg-bg-soft p-5 md:p-6"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-accent transition-colors group-hover:text-accent-2">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <span className="font-display text-xs font-semibold tracking-wide text-faint">
                    {item.year}
                  </span>
                  <h3 className="font-display mt-0.5 text-base font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.detail}
                  </p>
                </div>
              </SpotlightCard>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
