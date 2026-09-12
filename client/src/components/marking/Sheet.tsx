import type { ReactNode } from "react";

/**
 * One sheet of paper on the desk. `plain` drops the punch holes, which only the
 * cover sheet needs (a cover is loose, the script inside the folder is filed).
 */
export function Sheet({
  id,
  plain,
  children,
}: {
  id?: string;
  plain?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={plain ? "ms-sheet ms-plain" : "ms-sheet"}>
      {children}
    </section>
  );
}

/** The printed strip across the head of every sheet. */
export function Slug({ left, middle, right }: { left: string; middle: string; right: string }) {
  return (
    <div className="ms-slug">
      <span>{left}</span>
      <span>{middle}</span>
      <span className="ms-r">{right}</span>
    </div>
  );
}

/**
 * Handwriting that arrives word by word as the reader gets to it. The words are
 * split here rather than in the scroll handler, so the text is complete in the
 * HTML a crawler or a reader with JavaScript off receives.
 */
export function Hand({ children }: { children: string }) {
  const words = children.trim().split(/\s+/);
  return (
    <span>
      {words.map((w, i) => (
        <span key={i} className="ms-w" style={{ ["--ms-i" as string]: i }}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
