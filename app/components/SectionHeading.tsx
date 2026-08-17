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
      <div className="eyebrow flex items-center gap-3 text-accent-2">
        <span className="font-display">{index}</span>
        <span className="h-px w-10 bg-linear-to-r from-accent-2 to-transparent" />
        {kicker && <span className="text-faint">{kicker}</span>}
      </div>
      <h2 className="font-display mt-4 text-3xl font-bold tracking-tight md:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}
