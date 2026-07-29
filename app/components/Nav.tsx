"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { links } from "../data";

const NAV_ITEMS = [
  { label: "Ур чадвар", href: "#skills" },
  { label: "Төслүүд", href: "#projects" },
  { label: "Холбоо барих", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-500 md:px-8 ${
          scrolled
            ? "my-3 rounded-full glass py-2.5"
            : "my-4 py-2.5"
        }`}
      >
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet to-cyan font-display text-sm font-bold text-[#05060a]">
            K
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">
            dev
            <span className="text-cyan">.code</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-text"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={links.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border bg-white/5 px-4 py-2 text-sm font-medium text-text transition-all hover:border-white/25 hover:bg-white/10"
        >
          GitHub ↗
        </a>
      </div>

      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="h-px origin-left bg-gradient-to-r from-violet via-cyan to-magenta"
      />
    </motion.header>
  );
}
