/**
 * The identity. There is no name on this site, so the mark carries it alone.
 *
 * Reads as an aperture, a node and a signal passing through a system: an
 * outer boundary, an inner core, and a transmission line cutting across.
 * When an ancestor carries `group`, hovering rotates the boundary a quarter
 * turn and opens the core.
 */
export default function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      className={className}
    >
      {/* transmission line */}
      <path
        d="M0 20h6M34 20h6"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.35"
      />
      {/* outer boundary — rotates on hover */}
      <path
        d="M20 2.5 37.5 20 20 37.5 2.5 20Z"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.35"
        className="origin-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45"
      />
      {/* inner frame */}
      <path
        d="M20 9.5 30.5 20 20 30.5 9.5 20Z"
        stroke="currentColor"
        strokeWidth="1.25"
        className="origin-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-45"
      />
      {/* the signal itself */}
      <circle
        cx="20"
        cy="20"
        r="3.6"
        fill="var(--signal)"
        className="origin-center transition-transform duration-500 group-hover:scale-125"
      />
    </svg>
  );
}
