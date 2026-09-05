import Image from "next/image";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { brand } from "../data/profile";

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-32"
    >
      <SectionHead
        name="About"
        title="Хамгийн хэцүү хэсэг нь код байгаагүй."
        meta={`${brand.school} · ${brand.program}`}
      />

      <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <Reveal>
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

        {/* Education, given the weight of a credential rather than a bullet */}
        <Reveal className="md:col-span-5">
          <div className="flex items-center gap-4 border border-line bg-bg-2 p-6">
            {/* The artwork carries its own black tile, so it is placed as
                supplied — never recoloured, never cropped. */}
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
        </Reveal>
      </div>
    </section>
  );
}
