import type { ReactNode } from "react";

interface Props {
  /** The passage of the report and the criterion it is marked under, e.g. "Research question (Research design)". */
  heading: string;
  weaker: ReactNode;
  stronger: ReactNode;
  /** What the criterion rewards in the stronger version. */
  why: ReactNode;
}

/**
 * One passage of a made-up piece of coursework, written the way drafts often read and the way
 * the upper levels of the criteria describe, then explained. Used by the IA examples pages.
 */
export function AnnotatedExcerpt({ heading, weaker, stronger, why }: Props) {
  return (
    <>
      <h3>{heading}</h3>
      <div className="not-prose my-6 grid gap-3">
        <figure className="rounded-xl border border-border p-4 md:p-5">
          <figcaption className="text-sm font-semibold text-muted-foreground mb-2">Weaker</figcaption>
          <div className="excerpt-body">{weaker}</div>
        </figure>
        <figure className="rounded-xl bg-muted p-4 md:p-5">
          <figcaption className="text-sm font-semibold text-primary mb-2">Stronger</figcaption>
          <div className="excerpt-body">{stronger}</div>
        </figure>
      </div>
      <p>{why}</p>
    </>
  );
}
