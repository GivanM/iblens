/**
 * Index tabs down the right edge of the folder. They are ordinary in-page
 * anchors, so they work before the scroll handler attaches and they keep
 * working if it never does.
 */
const TABS = [
  { id: "work", label: "The mark" },
  { id: "rubric", label: "Rubric" },
  { id: "dates", label: "Deadlines" },
  { id: "scope", label: "Scope" },
  { id: "slip", label: "Submit" },
];

export function TabRail() {
  return (
    <nav className="ms-tabs" aria-label="Sheets">
      {TABS.map((t) => (
        <a key={t.id} className="ms-tab" data-tab={t.id} href={`#${t.id}`}>
          {t.label}
        </a>
      ))}
    </nav>
  );
}
