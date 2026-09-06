"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Mark from "./Mark";
import { EASE, T } from "../lib/motion";
import { activeSocials, brand, links } from "../data/profile";

/**
 * The destinations are visible in the bar, and the same list opens full-screen
 * from the button beside them. Two routes to one place is a deliberate choice
 * here: the bar answers "what is on this site" without a click, the overlay
 * gives the list room to be read.
 *
 * Every href must match a section actually rendered in page.tsx — "#ai"
 * outlived its section once and became a link to nowhere.
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

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const sections = MENU_ITEMS.map((item) =>
      document.querySelector<HTMLElement>(item.href),
    );

    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      let current = "";
      sections.forEach((section, i) => {
        if (section && section.getBoundingClientRect().top <= 160) {
          current = MENU_ITEMS[i].href;
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

  /**
   * With the inline links gone this panel is the only way to navigate, so it
   * behaves like a dialog: the page underneath cannot scroll, Escape closes,
   * focus moves in and cycles inside, and it returns to the button on close.
   */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    // captured now: by cleanup time the ref may point somewhere else
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";

    const destinations = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [],
      );

    /*
     * The Close button lives in the bar, which comes before the panel in the
     * document, so it has to lead this list — put it last and Tab off the
     * final link escapes into the page sitting behind the overlay instead of
     * wrapping.
     */
    const focusable = () => {
      const inside = destinations();
      return trigger ? [trigger, ...inside] : inside;
    };

    // Opening lands on the first destination, not on Close.
    destinations()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const currently = document.activeElement;

      if (event.shiftKey && currently === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && currently === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: T.base, ease: EASE.out, delay: T.stagger * 2 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`relative z-10 transition-colors duration-500 ${
          scrolled && !open
            ? "border-b border-line bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="bleed flex items-center justify-between py-7">
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label="Home"
          >
            <Mark className="h-7 w-7 text-ink" />
            <span className="display hidden text-lg leading-none text-ink sm:block">
              {brand.name}
            </span>
          </a>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Sections"
          >
            {MENU_ITEMS.map((item) => {
              const isActive = active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`label relative py-1 transition-colors ${
                    isActive ? "text-ink" : "hover:text-ink"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-signal"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="label flex h-9 items-center gap-2.5 border border-line px-3 text-ink transition-colors hover:border-line-strong"
          >
            <span aria-hidden className="flex flex-col gap-[3px]">
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

      {!open && (
        <motion.div
          style={{ scaleX: progress }}
          className="relative z-10 h-px origin-left bg-signal"
        />
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: T.base, ease: EASE.snap }}
            className="fixed inset-0 z-0 flex flex-col justify-between bg-bg pt-24 pb-8"
          >
            <div
              className="blueprint pointer-events-none absolute inset-0 opacity-60"
              aria-hidden
            />

            <nav
              className="bleed relative flex-1 overflow-y-auto"
              aria-label="All sections"
            >
              {MENU_ITEMS.map((item, i) => {
                const isActive = active === item.href;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: T.stagger + i * T.stagger,
                      duration: T.base,
                      ease: EASE.out,
                    }}
                    className="group flex items-center gap-5 border-b border-line py-3 md:py-4"
                  >
                    {/* The one accent in here: which section you are in now. */}
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                        isActive ? "bg-signal" : "bg-transparent"
                      }`}
                    />
                    <span className="display text-5xl leading-[0.9] transition-transform duration-500 group-hover:translate-x-3 md:text-8xl">
                      {item.label}
                    </span>
                  </motion.a>
                );
              })}
            </nav>

            <div className="bleed relative flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-6">
              <a
                href={links.emailHref}
                className="mono text-sm text-ink-2 transition-colors hover:text-ink"
              >
                {links.email}
              </a>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
