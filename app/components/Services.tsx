import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { services } from "../data/services";

/**
 * Written as problem -> solution -> outcome, because that is the order a
 * client actually thinks in. Technology is the footnote, not the headline.
 */
export default function Services() {
  return (
    <section
      id="services"
      className="shell section-y"
    >
      <SectionHead
        name="Services"
        title="Юу барьж өгч чадах вэ."
        lead="Технологи биш, үр дүнгээр нь бичсэн. Хэрэгцээ тань энд байхгүй бол шууд бичээрэй."
      />

      <Reveal className="mt-14 grid gap-px bg-line md:grid-cols-2 xl:grid-cols-3" stagger>
        {services.map((service, i) => (
          <article key={service.id} className="flex flex-col bg-bg p-6 md:p-8">
            <div className="label flex items-center justify-between">
              <span>{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="display mt-4 text-xl leading-snug">{service.title}</h3>

            <dl className="mt-6 flex-1 space-y-4 border-t border-line pt-5">
              <div>
                <dt className="label">Problem</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink-2">
                  {service.problem}
                </dd>
              </div>
              <div>
                <dt className="label">Solution</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink-2">
                  {service.solution}
                </dd>
              </div>
              <div>
                <dt className="label text-signal">Outcome</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink">
                  {service.outcome}
                </dd>
              </div>
            </dl>

            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line pt-4">
              {service.stack.map((tech) => (
                <li key={tech} className="mono text-[11px] text-ink-3">
                  {tech}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
