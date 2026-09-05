"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Mark from "./Mark";
import { activeSocials } from "../data/profile";

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

/**
 * The overlay carries the full map; the bar stays deliberately short.
 * Every href here must match a section that is actually rendered in page.tsx —
 * "#ai" outlived its section once and became a link to nowhere.
 */
const MENU_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector<HTMLElement>(item.href),
    );

    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      let current = "";
      sections.forEach((section, i) => {
        if (section && section.getBoundingClientRect().top <= 160) {
          current = NAV_ITEMS[i].href;
        }
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-colors duration-500 ${
          scrolled
            ? "border-b border-line bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="shell flex items-center justify-between py-4">
          <a href="#top" className="group flex items-center gap-3" aria-label="Home">
            <Mark className="h-7 w-7 text-ink" />
            <span className="label hidden text-ink-2 sm:block">
              Full-Stack × AI
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`label relative px-3 py-2 transition-colors ${
                    isActive ? "text-ink" : "hover:text-ink"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      className="absolute inset-x-3 -bottom-px h-px bg-signal"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="label flex h-9 items-center gap-2.5 border border-line px-3 transition-colors hover:border-line-strong hover:text-ink"
            >
              <span className="flex flex-col gap-[3px]">
                <span
                  className={`block h-px w-3.5 bg-current transition-transform duration-300 ${
                    open ? "translate-y-[2px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-3.5 bg-current transition-transform duration-300 ${
                    open ? "-translate-y-[2px] -rotate-45" : ""
                  }`}
                />
              </span>
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      <motion.div
        style={{ scaleX: progress }}
        className="h-px origin-left bg-signal"
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 top-0 -z-10 flex flex-col justify-between bg-bg pt-24 pb-8"
          >
            <div className="blueprint pointer-events-none absolute inset-0 opacity-60" />
            <nav
              className="shell relative flex-1 overflow-y-auto"
              aria-label="Full menu"
            >
              {MENU_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.045, duration: 0.5 }}
                  className="group flex items-baseline gap-5 border-b border-line py-4 md:py-5"
                >
                  <span className="display text-3xl transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="shell relative flex flex-wrap items-center gap-x-6 gap-y-2 pt-6">
              {activeSocials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="label transition-colors hover:text-ink"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
