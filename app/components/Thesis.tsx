"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PILLARS = [
  {
    k: "User problems",
    v: "Хэрэглэгч юунд бухимдаж байгааг олохгүйгээр бүтээсэн функц хэнд ч хэрэггүй.",
  },
  {
    k: "Business value",
    v: "Бүтээгдэхүүн мөнгө олох, хэмнэх, эсвэл цаг чөлөөлөх ёстой. Үгүй бол зөвхөн зардал.",
  },
  {
    k: "Automation",
    v: "Хүн гараар давтаж байгаа алхам бүр автоматжуулах боломж болж харагддаг.",
  },
  {
    k: "Scalability",
    v: "Өнөөдөр ажиллаж байгаа зүйл арван дахин их ачаалалд ажиллах уу гэдгийг эхэнд бодно.",
  },
];

/**
 * A pause between sections rather than another numbered chapter: the one
 * belief the rest of the site is built on, scrubbed by scroll.
 */
export default function Thesis() {
  const root = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section
      ref={root}
      className="relative overflow-hidden border-y border-line py-24 md:py-32"
    >
      <div
        className="blueprint fade-mask-y pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
      />

      <motion.p
        style={{ x }}
        className="display relative whitespace-nowrap text-center text-[13vw] leading-none md:text-[9vw]"
      >
        CODE IS THE TOOL<span className="text-signal">.</span>{" "}
        <span className="outline-type">THE PROBLEM IS THE PRODUCT</span>
      </motion.p>

      <div className="relative mx-auto mt-16 grid max-w-[88rem] gap-px bg-line px-5 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
        {PILLARS.map((pillar) => (
          <div key={pillar.k} className="bg-bg p-6">
            <div className="label text-signal">{pillar.k}</div>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">{pillar.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
