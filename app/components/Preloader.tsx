"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Mark from "./Mark";

gsap.registerPlugin(ScrollTrigger);

/**
 * A short, quiet intro: the mark resolves while a counter fills, then the
 * curtain lifts. Shown once per browser session so returning visitors are
 * never made to wait twice.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const seen =
        typeof window !== "undefined" &&
        sessionStorage.getItem("introSeen") === "1";
      if (seen) {
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
          // The page was scroll-locked while this ran, so every pinned
          // trigger measured against the wrong height. Re-measure now.
          ScrollTrigger.refresh();
        },
      });

      tl.to(counter, {
        v: 100,
        duration: 1.3,
        ease: "power2.inOut",
        onUpdate: () => setCount(Math.round(counter.v)),
      })
        .to(".pl-bar", { scaleX: 1, duration: 1.3, ease: "power2.inOut" }, 0)
        .to(".pl-mark", { rotate: 180, duration: 1.3, ease: "power2.inOut" }, 0)
        .to([".pl-meta", ".pl-mark"], { opacity: 0, duration: 0.4 }, "+=0.1")
        .to(
          root.current,
          { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
          "-=0.15",
        );
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-100 flex flex-col justify-between bg-bg px-5 py-8 md:px-10"
    >
      <div className="pl-meta label flex items-center justify-between">
        <span>Full-Stack × AI</span>
        <span className="mono">{String(count).padStart(3, "0")}</span>
      </div>

      <div className="pl-mark flex justify-center">
        <Mark className="h-16 w-16 text-ink" />
      </div>

      <div>
        <div className="h-px w-full bg-line">
          <div className="pl-bar h-px origin-left scale-x-0 bg-signal" />
        </div>
        <div className="pl-meta label mt-4">Loading experience</div>
      </div>
    </div>
  );
}
