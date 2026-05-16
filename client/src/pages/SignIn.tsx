import { useEffect, useState } from "react";
import { getGoogleOAuthUrl } from "@/const";
import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { Sparkles, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const [loginUrl, setLoginUrl] = useState("");

  useEffect(() => {
    setLoginUrl(getGoogleOAuthUrl());
  }, []);

  const handleContinue = () => {
    if (loginUrl) window.location.href = loginUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50/50 to-white">
      <SEOHead
        title="Sign In — IBLens"
        description="Sign in to IBLens to access your IB essay analyses, purchase history, and personalized university strategies."
        canonical="/auth/signin"
      />
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-lg border border-border/50 p-8 space-y-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shadow-md">
              <Sparkles className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Sign in to <span className="text-primary">IBLens</span>
            </h1>
          </div>

          <div className="bg-blue-50/80 rounded-lg p-4 space-y-2">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sign in securely with your <strong>Google account</strong>.
                We only access your name and email address.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleContinue}
              size="lg"
              className="w-full shadow-md hover:shadow-lg transition-all"
              disabled={!loginUrl}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </div>

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
