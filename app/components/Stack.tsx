import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import TechMark from "./TechMark";
import { projects } from "../data/projects";
import { projectsUsing, shippedCount, stack, stackTotal } from "../data/stack";

/**
 * Set at editorial scale rather than as a wall of thumbnails: at tile size the
 * marks were decoration and the labels were unreadable. Each technology is a
 * mark plus its name, large enough to actually read, with the number of
 * shipped projects carried as a superscript.
 *
 * Deliberately a server component — the whole section is hover-only CSS, so
 * it costs the visitor no JavaScript at all.
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
        lead={`${stackTotal} технологи. Дээд индекс нь тухайн технологийг ${projects.length} төслийн хэдэн дээр нь production-д ашигласныг заана — тоолсон, зарлаагүй.`}
        meta={`${shippedCount} / ${stackTotal} shipped`}
      />

      <Reveal className="mt-14 flex flex-col gap-12 md:gap-14" stagger>
        {stack.map((group, i) => (
          <div key={group.id}>
            <div className="flex items-baseline gap-4 border-b border-line pb-3">
              <span className="label text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="label text-ink">{group.title}</h3>
              <span className="ml-auto label">{group.items.length}</span>
            </div>

            <ul className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-5">
              {group.items.map((item) => {
                const used = projectsUsing(item);
                return (
                  <li
                    key={item}
                    title={
                      used
                        ? `${item} — ${used} of ${projects.length} projects`
                        : `${item} — not yet in a recorded project`
                    }
                    className={`group/tech inline-flex items-center gap-2.5 transition-colors duration-300 hover:text-signal ${
                      used ? "text-ink" : "text-ink-3"
                    }`}
                  >
                    <span className="transition-transform duration-300 group-hover/tech:-translate-y-0.5">
                      <TechMark name={item} />
                    </span>
                    <span className="display text-lg leading-none md:text-xl">
                      {item}
                    </span>
                    {used > 0 && (
                      <span className="mono -translate-y-2 text-[10px] text-signal">
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

      {/* The part that separates an engineer from a tool list. */}
      <Reveal className="mt-20 border-t border-line pt-10">
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <p className="label md:col-span-3">Beyond the tools</p>
          <p className="statement display md:col-span-9">
            Хэрэгсэл эзэмших нь эхлэл
            <span className="text-signal">.</span>
          </p>
          <p className="text-[0.9375rem] leading-relaxed text-ink-2 md:col-span-9 md:col-start-4">
            Код бичихээс өмнө системийн бүтцийг зурж, өгөгдөл хаана амьдрахыг,
            үйлчилгээ хоорондын хамаарал болон хариуцлагын хилийг тодорхойлно.
            Дээрх жагсаалтаас аль нь тухайн асуудалд хэрэггүй вэ гэдгийг шийдэх
            нь ихэвчлэн аль нь хэрэгтэй вэ гэдгээс чухал байдаг.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
