/**
 * Two very quiet fields of signal-tinted light. Transform-only animation, no
 * blur filter, so the cost stays off the paint path.
 */
export default function Ambient() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden>
      <div
        className="blob left-[-15%] top-[-10%] h-[60vmax] w-[60vmax]"
        style={{
          background: "radial-gradient(circle, var(--glow), transparent 62%)",
          animation: "drift-a 26s ease-in-out infinite",
        }}
      />
      <div
        className="blob bottom-[-25%] right-[-10%] h-[50vmax] w-[50vmax] opacity-70"
        style={{
          background: "radial-gradient(circle, var(--glow), transparent 60%)",
          animation: "drift-b 32s ease-in-out infinite",
        }}
      />
    </div>
  );
}
