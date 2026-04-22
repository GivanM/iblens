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
import { FileText, GraduationCap, LayoutDashboard, LogOut, User, Menu, X, Sparkles, DollarSign } from "lucide-react";
import { useState } from "react";

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors px-3 py-2 rounded-md ${
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
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
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                IB<span className="text-primary">Lens</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <NavLink href="/essay" active={location === "/essay"}>
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Essay Analyzer
                </span>
              </NavLink>
              <NavLink href="/university" active={location === "/university"}>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  University Strategy
                </span>
              </NavLink>
              <NavLink href="/pricing" active={location === "/pricing"}>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" />
                  Pricing
                </span>
              </NavLink>
              {isAuthenticated && (
                <NavLink href="/dashboard" active={location === "/dashboard"}>
                  <span className="flex items-center gap-1.5">
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Dashboard
                  </span>
                </NavLink>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-3">
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
              <Button size="sm" asChild>
                <a href={getLoginUrl()}>Sign in</a>
              </Button>
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
              href="/university"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                location === "/university" ? "bg-primary/10 text-primary" : "text-muted-foreground"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              University Strategy
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

      <footer className="border-t border-border py-6 mt-auto">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} IBLens. AI-powered IB essay analysis and university strategy.</p>
        </div>
      </footer>
    </div>
  );
}
