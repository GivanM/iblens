import { useEffect, useState } from "react";
import { getManusOAuthUrl } from "@/const";
import { Link } from "wouter";
import { Sparkles, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Branded sign-in interstitial page.
 *
 * Purpose: Instead of sending users directly to manus.im (which looks like a phishing
 * redirect to non-technical users), we show a polished IBLens-branded page that:
 * 1. Explains what's about to happen ("You'll be securely signed in via our auth partner")
 * 2. Shows IBLens branding prominently so users know they're still on iblens.com
 * 3. Provides a clear "Continue to Sign In" button that triggers the Manus redirect
 * 4. Auto-redirects after a short delay (3s) with a progress indicator
 *
 * This reduces the "phishing redirect" perception for paid-traffic visitors.
 */
export default function SignIn() {
  const [countdown, setCountdown] = useState(3);
  const [autoRedirect, setAutoRedirect] = useState(true);
  const loginUrl = getManusOAuthUrl();

  useEffect(() => {
    if (!autoRedirect) return;
    if (countdown <= 0) {
      window.location.href = loginUrl;
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, autoRedirect, loginUrl]);

  const handleContinue = () => {
    window.location.href = loginUrl;
  };

  const handleCancel = () => {
    setAutoRedirect(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50/50 to-white">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-lg border border-border/50 p-8 space-y-6">
          {/* IBLens branding */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shadow-md">
              <Sparkles className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Sign in to <span className="text-primary">IBLens</span>
            </h1>
          </div>

          {/* Explanation */}
          <div className="bg-blue-50/80 rounded-lg p-4 space-y-2">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                You'll be redirected to our <strong>secure authentication partner</strong> to sign in.
                This is the same trusted service used by thousands of apps. Your data stays private.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <Button
              onClick={handleContinue}
              size="lg"
              className="w-full shadow-md hover:shadow-lg transition-all"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Continue to Sign In
              {autoRedirect && countdown > 0 && (
                <span className="ml-2 text-xs opacity-70">({countdown}s)</span>
              )}
            </Button>

            {autoRedirect && (
              <p className="text-xs text-center text-muted-foreground">
                Redirecting automatically in {countdown} second{countdown !== 1 ? "s" : ""}...{" "}
                <button
                  onClick={handleCancel}
                  className="underline hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
              </p>
            )}

            {!autoRedirect && (
              <p className="text-xs text-center text-muted-foreground">
                Auto-redirect cancelled. Click the button above when ready.
              </p>
            )}
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-4 pt-2 border-t border-border/50">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Shield className="w-3 h-3" /> Encrypted
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">No password stored</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">
              <Link href="/" className="hover:underline">Back to IBLens</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
