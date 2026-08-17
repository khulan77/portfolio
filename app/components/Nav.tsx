"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import GithubIcon from "./GithubIcon";
import ThemeToggle from "./ThemeToggle";
import { links, profile } from "../data";

const NAV_ITEMS = [
  { label: "Танилцуулга", href: "#about" },
  { label: "Ур чадвар", href: "#skills" },
  { label: "Төслүүд", href: "#projects" },
  { label: "Холбоо барих", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  // Condense the bar after the first scroll, and light up the section the
  // reader is currently in.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector<HTMLElement>(item.href)
    );

    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);

      let current = "";
      sections.forEach((section, i) => {
        if (section && section.getBoundingClientRect().top <= 140) {
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

  // Lock the page behind the mobile sheet.
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
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-500 md:px-8 ${
          scrolled ? "glass my-3 rounded-full py-2.5 shadow-[var(--shadow-md)]" : "my-4 py-2.5"
        }`}
      >
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Эхлэл">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 font-display text-sm font-bold text-on-accent">
            {profile.logoMark}
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">
            {profile.brand}
            <span className="text-accent">{profile.brandAccent}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Үндсэн цэс">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  isActive ? "text-text" : "text-muted hover:text-text"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text transition-colors hover:border-border-strong hover:bg-surface-2 sm:inline-flex"
          >
            <GithubIcon className="h-4 w-4" /> GitHub
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Цэс хаах" : "Цэс нээх"}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text transition-colors hover:border-border-strong md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="h-px origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-3"
      />

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass mx-4 mt-2 rounded-3xl p-4 shadow-[var(--shadow-lg)] md:hidden"
          >
            <nav className="flex flex-col" aria-label="Гар утасны цэс">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border px-2 py-3.5 text-base font-medium text-text last:border-none"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-4 py-3 text-sm font-semibold"
              >
                <GithubIcon className="h-4 w-4" /> GitHub үзэх
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
