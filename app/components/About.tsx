import Image from "next/image";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import AboutField from "./AboutField";
import { brand } from "../data/profile";

export default function About() {
  return (
    <section id="about" className="shell section-y">
      <SectionHead
        name="About"
        title="Хамгийн хэцүү хэсэг нь код байгаагүй."
      />

      {/*
        The panel used to be a small card sitting at the top of a column twice
        its height, with nothing under it — the one thing on the page that
        visibly hung. It now runs the full height of the row, so the two
        columns close on the same line and the section reads as a block rather
        than as a paragraph with something left over beside it.
      */}
      <div className="mt-14 grid items-stretch gap-10 md:grid-cols-12 md:gap-16">
        <Reveal className="md:col-span-7" stagger>
          <p className="text-lg leading-relaxed text-ink-2 md:text-xl">
            Асуудлыг нь буруу ойлгочихвол хэчнээн цэвэрхэн код бичсэн ч
            хамаагүй болдог. Тиймээс одоо эхлээд{" "}
            <span className="text-ink">асуултаа зөв тавихад</span> л хамгийн
            их цагаа зарцуулдаг.
          </p>

          <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink-2">
            Ихэвчлэн бүтэн системийг ганцаараа барьдаг — дизайн, өгөгдлийн
            сан, API, deploy. Хамгийн урт бодогддог хэсэг нь ихэнхдээ хамгийн
            жижиг нь байдаг: Lumière дээр хоёр хүн яг нэг зэрэг ижил цагийг
            дарвал юу болох вэ гэдгийг шийдэх нь бүх интерфейсээс илүү цаг
            авсан.
          </p>
        </Reveal>

        {/* The one place the name appears: signed against the credential it
            belongs to, rather than announced at the top of the page. */}
        <Reveal className="md:col-span-5">
          <div className="flex h-full flex-col border border-line bg-bg-2">
            <AboutField />

            <div className="p-6">
              <h3 className="display text-2xl leading-none">{brand.name}</h3>
              <p className="mt-2 text-sm text-ink-2">{brand.role}</p>

              <div className="mt-6 flex items-center gap-4 border-t border-line pt-6">
                {/* The artwork carries its own black tile, so it is placed as
                    supplied — never recoloured, never cropped. It stays with the
                    school, not with the name, so it cannot read as a personal mark. */}
                <Image
                  src="/pinecone-academy.png"
                  alt="Pinecone Academy"
                  width={256}
                  height={256}
                  sizes="56px"
                  className="h-14 w-14 shrink-0 border border-line"
                />
                <div>
                  <div className="label">Education</div>
                  <div className="display mt-1.5 text-lg leading-tight">
                    {brand.school}
                  </div>
                  <div className="mono mt-1 text-xs text-ink-2">
                    {brand.program}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
