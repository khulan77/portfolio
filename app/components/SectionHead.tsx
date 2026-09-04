import Reveal from "./Reveal";

/**
 * Every section opens the same way: an instrument label, a statement, and
 * an optional lead. The repetition is the rhythm of the page.
 */
export default function SectionHead({
  index,
  name,
  title,
  lead,
  meta,
}: {
  index: string;
  name: string;
  title: string;
  lead?: string;
  meta?: string;
}) {
  return (
    <Reveal className="border-t border-line pt-6" stagger>
      <div className="label flex items-center justify-between gap-4">
        <span>
          <span className="text-signal">{index}</span>
          <span className="mx-2 opacity-40">/</span>
          {name}
        </span>
        {meta && <span className="hidden sm:block">{meta}</span>}
      </div>
      <h2 className="display statement mt-8 max-w-3xl">{title}</h2>
      {lead && (
        <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-ink-2">
          {lead}
        </p>
      )}
    </Reveal>
  );
}
