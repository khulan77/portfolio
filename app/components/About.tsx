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
        The panel leads and the prose runs beside it.

        With the prose on the left the row's spare height fell under the left
        column, which is where the eye returns at the end of every line — it
        read as something missing rather than as air. On the right it falls
        where a column of text is expected to end short, and the two blocks
        are centred against each other so the row sits level however the copy
        wraps. Their heights cannot be made equal: the paragraph is a fixed
        length and the panel has an object in it.
      */}
      <div className="mt-14 grid items-center gap-10 md:grid-cols-12 md:gap-16">
        {/* The one place the name appears: signed against the credential it
            belongs to, rather than announced at the top of the page. */}
        <Reveal className="md:col-span-5">
          <div className="flex flex-col border border-line bg-bg-2">
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
      </div>

    </section>
  );
}
