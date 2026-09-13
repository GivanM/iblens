import { Link } from "wouter";
import { Sheet, Slug } from "./Sheet";

/**
 * Every line here has to survive someone checking it against the code. The
 * subject count is the number of IA rubrics actually loaded in shared/rubrics.ts,
 * not the length of a dropdown.
 */
const DOES = [
  "Marks against the published criteria for the Extended Essay, the TOK essay, the TOK exhibition and coursework in 14 subjects.",
  "Names the criterion losing you the most marks and says what in the text is costing them.",
  "Follows your exam session. Choose May 2027 and the Extended Essay, Psychology and Computer Science are marked on the new criteria; choose 2026 and they are marked on the current ones.",
  "Re-checks a revised draft twice within 14 days of a paid report, at no extra cost.",
  "Comes back in about a minute, at any hour, including the night before a deadline.",
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
            <li>
              <em aria-hidden="true">✗</em>
              <span>Write or rewrite any part of your essay. You would be handing in work that is not yours.</span>
            </li>
            <li>
              <em aria-hidden="true">✗</em>
              <span>Award an official mark. Every score is an estimate produced by a language model reading the criteria.</span>
            </li>
            <li>
              <em aria-hidden="true">✗</em>
              <span>Guarantee a grade. Nobody can, and a tool that says otherwise is selling you something else.</span>
            </li>
            <li>
              <em aria-hidden="true">✗</em>
              <span>
                Replace your supervisor. The IB permits written supervisor comments on one draft and no more, and the
                Extended Essay guide says students are not allowed to receive assistance with any aspect of the research, writing or proofreading of the essay beyond that which is permitted through their supervisor, so ask your supervisor before you use IBLens on your EE. You still have to
                account for every choice in your own words at the viva voce.{" "}
                <Link href="/resources/academic-integrity">What to declare</Link>.
              </span>
            </li>
            <li>
              <em aria-hidden="true">✗</em>
              <span>
                Keep your text to itself. The essay travels through our own server in Finland, which exists to reach
                the model at all from where this is run, and then to Anthropic PBC, which produces the analysis.{" "}
                <Link href="/privacy">How the data moves</Link>.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Sheet>
  );
}
