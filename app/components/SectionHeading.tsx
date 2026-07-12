import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  title,
  kicker,
}: {
  index: string;
  title: string;
  kicker?: string;
}) {
  return (
    <Reveal className="mb-12 md:mb-16" stagger>
      <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-cyan">
        <span className="font-display">{index}</span>
        <span className="h-px w-10 bg-gradient-to-r from-cyan to-transparent" />
        {kicker && <span className="text-muted">{kicker}</span>}
      </div>
      <h2 className="font-display mt-4 text-3xl font-bold tracking-tight md:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}
