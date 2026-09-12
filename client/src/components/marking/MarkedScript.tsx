import { Sheet, Slug, Hand } from "./Sheet";

/** Margin notes. Word counts drive the handwriting reveal in `useMarkingInk`. */
const NOTES: { criterion: string; text: string; blue?: boolean }[] = [
  {
    criterion: "Criterion A, 5 of 6",
    text: "Focused question. Say so on page one, not in the conclusion.",
  },
  {
    criterion: "Criterion C, 3 of 6",
    text: "Two readings named, neither evaluated. Which do you reject, and on what evidence?",
  },
  {
    criterion: "Criterion E, 1 of 4",
    text: "Weakest criterion. The reflection describes the process. What changed in your thinking?",
    blue: true,
  },
];

export function MarkedScript() {
  return (
    <Sheet id="work">
      <Slug left="Sheet 1 of 5" middle="Candidate draft, marked" right="Red pen: examiner. Blue: moderation" />
      <div className="ms-work">
        <div className="ms-col-text">
          <h2 className="ms-penline">Here is where your marks are going.</h2>
          <p className="ms-subline">
            Paste a draft and the report comes back in about a minute. The first one is a free preview: band range,
            your weakest criterion with its full feedback, and the risks costing the most marks.
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
            The reading for this essay began with the sanctions literature and stayed there.{" "}
            <mark>A fuller account would have set the economic case against the internal political one</mark> rather
            than treating them as separate chapters.
          </p>
          <p className="ms-body">
            This essay concludes that sanctions were a contributing but not decisive factor, and that their principal
            effect was to shorten the timetable rather than to force the outcome.
          </p>
          <div className="ms-stampwrap">
            <div className="ms-stamp" data-stamp>
              <b>21/30</b>
              <span>Estimate, May 2027 scale</span>
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
