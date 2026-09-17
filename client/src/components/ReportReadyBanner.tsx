import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { deviceReportLabel } from "@/components/DeviceReportsList";

const seenKey = (id: number) => `iblens_report_seen_${id}`;
const wasSeen = (id: number) => {
  try { return localStorage.getItem(seenKey(id)) === "1"; } catch { return false; }
};
/** Call wherever a report is shown in full, so the notice does not point at what is on screen. */
export const markReportSeen = (id: number | null | undefined) => {
  if (!id) return;
  try { localStorage.setItem(seenKey(id), "1"); } catch { /* storage blocked: the notice can be dismissed */ }
};

/**
 * A report opened in the last day, until it has been read or dismissed. The first real buyer
 * left checkout without its return link, found an empty form on the grader page, and spent
 * twenty minutes signing in to other accounts looking for what had been paid for.
 */
export function ReportReadyBanner() {
  const { isAuthenticated } = useAuth();
  const [location] = useLocation();
  const recent = trpc.dashboard.recentlyOpened.useQuery(undefined, { enabled: isAuthenticated, staleTime: 30_000 });
  const [dismissed, setDismissed] = useState<number | null>(null);
  const r = recent.data;
  const onReport = !!r && location === `/dashboard/analysis/${r.id}`;
  useEffect(() => {
    if (r && onReport) markReportSeen(r.id);
  }, [r?.id, onReport]);
  if (!isAuthenticated || !r || onReport || dismissed === r.id || wasSeen(r.id)) return null;
  const what = r.essayType === "UCAS" ? "review" : "report";
  return (
    <div className="bg-foreground text-background">
      <div className="container flex items-center gap-3 min-h-11 py-1.5 text-sm">
        <p className="flex-1">Your full {what} is open: {deviceReportLabel(r)}.</p>
        <Link href={`/dashboard/analysis/${r.id}`} className="font-semibold underline underline-offset-4 whitespace-nowrap">
          Read it
        </Link>
        <button
          type="button"
          aria-label="Dismiss"
          className="p-2.5 -mr-2.5 opacity-75 hover:opacity-100"
          onClick={() => { markReportSeen(r.id); setDismissed(r.id); }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
