import { Link } from "wouter";

export interface BandRow {
  criterion: string;
  typical: string;
  top: string;
}

interface Props {
  /** e.g. "Extended Essay" or "Physics IA" */
  workLabel: string;
  /** rows of criterion-level contrast */
  rows: BandRow[];
  /** where the "check my draft" CTA points */
  ctaHref: string;
  /** optional note appended under the table */
  note?: string;
}

export function ExamplesBridge({ workLabel, rows, ctaHref, note }: Props) {
  return (
    <>
      <h2>Why full {workLabel} examples are hard to find, and what to use instead</h2>

      <p>
        Complete, high-scoring {workLabel}s are rarely published in full, and for good reason: the work belongs to the student who wrote it, and the marked examples the IB annotates go to teachers in support material rather than onto the open web. What does circulate online usually lacks the two things that would actually help you: the mark it received and the comments explaining that mark. A PDF with no score attached cannot tell you why it scored what it did.
      </p>

      <p>
        So the real question behind &ldquo;show me an example&rdquo; is usually this: <em>what separates a top-band {workLabel} from an average one?</em> That difference is not stylistic. It sits in specific, nameable behaviours against each assessment criterion:
      </p>

      <table>
        <thead>
          <tr>
            <th>Criterion</th>
            <th>What an average one does</th>
            <th>What a top-band one does</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.criterion}>
              <td><strong>{r.criterion}</strong></td>
              <td>{r.typical}</td>
              <td>{r.top}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {note && <p>{note}</p>}

      <h3>See a full marked report</h3>

      <p>
        If you want to see what marking against published descriptors looks like on a whole piece of work, we publish three complete IBLens reports on the same TOK-style title at three quality levels, with the commentary explaining each band placement: <Link href="/resources/sample-reports">Sample IBLens Reports</Link>. They are our own demonstration essays, so we can show them in full.
      </p>

      <h3>The faster route: check your own draft</h3>

      <p>
        Reading someone else&rsquo;s work tells you what good looks like in general. It cannot tell you what is missing from <em>yours</em>. IBLens marks your draft against these criteria and names your weakest one. The estimated band range and the full feedback on that weakest criterion are free, with no account needed.
      </p>

      <p>
        <Link href={ctaHref}>Check my {workLabel} against the criteria →</Link>
      </p>
    </>
  );
}
