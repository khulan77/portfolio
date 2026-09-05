"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHead from "./SectionHead";
import { pipeline } from "../data/systems";

/**
 * The point of this section: AI is not a chat window bolted on the side, it
 * is one stage inside a pipeline that starts at a problem and ends at a
 * product. Selecting a stage shows what actually happens there.
 */
export default function AiSoftware() {
  const [selected, setSelected] = useState(pipeline[2].id);
  const active = pipeline.find((stage) => stage.id === selected) ?? pipeline[0];
  const activeIndex = pipeline.indexOf(active);

  return (
    <section
      id="ai"
      className="relative shell section-y"
    >
      <div
        className="dot-grid fade-mask-y pointer-events-none absolute inset-0 -z-10 opacity-70"
        aria-hidden
      />

      <SectionHead
        name="AI × Software"
        title="AI бол чат биш — урсгалын нэг давхарга."
        lead="Санаанаас бүтээгдэхүүн хүртэлх зам дээр AI хаана зогсдгийг харуулав. Алхам сонгоод дэлгэрэнгүйг нь үзнэ үү."
      />

      <div className="mt-14">
        {/* the pipeline rail */}
        <div className="relative">
          <div className="absolute inset-x-0 top-[13px] h-px bg-line" aria-hidden />
          <ol className="relative grid grid-cols-3 gap-y-8 md:grid-cols-6">
            {pipeline.map((stage, i) => {
              const isActive = stage.id === active.id;
              const isPassed = i <= activeIndex;
              return (
                <li key={stage.id} className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => setSelected(stage.id)}
                    aria-pressed={isActive}
                    className="group flex flex-col items-center gap-3"
                  >
                    <span
                      className={`relative flex h-[26px] w-[26px] items-center justify-center border transition-colors duration-300 ${
                        isActive
                          ? "border-signal bg-signal"
                          : isPassed
                            ? "border-line-strong bg-bg"
                            : "border-line bg-bg"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 transition-colors ${
                          isActive ? "bg-[color:var(--on-signal)]" : "bg-ink-3"
                        }`}
                      />
                      {isActive && (
                        <motion.span
                          layoutId="pipeline-halo"
                          className="absolute -inset-2 border border-[color:var(--signal-line)]"
                        />
                      )}
                    </span>
                    <span
                      className={`label transition-colors ${
                        isActive ? "text-ink" : "group-hover:text-ink"
                      }`}
                    >
                      {stage.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* the detail */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid gap-6 border border-line bg-bg-2 p-6 md:grid-cols-12 md:p-10"
        >
          <div className="label md:col-span-2">
            Stage {String(activeIndex + 1).padStart(2, "0")}
          </div>
          <h3 className="display text-2xl md:col-span-4 md:text-3xl">
            {active.label}
          </h3>
          <p className="text-sm leading-relaxed text-ink-2 md:col-span-6 md:text-base">
            {active.body}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
