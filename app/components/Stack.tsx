import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import TechMark from "./TechMark";
import { projects } from "../data/projects";
import { projectsUsing, stack, stackTotal } from "../data/stack";

/**
 * A logo wall only works if it is disciplined: one ink colour, one tile size,
 * one hairline grid. The signal dot is the part that carries meaning — it
 * marks the technologies that have actually shipped, counted from the project
 * records rather than asserted here.
 */
export default function Stack({ index }: { index: string }) {
  return (
    <section
      id="stack"
      className="mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-32"
    >
      <SectionHead
        index={index}
        name="Stack"
        title="Ажилдаа хэрэглэдэг технологиуд."
        lead="Улбар шар цэгтэй нь бодит төсөл дээр production-д гарсан — хажуугийн тоо нь хэдэн төсөлд ашигласныг заана."
        meta={`${stackTotal} technologies`}
      />

      <Reveal className="mt-14 flex flex-col gap-12" stagger>
        {stack.map((group, i) => (
          <div key={group.id}>
            <div className="flex items-baseline justify-between border-b border-line pb-3">
              <h3 className="label flex items-center gap-3">
                <span className="text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-ink">{group.title}</span>
              </h3>
              <span className="label">{group.items.length}</span>
            </div>

            <p className="mt-3 max-w-lg text-[0.8125rem] leading-relaxed text-ink-3">
              {group.note}
            </p>

            <ul className="mt-6 grid grid-cols-3 gap-px bg-line sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-9">
              {group.items.map((item) => {
                const used = projectsUsing(item);
                return (
                  <li
                    key={item}
                    className="group/tile relative flex flex-col items-center justify-center gap-3 bg-bg px-2 py-6 text-ink-2 transition-colors hover:bg-bg-2 hover:text-signal"
                    title={
                      used
                        ? `${item} — ${used} of ${projects.length} projects`
                        : item
                    }
                  >
                    {used > 0 && (
                      <span className="absolute right-2 top-2 flex items-center gap-1">
                        <span className="h-1 w-1 bg-signal" aria-hidden />
                        <span className="mono text-[9px] text-ink-3">
                          {used}
                        </span>
                      </span>
                    )}

                    <TechMark name={item} />

                    <span className="mono text-center text-[10px] leading-tight text-ink-3 transition-colors group-hover/tile:text-ink">
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
