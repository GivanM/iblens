import { Sheet, Slug } from "./Sheet";

export function CoverSheet() {
  return (
    <section className="ms-cover" data-cover>
      <Sheet plain>
        <Slug left="IBLens" middle="Marking cover sheet" right="Independent, not an IB document" />
        <h1>Essay received for marking</h1>
        <p className="ms-lede">
          IBLens reads a draft against the published assessment criteria and writes back criterion by criterion.
          Every score on the sheets below is an estimate. It is not an IB mark and IBLens is not connected to the
          IB Organization.
        </p>
        <div className="ms-cf">
          <div>
            <div className="ms-fld">
              <b>Candidate</b>
              <span>you, three weeks out</span>
            </div>
            <div className="ms-fld">
              <b>Subject</b>
              <span>History</span>
            </div>
          </div>
          <div>
            <div className="ms-fld">
              <b>Task</b>
              <span>Extended Essay</span>
            </div>
            <div className="ms-fld">
              <b>Session</b>
              <span>May 2027</span>
            </div>
          </div>
        </div>
        <div className="ms-box">
          <b>Examiner's mark</b>
          <i>to be awarded</i>
        </div>
        <p className="ms-coverfree">
          The first script is marked free: a range of totals and, for most drafts, the weakest criterion and the risks costing the most.
          The complete report is $9.99, no account and no subscription.
        </p>
        <p className="ms-cue">
          <svg width="13" height="17" viewBox="0 0 13 17" fill="none" aria-hidden="true">
            <path d="M6.5 0v14M1 9l5.5 6L12 9" stroke="#726A5E" strokeWidth="1.4" />
          </svg>
          Scroll to open the script
        </p>
      </Sheet>
    </section>
  );
}
