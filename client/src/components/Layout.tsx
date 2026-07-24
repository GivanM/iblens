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
import { FileText, GraduationCap, LayoutDashboard, LogOut, User, Menu, X, DollarSign, BookOpen } from "lucide-react";
import { useState } from "react";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors px-3 py-2 rounded-md ${
        active
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
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = location === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <header className={`sticky top-0 z-50 border-b ${isHome ? "bg-white/80 backdrop-blur-md" : "bg-background/95 backdrop-blur-md"} border-border`}>
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span style={SERIF} className="text-xl font-bold">
                IB<span className="text-primary">Lens</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <NavLink href="/essay" active={location === "/essay"}>Essay Analyzer</NavLink>
              <NavLink href="/resources" active={location.startsWith("/resources")}>Resources</NavLink>
              <NavLink href="/pricing" active={location === "/pricing"}>Pricing</NavLink>
              {isAuthenticated && (
                <NavLink href="/dashboard" active={location === "/dashboard"}>Dashboard</NavLink>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
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
                  <DropdownMenuItem onClick={() => logout()} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button size="sm" variant="default" className="hidden sm:flex" asChild>
                  <Link href="/essay">Grade Free</Link>
                </Button>
                <Button size="sm" variant="ghost" asChild>
                  <a href={getLoginUrl()}>Sign in</a>
                </Button>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background p-4 space-y-2">
            <Link
              href="/essay"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                location === "/essay" ? "bg-primary/10 text-primary" : "text-muted-foreground"
              }`}
            >
              <FileText className="w-4 h-4" />
              Essay Analyzer
            </Link>
            <Link
              href="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                location.startsWith("/resources") ? "bg-primary/10 text-primary" : "text-muted-foreground"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Resources
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                location === "/pricing" ? "bg-primary/10 text-primary" : "text-muted-foreground"
              }`}
            >
              <DollarSign className="w-4 h-4" />
              Pricing
            </Link>
            {isAuthenticated && (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  location === "/dashboard" ? "bg-primary/10 text-primary" : "text-muted-foreground"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            )}
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border py-12 mt-auto bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <span style={SERIF} className="text-xl font-bold block mb-2">
                IB<span className="text-primary">Lens</span>
              </span>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                AI-powered IB essay grader for IA, EE and TOK. Criterion-by-criterion feedback in 60 seconds.
              </p>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
              <Link href="/essay" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Essay Analyzer</Link>
              <Link href="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Resources</Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
              <Link href="/refund-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Refund Policy</Link>
              <Link href="/resources/academic-integrity" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Academic Integrity</Link>
            </nav>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} IBLens. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
