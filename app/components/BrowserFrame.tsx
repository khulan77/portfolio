import type { ReactNode } from "react";

/**
 * Screenshots presented as running software rather than cropped pictures —
 * the chrome and the real host name do most of the credibility work.
 */
export default function BrowserFrame({
  url,
  children,
  compact = false,
}: {
  url: string;
  children: ReactNode;
  compact?: boolean;
}) {
  let host = "";
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    host = "";
  }

  return (
    <div className="overflow-hidden border border-line bg-bg">
      <div className="flex items-center gap-1.5 border-b border-line bg-bg-3 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-ink-3 opacity-60" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink-3 opacity-40" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink-3 opacity-25" />
        <span className="mono mx-auto max-w-[70%] truncate text-[10px] text-ink-3">
          {host}
        </span>
      </div>
      <div
        className={`relative w-full overflow-hidden ${
          compact ? "aspect-16/10" : "aspect-4/3"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
