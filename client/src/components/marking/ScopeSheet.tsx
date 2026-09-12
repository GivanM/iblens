import { Sheet, Slug } from "./Sheet";

const DOES = [
  "Marks against the published criteria for the Internal Assessment in 17 subjects, the Extended Essay, the TOK essay and the TOK exhibition.",
  "Names the criterion losing you the most marks and says what in the text is costing them.",
  "Follows your exam session. Where the syllabus changes for May 2027, the report uses the new scale.",
  "Re-checks a revised draft twice within 14 days of a paid report, at no extra cost.",
  "Comes back in about a minute, at any hour, including the night before a deadline.",
];

const DOES_NOT = [
  "Write or rewrite any part of your essay. You would be handing in work that is not yours.",
  "Award an official mark. Every score is an estimate produced by a language model reading the criteria.",
  "Guarantee a grade. Nobody can, and a tool that says otherwise is selling you something else.",
  "Replace your supervisor. The IB allows written supervisor comments on one draft, which makes that draft worth arriving at in good shape.",
  "Keep your text to itself. The essay is sent to Anthropic PBC to produce the analysis.",
];

export function ScopeSheet() {
  return (
    <Sheet id="scope">
      <Slug left="Sheet 4 of 5" middle="Scope of marking" right="Read before you pay" />
      <div className="ms-spec">
        <div className="ms-yes">
          <h3>What it does</h3>
          <ul>
            {DOES.map((t) => (
              <li key={t}>
                <em aria-hidden="true">✓</em>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="ms-no">
          <h3>What it does not do</h3>
          <ul>
            {DOES_NOT.map((t) => (
              <li key={t}>
                <em aria-hidden="true">✗</em>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Sheet>
  );
}
