import { TECH_ICONS } from "../data/tech-icons";

/**
 * One brand mark, drawn in the page ink colour rather than the brand's own —
 * a wall of brand colours reads as clip art, and recolouring is also the safer
 * choice where a logo is a trademark.
 *
 * Six entries have no vendored mark (SQL, REST API, Middleware, OpenAI, Groq,
 * RAG — withdrawn from Simple Icons, or never a brand to begin with). They get
 * a neutral glyph rather than their own initials: an initial sitting beside the
 * name it was taken from renders as "SSQL", "OOpenAI", "RRAG" to anyone
 * reading, copying or indexing the text.
 */
export default function TechMark({ name }: { name: string }) {
  const path = TECH_ICONS[name];

  if (!path) {
    return (
      <span
        className="flex h-6 w-6 items-center justify-center"
        aria-hidden
      >
        <span className="h-2 w-2 rotate-45 border border-current opacity-45" />
      </span>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
      <path d={path} />
    </svg>
  );
}
