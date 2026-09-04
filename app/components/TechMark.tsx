import { TECH_ICONS } from "../data/tech-icons";

/**
 * One brand mark, drawn in the page ink colour rather than the brand's own —
 * a wall of thirty-eight brand colours reads as clip art, and recolouring is
 * also the safer choice where a logo is a trademark.
 *
 * Anything without a vendored mark falls back to its initials, so the grid
 * never has a hole in it.
 */
export default function TechMark({ name }: { name: string }) {
  const path = TECH_ICONS[name];

  if (!path) {
    const initials = name
      .replace(/[^A-Za-z0-9 /]/g, "")
      .split(/[\s/]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("");

    return (
      <span
        className="mono flex h-6 w-6 items-center justify-center border border-line text-[10px] leading-none"
        aria-hidden
      >
        {initials.toUpperCase()}
      </span>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
      <path d={path} />
    </svg>
  );
}
