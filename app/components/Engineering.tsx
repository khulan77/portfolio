"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHead from "./SectionHead";
import { architecture } from "../data/systems";

/**
 * A request, traced from the person making it down to the data and back.
 * Listing technologies proves nothing; showing where each one sits does.
 */
export default function Engineering() {
  const [open, setOpen] = useState(architecture[1].id);

  return (
    <section
      id="engineering"
      className="mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-32"
    >
      <SectionHead
        name="Engineering"
        title="Хүсэлт нэг бүр эдгээр давхаргаар дамжина."
        lead="Давхарга сонгоод тэнд юу шийдэгддэг, ямар технологи ажилладгийг үзнэ үү."
      />

      <div className="mt-14 border-t border-line">
        {architecture.map((layer, i) => {
          const isOpen = layer.id === open;
          return (
            <div key={layer.id} className="border-b border-line">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? "" : layer.id)}
                aria-expanded={isOpen}
                className="group flex w-full items-center gap-4 py-5 text-left md:gap-8 md:py-6"
              >
                <span className="label w-8 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* depth rail — how far down the stack this layer sits */}
                <span
                  className="hidden h-px shrink-0 bg-line md:block"
                  style={{ width: `${i * 22 + 12}px` }}
                  aria-hidden
                />

                <span
                  className={`display flex-1 text-xl transition-colors md:text-2xl ${
                    isOpen ? "text-signal" : "group-hover:text-ink"
                  }`}
                >
                  {layer.name}
                </span>

                <span className="label hidden shrink-0 sm:block">
                  {layer.role}
                </span>

                <span
                  className={`mono shrink-0 text-lg leading-none transition-transform duration-300 ${
                    isOpen ? "rotate-45 text-signal" : "text-ink-3"
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>

              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-5 pb-8 md:grid-cols-12 md:pl-20">
                    <p className="text-sm leading-relaxed text-ink-2 md:col-span-7 md:text-base">
                      {layer.detail}
                    </p>
                    <ul className="flex flex-wrap content-start gap-2 md:col-span-5">
                      {layer.tech.map((tech) => (
                        <li
                          key={tech}
                          className="label border border-line px-2.5 py-1"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
