import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import ProjectCard from "./ProjectCard";
import { services } from "../data/services";
import { homeProjects } from "../data/projects";

/**
 * What she can build, held still, with the evidence for it running past.
 *
 * The two columns are one argument: the left states the claim and the right
 * is what backs it, so they belong in the same section rather than in two
 * sections a reader has to hold in their head at once. The short side stays
 * put while the long side scrolls, which is the only reason the claim is
 * still on screen by the time the work has been read.
 *
 * The id is #work: the section is where the work lives, that is the
 * destination people look for, and every existing link to it keeps landing.
 */
export default function Expertise() {
  return (
    <section id="work" className="shell section-y">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/*
          Below 1024px there is not enough width for two columns to be worth
          it, so the claim simply sits above the work as normal flow.
        */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHead
              name="My Expertise"
              title="Юу барьж өгч чадах вэ."
              lead="Технологи биш, үр дүнгээр нь бичсэн. Хэрэгцээ тань энд байхгүй бол шууд бичээрэй."
            />

            {/*
              Six lines, unnumbered: these are not a sequence and a number in
              front of each would only be counting them for the reader.
            */}
            <ul className="mt-10 border-t border-line">
              {services.map((service) => (
                <li key={service.id} className="border-b border-line py-3.5">
                  <span className="display text-lg leading-tight">
                    {service.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="label flex items-center justify-between gap-4 border-t border-line pt-6">
            <span>Selected work</span>
            <span className="hidden sm:block">
              {homeProjects.length} projects
            </span>
          </div>

          {/*
            One card, then the next. The reveal is the site's one entrance and
            the whole column is handed to a single batched observer, so a run
            this long is still one ScrollTrigger rather than eight.
          */}
          <Reveal className="mt-10 flex flex-col gap-12" stagger>
            {homeProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                sizes="(max-width: 1024px) 100vw, 620px"
              />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
