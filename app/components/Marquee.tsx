const ROW_A = [
  "Next.js",
  "TypeScript",
  "Three.js",
  "GSAP",
  "React",
  "Node.js",
  "PostgreSQL",
];
const ROW_B = [
  "Tailwind CSS",
  "Framer Motion",
  "GraphQL",
  "Prisma",
  "Supabase",
  "Figma",
  "Vercel",
];

function Row({ words, reverse }: { words: string[]; reverse?: boolean }) {
  const row = [...words, ...words];
  return (
    <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
      {row.map((w, i) => (
        <span
          key={i}
          className="font-display mx-8 text-lg font-medium text-muted transition-colors hover:text-accent"
        >
          {w}
          <span className="ml-8 text-accent/40">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      className="relative flex flex-col gap-4 overflow-hidden border-y border-border py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      aria-hidden
    >
      <Row words={ROW_A} />
      <Row words={ROW_B} reverse />
    </div>
  );
}
