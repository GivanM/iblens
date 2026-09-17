import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { getAnonFingerprint, rotateAnonFingerprint } from "@/lib/fingerprint";
import { toast } from "sonner";
import { ReportReadyBanner } from "@/components/ReportReadyBanner";
import { LayoutDashboard, LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";

const SERIF = { fontFamily: "'Funnel Display', 'Funnel Sans', system-ui, sans-serif", letterSpacing: "-0.015em" };

// Pages whose first screen is a photograph: the header sits over it in light text.
const PHOTO_HEADER_PATHS = new Set(["/"]);

function NavLink({ href, children, active, onPhoto }: { href: string; children: React.ReactNode; active: boolean; onPhoto?: boolean }) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors px-3 py-2 rounded-md ${
        onPhoto
          ? (active ? "text-white" : "text-white/80 hover:text-white")
          : active
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [location, setLocation] = useLocation();

  // Anything bought on this device belongs to the person who just signed in,
  // wherever in the site they did it. This used to happen only on /essay.
  const layoutUtils = trpc.useUtils();
  const claim = trpc.essay.claimDeviceCredits.useMutation({
    onSuccess: (d: any) => {
      // The page's counts change with the move: read them again.
      if (d.moved > 0 || d.adopted > 0) {
        layoutUtils.dashboard.credits.invalidate();
        layoutUtils.essay.deviceCredits.invalidate();
      }
      // A preview this account had already paid for was opened: the page shows the report, not a price.
      if (d.reopened > 0 || d.adopted > 0) {
        layoutUtils.essay.lockedReport.invalidate();
        layoutUtils.essay.anonymousReport.invalidate();
        layoutUtils.essay.deviceReports.invalidate();
        layoutUtils.dashboard.invalidate();
      }
      if (d.moved > 0 || d.adopted > 0) {
        const parts = [];
        if (d.moved > 0) parts.push(`${d.moved} unused paid report${d.moved === 1 ? "" : "s"}`);
        if (d.adopted > 0) parts.push(`${d.adopted} opened report${d.adopted === 1 ? "" : "s"}`);
        toast.success(`${parts.join(" and ")} bought on this device ${d.moved + d.adopted === 1 ? "is" : "are"} now in your account.`);
      }
      // Without a word, a locked preview simply vanished from the page when its report opened.
      if (d.reopened > 0) {
        toast.success(`${d.reopened === 1 ? "A report" : `${d.reopened} reports`} you had already paid for in this account ${d.reopened === 1 ? "was" : "were"} locked on this device. ${d.reopened === 1 ? "It is" : "They are"} open again, and in your dashboard.`, {
          action: { label: "Open dashboard", onClick: () => setLocation("/dashboard") },
        });
      }
    },
  });
  // On sign-in, and again on each visit to a grader page: a report reopened in the dashboard
  // opens on this device too, instead of the page offering to sell it again.
  const onGraderPage = location === "/essay" || location.startsWith("/essay/") || location === "/ucas-personal-statement";
  useEffect(() => {
    if (!isAuthenticated || claim.isPending) return;
    if (claim.isSuccess && !onGraderPage) return;
    claim.mutate({ fingerprint: getAnonFingerprint() });
  }, [isAuthenticated, onGraderPage ? location : ""]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onPhoto = PHOTO_HEADER_PATHS.has(location) && !mobileMenuOpen;

  return (
    <div className="min-h-screen flex flex-col">
      <header className={PHOTO_HEADER_PATHS.has(location) ? `absolute inset-x-0 top-0 z-50 ${mobileMenuOpen ? "bg-background border-b border-border" : ""}` : "sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md border-border"}>
        <ReportReadyBanner />
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span style={SERIF} className={`text-xl font-bold ${onPhoto ? "text-white" : ""}`}>IBLens</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              <NavLink onPhoto={onPhoto} href="/essay" active={location === "/essay"}>Essay grader</NavLink>
              <NavLink onPhoto={onPhoto} href="/remark" active={location === "/remark"}>Re-mark checker</NavLink>
              <NavLink onPhoto={onPhoto} href="/ucas-personal-statement" active={location === "/ucas-personal-statement"}>UCAS statement</NavLink>
              <NavLink onPhoto={onPhoto} href="/resources" active={location.startsWith("/resources")}>Resources</NavLink>
              <NavLink onPhoto={onPhoto} href="/pricing" active={location === "/pricing"}>Pricing</NavLink>
              {isAuthenticated && (
                <NavLink onPhoto={onPhoto} href="/dashboard" active={location === "/dashboard"}>Dashboard</NavLink>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className={`gap-2 ${onPhoto ? "text-white hover:bg-white/10 hover:text-white" : ""}`}>
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="hidden sm:inline text-sm">{user?.name || "Account"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      // Claim first, rotate second: a report unlocked since the last
                      // page load would otherwise lose its only key on sign-out.
                      try { await claim.mutateAsync({ fingerprint: getAnonFingerprint() }); } catch { /* nothing to claim */ }
                      // The device id changes only once the sign-out went through: changing it
                      // while still signed in orphaned what this browser held.
                      try {
                        await logout();
                      } catch {
                        toast.error("Signing out did not go through. Check your connection and try again.");
                        return;
                      }
                      rotateAnonFingerprint();
                      // A full reload, so no page keeps the signed-out person's reports on
                      // screen or goes on asking for them with the old device id.
                      window.location.assign("/");
                    }}
                    className="text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button size="sm" variant="default" className="hidden sm:flex" asChild>
                  <Link href="/essay">Grade my essay</Link>
                </Button>
                <Button size="sm" variant="ghost" className={onPhoto ? "text-white hover:bg-white/10 hover:text-white" : ""} asChild>
                  <a href={getLoginUrl()}>Sign in</a>
                </Button>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden size-11 ${onPhoto ? "text-white hover:bg-white/10 hover:text-white" : ""}`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav aria-label="Main" className="lg:hidden border-t border-border bg-background">
            <ul className="container divide-y divide-border">
              {[
                { href: "/essay", label: "Essay grader", on: location === "/essay" },
                { href: "/remark", label: "Re-mark checker", on: location === "/remark" },
                { href: "/ucas-personal-statement", label: "UCAS statement", on: location === "/ucas-personal-statement" },
                { href: "/resources", label: "Resources", on: location.startsWith("/resources") },
                { href: "/pricing", label: "Pricing", on: location === "/pricing" },
                ...(isAuthenticated ? [{ href: "/dashboard", label: "Dashboard", on: location === "/dashboard" }] : []),
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={item.on ? "page" : undefined}
                    className={`flex items-center min-h-12 text-base ${item.on ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {!isAuthenticated && location !== "/essay" && (
              <div className="container pb-5 pt-1">
                <Button className="w-full min-h-12" asChild>
                  <Link href="/essay" onClick={() => setMobileMenuOpen(false)}>Grade my essay</Link>
                </Button>
              </div>
            )}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border py-12 mt-auto bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <span style={SERIF} className="text-xl font-bold block mb-2">IBLens</span>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                AI-powered IB essay grader for IA, EE and TOK. Feedback against the published criteria in about a minute.
              </p>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-0 md:gap-y-2 md:justify-end">
              <Link href="/essay" className="inline-flex items-center min-h-11 md:min-h-0 text-sm text-muted-foreground hover:text-foreground transition-colors">Essay grader</Link>
              <Link href="/resources" className="inline-flex items-center min-h-11 md:min-h-0 text-sm text-muted-foreground hover:text-foreground transition-colors">Resources</Link>
              <Link href="/remark" className="inline-flex items-center min-h-11 md:min-h-0 text-sm text-muted-foreground hover:text-foreground transition-colors">Re-mark checker</Link>
              <Link href="/pricing" className="inline-flex items-center min-h-11 md:min-h-0 text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              <Link href="/about" className="inline-flex items-center min-h-11 md:min-h-0 text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link href="/privacy" className="inline-flex items-center min-h-11 md:min-h-0 text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="inline-flex items-center min-h-11 md:min-h-0 text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
              <Link href="/refund-policy" className="inline-flex items-center min-h-11 md:min-h-0 text-sm text-muted-foreground hover:text-foreground transition-colors">Refund policy</Link>
              <Link href="/resources/academic-integrity" className="inline-flex items-center min-h-11 md:min-h-0 text-sm text-muted-foreground hover:text-foreground transition-colors">Academic integrity</Link>
              <button type="button" onClick={() => window.dispatchEvent(new Event("iblens:cookie-settings"))} className="inline-flex items-center min-h-11 md:min-h-0 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Cookie settings</button>
            </nav>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} IBLens. Independent of the International Baccalaureate Organization, which does not endorse it. Every mark is an AI estimate, not an IB mark. Your text is processed by Anthropic PBC.
          </div>
        </div>
      </footer>
    </div>
  );
}
