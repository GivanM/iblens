import { useState } from "react";
import { Link, useLocation } from "wouter";
import { PRICE_LABELS } from "@shared/pricing";
import { IA_RUBRIC_SUBJECTS } from "@shared/rubrics";
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

const SUBJECTS: string[] = [...IA_RUBRIC_SUBJECTS];

/**
 * The slip hands the choice to the analyzer instead of duplicating its form.
 * One submit path means one place where `startEssayAnalysis` fires and one set
 * of validation rules. Subject travels too: it goes into the prompt, and a
 * History essay marked as Business Management is marked on the wrong vocabulary.
 */
export function RequestSlip() {
  const [, navigate] = useLocation();
  const [task, setTask] = useState("EE");
  const [subject, setSubject] = useState("History");
  const [session, setSession] = useState("may2027");

  const needsSubject = task === "EE" || task === "IA";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    analytics.clickAnalyzeEssay();
    const params = new URLSearchParams({ type: task, session });
    if (needsSubject) params.set("subject", subject);
    navigate(`/essay?${params.toString()}`);
  };

  return (
    <Sheet id="slip">
      <Slug left="Sheet 5 of 5" middle="Request for marking" right="First script free to preview" />
      <div className="ms-slip">
        <form onSubmit={submit}>
          <h2>Submit a script</h2>
          <p className="ms-sub">
            No account needed for the first one. The free preview returns your mark range, the weakest criterion with
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
          {needsSubject && (
            <div className="ms-f1">
              <label className="ms-label" htmlFor="ms-subject">
                Subject
              </label>
              <select className="ms-inp" id="ms-subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          )}
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
            <span>Full report, one piece of work</span>
            <b>{PRICE_LABELS.ESSAY_SINGLE}</b>
          </div>
          <div className="ms-fr">
            <span>Re-check after revision</span>
            <b>Twice, included</b>
          </div>
          <div className="ms-fr">
            <span>Five reports, no expiry</span>
            <b>{PRICE_LABELS.ESSAY_PACK_5}</b>
          </div>
          <div className="ms-fr">
            <span>Ten reports, no expiry</span>
            <b>{PRICE_LABELS.ESSAY_PACK_10}</b>
          </div>
          <div className="ms-fr">
            <span>Refund window</span>
            <b>7 days</b>
          </div>
          <div className="ms-fr">
            <span>Payments handled by</span>
            <b>LemonSqueezy</b>
          </div>
          <p className="ms-hand">No subscription. Nothing renews.</p>
          <p className="ms-slipnote">
            <Link href="/resources/sample-reports">Read three full sample reports (TOK essays) before you buy one</Link>
          </p>
        </aside>
      </div>
    </Sheet>
  );
}
