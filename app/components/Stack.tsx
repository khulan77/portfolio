import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import TechMark from "./TechMark";
import { projects } from "../data/projects";
import {
  exploringTech,
  foundationTech,
  projectsUsing,
  shippedCount,
  stack,
} from "../data/stack";

/**
 * Three tiers, because one flat list was making a claim it could not support.
 *
 *   shipped     — in a recorded project, carrying a counted superscript
 *   foundation  — implied by the shipped list, so counted separately would lie
 *   exploring   — named in the toolkit, not yet in any project. Said plainly.
 *
 * Deliberately a server component: the section is hover-only CSS, so it costs
 * the visitor no JavaScript at all.
 */
export default function Stack() {
  const groups = stack
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => projectsUsing(item) > 0),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section
      id="stack"
      className="mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-32"
    >
      <SectionHead
        name="Stack"
        title="Ажилдаа хэрэглэдэг технологиуд."
        lead={`Дээд индекс нь тухайн технологийг ${projects.length} төслийн хэдэн дээр нь production-д ашигласныг заана — тоолсон, зарлаагүй.`}
        meta={`${shippedCount} production-д`}
      />

      <Reveal className="mt-14 flex flex-col gap-12 md:gap-14" stagger>
        {groups.map((group) => (
          <div key={group.id}>
            <div className="flex items-baseline gap-4 border-b border-line pb-3">
              <h3 className="label text-ink">{group.title}</h3>
              <span className="label ml-auto">{group.items.length}</span>
            </div>

            <ul className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-5">
              {group.items.map((item) => {
                const used = projectsUsing(item);
                return (
                  <li
                    key={item}
                    title={`${item} — ${used} of ${projects.length} projects`}
                    className="group/tech inline-flex items-center gap-2.5 text-ink transition-colors duration-300 hover:text-signal"
                  >
                    <span className="transition-transform duration-300 group-hover/tech:-translate-y-0.5">
                      <TechMark name={item} />
                    </span>
                    <span className="display text-lg leading-none md:text-xl">
                      {item}
                    </span>
                    <span className="mono -translate-y-2 text-[10px] text-signal">
                      {used}
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="mt-5 max-w-lg text-[0.8125rem] leading-relaxed text-ink-3">
              {group.note}
            </p>
          </div>
        ))}
      </Reveal>

      {/* The two tiers that carry no count, kept quiet and kept honest. */}
      <Reveal className="mt-16 flex flex-col gap-3 border-t border-line pt-8">
        <p className="text-[0.8125rem] leading-relaxed text-ink-3">
          <span className="text-ink-2">Суурь</span>
          {` — ${foundationTech.map((tech) => tech.name).join(", ")}. `}
          Дээрх бүх төсөл эдгээр дээр тогтдог тул тусад нь тоолоогүй.
        </p>
        <p className="text-[0.8125rem] leading-relaxed text-ink-3">
          <span className="text-ink-2">Судалж байгаа</span>
          {` — ${exploringTech.map((tech) => tech.name).join(", ")}. `}
          Хараахан production-д гараагүй.
        </p>
      </Reveal>
    </section>
  );
}
