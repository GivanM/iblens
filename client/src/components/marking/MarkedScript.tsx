import { Sheet, Slug, Hand } from "./Sheet";

/**
 * Margin notes. Each one answers one underlined passage in the draft, in the
 * order they appear, so the pen marks and the notes are the same marking rather
 * than two decorations. Word counts drive the handwriting reveal in `useMarkingInk`.
 */
const NOTES: { criterion: string; text: string; blue?: boolean }[] = [
  {
    criterion: "Criterion B, 4 of 6",
    text: "Good. This is the only place real subject knowledge does any work.",
  },
  {
    criterion: "Criterion C, 3 of 6",
    text: "Two readings named, neither weighed against the other. Which do you reject, and on what evidence?",
  },
  {
    criterion: "Criterion D, 4 of 8",
    text: "You say it yourself and then do not do it. Evaluating the two cases against each other is worth the most marks here.",
    blue: true,
  },
];

export function MarkedScript() {
  return (
    <Sheet id="work">
      <Slug left="Sheet 1 of 5" middle="Candidate draft, marked" right="Red pen: first read. Blue: second read" />
      <div className="ms-work">
        <div className="ms-col-text">
          <h2 className="ms-penline">Here is where your marks are going.</h2>
          <p className="ms-subline">
            Paste a draft and the report comes back in a minute or two. The first one is a free preview: your mark
            range, your weakest criterion with its full feedback, and the risks costing the most marks. Nothing is
            charged to see it.
          </p>
          <p className="ms-qn">
            "To what extent did economic sanctions contribute to the end of apartheid in South Africa, 1985 to 1994?"
          </p>
          <p className="ms-body" data-ink>
            The imposition of comprehensive sanctions after 1986 coincided with a measurable contraction in South
            African capital inflows.{" "}
            <mark>
              Contemporary accounts from the Reserve Bank suggest that the debt standstill of 1985 was the more
              immediate shock
            </mark>
            , though the two are difficult to separate in the available data.
          </p>
          <p className="ms-body" data-ink>
            Historians have disagreed sharply on the weight to assign each factor.{" "}
            <mark>Some argue that internal resistance had already made the townships ungovernable by 1986</mark>, and
            that external pressure simply removed the last commercial argument for delay.
          </p>
          <p className="ms-body" data-ink>
            <mark>A fuller account would have set the economic case against the internal political one</mark> rather
            than treating them as separate chapters.
          </p>
          <p className="ms-body">
            This essay concludes that sanctions were a contributing but not decisive factor, and that their principal
            effect was to shorten the timetable rather than to force the outcome.
          </p>
          <div className="ms-stampwrap">
            <div className="ms-stamp" data-stamp>
              <b>16/26</b>
              <span>Estimate, RPF not marked</span>
            </div>
          </div>
        </div>
        <aside className="ms-col-marg">
          {NOTES.map((n) => (
            <p
              key={n.criterion}
              className={n.blue ? "ms-note ms-blue" : "ms-note"}
              data-ink
              data-words={n.text.trim().split(/\s+/).length}
            >
              <span className="ms-cr">{n.criterion}</span>
              <Hand>{n.text}</Hand>
            </p>
          ))}
        </aside>
      </div>
    </Sheet>
  );
}
