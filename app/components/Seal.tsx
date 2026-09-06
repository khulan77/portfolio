import { useId } from "react";
import { ArrowUpRight } from "lucide-react";

/**
 * A slowly turning seal, and the hero's only call to action.
 *
 * The buttons it replaced said "View my work" and "Let's build something"
 * directly under a headline that already fills the screen; this says the same
 * thing without competing with the type. One rotation takes 48 seconds —
 * fast enough to notice, slow enough that it never asks to be watched.
 *
 * The ring text is fitted with textLength rather than tracked by eye, so it
 * closes the circle exactly whatever the copy is.
 */

/** Circumference of the r=72 path below: 2 * pi * 72. */
const RING_LENGTH = 452.4;
const RING_TEXT = "Ажилд нээлттэй · Улаанбаатар · ";

export default function Seal({ className = "" }: { className?: string }) {
  const rawId = useId();
  const pathId = `seal-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <a
      href="#contact"
      className={`group relative grid place-items-center text-ink-2 transition-colors hover:text-ink ${className}`}
      aria-label="Ажилд нээлттэй — холбоо барих"
    >
      <svg viewBox="0 0 200 200" className="seal h-full w-full" aria-hidden>
        <defs>
          <path
            id={pathId}
            fill="none"
            d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"
          />
        </defs>
        <text fill="currentColor" fontSize="14">
          <textPath
            href={`#${pathId}`}
            startOffset="0"
            textLength={RING_LENGTH}
            lengthAdjust="spacing"
          >
            {RING_TEXT.repeat(2)}
          </textPath>
        </text>
      </svg>

      <ArrowUpRight
        aria-hidden
        className="absolute h-5 w-5 text-ink transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}
