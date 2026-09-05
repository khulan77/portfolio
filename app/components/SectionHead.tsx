import Reveal from "./Reveal";

/**
 * A section opens with its name, a statement, and an optional lead.
 *
 * The numbered eyebrow that used to sit here ("01 / Work") was removed: the
 * sections are not a sequence, so the number told the reader nothing. Process
 * keeps its numbers, because those steps really do run in order.
 */
export default function SectionHead({
  name,
  title,
  lead,
  meta,
}: {
  name: string;
  title: string;
  lead?: string;
  meta?: string;
}) {
  return (
    <Reveal className="border-t border-line pt-6" stagger>
      <div className="label flex items-center justify-between gap-4">
        <span>{name}</span>
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
