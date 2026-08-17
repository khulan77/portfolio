"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

/**
 * Full-screen intro: counts 0 → 100 while the page settles, then lifts away
 * like a curtain to reveal the site. Shown once per browser session.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const skip =
        typeof window !== "undefined" &&
        sessionStorage.getItem("introSeen") === "1";
      if (skip) {
        setDone(true);
        return;
      }

      document.body.style.overflow = "hidden";
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          sessionStorage.setItem("introSeen", "1");
          setDone(true);
        },
      });

      tl.to(counter, {
        v: 100,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => setCount(Math.round(counter.v)),
      })
        .to(".pl-bar", { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0)
        .to(
          [".pl-num", ".pl-name", ".pl-bar-wrap"],
          { yPercent: -140, opacity: 0, duration: 0.6, ease: "power3.in", stagger: 0.06 },
          "+=0.15"
        )
        .to(
          root.current,
          { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
          "-=0.25"
        );
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
    >
      <div className="overflow-hidden">
        <div className="pl-name font-display text-sm uppercase tracking-[0.4em] text-accent-2">
          khulan.dev
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="pl-num font-display mt-4 text-7xl font-bold text-accent-gradient md:text-8xl">
          {count}
          <span className="text-2xl text-muted">%</span>
        </div>
      </div>
      <div className="pl-bar-wrap mt-8 h-px w-56 overflow-hidden bg-border">
        <div className="pl-bar h-full origin-left scale-x-0 bg-linear-to-r from-accent via-accent-2 to-accent-3" />
      </div>
    </div>
  );
}
