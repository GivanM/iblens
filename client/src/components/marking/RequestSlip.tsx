import { useState } from "react";
import { useLocation } from "wouter";
import { PRICE_LABELS } from "@shared/pricing";
import { analytics } from "@/lib/analytics";
import { Sheet, Slug } from "./Sheet";

const TASKS = [
  { value: "EE", label: "Extended Essay" },
  { value: "IA", label: "Internal Assessment" },
  { value: "TOK", label: "TOK essay" },
  { value: "TOK Exhibition", label: "TOK exhibition" },
];

const SESSIONS = [
  { value: "may2027", label: "May 2027" },
  { value: "nov2026", label: "November 2026" },
];

/**
 * The slip hands the choice to the analyzer instead of duplicating its form.
 * One submit path means one place where `startEssayAnalysis` fires and one set
 * of validation rules.
 */
export function RequestSlip() {
  const [, navigate] = useLocation();
  const [task, setTask] = useState("EE");
  const [session, setSession] = useState("may2027");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    analytics.clickAnalyzeEssay();
    navigate(`/essay?type=${encodeURIComponent(task)}&session=${encodeURIComponent(session)}`);
  };

  return (
    <Sheet id="slip">
      <Slug left="Sheet 5 of 5" middle="Request for marking" right="First script free to preview" />
      <div className="ms-slip">
        <form onSubmit={submit}>
          <h2>Submit a script</h2>
          <p className="ms-sub">
            No account needed for the first one. The free preview returns your band range, the weakest criterion with
            its full feedback, and the risks costing the most marks.
          </p>
          <div className="ms-f2">
            <div>
              <label className="ms-label" htmlFor="ms-task">
                Task
              </label>
              <select className="ms-inp" id="ms-task" value={task} onChange={(e) => setTask(e.target.value)}>
                {TASKS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="ms-label" htmlFor="ms-session">
                Session
              </label>
              <select className="ms-inp" id="ms-session" value={session} onChange={(e) => setSession(e.target.value)}>
                {SESSIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="ms-btn" type="submit">
            Mark this script
          </button>
          <p className="ms-slipnote">You paste the draft on the next sheet. Nothing is charged to see the preview.</p>
        </form>
        <aside className="ms-fees">
          <h3>Schedule of fees</h3>
          <div className="ms-fr">
            <span>First script</span>
            <b>Free preview</b>
          </div>
          <div className="ms-fr">
            <span>Full report</span>
            <b>{PRICE_LABELS.ESSAY_SINGLE}</b>
          </div>
          <div className="ms-fr">
            <span>Re-check after revision</span>
            <b>Twice, included</b>
          </div>
          <div className="ms-fr">
            <span>Pack of five</span>
            <b>{PRICE_LABELS.ESSAY_PACK_5}</b>
          </div>
          <div className="ms-fr">
            <span>Pack of ten</span>
            <b>{PRICE_LABELS.ESSAY_PACK_10}</b>
          </div>
          <div className="ms-fr">
            <span>Refund window</span>
            <b>7 days</b>
          </div>
          <p className="ms-hand">No subscription. Nothing renews.</p>
        </aside>
      </div>
    </Sheet>
  );
}
