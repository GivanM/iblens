import { Link } from "wouter";

/**
 * The index at the back of the folder. It is the page's only link farm on
 * purpose: every route the old homepage pointed at is still one click away,
 * and the sheets above stay clean.
 */
const TASK_LINKS = [
  { href: "/essay/extended-essay", label: "Extended Essay" },
  { href: "/essay/tok-essay", label: "TOK essay" },
  { href: "/essay/tok-exhibition", label: "TOK exhibition" },
  { href: "/ucas-personal-statement", label: "UCAS personal statement" },
];

const SUBJECT_LINKS = [
  { href: "/essay/biology-ia", label: "Biology IA" },
  { href: "/essay/chemistry-ia", label: "Chemistry IA" },
  { href: "/essay/physics-ia", label: "Physics IA" },
  { href: "/essay/math-ia", label: "Mathematics IA" },
  { href: "/essay/economics-ia", label: "Economics IA" },
  { href: "/essay/history-ia", label: "History IA" },
  { href: "/essay/psychology-ia", label: "Psychology IA" },
  { href: "/essay/business-management-ia", label: "Business Management IA" },
  { href: "/essay/computer-science-ia", label: "Computer Science IA" },
  { href: "/essay/english-essay", label: "English essay" },
];

const READING_LINKS = [
  { href: "/resources", label: "All guides" },
  { href: "/resources/ib-extended-essay-guide", label: "Extended Essay guide" },
  { href: "/resources/ib-extended-essay-new-criteria-2027", label: "What changes in May 2027" },
  { href: "/resources/ib-internal-assessment-guide", label: "Internal Assessment guide" },
  { href: "/resources/tok-essay-guide", label: "TOK essay guide" },
  { href: "/resources/ib-grade-boundaries", label: "Grade boundaries" },
  { href: "/resources/sample-reports", label: "Sample reports" },
  { href: "/resources/academic-integrity", label: "Academic integrity" },
];

const ADMIN_LINKS = [
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/refund-policy", label: "Refunds" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

function Column({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3>{title}</h3>
      <div className="ms-linklist">
        {links.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Colophon() {
  return (
    <div className="ms-colophon">
      <div className="ms-cols">
        <Column title="Marking" links={TASK_LINKS} />
        <Column title="By subject" links={SUBJECT_LINKS} />
        <Column title="Reading" links={READING_LINKS} />
        <Column title="The small print" links={ADMIN_LINKS} />
      </div>
    </div>
  );
}
