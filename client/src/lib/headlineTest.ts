/**
 * The home page headline test. A version is drawn on each page load and held in memory
 * only: nothing is written to the device and nothing identifies the visitor, so the count
 * needs no consent. The server keeps daily totals per version, never a row per visit.
 *
 * Events: "view" when the home page is shown, "cta" when a button there is pressed,
 * "submit" when work is sent for marking and "checkout" when a checkout opens, each
 * counted at most once per page load and only after the home page was seen.
 */
export const HOME_HEADLINES = [
  { lead: "Paste your IA.", rest: "See which criterion is costing you marks." },
  { lead: "Your IB draft, marked against the published criteria.", rest: "Free preview in about a minute." },
  { lead: "Find the lost marks", rest: "before your deadline does." },
] as const;

export type HeadlineEvent = "view" | "cta" | "submit" | "checkout";

let drawn: number | null = null;
const sent = new Set<HeadlineEvent>();

/** The version for this page load. A build-time render (no document) always shows the first. */
export function homeHeadlineVariant(): number {
  if (typeof document === "undefined") return 0;
  if (drawn === null) drawn = Math.floor(Math.random() * HOME_HEADLINES.length);
  return drawn;
}

export function recordHeadline(event: HeadlineEvent) {
  if (drawn === null || sent.has(event) || typeof navigator === "undefined") return;
  sent.add(event);
  const body = JSON.stringify({ t: "home_h1", v: drawn, e: event });
  try {
    const queued = typeof navigator.sendBeacon === "function" && navigator.sendBeacon("/api/ab", new Blob([body], { type: "application/json" }));
    if (!queued) void fetch("/api/ab", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
  } catch {
    // A lost count is fine: nothing on the page depends on it.
  }
}
