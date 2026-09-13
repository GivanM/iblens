import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type DeviceReport = {
  id: number;
  latestId: number;
  essayType: string | null;
  subject: string | null;
  createdAt: string | Date;
  versions: number;
  rerunsLeft: number;
  windowOpen: boolean;
};

export function deviceReportLabel(r: { essayType: string | null; subject: string | null }): string {
  if (r.essayType === "UCAS") return `UCAS statement, ${r.subject || "your course"}`;
  if (r.essayType === "TOK") return r.subject === "Exhibition" ? "TOK exhibition" : "TOK essay";
  if (r.essayType === "TOK Exhibition") return "TOK exhibition";
  const type = r.essayType === "EE" ? "Extended Essay" : "IA";
  return r.subject ? `${type}, ${r.subject}` : type;
}

/**
 * Every report bought on this browser, so a guest with a pack can go back to any of
 * them and re-check the one they revised, not only the newest.
 */
export function DeviceReportsList({ reports, selectedId, onOpen, onRecheck, opening }: {
  reports: DeviceReport[];
  selectedId: number | null;
  onOpen: (r: DeviceReport) => void;
  onRecheck: (r: DeviceReport) => void;
  opening?: number | null;
}) {
  if (reports.length < 2) return null;
  return (
    <Card className="mb-6">
      <CardContent className="pt-6 space-y-3">
        <div>
          <p className="text-sm font-semibold">Reports bought on this browser ({reports.length})</p>
          <p className="text-xs text-muted-foreground">Each keeps its own two re-checks for 14 days from opening. Sign in with Google to keep them in an account.</p>
        </div>
        <ul className="divide-y divide-border">
          {reports.map((r) => {
            const selected = selectedId === r.id;
            return (
              <li key={r.id} className="py-3 flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{deviceReportLabel(r)}{selected ? " · selected for re-check" : ""}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(r.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    {r.versions > 1 ? ` · ${r.versions - 1} re-check${r.versions - 1 === 1 ? "" : "s"} done` : ""}
                    {" · "}
                    {r.windowOpen ? `${r.rerunsLeft} re-check${r.rerunsLeft === 1 ? "" : "s"} left` : "re-check window ended"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="min-h-11" disabled={opening === r.latestId} onClick={() => onOpen(r)}>
                    {opening === r.latestId ? "Opening…" : "Open"}
                  </Button>
                  {r.rerunsLeft > 0 && (
                    <Button variant={selected ? "default" : "outline"} className="min-h-11" onClick={() => onRecheck(r)}>
                      Re-check a revision
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
