import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { process } from "../data/process";

export default function Process() {
  return (
    <section
      id="process"
      className="mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-32"
    >
      <SectionHead
        name="Process"
        title="Хэрхэн бүтээдэг вэ."
        lead="Таван алхам. Аль нэгийг нь алгасах бүрд төсөл дараа нь үнэтэй болдог."
      />

      <Reveal className="mt-14 border-t border-line" stagger>
        {process.map((step) => (
          <div
            key={step.index}
            className="group grid items-baseline gap-4 border-b border-line py-7 transition-colors hover:bg-bg-2 md:grid-cols-12 md:gap-8 md:py-9"
          >
            <span className="label md:col-span-1">{step.index}</span>
            <h3 className="display text-2xl transition-transform duration-500 group-hover:translate-x-2 md:col-span-4 md:text-3xl">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-ink-2 md:col-span-7">
              {step.body}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
