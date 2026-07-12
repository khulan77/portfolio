/**
 * Soft, slowly drifting colour fields behind the whole page. Uses only
 * radial-gradient fills + transform animation (no blur filter) so it stays
 * cheap on the GPU.
 */
export default function Ambient() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden>
      <div
        className="blob left-[-10%] top-[-5%] h-[55vmax] w-[55vmax] opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(139,116,255,0.22), transparent 60%)",
          animation: "drift-a 22s ease-in-out infinite",
        }}
      />
      <div
        className="blob right-[-15%] top-[20%] h-[50vmax] w-[50vmax] opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(52,224,232,0.16), transparent 60%)",
          animation: "drift-b 26s ease-in-out infinite",
        }}
      />
      <div
        className="blob bottom-[-20%] left-[20%] h-[45vmax] w-[45vmax] opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(255,94,199,0.14), transparent 60%)",
          animation: "drift-c 30s ease-in-out infinite",
        }}
      />
    </div>
  );
}
