import { getRubric } from "@shared/rubrics";
import { Sheet, Slug } from "./Sheet";

/**
 * Commentary for the worked example, keyed by the official criterion label.
 * The criteria, their marks and the total come from `shared/rubrics.ts` — the
 * same module the grader runs on — so this sheet cannot drift away from what
 * the product actually marks against. A criterion with no entry here renders
 * an empty note rather than borrowed text from another criterion.
 */
const DEMO: Record<string, { awarded: number; note: string; weak?: boolean }> = {
  "Criterion A": { awarded: 5, note: "Question is focused. The scope arrives on page four instead of page one." },
  "Criterion B": { awarded: 5, note: "Sources are listed rather than put in conversation with each other." },
  "Criterion C": { awarded: 3, note: "Counter-argument named, never evaluated. This is where the marks are.", weak: true },
  "Criterion D": { awarded: 7, note: "The argument closes. Hedging in the final paragraph costs the last mark." },
  "Criterion E": { awarded: 1, note: "Reflection describes the process. It does not say what changed in your thinking.", weak: true },
};

const keyOf = (name: string) => name.split(":")[0].trim();

/** A ladder of marks 0..max with the awarded one ringed in red. */
function MarkLadder({ max, awarded }: { max: number; awarded: number }) {
  return (
    <span className="ms-ladder" aria-hidden="true">
      {Array.from({ length: max }, (_, i) => i + 1).map((m) => (
        <span key={m} className={m === awarded ? "ms-rung ms-rung-hit" : "ms-rung"}>
          {m}
        </span>
      ))}
    </span>
  );
}

export function RubricGrid() {
  const rubric = getRubric("EE", "History", "may2027");
  if (!rubric) return null;

  const rows = rubric.criteria.map((c) => ({ ...c, demo: DEMO[keyOf(c.name)] }));
  const awarded = rows.reduce((sum, r) => sum + (r.demo?.awarded ?? 0), 0);

  return (
    <Sheet id="rubric">
      <Slug left="Sheet 2 of 5" middle="Assessment grid" right={rubric.label} />
      <p className="ms-grid-note">
        The criteria below are the ones the grader itself runs on, read out of the same file. For the May 2027
        session the Extended Essay moves from {rubric.totalMarks === 30 ? "34 marks to 30" : "a new scale"} and the
        criteria are rewritten. Pick your session when you submit and the report follows that scale.
      </p>
      <div className="ms-tw">
        <table className="ms-grid">
          <thead>
            <tr>
              <th scope="col">Criterion</th>
              <th scope="col">What it assesses</th>
              <th scope="col">Marks</th>
              <th scope="col">This draft</th>
              <th scope="col">Examiner's note</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className={r.demo?.weak ? "ms-weak" : undefined}>
                <th scope="row">{r.name}</th>
                <td>{r.descriptor}</td>
                <td className="ms-band">
                  <MarkLadder max={r.max} awarded={r.demo?.awarded ?? -1} />
                </td>
                <td className="ms-band">
                  {r.demo ? (
                    r.demo.weak ? (
                      <span className="ms-circled">
                        {r.demo.awarded}/{r.max}
                      </span>
                    ) : (
                      <>
                        {r.demo.awarded}/{r.max} <span className="ms-tick">✓</span>
                      </>
                    )
                  ) : (
                    <span className="ms-faintcell">not marked</span>
                  )}
                </td>
                <td>{r.demo?.note ?? ""}</td>
              </tr>
            ))}
            <tr className="ms-total">
              <th scope="row">Total</th>
              <td />
              <td className="ms-band">{rubric.totalMarks}</td>
              <td className="ms-band">
                {awarded}/{rubric.totalMarks}
              </td>
              <td>Estimate produced from the published criteria, not an IB mark.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="ms-legend">
        <span>
          <b>✓</b> criterion holding its marks
        </span>
        <span>
          <b>○</b> criterion where marks are most recoverable
        </span>
        <span>Psychology and Computer Science also move to new grids in May 2027</span>
      </p>
      {rubric.notes ? <p className="ms-grid-foot">{rubric.notes}</p> : null}
    </Sheet>
  );
}
