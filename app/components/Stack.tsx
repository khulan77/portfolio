import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import TechMark from "./TechMark";
import { projects } from "../data/projects";
import { projectsUsing, stack, stackTotal } from "../data/stack";

/**
 * The whole toolkit, grouped, with nothing held back.
 *
 * A superscript appears only where a technology is recorded in a shipped
 * project, so the count adds evidence without turning its absence into a
 * verdict — plenty of these are known and simply have not been written down
 * against a project yet.
 *
 * Deliberately a server component: the section is hover-only CSS, so it costs
 * the visitor no JavaScript at all.
 */
export default function Stack() {
  return (
    <section id="stack" className="shell section-y">
      {/*
        The short side holds still while the long side runs past it. Below
        1024px there is not enough width for two columns to be worth it, so
        the heading simply sits above the list as normal flow.
      */}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHead
              name="Stack"
              title="Ажилдаа хэрэглэдэг технологиуд."
              lead={`Дээд индекс нь тухайн технологийг ${projects.length} төслийн хэдэн дээр нь production-д ашигласныг заана — тоолсон, зарлаагүй.`}
              meta={`${stackTotal} технологи`}
            />
          </div>
        </div>

        <Reveal
          className="flex flex-col gap-12 md:gap-14 lg:col-span-7 lg:col-start-6"
          stagger
        >
        {stack.map((group) => (
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
                    title={
                      used > 0
                        ? `${item} — ${used} of ${projects.length} projects`
                        : undefined
                    }
                    className="group/tech inline-flex items-center gap-2.5 text-ink transition-colors duration-300 hover:text-signal"
                  >
                    <span className="transition-transform duration-300 group-hover/tech:-translate-y-0.5">
                      <TechMark name={item} />
                    </span>
                    <span className="display text-lg leading-none md:text-xl">
                      {item}
                    </span>
                    {/*
                      The count carries the information. In the accent it put
                      thirteen orange marks on a single screen, which is noise
                      rather than emphasis — the accent stays reserved for the
                      CTA, the status dot, hover rules and active nav.
                    */}
                    {used > 0 && (
                      <span className="mono -translate-y-2 text-[10px] text-ink-2">
                        {used}
                      </span>
                    )}
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
      </div>
    </section>
  );
}
