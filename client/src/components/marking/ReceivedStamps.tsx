import { Sheet, Slug } from "./Sheet";

const STAMPS = [
  {
    head: "Received",
    when: "3 weeks out",
    rot: "-1.8deg",
    body: "Structural fixes are still open. A weak question or a missing counter-argument can be rewritten. This is where a report changes a grade.",
  },
  {
    head: "Received",
    when: "1 week out",
    rot: "1.2deg",
    body: "Most drafts arrive here. Analysis and reflection are still reachable. The shape of the argument is not.",
  },
  {
    head: "Received",
    when: "2 days out",
    rot: "-0.9deg",
    body: "Presentation, citation, word count, the closing paragraph. Small marks, and the only ones still on the table.",
  },
  {
    head: "Submitted",
    when: "too late",
    rot: "2deg",
    dead: true,
    body: "Nothing left to do. Waiting a week for feedback is expensive in something other than money.",
  },
];

export function ReceivedStamps() {
  return (
    <Sheet id="dates">
      <Slug left="Sheet 3 of 5" middle="Received" right="Feedback is worth what you can still act on" />
      <div className="ms-dates">
        {STAMPS.map((s) => (
          <div
            key={s.when}
            className={s.dead ? "ms-recv ms-dead" : "ms-recv"}
            style={{ ["--ms-rot" as string]: s.rot }}
          >
            <b>{s.head}</b>
            <i>{s.when}</i>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </Sheet>
  );
}
